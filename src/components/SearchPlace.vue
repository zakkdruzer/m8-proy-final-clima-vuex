<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])

const searchTerm = ref('')

function submitSearch() {
  emit('search', searchTerm.value)
}
</script>

<template>
  <form class="search-form" @submit.prevent="submitSearch">
    <label for="place-search">Buscar ciudad o localidad</label>

    <div class="search-form__row">
      <input
        id="place-search"
        v-model="searchTerm"
        type="search"
        placeholder="Ejemplo: Punta Arenas"
        autocomplete="off"
      >

      <button type="submit">
        Buscar
      </button>
    </div>
  </form>
</template>