import React, { useState, useEffect } from 'react'
import ExchangeRateEndpoint from './endpoints'
import AdminForm from './AdminForm'

const Admin = () => {
  const [exchangeRates, setExchangeRates] = useState([])

  useEffect(() => {
    ExchangeRateEndpoint.getAdminExchangeRates().then((response) => {
      setExchangeRates(response.exchangeRates)
    })
  }, [])

  return (
    <div>
      <AdminForm/>
      {exchangeRates.map((exchangeRate) => (
        <div key={exchangeRate.id}>
          {exchangeRate.rate} - {exchangeRate.validTill}
        </div>
      ))}
    </div>
  )
}

export default Admin
