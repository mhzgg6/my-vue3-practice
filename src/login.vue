<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 获取canvas画布
const chess_canvas = ref<HTMLCanvasElement | null>(null)

// 获取上下文
let ctx = ref<CanvasRenderingContext2D | null>(null)

const width: number = 400,
      height: number = 400;
//  canvas实体对象
// let particleCanvas = ref<ParticleCanvas>()

// 画布类
// class ParticleCanvas {
//   canvasEle: HTMLCanvasElement;
//   ctx: CanvasRenderingContext2D;
//   width: number;
//   height: number;
//   constructor(target: HTMLCanvasElement) {
//     this.canvasEle = target;
//     this.ctx = target.getContext("2d") as CanvasRenderingContext2D;
//     this.width = target.width
//     this.height = target.height
//   }
// }
const draw = () => {
  if (ctx.value) {
    // 画线
    // ctx.value.moveTo(50, 50)
    // ctx.value.lineTo(200, 200)
    // ctx.value.stroke()

    // 矩形 矩形框 填充矩形
    // ctx.value.strokeRect(50, 50 , 200 , 100)
    // ctx.value.fillRect(50, 50 , 200 , 100)
    // ctx.value.clearRect(60, 60 , 100 , 50)

    // 圆 圆弧
    // 在画弧的时候，arc()函数中角的单位是弧度而不是角度。角度换算为弧度的表达式为：弧度=(Math.PI/180)*角度。
    // beginPath closePath
    // ctx.value.beginPath()
    // ctx.value.arc(100, 100, 50, 0, Math.PI)
    // ctx.value.stroke()
    // ctx.value.closePath()
    // ctx.value.beginPath()
    // ctx.value.arc(250, 100, 50, 0, Math.PI * 2)
    // ctx.value.stroke()
    // ctx.value.fill()
    // ctx.value.beginPath()

    // 椭圆
    // ctx.value.ellipse(150, 200, 100, 50, 0, 0, 2 * Math.PI)
    // ctx.value.stroke()


    // 二次贝塞尔曲线
    // ctx.value.moveTo(50, 50)
    // ctx.value.quadraticCurveTo(200, 200, 350, 50)
    // ctx.value.stroke()

    // 三次贝塞尔曲线
    // ctx.value.moveTo(50, 200)
    // ctx.value.bezierCurveTo(150, 50, 250, 350, 350, 200)
    // ctx.value.stroke()

    // 线条的样式 lineWidth lineCap lineJoin
    // ctx.value.beginPath()
    // ctx.value.lineWidth = 10
    // ctx.value.moveTo(50, 50)
    // ctx.value.lineTo(200, 50)
    // ctx.value.stroke()

    // 透明度
    // ctx.value.beginPath()
    // ctx.value.fillStyle = "rgba(155,241,244,0.2)"
    // ctx.value.fillRect(10, 10, 100, 100)
    // ctx.value.closePath()

    // 线性渐变
    // var gradient1 = ctx.value.createLinearGradient(10, 10, 300, 10)
    // gradient1.addColorStop(0, '#00ff00')
    // gradient1.addColorStop(1, '#ff0000')
    // ctx.value.fillStyle = gradient1
    // ctx.value.fillRect(10,10,300,100)

    // 镜像渐变
    // var gradient1 = ctx.value.createRadialGradient(100,100,100,100,100,0)
    // gradient1.addColorStop(0, "#ff770f");
    // gradient1.addColorStop(1, "#ffffff");
    // ctx.value.fillStyle = gradient1
    // ctx.value.fillRect(10, 10, 200, 200);

    // let img = new Image()
    // img.src = './assets/logo_rhine.png'
    // img.onload = () => {
    //   if (ctx.value) {
    //     let pattern = ctx.value.createPattern(img, 'repeat')
    //     ctx.value.fillStyle = pattern
    //     ctx.value.fillRect(0, 0, 300, 300)
    //   }
    // }

    // 绘制文本 font textAlign direction
    ctx.value.font = '50px serif'
    ctx.value.strokeText('Canvas 详解', 50, 50)
    ctx.value.fillText('Canvas 详解', 50, 150)

    

  }
}

onMounted(() => {
  if (chess_canvas.value) {
    chess_canvas.value.style.background = "#e3cdb0"
    ctx.value = chess_canvas.value.getContext('2d')   
    draw() 
  } 
})


</script>

<template>
  <canvas id="chess_canvas" ref="chess_canvas" :width="width" :height="height"></canvas>
</template>

<style scoped>
canvas {
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
</style>  