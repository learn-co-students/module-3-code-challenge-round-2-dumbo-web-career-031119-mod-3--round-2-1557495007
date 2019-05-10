document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2595 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imgCard = document.querySelector("#image_card")
  let imgCommentUl = document.querySelector("#comments")
  let commentForm = document.querySelector("#comment_form")

  const commentLi = (comment) => {
    return `<li>${comment.content}</li>`
  }



  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(res => res.json())
  .then(img => {
    imgCard.querySelector("#image").src = img.url
    imgCard.querySelector("#name").innerText = img.name
    imgCard.querySelector("#likes").innerText = img.like_count 
    let imgComments = img.comments
    imgComments.forEach(comment => {
      imgCommentUl.innerHTML += commentLi(comment)
  
    })

  })


  imgCard.addEventListener('click', (event)=>{
    if(event.target.id === "like_button"){
      let spanTag = event.target.parentElement.querySelector("#likes")
      
      let likes = parseInt(spanTag.innerText)
      likes++ 

      spanTag.innerText = `${likes}`

      fetch(`https://randopic.herokuapp.com/likes`, {
          method: "POST",
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image_id: 2595
          })
        })
      }
  })



    commentForm.addEventListener('submit', (event) => {
      event.preventDefault()
      let form = event.target
      let newComment = form.comment.value
    })



})



