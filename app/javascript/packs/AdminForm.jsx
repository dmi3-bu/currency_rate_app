import React, { useState } from 'react'
import ExchangeRateEndpoint from './endpoints'

const AdminForm = () => {
  const [rate, setRate] = useState('')
  const [validTill, setValidTill] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    ExchangeRateEndpoint.createExchangeRate({ rate, validTill })
      .then((response) => {
        response.errors
      })
  }

  const handleRateChange = (e) => {
    setRate(e.target.value)
  }

  const handleValidTillChange = (e) => {
    setValidTill(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Курс:
        <input type="text" value={rate} onChange={handleRateChange}/>
      </label>
      <label>Активен до:
        <input type="datetime-local" value={validTill} onChange={handleValidTillChange}/>
      </label>
      <input type="submit" value="Отправить"/>
    </form>
  )
}

export default AdminForm
