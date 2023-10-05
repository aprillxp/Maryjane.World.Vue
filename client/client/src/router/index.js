import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DetailPage from '../views/DetailPage.vue'
import FavoritesPage from '../views/FavoritesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPage
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token

  if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    next({ name: 'home' })
  } else if (!isAuthenticated && to.path === '/favorites') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
