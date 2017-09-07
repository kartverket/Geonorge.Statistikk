import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../assets/css/heading.css'

class Heading extends Component {
  render () {
    const { title } = this.props
    return (
      <div className="heading">
        <h1>{ title }</h1>
      </div>
    )
  }
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Heading