<template>
  <button class="w-btn" :class="{
      'w-btn--large': size === 'large',
      'w-btn--primary': primary
  }" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    primary: Boolean,
    size: String
  }
}
</script>

<style>
.w-btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #001f34;
    border: 1px solid #a48042;
    border-radius: 2px;
    color: #bcad7e;
    outline: 2px solid #001f34;
}

.w-btn:hover,
.w-btn:focus {
    background: #043453;
}

.w-btn--primary {
    background: #07456e;
    font-weight: 700;
}

.w-btn--primary:hover,
.w-btn--primary:focus {
    background: #06588f;
}

.w-btn--large {
    font-size: 1.2rem;
    line-height: 2rem;
}
</style>
