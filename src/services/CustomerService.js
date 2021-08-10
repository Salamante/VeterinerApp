import Api from '@/services/Api'

export default {
  getAllCustomers () {
    const token = localStorage.getItem('accessToken')
    return Api().get('/api/customers/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  createCustomer (customer) {
    const token = localStorage.getItem('accessToken')
    return Api().post('/api/customers', customer, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getCustomer (id) {
    const token = localStorage.getItem('accessToken')
    return Api().get(`/api/customers/${id}`, {
      'Authorization': `Bearer ${token}`
    })
  },
  patchCustomer (id) {
    const token = localStorage.getItem('accessToken')
    return Api().patch(`/api/customers/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  deleteCustomer (id) {
    const token = localStorage.getItem('accessToken')
    return Api().delete(`/api/customers/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getCustomerAnimals (id) {
    const token = localStorage.getItem('accessToken')
    return Api().get(`/api/customers/${id}/animals`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
