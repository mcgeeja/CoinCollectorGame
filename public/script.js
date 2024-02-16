import { getCarRect, setupCar, updateCar } from "./car.js"
import { getCoinRects, setupCoin, updateCoin } from "./coin.js"
import { setupGround, updateGround } from "./ground.js"
import { getObjectRects, setupObject, updateObject } from "./object.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const endGameElm = document.querySelector("[data-end]")
const endScoreElem = document.querySelector("[data-endScore]")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score = 0
let firstStart = 1;
let audio = null
function playMusic(){
if(firstStart == 1){
  audio = new Audio('CoinCollectorBeat.wav');
  audio.play();
  firstStart++
}else{
  return
}
  
}

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateCar(delta, speedScale)
  updateCoin(delta, speedScale)
  updateObject(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)

  if (checkLose()) return handleLose()
  checkGotCoin()
  lastTime = time
  window.requestAnimationFrame(update)
}
function checkGotCoin(){
  const carRect = getCarRect()
  score = getCoinRects(carRect, score)

}
function checkLose() {
  const carRect = getCarRect()
  return getObjectRects().some(rect => isCollision(rect, carRect))
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right-70 &&
    rect1.top < rect2.bottom - 70 &&
    rect1.right - 70 > rect2.left  &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupCar()
  setupCoin()
  setupObject()
  worldElem.classList.remove("hide")
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
  playMusic()
  


}

function handleLose() {
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
    worldElem.classList.add("hide")
    endScoreElem.innerHTML = `Score = ${Math.trunc(score)}`
  }, 100)
}

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
