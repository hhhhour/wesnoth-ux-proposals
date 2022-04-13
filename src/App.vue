<template>
  <div id="app">
    <main-screen v-if="screen === 'main'" @screen:set="setScreen" />
    <play-screen v-if="screen === 'play'" @screen:set="setScreen" />
  </div>
</template>

<script>
import MainScreen from './components/MainScreen.vue'
import PlayScreen from './components/PlayScreen.vue'

export default {
  name: 'App',
  components: {
    MainScreen,
    PlayScreen
  },
  data() {
    return {
      screen: 'main'
    }
  },
  methods: {
    setScreen(screen) {
      this.screen = screen;
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  font-family: Lato, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background: #1e1c1b;
  font-size: 16px;
  line-height: 1.5rem;
}

html,
body,
button {
  font-family: Lato, sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
}

#app {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
