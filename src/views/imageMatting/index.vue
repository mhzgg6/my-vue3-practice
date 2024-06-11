<template>
  <div class="canvas-tree">  
    <div class="canvas-warp">
      <canvas
        id="chess_canvas"
        ref="chess_canvas"
        :width="width"
        :height="height"
        @click="handleCanvasClick"
      >
        当前浏览器不支持canvas元素，请升级或更换浏览器！
      </canvas>
    </div>
    <div class="canvas-tools">
      <input type="file" accept="image/*" @change="handleFileUpload">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const ctx = ref(null)
const chess_canvas = ref(null)
const width = 1000,
      height = 600
const points = ref([])

onMounted(() => {
  if (chess_canvas.value) {
    ctx.value = chess_canvas.value.getContext("2d")
    ctx.value.strokeStyle = 'red'
  }
})

const handleFileUpload = (e) => {
  console.log(e)
  const file = e.target.files[0]
  if (!file) return
  
  const render = new FileReader()
  render.readAsDataURL(file)
  render.onload = (event) => {
    const img = new Image()
    img.src = event.target.result
    img.onload = () => {
      init(img, img.width, img.height)
    }
  }
}

const init = (image, imgWidth, imgHeight) => {
  ctx.value.clearRect(0,0,width,height)
  ctx.value.save()
  ctx.value.drawImage(image, 0, 0, imgWidth, imgHeight)
}

const handleCanvasClick = (e) => {
  console.log(e)
  const x = e.offsetX
  const y = e.offsetY
  points.value.push({ x, y })
  drawPoints(x, y)
}

const drawPoints = (x, y) => {
  ctx.value.beginPath()
  ctx.value.arc(x, y, 2, 0, 360 * Math.PI / 180)
  ctx.value.fillStyle = "red"
  ctx.value.fill()
  ctx.value.stroke()
  ctx.value.closePath()
  drawLines()
}

const drawLines = () => {
  const len = points.value.length
  if (len < 2) return

  const startPoint = points.value[len - 2]
  const endPoint = points.value[len - 1]
  ctx.value.beginPath()
  ctx.value.moveTo(startPoint.x, startPoint.y)
  ctx.value.lineTo(endPoint.x, endPoint.y)
  ctx.value.setLineDash([5, 5]);
  ctx.value.strokeStyle = "blue";
  ctx.value.lineWidth = 2;
  ctx.value.stroke()
  ctx.value.closePath()
}

</script>

<style scoped>
.canvas-tree{
  width: 100%;
  height: 100%;
  /* background-color: #93b5ad; */
}

canvas {
  margin-top: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
</style>