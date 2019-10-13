import React, { useState, useEffect } from 'react'
import ExchangeRateEndpoint from './endpoints'
import AdminForm from './AdminForm'
import { camelizeKeys } from 'humps'

const Admin = () => {
  const [exchangeRates, setExchangeRates] = useState([])

  useEffect(() => {
    ExchangeRateEndpoint.getAdminExchangeRates().then((response) => {
      setExchangeRates(response.exchangeRates)
    })
  }, [])

  App.rates = App.cable.subscriptions.create({
    channel: 'AdminChannel',
  }, {
    received: (data) => {
      setExchangeRates(camelizeKeys(data).exchangeRates)
    }})

  return (
    <div>
      <AdminForm/>
      <hr/>
      История:
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Курс</th>
            <th scope="col">Активен до</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.reverse().map((exchangeRate) => (
            <tr key={exchangeRate.id}>
              <td>{exchangeRate.rate}</td>
              <td>{exchangeRate.validTill}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Admin
