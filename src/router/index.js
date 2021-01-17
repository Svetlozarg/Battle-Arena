import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Shop from '../views/Shop.vue'
import Dungeon from '../views/Dungeon.vue'
import Adventures from '../views/Adventures.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/shop',
    component: Shop
  },
  {
    path: '/dungeon',
    component: Dungeon
  },
  {
    path: '/adventures',
    component: Adventures
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
