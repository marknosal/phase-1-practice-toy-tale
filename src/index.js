let addToy = false;
const newToyListener = document.querySelector('form.add-toy-form').addEventListener('submit', addNewToy)

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchAllToys()
});

// Fetch Toys -> add to DOM
function fetchAllToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(function(data) {
      console.log(data)
      data.forEach(toy => toyToCard(toy))
    })
}

function toyToCard(toy){
  const newToyCard = document.createElement('div')
  newToyCard.className = 'card'
  document.getElementById('toy-collection').appendChild(newToyCard)

  const h2Name = document.createElement('h2')
  h2Name.textContent = toy.name
  newToyCard.appendChild(h2Name)

  const imgLink = document.createElement('img')
  imgLink.src = toy.image
  imgLink.className = 'toy-avatar'
  newToyCard.appendChild(imgLink)

  const likes = document.createElement('p')
  likes.textContent = `${toy.likes} Likes`
  newToyCard.appendChild(likes)

  const likeButton = document.createElement('button')
  likeButton.addEventListener('click', (event) => toyLiker(toy, event))
  likeButton.className = 'like-btn'
  likeButton.id = toy.id
  likeButton.textContent = 'Like ❤️'
  newToyCard.appendChild(likeButton)
}

function addNewToy(event) {
  event.preventDefault()
  console.log(event.target[0].value)
  const newToy = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      'name': event.target[0].value,
      'image': event.target[1].value,
      'likes': 0,
    })
  }
  fetch('http://localhost:3000/toys', newToy)
    .then(response => response.json())
    .then(newToy => toyToCard(newToy))

  document.querySelector('form.add-toy-form').reset()
}

function toyLiker(toy, event) {
  toy.likes += 1
  const increaseLikes = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      'likes': toy.likes
    })
  }
  fetch('http://localhost:3000/toys/' + `${toy.id}`, increaseLikes)
    .then(response => response.json())
    .then(updatedToy => {
      const updatedLikes = event.target.previousSibling
      updatedLikes.textContent = `${toy.likes} Likes`
      console.log(toy.likes)
    })
}