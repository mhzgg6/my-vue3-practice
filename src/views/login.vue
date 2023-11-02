<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 获取canvas画布
const chess_canvas = ref<HTMLCanvasElement | null>(null)

// 获取上下文
let ctx = ref<CanvasRenderingContext2D | null>(null)

const sun:HTMLImageElement = new Image()
const moon:HTMLImageElement = new Image()
const earth:HTMLImageElement = new Image()

const width: number = 500,
      height: number = 500;
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

const init = () => {
  sun.src = 'https://img.lovepik.com/element/40097/4339.png_300.png';
  moon.src = 'https://www.freepnglogos.com/uploads/moon-png/moon-png-annual-celestial-overview-simone-matthews-18.png';
  earth.src = 'https://gd-filems.dancf.com/mcm79j/mcm79j/92054/b3162056-61ba-4ebd-8da1-fd98ce15a1cb31401764.png';
  window.requestAnimationFrame(draw);
  // draw()
}

const draw = () => {
  if (ctx.value) {
    // 在现有的画布内容后绘制新的图案
    ctx.value.globalCompositeOperation = 'destination-over'
    // 清空画布
    ctx.value.clearRect(0, 0, 500, 500)
    ctx.value.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.value.strokeStyle = 'red';
    ctx.value.save(); // 第一次保存画布状态
    ctx.value.translate(250, 250); // 把原心移到画布中间
    // 画一个地球
    const time: Date = new Date()
    // getSeconds() 方法可返回时间的秒。返回值是 0 ~ 59 之间的一个整数。
    // getMilliseconds() 方法可返回时间的毫秒。返回值是 0 ~ 999 之间的一个整数
    const earthDeg = ((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds()
    const moonDeg = ((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds()
    
    ctx.value.beginPath()
    ctx.value.rotate(earthDeg)
    ctx.value.translate(220, 0);
    ctx.value.arc(-20, -20, 20, 0, Math.PI * 2, false)
    ctx.value.stroke()
    ctx.value.closePath()
    ctx.value.save()
    
    // ctx.value.beginPath()
    // ctx.value.rotate(moonDeg)
    // ctx.value.translate(0, 40);
    // ctx.value.arc(-7.5, -7.5, 15, 0, Math.PI * 2, false)
    // ctx.value.stroke()
    // ctx.value.closePath()
    ctx.value.rotate(moonDeg);
    ctx.value.translate(-20, 40);
    ctx.value.drawImage(moon, -7.5, -7.5, 15, 15);
    
    // 恢复状态
    ctx.value.restore(); 
    ctx.value.restore();
    // 画一个地球运行的轨迹
    ctx.value.beginPath();
    ctx.value.arc(250, 250, 200, 0, Math.PI * 2, false);
    ctx.value.stroke();
    // 画一个太阳
    ctx.value.drawImage(sun, 0, 0, 500, 500);

    window.requestAnimationFrame(draw);

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
    // ctx.value.font = '50px serif'
    // ctx.value.strokeText('Canvas 详解', 50, 50)
    // ctx.value.fillText('Canvas 详解', 50, 150)


    


  }
}

onMounted(() => {
  if (chess_canvas.value) {
    chess_canvas.value.style.background = "#e3cdb0"
    ctx.value = chess_canvas.value.getContext('2d')   
    init() 
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