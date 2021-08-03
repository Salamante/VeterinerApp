import Api from '@/services/Api'

export default {
  // Axios kullanarak HTTP ye request yolluyoruz bu functionlarla. Bunları Login.vue da kullandık.
  register (credentials) {
    return Api().post('api/users/', credentials)
  },
  login (credentials) {
    return Api().post('api/jwt/create/', credentials)
  },
  getUserProfile (credentials) {
    return Api().get('api/profile', {
      headers: {
        'Authorization': `Bearer ${credentials}`
      }
    })
  }
}
