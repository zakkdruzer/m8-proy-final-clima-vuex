<script setup>
import { computed } from 'vue'
import { generateWeatherAlerts } from '@/utils/weatherAlerts'

const props = defineProps({
  forecast: {
    type: Array,
    default: () => []
  }
})

const alerts = computed(() => {
  return generateWeatherAlerts(props.forecast)
})
</script>

<template>
  <section class="weather-alerts">
    <header class="weather-alerts__header">
      <h2>Alertas meteorológicas</h2>
      <p>Alertas generadas automáticamente según el pronóstico semanal.</p>
    </header>

    <div class="weather-alerts__list">
      <article
        v-for="alert in alerts"
        :key="alert.title"
        class="weather-alert"
        :class="`weather-alert--${alert.type}`"
      >
        <h3>{{ alert.title }}</h3>
        <p>{{ alert.message }}</p>
      </article>
    </div>
  </section>
</template>