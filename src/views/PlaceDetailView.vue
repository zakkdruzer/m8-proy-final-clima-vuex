<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingState from '@/components/LoadingState.vue'

const store = useStore()
const route = useRoute()

const selectedPlace = computed(() => store.state.selectedPlace)
const weather = computed(() => store.state.weather)
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)
const temperatureSymbol = computed(
  () => store.getters.temperatureSymbol
)

const canUseCurrentWeather = computed(() => {
  return Boolean(selectedPlace.value && weather.value)
})

async function loadPlaceFromRoute() {
  if (canUseCurrentWeather.value) {
    return
  }

  const routeId = String(route.params.id)

  const place = store.state.places.find((currentPlace) => {
    return currentPlace.id === routeId
  })

  if (place) {
    await store.dispatch('loadWeather', place)
    return
  }

  store.commit(
    'SET_ERROR',
    'No encontramos la información de este lugar. Vuelve al inicio y búscalo nuevamente.'
  )
}

onMounted(() => {
  loadPlaceFromRoute()
})
</script>

<template>
  <main class="page">
    <section class="page__header">
      <RouterLink to="/" class="button-link">
        ← Volver al inicio
      </RouterLink>

      <h1 v-if="selectedPlace">
        Clima en {{ selectedPlace.name }}
      </h1>

      <p v-if="selectedPlace">
        {{ selectedPlace.admin1 || 'Sin región registrada' }}
        <span v-if="selectedPlace.country">
          , {{ selectedPlace.country }}
        </span>
      </p>
    </section>

    <LoadingState
      v-if="loading"
      message="Consultando información meteorológica..."
    />

    <ErrorMessage
      v-if="error"
      :message="error"
    />

    <section
      v-if="weather && selectedPlace"
      class="weather-current"
    >
      <h2>Condiciones actuales</h2>

      <p class="weather-current__temperature">
        {{ weather.current.temperature }}{{ temperatureSymbol }}
      </p>

      <dl class="weather-current__details">
        <div>
          <dt>Sensación térmica</dt>
          <dd>
            {{ weather.current.apparentTemperature }}{{ temperatureSymbol }}
          </dd>
        </div>

        <div>
          <dt>Humedad</dt>
          <dd>{{ weather.current.humidity }}%</dd>
        </div>

        <div>
          <dt>Viento</dt>
          <dd>{{ weather.current.windSpeed }} km/h</dd>
        </div>

        <div>
          <dt>Precipitación</dt>
          <dd>{{ weather.current.precipitation }} mm</dd>
        </div>
      </dl>
    </section>

    <section
      v-if="weather?.forecast?.length"
      class="forecast-preview"
    >
      <h2>Pronóstico disponible</h2>

      <p>
        Se recibieron {{ weather.forecast.length }} días de pronóstico.
      </p>
    </section>
  </main>
</template>