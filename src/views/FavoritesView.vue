<!-- Vista que muestra los lugares favoritos del usuario autenticado. -->
<template>
  <section class="favorites">
    <h1 class="favorites__title">Mis lugares favoritos</h1>

    <!-- Si el usuario no tiene favoritos, mostramos un mensaje amigable. -->
    <p v-if="favoritePlaces.length === 0" class="favorites__empty">
      Aún no tienes lugares favoritos configurados.
    </p>

    <!-- Lista de tarjetas con los lugares favoritos. -->
    <ul v-else class="favorites__list">
      <li
        v-for="place in favoritePlaces"
        :key="place.id"
        class="favorites__item"
      >
        <article class="favorites__card">
          <h2 class="favorites__name">
            {{ place.nombre }} ({{ place.region }})
          </h2>
          <p class="favorites__climate">
            Estado: {{ place.estadoActual }} |
            Temp: {{ place.tempActual }}°{{ temperatureUnit }}
          </p>
          <p class="favorites__details">
            Humedad: {{ place.humedad }}% |
            Viento: {{ place.viento }} km/h
          </p>

          <!-- Botón opcional para ir al detalle del lugar. -->
          <button class="favorites__button" @click="goToPlace(place.id)">
            Ver detalle
          </button>
        </article>
      </li>
    </ul>
  </section>
</template>

<script>
// Importamos herramientas de Vue y Vuex, además del router.
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
// Importamos la lista de lugares desde el módulo local de datos.
import lugares from '../data/lugares' // Ajusta la ruta según tu estructura real.

export default {
  name: 'FavoritesView',

  setup() {
    const store = useStore()
    const router = useRouter()

    // Obtenemos los IDs de lugares favoritos del usuario desde Vuex.
    const favoriteIds = computed(() => store.getters['auth/userFavorites'])

    // Obtenemos la unidad de temperatura desde las preferencias del usuario.
    const temperatureUnit = computed(
      () => store.getters['auth/userPreferences'].temperatureUnit || 'C'
    )

    // Filtramos la lista completa de lugares según los IDs favoritos del usuario.
    const favoritePlaces = computed(() =>
      lugares.filter((place) => favoriteIds.value.includes(place.id))
    )

    // Función para navegar al detalle del lugar seleccionado.
    const goToPlace = (id) => {
      router.push({ name: 'place-detail', params: { id } })
    }

    return {
      favoritePlaces,
      temperatureUnit,
      goToPlace,
    }
  },
}
</script>

<style scoped>
.favorites {
  max-width: 800px; /* Ancho máximo del contenido de favoritos. */
  margin: 2rem auto; /* Centrado horizontal y separación vertical. */
}

.favorites__title {
  margin-bottom: 1.5rem; /* Separación entre el título y la lista. */
  text-align: center; /* Centra el título en la página. */
  font-size: 1.5rem; /* Tamaño de fuente del título. */
}

.favorites__empty {
  text-align: center; /* Centra el mensaje de lista vacía. */
  font-style: italic; /* Estilo cursiva para diferenciarlo. */
}

.favorites__list {
  list-style: none; /* Quitamos los bullets del ul. */
  padding: 0; /* Eliminamos el padding por defecto. */
  display: grid; /* Usamos grid para organizar las tarjetas. */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Layout responsivo. */
  gap: 1rem; /* Separación entre tarjetas. */
}

.favorites__item {
  margin-bottom: 0.5rem;
}

.favorites__card {
  padding: 1rem; /* Espacio interno de la tarjeta. */
  border-radius: 8px; /* Bordes redondeados. */
  background-color: #ffffff; /* Fondo blanco. */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Sombra suave. */
}

.favorites__name {
  margin-bottom: 0.5rem; /* Separación entre el nombre y el texto siguiente. */
  font-size: 1.1rem; /* Tamaño de fuente del nombre. */
}

.favorites__climate,
.favorites__details {
  margin-bottom: 0.25rem; /* Separación pequeña entre líneas de texto. */
  font-size: 0.95rem; /* Tamaño de fuente ligeramente reducido. */
}

.favorites__button {
  margin-top: 0.5rem; /* Separación entre los textos y el botón. */
  padding: 0.4rem 0.8rem; /* Espacio interno del botón. */
  border-radius: 4px; /* Bordes redondeados. */
  border: none; /* Sin borde por defecto. */
  background-color: #22c55e; /* Color verde para acción positiva. */
  color: #ffffff; /* Texto blanco. */
  cursor: pointer; /* Indica que el botón es clicable. */
  font-size: 0.9rem; /* Tamaño de fuente del botón. */
}
</style>