import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import '../assets/css/navigation.css'

class Navigation extends Component {
  render () {
    return (
      <nav className="navigation">
        <NavLink activeClassName="active" className="navigation-item" exact to="/">Hjem</NavLink>
        <NavLink activeClassName="active" className="navigation-item" to="/nedlastinger">Nedlastinger</NavLink>
      </nav>
    )
  }
}

export default Navigation
