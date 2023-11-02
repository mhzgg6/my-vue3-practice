<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
const width: number = 500,
      height: number = 500;
// 获取canvas画布
const chess_canvas = ref<HTMLCanvasElement | null>(null)
// 获取上下文
const ctx = ref<CanvasRenderingContext2D | null>(null)

// 球类
class Ball {
  x: number; // 横坐标
  y: number; // 纵坐标
  vx: number; // 横向速度
  vy: number; // 纵向速度
  radius: number; // 半径
  color: string; // 颜色
  constructor(x: number, y: number, vx: number, vy: number, radius: number, color: string) {
    this.x = x 
    this.y = y
    this.vx = vx
    this.vy = vy
    this.radius = radius
    this.color = color
  }
  draw() {
    ctx.value!.beginPath();
    ctx.value!.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.value!.closePath();
    ctx.value!.fillStyle = this.color;
    ctx.value!.fill();
  }
}
const ball = new Ball(100, 100, 1, 3, 25, 'blue')

const draw = () => {
  // 清空画布
  // ctx.value?.clearRect(0, 0, width, height)
  // 用带透明度的矩形代替清空
  ctx.value.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.value?.fillRect(0, 0, width, height);

  ball.draw()
  // 添加加速度
  ball.vy *= .995
  ball.vy += .15
  // 移动
  ball.x += ball.vx
  ball.y += ball.vy
  // 添加边界
  if (ball.y + ball.vy > height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy
  }
  if (ball.x + ball.vx > height || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx
  }
  // window.requestAnimationFrame(draw)
}

onMounted(() => {
  if (chess_canvas.value) {
    ctx.value = chess_canvas.value.getContext('2d')
    window.requestAnimationFrame(draw)
  }
})

</script>


<template>
  <canvas id="chess_canvas" ref="chess_canvas" :width="width" :height="height">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
</template>


<style scoped>
canvas {
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
</style>