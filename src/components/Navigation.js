import React, { Component } from 'react'

import qs from 'query-string'
import { NavLink } from 'react-router-dom'

import '../assets/css/navigation.css'

class Navigation extends Component {
  render () {
    const params = qs.parse(this.props.location.search)
    const { duration } = params
    const search = qs.stringify({
      duration: duration,
    })
    return (
      <nav className="navigation">
        <div className="container">
          <NavLink activeClassName="active" className="navigation-item" exact to="/">Hjem</NavLink>
          <NavLink activeClassName="active" className="navigation-item" to={{ pathname: '/datasett/', search: search }}>Datasett</NavLink>
          <NavLink activeClassName="active" className="navigation-item" to={{ pathname: '/eiere/', search: search }}>Eiere</NavLink>
          <NavLink activeClassName="active" className="navigation-item" to={{ pathname: '/projeksjoner/', search: search }}>Projeksjoner</NavLink>
          <NavLink activeClassName="active" className="navigation-item" to={{ pathname: '/formater/', search: search }}>Formater</NavLink>
        </div>
      </nav>
    )
  }
}

export default Navigation
