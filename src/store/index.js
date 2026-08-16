import { createStore } from 'vuex'

const getInitialFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('weather-favorites')) || []
  } catch {
    return []
  }
}

const getInitialUnit = () => {
  const savedUnit = localStorage.getItem('weather-unit')

  return savedUnit === 'fahrenheit' ? 'fahrenheit' : 'celsius'
}

const store = createStore({
  state: () => ({
    places: [],
    selectedPlace: null,
    weather: null,

    loading: false,
    error: null,

    searchLoading: false,
    searchError: null,

    unit: getInitialUnit(),
    favorites: getInitialFavorites()
  }),

  getters: {
    temperatureSymbol: (state) => {
      return state.unit === 'fahrenheit' ? '°F' : '°C'
    },

    isFavorite: (state) => (placeId) => {
      return state.favorites.some((place) => place.id === placeId)
    },

    favoritePlaces: (state) => {
      return state.favorites
    },

    hasSelectedPlace: (state) => {
      return Boolean(state.selectedPlace)
    },

    hasWeather: (state) => {
      return Boolean(state.weather)
    }
  },

  mutations: {
    SET_PLACES(state, places) {
      state.places = places
    },

    SET_SELECTED_PLACE(state, place) {
      state.selectedPlace = place
    },

    SET_WEATHER(state, weather) {
      state.weather = weather
    },

    SET_LOADING(state, value) {
      state.loading = value
    },

    SET_ERROR(state, error) {
      state.error = error
    },

    SET_SEARCH_LOADING(state, value) {
      state.searchLoading = value
    },

    SET_SEARCH_ERROR(state, error) {
      state.searchError = error
    },

    SET_UNIT(state, unit) {
      state.unit = unit
    },

    SET_FAVORITES(state, favorites) {
      state.favorites = favorites
    }
  },

  actions: {
    setSelectedPlace({ commit }, place) {
      commit('SET_SELECTED_PLACE', place)
    },

    setPlaces({ commit }, places) {
      commit('SET_PLACES', places)
    },

    setWeather({ commit }, weather) {
      commit('SET_WEATHER', weather)
    },

    changeUnit({ commit }, unit) {
      if (!['celsius', 'fahrenheit'].includes(unit)) {
        return
      }

      commit('SET_UNIT', unit)
      localStorage.setItem('weather-unit', unit)
    },

    toggleFavorite({ commit, state }, place) {
      const alreadyFavorite = state.favorites.some(
        (favorite) => favorite.id === place.id
      )

      const favorites = alreadyFavorite
        ? state.favorites.filter(
            (favorite) => favorite.id !== place.id
          )
        : [...state.favorites, place]

      commit('SET_FAVORITES', favorites)

      localStorage.setItem(
        'weather-favorites',
        JSON.stringify(favorites)
      )
    },

    clearWeatherState({ commit }) {
      commit('SET_SELECTED_PLACE', null)
      commit('SET_WEATHER', null)
      commit('SET_ERROR', null)
    }
  }
})

export default store