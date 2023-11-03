<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Position{
  startX?: number
  startY?: number
  endX?: number
  endY?: number
}
const width: number = 1000,
      height: number = 500;
const imageUrl:string = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.moyublog.com%2Fd%2Ffile%2F2021-05-29%2Ff8b2a20556774afebed8fd91ccbe0497.jpg&refer=http%3A%2F%2Ffile.moyublog.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672406341&t=a0b71fded87dd696982c1632cc015397"
const chess_canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
let downX: number,
    downY: number

const draw = () => {
  ctx.value!.lineCap = 'round'
  ctx.value!.lineJoin = 'round'
  ctx.value!.strokeStyle = 'rgb(0,0,0,.0)'
  ctx.value!.lineWidth = 50

  const img: HTMLImageElement = new Image()
  img.src = imageUrl
  img.crossOrigin = ''
  img.onload = () => {
    ctx.value?.drawImage(img, 0, 0, width, height)

    // 把像素数据模糊化
    var canvasData = ctx.value?.getImageData(0, 0, width, height) as ImageData;
    var tempData: ImageData = gaussBlur(canvasData);
    ctx.value?.putImageData(tempData,0,0);

    ctx.value!.globalCompositeOperation = 'destination-out'
  }
}

const drawLine = (position: Position) => {
  const { startX, startY, endX, endY } = position
  ctx.value?.beginPath()
  ctx.value?.moveTo(startX, startY)
  ctx.value?.lineTo(endX || startX, endY || startY)
  ctx.value?.stroke()
}

const mousedownFn = (e: MouseEvent) => {
  e.preventDefault()
  downX = e.pageX
  downY = e.pageY
  drawLine({ startX: downX, startY: downY })
  // 为canvas添加鼠标移动和鼠标抬起事件
  chess_canvas.value!.addEventListener("mousemove", mousemoveFn, false)
  chess_canvas.value!.addEventListener("mouseup", mouseupFn, false)
}

const mousemoveFn = (e: MouseEvent) => {
  e.preventDefault()
  const moveX: number = e.pageX
  const moveY: number = e.pageY
  drawLine({ endX: moveX, endY: moveY })
  downX = moveX
  downY = moveY
}

const mouseupFn = () => {
  // 为canvas移除鼠标移动和鼠标抬起事件
  chess_canvas.value!.removeEventListener("mousemove", mousemoveFn, false)
  chess_canvas.value!.removeEventListener("mouseup", mouseupFn, false)
}

const gaussBlur = (imgData: ImageData) => {
  const pixes = imgData.data;
  const width = imgData.width;
  const height = imgData.height;
  const gaussMatrix = [];
  let gaussSum = 0;
  let x;
  let y;
  let r;
  let g;
  let b;
  let a;
  let i;
  let j;
  let k;
  let len;
  const radius = 10;
  const sigma = 20;
  a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
  b = -1 / (2 * sigma * sigma);
  // 生成高斯矩阵
  for (i = 0, x = -radius; x <= radius; x++, i++) {
    g = a * Math.exp(b * x * x);
    gaussMatrix[i] = g;
    gaussSum += g;
  }

  // 归一化, 保证高斯矩阵的值在[0,1]之间
  for (i = 0, len = gaussMatrix.length; i < len; i++) {
    gaussMatrix[i] /= gaussSum;
  }

  // x 方向一维高斯运算
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      r = g = b = a = 0;
      gaussSum = 0;
      for (j = -radius; j <= radius; j++) {
        k = x + j;
        if (k >= 0 && k < width) {
          // 确保 k 没超出 x 的范围
          // r,g,b,a 四个一组
          i = (y * width + k) * 4;
          r += pixes[i] * gaussMatrix[j + radius];
          g += pixes[i + 1] * gaussMatrix[j + radius];
          b += pixes[i + 2] * gaussMatrix[j + radius];
          // a += pixes[i + 3] * gaussMatrix[j];
          gaussSum += gaussMatrix[j + radius];
        }
      }
      i = (y * width + x) * 4;
      // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
      // console.log(gaussSum)
      pixes[i] = r / gaussSum;
      pixes[i + 1] = g / gaussSum;
      pixes[i + 2] = b / gaussSum;
      // pixes[i + 3] = a ;
    }
  }

  // y 方向一维高斯运算

  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      r = g = b = a = 0;
      gaussSum = 0;
      for (j = -radius; j <= radius; j++) {
        k = y + j;
        if (k >= 0 && k < height) {
          // 确保 k 没超出 y 的范围
          i = (k * width + x) * 4;
          r += pixes[i] * gaussMatrix[j + radius];
          g += pixes[i + 1] * gaussMatrix[j + radius];
          b += pixes[i + 2] * gaussMatrix[j + radius];
          // a += pixes[i + 3] * gaussMatrix[j];
          gaussSum += gaussMatrix[j + radius];
        }
      }
      i = (y * width + x) * 4;
      pixes[i] = r / gaussSum;
      pixes[i + 1] = g / gaussSum;
      pixes[i + 2] = b / gaussSum;
    }
  }
  return imgData
}

onMounted(() => {
  if (chess_canvas.value) {
    chess_canvas.value.addEventListener('mousedown', mousedownFn, false)
    ctx.value = chess_canvas.value.getContext('2d')
    draw()
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