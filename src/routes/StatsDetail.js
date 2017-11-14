import Stats from './Stats'
import * as Constants from '../Constants'

import moment from 'moment'
import React from 'react'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import Heading from '../components/Heading'

class StatsDetail extends Stats {
  state = {
    response: {},
    pending: false,
  }
  componentDidMount () {
    this.setState({
      pending: true,
    }, this.dataLoad)
  }
  render () {
    const { response } = this.state
    const { gte = '', lte = '', name = '-', results = [], total = 0 } = response
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
        <ResponsiveContainer aspect={1.77} width="100%">
          <BarChart data={results}>
            <Tooltip />
            <Bar dataKey="count" fill="#fe5000" maxBarSize={20} />
            <XAxis dataKey="label" />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default StatsDetail
