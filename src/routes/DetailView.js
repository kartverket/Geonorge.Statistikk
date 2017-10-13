import Base from './Base'
import * as Constants from '../Constants'

import moment from 'moment'
import PropTypes from 'prop-types'
import qs from 'query-string'
import React from 'react'
import { Route } from 'react-router-dom'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import Durations from '../components/Durations'
import Heading from '../components/Heading'

class DetailView extends Base {
  state = {
    data: {},
    pending: false,
  }
  componentDidMount () {
    this.setState({
      pending: true,
    }, this.dataLoad)
  }
  render () {
    const { data } = this.state
    const { gte = '', lte = '', name = '-', results = [], total = 0 } = data
    const gteFormatted = moment(gte, Constants.DATE_INPUT).format(Constants.DATE_OUTPUT)
    const lteFormatted = moment(lte, Constants.DATE_INPUT).format(Constants.DATE_OUTPUT)
    return (
      <div className="container">
        <Heading title={name} />
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
        <ResponsiveContainer height={400} width="100%">
          <BarChart data={results}>
            <Tooltip />
            <Bar dataKey="downloads" fill="#fe5000" maxBarSize={20} />
            <XAxis dataKey="label" />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
  dataLoad () {
    const { location, match, service } = this.props
    const { params } = match
    const { id } = params
    const query = qs.parse(location.search)
    const { duration = Constants.DEFAULT_DURATION } = query
    const url = `${Constants.API_URL}/${service}/${id}/?duration=${duration}`
    fetch(url).then(this.toJSON).then( response => {
      this.setState({
        data: response,
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

DetailView.propTypes = {
  service: PropTypes.string.isRequired,
}

export default DetailView
