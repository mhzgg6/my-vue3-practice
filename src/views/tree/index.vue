<template>
  <div class="canvas-tree">  
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
import { ref, onMounted } from 'vue'

const ctx = ref(null)
const chess_canvas = ref(null);

const width = 1200,height = 800;

onMounted(() => {
  if (chess_canvas.value) {
    ctx.value = chess_canvas.value.getContext("2d")
    init()
  }
});

const init = () => {
  ctx.value.translate(width/2, height)
  ctx.value.scale(1, -1)
  drawBranch([0, 0], 160, 20, 90)
}

const drawBranch = (v0, len, thick, angle) => {
  if (thick < 10 && Math.random() < 0.2 ) {
    return
  }
  if (thick < 2 ) {
    ctx.value.beginPath()
    ctx.value.arc(...v0, 10, 0, 2*Math.PI)
    ctx.value.fillStyle = '#fff'
    ctx.value.fill()
    return
  }

  ctx.value.beginPath()
  ctx.value.moveTo(...v0)
  const v1 = [
    v0[0] + len * Math.cos((angle * Math.PI) / 180),
    v0[1] + len * Math.sin((angle * Math.PI) / 180),
  ]

  ctx.value.lineTo(...v1)
  ctx.value.strokeStyle = '#333'
  ctx.value.lineWidth = thick
  ctx.value.lineCap = 'round'
  ctx.value.stroke()
  // 左分支
  // drawBranch(v1, len * 0.8, thick * 0.75, angle +( Math.random() + 30))
  setTimeout(() => {
    drawBranch(v1, len * 0.8, thick * 0.75, angle +( Math.random() + 30))
  },1000)
  // 右分支
  setTimeout(() => {
    drawBranch(v1, len * 0.8, thick * 0.75, angle +( Math.random() - 30))
  },1000)
  // drawBranch(v1, len * 0.8, thick * 0.75, angle +( Math.random() - 30))
}


</script>

<style scoped>
.canvas-tree{
  width: 100%;
  height: 100%;
  background-color: #93b5ad;
}

canvas {
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
</style>