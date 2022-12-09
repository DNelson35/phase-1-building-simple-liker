// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const failed = document.querySelector("body div")

const hearts = document.querySelectorAll(".like-glyph")
hearts.forEach((heart) => {
  heart.addEventListener('click', (e) => {
    if(e.target.classList.value === 'like-glyph'){
      // e.target.textContent = FULL_HEART
      // e.target.classList.add('activated-heart')
      mimicServerCall("http://mimicServer.example.com", {
        method: 'POST',
        Headers: {
          "content-type": "application/jason",
          "accept": "application/jason",
        },
        body: JSON.stringify({
          Heart: 'FULL_HEART',
          Color: "activated-heart"
        }),
      })
      .then((resp) => {
        e.target.textContent = FULL_HEART
        e.target.classList.add('activated-heart')
      })
      .catch((error) => {
        console.log(resp)
        setTimeout(() => {
          failed.classList.add('hidden')
        },1000)
        failed.classList.remove('hidden')
      })
    }else{
    //   e.target.textContent = EMPTY_HEART
    //  e.target.classList.remove('activated-heart')
     mimicServerCall("http://mimicServer.example.com", {
      method: 'POST',
      Headers: {
        "content-type": "application/jason",
        "accept": "application/jason",
      },
      body: JSON.stringify({
        Heart: 'EMPTY_HEART',
        Color: "activated-heart"
      }),
    })
    .then((resp) => {
      e.target.textContent = EMPTY_HEART
      e.target.classList.remove("activated-heart")
    })
    .catch((resp) => {
      console.log(resp)
      setTimeout(() => {
        failed.classList.add('hidden')
      },1000)
      failed.classList.remove('hidden')
    })
    }
  })
})



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
