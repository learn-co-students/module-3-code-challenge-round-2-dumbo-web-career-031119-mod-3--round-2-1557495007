document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 2594 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let mainImageCard = document.querySelector('.main-image-card')
  let commentsUl = document.querySelector('#comments')
  let mainForm = document.querySelector('form')
  let ulTag = document.querySelector('ul')

  // ----------------------------------------------------------------------

  const makeImageHtml = (image) => {
    return `<div id="image_card" class="card col-md-4" data-id="${image.id}">
    <img src="${image.url}" id="image" data-id="${image.id}"/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
    <span id="likes" data-likes="${image.like_count}" class="likes-span">${image.like_count}</span>
    </span>
    <button id="like_button" class="like-btn" data-id="${image.likes}">Like</button>`
  }

  makeCommentLiHtml = (comment) => {
    return `<li class="comment-items" data-id="${comment.id}">${comment.content}<button class="delete-comment"> X</button></li>`
  }

  const initialFetch = () => {
    fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(res => res.json())
    .then(image => {
      let commentsArr = image.comments
      mainImageCard.innerHTML += makeImageHtml(image)
      commentsArr.forEach(comment => {
        commentsUl.innerHTML += makeCommentLiHtml(comment)
      })
    })
  }
  initialFetch()

  mainImageCard.addEventListener('click', (event) => {
    if (event.target.className === 'like-btn') {
      let likeText = parseInt(event.target.parentElement.children[2].children[0].innerText) + 1
      event.target.parentElement.children[2].children[0].innerText++
      fetch(`https://randopic.herokuapp.com/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          like_count: likeText
        })
      })
      .then(res => res.json())
    }
  })

// Bonus, mostly working
  ulTag.addEventListener('click', (event) => {
    if (event.target.className === 'delete-comment') {
      let commentId = event.target.parentElement.dataset.id
      console.log(commentId)
      fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
        method: 'DELETE'
      })
      .then(event.target.parentElement.remove())
    }
  })

  mainForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let imageId = event.target.parentElement.children[1].querySelector('#image_card').dataset.id
    let formInput = document.querySelector('input').value
    mainForm.reset()
    fetch('https://randopic.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: formInput
      })
    })
    .then(res => res.json())
    .then(event.target.parentElement.children[3].innerHTML += `<li class="comment-items">${formInput}<button class="delete-comment"> X</button></li>`)
  })
})
