<template>
  <li class="place-card" @click="handleClick">
    <header class="place-card__header">
      <h3>{{ lugar.nombre }}</h3>
      <span class="place-card__icono">{{ lugar.icono }}</span>
    </header>
    <p class="place-card__region">{{ lugar.region }}</p>
    <p>
      Estado actual: <strong>{{ lugar.estadoActual }}</strong>
    </p>
    <p>
      Temperatura actual:
      <strong>{{ temperaturaFormateada }}</strong>
    </p>
    <p>
      Humedad: <strong>{{ lugar.humedad }}%</strong> ·
      Viento: <strong>{{ lugar.viento }} km/h</strong>
    </p>
  </li>
</template>

<script setup>
import { computed } from 'vue'

// Props que recibe la card
const props = defineProps({
  lugar: {
    type: Object,
    required: true,
  },
  temperatureUnit: {
    type: String,
    default: 'C',
  },
})

// Emitimos un evento cuando se clickea la card
const emit = defineEmits(['abrir-detalle'])

const temperaturaFormateada = computed(() => {
  const tempC = props.lugar.tempActual
  if (props.temperatureUnit === 'C') {
    return `${tempC} °C`
  }
  const tempF = tempC * 9 / 5 + 32
  return `${tempF.toFixed(1)} °F`
})

function handleClick() {
  emit('abrir-detalle', props.lugar.id)
}
</script>

<style scoped>
.place-card {
  border: 1px solid #cbd5f5;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  background: #f9fafb;
  transition: transform 0.1s, box-shadow 0.1s;
}

.place-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.1);
}

.place-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.place-card__region {
  font-size: 0.9rem;
  color: #6b7280;
}
</style>