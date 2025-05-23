async function callJson() {
    const table = await fetch("http://127.0.0.1:5501/assets/data/recette.json")
    const recipe = await table.json()
    return recipe
}

async function callData() {
    const data = await callJson();
    return data
}

const recipes = []
const container = document.querySelector("#recipesContainer")
const popup = document.querySelector(".popup_info")

recipes.push(await callData());

recipes[0].recipes.map((rec) => {
    const div = document.createElement("article")
    div.classList.add("recipe-card")

    div.innerHTML = `
    <div class="title_card">
        <h2>${rec.name}</h2>
        <img class="info" src="../assets/images/info.png" />
    </div>
    <p><strong>Nombre de personne :</strong>${rec.servings}</p>
    <ul class="container_ingredient"></ul>
    `
    const ul = div.querySelector(".container_ingredient");

    rec.ingredients.map((ing) => {

        if(ing.unit == undefined){
            ul.innerHTML += `
            <li>${ing.ingredient}</li>
            `
        } else if (ing.quantity == undefined){
            ul.innerHTML += `
            <li>${ing.unit} ${ing.ingredient}</li>
            `
        } else {
            ul.innerHTML += `
            <li>${ing.quantity} ${ing.unit} ${ing.ingredient}</li>
            `
        }

    })

    
    
    container.appendChild(div)
})