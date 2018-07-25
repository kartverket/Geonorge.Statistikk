import Stats from './Stats'
import React from 'react'

import { Link/*, Route*/ } from 'react-router-dom'

import Breadcrumbs from '../components/Breadcrumbs'
import Daterange from '../components/Daterange'
import Durations from '../components/Durations'
import Heading from '../components/Heading'

class StatsList extends Stats {
  state = {
    pending: false,
    response: {},
  }
  componentDidMount () {
    this.setState({
      pending: true,
    }, this.dataLoad)
  }
  render () {
    const { end, match = {}, start } = this.props
    const { url = '/' } = match
    const { response } = this.state
    const { name = '-', paths = [], results = [], total = 0 } = response
    const rows = results.map( ({ count, id, name }) => (
      <tr key={id}>
        <td>
          <Link to={`${url}${id}`}>{name}</Link>
        </td>
        <td className="text-right">
          {count.toLocaleString()}
        </td>
      </tr>
    ), this )
    return (
      <div className="container">
        <Breadcrumbs paths={paths} />
        <Heading title={name} />
        <div className="navbar navbar-expand navbar-light bg-light justify-content-between align-items-md-end flex-column flex-md-row mb-3">
          <Daterange end={end} start={start} updateDates={this.props.updateDates} />
          <Durations end={end} start={start} updateDates={this.props.updateDates} />
        </div>
        <div className="table-responsive">
          <table className="table table-sm">
            <thead className="thead-default">
              <tr>
                <th>Navn</th>
                <th className="text-right">Nedlastinger</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
            <tfoot>
              <tr className="table-active">
                <td>Totalt</td>
                <td className="text-right">{total.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  }
}

export default StatsList
