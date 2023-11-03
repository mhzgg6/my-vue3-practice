<script setup lang="ts">
// import { log } from 'console';
import { ref, onMounted } from 'vue'

const width: number = 450,
      height: number = 800;
const chess_canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
let img: HTMLImageElement = new Image();

const draw = () => {
  img.crossOrigin = 'anonymous';
  img.src = 'https://img1.baidu.com/it/u=4141276181,3458238270&fm=253&fmt=auto&app=138&f=JPEG';
  img.onload = function() {
    ctx.value?.drawImage(img, 0, 0, 450, 800);
  };
}

const blackWhiteTheme = () => {
  ctx.value?.clearRect(0, 0, 450, 800)
  ctx.value?.drawImage(img, 0, 0, 450, 800)
  const imageData = ctx.value?.getImageData(0, 0, width, height) as ImageData
  const data = imageData.data as Uint8ClampedArray
  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i]     = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  console.log(imageData);
  ctx.value?.putImageData(imageData, 0, 0)
}

const original = () => {
  ctx.value?.clearRect(0, 0, 450, 800)
  ctx.value?.drawImage(img, 0, 0, 450, 800);
}

onMounted(() => {
  var blackBtn = document.getElementById('blackBtn') as HTMLElement;
  var originalBtn = document.getElementById('original') as HTMLElement;
  if (chess_canvas.value) {
    blackBtn.addEventListener('click', blackWhiteTheme)
    originalBtn.addEventListener('click', original)
    ctx.value = chess_canvas.value.getContext('2d')
    draw()
  }
})

</script>

<template>
  <canvas id="chess_canvas" ref="chess_canvas" :width="width" :height="height">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <div class="btns">
    <button id="original">还原</button>
    <button id="blackBtn">黑白主题</button>
    <button>曝光主题</button>
  </div>
</template>


<style scoped>
canvas {
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
.btns{
  margin-top: 10px;
}
.btns button{
  margin-right: 10px;
}
</style>