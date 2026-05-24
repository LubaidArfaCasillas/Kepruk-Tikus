const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('#score');
const timeBoard = document.querySelector('#time');
const startBtn = document.querySelector('#start-btn');

let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 15;

// 1. Menghasilkan durasi acak (dalam milidetik) untuk kemunculan tikus
function getRandomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// 2. Memilih lubang acak secara acak tanpa mengulang lubang yang sama berturut-turut
function getRandomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if (hole === lastHole) {
        return getRandomHole(holes);
    }
    
    lastHole = hole;
    return hole;
}

// 3. Logika untuk memunculkan tikus ke permukaan
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
    // Nonaktifkan tombol start agar tidak bisa di-klik ulang saat game jalan
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
            startBtn.disabled = false; // Aktifkan kembali tombol setelah game selesai
        }
    }, 1000);
}

// 5. Logika ketika tikus berhasil dipukul (di-klik)
function whack(e) {
    // Mencegah kecurangan (klik palsu via script/bot)
    if (!e.isTrusted) return; 
    
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

// --- Event Listeners ---
moles.forEach(mole => mole.addEventListener('click', whack));
startBtn.addEventListener('click', startGame);