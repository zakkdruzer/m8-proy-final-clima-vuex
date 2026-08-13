// Configuración de las rutas principales de la aplicación.

import { createRouter, createWebHashHistory } from 'vue-router'
// Importamos las vistas que ya existen en tu proyecto.
import HomeView from '../views/HomeView.vue'
import PlaceDetailView from '../views/PlaceDetailView.vue'
// Importamos la nueva vista de Login.
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView, // Vista principal que muestra la lista de lugares y clima actual.
  },
  {
    path: '/place/:id',
    name: 'place-detail',
    component: PlaceDetailView, // Vista que muestra el detalle del clima de un lugar.
    props: true, // Permite recibir el parámetro :id como prop en el componente.
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView, // Nueva vista para el formulario de inicio de sesión.
  },
  // Más rutas se pueden agregar aquí (por ejemplo, /favoritos o /perfil).
]

const router = createRouter({
  history: createWebHashHistory(), // Se usa hash mode para compatibilidad con GitHub Pages.
  routes, // Registro del arreglo de rutas definido arriba.
})

export default router