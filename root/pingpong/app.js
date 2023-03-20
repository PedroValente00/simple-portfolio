let button1 = document.querySelector("#button1");
let button2 = document.querySelector("#button2");
let button3 = document.querySelector("#button3");
let score1 = 0;
let score2 = 0;
let playerNum = document.querySelector("#players");

button1.addEventListener("click",function(){
    playerNum.disabled = true;
    score1 +=1;
    document.querySelector("#score1").innerText = score1;
    if(score1 === parseInt(playerNum.value)){
        button1.disabled = true;
        button2.disabled = true;
        document.querySelector("#score1").classList.add("green");
        document.querySelector("#score2").classList.add("red");
    }
})

button2.addEventListener("click",function(){
    playerNum.disabled = true;
    score2 +=1;
    document.querySelector("#score2").innerText = score2;
    if(score2 === parseInt(playerNum.value)){
        button1.disabled = true;
        button2.disabled = true;
        document.querySelector("#score1").classList.add("red");
        document.querySelector("#score2").classList.add("green");
    }
})

button3.addEventListener("click",function(){
    button1.disabled = false;
    button2.disabled = false;
    score1 = 0;
    score2 = 0;
    document.querySelector("#score1").classList.remove("green","red");
    document.querySelector("#score2").classList.remove("green","red");
    document.querySelector("#score1").innerText = score1;
    document.querySelector("#score2").innerText = score2;
    playerNum.disabled = false;
})
