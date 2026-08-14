<!-- Vista que muestra los lugares favoritos del usuario autenticado. -->
<template>
  <section class="favorites">
    <h1 class="favorites__title">Mis lugares favoritos</h1>

    <p v-if="favoritePlaces.length === 0" class="favorites__empty">
      Aún no tienes lugares favoritos configurados.
    </p>

    <ul v-else class="favorites__list">
      <li
        v-for="place in favoritePlaces"
        :key="place.id"
        class="favorites__item"
      >
        <article class="card favorites__card">
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
import { lugares } from '../data/lugares' // Ajusta la ruta si es necesario.

export default {
  name: 'FavoritesView',

  setup() {
    const store = useStore()
    const router = useRouter()

    // IDs de lugares favoritos del usuario desde Vuex.
    const favoriteIds = computed(() => store.getters['auth/userFavorites'])

    // Unidad de temperatura desde preferencias del usuario.
    const temperatureUnit = computed(
      () => store.getters['auth/userPreferences'].temperatureUnit || 'C'
    )

    // Filtramos la lista completa de lugares según los IDs favoritos.
    const favoritePlaces = computed(() =>
      lugares.filter((place) => favoriteIds.value.includes(place.id))
    )

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
  max-width: 800px;
  margin: 2rem auto;
}

.favorites__title {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.favorites__empty {
  text-align: center;
  font-style: italic;
}

.favorites__list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.favorites__item {
  margin-bottom: 0.5rem;
}

.favorites__name {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.favorites__climate,
.favorites__details {
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.favorites__button {
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  border: none;
  background-color: #22c55e;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.9rem;
}

.favorites__button:hover {
  background-color: #16a34a;
}
</style>