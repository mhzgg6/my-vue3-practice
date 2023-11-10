import { ref } from "vue";
import { snakeConfig, gameConfig } from "./baseData"
import { killAudio } from "./audio"
interface SnakeInfo {
  x: number;
  y: number;
  size: number;
}

interface Position {
  x: number;
  y: number;
}

const directionToDeg: Map<string, number> = new Map([
  ['upright', 90],
  ['upleft', -90],
  ['downright', 90],
  ['downleft', -90],
  ['rightdown', 180],
  ['rightup', 0],
  ['leftdown', 180],
  ['leftup', 0],
])

const { size, startPoints, startDirection } = snakeConfig
const bodySize = 24

let direction: string = startDirection
let lastDirection: string = ''

const snakeHead: SnakeInfo = {
  x: startPoints.x - 8,
  y: startPoints.y - 16 - 22,
  size
}
const initHeadNode: SnakeInfo = { x: startPoints.x, y: startPoints.y - 16, size }
const snakeBody: SnakeInfo[] = [
  { x: startPoints.x, y: startPoints.y, size: bodySize },
  { x: startPoints.x, y: startPoints.y + 16, size: bodySize },
]
const foodPosition: Position = { x: 0, y: 0 }
let isEatFood: boolean = false
let timer: number | null = null
let score = ref<number>(0)

const urls = ['http://cdn.xjbigvision.com/cow.png', 'http://cdn.xjbigvision.com/cow-body.png']
let promiseAll: Promise<HTMLImageElement>[] = []
let imgs: HTMLImageElement[] = []

function loadImages() {
  for (let i = 0; i < urls.length; i ++) {
    promiseAll[i] = new Promise((resolve, reject) => {
      imgs[i] = new Image() as HTMLImageElement
      imgs[i].src = urls[i]
      imgs[i].onload = () => {
        console.log(`第${i}张加载完成`)
        resolve(imgs[i])
      }
    })
  }
  return promiseAll
}

function initSnake() {
  drawSnake()
}

function drawSnake() {

  if (isCollision()) {
    alert('你死了')
    stopAnimate()
    return
  }

  drawCow(snakeHead, imgs[0])
  for (let i = 0; i < snakeBody.length; i ++) {
    drawCow(snakeBody[i], imgs[1])
  }
  
}

function drawCow(snake: SnakeInfo, el: HTMLImageElement) {
  const { ctx } = gameConfig
  const { x, y, size } = snake
  const oldToNowDirection = lastDirection + direction
  const deg = directionToDeg.get(oldToNowDirection)
  ctx.beginPath()
  ctx.save();
  if (deg) {
    ctx.translate(x + size/2, y + size/2)
    ctx.rotate(Math.PI / 180 * deg)
    ctx.translate(-(x + size/2), -(y + size/2))
  }
  ctx.drawImage(el, x, y, size, size)
  ctx.restore();
}

function moveSnake() {
  const { ctx } = gameConfig
  let { x, y } = initHeadNode
  ctx.clearRect(0,0,1000,500)
  let firstNode = { x: x, y: y, size: bodySize }

  switch(direction) {
    case 'right':
      // 移动身体宽度
      x += 16
      initHeadNode.x = x
      snakeHead.x = initHeadNode.x + 6
      snakeHead.y = initHeadNode.y - 8
      break
    case 'down':
      y += 16
      initHeadNode.y = y
      snakeHead.x = initHeadNode.x - 8
      snakeHead.y = initHeadNode.y + 6
      break
    case 'left':
      x -= 16
      initHeadNode.x = x
      snakeHead.x = initHeadNode.x - 22
      snakeHead.y = initHeadNode.y - 8
      break
    case 'up':
      y -= 16
      initHeadNode.y = y
      snakeHead.x = initHeadNode.x - 8
      snakeHead.y = initHeadNode.y - 22
      break
  } 
   
  snakeBody.unshift(firstNode)
  handleEatFood()
  // isEatFood = snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y
  if (isEatFood) {
    console.log(initHeadNode, '--initHeadNode-');
    console.log(foodPosition, '--foodPosition-');
    console.log(snakeHead, '--snakeHead-');
    killAudio.play()
    score.value ++
    randomFood()
    isEatFood = false
  } else {
    snakeBody.pop()
  }
  drawSnake()    
}

function handleEatFood() {
  const position = JSON.parse(JSON.stringify(foodPosition))
  switch(direction) {
    case 'right':
      position.x = foodPosition.x + 6
      position.y = foodPosition.y - 8
      break
    case 'down':
      position.x = foodPosition.x - 8
      position.y = foodPosition.y - 10
      break
    case 'left':
      position.x = foodPosition.x - 22
      position.y = foodPosition.y - 8
      break
    case 'up':
      position.x = foodPosition.x - 8
      // 10
      position.y = foodPosition.y - 6
      break
  } 

  // console.log( initHeadNode.y, foodPosition.y, '---------yyy----------')
  console.log( snakeHead.y, position.y, foodPosition.y, '---------dddd----------')
  
  isEatFood = snakeHead.x === position.x && snakeHead.y == position.y
}

function handleKeydownFn(e: KeyboardEvent) {
  const code: string = e.code
  console.log(code);
  switch (code) {
    case 'ArrowUp':
      lastDirection = direction
      direction = 'up'
      break
    case 'ArrowDown':
      lastDirection = direction
      direction = 'down'
      break
    case 'ArrowLeft':
      lastDirection = direction
      direction = 'left'
      break
    case 'ArrowRight':
      lastDirection = direction
      direction = 'right'
      break
  }
}

// 判断是否触到边界 与自身重合
function isCollision() {
  const xCollision = initHeadNode.x <= 0 || initHeadNode.x >= 992 - 16
  const yCollision = initHeadNode.y <= 0 || initHeadNode.y >= 496 - 16
  const selfCollision = snakeBody.find(({x,y}) => x === initHeadNode.x && y === initHeadNode.y)
  return xCollision || yCollision || selfCollision
}

// 获取随机实物坐标
function getRandomPosition() {
  let isInSnake = true
  while (isInSnake) {
    // 20的倍数
    const randomX = Math.round(Math.random() * (1000 - 16) / 16) * 16 
    const randomY = Math.round(Math.random() * (500 - 16) / 16) * 16 
    // 判断食物是否在蛇头 蛇身
    if ((initHeadNode.x === randomX && initHeadNode.y === randomY) || (snakeBody.find(({x,y}) => x === randomX && y === randomY))) {
      isInSnake = true
      continue
    } else {
      foodPosition.x = randomX
      foodPosition.y = randomY
      isInSnake = false
    }
  }
  return isInSnake
}

function randomFood() {
  getRandomPosition()
  drawFood()
}

function drawFood() {
  const { ctx } = gameConfig
  ctx.beginPath()
  ctx.fillStyle = 'blue'
  ctx.fillRect(foodPosition.x, foodPosition.y, 24, 24)
}


function animate() {
  moveSnake()
  drawFood()
}

function startAnimate() {
  timer = Number(setInterval(animate, 300))
}

function stopAnimate() {
  clearInterval(Number(timer))
  timer = null
}

export {
  score,
  loadImages,
  initSnake,
  moveSnake,
  handleKeydownFn,
  randomFood,
  startAnimate,
  stopAnimate
}