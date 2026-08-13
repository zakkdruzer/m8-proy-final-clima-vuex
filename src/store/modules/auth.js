// Módulo de Vuex encargado de manejar la autenticación y los datos básicos del usuario.

const mockUsers = [
  // Usuario de ejemplo para simular el login en el front.
  {
    id: 1,
    name: 'Usuario Demo',          // Nombre que se mostrará en la interfaz.
    email: 'demo@climaapp.com',    // Correo para login.
    password: '123456',            // Contraseña simulada (solo para entorno educativo).
    preferences: {
      // Preferencias mínimas: puedes extender esto más adelante.
      temperatureUnit: 'C',        // Unidad de temperatura preferida: 'C' o 'F'.
      theme: 'light',              // Tema visual: 'light' o 'dark'.
    },
    favorites: [
      // Ejemplo de ids de lugares favoritos (coinciden con los ids de tus lugares).
      'santiago',
      'valparaiso',
    ],
  },
]

export default {
  // Usamos namespaced para evitar colisiones de nombres con otros módulos (como clima).
  namespaced: true,

  // Estado inicial del módulo de autenticación.
  state: () => ({
    user: null,           // Objeto con los datos del usuario logueado, o null si no hay sesión.
    isAuthenticated: false, // Flag que indica si hay sesión activa.
    loginError: null,     // Mensaje de error de login para mostrar en la vista.
  }),

  // Mutations: responsables de modificar el estado de forma síncrona.
  mutations: {
    // Guarda los datos del usuario y marca la sesión como autenticada.
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    },

    // Limpia el usuario y marca la sesión como no autenticada.
    LOGOUT(state) {
      state.user = null
      state.isAuthenticated = false
    },

    // Actualiza las preferencias del usuario (ej.: unidad y tema).
    UPDATE_PREFERENCES(state, newPreferences) {
      if (!state.user) return
      state.user = {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          ...newPreferences, // Mezcla las preferencias existentes con las nuevas.
        },
      }
    },

    // Define un mensaje de error de login para mostrar en la interfaz.
    SET_LOGIN_ERROR(state, message) {
      state.loginError = message
    },
  },

  // Actions: se usan para lógica asíncrona o más compleja (ej.: llamadas a API).
  actions: {
    // Acción de login simulando la verificación de credenciales en el front.
    login({ commit }, { email, password }) {
      // Limpia error previo, si existiera.
      commit('SET_LOGIN_ERROR', null)

      // Busca un usuario en nuestro arreglo de usuarios fake.
      const foundUser = mockUsers.find(
        (user) => user.email === email && user.password === password
      )

      if (foundUser) {
        // Si las credenciales son correctas, guardamos el usuario (sin la password).
        const { password: _omit, ...userWithoutPassword } = foundUser

        commit('SET_USER', userWithoutPassword)
        return true // Indicamos éxito para que la vista pueda redirigir.
      } else {
        // Si las credenciales no coinciden, definimos un mensaje de error.
        commit('SET_LOGIN_ERROR', 'Usuario o contraseña incorrectos')
        commit('SET_USER', null)
        return false // Indicamos fracaso para que la vista muestre mensaje.
      }
    },

    // Acción para cerrar sesión.
    logout({ commit }) {
      // Simplemente limpiamos el estado de usuario.
      commit('LOGOUT')
    },

    // Acción para actualizar preferencias del usuario desde cualquier componente.
    updatePreferences({ commit }, newPreferences) {
      // Delegamos en la mutation correspondiente.
      commit('UPDATE_PREFERENCES', newPreferences)
    },
  },

  // Getters opcionales para simplificar el acceso a partes del estado.
  getters: {
    // Devuelve true si hay un usuario logueado.
    isLoggedIn(state) {
      return state.isAuthenticated
    },

    // Devuelve el nombre del usuario logueado (o string vacío si no hay sesión).
    userName(state) {
      return state.user?.name || ''
    },

    // Devuelve las preferencias actuales del usuario (o un objeto vacío).
    userPreferences(state) {
      return state.user?.preferences || {}
    },

    // Devuelve la lista de lugares favoritos del usuario.
    userFavorites(state) {
      return state.user?.favorites || []
    },

    // Devuelve el mensaje de error de login, si existe.
    loginError(state) {
      return state.loginError
    },
  },
}