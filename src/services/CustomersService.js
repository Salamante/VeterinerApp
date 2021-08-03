import Api from '@/services/Api'

export default {
  index () {
    return Api().get('customers_table')
  },
  post (customer) {
    return Api().post('customers_table', customer)
  }
}
