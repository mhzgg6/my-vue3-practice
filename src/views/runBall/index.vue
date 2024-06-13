<template>
  <div class="canvas-warp"> 
    <canvas
      id="chess_canvas"
      ref="chess_canvas"
      :width="width"
      :height="height"
    >
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'

const ctx = ref(null)
const chess_canvas = ref(null)
const width = 1000,
      height = 600
const len = (Math.random() * 30) + 10
const radius = 5,
      speed = 5
const positions = reactive([])

class Ball {
  constructor(x, y, vx, vy, color, lineColor) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.color = color
    this.lineColor = lineColor
  }

  draw() {
    ctx.value.beginPath()
    ctx.value.arc(this.x, this.y, radius, 0, Math.PI * 2)
    // ctx.value.closePath()
    ctx.value.fillStyle = this.color
    ctx.value.fill()
  }

  update() {
    if (this.x + radius >= width || this.x - radius <= 0) {
      this.vx = -this.vx
    }
    if (this.y + radius >= height || this.y - radius <= 0) {
      this.vy = -this.vy
    }
    this.x += this.vx
    this.y += this.vy
  }
}

onMounted(() => {
  if (chess_canvas.value) {
    ctx.value = chess_canvas.value.getContext("2d")
    ctx.value.fillStyle = 'rgba(0,0,0,0.6)'
    ctx.value.fillRect(0,0,width,height)
    drawBall()
    run()
  }
})

const getRandomNumber = (min, max) => {
  let num = Math.floor(Math.random() * (max - min) + min);
  if (num === 0) {
    num = 1;
  }
  return num
}

const drawBall = () => {
  for (let i = 0; i < len; i++) {
    let x = Math.random() * (width - 20) + 10
    let y = Math.random() * (height - 20) + 10
    let ball = new Ball(
      x,
      y,
      getRandomNumber(-4,4),
      getRandomNumber(-4,4),
      'rgb(255,255,255)',
      `rgba(${getRandomNumber(0,255)},${getRandomNumber(0,255)},${getRandomNumber(0,255)}, ${Math.random()})`,
    )
    positions.push(ball)
  }
}

const run = () => {
  ctx.value.fillStyle = "rgba(0,0,0,0.6)"
  ctx.value.fillRect(0, 0, width, height)
  for (let i = 0; i < positions.length; i++) {
    for(let j = 0; j < positions.length; j++) {
      let lx = positions[j].x - positions[i].x
      let ly = positions[j].y - positions[i].y
      let LL = Math.sqrt(Math.pow(lx, 2) + Math.pow(ly, 2))
      if (LL < 180) {
        ctx.value.beginPath()
        ctx.value.strokeStyle = positions[i].lineColor
        ctx.value.moveTo(positions[i].x, positions[i].y)
        ctx.value.lineWidth = 1
        ctx.value.lineTo(positions[j].x, positions[j].y)
        ctx.value.stroke()
      }
    }
    positions[i].draw()
    positions[i].update()
  }
  requestAnimationFrame(run)
}

</script>

<style scoped>
.canvas-warp{
  width: 100%;
  height: 100%;
}

canvas {
  margin-top: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
</style>