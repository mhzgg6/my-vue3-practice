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
  { x: startPoints.x - 22, y: startPoints.y, color: 'skyblue' },
  { x: startPoints.x - 44, y: startPoints.y, color: 'skyblue' },
]

function initSnake() {
  drawSnake()
}

function drawSnake() {
  if (isCollision()) {
    alert('你死了')
    return
  }

  drawRect(snakeHead)

  for (let i = 0; i < snakeBody.length; i ++) {
    drawRect(snakeBody[i])
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
  const firstNode = { x, y, color: 'skyblue' }
  switch(direction) {
    case 'right':
      x += 22
      snakeHead.x = x
      break
    case 'down':
      y += 22
      snakeHead.y = y
      break
    case 'left':
      x -= 22
      snakeHead.x = x
      break
    case 'up':
      y -= 22
      snakeHead.y = y
      break
  }
  snakeBody.pop()
  snakeBody.unshift(firstNode)
  drawSnake()  
  console.log(111);
  
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

function randomFood() {
  
}

export {
  initSnake,
  moveSnake,
  handleKeydownFn
}