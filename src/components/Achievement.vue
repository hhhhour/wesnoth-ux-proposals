<template>
  <img
    :src="image"
    class="w-achievement"
    :class="{
      'w-achievement--done': achieved,
      'w-achievement--small': size === 'small'
    }"
  >
</template>

<script>
export default {
  name: 'Achievement',
  props: {
    achieved: Boolean,
    image: String,
    name: String,
    size: String
  }
}
</script>

<style>
.w-achievement {
  width: 2rem;
  height: auto;
  background: #000;
  opacity: 0.3;
  border-radius: 50%;
  outline: 1px solid #594523;
  outline-offset: 2px;
}

.w-achievement--done {
  opacity: 1;
}

.w-achievement--small {
  width: 1.5rem;
}
</style>
