import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: async (to, from) => {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          return { path: '/login' }
        }
        else {
          return { path: "/profile" }
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../pages/profile.vue'),
      meta: { 
        requiresAuth: true 
      }
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { path: '/login' }
    }
  }
})

export default router
