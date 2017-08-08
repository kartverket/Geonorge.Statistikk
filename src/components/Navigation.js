import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
  render () {
    return (
      <div className="container">
        <nav className="well well-sm">
          <NavLink activeClassName="btn-info" className="btn btn-sm btn-default" exact to="/">Hjem</NavLink>
          <span>&nbsp;|&nbsp;</span>
          <NavLink activeClassName="btn-info" className="btn btn-sm btn-default" to="/nedlastinger">Nedlastinger</NavLink>
        </nav>
      </div>
    )
  }
}

export default Navigation
