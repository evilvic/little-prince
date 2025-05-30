import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from './store'
import HomeView from './HomeView.vue'
import AuthView from './AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const store = useStore()
  await store.getUser()
  if (to.path === '/auth' && store.user) {
    next('/')
  } else if (to.path !== '/auth' && !store.user) {
    next('/auth')
  } else {
    next()
  }
})

export default router
