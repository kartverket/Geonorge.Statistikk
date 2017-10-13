import * as Constants from '../Constants'

import React, { Component } from 'react'

import qs from 'query-string'

class Base extends Component {
  state = {
    pending: false,
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
    const prevParams = qs.parse(this.props.location.search)
    const { duration : prevDuration = Constants.DEFAULT_DURATION } = prevParams
    const nextParams = qs.parse(nextProps.location.search)
    const { duration : nextDuration = Constants.DEFAULT_DURATION } = nextParams
    if (nextDuration !== prevDuration) {
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
  dataLoad () {}
  toJSON = response => response.json()
}

export default Base
