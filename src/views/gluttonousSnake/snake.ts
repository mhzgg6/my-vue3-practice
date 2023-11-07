import { snakeConfig, gameConfig } from "./baseData"
interface SnakeInfo {
  x: number;
  y: number;
  color: string;
}

const { size, startPoints, startDirection } = snakeConfig
let direction = startDirection

const snakeHead: SnakeInfo = {
  x: startPoints.x,
  y: startPoints.y,
  color: 'red'
}
const snakeBody: SnakeInfo[] = [
  { x: startPoints.x - 20, y: startPoints.y, color: 'green' },
  { x: startPoints.x - 40, y: startPoints.y, color: 'green' },
]
const foodPosition = { x: 0, y: 0 }
let isEatFood = false

function initSnake() {
  drawSnake()
}

function drawSnake() {
  console.log(snakeHead);
  
  drawRect(snakeHead)
  for (let i = 0; i < snakeBody.length; i ++) {
    drawRect(snakeBody[i])
  }
  if (isCollision()) {
    alert('你死了')
    return
  }
}

function drawRect(snake: SnakeInfo) {
  const { ctx } = gameConfig
  const { x, y, color } = snake
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.strokeRect(x, y, size, size)
}

function moveSnake() {
  const { ctx } = gameConfig
  let { x, y } = snakeHead
  ctx.clearRect(0,0,1000,500)
  const firstNode = { x, y, color: 'green' }
  switch(direction) {
    case 'right':
      x += 20
      snakeHead.x = x
      break
    case 'down':
      y += 20
      snakeHead.y = y
      break
    case 'left':
      x -= 20
      snakeHead.x = x
      break
    case 'up':
      y -= 20
      snakeHead.y = y
      break
  }
  snakeBody.unshift(firstNode)
  isEatFood = snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y
  if (isEatFood) {
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
      direction = 'up'
      break
    case 'ArrowDown':
      direction = 'down'
      break
    case 'ArrowLeft':
      direction = 'left'
      break
    case 'ArrowRight':
      direction = 'right'
      break
  }
}

function isCollision() {
  const xCollision = snakeHead.x <= 0 || snakeHead.x >= 1000
  const yCollision = snakeHead.y <= 0 || snakeHead.y >= 500
  const selfCollision = snakeBody.find(({x,y}) => x === snakeHead.x && y === snakeHead.y)
  return xCollision || yCollision || selfCollision
}

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


function startAnimate() {
  moveSnake()
  drawFood()
}

export {
  initSnake,
  moveSnake,
  handleKeydownFn,
  randomFood,
  startAnimate
}