import React, { useEffect, useState } from 'react'
import ExchangeRateEndpoint from "./endpoints";
// import 'src/css/cssindex.css'

const Home = () => {
  const [exchangeRate, setExchangeRate] = useState(null)

  useEffect(() => {
    // document.title = `Вы нажали ${count} раз`
    ExchangeRateEndpoint.getExchangeRates().then((response) => {
      setExchangeRate(response.exchangeRate)
    })
  }, [])
  return (
    <div>Курс: {exchangeRate ? exchangeRate.rate : ''}</div>
  )
}

export default Home
