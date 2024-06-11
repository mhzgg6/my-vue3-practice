<template>
  <div class="canvas-tree">  
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

onMounted(() => {
  if (chess_canvas.value) {
    ctx.value = chess_canvas.value.getContext("2d")
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