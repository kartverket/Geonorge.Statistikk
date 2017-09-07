import React, { Component } from 'react'
import moment from 'moment'
import Chart from 'chart.js'

import Datepicker from '../components/Datepicker'
import Heading from '../components/Heading'
import SelectSingle from '../components/SelectSingle'
import SelectMulti from '../components/SelectMulti'

const DATE_FORMAT = 'YYYY-MM-DD'

class Downloads extends Component {
  state = {
    dataset: {},
    files: [],
    gte: moment({
      day: 1,
    }).format(DATE_FORMAT),
    lte: moment({
      day: moment().daysInMonth(),
    }).format(DATE_FORMAT),
    owner: {},
    pending: false,
  }
  componentDidMount () {
    if ('chart' in this.refs && this.refs.chart.nodeName.toLowerCase() === 'canvas') {
      this.chart = new Chart(this.refs.chart, {
        type: 'line',
        data: {},
        options: {
          animation: false,
          scales: {
            xAxes: [{
              ticks: {
                fontFamily: 'sans-serif',
                fontSize: 10,
              },
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontFamily: 'sans-serif',
                fontSize: 10,
                min: 0,
              }
            }]
          },
          tooltips: {
            callbacks: {
              title: function (tooltipItem) {
                return moment(tooltipItem[0].xLabel).format('LL')
              }
            },
          }
        }
      })
    }
  }
  componentWillUnmount () {
    this.chart.destroy()
  }
  render () {
    const { dataset, files, gte, lte, owner } = this.state
    const ownerUrl = 'https://status.geonorge.no/statistikkApi/eiere'
    const { id : ownerId = '' } = owner
    const datasetUrl = `https://status.geonorge.no/statistikkApi/datasett?eier=${ownerId}`
    const { id : datasetId = '' } = dataset
    const fileUrl = `https://status.geonorge.no/statistikkApi/filliste?datasett=${datasetId}`
    return (
      <div>
        <div className="w3-container">
          <Heading title="Nedlastinger" />
        </div>
        <div className="w3-row-padding w3-margin-bottom">
          <div className="w3-col m6 w3-left-align">
            &nbsp;
          </div>
          <div className="w3-col m6 w3-right-align">
            Datovelger:
            &nbsp;
            <Datepicker datetime={gte} onChange={this.gteUpdate.bind(this)} />
            &nbsp;&ndash;&nbsp;
            <Datepicker datetime={lte} onChange={this.lteUpdate.bind(this)} />
          </div>
        </div>
        <div className="w3-container w3-margin-bottom">
          <div>Dataeier</div>
          <SelectSingle
            apiKey="navn"
            apiName="navn"
            apiUrl={ownerUrl}
            onUpdate={this.ownerUpdate.bind(this)}
            selected={owner}
          />
        </div>
        <div className="w3-container w3-margin-bottom">
          <div>Datasett</div>
          <SelectSingle
            apiKey="id"
            apiName="navn"
            apiUrl={datasetUrl}
            onUpdate={this.datasetUpdate.bind(this)}
            selected={dataset}
          />
        </div>
        <div className="w3-container w3-margin-bottom">
          <div>Filer</div>
          <SelectMulti
            apiKey="id"
            apiName="filnavn"
            apiUrl={fileUrl}
            onUpdate={this.filesUpdate.bind(this)}
            selected={files} />
        </div>
        <div className="w3-container w3-margin-bottom">
          <button className="w3-button w3-gray w3-right w3-margin-top" disabled={files.length === 0} onClick={this.clickHandler.bind(this)} type="button">Vis nedlastinger</button>
        </div>
        <div className="w3-container">
          <div className="w3-card">
            <header className="w3-container">
              <h3>Resultater</h3>
            </header>
            <div>
              <canvas ref="chart" />
            </div>
          </div>
        </div>
        <hr />
      </div>
    )
  }
  chartUpdate () {
    this.chart.update()
  }
  clickHandler () {
    this.setState({
      pending: true,
    }, this.dataLoadFetch)
  }
  dataLoadFetch () {
    const { files, gte, lte } = this.state
    Promise.all(files.map(item => fetch(`https://status.geonorge.no/statistikkApi/nedlastinger?filnavn=${item.name}&fra=${gte}&til=${lte}`)))
    .then(
      responses => Promise.all(
        responses.map(
          response => response.json()
        )
      )
    )
    .then(responses => {
      const colors = ['#7293cb','#e1974c','#84ba5b','#d35e60','#808585','#9067a7','#ab6857','#ccc210']
      this.chart.data = {
        labels: responses[0].nedlastinger.map(dataPoint => dataPoint.dato),
        datasets: responses.map( (data, index) => ({
          data: data.nedlastinger.map(dataPoint => dataPoint.antall),
          label: data.filnavn,
          borderColor: colors[index],
          borderWidth: 2,
          fill: false,
          hitRadius: 5,
          lineTension: 0,
          pointBackgroundColor: colors[index],
          pointBorderWidth: 0,
          pointRadius: 2,
        })),
      }
      this.setState({
        pending: false,
      }, this.chartUpdate)
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
