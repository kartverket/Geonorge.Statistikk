import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../assets/css/breadcrumbs.css'

class Breadcrumbs extends Component {

  render () {
    const { paths } = this.props
    const lastIndex = paths.length - 1
    return (
      <nav>
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="https://www.geonorge.no/">Geonorge</a>
          </li>
          <li className="breadcrumb-item">
            {lastIndex === -1 ? (
              <span>Hjem</span>
            ) : (
              <Link to="/">Hjem</Link>
            )}
          </li>
          {paths.map( ({name, path}, index) => (
            <li className="breadcrumb-item" key={`crumb-${index}`}>
              {index === lastIndex ? (
                <span>{name}</span>
              ) : (
                <Link to={path}>{name}</Link>
              )}
            </li>
          ) )}
        </ul>
      </nav>
    )
  }
}

Breadcrumbs.propTypes = {
  paths: PropTypes.array,
}

Breadcrumbs.defaultProps = {
  paths: [],
}

export default Breadcrumbs
