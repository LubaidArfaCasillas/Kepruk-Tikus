const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('#score');
const timeBoard = document.querySelector('#time');
const startBtn = document.querySelector('#start-btn');

let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 15;

// 1. Menghasilkan durasi acak (dalam milidetik)
function getRandomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// 2. Memilih lubang acak tanpa mengulang lubang yang sama berturut-turut
function getRandomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if (hole === lastHole) {
        return getRandomHole(holes);
    }
    
    lastHole = hole;
    return hole;
}

// 3. Memunculkan tikus ke permukaan
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

// 4. Memulai permainan baru
function startGame() {
    startBtn.disabled = true;
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
            startBtn.disabled = false;
            
            setTimeout(() => {
                alert(`Game Over! Skor akhir kamu: ${score}`);
            }, 500);
        }
    }, 1000);
}

// 5. Logika ketika tikus berhasil dipukul
function whack(e) {
    if (!e.isTrusted) return; // Anticheat bot/script
    
    score++;
    scoreBoard.textContent = score;
    
    // Memberikan efek animasi terpukul sesuai dengan CSS .mole.hit
    this.classList.add('hit');
    
    // Sembunyikan tikus kembali dan reset state-nya setelah 150ms
    setTimeout(() => {
        this.classList.remove('up');
        this.classList.remove('hit');
    }, 150);
}

// --- Event Listeners ---
moles.forEach(mole => mole.addEventListener('click', whack));
startBtn.addEventListener('click', startGame);