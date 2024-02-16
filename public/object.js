import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const OBJECT_INTERVAL_MIN = 500
const OBJECT_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")
var rand = 0

let nextObjectTime
export function setupObject() {
  nextObjectTime = OBJECT_INTERVAL_MIN
  document.querySelectorAll("[data-object]").forEach(object => {
    object.remove()
  })
}

export function updateObject(delta, speedScale) {
  document.querySelectorAll("[data-object]").forEach(object => {
    incrementCustomProperty(object, "--top", delta * speedScale * SPEED * 1)
    if (getCustomProperty(object, "--top") >= 100) {
      incrementCustomProperty(object, "--top", -200)
      object.remove()
    }
  })

  if (nextObjectTime <= 0) {
    createObject()
    nextObjectTime =
      randomNumberBetween(OBJECT_INTERVAL_MIN, OBJECT_INTERVAL_MAX) / speedScale
  }
  nextObjectTime -= delta
}

export function getObjectRects() {
  return [...document.querySelectorAll("[data-object]")].map(object => {
    return object.getBoundingClientRect()
  })
}

function createObject() {
  const object = document.createElement("img")
  object.dataset.object = true
  if(rand == 0){
    object.src = "imgs/log.png"
    object.classList.add("log")
    rand = randomObject()
  }else{
    object.src = "imgs/dumpster.png"
    object.classList.add("dumpster")
    rand = randomObject()
  }
  setCustomProperty(object, "--top", -200)
  setCustomProperty(object, "--left", Math.floor(Math.random() * 100))
  worldElem.append(object)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomObject(){
  return Math.floor(Math.random() * 2)
}