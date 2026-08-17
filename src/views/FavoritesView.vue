<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ErrorMessage from '@/components/ErrorMessage.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'
import LoadingState from '@/components/LoadingState.vue'

const store = useStore()
const router = useRouter()

const favorites = computed(() => store.getters.favoritePlaces)
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

async function openFavorite(place) {
  const weather = await store.dispatch('loadWeather', place)

  if (weather) {
    router.push({
      name: 'place-detail',
      params: {
        id: place.id
      }
    })
  }
}
</script>

<template>
  <main class="page">
    <section class="page__header">
      <h1>Mis favoritos</h1>

      <p>
        Guarda tus lugares frecuentes para consultar su clima rápidamente.
      </p>
    </section>

    <LoadingState
      v-if="loading"
      message="Consultando clima del lugar favorito..."
    />

    <ErrorMessage
      v-if="error"
      :message="error"
    />

    <section
      v-if="favorites.length > 0"
      class="favorites-grid"
    >
      <article
        v-for="place in favorites"
        :key="place.id"
        class="favorite-card"
      >
        <div>
          <h2>{{ place.name }}</h2>

          <p>
            {{ place.admin1 || 'Sin región registrada' }}
            <span v-if="place.country">, {{ place.country }}</span>
          </p>
        </div>

        <div class="favorite-card__actions">
          <button
            type="button"
            class="favorite-card__open"
            :disabled="loading"
            @click="openFavorite(place)"
          >
            Ver clima
          </button>

          <FavoriteButton :place="place" />
        </div>
      </article>
    </section>

    <section
      v-else
      class="empty-state"
    >
      <h2>Aún no tienes favoritos</h2>

      <p>
        Busca una ciudad, entra a su detalle y agrégala a favoritos.
      </p>

      <RouterLink to="/" class="button-link">
        Buscar un lugar
      </RouterLink>
    </section>
  </main>
</template>