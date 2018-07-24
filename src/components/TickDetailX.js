import React, { Component } from 'react'
import {DATE_INPUT} from '../Constants'

import moment from 'moment'

const UPPER_FORMAT = {
  'H': 'HH:mm',
  'D': 'D',
  'M': 'MMM',
  'Y': 'YYYY',
}
const LOWER_FORMAT = {
  'H': 'D MMM YY',
  'D': 'MMM YY',
  'M': 'YYYY',
  'Y': '[-]',
}

class TickDetailX extends Component {
  render () {
    const {includes, index, payload, type, x, y} = this.props
    if (includes.indexOf(index) === -1) {
      return null
    }
    const { value } = payload
    const datetime = moment(value, DATE_INPUT, true)
    const upperValue = type in UPPER_FORMAT ? datetime.format(UPPER_FORMAT[type]) : '-'
    const lowerValue = type in LOWER_FORMAT ? datetime.format(LOWER_FORMAT[type]) : '-'
    return (
      <g transform={`translate(${x},${y})`}>
        <text alignmentBaseline="baseline" x={0} y={0} dy={14} textAnchor="middle" fill="#000" fontSize={16}>{upperValue}</text>
        <text alignmentBaseline="hanging" x={0} y={0} dy={16} textAnchor="middle" fill="#555" fontSize={14}>{lowerValue}</text>
      </g>
    )
  }
}

export default TickDetailX
