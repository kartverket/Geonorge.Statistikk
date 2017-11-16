import Stats from './Stats'
import * as Constants from '../Constants'

import React from 'react'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import Breadcrumbs from '../components/Breadcrumbs'
import Heading from '../components/Heading'

class Home extends Stats {
  state = {
    dataYear: {},
    pending: false,
  }
  componentDidMount () {
    this.setState({
      pending: true,
    }, this.dataLoad)
  }
  render () {
    const { dataYear } = this.state
    const { results = [], total = 0 } = dataYear
    return (
      <div className="container">
        <Breadcrumbs />
        <Heading title="Statistikk" />
        <div className="row">
          <div className="col-sm-6">
            <h2>Antall nedlastede filer - pr år</h2>
            <p>Viser alle etater, som har direkte nedlasting via Geonorge. Nedlastinger via egne nettsteder er ikke del av infrastrukturen.</p>
            <p>Periode: Fra start av måling i 2015 og fram til i dag.</p>
            <p>Totalt: <b>{total.toLocaleString()}</b> nedlastinger.</p>
          </div>
          <div className="col-sm-6">
            <ResponsiveContainer height={200} width="100%">
              <BarChart data={results}>
                <Tooltip />
                <Bar dataKey="downloads" fill="#fe5000" maxBarSize={20} />
                <XAxis dataKey="year" />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
  dataLoad () {
    const url = `${Constants.API_URL}/`
    fetch(url).then(this.toJSON)
    .then( response => {
      this.setState({
        dataYear: response,
        pending: false,
      })
    })
  }
}

export default Home
