<template>
  <section class="detail-section" v-if="estadisticas">
    <h3>Estadísticas de la semana</h3>
    <ul class="stats-list">
      <li>Mínima semanal: {{ formatearTemp(estadisticas.minSemana) }}</li>
      <li>Máxima semanal: {{ formatearTemp(estadisticas.maxSemana) }}</li>
      <li>
        Promedio semanal:
        {{ formatearTemp(estadisticas.promedioSemana) }}
      </li>
    </ul>
  </section>
</template>

<script setup>
// Props: objeto de estadísticas y unidad de temperatura
const props = defineProps({
  estadisticas: {
    type: Object,
    required: false,
    default: null,
  },
  temperatureUnit: {
    type: String,
    default: 'C',
  },
})

// Lógica interna para formatear temperatura según unidad
function formatearTemp(tempC) {
  if (props.temperatureUnit === 'C') return `${tempC} °C`
  const tempF = tempC * 9 / 5 + 32
  return `${tempF.toFixed(1)} °F`
}
</script>

<style scoped>
.detail-section {
  margin-top: 1rem;
}

.stats-list {
  list-style: none;
  padding: 0;
}
</style>