<template>
  <section class="home">
    <h2>Clima actual de lugares</h2>

    <div class="home-controls">
      <label>
        Buscar lugar:
        <input
          type="text"
          v-model="searchTerm"
          placeholder="Escribe el nombre del lugar"
        />
      </label>

      <label>
        Unidad:
        <select v-model="temperatureUnit">
          <option value="C">°C</option>
          <option value="F">°F</option>
        </select>
      </label>
    </div>

    <p v-if="lugaresFiltrados.length === 0">
      No se encontraron lugares para ese término.
    </p>

    <ul v-else class="place-list">
      <li
        v-for="lugar in lugaresFiltrados"
        :key="lugar.id"
        class="place-card"
        @click="irADetalle(lugar.id)"
      >
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
          <strong>{{ formatearTemperatura(lugar.tempActual) }}</strong>
        </p>
        <p>
          Humedad: <strong>{{ lugar.humedad }}%</strong> ·
          Viento: <strong>{{ lugar.viento }} km/h</strong>
        </p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { lugares } from '../data/lugares'
import { getSavedUnit, saveUnit } from '../config/temperatureConfig'

// Estado para búsqueda y unidad
const searchTerm = ref('')
const temperatureUnit = ref(getSavedUnit())

const router = useRouter()

const lugaresFiltrados = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  if (!term) return lugares
  return lugares.filter((lugar) =>
    lugar.nombre.toLowerCase().includes(term)
  )
})

function formatearTemperatura(tempC) {
  if (temperatureUnit.value === 'C') {
    return `${tempC} °C`
  }
  const tempF = tempC * 9 / 5 + 32
  return `${tempF.toFixed(1)} °F`
}

function irADetalle(id) {
  router.push({ name: 'place-detail', params: { id } })
}

// Guardar la unidad en localStorage cuando cambie
watch(temperatureUnit, (nuevaUnidad) => {
  saveUnit(nuevaUnidad)
})
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.home-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.place-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}

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
</style>