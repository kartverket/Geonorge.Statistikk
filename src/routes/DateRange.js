import React, { Component } from 'react'
import * as Constants from '../Constants'

import qs from 'query-string'
import { NavLink } from 'react-router-dom'

class DateRange extends Component {
  
  render () {
    const { location = {} } = this.props
    const { pathname = '/' } = location
    const { duration = Constants.DEFAULT_DURATION } = qs.parse(location.search)
    const durations = [{
      key: '24H',
      name: 'Dag',
    },{
      key: '7D',
      name: 'Uke',
    },{
      key: '30D',
      name: 'Måned',
    },{
      key: '12M',
      name: 'År',
    }]
    return (
      <div className="btn-group btn-group-sm" role="group">
        {durations.map( ({key, name}) => (
          <NavLink className={key === duration ? 'btn btn-primary' : 'btn btn-light'} key={key} to={{
            pathname: pathname,
            search: `?duration=${key}`,
          }}>{name}</NavLink>
        ), this )}
      </div>
    )
  }
}

export default DateRange
