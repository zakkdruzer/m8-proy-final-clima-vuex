import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css' // Aquí puedes conectar tus estilos antiguos

const app = createApp(App)

// Registramos el router para tener navegación sin recargar la página
app.use(router)

app.mount('#app')