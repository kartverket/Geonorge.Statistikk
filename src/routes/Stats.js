import React, { Component } from 'react'
import * as Constants from '../Constants'

import qs from 'query-string'

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
  componentWillReceiveProps(nextProps) {
    const { location:prevLocation = {}, match:prevMatch = {} } = this.props
    const { duration:prevDuration = '' } = qs.parse(prevLocation.search)
    const { url:prevUrl = '/' } = prevMatch
    const { location:nextLocation = {}, match:nextMatch = {} } = nextProps
    const { duration:nextDuration = '' } = qs.parse(nextLocation.search)
    const { url:nextUrl = '/' } = nextMatch
    if (prevUrl !== nextUrl || prevDuration !== nextDuration) {
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
    const { location = {}, match = {} } = this.props
    const { params = {} } = match
    const { _basename = '', _category = '', _key = '' } = params
    const { duration = Constants.DEFAULT_DURATION } = qs.parse(location.search)
    let parts = []
    parts.push(Constants.API_URL)
    if (_basename.length > 0) parts.push(_basename)
    if (_category.length > 0) parts.push(_category)
    if (_key.length > 0) parts.push(_key)
    parts.push(`?duration=${duration}`)
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

export default Stats
