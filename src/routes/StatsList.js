import Stats from './Stats'
import * as Constants from '../Constants'

import qs from 'query-string'
import React from 'react'
import { Link/*, Route*/ } from 'react-router-dom'

import Breadcrumbs from '../components/Breadcrumbs'
import Heading from '../components/Heading'
import StatusBar from '../components/StatusBar'

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
    const { location = {}, match = {} } = this.props
    const { url = '/' } = match
    const search = qs.parse(location.search)
    const { duration = Constants.DEFAULT_DURATION } = search
    const { response } = this.state
    const { gte = '', lte = '', name = '-', paths = [], results = [], total = 0 } = response
    const rows = results.map( ({ count, id, name }) => (
      <tr key={id}>
        <td>
          <Link to={`${url}${id}/?duration=${duration}`}>{name}</Link>
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
        <div className="btn-toolbar justify-content-between my-3" role="toolbar">
          <div className="p-1">
            <StatusBar gte={gte} lte={lte} total={total} />
          </div>
        </div>
        <table className="table table-responsive table-sm">
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
    )
  }
}

export default StatsList
