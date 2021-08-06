import Api from '@/services/Api'

export default {
  // Axios kullanarak HTTP ye request yolluyoruz bu functionlarla. Bunları Login.vue da kullandık.
  register (credentials) {
    return Api().post('api/users/', credentials)
  },
  login (credentials) {
    return Api().post('api/jwt/create/', credentials)
  },
  getUserProfile () {
    const token = localStorage.getItem('accessToken')
    return Api().get('api/profile/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  },
  changeUserName (nameToChange) {
    const token = localStorage.getItem('accessToken')
    return Api().patch('api/profile/',
      {
        name: nameToChange
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
  },
  changePassword (oldPass, newPass) {
    const token = localStorage.getItem('accessToken')
    return Api().post('api/users/set_password/',
      {
        current_password: oldPass,
        new_password: newPass
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
  }
}
