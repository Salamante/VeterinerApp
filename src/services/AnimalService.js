import Api from '@/services/Api'

export default {
  getAllAnimals () {
    const token = localStorage.getItem('accessToken')
    return Api().get('/api/animals/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  createAnimal (animal) {
    const token = localStorage.getItem('accessToken')
    return Api().post('/api/animals/', animal, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getAnimal (id) {
    const token = localStorage.getItem('accessToken')
    return Api().get(`/api/animals/${id}`, {
      'Authorization': `Bearer ${token}`
    })
  },
  patchAnimal (id) {
    const token = localStorage.getItem('accessToken')
    return Api().patch(`/api/animals/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  deleteAnimal (id) {
    const token = localStorage.getItem('accessToken')
    return Api().delete(`/api/animals/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getAnimalAppointments (id) {
    const token = localStorage.getItem('accessToken')
    return Api().get(`/api/animals/${id}/appointments`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
