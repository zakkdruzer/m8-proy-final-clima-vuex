<template>
  <div class="app">
    <!-- Cabecera básica de la SPA -->
    <header class="app-header">
      <h1>App de Clima SPA</h1>
      <nav class="app-nav">
        <!-- router-link evita recargar la página -->
        <router-link to="/">Home</router-link>
      </nav>
    </header>

    <!-- Aquí se renderizan las vistas según la ruta actual -->
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// En esta versión base no necesitamos lógica en App.vue
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 1rem;
  background: #1e293b;
  color: #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-nav a {
  color: #38bdf8;
  text-decoration: none;
  margin-left: 1rem;
}

.app-main {
  padding: 1rem;
}
</style>