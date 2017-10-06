import Route from './Route'

import React from 'react'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import moment from 'moment'

import Heading from '../components/Heading'
import Durations from '../components/Durations'

const API_URL = 'https://status.geonorge.no/statistikkApi'
const DATE_INPUT = 'YYYY-MM-DD[T]HH:mm:ss'
const DATE_OUTPUT = 'DD.MM.YY HH:mm'
const toJSON = response => response.json()

class Dataset extends Route {
  state = {
    dataset: {},
    duration: this.getQuery('duration', '24H'),
  }
  componentDidMount () {
    this.setState({
      pending: true,
    }, this.datasetDataLoad)
  }
  render() {
    const { dataset, duration } = this.state
    const { gte = '', lte = '', name = '-', results = [], total = 0 } = dataset
    const gteFormatted = moment(gte, DATE_INPUT).format(DATE_OUTPUT)
    const lteFormatted = moment(lte, DATE_INPUT).format(DATE_OUTPUT)
    return (
      <div className="container">
        <Heading title={name} />
        <div aria-label="..." className="btn-toolbar justify-content-between mb-3" role="toolbar">
          <div className="p-1">
            <ul className="list-inline">
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
          <Durations setDuration={this.setDuration.bind(this)} value={duration} />
        </div>
        <ResponsiveContainer height={400} width="100%">
          <BarChart data={results}>
            <Tooltip content={this.tooltipContent.bind(this)} cursor={{ fill: '#eee' }} isAnimationActive={false} position={{y: 10}} />
            <Bar dataKey="downloads" fill="#fe5000" maxBarSize={20} />
            <XAxis dataKey="label" />
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
  datasetDataLoad () {
    const { id } = this.props.match.params
    const { duration } = this.state
    const url = `${API_URL}/datasett/${id}/?duration=${duration}`
    fetch(url).then(toJSON)
    .then( response => {
      this.setState({
        dataset: response,
        pending: false,
      })
    })
  }
  setDuration (duration) {
    this.setState({
      duration: duration,
      pending: true,
    }, this.datasetDataLoad)
  }
  tooltipContent (data) {
    const payload = (data.payload !== null && data.payload.length > 0) ? data.payload[0].payload : null
    return payload === null ? null : (<div style={{ backgroundColor: 'rgba(51,51,51,0.5)', borderRadius: '3px', color: '#fff', padding: '5px' }}>
      <small>{payload.date.substr(0, 16).replace('T', ' ')}</small>
      <br />
      <b>{payload.downloads}</b>
    </div>)
  }
}

export default Dataset
