import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const COIN_INTERVAL_MIN = 500
  const COIN_INTERVAL_MAX = 2000
  const worldElem = document.querySelector("[data-world]")
  
  let nextCoinTime
  export function setupCoin() {
    nextCoinTime = COIN_INTERVAL_MIN
    document.querySelectorAll("[data-coin]").forEach(coin => {
      coin.remove()
    })
  }
  
  export function updateCoin(delta, speedScale) {
    document.querySelectorAll("[data-coin]").forEach(coin => {
      incrementCustomProperty(coin, "--top", delta * speedScale * SPEED * 1)
      if (getCustomProperty(coin, "--top") >= 100) {
        incrementCustomProperty(coin, "--top", -200)
        coin.remove()
      }
    })
  
    if (nextCoinTime <= 0) {
      createCoin()
      nextCoinTime =
        randomNumberBetween(COIN_INTERVAL_MIN, COIN_INTERVAL_MAX) / speedScale
    }
    nextCoinTime -= delta
  }
  
  function createCoin() {
    const coin = document.createElement("img")
    coin.dataset.coin = true
    coin.src = "imgs/coin.png"
    coin.classList.add("coin")
    setCustomProperty(coin, "--top", -200)
    setCustomProperty(coin, "--left", Math.floor(Math.random() * 100))
    worldElem.append(coin)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  export function getCoinRects(carRect, score) {
    [...document.querySelectorAll("[data-coin]")].map(coin => {
      if(isCollision(carRect, coin.getBoundingClientRect())){
        coin.classList.add("hide");
        let audio = new Audio('collectcoin.mp3')
        audio.play()
        return score += 100;
      }else{
        return score
      }
    })
    return score
  }
  
  function isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right-70 &&
      rect1.top < rect2.bottom - 70 &&
      rect1.right - 70 > rect2.left  &&
      rect1.bottom > rect2.top
    )
  }