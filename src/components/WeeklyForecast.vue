<script setup>
import ForecastDayCard from '@/components/ForecastDayCard.vue'

defineProps({
  forecast: {
    type: Array,
    default: () => []
  },

  temperatureSymbol: {
    type: String,
    default: '°C'
  }
})
</script>

<template>
  <section class="weekly-forecast">
    <header class="weekly-forecast__header">
      <h2>Pronóstico de 7 días</h2>

      <p>
        Temperaturas máximas y mínimas, precipitaciones y viento esperado.
      </p>
    </header>

    <div
      v-if="forecast.length > 0"
      class="weekly-forecast__grid"
    >
      <ForecastDayCard
        v-for="day in forecast"
        :key="day.date"
        :day="day"
        :temperature-symbol="temperatureSymbol"
      />
    </div>

    <p v-else class="message">
      No hay pronóstico disponible para este lugar.
    </p>
  </section>
</template>