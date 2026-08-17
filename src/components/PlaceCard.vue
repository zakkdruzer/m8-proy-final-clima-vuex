<script setup>
defineProps({
  place: {
    type: Object,
    required: true
  },

  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])
</script>

<template>
  <article class="place-card">
    <div>
      <h2>{{ place.name }}</h2>

      <p>
        {{ place.admin1 || 'Sin región registrada' }}
        <span v-if="place.country">, {{ place.country }}</span>
      </p>
    </div>

    <button
      type="button"
      :disabled="disabled"
      @click="$emit('select', place)"
    >
      Ver clima
    </button>
  </article>
</template>