import React, { useState } from 'react'
import ExchangeRateEndpoint from '../endpoints'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const AdminForm = () => {
  const [rate, setRate] = useState('')
  const [validTill, setValidTill] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    ExchangeRateEndpoint.createExchangeRate({ rate, validTill })
      .then(() => {
          setErrors({})
          setRate('')
          setValidTill('')
      }).catch((e) => setErrors(e.errors))
  }

  const handleRateChange = (e) => {
    setRate(e.target.value)
  }

  const handleValidTillChange = (date) => {
    setValidTill(date)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Курс:
          <input type="text"
                 className="form-control"
                 value={rate}
                 onChange={handleRateChange}/>
        </label>
        {errors.rate && <small className="form-text text-danger">{errors.rate}</small>}
      </div>
      <div className="form-group">
        <label>Активен до:</label>
        <DatePicker
          selected={validTill}
          onChange={handleValidTillChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={1}
          timeCaption="time"
          dateFormat="MMMM d, yyyy HH:mm"
        />
        {errors.validTill && <small className="form-text text-danger">{errors.validTill}</small>}
      </div>
      <input type="submit" className="btn btn-primary" value="Отправить"/>
    </form>
  )
}

export default AdminForm
