import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './routes/Home'
import Dataset from './routes/Dataset'
import Datasets from './routes/Datasets'
import Downloads from './routes/Downloads'
import Header from './components/Header'
import Navigation from './components/Navigation'

class App extends Component {
  render() {
    return (
      <Router basename="/statistikk">
        <div>
          <Header />
          <Navigation />
          <Route component={Home} exact path="/" />
          <Route component={Datasets} exact path="/datasett/" />
          <Route component={Dataset} exact path="/datasett/:id([0-9]+)/" />
          <Route component={Downloads} path="/nedlastinger" />
        </div>
      </Router>
    )
  }
}

export default App
