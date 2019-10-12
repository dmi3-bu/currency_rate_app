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
      История:
      {exchangeRates.map((exchangeRate) => (
        <div key={exchangeRate.id}>
          {exchangeRate.rate} - {exchangeRate.validTill}
        </div>
      ))}
    </div>
  )
}

export default Admin
