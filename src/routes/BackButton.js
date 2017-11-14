import React, { Component } from 'react'
import * as Constants from '../Constants'

import qs from 'query-string'
import { NavLink } from 'react-router-dom'

class BackButton extends Component {
  render () {
    const { location = {} } = this.props
    const { pathname = '/' } = location
    const { duration = Constants.DEFAULT_DURATION } = qs.parse(location.search)
    const prevPath = pathname.replace(/\/[a-z0-9-_]+\/?$/, '/')
    console.log(prevPath)
    return (
      <div className="btn-group btn-group-sm" role="group">
        <NavLink className="btn btn-light" to={{
            pathname: prevPath,
            search: `?duration=${duration}`,
          }}>Tilbake</NavLink>
      </div>
    )
  }
}

export default BackButton
