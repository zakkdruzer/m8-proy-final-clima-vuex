<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingState from '@/components/LoadingState.vue'
import PlaceCard from '@/components/PlaceCard.vue'
import SearchPlace from '@/components/SearchPlace.vue'

const store = useStore()
const router = useRouter()

const places = computed(() => store.state.places)
const searchLoading = computed(() => store.state.searchLoading)
const searchError = computed(() => store.state.searchError)
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

async function handleSearch(searchTerm) {
  await store.dispatch('searchPlaces', searchTerm)
}

async function handleSelectPlace(place) {
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
      <h1>Consulta el clima de tu ciudad</h1>

      <p>
        Busca una localidad para ver información meteorológica actualizada.
      </p>
    </section>

    <SearchPlace @search="handleSearch" />

    <LoadingState
      v-if="searchLoading"
      message="Buscando lugares..."
    />

    <ErrorMessage
      v-if="searchError"
      :message="searchError"
    />

    <section v-if="places.length > 0" class="results">
      <h2>Resultados de búsqueda</h2>

      <div class="results__grid">
        <PlaceCard
          v-for="place in places"
          :key="place.id"
          :place="place"
          :disabled="loading"
          @select="handleSelectPlace"
        />
      </div>
    </section>

    <LoadingState
      v-if="loading"
      message="Consultando clima..."
    />

    <ErrorMessage
      v-if="error"
      :message="error"
    />

    <section
      v-if="!searchLoading && !searchError && places.length === 0"
      class="home-help"
    >
      <h2>¿Qué puedes consultar?</h2>

      <p>
        Busca cualquier ciudad o localidad para conocer su temperatura actual,
        pronóstico semanal, estadísticas y alertas meteorológicas.
      </p>
    </section>
  </main>
</template>