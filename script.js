const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const timeBoard = document.querySelector('#time');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('#start-btn');

let lastHole;
let timeUp = false;
let score = 0;
let waktu = 15;

function waktuAcak(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function lubangAcak(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) return lubangAcak(holes);
    lastHole = hole;
    return hole;
}

function munculkanTikus() {
    const time = waktuAcak(500, 1000);
    const hole = lubangAcak(holes);
    hole.querySelector('.mole').classList.add('up');
    
    setTimeout(() => {
        hole.querySelector('.mole').classList.remove('up');
        if (!timeUp) munculkanTikus();
    }, time);
}

function mulaiGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    waktu = 15;
    timeBoard.textContent = waktu;
    munculkanTikus();
    
    const hitungMundur = setInterval(() => {
        waktu--;
        timeBoard.textContent = waktu;
        if (waktu === 0) {
            clearInterval(hitungMundur);
            timeUp = true;
        }
    }, 1000);
}

function pukulTikus(e) {
    score++;
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', pukulTikus));