<!-- src/views/HomeView.vue -->
<!-- Vista principal que muestra el clima actual de los lugares. -->
<template>
  <section class="home">
    <h1 class="home__title">Clima actual de lugares</h1>

    <!-- Controles de búsqueda y unidad de temperatura. -->
    <div class="home__controls">
      <label class="home__label" for="search">
        Buscar lugar:
      </label>
      <input
        id="search"
        class="home__input"
        type="text"
        v-model="searchTerm"
        placeholder="Escribe el nombre del lugar"
      />

      <label class="home__label" for="unit">
        Unidad:
      </label>
      <select
        id="unit"
        class="home__select"
        v-model="selectedUnit"
        @change="handleUnitChange"
      >
        <option value="C">°C</option>
        <option value="F">°F</option>
      </select>
    </div>

    <!-- Lista de lugares filtrados. -->
    <div v-if="filteredPlaces.length" class="home__list">
      <LugarCard
        v-for="place in filteredPlaces"
        :key="place.id"
        class="home__card"
        :lugar="place"
        :unidad="selectedUnit"
        @ver-detalle="goToPlace"
      />
    </div>

    <!-- Mensaje cuando no hay resultados. -->
    <p v-else class="home__empty">
      No se encontraron lugares que coincidan con la búsqueda.
    </p>
  </section>
</template>

<script>
// Vista principal: consume datos de lugares y preferencias de unidad.
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { lugares } from '../data/lugares'
import LugarCard from '../components/LugarCard.vue'

export default {
  name: 'HomeView',
  components: {
    LugarCard,
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    // Preferencias del usuario (para inicializar unidad).
    const userPreferences = computed(
      () => store.getters['auth/userPreferences']
    )

    // Estado local de búsqueda y unidad.
    const searchTerm = ref('')
    const selectedUnit = ref(userPreferences.value.temperatureUnit || 'C')

    // Cuando el usuario cambia la unidad, actualizamos también las preferencias globales.
    const handleUnitChange = () => {
      store.dispatch('auth/updatePreferences', {
        temperatureUnit: selectedUnit.value,
      })
    }

    // Filtramos lugares según el término de búsqueda.
    const filteredPlaces = computed(() => {
      const term = searchTerm.value.toLowerCase().trim()
      if (!term) return lugares
      return lugares.filter((place) =>
        place.nombre.toLowerCase().includes(term)
      )
    })

    // Navegamos al detalle del lugar seleccionado.
    const goToPlace = (id) => {
      router.push({ name: 'place-detail', params: { id } })
    }

    return {
      searchTerm,
      selectedUnit,
      filteredPlaces,
      handleUnitChange,
      goToPlace,
    }
  },
}
</script>

<style scoped>
.home {
  max-width: 900px;
  margin: 2rem auto;
}

.home__title {
  margin-bottom: 1rem;
  font-size: 1.6rem;
}

.home__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.home__label {
  font-weight: 600;
}

.home__input,
.home__select {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
}

.home__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.home__empty {
  margin-top: 1rem;
  font-style: italic;
}
</style>