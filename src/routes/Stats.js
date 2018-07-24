import React, { Component } from 'react'
import {API_URL} from '../Constants'

import PropTypes from 'prop-types'

class Stats extends Component {
  state = {
    pending: false,
    response: {},
  }
  componentDidUpdate (prevProps, prevState) {
    const { pending : wasPending = false } = prevState
    const { pending : isPending = false } = this.state
    if (wasPending === false && isPending === true) {
      document.getElementById('modal-backdrop').classList.remove('d-none')
    }
    if (wasPending === true && isPending === false) {
      document.getElementById('modal-backdrop').classList.add('d-none')
    }
  }
  componentWillReceiveProps (nextProps) {
    const { match:prevMatch = {}, start:prevStart, end:prevEnd } = this.props
    const { url:prevUrl = '/' } = prevMatch
    const { match:nextMatch = {}, start:nextStart, end:nextEnd } = nextProps
    const { url:nextUrl = '/' } = nextMatch
    if (prevUrl !== nextUrl || prevStart !== nextStart || prevEnd !== nextEnd) {
      this.setState({
        pending: true,
      }, this.dataLoad)
    }
  }
  render () {
    return (
      <div />
    )
  }
  dataLoad () {
    const { start, end, match = {} } = this.props
    const { params = {} } = match
    const { _basename = '', _category = '', _key = '' } = params
    const parts = []
    parts.push(API_URL)
    if (_basename.length > 0) parts.push(_basename)
    if (_category.length > 0) parts.push(_category)
    if (_key.length > 0) parts.push(_key)
    parts.push(`?start=${start}&end=${end}`)
    const url = parts.join('/')
    fetch(url).then(this.toJSON).then( response => {
      this.setState({
        response: response,
        pending: false,
      })
    }).catch(err => {
      alert(err)
      this.setState({
        pending: false,
      })
    })
  }
  toJSON = response => response.json()
}

Stats.propTypes = {
  end: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  updateDates: PropTypes.func.isRequired,
}

export default Stats
