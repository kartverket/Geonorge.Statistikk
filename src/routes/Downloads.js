import Route from './Route'

import React from 'react'
import moment from 'moment'
import { CartesianGrid, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis } from 'recharts'

import Datepicker from '../components/Datepicker'
import Heading from '../components/Heading'
import SelectSingle from '../components/SelectSingle'
import SelectMulti from '../components/SelectMulti'

const API_URL = 'https://status.geonorge.no/statistikkApi'
const COLORS = ['#7293cb','#e1974c','#84ba5b','#d35e60','#808585','#9067a7','#ab6857','#ccc210']
const DATE_FORMAT = 'YYYY-MM-DD'
const toJSON = response => response.json()

class Downloads extends Route {
  state = {
    dataset: {},
    downloadsData: [],
    files: [],
    gte: moment({
      day: 1,
    }).format(DATE_FORMAT),
    lte: moment({
      day: moment().daysInMonth(),
    }).format(DATE_FORMAT),
    owner: {},
  }
  render () {
    const { dataset, downloadsData, files, gte, lte, owner } = this.state
    const ownerUrl = `${API_URL}/eiere`
    const { id : ownerId = '' } = owner
    const datasetUrl = `${API_URL}/datasett?eier=${ownerId}`
    const { id : datasetId = '' } = dataset
    const fileUrl = `${API_URL}/filliste?datasett=${datasetId}`
    const keys = downloadsData.length === 0 ? [] : Object.keys(downloadsData[0]).filter(key => key === 'name' ? false : true)
    return (
      <div className="container">
        <Heading title="Nedlastinger" />
        <div className="row">
          <div className="col-sm-6 text-left">
            &nbsp;
          </div>
          <div className="col-sm-6 text-right">
            Datovelger:
            &nbsp;
            <Datepicker datetime={gte} onChange={this.gteUpdate.bind(this)} />
            &nbsp;&ndash;&nbsp;
            <Datepicker datetime={lte} onChange={this.lteUpdate.bind(this)} />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control-static">Dataeier</div>
          <SelectSingle
            apiKey="navn"
            apiName="navn"
            apiUrl={ownerUrl}
            onUpdate={this.ownerUpdate.bind(this)}
            selected={owner}
          />
        </div>
        <div className="form-group">
          <div className="form-control-static">Datasett</div>
          <SelectSingle
            apiKey="id"
            apiName="navn"
            apiUrl={datasetUrl}
            onUpdate={this.datasetUpdate.bind(this)}
            selected={dataset}
          />
        </div>
        <div className="form-group">
          <div className="form-control-static">Filer</div>
          <SelectMulti
            apiKey="id"
            apiName="filnavn"
            apiUrl={fileUrl}
            onUpdate={this.filesUpdate.bind(this)}
            selected={files} />
        </div>
        <div className="form-group text-right">
          <button className="btn btn-info" disabled={files.length === 0} onClick={this.clickHandler.bind(this)} type="button">Vis nedlastinger</button>
        </div>
        <div className="card">
          <div className="card-header">
            Resultater
          </div>
          <ResponsiveContainer height={400} width="100%">
            <LineChart data={downloadsData}>
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              {keys.map( (key, index) => (
                <Line dataKey={key} key={key} stroke={COLORS[index]} />
              ))}
              <XAxis dataKey="name" tickFormatter={ value => `${value.substr(8, 2)}` } />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
  clickHandler () {
    this.setState({
      pending: true,
    }, this.downloadsLoad)
  }
  downloadsLoad () {
    const { files, gte, lte } = this.state
    Promise.all(files.map(item => fetch(`${API_URL}/nedlastinger?filnavn=${item.name}&fra=${gte}&til=${lte}`)))
    .then(responses => Promise.all(responses.map(toJSON)))
    .then(responses => {
      const downloadsData = []
      responses.forEach( (response, outerIndex) => {
        const { filnavn:key, nedlastinger:items } = response
        items.forEach( (item, innerIndex) => {
          if (outerIndex === 0) {
            downloadsData.push({
              name: item.dato,
            })
          }
          downloadsData[innerIndex][key] = item.antall
        })
      })
      this.setState({
        downloadsData: downloadsData,
        pending: false,
      })
    })
  }
  datasetUpdate (dataset) {
    this.setState({
      dataset: dataset,
      files: [],
    })
  }
  filesUpdate (files) {
    this.setState({
      files: files,
    })
  }
  gteUpdate (gte) {
    this.setState({
      gte: gte,
    })
  }
  lteUpdate (lte) {
    this.setState({
      lte: lte,
    })
  }
  ownerUpdate (owner) {
    this.setState({
      dataset: {},
      files: [],
      owner: owner,
    })
  }
}

export default Downloads
