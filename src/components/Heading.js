import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Heading extends Component {
  render () {
    const { title } = this.props
    return (
      <div className="page-header">
        <h2>{ title }</h2>
      </div>
    )
  }
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Heading