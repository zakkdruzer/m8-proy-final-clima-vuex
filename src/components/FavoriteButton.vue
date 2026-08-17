<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  place: {
    type: Object,
    required: true
  }
})

const store = useStore()

const isFavorite = computed(() => {
  return store.getters.isFavorite(props.place.id)
})

function toggleFavorite() {
  store.dispatch('toggleFavorite', props.place)
}
</script>

<template>
  <button
    type="button"
    class="favorite-button"
    :class="{ 'favorite-button--active': isFavorite }"
    :aria-pressed="isFavorite"
    @click="toggleFavorite"
  >
    <span aria-hidden="true">
      {{ isFavorite ? '★' : '☆' }}
    </span>

    {{ isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
  </button>
</template>