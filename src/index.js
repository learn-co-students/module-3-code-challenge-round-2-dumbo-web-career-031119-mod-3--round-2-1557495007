const img = document.getElementById('image');
const imgName = document.getElementById('name');
const imgLikes = document.getElementById('likes');
const imgComments = document.getElementById('comments');
const imgCard = document.getElementById('image_card');
const imgCommentForm = document.getElementById('comment_form');


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2596 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(`${imageURL}`)
  .then(resp => resp.json())
  .then(json => changeData(json));
  
  imgCard.addEventListener('click', (event) => {
    if (event.target.id === 'like_button'){
      imgLikes.innerHTML = parseInt(imgLikes.innerHTML) + 1
      fetch(`${likeURL}`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId
        })
    })}
  });

  imgCommentForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let newComment = event.target.comment.value;
    imgComments.innerHTML += `<li>${newComment} </li>`;

    fetch(`${commentsURL}`,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: newComment
      })
    })
  })
  
//     imgCommentForm.addEventListener('submit', (event) => {
//     event.preventDefault()

//     let newComment = event.target.comment.value;
//     // imgComments.innerHTML += `<li>${newComment} </li>`;

//     fetch(`${commentsURL}`,{
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         image_id: imageId,
//         content: newComment
//       })
//     })
//     .then(resp => resp.json())
//     .then(json => )
//   })
// })


const changeData = (data) => {
  img.src = data.url;
  imgName.innerHTML = data.name;
  imgLikes.innerHTML = data.like_count
  data.comments.forEach((comment) => {
    imgComments.innerHTML += `
    <li>${comment.content} <button id=${comment.id}>Delete Comment</button></li>`
  })
}