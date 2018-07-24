import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

import '../assets/css/navigation.css'

class Navigation extends Component {
  render () {
    return (
      <nav className="navigation mb-3">
        <div className="container">
          <NavLink activeClassName="active" className="navigation-item" exact to="/">Hjem</NavLink>
          <NavLink activeClassName="active" className="navigation-item" to="/nedlastinger/">Nedlastinger</NavLink>
          <NavLink activeClassName="active" className="navigation-item" to="/tjenester/">Tjenester</NavLink>
        </div>
      </nav>
    )
  }
}

export default Navigation
