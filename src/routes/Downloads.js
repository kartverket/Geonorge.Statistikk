import React, { Component } from 'react'
import moment from 'moment'
import Chart from 'chart.js'

import Heading from '../components/Heading'

const DATE_FORMAT = 'YYYY-MM-DD'

class Downloads extends Component {
  state = {
    data: [],
    dirty: false,
    filename: 'illustrasjonskart_Norgeskart.zip',
    gte: moment({
      day: 1,
    }).format(DATE_FORMAT),
    lte: moment({
      day: moment().daysInMonth(),
    }).format(DATE_FORMAT),
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
                stepSize: 1,
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
  componentDidUpdate () {
    const { dirty } = this.state
    if (dirty) {
      this.setState({
        dirty: false,
      }, this.draw)
    }
  }
  render () {
    const { filename, gte, lte } = this.state
    return (
      <div>
        <div className="w3-container">
          <Heading title="Nedlastinger" />
        </div>
        <div className="w3-row-padding">
          <div className="w3-col m6">
            <label htmlFor="filename">Filnavn</label>
            <input className="w3-input w3-border" id="filename" name="filename" onChange={this.changeHandler} value={ filename } />
          </div>
          <div className="w3-col m3">
            <label htmlFor="gte">Fra</label>
            <input className="w3-input w3-border" id="gte" name="gte" onChange={this.changeHandler} value={ gte } />
          </div>
          <div className="w3-col m3">
            <label htmlFor="lte">Til</label>
            <input className="w3-input w3-border" id="lte" name="lte" onChange={this.changeHandler} value={ lte } />
          </div>
          <div className="w3-col m12">
            <button className="w3-button w3-gray w3-right w3-margin-top" onClick={this.clickHandler.bind(this)} type="button">Hent</button>
          </div>
        </div>
        <hr />
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
  changeHandler = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }
  clickHandler () {
    this.setState({
      pending: true,
    }, this.dataLoadFetch)
  }
  dataLoadFetch () {
    const { filename , gte , lte } = this.state
    fetch(`https://status.geonorge.no/statistikkApi/nedlastinger?filnavn=${filename}&fra=${gte}&til=${lte}`)
    .then( r => r.json() )
		.then( result => {
      this.setState({
        data: result,
        dirty: true,
        pending: false,
      })
    })
  }
  draw () {
    const { data, filename } = this.state
    this.chart.data = {
      labels: data.map(dataPoint => {
        return dataPoint.dato
      }),
      datasets: [{
        data: data.map(dataPoint => {
          return dataPoint.nedlastinger
        }),
        label: filename,
        borderColor: '#fe5000',
        borderWidth: 2,
        fill: false,
        hitRadius: 5,
        lineTension: 0,
        pointBackgroundColor: '#fe5000',
        pointBorderWidth: 0,
        pointRadius: 0,
      }]
    }
    this.chart.update()
  }
}

export default Downloads;
