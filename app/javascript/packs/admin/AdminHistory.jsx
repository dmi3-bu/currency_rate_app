import React, { useState, useEffect } from 'react'
import { camelizeKeys } from 'humps'
import ExchangeRateEndpoint from "../endpoints"

const AdminHistory = () => {
  const [exchangeRates, setExchangeRates] = useState([])

  useEffect(() => {
    ExchangeRateEndpoint.getAdminExchangeRates().then((response) => {
      setExchangeRates(response.exchangeRates)
    })
  }, [])

  const convertDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString()
  }

  App.rates = App.cable.subscriptions.create({
    channel: 'AdminChannel',
  }, {
    received: (data) => {
      setExchangeRates(camelizeKeys(data).exchangeRates)
    }})

  return (
    <React.Fragment>
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
              <td>{convertDateTime(exchangeRate.validTill)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default AdminHistory
