<!-- Vista para que el usuario configure sus preferencias de clima (unidad y tema). -->
<template>
  <section class="preferences">
    <h1 class="preferences__title">Mis preferencias de clima</h1>

    <!-- Formulario simple con selección de unidad de temperatura y tema. -->
    <form class="preferences__form" @submit.prevent="handleSubmit">
      <!-- Selección de unidad de temperatura (°C / °F). -->
      <div class="card preferences__card">
        <label class="preferences__label" for="temperatureUnit">
          Unidad de temperatura
        </label>
        <select
          id="temperatureUnit"
          class="preferences__select"
          v-model="localTemperatureUnit"
        >
          <option value="C">Celsius (°C)</option>
          <option value="F">Fahrenheit (°F)</option>
        </select>
      </div>

      <!-- Selección de tema visual (claro / oscuro). -->
      <div class="card preferences__card">
        <label class="preferences__label" for="theme">
          Tema de la aplicación
        </label>
        <select id="theme" class="preferences__select" v-model="localTheme">
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </div>

      <!-- Mensaje de confirmación cuando se guardan las preferencias. -->
      <p v-if="hasSaved" class="preferences__saved">
        Preferencias guardadas correctamente.
      </p>

      <!-- Botón para guardar los cambios en Vuex. -->
      <button class="preferences__submit" type="submit">
        Guardar cambios
      </button>
    </form>
  </section>
</template>

<script>
// Importamos herramientas de Vue y Vuex para trabajar con estado global.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PreferencesView',

  setup() {
    const store = useStore()

    // Leemos las preferencias actuales del usuario desde el módulo 'auth'.
    const userPreferences = computed(
      () => store.getters['auth/userPreferences']
    )

    // Creamos refs locales para editar las preferencias sin modificar el store directamente.
    const localTemperatureUnit = ref(
      userPreferences.value.temperatureUnit || 'C'
    )
    const localTheme = ref(userPreferences.value.theme || 'light')

    // Flag para mostrar un mensaje de "guardado" después de enviar el formulario.
    const hasSaved = ref(false)

    // Función que envía las nuevas preferencias al store.
    const handleSubmit = () => {
      // Disparamos la acción 'updatePreferences' del módulo 'auth'.
      store.dispatch('auth/updatePreferences', {
        temperatureUnit: localTemperatureUnit.value,
        theme: localTheme.value,
      })

      // Marcamos que se ha guardado para mostrar el mensaje.
      hasSaved.value = true

      // Opcional: ocultar el mensaje después de unos segundos.
      setTimeout(() => {
        hasSaved.value = false
      }, 3000)
    }

    return {
      localTemperatureUnit,
      localTheme,
      hasSaved,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.preferences {
  max-width: 500px; /* Ancho máximo del contenedor de preferencias. */
  margin: 2rem auto; /* Centrado horizontal y separación vertical. */
  padding: 2rem; /* Espacio interno alrededor del formulario. */
  border-radius: 8px; /* Bordes redondeados. */
  background-color: #ffffff; /* Fondo blanco. */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Sombra suave. */
}

.preferences__title {
  margin-bottom: 1.5rem; /* Separación entre el título y el formulario. */
  text-align: center; /* Centra el título. */
  font-size: 1.5rem; /* Tamaño de fuente del título. */
}

.preferences__form {
  display: flex; /* Usamos flexbox para organizar los campos. */
  flex-direction: column; /* Apilamos los campos verticalmente. */
  gap: 1rem; /* Separación uniforme entre cada campo. */
}

.preferences__field {
  display: flex; /* Contenedor de etiqueta + select. */
  flex-direction: column; /* Organiza etiqueta y select en columna. */
}

.preferences__label {
  margin-bottom: 0.25rem; /* Separación entre la etiqueta y el select. */
  font-weight: 600; /* Hace la etiqueta más destacada. */
}

.preferences__select {
  padding: 0.5rem 0.75rem; /* Espacio interno del select. */
  border-radius: 4px; /* Bordes redondeados. */
  border: 1px solid #ccc; /* Borde gris claro por defecto. */
  font-size: 1rem; /* Tamaño de fuente estándar. */
}

.preferences__select:focus {
  outline: none; /* Eliminamos el outline por defecto. */
  border-color: #1976d2; /* Color del borde al enfocar. */
}

.preferences__saved {
  color: #16a34a; /* Color verde para indicar éxito. */
  font-size: 0.9rem; /* Tamaño de fuente ligeramente más pequeño. */
}

.preferences__submit {
  margin-top: 0.5rem; /* Separación entre los campos y el botón. */
  padding: 0.75rem; /* Espacio interno del botón. */
  border-radius: 4px; /* Bordes redondeados. */
  border: none; /* Sin borde por defecto. */
  background-color: #1976d2; /* Color principal del botón. */
  color: #ffffff; /* Texto blanco. */
  font-size: 1rem; /* Tamaño de fuente del botón. */
  cursor: pointer; /* Indica que el botón es clicable. */
}
</style>