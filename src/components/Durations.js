import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Durations extends Component {
  state = {
    durations: [{
      key: '24H',
      val: '1 dag',
    },{
      key: '48H',
      val: '2 dager',
    },{
      key: '7D',
      val: '1 uke',
    },{
      key: '14D',
      val: '2 uker',
    },{
      key: '30D',
      val: '1 måned',
    },{
      key: '6M',
      val: '6 måneder',
    },{
      key: '12M',
      val: '1 år',
    }],
  }
  render () {
    const { durations } = this.state
    const { duration, pathname } = this.props
    return (
      <div aria-label="Durations" className="btn-group btn-group-sm" role="group">
        {durations.map( ({key, val}) => (
          <Link className={key === duration ? 'btn btn-primary' : 'btn btn-secondary'} key={key} to={{
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
