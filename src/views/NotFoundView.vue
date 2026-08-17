<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main class="page not-found">
    <section class="not-found__content">
      <p class="not-found__code">404</p>

      <h1>Página no encontrada</h1>

      <p>
        La dirección <code>{{ route.fullPath }}</code> no existe en esta
        aplicación.
      </p>

      <RouterLink to="/" class="button-link">
        Volver al inicio
      </RouterLink>
    </section>
  </main>
</template>