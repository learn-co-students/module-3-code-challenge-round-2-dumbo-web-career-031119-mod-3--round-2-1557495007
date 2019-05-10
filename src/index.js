document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 2592 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

let viewImage = document.getElementById('image')
let imageTitle = document.getElementById('name')
let imageLikes =document.getElementById('likes')
let commentSection = document.getElementById('comments')
let imageCard = document.getElementById('image_card')
let buttonClick = document.getElementById('like_button')



fetch(`https://randopic.herokuapp.com/images/2592`)
.then(res => res.json())
.then(image => {
  viewImage.src = image.url
  viewImage.dataset.id = image.id
  imageTitle.innerHTML = image.name
  imageLikes.innerHTML = image.like_count
  buttonClick.dataset.id = image.id

  commentSection.innerHTML += `<li>${image.comments[0].content}</li>`
})


document.addEventListener('SUBMIT', (event) =>{
  something.innerHTMl += createComment(comment)
})
//FETCH NOT FOUND :/
imageCard.addEventListener('click', (event) =>
{
  if (event.target.tagName === 'BUTTON') {
    let likes = imageLikes.innerHTML++
        likes
        let imageId = buttonClick
        fetch(`https://randopic.herokuapp.com/images/2592`, {

          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            like_count: likes,
          })
        })
  }

})




const createComment = (comment) => {
  return `<li> ${image.comments} </li>`
}

const createComments = (comment) => {
  return `<li>${image.comments}</li>`
}
