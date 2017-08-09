import React, { Component } from 'react'

import './Header.css';
import geonorge_logo from '../assets/geonorge_logo.svg'

class Header extends Component {
  render () {
    return (
      <header className="header">
        <a className="header-logo" href="https://www.geonorge.no/">
          <img alt="Geonorge" src={ geonorge_logo } />
        </a>
      </header>
    )
  }
}

export default Header
