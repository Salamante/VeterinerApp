import Api from '@/services/Api'

export default {
  getAllAppointments () {
    const token = localStorage.getItem('accessToken')
    return Api().get('/api/appointments/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  createAppointment (appointment) {
    const token = localStorage.getItem('accessToken')
    return Api().post('/api/appointments/', appointment, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  getAppointment (id) {
    const token = localStorage.getItem('accessToken')
    return Api().get(`/api/appointments/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  patchAppointment (id) {
    const token = localStorage.getItem('accessToken')
    return Api().patch(`/api/appointments/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  deleteAppointment (id) {
    const token = localStorage.getItem('accessToken')
    return Api().delete(`/api/appointments/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
