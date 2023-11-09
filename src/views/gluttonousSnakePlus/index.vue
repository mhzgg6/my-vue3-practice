<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gameConfig } from "./baseData";
import { score, loadImages, initSnake, randomFood, startAnimate, stopAnimate, handleKeydownFn } from "./snake";

const width: number = 1000,
      height: number = 500;

const chess_canvas = ref<HTMLCanvasElement | null>(null);

const init = () => {
  let promiseAll  = loadImages()
  Promise.all(promiseAll).then(() => {
    initSnake();
    randomFood();
    startAnimate();
  })
};

onMounted(() => {
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
