<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const unit = computed(() => store.getters.temperatureSymbol)
const totalFavorites = computed(() => store.getters.favoritePlaces.length)
</script>

<template>
  <main class="page">
    <section class="page__header">
      <h1>Mis favoritos</h1>

      <p>
        Aquí podrás guardar los lugares que quieras consultar rápidamente.
      </p>

      <p>
        Unidad configurada: {{ unit }} · Favoritos guardados: {{ totalFavorites }}
      </p>
    </section>

    <section class="empty-state">
      <p>Aún no tienes lugares favoritos.</p>

      <RouterLink to="/" class="button-link">
        Buscar un lugar
      </RouterLink>
    </section>
  </main>
</template>