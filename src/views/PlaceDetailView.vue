<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main class="page">
    <section class="page__header">
      <h1>Detalle del lugar</h1>

      <p>
        Identificador del lugar: {{ route.params.id }}
      </p>

      <RouterLink to="/" class="button-link">
        Volver al inicio
      </RouterLink>
    </section>
  </main>
</template>