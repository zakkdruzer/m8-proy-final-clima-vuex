<script setup>
defineProps({
  message: {
    type: String,
    default: 'Cargando información...'
  }
})
</script>

<template>
  <p class="message message--loading" role="status">
    {{ message }}
  </p>
</template>