<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingState from '@/components/LoadingState.vue'
import WeeklyForecast from '@/components/WeeklyForecast.vue'
import WeeklyStats from '@/components/WeeklyStats.vue'
import WeatherAlerts from '@/components/WeatherAlerts.vue'
import { getWeatherInfo } from '@/utils/weatherCodes'
import FavoriteButton from '@/components/FavoriteButton.vue'

const store = useStore()
const route = useRoute()

const selectedPlace = computed(() => store.state.selectedPlace)
const weather = computed(() => store.state.weather)
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)
const temperatureSymbol = computed(
  () => store.getters.temperatureSymbol
)

const currentWeatherInfo = computed(() => {
  return getWeatherInfo(weather.value?.current?.weatherCode)
})

const canUseCurrentWeather = computed(() => {
  return Boolean(selectedPlace.value && weather.value)
})

async function loadPlaceFromRoute() {
  const routeId = String(route.params.id)

  const placeFromSearch = store.state.places.find((currentPlace) => {
    return currentPlace.id === routeId
  })

  const placeFromStorage = store.state.selectedPlace

  const place = placeFromSearch || (
    placeFromStorage?.id === routeId
      ? placeFromStorage
      : null
  )

  if (!place) {
    store.commit(
      'SET_ERROR',
      'No encontramos la información de este lugar. Vuelve al inicio y búscalo nuevamente.'
    )

    return
  }

  const hasWeatherForPlace = (
    store.state.weather &&
    store.state.selectedPlace?.id === place.id
  )

  if (!hasWeatherForPlace) {
    await store.dispatch('loadWeather', place)
  }
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
      <FavoriteButton v-if="selectedPlace" :place="selectedPlace" />
    </section>

    <LoadingState v-if="loading" message="Consultando información meteorológica..." />

    <ErrorMessage v-if="error" :message="error" />

    <section v-if="weather && selectedPlace" class="weather-current">
      <h2>Condiciones actuales</h2>

      <p class="weather-current__condition">
        <span role="img" :aria-label="currentWeatherInfo.label">
          {{ currentWeatherInfo.icon }}
        </span>

        {{ currentWeatherInfo.label }}
      </p>

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

    <WeeklyForecast v-if="weather?.forecast" :forecast="weather.forecast" :temperature-symbol="temperatureSymbol" />
    <WeatherAlerts v-if="weather?.forecast" :forecast="weather.forecast" />
  </main>
</template>