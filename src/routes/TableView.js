import Base from './Base'
import * as Constants from '../Constants'

import moment from 'moment'
import PropTypes from 'prop-types'
import qs from 'query-string'
import React from 'react'
import { Link, Route } from 'react-router-dom'

import Durations from '../components/Durations'
import Heading from '../components/Heading'

class TableView extends Base {
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
    const { location, title } = this.props
    const { pathname } = location
    const query = qs.parse(location.search)
    const { duration } = query
    const search = qs.stringify({
      duration: duration,
    })
    const { response } = this.state
    const { gte = '', lte = '', results = [], total = 0 } = response
    const gteFormatted = moment(gte, Constants.DATE_INPUT).format(Constants.DATE_OUTPUT)
    const lteFormatted = moment(lte, Constants.DATE_INPUT).format(Constants.DATE_OUTPUT)
    const rows = results.map( ({ id, name, downloads }) => (
      <tr key={id}>
        <td>
          <Link to={{
            pathname: `${pathname}${id}/`,
            search: search,
          }}>{name}</Link>
        </td>
        <td className="text-right">
          {downloads.toLocaleString()}
        </td>
      </tr>
    ), this )
    return (
      <div className="container">
        <Heading title={title} />
        <div className="btn-toolbar justify-content-between my-3" role="toolbar">
          <div className="p-1">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <span className="text-muted small">Totalt:</span>
                &nbsp;
                <span>{total}</span>
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
          <Route component={Durations} path="/" />
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
  dataLoad () {
    const { location, service } = this.props
    const params = qs.parse(location.search)
    const { duration = Constants.DEFAULT_DURATION } = params
    const url = `${Constants.API_URL}/${service}/?duration=${duration}`
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
}

TableView.propTypes = {
  service: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default TableView
