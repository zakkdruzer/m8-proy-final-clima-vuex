<template>
  <section v-if="lugar" class="detail">
    <header class="detail-header">
      <h2>
        {{ lugar.icono }} {{ lugar.nombre }}
      </h2>
      <button @click="volverHome">Volver a Home</button>
    </header>

    <p>{{ lugar.region }}</p>
    <p>
      Clima actual:
      <strong>{{ lugar.estadoActual }}</strong>
    </p>
    <p>
      Temperatura actual:
      <strong>{{ formatearTemp(lugar.tempActual) }}</strong>
    </p>
    <p>
      Humedad: <strong>{{ lugar.humedad }}%</strong> ·
      Viento: <strong>{{ lugar.viento }} km/h</strong>
    </p>

    <PronosticoSemanal :pronostico="lugar.pronosticoSemanal" />

    <EstadisticasSemanales
      :estadisticas="estadisticas"
      :temperature-unit="temperatureUnit"
    />
  </section>

  <section v-else class="detail">
    <p>No se encontró el lugar solicitado.</p>
    <button @click="volverHome">Volver a Home</button>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getLugarPorId } from '../data/lugares'
import { getSavedUnit, saveUnit } from '../config/temperatureConfig'
import PronosticoSemanal from '../components/PronosticoSemanal.vue'
import EstadisticasSemanales from '../components/EstadisticasSemanales.vue'

const route = useRoute()
const router = useRouter()

const temperatureUnit = ref(getSavedUnit())

const lugar = computed(() => {
  const id = route.params.id
  return getLugarPorId(id)
})

const estadisticas = computed(() => {
  if (!lugar.value || !lugar.value.pronosticoSemanal) return null

  const mins = lugar.value.pronosticoSemanal.map((d) => d.min)
  const maxs = lugar.value.pronosticoSemanal.map((d) => d.max)

  const minSemana = Math.min(...mins)
  const maxSemana = Math.max(...maxs)

  const promedioDia = lugar.value.pronosticoSemanal.map(
    (d) => (d.min + d.max) / 2
  )
  const sumaPromedios = promedioDia.reduce((acc, valor) => acc + valor, 0)
  const promedioSemana = sumaPromedios / promedioDia.length

  return {
    minSemana,
    maxSemana,
    promedioSemana,
  }
})

function formatearTemp(tempC) {
  if (temperatureUnit.value === 'C') return `${tempC} °C`
  const tempF = tempC * 9 / 5 + 32
  return `${tempF.toFixed(1)} °F`
}

// Opcional: UI futura para cambiar unidad desde Detalle
function cambiarUnidad(unidad) {
  temperatureUnit.value = unidad
  saveUnit(unidad)
}

function volverHome() {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.detail {
  max-width: 800px;
  margin: 0 auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>