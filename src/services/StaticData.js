import CommonService from '@/services/CommonService'
import store from '@/store/store'

export default {
  async  getUnits () {
    var response = (await CommonService.getUnits()).data
    store.dispatch('setUnits', response)
    return response
  }
}
