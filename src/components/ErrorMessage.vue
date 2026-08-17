<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <p class="message message--error" role="alert">
    {{ message }}
  </p>
</template>