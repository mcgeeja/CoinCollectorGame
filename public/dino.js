import {
  incrementCustomProperty,
  setCustomProperty
} from "./updateCustomProperty.js"

const CarElm = document.querySelector("[data-dino]")

let speed = 0.05
let isMovingLeft
let isMovingRight

export function setupCar() {
  isMovingLeft = false
  isMovingRight = false
  setCustomProperty(CarElm, "--left", 33)
  document.removeEventListener("keydown", onMove)
  document.addEventListener("keydown", onMove)
  document.addEventListener("keyup", stopMoving)
}

export function updateCar(delta, speedScale) {
  // handleMove(delta, speedScale)
  handleMoving(delta, speedScale)
}

export function getCarRect() {
  return CarElm.getBoundingClientRect()
}

function stopMoving(e) {
  isMovingLeft = false;
  isMovingRight = false;
}


function handleMoving(delta, speedScale) {
  if (isMovingLeft) {
    // Move left
    if (getCarRect().left > 20) {
      incrementCustomProperty(CarElm, "--left", delta * speedScale * speed * -1)
    }
  } else if (isMovingRight) {
    // Move right
    if (getCarRect().right < 900) {
      incrementCustomProperty(CarElm, "--left", delta * speedScale * speed * 1)
    }
  }
}


function onMove(e) {
  if (e.code === "KeyA") {
    console.log("A Hit")
    speed = 0.05
    isMovingLeft = true;
    isMovingRight = false;
  } else if (e.code === "KeyD") {
    speed = 0.05
    console.log("D Hit")
    isMovingRight = true;
    isMovingLeft = false;
  } else {
    console.log("Not moving")
    speed = 0
    isMovingLeft = false;
    isMovingRight = false;
  }

}





