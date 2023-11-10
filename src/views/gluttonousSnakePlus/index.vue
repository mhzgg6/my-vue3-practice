<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gameConfig } from "./baseData";
import { score, loadImages, initSnake, randomFood, startAnimate, stopAnimate, handleKeydownFn } from "./snake";

const width: number = 1000,
      height: number = 500;
let muted = ref<boolean>(false)
const bgMusic = ref<HTMLAudioElement | null>(null)
const chess_canvas = ref<HTMLCanvasElement | null>(null);


console.log(bgMusic);

const init = () => {
  let promiseAll  = loadImages()
  Promise.all(promiseAll).then(() => {
    // bgAudio.play()
    initSnake();
    randomFood();
    startAnimate();
  })
};

const playBg = () => {
  if (bgMusic.value) {
    bgMusic.value.play()
  }
}

onMounted(() => {
  // muted.value = false
  // bgMusic.value?.play()
  if (chess_canvas.value) {
    gameConfig.ctx = chess_canvas.value.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    document.addEventListener("keydown", handleKeydownFn, false);
    init();
  }
});

onBeforeUnmount(() => {
  stopAnimate()
})

</script>

<template>
  <div class="snake-page">
    <div class="snake-score">
      分数: 
      <span>{{ score }}</span>
    </div>
    <canvas
      id="chess_canvas"
      ref="chess_canvas"
      :width="width"
      :height="height"
    >
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>

    <audio autoplay :muted="muted" ref="bgMusic" src="http://cdn.xjbigvision.com/bg.mp3"></audio>
    <button @click="playBg">播放</button>
  </div>
</template>

<style scoped>
.snake-page{
  position: relative;
  width: 100%;
  height: 100%;
}
.snake-score{
  position: absolute;
  top: 10px;
  right: 250px;
}
.snake-score span{
  color: red;
}
canvas {
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
</style>
