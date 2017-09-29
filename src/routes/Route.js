import React, { Component } from 'react'

class Route extends Component {
  state = {
    pending: false,
  }
  componentDidUpdate (prevProps, prevState) {
    const { pending:wasPending } = prevState
    const { pending:isPending } = this.state
    if (wasPending === false && isPending === true) {
      document.getElementById('modal-backdrop').classList.remove('d-none')
    }
    if (wasPending === true && isPending === false) {
      document.getElementById('modal-backdrop').classList.add('d-none')
    }
  }
  render () {
    return <div />
  }
  getQuery (key, fallback = '') {
    const { search } = this.props.location
    const regexp = new RegExp(`${key}=(.*?)&`)
    const match = `${search}&`.match(regexp)
    return match === null ? fallback : match[1]
  }
}

export default Route
