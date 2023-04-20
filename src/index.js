let addToy = false;

function createCard(toy) {
    let card = document.createElement("div");
    card.classList.add("card")
    let h2 = document.createElement("h2");
    h2.textContent = toy.name;
    let img = document.createElement("img");
    img.src = toy.image;
    img.classList.add("toy-avatar");
    let p = document.createElement("p");
    p.textContent = `${toy.likes} Likes`;
    let button = document.createElement("button");
    button.classList.add("like-btn");
    button.setAttribute("id", `${toy.id}`)
    button.textContent = "Like ❤️"
    button.addEventListener("click", () => {
      toy.likes += 1;
      p.textContent = `${toy.likes} Likes`;
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: toy.likes
        })
      })
    })
    let collection = document.querySelector("#toy-collection");
    collection.appendChild(card);
    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);
}
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

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => json.forEach(toy => createCard(toy)));    

  let form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = e.target.children[1].value;
    let url = e.target.children[3].value;

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: `${name}`,
        image: `${url}`,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(json => createCard(json)); 
  })


});
