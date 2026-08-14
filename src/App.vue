<template>
  <!-- Aplicamos una clase dinámica según el tema actual del usuario. -->
  <div class="app" :class="themeClass">
    <!-- Cabecera básica de la SPA -->
    <header class="app-header">
      <h1>App de Clima SPA</h1>
      <nav class="app-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link v-if="isLoggedIn" to="/favoritos">Favoritos</router-link>
        <router-link v-if="isLoggedIn" to="/preferencias">Preferencias</router-link>

        <span v-if="isLoggedIn" class="app-user">
          Conectado como: {{ userName }}
          <button class="app-user__logout" @click="handleLogout">
            Cerrar sesión
          </button>
        </span>
      </nav>
    </header>

    <!-- Aquí se renderizan las vistas según la ruta actual -->
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
const userName = computed(() => store.getters['auth/userName'])

// Leemos el tema actual desde las preferencias del usuario.
const userPreferences = computed(() => store.getters['auth/userPreferences'])

// Computed que devuelve la clase de tema para el contenedor raíz.
const themeClass = computed(() => {
  const theme = userPreferences.value.theme || 'light'
  return theme === 'dark' ? 'app--dark' : 'app--light'
})

const handleLogout = () => {
  store.dispatch('auth/logout')
  router.push({ name: 'login' })
}
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Tema claro */
.app.app--light {
  background-color: #f3f4f6;
  color: #0f172a;
}

/* Tema oscuro: fondo y texto general */
.app.app--dark {
  background-color: #020617;
  color: #e5e7eb;
}

/* Header neutro (se ve bien en ambos temas) */
.app-header {
  padding: 1rem;
  background: #0f172a;
  color: #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Nav links */
.app-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-nav a {
  color: #38bdf8;
  text-decoration: none;
  margin-left: 0.5rem;
}

/* Tarjetas genéricas: LugarCard, Favoritos, Login, Preferencias */
.card {
  background-color: #ffffff;
  color: inherit;
}

/* Tarjetas en tema oscuro */
.app.app--dark .card {
  background-color: #0b1220;
  color: #e5e7eb;
}

/* Inputs y selects en tema claro */
input,
select {
  background-color: #ffffff;
  color: #0f172a;
  border: 1px solid #cbd5f5;
}

/* Inputs y selects en tema oscuro */
.app.app--dark input,
.app.app--dark select {
  background-color: #020617;
  color: #e5e7eb;
  border-color: #334155;
}

.app-user__logout {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: none;
  background-color: #ef4444;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.8rem;
}

.app-main {
  padding: 1rem;
}
</style>