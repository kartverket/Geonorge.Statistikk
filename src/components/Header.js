import React, { Component } from 'react'

import '../assets/css/header.css';
import geonorge_logo from '../assets/svg/geonorge_logo.svg'

class Header extends Component {
  render () {
    return (
      <header className="container header">
        <a className="header-logo py-2" href="https://www.geonorge.no/">
          <img alt="Geonorge" src={ geonorge_logo } />
        </a>
      </header>
    )
  }
}

export default Header
