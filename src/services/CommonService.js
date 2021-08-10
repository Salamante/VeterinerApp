import Api from '@/services/Api'

export default {
  getCities () {
    const token = localStorage.getItem('accessToken')
    return Api().get('/api/cities/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getDistricts () {
    const token = localStorage.getItem('accessToken')
    return Api().get('/api/districts/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getColors () {
    const token = localStorage.getItem('accessToken')
    return Api().get('/api/colors/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getSpecies () {
    const token = localStorage.getItem('accessToken')
    return Api().get('/api/species/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getProductTypes () {
    const token = localStorage.getItem('accessToken')
    return Api().get('/api/product-types/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getUnits () {
    const token = localStorage.getItem('accessToken')
    return Api().get('/api/units/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
