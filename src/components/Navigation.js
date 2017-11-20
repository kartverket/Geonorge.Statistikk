import React, { Component } from 'react'
import * as Constants from '../Constants'

import qs from 'query-string'
import { NavLink } from 'react-router-dom'

import '../assets/css/navigation.css'

class Navigation extends Component {
  render () {
    const { location = {} } = this.props
    const { duration = Constants.DEFAULT_DURATION } = qs.parse(location.search)
    const search = `?duration=${duration}`
    return (
      <nav className="navigation mb-3">
        <div className="container">
          <NavLink activeClassName="active" className="navigation-item" exact to="/">Hjem</NavLink>
          <NavLink activeClassName="active" className="navigation-item" to={{ pathname: '/nedlastinger/', search: search }}>Nedlastinger</NavLink>
          <NavLink activeClassName="active" className="navigation-item" to={{ pathname: '/tjenester/', search: search }}>Tjenester</NavLink>
        </div>
      </nav>
    )
  }
}

export default Navigation
