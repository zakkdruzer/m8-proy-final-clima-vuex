// Store principal de Vuex, donde se registran los módulos globales de la aplicación.

import { createStore } from 'vuex'
// Importa aquí tu módulo de clima existente.
import auth from './modules/auth' // Importamos el módulo de autenticación recién creado.

export default createStore({
  // Aquí puedes mantener tu estado/mutations/actions globales del clima si ya los tenías.
  modules: {
    // Módulo que maneja el estado del usuario y autenticación.
    auth,
    // Otros módulos como 'clima' se agregan aquí.
  },
})