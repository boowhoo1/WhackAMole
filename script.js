let startTime;
let previousTime;
let counter = 0;
let animationFrame;
const gameDuration = 60000;

function start() {
    startTime = Date.now();
    previousTime = Date.now();


    animationFrame = window.requestAnimationFrame(loop);

    document.querySelector("#start").style.display = "none";
    document.querySelector("#game").style.display = "grid";
}
function end() {
    window.cancelAnimationFrame(animationFrame);
    document.querySelector("#game").style.display = "none";
    document.querySelector("#end").style.display = "flex";
}

function loop() {
    const moles = document.querySelectorAll(".mole");
    if (moles.length === 0) {
        return;
    }

    if (Date.now() - previousTime > Math.random() * 1500 + 1000) {
        const random = Math.floor(Math.random() * moles.length);
        previousTime = Date.now();
        up(moles[random]);
    }

    const score = document.querySelector("#score");
    score.innerHTML = counter;
    const timeleft = document.querySelector("#timeleft");
    timeleft.innerHTML = Math.round((gameDuration - (Date.now() - startTime)) / 1000) + "s";

    if (Date.now() - startTime > gameDuration) {
        end();
    }
    else {
        animationFrame = window.requestAnimationFrame(loop);
    }
}

function hit(mole) {
    const hasHeightChanged = parseInt(getComputedStyle(mole).top) < 9;
    const wasAlreadyClicked = mole.classList.contains('mole-up');

    if (hasHeightChanged && wasAlreadyClicked) {
        mole.setAttribute("src", "./image/mole-hit.svg");
        down(mole);
        counter = counter + 1;
    }
}
function up(mole) {
    mole.classList.add("mole-up");
    setTimeout(function () {
        down(mole);
    }, Math.random() * 800 + 500);
}
function down(mole) {
    mole.classList.remove("mole-up");
    setTimeout(function () {
        mole.setAttribute("src", "./image/mole.svg");
    }, 500);
}
