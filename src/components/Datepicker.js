import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import '../assets/css/datepicker.css'

const DATE_FORMAT = 'YYYY-MM-DD'

class Datepicker extends Component {
  render () {
    const { datetime } = this.props
    const year = parseInt(datetime.substr(0, 4), 10)
    const month = parseInt(datetime.substr(5, 2), 10)
    const day = parseInt(datetime.substr(8, 2), 10)
    
    const years = []
    for (let i = 2016, j = moment().year(); i <= j; i++) {
      years.push(i)
    }
    const months = moment.monthsShort()
    const days = []
    for (let i = 1, j = moment(datetime, DATE_FORMAT).daysInMonth(); i <= j; i++) {
      days.push(i)
    }
    
    return (
      <date className="datepicker" dateTime={datetime}>
        <select name="day" onChange={this.changeHandler.bind(this)} value={day}>
          { days.map( day => (<option key={day} value={day}>{day}</option>) )}
        </select>
        <select name="month" onChange={this.changeHandler.bind(this)} value={month}>
          { months.map( ( name, index ) => (<option key={index} value={index + 1}>{name}</option>) )}
        </select>
        <select name="year" onChange={this.changeHandler.bind(this)} value={year}>
          { years.map( year => (<option key={year} value={year}>{year}</option>) )}
        </select>
      </date>
    )
  }
  changeHandler (event) {
    const { datetime } = this.props
    const { name, value } = event.target
    let year = parseInt((name === 'year' ? value : datetime.substr(0, 4)), 10)
    let month = parseInt((name === 'month' ? value : datetime.substr(5, 2)), 10)
    let day = parseInt((name === 'day' ? value : datetime.substr(8, 2)), 10)
    const total = moment({
      year: year,
      month: month - 1
    }).daysInMonth()
    if (day > total) {
      day = total
    }
    const str = `${year}-${this.zeroPad(month)}-${this.zeroPad(day)}`
    this.props.onChange(str)
  }
  zeroPad = value => parseInt(value, 10) < 10 ? `0${value}` : value
}

Datepicker.propTypes = {
  datetime: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Datepicker
