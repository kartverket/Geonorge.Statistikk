import React, { Component } from 'react'
import { DATE_DEFAULT } from './Constants'

import moment from 'moment'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './routes/Home'
import StatsDetail from './routes/StatsDetail'
import StatsList from './routes/StatsList'
import StatsOverview from './routes/StatsOverview'

import Header from './components/Header'
import Navigation from './components/Navigation'

class App extends Component {
  constructor () {
    super()
    const date = moment()
    this.state = {
      end: date.format(DATE_DEFAULT),
      start: date.subtract(7, 'days').format(DATE_DEFAULT),
    }
  }
  render() {
    const { end, start } = this.state
    return (
      <Router basename="/statistikk">
        <div>
          <Header />
          <Route component={Navigation} path="/" />
          <Route component={Home} exact path="/" />
          <Route exact path="/:_basename/:_category/:_key/" render={(props) => <StatsDetail {...props} end={end} start={start} updateDates={this.updateDates.bind(this)} />} />
          <Route exact path="/:_basename/:_category/" render={(props) => <StatsList {...props} end={end} start={start} updateDates={this.updateDates.bind(this)} />} />
          <Route exact path="/:_basename/" render={(props) => <StatsOverview {...props} end={end} start={start} updateDates={this.updateDates.bind(this)} />} />
        </div>
      </Router>
    )
  }
  updateDates (start, end) {
    this.setState({
      end: end,
      start: start,
    })
  }
}

export default App
