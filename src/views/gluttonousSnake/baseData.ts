const gameConfig = {
  ctx: null as unknown as CanvasRenderingContext2D
}

const snakeConfig = {
  // 速度
  speed: 3,
  // 大小
  size: 20,
  // 初始长度
  snakeLen: 3,
  // 初始位置
  startPoints: { x: 200, y: 200 },
  // 初始方向
  startDirection: 'right'
}

export {
  gameConfig,
  snakeConfig
}