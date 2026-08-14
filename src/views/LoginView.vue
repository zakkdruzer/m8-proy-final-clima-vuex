<!-- Vista responsable de mostrar el formulario de inicio de sesión y gestionar el flujo de login. -->
<template>
  <section class="login">
    <!-- Contenedor principal del formulario de login. -->
    <h1 class="login__title">Iniciar sesión</h1>

    <!-- Formulario de login: captura email y contraseña. -->
    <form class="card login__form" @submit.prevent="handleSubmit">
      <!-- Campo de correo electrónico del usuario. -->
      <div class="login__field">
        <label class="login__label" for="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          class="login__input"
          v-model="email"
          required
          placeholder="demo@climaapp.com"
        />
      </div>

      <!-- Campo de contraseña del usuario. -->
      <div class="login__field">
        <label class="login__label" for="password">Contraseña</label>
        <input
          id="password"
          type="password"
          class="login__input"
          v-model="password"
          required
          placeholder="Ingresa tu contraseña"
        />
      </div>

      <!-- Mensaje de error proveniente del store de Vuex (auth.loginError). -->
      <p v-if="loginError" class="login__error">
        {{ loginError }}
      </p>

      <!-- Botón para enviar el formulario y disparar el flujo de login. -->
      <button class="login__submit" type="submit">
        Entrar
      </button>
    </form>
  </section>
</template>

<script>
// Importamos herramientas de Vue y Vuex para conectar la vista al store.
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  // Nombre de la vista, útil para depuración y navegación programática.
  name: 'LoginView',

  setup() {
    // Accedemos al store de Vuex para usar el módulo 'auth'.
    const store = useStore()
    // Accedemos al router para redirigir después del login exitoso.
    const router = useRouter()

    // Campos reactivos para los valores del formulario.
    const email = ref('') // Correo electrónico ingresado por el usuario.
    const password = ref('') // Contraseña ingresada por el usuario.

    // Computed que lee el mensaje de error de login desde el módulo 'auth' de Vuex.
    const loginError = computed(() => store.getters['auth/loginError'])

    // Función que maneja el envío del formulario.
    const handleSubmit = async () => {
      // Disparamos la acción 'login' del módulo 'auth', pasando email y password.
      const success = await store.dispatch('auth/login', {
        email: email.value,
        password: password.value,
      })

      if (success) {
        // Si el login fue exitoso, redirigimos al Home (ruta principal).
        router.push({ name: 'home' })
      } else {
        // Si falló, el store ya habrá actualizado loginError, que se muestra en pantalla.
        // Aquí podríamos agregar lógica adicional, como limpiar el campo de contraseña.
        password.value = ''
      }
    }

    // Exponemos al template las variables y funciones que se usarán.
    return {
      email,
      password,
      loginError,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
/* Estilos básicos para la vista de login; puedes ajustarlos o migrarlos a SCSS. */

.login {
  max-width: 400px; /* Ancho máximo del contenedor para centrar el formulario. */
  margin: 2rem auto; /* Centrado horizontal y separación vertical. */
  padding: 2rem; /* Espacio interno alrededor del contenido. */
  border-radius: 8px; /* Bordes redondeados para un aspecto más amigable. */
  background-color: #ffffff; /* Fondo blanco por defecto. */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para destacar el formulario. */
}

.login__title {
  margin-bottom: 1.5rem; /* Separación entre el título y el formulario. */
  text-align: center; /* Centra el texto del título. */
  font-size: 1.5rem; /* Tamaño de fuente del título. */
}

.login__form {
  display: flex; /* Usamos flexbox para organizar los campos en columna. */
  flex-direction: column; /* Los elementos se apilan verticalmente. */
  gap: 1rem; /* Separación uniforme entre cada campo. */
}

.login__field {
  display: flex; /* Contenedor de etiqueta + input. */
  flex-direction: column; /* Organiza etiqueta y input en columna. */
}

.login__label {
  margin-bottom: 0.25rem; /* Separación entre la etiqueta y el input. */
  font-weight: 600; /* Hace la etiqueta ligeramente más gruesa. */
}

.login__input {
  padding: 0.5rem 0.75rem; /* Espacio interno del input para hacerlo cómodo de usar. */
  border-radius: 4px; /* Bordes redondeados del input. */
  border: 1px solid #ccc; /* Borde gris claro por defecto. */
  font-size: 1rem; /* Tamaño de fuente estándar. */
}

.login__input:focus {
  outline: none; /* Eliminamos el outline por defecto del navegador. */
  border-color: #1976d2; /* Color del borde al enfocar el input. */
}

.login__error {
  color: #d32f2f; /* Color rojo para indicar error. */
  font-size: 0.9rem; /* Tamaño de fuente ligeramente más pequeño. */
}

.login__submit {
  padding: 0.75rem; /* Espacio interno del botón. */
  border-radius: 4px; /* Bordes redondeados del botón. */
  border: none; /* Sin borde por defecto. */
  background-color: #1976d2; /* Color principal del botón. */
  color: #ffffff; /* Texto blanco sobre el botón. */
  font-size: 1rem; /* Tamaño de fuente del botón. */
  cursor: pointer; /* Indica que el botón es clicable. */
}

.login__submit:hover {
  background-color: #115293; /* Color ligeramente más oscuro al pasar el mouse. */
}
</style>