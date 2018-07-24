import React, { Component } from 'react'
import { DATE_DEFAULT, DATE_READABLE } from '../Constants'

import moment from 'moment'
import 'moment/locale/nb'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

class Daterange extends Component {
  constructor (props) {
    super(props)
    const { end, start } = props
    this.state = {
      end: end,
      start: start,
    }
  }
  componentWillReceiveProps (nextProps) {
    const { end:prevEnd, start:prevStart } = this.props
    const { end:nextEnd, start:nextStart } = nextProps
    if (prevStart !== nextStart || prevEnd !== nextEnd) {
      this.setState({
        end: nextEnd,
        start: nextStart,
      })
    }
  }
  render () {
    const { end:selectedEnd, start:selectedStart } = this.props
    const { end:chosenEnd, start:chosenStart } = this.state
    const startDate = moment(chosenStart, DATE_DEFAULT, true)
    const endDate = moment(chosenEnd, DATE_DEFAULT, true)
    const isDisabled = chosenStart === selectedStart && chosenEnd === selectedEnd ? true : false
    return (
      <div className="d-flex align-items-center">
        <small className="mr-2">Viser</small>
        <DatePicker className="form-control form-control-sm text-center" dateFormat={DATE_READABLE} maxDate={endDate} onChange={this.updateStart.bind(this)} selected={startDate} showWeekNumbers />
        <small className="mx-2">til</small>
        <DatePicker className="form-control form-control-sm text-center" dateFormat={DATE_READABLE} minDate={startDate} onChange={this.updateEnd.bind(this)} selected={endDate} showWeekNumbers />
        <div className={isDisabled ? 'd-none' : 'btn-group btn-group-sm ml-2'} role="group">
          <button className="btn btn-success" disabled={isDisabled} onClick={this.handleUpdate.bind(this)} type="button">Oppdater</button>
          <button className="btn btn-danger" disabled={isDisabled} onClick={this.handleAbort.bind(this)} type="button">Avbryt</button>
        </div>
      </div>
    )
  }
  handleAbort () {
    const { end, start } = this.props
    this.setState({
      end: end,
      start: start,
    })
  }
  handleUpdate () {
    const { end, start } = this.state
    this.props.updateDates(start, end)
  }
  updateEnd (date) {
    this.setState({
      end: date.format(DATE_DEFAULT),
    })
  }
  updateStart (date) {
    this.setState({
      start: date.format(DATE_DEFAULT),
    })
  }
}

Daterange.propTypes = {
  end: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  updateDates: PropTypes.func.isRequired,
}

export default Daterange
