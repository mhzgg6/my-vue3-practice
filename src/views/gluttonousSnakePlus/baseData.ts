const gameConfig = {
  ctx: null as unknown as CanvasRenderingContext2D
}

const snakeConfig = {
  // 速度
  speed: 3,
  // 蛇头大小
  size: 40,
  // 蛇身大小
  // bodySize: 24,
  // 初始长度
  snakeLen: 3,
  // 初始位置
  startPoints: { x: 200, y: 200 },
  // 初始方向
  startDirection: 'up'
}

export {
  gameConfig,
  snakeConfig
}