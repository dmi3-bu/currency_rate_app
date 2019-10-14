import React, { useEffect, useState } from 'react'
import { getExchangeRates } from './endpoints'
import { camelizeKeys } from 'humps'

const Home = () => {
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    getExchangeRates().then((response) => {
      setExchangeRate(response.exchangeRates[0])
    })
  }, [])

  App.rates = App.cable.subscriptions.create({
      channel: 'RatesChannel',
    }, {
      received: (data) => {
        setExchangeRate(camelizeKeys(data).exchangeRates[0])
  }})

  return (
    <h1 className="display-4 text-center">
      Курс USD/RUB: {exchangeRate ? exchangeRate.rate : ''}
    </h1>
  )
}

export default Home
