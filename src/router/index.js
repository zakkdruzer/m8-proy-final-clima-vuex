import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlaceDetailView from '../views/PlaceDetailView.vue'

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router