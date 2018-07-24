import React, { Component } from 'react'

import PropTypes from 'prop-types'

class Durations extends Component {
  state = {
    durations: [{
      end: '2018-07-24',
      key: 'today',
      label: 'I dag',
      start: '2018-07-24',
    },{
      end: '2018-07-23',
      key: 'yesterday',
      label: 'I går',
      start: '2018-07-23',
    },{
      end: '2018-07-24',
      key: 'lastseven',
      label: 'Siste 7 dager',
      start: '2018-07-17',
    },{
      end: '2018-07-24',
      key: 'lastthirty',
      label: 'Siste 30 dager',
      start: '2018-06-24',
    },{
      end: '2018-07-31',
      key: 'thismonth',
      label: 'Denne måned',
      start: '2018-07-01',
    },{
      end: '2018-06-30',
      key: 'lastmonth',
      label: 'Forrige måned',
      start: '2018-06-01',
    }],
    expanded: false,
  }
  componentWillReceiveProps (nextProps) {
    const { expanded } = this.state
    if (expanded) {
      this.setState({
        expanded: false,
      })
    }
  }
  render () {
    const { end, start } = this.props
    const { durations, expanded } = this.state
    const selectedIndex = durations.findIndex(duration => (duration.start === start && duration.end === end))
    const label = selectedIndex === -1 ? 'Egendefinert' : durations[selectedIndex].label
    return (
      <div className={expanded ? 'dropdown show' : 'dropdown'}>
        <button aria-expanded={expanded} className="btn btn-sm btn-light dropdown-toggle" onClick={this.handleToggle.bind(this)} type="button">{label}</button>
        <div className={expanded ? 'dropdown-menu dropdown-menu-right show' : 'dropdown-menu dropdown-menu-right'}>
          {durations.map((duration, index) => (
            <button className={index === selectedIndex ? 'dropdown-item active' : 'dropdown-item'} key={duration.key} onClick={this.handleUpdate.bind(this, index)} type="button">{duration.label}</button>
          ), this)}
        </div>
      </div>
    )
  }
  handleToggle () {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded,
    })
  }
  handleUpdate (index) {
    const { durations } = this.state
    this.props.updateDates(durations[index].start, durations[index].end)
  }
}

Durations.propTypes = {
  end: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  updateDates: PropTypes.func.isRequired,
}

export default Durations
