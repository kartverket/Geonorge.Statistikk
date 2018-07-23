import Stats from './Stats'
import * as Constants from '../Constants'

import qs from 'query-string'
import React from 'react'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import Breadcrumbs from '../components/Breadcrumbs'
import Durations from '../components/Durations'
import Heading from '../components/Heading'
import StatusBar from '../components/StatusBar'
import TickDetailX from '../components/TickDetailX'
import TooltipDetail from '../components/TooltipDetail'

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
    const type = duration.substr(-1)
    const count = results.length
    const step = Math.ceil(count / 10)
    const includes = []
    for (let i = count - 1; i >= 0; i -= step) {
      includes.push(i)
    }
    return (
      <div className="container">
        <Breadcrumbs duration={duration} paths={paths} />
        <Heading title={name} />
        <div className="btn-toolbar justify-content-between my-3" role="toolbar">
          <StatusBar gte={gte} lte={lte} total={total} />
          <Durations duration={duration} pathname={pathname} />
        </div>
        <ResponsiveContainer aspect={2.39} width="100%">
          <BarChart data={results} margin={{ bottom: 5, top: 20 }}>
            <Tooltip content={<TooltipDetail type={type} />} isAnimationActive={false} offset={0} position={{ x: 0, y: 0 }} />
            <Bar dataKey="count" fill="#fe5000" maxBarSize={20} />
            <XAxis dataKey="date" interval={0} padding={{ left: 10, right: 10 }} tick={<TickDetailX includes={includes} type={type} />} />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default StatsDetail
