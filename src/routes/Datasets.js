import Route from './Route'

import React from 'react'
import { NavLink } from 'react-router-dom'

import Heading from '../components/Heading'
import Durations from '../components/Durations'

const API_URL = 'https://status.geonorge.no/statistikkApi'
const toJSON = response => response.json()

class Datasets extends Route {
  state = {
    datasetsData: [],
    duration: this.getQuery('duration', '24H'),
  }
  componentDidMount () {
    this.setState({
      pending: true,
    }, this.datasetsDataLoad)
  }
  render() {
    const { datasetsData, duration } = this.state
    return (
      <div className="container">
        <Heading title="Datasett" />
        <div aria-label="..." className="btn-toolbar justify-content-between mb-3" role="toolbar">
          <div />
          <Durations setDuration={this.setDuration.bind(this)} value={duration} />
        </div>
        <table className="table table-responsive table-bordered table-sm">
          <thead className="thead-default">
            <tr>
              <th>Tittel</th>
              <th>Eier</th>
              <th>Nedlastinger</th>
            </tr>
          </thead>
          <tbody>
            {datasetsData.length === 0 ? (
              <tr>
                <td colSpan="3">Ingen resultat</td>
              </tr>
            ) : datasetsData.map( ({ id, name, owner, downloads }) => (
              <tr key={id}>
                <td>
                  <NavLink to={`/datasett/${id}/?duration=${duration}`}>{name}</NavLink>
                </td>
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
    const { duration } = this.state
    const url = `${API_URL}/datasett/?duration=${duration}`
    fetch(url).then(toJSON)
    .then( response => {
      this.setState({
        datasetsData: response.results,
        pending: false,
      })
    })
  }
  setDuration (duration) {
    this.setState({
      duration: duration,
      pending: true,
    }, this.datasetsDataLoad)
  }
}

export default Datasets
