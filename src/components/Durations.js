import * as Constants from '../Constants'

import React, { Component } from 'react'

import qs from 'query-string'
import { NavLink } from 'react-router-dom'

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
    const { location = {} } = this.props
    const { pathname = '/', search = '' } = location
    const { durations } = this.state
    const params = qs.parse(search)
    const { duration : selected = Constants.DEFAULT_DURATION } = params
    return (
      <div aria-label="Durations" className="btn-group btn-group-sm" role="group">
        {durations.map( duration => (
          <NavLink className={duration.key === selected ? 'btn btn-primary' : 'btn btn-secondary'} key={duration.key} to={{ pathname: pathname, search: `duration=${duration.key}` }}>{duration.val}</NavLink>
        ), this)}
      </div>
    )
  }
}

export default Durations
