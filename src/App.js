import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './routes/Home'
import StatsDetail from './routes/StatsDetail'
import StatsList from './routes/StatsList'
import StatsOverview from './routes/StatsOverview'

import Header from './components/Header'
import Navigation from './components/Navigation'

class App extends Component {
  render() {
    return (
      <Router basename="/statistikk">
        <div>
          <Header />
          <Route component={Navigation} path="/" />
          <Route component={Home} exact path="/" />
          <Route component={StatsDetail} exact path="/:_basename/:_category/:_key/" />
          <Route component={StatsList} exact path="/:_basename/:_category/" />
          <Route component={StatsOverview} exact path="/:_basename/" />
        </div>
      </Router>
    )
  }
}

export default App
