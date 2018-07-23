import React, { Component } from 'react'
import * as Constants from '../Constants'

import moment from 'moment'
import PropTypes from 'prop-types'

import '../assets/css/tooltipdetail.css'

const FORMAT = {
  'H': 'D MMM YYYY, HH:mm',
  'D': 'D MMM YYYY',
  'M': 'MMM YYYY',
  'Y': 'YYYY',
}

class TooltipDetail extends Component {
  render () {
    const { label, payload:payloads = [], type } = this.props
    const dateObj = moment(label, Constants.DATE_INPUT, true)
    const dateStr = type in FORMAT ? dateObj.format(FORMAT[type]) : '-'
    const [ payload = {} ] = payloads
    const { value = 0 } = payload
    return (
      <div>
        <time dateTime={label}>{dateStr}</time> &mdash; <b>{value.toLocaleString()}</b>
      </div>
    )
  }
}

TooltipDetail.propTypes = {
  label: PropTypes.string,
  payload: PropTypes.array,
  type: PropTypes.string.isRequired,
}

TooltipDetail.defaultProps = {
  label: '',
  payload: [],
}

export default TooltipDetail
