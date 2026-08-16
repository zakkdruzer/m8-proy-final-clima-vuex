<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const unit = computed(() => store.getters.temperatureSymbol)
const places = computed(() => store.state.places)

function changeUnit() {
  const newUnit = store.state.unit === 'celsius'
    ? 'fahrenheit'
    : 'celsius'

  store.dispatch('changeUnit', newUnit)
}
</script>

<template>
  <main class="page">
    <section class="page__header">
      <h1>Clima SPA</h1>

      <p>
        En la siguiente etapa podrás buscar ciudades y consultar datos reales.
      </p>

      <p>
        Unidad configurada: {{ unit }}
      </p>

      <button
        type="button"
        class="button-link"
        @click="changeUnit"
      >
        Cambiar unidad
      </button>
    </section>

    <section class="empty-state">
      <p>
        Lugares disponibles en el estado global: {{ places.length }}
      </p>
    </section>
  </main>
</template>