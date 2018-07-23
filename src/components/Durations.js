import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Durations extends Component {
  state = {
    durations: [{
      key: 'PT24H',
      val: '1 dag',
    },{
      key: 'PT48H',
      val: '2 dager',
    },{
      key: 'P7D',
      val: '1 uke',
    },{
      key: 'P14D',
      val: '2 uker',
    },{
      key: 'P30D',
      val: '1 måned',
    },{
      key: 'P6M',
      val: '6 måneder',
    },{
      key: 'P12M',
      val: '1 år',
    }],
  }
  render () {
    const { durations } = this.state
    const { duration, pathname } = this.props
    return (
      <div className="mb-1">
        {durations.map( ({key, val}) => (
          <Link className={`badge badge-${key === duration ? 'primary' : 'light'} rounded-0`} key={key} to={{
            pathname: pathname,
            search: `duration=${key}`,
          }}>{val}</Link>
        ), this)}
      </div>
    )
  }
}

Durations.propTypes = {
  duration: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
}

export default Durations
