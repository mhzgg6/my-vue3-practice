<script setup lang="ts">
// import { log } from 'console';
import { ref, onMounted } from 'vue'

interface ClickCoordinate {
  x: number;
  y: number;
}
interface ImgItem {
  name: string;
  url: string
}
interface ImgObj {
  image: HTMLImageElement;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
const width: number = 800,
      height: number = 500;
const images: Array<ImgItem> = [
  {
    name: "白月魁",
    url: "https://img1.baidu.com/it/u=4141276181,3458238270&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500"
  },
  {
    name: "鸣人",
    url: "https://img2.baidu.com/it/u=1548765981,166433699&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
  },
  {
    name: "路飞",
    url: "https://img2.baidu.com/it/u=1700240772,3511789617&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  },
  {
    name: "哪吒",
    url: "https://img2.baidu.com/it/u=4044887937,3129736188&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=392",
  },
  {
    name: "千寻",
    url: "https://img1.baidu.com/it/u=3907076642,679964949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=293",
  }
]
const clickCoordinate:ClickCoordinate = { x: 0, y: 0 } 

const chess_canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const imagesData:Array<ImgObj> = [] 
let target: number;

const createImgs = () => {
  images.forEach(item => {
    const image:HTMLImageElement = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = item.url
    const name:string = item.name;
    image.onload = () => {
      const w:number = 200
      const h:number = 200 / image.width * image.height
      const x:number = Math.random() * (width - w) ;
      const y:number = Math.random() * (height - h);
      const imgObj: ImgObj = { image, name, x, y, w, h }
      imagesData.push(imgObj)
      draw(imgObj)
    }
  })
}

const draw = (imgObj: ImgObj) => {
  if (ctx.value) {
    const { image, x, y, w, h } = imgObj
    ctx.value.drawImage(image, x, y, w, h)
    ctx.value.beginPath();
    ctx.value.strokeStyle = "#fff";
    ctx.value.rect(x, y, w, h);
    ctx.value.stroke();
  }
}

const checkElement = () => {
  imagesData.forEach((item: ImgObj, index: number) => {
    draw(item)
    if (ctx.value?.isPointInPath(clickCoordinate.x, clickCoordinate.y)) {
      target = index
      console.log("点击的元素是：", item.name);
    }
  })
}

const mousedownFn = (e: MouseEvent) => {
  // 获取当前点击坐标
  clickCoordinate.x = e.pageX - chess_canvas.value.offsetLeft
  clickCoordinate.y = e.pageY - chess_canvas.value.offsetTop
  console.log(clickCoordinate);
  checkElement()
}
// const mousemoveFn = (e: MouseEvent) => {}
// const mouseupFn = (e: MouseEvent) => {}

onMounted(() => {
  if (chess_canvas.value) {
    chess_canvas.value.addEventListener('mousedown', mousedownFn, false)
    ctx.value = chess_canvas.value.getContext('2d')
    createImgs()
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