// src/store/index.js
// Store principal de Vuex donde se registran los módulos globales de la app.

import { createStore } from 'vuex'
import auth from './modules/auth' // Importa el módulo de autenticación que creamos.

// Puedes importar aquí otros módulos relacionados con el clima si ya existen.

const store = createStore({
  modules: {
    // Módulo encargado del estado del usuario y autenticación.
    auth,
    // Otros módulos (por ejemplo, 'clima') se agregan aquí.
  },
})

export default store // Exporta el store para usarlo en main.js.