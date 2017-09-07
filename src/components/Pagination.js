import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../assets/css/pagination.css'

class Pagination extends Component {
  render () {
    const { count, limit, offset } = this.props
    const first = offset + 1
    const disablePrev = offset === 0 ? true : false
    let last = offset + limit
    let disableNext = false
    if (last > count) {
      last = count
      disableNext = true
    }
    const label = `Viser ${first} til ${last} av ${count}`
    return (
      <nav className="pagination">
        <div className="left">
          <button className="prev" disabled={disablePrev} onClick={this.clickPrev.bind(this)} type="button">Forrige</button>
        </div>
        <div className="middle">
          {label}
        </div>
        <div className="right">
          <button className="next" disabled={disableNext} onClick={this.clickNext.bind(this)} type="button">Neste</button>
        </div>
      </nav>
    )
  }
  clickNext () {
    const { count, limit, offset } = this.props
    const next = offset + limit
    if (next < count) {
      this.props.onNext(next)
    }
  }
  clickPrev () {
    const { limit, offset } = this.props
    const next = offset - limit
    if (next >= 0) {
      this.props.onPrev(next)
    }
  }
}

Pagination.propTypes = {
  count: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
  count: 0,
  limit: 0,
  offset: 0,
}

export default Pagination
