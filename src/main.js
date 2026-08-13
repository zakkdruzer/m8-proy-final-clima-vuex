// Punto de entrada de la aplicación Vue: aquí se montan router y store.

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa la configuración de rutas.
import store from './store'   // Importa el store de Vuex (index.js de tu carpeta store).

const app = createApp(App) // Crea la instancia principal de la aplicación.

app.use(router) // Registra el router para habilitar la navegación entre vistas.
app.use(store)  // Registra el store de Vuex para manejar el estado global (incluye el módulo auth).

app.mount('#app') // Monta la aplicación en el elemento raíz del index.html.