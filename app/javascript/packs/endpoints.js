import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

const csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content')
axios.defaults.headers.post['X-CSRF-Token'] = csrfToken
axios.defaults.headers.post['Content-Type'] = 'application/json'

const getExchangeRates = () => {
  const url = `api/exchange_rates`
  return axios.get(url).then(response => camelizeKeys(response.data))
}
const createExchangeRate = (data) => {
  const url = `api/exchange_rates`
  return axios.post(url, decamelizeKeys(data))
    .then(response => camelizeKeys(response.data))
    .catch(e => { throw camelizeKeys(e.response.data) })
}
const getAdminExchangeRates = () => {
  const url = `api/exchange_rates?admin=true`
  return axios.get(url).then(response => camelizeKeys(response.data))
}

export {
  getExchangeRates,
  createExchangeRate,
  getAdminExchangeRates
}
