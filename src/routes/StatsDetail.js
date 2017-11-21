import Stats from './Stats'
import * as Constants from '../Constants'

import qs from 'query-string'
import React from 'react'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import Breadcrumbs from '../components/Breadcrumbs'
import Durations from '../components/Durations'
import Heading from '../components/Heading'
import StatusBar from '../components/StatusBar'

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
    const { location = {} } = this.props
    const { pathname = '/' } = location
    const search = qs.parse(location.search)
    const { duration = Constants.DEFAULT_DURATION } = search
    const { response } = this.state
    const { gte = '', lte = '', name = '-', paths = [], results = [], total = 0 } = response
    return (
      <div className="container">
        <Breadcrumbs duration={duration} paths={paths} />
        <Heading title={name} />
        <div className="btn-toolbar justify-content-between my-3" role="toolbar">
          <StatusBar gte={gte} lte={lte} total={total} />
          <Durations duration={duration} pathname={pathname} />
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
