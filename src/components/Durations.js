import React, { Component } from 'react'
import { DATE_DEFAULT } from '../Constants'

import moment from 'moment'
import PropTypes from 'prop-types'

class Durations extends Component {
  constructor () {
    super()
    const dayAlpha = moment()
    const dayOmega = moment().subtract(1, 'day')
    const monthAlpha = moment().date(1)
    const monthOmega = moment().date(monthAlpha.daysInMonth())
    const durations = [
      this.getDuration('today', 'I dag', dayAlpha, dayAlpha),
      this.getDuration('yesterday', 'I går', dayOmega, dayOmega),
      this.getDuration('days_seven', 'Siste 7 dager', dayOmega.subtract(6, 'days'), dayAlpha),
      this.getDuration('days_thirty', 'Siste 30 dager', dayOmega.subtract(23, 'days'), dayAlpha),
      this.getDuration('month_this', 'Denne måned', monthAlpha, monthOmega),
      this.getDuration('month_last', 'Forrige måned', monthAlpha.subtract(1, 'month'), monthOmega.subtract(1, 'month')),
    ]
    this.state = {
      durations: durations,
      expanded: false,
    }
  }
  componentWillReceiveProps () {
    const { expanded } = this.state
    if (expanded) {
      this.setState({
        expanded: false,
      })
    }
  }
  render () {
    const { end, start } = this.props
    const { durations, expanded } = this.state
    const selectedIndex = durations.map(duration => `${duration.start}_${duration.end}`).indexOf(`${start}_${end}`)
    const label = selectedIndex === -1 ? 'Egendefinert' : durations[selectedIndex].label
    return (
      <div className={expanded ? 'dropdown show' : 'dropdown'}>
        <button aria-expanded={expanded} className="btn btn-sm btn-outline-secondary dropdown-toggle" onClick={this.handleToggle.bind(this)} type="button">{label}</button>
        <div className={expanded ? 'dropdown-menu dropdown-menu-right show' : 'dropdown-menu dropdown-menu-right'}>
          {durations.map((duration, index) => (
            <button className={index === selectedIndex ? 'dropdown-item active' : 'dropdown-item'} key={duration.key} onClick={this.handleUpdate.bind(this, index)} type="button">{duration.label}</button>
          ), this)}
        </div>
      </div>
    )
  }
  getDuration (key, label, start, end) {
    return {
      end: end.format(DATE_DEFAULT),
      key: key,
      label: label,
      start: start.format(DATE_DEFAULT),
    }
  }
  handleToggle () {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded,
    })
  }
  handleUpdate (index) {
    const { durations } = this.state
    this.props.updateDates(durations[index].start, durations[index].end)
  }
}

Durations.propTypes = {
  end: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  updateDates: PropTypes.func.isRequired,
}

export default Durations
