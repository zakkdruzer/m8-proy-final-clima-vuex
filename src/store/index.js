import { createStore } from "vuex";
import { getWeatherForecast, searchPlacesByName } from "@/services/weatherApi";

import { normalizePlace, normalizeWeather } from "@/services/weatherAdapter";

const getInitialFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("weather-favorites")) || [];
  } catch {
    return [];
  }
};

const getInitialUnit = () => {
  const savedUnit = localStorage.getItem("weather-unit");

  return savedUnit === "fahrenheit" ? "fahrenheit" : "celsius";
};

const getInitialSelectedPlace = () => {
  try {
    return JSON.parse(localStorage.getItem("weather-selected-place")) || null;
  } catch {
    return null;
  }
};

const getInitialWeather = () => {
  try {
    return JSON.parse(localStorage.getItem("weather-data")) || null;
  } catch {
    return null;
  }
};

const store = createStore({
  state: () => ({
    places: [],
    selectedPlace: getInitialSelectedPlace(),
    weather: getInitialWeather(),

    loading: false,
    error: null,

    searchLoading: false,
    searchError: null,

    unit: getInitialUnit(),
    favorites: getInitialFavorites(),
  }),

  getters: {
    temperatureSymbol: (state) => {
      return state.unit === "fahrenheit" ? "°F" : "°C";
    },

    isFavorite: (state) => (placeId) => {
      return state.favorites.some((place) => place.id === placeId);
    },

    favoritePlaces: (state) => {
      return state.favorites;
    },

    hasSelectedPlace: (state) => {
      return Boolean(state.selectedPlace);
    },

    hasWeather: (state) => {
      return Boolean(state.weather);
    },
  },

  mutations: {
    SET_PLACES(state, places) {
      state.places = places;
    },

    SET_SELECTED_PLACE(state, place) {
      state.selectedPlace = place;

      if (place) {
        localStorage.setItem("weather-selected-place", JSON.stringify(place));
      } else {
        localStorage.removeItem("weather-selected-place");
      }
    },

    SET_WEATHER(state, weather) {
      state.weather = weather;

      if (weather) {
        localStorage.setItem("weather-data", JSON.stringify(weather));
      } else {
        localStorage.removeItem("weather-data");
      }
    },

    SET_LOADING(state, value) {
      state.loading = value;
    },

    SET_ERROR(state, error) {
      state.error = error;
    },

    SET_SEARCH_LOADING(state, value) {
      state.searchLoading = value;
    },

    SET_SEARCH_ERROR(state, error) {
      state.searchError = error;
    },

    SET_UNIT(state, unit) {
      state.unit = unit;
    },

    SET_FAVORITES(state, favorites) {
      state.favorites = favorites;
    },
  },

  actions: {
    async searchPlaces({ commit }, name) {
      const normalizedName = name.trim();

      if (normalizedName.length < 2) {
        commit(
          "SET_SEARCH_ERROR",
          "Escribe al menos dos caracteres para buscar un lugar.",
        );
        commit("SET_PLACES", []);
        return [];
      }

      commit("SET_SEARCH_LOADING", true);
      commit("SET_SEARCH_ERROR", null);
      commit("SET_PLACES", []);
      commit("SET_SELECTED_PLACE", null);
      commit("SET_WEATHER", null);
      commit("SET_ERROR", null);

      try {
        const results = await searchPlacesByName(normalizedName);

        const normalizedResults = results.map(normalizePlace);

        const chileResults = normalizedResults.filter((place) => {
          return place.countryCode === "CL";
        });

        const places =
          chileResults.length > 0 ? chileResults : normalizedResults;

        commit("SET_PLACES", places);

        if (places.length === 0) {
          commit("SET_SEARCH_ERROR", "No encontramos lugares con ese nombre.");
        }

        return places;
      } catch (error) {
        console.error("Error al buscar lugares:", error);

        commit("SET_PLACES", []);
        commit(
          "SET_SEARCH_ERROR",
          "No fue posible buscar lugares. Revisa tu conexión e inténtalo nuevamente.",
        );

        return [];
      } finally {
        commit("SET_SEARCH_LOADING", false);
      }
    },

    async loadWeather({ commit, state }, place) {
      if (!place?.latitude || !place?.longitude) {
        commit(
          "SET_ERROR",
          "El lugar seleccionado no tiene coordenadas válidas.",
        );
        return null;
      }

      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_SELECTED_PLACE", place);

      try {
        const apiData = await getWeatherForecast(
          place.latitude,
          place.longitude,
          state.unit,
        );

        const weather = normalizeWeather(apiData);

        commit("SET_WEATHER", weather);

        return weather;
      } catch (error) {
        console.error("Error al obtener el clima:", error);

        commit("SET_WEATHER", null);
        commit(
          "SET_ERROR",
          "No fue posible consultar el clima. Intenta nuevamente.",
        );

        return null;
      } finally {
        commit("SET_LOADING", false);
      }
    },
    setSelectedPlace({ commit }, place) {
      commit("SET_SELECTED_PLACE", place);
    },

    setPlaces({ commit }, places) {
      commit("SET_PLACES", places);
    },

    setWeather({ commit }, weather) {
      commit("SET_WEATHER", weather);
    },

    async changeUnit({ commit, state, dispatch }, unit) {
      if (!["celsius", "fahrenheit"].includes(unit)) {
        return;
      }

      commit("SET_UNIT", unit);
      localStorage.setItem("weather-unit", unit);

      if (state.selectedPlace) {
        await dispatch("loadWeather", state.selectedPlace);
      }
    },

    toggleFavorite({ commit, state }, place) {
      const alreadyFavorite = state.favorites.some(
        (favorite) => favorite.id === place.id,
      );

      const favorites = alreadyFavorite
        ? state.favorites.filter((favorite) => favorite.id !== place.id)
        : [...state.favorites, place];

      commit("SET_FAVORITES", favorites);

      localStorage.setItem("weather-favorites", JSON.stringify(favorites));
    },

    clearWeatherState({ commit }) {
      commit("SET_SELECTED_PLACE", null);
      commit("SET_WEATHER", null);
      commit("SET_ERROR", null);
    },
  },
});

export default store;
