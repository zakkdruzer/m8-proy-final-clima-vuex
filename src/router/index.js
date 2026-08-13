// Configuración de rutas y protección básica según estado de autenticación.

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlaceDetailView from '../views/PlaceDetailView.vue'
import LoginView from '../views/LoginView.vue'
import FavoritesView from '../views/FavoritesView.vue' // Nueva vista para lugares favoritos.
import store from '../store' // Importamos el store para consultar el estado de auth.

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/place/:id',
    name: 'place-detail',
    component: PlaceDetailView,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/favoritos',
    name: 'favorites',
    component: FavoritesView,
    meta: {
      // Indicamos que esta ruta requiere que el usuario esté autenticado.
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Guard global: se ejecuta antes de cada navegación.
router.beforeEach((to, from, next) => {
  // Verificamos si la ruta destino requiere autenticación.
  const requiresAuth = to.meta.requiresAuth

  // Obtenemos el flag de sesión desde Vuex usando el getter 'auth/isLoggedIn'.
  const isLoggedIn = store.getters['auth/isLoggedIn']

  if (requiresAuth && !isLoggedIn) {
    // Si la ruta es privada y el usuario no está logueado, redirigimos a /login.
    next({ name: 'login' })
  } else {
    // En cualquier otro caso, permitimos la navegación.
    next()
  }
})

export default router