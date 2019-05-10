document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2593 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const imageTag = document.getElementById('image')
  let imageNameTag = document.getElementById('name')
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentListTag = document.getElementById('comments')
  let likesSpanTag = document.getElementById('likes')
  let node = document.createElement("LI"); 
  
  
  const commentArray = (comment) => {
    comment.forEach(comment)
  }

  const makeImageHTML = (imageRes) => {
    return `${imageRes.url}`
  }
  const makeImageName = (imageRes) => {
    return `${imageRes.name}`
  }
  const makeLikesShow = (imageRes) => {
    return `${imageRes.like_count}`
  }
  const makeCommentShow = (imageRes) => {
    imageRes.comments.forEach(stuff => {
      console.log(stuff.content)
     return `${stuff.content}`
    })
  }

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(res => res.json())
  .then((imageRes) => {
    imageTag.src = makeImageHTML(imageRes)
    imageNameTag.innerText = makeImageName(imageRes)
    likesSpanTag.innerHTML = makeLikesShow(imageRes)
    commentListTag.innerHTML = makeCommentShow(imageRes)
    //console.log(imageRes)
    
  })


})

{/* <h4 id="name">${imageRes.name}</h4>
    <span id="likes">${imageRes.like_count}</span> */}