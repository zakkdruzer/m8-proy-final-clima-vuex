<template>
  <div class="app">
    <!-- Cabecera básica de la SPA -->
    <header class="app-header">
      <h1>App de Clima SPA</h1>

      <nav class="app-nav">
        <!-- router-link evita recargar la página -->
        <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/favoritos">Favoritos</router-link>

        <!-- Sección que muestra el usuario logueado y botón de cerrar sesión -->
        <span v-if="isLoggedIn" class="app-user">
          <!-- Nombre del usuario tomado desde Vuex (getter auth/userName) -->
          Conectado como: {{ userName }}
          <!-- Botón para cerrar sesión -->
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
// Script con Composition API para leer estado de Vuex y manejar logout.
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// Obtenemos el store de Vuex y el router.
const store = useStore()
const router = useRouter()

// Computed que indica si hay sesión iniciada usando el getter 'auth/isLoggedIn'.
const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])

// Computed que devuelve el nombre del usuario logueado.
const userName = computed(() => store.getters['auth/userName'])

// Función que cierra sesión y redirige a la ruta de login o Home pública.
const handleLogout = () => {
  // Disparamos la acción 'logout' del módulo auth.
  store.dispatch('auth/logout')
  // Redirigimos al login después de cerrar sesión.
  router.push({ name: 'login' })
}
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

.app-nav {
  display: flex; /* Organizamos los elementos de navegación en fila. */
  align-items: center; /* Centramos verticalmente enlaces y sección de usuario. */
  gap: 1rem; /* Separación uniforme entre los elementos del nav. */
}

.app-nav a {
  color: #38bdf8;
  text-decoration: none;
  margin-left: 0.5rem;
}

.app-user {
  display: flex; /* Contenedor para texto y botón de logout. */
  align-items: center; /* Centra verticalmente el texto y el botón. */
  gap: 0.5rem; /* Separación entre el texto y el botón. */
  font-size: 0.9rem; /* Tamaño de fuente ligeramente más pequeño. */
}

.app-user__logout {
  padding: 0.25rem 0.5rem; /* Espacio interno del botón de cerrar sesión. */
  border-radius: 4px; /* Bordes redondeados del botón. */
  border: none; /* Sin borde por defecto. */
  background-color: #ef4444; /* Color rojo para indicar acción de salir. */
  color: #ffffff; /* Texto blanco sobre el botón. */
  cursor: pointer; /* Indica que el botón es clicable. */
  font-size: 0.8rem; /* Tamaño de fuente del botón. */
}

.app-main {
  padding: 1rem;
}
</style>