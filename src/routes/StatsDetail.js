import Stats from './Stats'
import React from 'react'

import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import Breadcrumbs from '../components/Breadcrumbs'
import Daterange from '../components/Daterange'
import Durations from '../components/Durations'
import Heading from '../components/Heading'
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
    const { end, start } = this.props
    const { response } = this.state
    const { name = '-', paths = [], results = [], total = 0 } = response
    const type = 'D'
    const count = results.length
    const step = Math.ceil(count / 10)
    const includes = []
    for (let i = count - 1; i >= 0; i -= step) {
      includes.push(i)
    }
    return (
      <div className="container">
        <Breadcrumbs paths={paths} />
        <Heading title={name} />
        <div className="navbar navbar-expand navbar-light bg-light justify-content-between mb-3">
          <Daterange end={end} start={start} updateDates={this.props.updateDates} />
          <Durations end={end} start={start} updateDates={this.props.updateDates} />
        </div>
        <ResponsiveContainer aspect={2.39} width="100%">
          <BarChart data={results} margin={{ bottom: 5, top: 20 }}>
            <Tooltip content={<TooltipDetail type={type} />} isAnimationActive={false} offset={0} position={{ x: 0, y: 0 }} />
            <Bar dataKey="count" fill="#fe5000" maxBarSize={20} />
            <XAxis dataKey="date" interval={0} padding={{ left: 10, right: 10 }} tick={<TickDetailX includes={includes} type={type} />} />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
        <div className="text-right py-2 mt-3"><small>Totalt:</small> {total.toLocaleString()}</div>
      </div>
    )
  }
}

export default StatsDetail
