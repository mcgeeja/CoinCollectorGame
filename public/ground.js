import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const groundElems = document.querySelectorAll("[data-ground]")

export function setupGround() {
  setCustomProperty(groundElems[0], "--top", 100)
  setCustomProperty(groundElems[1], "--top", 0)
}

export function updateGround(delta, speedScale) {
  groundElems.forEach(ground => {
    incrementCustomProperty(ground, "--top", delta * speedScale * SPEED * 1)

    if (getCustomProperty(ground, "--top") >= 100) {
      incrementCustomProperty(ground, "--top", -200)
    }
  })
}
