<script setup lang="ts">
import { ref, onMounted } from 'vue'

const width: number = 1000,
      height: number = 500;

const chess_canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null) 

onMounted(() => {
  if (chess_canvas.value) {
    ctx.value = chess_canvas.value.getContext('2d')
    // draw()
  }
})

</script>

<template>
  <div class="snake-page">
    <canvas id="chess_canvas" ref="chess_canvas" :width="width" :height="height">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
  </div>
</template>

<style scoped>
canvas {
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
</style>