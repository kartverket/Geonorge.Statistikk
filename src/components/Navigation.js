import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import '../assets/css/navigation.css'

class Navigation extends Component {
  render () {
    return (
      <nav className="navigation">
        <div className="container">
          <NavLink activeClassName="active" className="navigation-item" exact to="/">Hjem</NavLink>
          <NavLink activeClassName="active" className="navigation-item" to="/datasett/">Datasett</NavLink>
          <NavLink activeClassName="active" className="navigation-item" to="/nedlastinger/">Nedlastinger</NavLink>
        </div>
      </nav>
    )
  }
}

export default Navigation
