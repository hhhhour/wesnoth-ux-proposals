<template>
  <div class="main-screen">
    <div class="main-screen__map" />
    <div class="main-screen__logo">
      <img src="/images/logo-bg.png">
      <img src="/images/logo.png">
    </div>
    <div class="main-screen__buttons">
      <w-button size="large" :primary="true" @click="alert('This would load the player directly into their last singleplayer save.')">Continue</w-button>
      <w-button @click="emitScreen('play')">New Game</w-button>
      <w-button>Settings</w-button>
      <w-button>Editor</w-button>
      <w-button>About</w-button>
      <w-button>Quit</w-button>
    </div>
  </div>
</template>

<script>
import WButton from './Button.vue';

export default {
  name: 'MainScreen',
  components: {
    WButton
  },
  methods: {
    alert(msg) {
      alert(msg);
    },
    emitScreen(screen) {
      this.$emit('screen:set', screen);
    }
  }
}
</script>

<style>
.main-screen {
  background-image: url('/images/background.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}

.main-screen__map {
  background-image: url('/images/titlescreen.png');
  background-size: auto 93%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}

.main-screen__logo {
  position: fixed;
  top: 1rem;
  left: 50%;
  height: 200px;
  transform: translateX(-50%);
}

.main-screen__logo img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.main-screen__buttons {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  min-width: 13rem;
}
.main-screen__buttons .w-btn + .w-btn {
  margin-top: 0.5rem;
}
</style>
