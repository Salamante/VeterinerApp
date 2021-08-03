import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Customers from '@/components/Customers'
import calendar from '@/components/calendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers
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
    }
  ]
})
