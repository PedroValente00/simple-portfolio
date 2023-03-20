document.addEventListener("scroll",doStuff);

let red = 255;
let green = 255;
let blue = 255;

function doStuff(){

    if (red > 0){
        let row = document.createElement("div");
        document.body.append(row);
        row.style.backgroundColor = `rgb(${red},255,255)`;
        red -=1;
    } else if(red === 0 && green > 0 && blue > 0){
        let row = document.createElement("div");
        document.body.append(row);
        row.style.backgroundColor = `rgb(0,${green},${blue})`;
        green -=1;
        blue -=1;
    } else if(red === 0 && green === 0 && blue === 0){
        document.removeEventListener("scroll",doStuff);
        alert("it's over");
    }
}