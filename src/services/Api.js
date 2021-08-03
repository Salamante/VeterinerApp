import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://89.252.140.69:99/`
  })
}
