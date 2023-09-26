const stratButton = document.querySelector('#startButton')
const endButton = document.querySelector('#endButton')
const circles = document.querySelectorAll('.circle')
const scoreDisplay = document.querySelector('.score')
// global variables
let score = 0;
let timer;
let  pace = 1000;
let active = 0;
let rounds = 0;

// code from w3schools
   const getRndInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    
   console.log(getRndInt(0,3));

const clickCircle = (i) => {
    if (i !== active) {
        endGame()
    }
   rounds--
    score += 10
    scoreDisplay.textContent = score
} 
circles.forEach((circle, i) => {
    circle.addEventListener('click', () => clickCircle(i))
})
/* same funtionality  as forEach() but for.....of instead for (const[i, ]) */
/*const myTimeout = setTimeout()
function myStopFunction() {
    clearTimeout(myTimeout)
}
*/

const enableEvents = () => {
    circles.forEach(circle => {
        circle.style.pointerEvents = "auto"
    })
}
const startGame = () => {
    if (rounds >= 3) {
        return endGame()
    }
    enableEvents();
const newActive = pickNew(active)

circles[newActive].classList.toggle('active')
circles[active].classList.remove('active')

active = newActive;

 timer = setTimeout(startGame, pace)
 pace -= 10
rounds++
function pickNew(active) {
    const newActive = getRndInt(0, 3)
    if (newActive !== active) {
    return newActive
}

    return pickNew(active)
}
console.log(active);
}
const endGame = () => {
console.log('ended game');
clearTimeout(timer);
resetGame();
}
const resetGame = () => {
    window.location.reload()
}

stratButton.addEventListener('click', startGame)
endButton.addEventListener('click', endGame)


/* put modal and use javascript to overlay the modal when the game starts and ends! 
1. start/end button
2. modal results
3. score
4. conditional message - you are looser, hooray great job!
5. have some sounds


*/