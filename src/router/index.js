import Vue from 'vue'
import Router from 'vue-router'
import calendar from '@/components/calendar'
import store from '@/store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      meta: {requiresAuth: true},
      component: () => import('../views/Home')
    },
    {
      path: '/appointment',
      name: 'Appointment',
      component: calendar,
      meta: {requiresAuth: true}
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
      path: '/Animals',
      name: 'Animals',
      meta: {requiresAuth: true},
      component: () => import('../views/Animals')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.User.isUserLoggedIn) {
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
