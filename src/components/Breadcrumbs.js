import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import '../assets/css/breadcrumbs.css'

class Breadcrumbs extends Component {

  render () {
    const { duration, paths } = this.props
    const lastIndex = paths.length - 1
    return (
      <nav>
        <ul className="breadcrumb">
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
                <Link to={{
                  pathname: path,
                  search: `duration=${duration}`,
                }}>{name}</Link>
              )}
            </li>
          ) )}
        </ul>
      </nav>
    )
  }
}

Breadcrumbs.propTypes = {
  duration: PropTypes.string,
  paths: PropTypes.array,
}

Breadcrumbs.defaultProps = {
  duration: '',
  paths: [],
}

export default Breadcrumbs
