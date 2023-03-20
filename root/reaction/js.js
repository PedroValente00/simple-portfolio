const doggo = document.querySelector("#dog");
const bullet = document.querySelector("#bullet");
const music = document.querySelector("#music");
const soundEffects = document.querySelector("#soundEffects");
const pistol = document.querySelector("#pistol");
let doggoShotCount = 0;
let difficultySelected; //will be used by getDifficulty()
let isSoundOn = false; // will be used by gameStaart()
let collision = false; // will by used by collision()
let roundDurationMaxInput = 10;
let isBulletAirborne = false;
let collisionTimer; // will be used by shootBullet()
let wasSpacePressedCorrectly = false;
let hasGameStarted = false;
let shootBulletAtRandomTime;
let detectRate;
let surpriseSelected = false;//used by getSurpriseOption()
let roundDuration;
let revenge = 0;

document.querySelector("#startButton").addEventListener("click", () => {
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#game").style.display = "block";
    gameStart();
});

function gameStart() {
    hasGameStarted = true;
    getDifficulty(); //sets difficultySelected from the radio inputs to a value;
    getSurpriseOption();
    if (isSoundOn) { playMusic() };
    const roundDurationMinimum = 5000; //5 seconds
    let roundDurationMax = roundDurationMaxInput * 1000;
    roundDuration = Math.floor(Math.random() * (roundDurationMax - roundDurationMinimum) + roundDurationMinimum);
    if (surpriseSelected === "true") { randomSurprises(); }

    //fire bullet
    shootBulletAtRandomTime = setTimeout(() => shootBullet(), roundDuration);
    getRevenge();
}

document.querySelector("#rangeTimeInput").addEventListener("input", () => {
    let timeInput = document.querySelector("#rangeTimeInput").value;
    let timeOutput = document.querySelector("#timeOutput");
    timeOutput.innerText = timeInput;
    roundDurationMaxInput = timeInput;
})

function getDifficulty() {
    const radioBttns = document.querySelectorAll('input[name="difficulty"]');
    radioBttns.forEach((eachRadio) => {
        if (eachRadio.checked) { difficultySelected = eachRadio.value }
    });
}

function getSurpriseOption() {
    const radioBttns = document.querySelectorAll('input[name="surprise"]');
    radioBttns.forEach((eachRadio) => {
        if (eachRadio.checked) { surpriseSelected = eachRadio.value }
    });
}

function randomSurprises() {
    let surprise1 = document.querySelector("#surprise1");
    setTimeout(() => {
        surprise1.style.animationName = "goUpAnimation";
    }, Math.floor(Math.random() * roundDuration));

    let surprise2 = document.querySelector("#surprise2");
    setTimeout(() => {
        surprise2.style.animationName = "animation2";
    }, Math.floor(Math.random() * roundDuration));

    if (difficultySelected === "easy") {
        Math.random() < 0.5 ? pistol.src = "img/pistol1.png" : pistol.src = "img/pistol2.png";
    }
    else if (difficultySelected === "medium") {
        Math.random() < 0.5 ? pistol.src = "img/pistol3.png" : pistol.src = "img/pistol4.png";
    }
    else if (difficultySelected === "hard") {
        pistol.src = "img/pistol5.png";
    }

    pistol.style.animation = "3s infinite upAndDownAnim";
}

function getRevenge() {//called on gameStart()
    if (doggoShotCount >= 5) {
        setTimeout(() => {
            document.querySelector("#dog").src = "img/revengeDog.png";
            if (isSoundOn) {
                soundEffects.src = "sound/roar.wav";
                soundEffects.play();
            }
            setTimeout(() => {
                revenge = 1;//used by endGame()
                endGame();
            }, 1000);
        }, Math.floor(Math.random() * roundDuration));
    }
}

function playMusic() {
    if (difficultySelected === "easy") {
        music.src = "sound/song1.wav";
        music.currentTime = 0;
        music.play();
    }
    else if (difficultySelected === "medium") {
        music.src = "sound/song2.wav";
        music.currentTime = 0;
        music.play();
    }
    else if (difficultySelected === "hard") {
        music.src = "sound/song3.wav";
        music.currentTime = 0;
        music.play();
    }
}

function shootBullet() {
    if (isSoundOn) { soundEffects.src = "sound/shot.wav"; soundEffects.play() }
    if (difficultySelected === "easy") {
        bullet.style.transitionDuration = "5s";
        detectRate = 100;
    }
    else if (difficultySelected === "medium") {
        bullet.style.transitionDuration = "2s";
        detectRate = 50;
    }
    else if (difficultySelected === "hard") {
        bullet.style.transitionDuration = "0.5s";
        detectRate = 10;

    }
    bullet.classList.remove("invisible");
    bullet.classList.add("moving");
    isBulletAirborne = true;
    if (hasGameStarted) {// without this "if" the interval keeps running 
        collisionTimer = setInterval(() => {
            let colliderBullet = bullet.getBoundingClientRect().left;
            let colliderDoggo = doggo.getBoundingClientRect().right;
            if (colliderBullet - colliderDoggo < -20) { // poor doggo was hit
                if (isSoundOn) {
                    soundEffects.src = "sound/whimper.wav";
                    soundEffects.play();
                }
                doggoShotCount++;
                endGame();
            }
        }, detectRate);
    }
}

document.addEventListener("keydown", (keyPressed) => {
    if (keyPressed.code === "Space" && hasGameStarted) {
        if (isBulletAirborne) { // bullet in the air and space pressed
            wasSpacePressedCorrectly = true;
            if (isSoundOn) {
                if (difficultySelected === "easy") {
                    soundEffects.src = "sound/yay.wav";
                    soundEffects.play();
                }
                else if (difficultySelected === "medium") {
                    soundEffects.src = "sound/victory1.wav";
                    soundEffects.play();
                }
                else if (difficultySelected === "hard") {
                    soundEffects.src = "sound/victory2.wav";
                    soundEffects.play();
                }
            }
        }
        else if (!isBulletAirborne) { // space pressed but bullet not in the air
            if (isSoundOn) {
                soundEffects.src = "sound/disappointment.wav";
                soundEffects.play();
            }
        }
        endGame();
    }
})

function endGame() {
    clearTimeout(shootBulletAtRandomTime);//cancel the shot
    hasGameStarted = false;
    clearInterval(collisionTimer);
    bullet.classList.add("invisible");
    bullet.classList.remove("moving");
    isBulletAirborne = false;
    collision = false;
    document.querySelector("#surprise1").style.animationName = "";
    document.querySelector("#surprise1").style.animationFillMode = "";
    document.querySelector("#surprise2").style.animationName = "";
    document.querySelector("#surprise2").style.animationFillMode = "";
    pistol.style.animation = "";
    pistol.src = "img/pistol1.png";
    music.pause();
    if (wasSpacePressedCorrectly) {
        wasSpacePressedCorrectly = false;
        if (difficultySelected === "hard") {
            document.querySelector("#newspaper").style.display = "block";
        }
    }
    document.querySelector("#menu").style.display = "block";
    document.querySelector("#game").style.display = "none";
    updateDogCount();
    document.querySelector("#dog").src = "img/dog.png";
    if (revenge === 1) {
        if (isSoundOn) {
            soundEffects.src = "sound/revenge.wav";
            soundEffects.play();
            document.querySelector("#crackSound").play();
        }
        document.querySelector("#crack").style.display = "block";
    }
}

document.querySelector("#soundOn").addEventListener("click", function () {
    if (!isSoundOn) {
        this.classList.toggle("soundSelected");
        document.querySelector("#soundOff").classList.toggle("soundSelected");
        document.querySelector("#reloadSound").play();
        isSoundOn = true;
    }

});
document.querySelector("#soundOff").addEventListener("click", function () {
    if (isSoundOn) {
        this.classList.toggle("soundSelected");
        document.querySelector("#soundOn").classList.toggle("soundSelected");
        isSoundOn = false;

    }
});

function updateDogCount() {
    if (doggoShotCount > 0) {
        if (doggoShotCount < 5) {
            document.querySelector("#timesLost").style.visibility = "visible";
        }
        else if (doggoShotCount === 5) {
            document.querySelector("#timesLost").style.color = "red";
            document.querySelector("#revengeText").style.visibility = "visible";
        }
    }
    document.querySelector("#timesLost span").innerText = doggoShotCount;

}
