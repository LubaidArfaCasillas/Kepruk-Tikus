const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('#score');
const timeBoard = document.querySelector('#time');
const startBtn = document.querySelector('#start-btn');

let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 15;

// Menghasilkan waktu acak (dalam milidetik)
function getRandomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Memilih lubang acak secara acak tanpa mengulang lubang yang sama berturut-turut
function getRandomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if (hole === lastHole) {
        return getRandomHole(holes);
    }
    
    lastHole = hole;
    return hole;
}

// Memunculkan tikus ke permukaan
function popUp() {
    const time = getRandomTime(500, 1000);
    const hole = getRandomHole(holes);
    const mole = hole.querySelector('.mole');
    
    mole.classList.add('up');

    setTimeout(() => {
        mole.classList.remove('up');
        if (!timeUp) popUp();
    }, time);
}

// Memulai permainan baru
function startGame() {
    score = 0;
    timeLeft = 15;
    timeUp = false;
    
    scoreBoard.textContent = score;
    timeBoard.textContent = timeLeft;
    
    popUp();
    
    // Hitung mundur waktu permainan
    const countdown = setInterval(() => {
        timeLeft--;
        timeBoard.textContent = timeLeft;
        
        if (timeLeft === 0) {
            clearInterval(countdown);
            timeUp = true;
            alert('Game Over! Skor akhir kamu: ' + score); // Opsional: Beri tahu pemain jika game selesai
        }
    }, 1000);
}

// Logika ketika tikus berhasil dipukul
function whack(e) {
    // Mencegah kecurangan (misalnya klik otomatis via script/bot)
    if (!e.isTrusted) return; 
    
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

// Event Listeners
moles.forEach(mole => mole.addEventListener('click', whack));
startBtn.addEventListener('click', startGame);