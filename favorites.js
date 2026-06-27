let list =
document.getElementById("favoriteList");



let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];



if(favorites.length === 0){


list.innerHTML =
"<h3>No favorite tools saved yet ❤️</h3>";


}



else{


favorites.forEach(tool=>{


let box =
document.createElement("div");


box.className="tool-card";


box.innerHTML = `

<h2>${tool.name}</h2>

<p>Your saved AI tool</p>

<a href="${tool.url}" target="_blank" class="tool-btn">
Open Tool
</a>

<button class="favorite-btn remove-btn"
onclick="removeFavorite('${tool.name}')">
🗑 Remove
</button>

`;


list.appendChild(box);


});


}



function removeFavorite(toolName) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(tool => tool.name !== toolName);

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    location.reload();

}