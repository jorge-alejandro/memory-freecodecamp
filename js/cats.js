// Declare variables for cards, cards flipped, for locking the board, and for identifying both cards clicked

const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;
let misses = 0;
let tries = 0;

//Variables for the score sistem and metrics

const matchesSpan = document.getElementById('matches');
const missesSpan = document.getElementById('misses');
const triesSpan = document.getElementById('tries');
const finalResultSpan = document.getElementById('playAgainMessage');

//Variables to measure the Time

let time = 0;
let timer;

// Add listener over the cards to be able to play with them

cards.forEach(card => card.addEventListener('click', flipCard));

// This function includes the property flips to the cards so the effect is added using the CSS

function flipCard() {
  if (lockBoard) return;
  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    checkMatch();
  }
};

// This function is meant to check if both cards selected by the users have the same image.
// If both cards are the same, the listener is erased so both cards remain flipped. If not, both cards return to the original position.

const checkMatch = () => {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matches += 1;
    matchesSpan.textContent = matches;
    tries += 1;
    triesSpan.textContent = tries;
    finishGame();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      lockBoard = false;
      misses += 1;
      missesSpan.textContent = misses;
      tries += 1;
      triesSpan.textContent = tries;
    }, 1500);
  }
};

// To make the cards appear randomly

const shuffle = () => {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
};

shuffle();

// Check if the game is complete

const finishGame = () => {
  if (matches === 6) {
    stopTimer(); 
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('playAgainBtn').style.display = 'block';
    document.getElementById('playAgainMessage').style.display = 'block';
    document.getElementById('startMessage').style.display = 'none';
    overlay.style.display = 'flex';
    popup.style.display = 'flex';
    endTime = new Date().getTime();
    endTimeHuman = msToTime(endTime)
    finalResultSpan.textContent = `Your final result is misses: ${misses}, matches ${matches} y tries ${tries}. And the the is ${endTimeHuman}`;
  }
};

//Showing on and off the popup for starting the game

const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const startBtn = document.querySelector("#startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");


startBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  popup.style.display = "none";
  startTimer(); 
});

playAgainBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  popup.style.display = "none";
  
  // Reset game
  
  matches = 0;
  misses = 0;
  tries = 0;
  matchesSpan.textContent = matches;
  missesSpan.textContent = misses;
  triesSpan.textContent = tries;
  
  cards.forEach
  (card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  shuffle();
});

overlay.style.display = "flex";
popup.style.display = "flex";

// Add timer variables
let startTime;
let timerInterval;
const timerElement = document.getElementById("timer");
let endTime;

// Update the timer
function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Start the timer
function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60);

  return `${minutes}m ${seconds}s ${milliseconds}ms`;
}