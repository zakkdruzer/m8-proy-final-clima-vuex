<script setup>
import { computed } from 'vue'
import { calculateWeeklyStats } from '@/utils/weatherStats'

const props = defineProps({
  forecast: {
    type: Array,
    default: () => []
  },

  temperatureSymbol: {
    type: String,
    default: '°C'
  }
})

const stats = computed(() => {
  return calculateWeeklyStats(props.forecast)
})

function formatTemperature(value) {
  return value === null ? '—' : `${value}${props.temperatureSymbol}`
}
</script>

<template>
  <section class="weekly-stats">
    <header class="weekly-stats__header">
      <h2>Estadísticas semanales</h2>
      <p>Resumen calculado a partir del pronóstico de los próximos 7 días.</p>
    </header>

    <div class="weekly-stats__grid">
      <article class="stat-card">
        <span class="stat-card__label">Mínima semanal</span>
        <strong class="stat-card__value">
          {{ formatTemperature(stats.minTemperature) }}
        </strong>
      </article>

      <article class="stat-card">
        <span class="stat-card__label">Máxima semanal</span>
        <strong class="stat-card__value">
          {{ formatTemperature(stats.maxTemperature) }}
        </strong>
      </article>

      <article class="stat-card">
        <span class="stat-card__label">Promedio semanal</span>
        <strong class="stat-card__value">
          {{ formatTemperature(stats.averageTemperature) }}
        </strong>
      </article>

      <article class="stat-card">
        <span class="stat-card__label">Días lluviosos</span>
        <strong class="stat-card__value">
          {{ stats.rainyDays }}
        </strong>
      </article>

      <article class="stat-card">
        <span class="stat-card__label">Días despejados</span>
        <strong class="stat-card__value">
          {{ stats.clearDays }}
        </strong>
      </article>

      <article class="stat-card">
        <span class="stat-card__label">Días nublados</span>
        <strong class="stat-card__value">
          {{ stats.cloudyDays }}
        </strong>
      </article>
    </div>
  </section>
</template>