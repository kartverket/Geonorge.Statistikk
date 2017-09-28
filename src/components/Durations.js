import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Durations extends Component {
  state = {
    durations: [{
      key: '24H',
      val: '1 dag',
    },{
      key: '48H',
      val: '2 dager',
    },{
      key: '7D',
      val: '1 uke',
    },{
      key: '14D',
      val: '2 uker',
    },{
      key: '30D',
      val: '1 måned',
    },{
      key: '6M',
      val: '6 måneder',
    },{
      key: '12M',
      val: '1 år',
    }],
  }
  render () {
    const { durations } = this.state
    const { value } = this.props
    return (
      <div aria-label="Intervals" className="btn-group btn-group-sm" role="group">
        {durations.map( duration => (
          <button className={duration.key === value ? 'btn btn-primary' : 'btn btn-secondary'} key={duration.key} onClick={this.setDuration.bind(this, duration.key)} type="button">{duration.val}</button>
        ), this)}
      </div>
    )
  }
  setDuration (duration) {
    this.props.setDuration(duration)
  }
}

Durations.propTypes = {
  setDuration: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default Durations
