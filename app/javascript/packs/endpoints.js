import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

export default class ExchangeRateEndpoint{
  static getExchangeRates() {
    const url = `api/exchange_rates/`
    return axios.get(url).then(response => camelizeKeys(response.data))
  }
  static createExchangeRate(data){
    const url = `api/exchange_rates/`
    return axios.post(url, decamelizeKeys(data))
  }
}
