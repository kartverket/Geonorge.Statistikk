import React, { Component } from 'react'
import moment from 'moment'

import Heading from '../components/Heading'

const API_URL = 'https://status.geonorge.no/statistikkApi'
const DATE_FORMAT = 'YYYY-MM-DD'
const toJSON = response => response.json()

class Datasets extends Component {
  state = {
    datasetsData: [],
    patterns: [{
      key: '1-day',
      val: 'I dag',
    },{
      key: '1-week',
      val: 'Siste uke',
    },{
      key: '1-month',
      val: 'Siste måned',
    },{
      key: '1-year',
      val: 'Siste år',
    }],
    patternSelected: 0,
    pending: false,
  }
  componentDidMount () {
    this.setState({
      pending: true,
    }, this.datasetsDataLoad)
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
  render() {
    const { datasetsData, patterns, patternSelected } = this.state
    return (
      <div className="container">
        <Heading title="Datasett" />
        <div aria-label="Toolbar with button groups" className="btn-toolbar justify-content-between mb-3" role="toolbar">
          <div aria-label="Basic example" className="btn-group btn-group-sm" role="group">
            {patterns.map( ( {key, val}, index ) => (
              <button className={index === patternSelected ? 'btn btn-primary' : 'btn btn-secondary'} key={key} onClick={this.setDateRange.bind(this, index)} type="button">{val}</button>
            ), this)}
          </div>
        </div>
        <table className="table table-bordered table-sm">
          <thead className="thead-default">
            <tr>
              <th>Tittel</th>
              <th>Eier</th>
              <th>Nedlastinger</th>
            </tr>
          </thead>
          <tbody>
            {datasetsData.map( ({ id, name, owner, downloads }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{owner}</td>
                <td className="text-right">{downloads.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  datasetsDataLoad () {
    const { patterns, patternSelected } = this.state
    const { key = '' } = patterns[patternSelected]
    const [ num = 1, str = 'days' ] = key.split('-')
    const gte = moment().subtract(num, str)
    const lte = moment()
    const url = `${API_URL}/datasett/?fra=${gte.format(DATE_FORMAT)}&til=${lte.format(DATE_FORMAT)}`
    fetch(url).then(toJSON)
    .then( response => {
      this.setState({
        datasetsData: response.results,
        pending: false,
      })
    })
  }
  setDateRange (index) {
    const { patternSelected } = this.state
    if (index !== patternSelected) {
      this.setState({
        patternSelected: index,
        pending: true,
      }, this.datasetsDataLoad)
    }
  }
}

export default Datasets
