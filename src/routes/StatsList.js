import Stats from './Stats'
import * as Constants from '../Constants'

import moment from 'moment'
import qs from 'query-string'
import React from 'react'
import { Link/*, Route*/ } from 'react-router-dom'

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
    const { location = {}, match = {} } = this.props
    const { url = '/' } = match
    const search = qs.parse(location.search)
    const { duration = Constants.DEFAULT_DURATION } = search
    const { response } = this.state
    const { gte = '', lte = '', name = '', results = [], total = 0 } = response
    const gteFormatted = moment(gte, Constants.DATE_INPUT).format(Constants.DATE_OUTPUT)
    const lteFormatted = moment(lte, Constants.DATE_INPUT).format(Constants.DATE_OUTPUT)
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
        <Heading title={name} />
        <div className="btn-toolbar justify-content-between my-3" role="toolbar">
          <div className="p-1">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <span className="text-muted small">Totalt:</span>
                &nbsp;
                <span>{total.toLocaleString()}</span>
              </li>
               <li className="list-inline-item">
                <span className="text-muted small">Fra:</span>
                &nbsp;
                <time dateTime={gte}>{gteFormatted}</time>
              </li>
               <li className="list-inline-item">
                <span className="text-muted small">Til:</span>
                &nbsp;
               <time dateTime={lte}>{lteFormatted}</time>
              </li>
            </ul>
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
