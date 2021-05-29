<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <div
      ref="canvasContainer"
      style="position: absolute; left: 0; right: 0; top: 0; bottom: 68px"
    >
      <canvas
        ref="mainCanvas"
        width="512"
        height="512"
        class="canvas"
      ></canvas>
      <canvas
        ref="uiCanvas"
        width="512"
        height="512"
        class="canvas"
      ></canvas>
    </div>
    <v-btn
      color="primary"
      elevation="2"
      class="fullscreen-button my-4"
      @click="fullscreen"
    >
      Fullscreen
    </v-btn>
  </div>
</template>

<script>
import Game from '~/assets/examples/asteroids/Game.js'

export default {
  head: () => ({
    title: 'Play',
  }),
  mounted() {
    new ResizeObserver(() => {
      const width = this.$refs.canvasContainer.clientWidth
      const height = this.$refs.canvasContainer.clientHeight
      
      this.$refs.mainCanvas.setAttribute('width', width)
      this.$refs.mainCanvas.setAttribute('height', height)
      this.$refs.uiCanvas.setAttribute('width', width)
      this.$refs.uiCanvas.setAttribute('height', height)
    }).observe(this.$refs.canvasContainer)
    
    Game.start(this.$refs.mainCanvas, this.$refs.uiCanvas)
  },
  methods: {
    fullscreen() {
      this.$refs.canvasContainer.requestFullscreen()
    },
  },
}
</script>

<style scoped>
.canvas {
  position: absolute;
  left: 0%;
  top: 0%;
}

.fullscreen-button {
  position: absolute;
  translate: -50% 0%;
  left: 50%;
  bottom: 0%;
}
</style>
