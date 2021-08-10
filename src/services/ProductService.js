import Api from '@/services/Api'

export default {
  getAllProducts () {
    const token = localStorage.getItem('accessToken')
    return Api().get('/api/products/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  createProduct (product) {
    const token = localStorage.getItem('accessToken')
    return Api().post('/api/products', product, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getProduct (id) {
    const token = localStorage.getItem('accessToken')
    return Api().get(`/api/products/${id}`, {
      'Authorization': `Bearer ${token}`
    })
  },
  patchProduct (id) {
    const token = localStorage.getItem('accessToken')
    return Api().patch(`/api/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  deleteProduct (id) {
    const token = localStorage.getItem('accessToken')
    return Api().delete(`/api/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
