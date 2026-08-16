import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlaceDetailView from '@/views/PlaceDetailView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Inicio'
      }
    },
    {
      path: '/lugar/:id',
      name: 'place-detail',
      component: PlaceDetailView,
      props: true,
      meta: {
        title: 'Detalle del lugar'
      }
    },
    {
      path: '/favoritos',
      name: 'favorites',
      component: FavoritesView,
      meta: {
        title: 'Favoritos'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: 'Página no encontrada'
      }
    }
  ]
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | Clima SPA`
})

export default router