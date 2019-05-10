document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2591 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let image = document.querySelector('#image')
  let imageName = document.getElementById('name')
  let likes = document.getElementById('like_button')
  let comments = document.getElementById('comments')
  let like_button = document.getElementById('like_button')
  let likeCount = 0;
  let commentForm = document.getElementById('comment_form')




  fetch(imageURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
  	console.log(object)
      image.src = object.url;
      image.dataset.id = image.id
      imageName.innerText = object.name;
      likes.innerText = object.like_count;
      likes.dataset.id = object.id
      let liTag = document.createElement('li')
      comments.append(liTag)
      let comment = object.comments.forEach(function(comment){
      	comment.content
      liTag.innerHTML = comment.content
      comments.dataset.id = comment.id

      })
  });


  like_button.addEventListener('click', (event)=>{
  	event.preventDefault()
  	let likeCount = parseInt(event.target.innerHTML)
  	like_button.innerHTML++;
  	fetch(likeURL, {
  		method: 'POST',
  		headers: {
  		'Accept': 'application/json',
  		'Content-Type': 'application/json'
  	},
  	body: JSON.stringify({
  		image_id: imageId
  	})
  	}).then(response => response.json())


  })

  commentForm.addEventListener('submit', (event)=>{

  	let form = event.target
  	let userComment = form.comment.value

  	event 
  	debugger

  	fetch(commentsURL, {
  	method: 'POST',
  	headers: {
  		'Accept': 'application/json',
  		'Content-Type': 'application/json'
  	},
  	body: JSON.stringify({
  		
  		image_id: imageId
  		// comments: userComment
  	})
  	}).then(response => response.json())

  })




})
