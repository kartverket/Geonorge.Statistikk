import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './routes/Home'
import Downloads from './routes/Downloads'

class App extends Component {
  render() {
    return (
      <Router basename="/statistikk">
        <div>
          <div className="page-header">
            <div className="container">
              <h1>Geonorge - Statistikk</h1>
            </div>
          </div>
          <Route component={Home} exact path="/" />
          <Route component={Downloads} path="/nedlastinger" />
        </div>
      </Router>
    )
  }
}

export default App
