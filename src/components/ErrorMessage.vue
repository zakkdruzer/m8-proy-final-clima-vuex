<script setup>
defineProps({
  message: {
    type: String,
    required: true
  },

  retryLabel: {
    type: String,
    default: ''
  }
})

defineEmits(['retry'])
</script>

<template>
  <section class="error-message" role="alert">
    <div>
      <h2>Ocurrió un problema</h2>
      <p>{{ message }}</p>
    </div>

    <button
      v-if="retryLabel"
      type="button"
      class="error-message__retry"
      @click="$emit('retry')"
    >
      {{ retryLabel }}
    </button>
  </section>
</template>