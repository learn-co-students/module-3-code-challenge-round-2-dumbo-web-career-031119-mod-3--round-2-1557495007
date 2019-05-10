document.addEventListener('DOMContentLoaded', () => {

  let imageId = 2594 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  // let likeBtn = document.querySelector('#like_button')
  let imageCard = document.querySelector('#image_card')
  let likeBtn = document.querySelector('#like_btn')


  fetch('https://randopic.herokuapp.com/images/2594')
  .then(res => res.json())
  .then((imageObject) => {
    // JSON.stringify()
    console.log(imageObject.comments.title)
    // console.log(imageObject)
    imageCard.innerHTML = showImage(imageObject)
    // debugger
    imageObject.comments.forEach((comment) => {
      console.log(comment.title)
    })
  })

  // --------------


  // --------------

  imageCard.addEventListener('click', (event) => {
    // debugger
    if (event.target.innerText === 'Like') {
      let likeTag = parseInt(event.target.parentElement.querySelector('#likes').innerText)
      likeTag = likeTag + 1
      console.log(likeTag)
      let likeCount = parseInt(event.target.dataset.likes)
      likeTag = likeTag++
      // console.log(likeCount)

      fetch('https://randopic.herokuapp.com/images/2594', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({
          like_count: likeCount++,
        })
      })
    }
  })


  // imageCard.addEventListener('click', (event) => {
  //   if (event.target.innerText === 'Like') {
  //     let likeTag = parseInt(event.target.parentElement.querySelector('#likes').innerText)
  //     let likeCount = parseInt(event.target.dataset.likes)
  //     console.log(likeTag)
  //     likeTag++
  //     likeCount++
  //     fetch('https://randopic.herokuapp.com/images/2594', {
  //       method: 'PATCH',
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json"
  //       },
  //       body: JSON.stringify({
  //         "likes": likeCount++
  //       })
  //     })
  //     .then(res => res.json())
  //     .then(updatedObject => {
  //       likeTag.innerText = `${imageObject.like_count}`
  //       likeCount = updatedObject.likes



  // Make comment input into variable
  imageCard.addEventListener('submit', (event) => {
    event.preventDefault()
    debugger
    let commentContent = event.target.innerText[0].innerText
    console.log(commentContent)
  })

  let showImage = (imageObject) => {
    // debugger
    return `<img src="${imageObject.url}" id="${imageObject.id}" data-id="${imageObject.id}"/>
    <h4 id="name">${imageObject.name}</h4>
    <span class="like-span">Likes:
    <span id="likes">${imageObject.like_count}</span>
    </span>
    <button id="like_button" data-likes="${imageObject.like_count}">Like</button>
    <form id="comment_form">
    <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
    <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
    <li> ${imageObject.comments.title}for each comment goes here </li>
    </ul>`
  }

})
