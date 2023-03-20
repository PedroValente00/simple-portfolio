
document.querySelector("#generateButton").addEventListener("click", generateColor);

function generateColor(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    
    document.querySelector("h1").innerText = `RGB (${r}, ${g}, ${b})`;
    document.body.style.backgroundColor = `rgb(${r},${g},${b})`;

}