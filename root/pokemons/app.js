
for (i = 1; i <= 151; i++) {
    let pokeDiv = document.createElement("div");
    let pokeImg = document.createElement("img");
    pokeImg.src = "https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/" + i + ".png";
    let pokeIndex = document.createElement("span");
    pokeIndex.innerText = "# " + i;

    document.querySelector("#container").append(pokeDiv);
    pokeDiv.appendChild(pokeImg);
    pokeDiv.appendChild(pokeIndex);

    pokeDiv.classList.add("pokeDiv");
}
