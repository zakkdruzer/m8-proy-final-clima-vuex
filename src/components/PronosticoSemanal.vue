<template>
  <section class="detail-section">
    <h3>Pronóstico semanal</h3>

    <ul class="forecast-list">
      <li v-for="dia in pronostico" :key="dia.dia">
        <strong>{{ dia.dia }}:</strong>
        Min {{ dia.min }} °C - Max {{ dia.max }} °C · {{ dia.estado }}
      </li>
    </ul>
  </section>
</template>

<script setup>
// Recibimos el arreglo de días del pronóstico semanal
const props = defineProps({
  pronostico: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.detail-section {
  margin-top: 1rem;
}

.forecast-list {
  list-style: none;
  padding: 0;
}
</style>