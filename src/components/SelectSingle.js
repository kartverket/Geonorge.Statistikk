import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Pagination from './Pagination'

import '../assets/css/select.css'

class SelectSingle extends Component {
  componentWillReceiveProps (nextProps) {
    const { open } = this.state
    if (open) {
      this.setState({
        open: false,
      })
    }
  }
  state = {
    count: 0,
    items: [],
    offset: 0,
    open: false,
    pending: false,
    search: '',
  }
  render () {
    const { count, items, offset, open, pending, search } = this.state
    const { limit } = this.props
    const selected = this.getSelected()
    const ids = selected.map( item => item.id )
    let classes = ['select']
    if (open) classes.push('open')
    if (pending) classes.push('pending')
    return (
      <div className={classes.join(' ')}>
        <div className="selected">
          <ul className="list">
            {selected.map(this.selectedItem, this)}
          </ul>
          <button className="toggle" onClick={this.dropdownOpen.bind(this)} type="button" />
        </div>
        <div className="overlay" onClick={this.dropdownClose.bind(this)} />
        <div className="items">
          <div className="search">
            <input onChange={this.searchUpdate.bind(this)} type="text" value={search} />
          </div>
          <ul className="list">
            {items.map( ({ [this.props.apiKey]:id, [this.props.apiName]:name }) => {
              const classes = ['item-off']
              if (ids.indexOf(id) !== -1) classes.push('active')
              return (
                <li className={classes.join(' ')} key={id} onClick={this.itemAdd.bind(this, id)}>
                  <span className="truncate">{name}</span>
                </li>
              )
            } , this)}
          </ul>
          <Pagination count={count} limit={limit} offset={offset} onNext={this.setOffset.bind(this)} onPrev={this.setOffset.bind(this)} />
          <div className="loading" />
        </div>
      </div>
    )
  }
  dropdownClose () {
    this.setState({
      open: false,
    })
  }
  dropdownOpen () {
    const { open } = this.state
    if (open) {
      this.setState({
        open: false,
      })
    } else {
      this.setState({
        offset: 0,
        open: true,
        pending: true,
        search: '',
      }, this.fetchData)
    }
  }
  fetchData () {
    const { offset, search } = this.state
    const { apiUrl, limit } = this.props
    const initialDelimiter = apiUrl.indexOf('?') === -1 ? '?' : '&'
    fetch(`${apiUrl}${initialDelimiter}search=${search}&offset=${offset}&limit=${limit}`)
    .then( r => r.json() )
		.then( data => {
      this.setState({
        count: data.count,
        items: data.results,
        pending: false,
      })
    })
  }
  getSelected () {
    const { selected } = this.props
    return selected.hasOwnProperty('id') ? [selected] : []
  }
  itemAdd (id) {
    const { items } = this.state
    const { apiKey, apiName, selected } = this.props
    if (selected.id !== id) {
      const item = items.find( ({ [apiKey]:_id }) => _id === id )
      const { [apiName]:name } = item
      this.props.onUpdate({
        id: id,
        name: name,
      })
    }
  }
  itemRemove () {
    this.props.onUpdate({})
  }
  selectedItem = (item) => (
    <li className="item-on" key={item.id}>
      <span className="truncate">{item.name}</span>
    </li>
  )
  setOffset (offset) {
    this.setState({
      offset: offset,
      pending: true,
    }, this.fetchData)
  }
  searchUpdate (event) {
    const { pending } = this.state
    if (pending === false) {
      const { value } = event.target
      this.setState({
        offset: 0,
        pending: true,
        search: value,
      }, this.fetchData)
    }
  }
}

SelectSingle.propTypes = {
  apiKey: PropTypes.string,
  apiName: PropTypes.string,
  apiUrl: PropTypes.string.isRequired,
  limit: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
}

SelectSingle.defaultProps = {
  apiKey: 'id',
  apiName: 'name',
  limit: 10,
}

export default SelectSingle
