<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const searchTerm = ref('Punta Arenas')

const places = computed(() => store.state.places)
const searchLoading = computed(() => store.state.searchLoading)
const searchError = computed(() => store.state.searchError)
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)
const selectedPlace = computed(() => store.state.selectedPlace)
const weather = computed(() => store.state.weather)
const temperatureSymbol = computed(
  () => store.getters.temperatureSymbol
)

async function searchPlaces() {
  await store.dispatch('searchPlaces', searchTerm.value)
}

async function selectPlace(place) {
  const weatherResult = await store.dispatch('loadWeather', place)

  if (weatherResult) {
    router.push({
      name: 'place-detail',
      params: {
        id: place.id
      }
    })
  }
}
</script>

<template>
  <main class="page">
    <section class="page__header">
      <h1>Clima SPA</h1>
      <p>Busca una ciudad para consultar su clima en tiempo real.</p>
    </section>

    <form class="search-form" @submit.prevent="searchPlaces">
      <label for="place-search">Buscar ciudad o localidad</label>

      <div class="search-form__row">
        <input
          id="place-search"
          v-model="searchTerm"
          type="search"
          placeholder="Ejemplo: Punta Arenas"
          autocomplete="off"
        >

        <button type="submit" :disabled="searchLoading">
          {{ searchLoading ? 'Buscando...' : 'Buscar' }}
        </button>
      </div>
    </form>

    <p v-if="searchError" class="message message--error">
      {{ searchError }}
    </p>

    <section v-if="places.length > 0" class="results">
      <h2>Resultados de búsqueda</h2>

      <div class="results__grid">
        <article
          v-for="place in places"
          :key="place.id"
          class="place-result"
        >
          <h3>{{ place.name }}</h3>

          <p>
            {{ place.admin1 || 'Sin región' }}
            <span v-if="place.country">, {{ place.country }}</span>
          </p>

          <button
            type="button"
            :disabled="loading"
            @click="selectPlace(place)"
          >
            Ver clima
          </button>
        </article>
      </div>
    </section>

    <p v-if="loading" class="message">
      Consultando clima...
    </p>

    <p v-if="error" class="message message--error">
      {{ error }}
    </p>

    <section v-if="weather && selectedPlace" class="weather-preview">
      <h2>Datos recibidos</h2>

      <p>
        Lugar: {{ selectedPlace.name }}, {{ selectedPlace.country }}
      </p>

      <p>
        Temperatura actual:
        {{ weather.current.temperature }}{{ temperatureSymbol }}
      </p>

      <p>
        Pronóstico disponible: {{ weather.forecast.length }} días
      </p>
    </section>
  </main>
</template>