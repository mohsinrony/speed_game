const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const circles = document.querySelectorAll(".circle");
const scoreDisplay = document.querySelector(".score");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const gameOver = document.querySelector('#gameOverMessage');
const finalScore = document.querySelector('#finalScore');
const messageForScoreDisplay = document.querySelector('#messageAfterGame');

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
// code from W3S page for the random number
/* function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} */

/*clickPlay = () => {
    if (clickSound.paused) {
        clickSound.play();
    } else {
        clickSound.
    }
}*/
const getRndInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/*console.log(getRndInt(0,3));*/

const clickCircle = (i) => {
  if (i !== active) {
   return endGame();
  }
  rounds--;
  score += 10;
  scoreDisplay.textContent = score;
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickCircle(i));
});
// same functionality as forEach() but for...of instead
/* for (const [i, item] of circles.entries()) {
  item.addEventListener('click', () => clickCircle(i))
} */
/*const myTimeout = setTimeout()
function myStopFunction() {
    clearTimeout(myTimeout)
}
*/

const enableEvents = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};
const disableEvents = () => {
  circles.forEach(circle => {
      circle.style.pointerEvents = "none";
  });
}

const startGame = () => {
  if (rounds >= 3) {
    return endGame();
  }
  gameOn = true;
  changeButton();
  enableEvents();
  const newActive = pickNew(active);

  circles[newActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = newActive;

  timer = setTimeout(startGame, pace);
  pace -= 10;
  rounds++;
  function pickNew(active) {
    const newActive = getRndInt(0, 3);
    if (newActive !== active) {
      return newActive;
    }

    return pickNew(active);
  }
  /*console.log(active);*/
};
const endGame = () => {
  //console.log('game ended');
  gameOn = false;
  modal.style.display = "block";
  changeButton();
    disableEvents();
    clearTimeout(timer);
    updateModal(score);
    showModal();
  
  clearTimeout(timer);
};
// the function changes the start/end button visibility
const changeButton = () => {
  if (gameOn) {
      startButton.style.display = 'none';
      endButton.style.display = 'block';
  } else {
      startButton.style.display = 'block';
      endButton.style.display = 'none';
  }
};
// close button calls resetGame();

const resetGame = () => {
  window.location.reload();
};

const updateModal = (score) => {
  scoreDisplay.textContent = score;
  if (score >= 0 && score <= 50) {
      messageForScoreDisplay.innerHTML = 'You can do it! </br>  Give it a go again!';
  } else if (score > 50 && score < 100) {
      messageForScoreDisplay.innerHTML = 'You are a good player!</br> Try again to be the champion!';
  } else if (score >= 100) {
      messageForScoreDisplay.innerHTML = 'You are a champion!</br> Time for some medal!';
  }
  gameOver.style.display = 'block';
  showModal();
}
const showModal = () => {
  modal.classList.add('visible');
 
}


startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
closeButton.addEventListener("click", resetGame);

/* put modal and use javascript to overlay the modal when the game starts and ends! 
1. start/end button
2. modal results
3. score
4. conditional message - you are looser, hooray great job!
5. have some sounds


*/
