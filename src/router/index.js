import Vue from 'vue'
import Router from 'vue-router'
import calendar from '@/components/calendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home')
    },
    {
      path: '/appointment',
      name: 'Appointment',
      component: calendar
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
      component: () => import('../views/Profile')
    },
    {
      path: '/customers',
      name: 'Customers',
      component: () => import('../views/Customers')
    },
    {
      path: '/Animals',
      name: 'Animals',
      component: () => import('../views/Animals')
    }
  ]
})
