import { ref } from "vue";
import { snakeConfig, gameConfig } from "./baseData"
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
  ['upright', 90]
])

const { size, startPoints, startDirection } = snakeConfig
const bodySize = 24

let direction: string = startDirection
let lastDirection: string = ''

const snakeHead: SnakeInfo = {
  x: startPoints.x - 8,
  y: startPoints.y -38,
  size
}
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
  console.log(lastDirection, direction);
  console.log(snake);
  if (deg) {
    // ctx.translate(200 + size/2, 200 + size/2)
    ctx.translate(x + size/2, y + size/2)
    ctx.rotate(Math.PI / 180 * deg)
    ctx.translate(-(x + size/2), -(y + size/2))
  }
  ctx.drawImage(el, x, y, size, size)
  ctx.restore();
}

function moveSnake() {
  const { ctx } = gameConfig
  let { x, y } = snakeHead
  // ctx.clearRect(0,0,1000,500)
  const firstNode = { x: 0, y: 0, size: bodySize }
  console.log(lastDirection, direction, '=-----');
  
  switch(direction) {
    case 'right':
      // 移动身体宽度
      firstNode.x = x + 8
      firstNode.y = y + 38
      x += 16
      // y += 10      
      snakeHead.x = x
      // snakeHead.y = y
      break
    case 'down':
      y += 16
      snakeHead.y = y
      break
    case 'left':
      x -= 16
      snakeHead.x = x
      break
    case 'up':
      firstNode.x = x + 9
      firstNode.y = y + 22
      y -= 16
      snakeHead.y = y
      break
  }  
  snakeBody.unshift(firstNode)
  isEatFood = snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y
  if (isEatFood) {
    score.value ++
    randomFood()
    isEatFood = false
  } else {
    snakeBody.pop()
  }
  drawSnake()    
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
  const xCollision = snakeHead.x <= -20 || snakeHead.x >= 1000
  const yCollision = snakeHead.y <= -20 || snakeHead.y >= 500
  const selfCollision = snakeBody.find(({x,y}) => x === snakeHead.x && y === snakeHead.y)
  return xCollision || yCollision || selfCollision
}

// 获取随机实物坐标
function getRandomPosition() {
  let isInSnake = true
  while (isInSnake) {
    // 20的倍数
    const randomX = Math.round(Math.random() * (1000 - 20) / 20) * 20
    const randomY = Math.round(Math.random() * (500 - 20) / 20) * 20
    // 判断食物是否在蛇头 蛇身
    if ((snakeHead.x === randomX && snakeHead.y === randomY) || (snakeBody.find(({x,y}) => x === randomX && y === randomY))) {
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
  ctx.fillRect(foodPosition.x, foodPosition.y, size, size)
}


function animate() {
  moveSnake()
  drawFood()
}

function startAnimate() {
  lastDirection = startDirection
  direction = 'right'
  animate()
  // timer = Number(setInterval(animate, 300))
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