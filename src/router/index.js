import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      alias: '/',
      name: 'Home',
      meta: {requiresAuth: true},
      component: () => import('../views/Home')
    },
    {
      path: '/appointment',
      name: 'Appointments',
      meta: {requiresAuth: true},
      component: () => import('../views/Appointments')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {requiresAuth: true},
      component: () => import('../views/Profile')
    },
    {
      path: '/customers',
      name: 'Customers',
      meta: {requiresAuth: true},
      component: () => import('../views/Customers')
    },
    {
      path: '/animals',
      name: 'Animals',
      meta: {requiresAuth: true},
      component: () => import('../views/Animals')
    },
    {
      path: '/products',
      name: 'Products',
      meta: {requiresAuth: true},
      component: () => import('../views/Products')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.isUserLoggedIn) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
