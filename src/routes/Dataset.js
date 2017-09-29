import Route from './Route'

import React from 'react'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import Heading from '../components/Heading'
import Durations from '../components/Durations'

const API_URL = 'https://status.geonorge.no/statistikkApi'
const toJSON = response => response.json()

class Dataset extends Route {
  state = {
    datasetData: [],
    datasetName: '',
    duration: this.getQuery('duration', '24H'),
  }
  componentDidMount () {
    this.setState({
      pending: true,
    }, this.datasetDataLoad)
  }
  render() {
    const { datasetData, datasetName, duration } = this.state
    return (
      <div className="container">
        <Heading title={`Datasett - ${datasetName}`} />
        <div aria-label="..." className="btn-toolbar justify-content-between mb-3" role="toolbar">
          <div />
          <Durations setDuration={this.setDuration.bind(this)} value={duration} />
        </div>
        <ResponsiveContainer height={400} width="100%">
          <BarChart data={datasetData}>
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
      console.log(response)
      this.setState({
        datasetData: response.results,
        datasetName: response.name,
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
    const [ payload = null ] = data.payload
    return payload === null ? null : (<div style={{ backgroundColor: 'rgba(51,51,51,0.5)', borderRadius: '3px', color: '#fff', padding: '5px' }}>
      <small>{payload.payload.date.substr(0, 16).replace('T', ' ')}</small>
      <br />
      <b>{payload.payload.downloads}</b>
    </div>)
  }
}

export default Dataset
