import React, { useState } from 'react'
import { createExchangeRate } from '../endpoints'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ru from 'date-fns/locale/ru'

registerLocale('ru', ru)

const AdminForm = () => {
  const [rate, setRate] = useState('')
  const [validTill, setValidTill] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    createExchangeRate({ rate, validTill })
      .then(() => {
          setErrors({})
          setRate('')
          setValidTill('')
      }).catch((e) => { setErrors(e.errors || {})})
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
          locale="ru"
          selected={validTill}
          onChange={handleValidTillChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={1}
          timeCaption="время"
          dateFormat="MMMM d, yyyy HH:mm"
        />
        {errors.validTill && <small className="form-text text-danger">{errors.validTill}</small>}
      </div>
      <input type="submit" className="btn btn-primary" value="Отправить"/>
    </form>
  )
}

export default AdminForm
