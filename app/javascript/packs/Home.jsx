import React, { useEffect, useState } from 'react'
import ExchangeRateEndpoint from './endpoints'

const Home = () => {
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    ExchangeRateEndpoint.getExchangeRates().then((response) => {
      setExchangeRate(response.exchangeRates[0])
    })
  }, [])
  return (
    <div>Курс: {exchangeRate ? exchangeRate.rate : ''}</div>
  )
}

export default Home
