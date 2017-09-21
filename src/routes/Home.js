import React, { Component } from 'react'
import { BarChart, Bar, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import Heading from '../components/Heading'

const API_URL = 'https://status.geonorge.no/statistikkApi'
const toJSON = response => response.json()

class Home extends Component {
  state = {
    monthData: [],
    pending: false,
    yearActive: 0,
    yearData: [],
  }
  componentDidMount () {
    this.setState({
      pending: true,
    }, this.yearDataLoad)
  }
  componentDidUpdate (prevProps, prevState) {
    const { pending:wasPending } = prevState
    const { pending:isPending } = this.state
    if (wasPending === false && isPending === true) {
      document.getElementById('modal-backdrop').classList.remove('d-none')
    }
    if (wasPending === true && isPending === false) {
      document.getElementById('modal-backdrop').classList.add('d-none')
    }
  }
  render() {
    const { monthData, yearActive, yearData } = this.state
    return (
      <div className="container">
        <Heading title="Hjem" />
        <div className="row">
          <div className="col-sm-6">
            <h3>Nedlastinger, per år</h3>
            <ResponsiveContainer height={400} width="100%">
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="count" onClick={this.handleYearClick.bind(this)}>
                  {yearData.map( (entry, index) => 
                    (<Cell cursor="pointer" fill={entry.key === yearActive ? '#fe5000' : '#b6afa8' } key={`cell-${index}`}/>)
                  )}
                </Bar>
                <XAxis dataKey="name" />
                <YAxis tickFormatter={this.formatThousand} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="col-sm-6">
            <h3>Nedlastinger per måned, for <b>{yearActive}</b></h3>
            <ResponsiveContainer height={400} width="100%">
              <BarChart data={monthData} layout="vertical">
                <XAxis tickFormatter={this.formatThousand} type="number"/>
                <YAxis dataKey="name" padding={{ left: 10, right: 10 }} tickFormatter={ value => value.substr(0, 3) } type="category" />
                <CartesianGrid strokeDasharray="3 3"/>
                <Bar dataKey="count" fill="#0056b3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
  formatThousand = value => value > 1000 ? `${value / 1000}k` : value
  handleYearClick (data, index) {
    const { yearActive } = this.state
    if (yearActive !== data.key) {
      this.setState({
        pending: true,
        yearActive: data.key,
      }, this.monthDataLoad)
    }
  }
  monthDataLoad () {
    const { yearActive } = this.state
    const url = `${API_URL}/intervall/${yearActive}/`
    fetch(url).then(toJSON)
    .then( response => {
      this.setState({
        monthData: response.results,
        pending: false,
      })
    })
  }
  yearDataLoad () {
    const url = `${API_URL}/intervall/`
    fetch(url).then(toJSON)
    .then( response => {
      const yearActive = response.results.reduce( (total, item) => total > item.key ? total : item.key )
      this.setState({
        yearActive: yearActive,
        yearData: response.results,
      }, this.monthDataLoad)
    })
  }
}

export default Home
