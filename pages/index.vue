<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <div
      ref="canvasContainer"
      style="position: absolute; left: 0; right: 0; top: 0; bottom: 68px"
    >
      <canvas
        ref="mainCanvas1"
        width="512"
        height="512"
        class="canvas-left"
      ></canvas>
      <canvas
        ref="mainCanvas2"
        width="512"
        height="512"
        class="canvas-right"
      ></canvas>
      <canvas
        ref="uiCanvas1"
        width="512"
        height="512"
        class="canvas-left"
      ></canvas>
      <canvas
        ref="uiCanvas2"
        width="512"
        height="512"
        class="canvas-right"
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
    title: 'Asteroids',
  }),
  mounted() {
    new ResizeObserver(() => {
      const width = this.$refs.canvasContainer.clientWidth
      const height = this.$refs.canvasContainer.clientHeight
      
      this.$refs.mainCanvas1.setAttribute('width', width / 2)
      this.$refs.mainCanvas1.setAttribute('height', height)
      this.$refs.uiCanvas1.setAttribute('width', width / 2)
      this.$refs.uiCanvas1.setAttribute('height', height)
      this.$refs.mainCanvas2.setAttribute('width', width / 2)
      this.$refs.mainCanvas2.setAttribute('height', height)
      this.$refs.uiCanvas2.setAttribute('width', width / 2)
      this.$refs.uiCanvas2.setAttribute('height', height)
    }).observe(this.$refs.canvasContainer)
    
    Game.start(this.$refs.mainCanvas1, this.$refs.mainCanvas2,
      this.$refs.uiCanvas1, this.$refs.uiCanvas2)
  },
  methods: {
    fullscreen() {
      this.$refs.canvasContainer.requestFullscreen()
    },
  },
}
</script>

<style scoped>
.canvas-left,
.canvas-right {
  position: absolute;
  top: 0%;
}

.canvas-left {
  left: 0%;
  border-right: 4px solid white;
}
.canvas-right {
  right: 0%;
  border-left: 4px solid white;
}

.fullscreen-button {
  position: absolute;
  translate: -50% 0%;
  left: 50%;
  bottom: 0%;
}
</style>
