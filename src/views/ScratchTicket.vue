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
const imageUrl:string = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160909%2Feca561d1ecce4fcab4f600a74f15b221_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672410563&t=65c34c7d49a899c2f2a3c0f99827312f";
const chess_canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
let downX: number,
    downY: number

const draw = () => {
  ctx.value!.lineCap = 'round'
  ctx.value!.lineJoin = 'round'
  ctx.value!.lineWidth = 50
  // ctx.value?.fillText('谢谢惠顾', 480, 230)
  const img: HTMLImageElement = new Image()
  img.src = imageUrl
  img.onload = () => {
    ctx.value?.drawImage(img, 0, 0, width, height)
    // ctx.value?.fillRect(0,0,1000,500)
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
  background-image: url('https://img95.699pic.com/element/40064/6818.png_300.png');
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>