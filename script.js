const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const newGameButton = document.querySelector("#newGameButton");
const circlesContainer = document.querySelector(".circles");
const scoreDisplay = document.querySelector(".score");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const gameOver = document.querySelector("#gameOverMessage");
const finalScore = document.querySelector("#finalScore");
const messageAfterGame = document.querySelector("#messageAfterGame");
const playerNameInput = document.querySelector("#playerName");
const difficultySelect = document.querySelector("#difficulty");
const timeLimitInput = document.querySelector("#timeLimit");
const timerDisplay = document.querySelector(".timer");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// global variables
let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;
let gameOn = false;
let playerName = "";
let difficulty = "easy";
let timeLimit = 30;
let countdown;

newGameButton.style.display = "block";
startButton.style.display = "none";
endButton.style.display = "none";

const kickSound = new Audio("assets/sounds/soccer-kick.mp3");
kickSound.volume = 0.5;
const crowdSound = new Audio("assets/sounds/crowd-cheering.mp3");
crowdSound.volume = 0.5;
const endSound = new Audio("assets/sounds/game-over-sound.mp3");
endSound.volume = 0.5;

const clickPlay = () => {
  if (kickSound.paused) {
    kickSound.play();
  } else {
    kickSound.currentTime = 0;
  }
};

const getRndInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clickCircle = (i) => {
  clickPlay();
  if (i !== active) {
    return endGame();
  }
  rounds--;
  score += 10;
  scoreDisplay.textContent = score;
};

const generateCircles = (num) => {
  circlesContainer.innerHTML = "";
  for (let i = 0; i < num; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.addEventListener("click", () => clickCircle(i));
    circlesContainer.appendChild(circle);
  }
};

const startGame = () => {
  if (rounds >= 3) {
    return endGame();
  }
  gameOn = true;
  crowdSound.play();
  changeButton();
  enableEvents();
  countdown = setInterval(updateTimer, 1000);
  const newActive = pickNew(active);

  document.querySelectorAll(".circle")[newActive].classList.add("active");
  document.querySelectorAll(".circle")[active].classList.remove("active");

  active = newActive;
  timer = setTimeout(startGame, pace);
  pace -= 10;
  rounds++;
};

const pickNew = (active) => {
  const newActive = getRndInt(
    0,
    document.querySelectorAll(".circle").length - 1
  );
  if (newActive !== active) {
    return newActive;
  }
  return pickNew(active);
};

const endGame = () => {
  gameOn = false;
  modal.style.display = "block";
  changeButton();
  disableEvents();
  clearTimeout(timer);
  clearInterval(countdown);
  updateModal();
};

const resetGame = () => {
  window.location.reload();
};

const updateModal = () => {
  finalScore.textContent = score;
  if (score <= 50) {
    messageAfterGame.innerHTML = `${playerName}, you can do it! Give it a go again!`;
  } else if (score > 50 && score < 100) {
    messageAfterGame.innerHTML = `${playerName}, you are a good player! Try again to be the champion!`;
  } else {
    messageAfterGame.innerHTML = `${playerName}, you are a champion! Time for a medal!`;
  }
  gameOver.style.display = "block";
  kickSound.pause();
  endSound.play();
};

const changeButton = () => {
  if (gameOn) {
    startButton.style.display = "none"; // Hide Start Game button
    endButton.style.display = "block"; // Show End Game button
  } else if (score > 0) {
    startButton.style.display = "block"; // Show Start Game button if game over and score exists
    endButton.style.display = "none"; // Hide End Game button
  } else {
    startButton.style.display = "block"; // Hide Start Game button if no score yet
    endButton.style.display = "none"; // Hide End Game button when game hasn't started
  }
};

const enableEvents = () => {
  document
    .querySelectorAll(".circle")
    .forEach((circle) => (circle.style.pointerEvents = "auto"));
};

const disableEvents = () => {
  document
    .querySelectorAll(".circle")
    .forEach((circle) => (circle.style.pointerEvents = "none"));
};

const initializeGame = () => {
  playerName = playerNameInput.value || "Player";
  difficulty = difficultySelect.value;
  timeLimit = parseInt(timeLimitInput.value) || 30;
  timerDisplay.textContent = timeLimit;
  const circleCount =
    difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 5;
  generateCircles(circleCount);
  score = 0;
  rounds = 0;
  pace = 1000;
  scoreDisplay.textContent = score;
};

const updateTimer = () => {
  if (timeLimit > 0) {
    timeLimit--;
    timerDisplay.textContent = timeLimit;
  } else {
    endGame();
  }
};

newGameButton.addEventListener("click", () => {
  initializeGame();
  newGameButton.style.display = "none"; // Hide New Game button
  startButton.style.display = "block"; // Show Start Game button
  changeButton();
});
startButton.addEventListener("click", () => {
  startGame();
  changeButton(); // Update the button visibility
});
endButton.addEventListener("click", () => {
  endGame();
  changeButton(); // Update the button visibility
});
closeButton.addEventListener("click", resetGame);
