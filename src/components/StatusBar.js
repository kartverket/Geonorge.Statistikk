import React, { Component } from 'react'
import * as Constants from '../Constants'

import moment from 'moment'
import PropTypes from 'prop-types'

class StatusBar extends Component {
  render () {
    const { gte, lte, total } = this.props
    const gteFormatted = gte === '' ? '-' : moment(gte, Constants.DATE_INPUT).format(Constants.DATE_OUTPUT)
    const lteFormatted = lte === '' ? '-' : moment(lte, Constants.DATE_INPUT).format(Constants.DATE_OUTPUT)
    return (
      <ul className="list-inline mb-0">
        <li className="list-inline-item">
          <span className="text-muted small">Totalt:</span>
          &nbsp;
          <span>{total.toLocaleString()}</span>
        </li>
          <li className="list-inline-item">
          <span className="text-muted small">Fra:</span>
          &nbsp;
          <time dateTime={gte}>{gteFormatted}</time>
        </li>
          <li className="list-inline-item">
          <span className="text-muted small">Til:</span>
          &nbsp;
          <time dateTime={lte}>{lteFormatted}</time>
        </li>
      </ul>
    )
  }
}

StatusBar.propTypes = {
  gte: PropTypes.string.isRequired,
  lte: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
}

export default StatusBar
