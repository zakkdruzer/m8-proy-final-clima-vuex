<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="app-header">
      <RouterLink to="/" class="app-header__brand">
        Clima SPA
      </RouterLink>

      <nav class="app-header__nav" aria-label="Navegación principal">
        <RouterLink to="/" class="app-header__link">
          Inicio
        </RouterLink>

        <RouterLink to="/favoritos" class="app-header__link">
          Favoritos
        </RouterLink>
      </nav>
    </header>

    <RouterView />

    <footer class="app-footer">
      <p>Clima SPA · Proyecto final Módulo 8</p>
    </footer>
  </div>
</template>