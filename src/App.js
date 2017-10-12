import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './routes/Home'
import TableView from './routes/TableView'

import Header from './components/Header'
import Navigation from './components/Navigation'

class App extends Component {
  render() {
    const { props } = this
    console.log(props)
    return (
      <Router basename="/statistikk">
        <div>
          <Header />
          <Route component={Navigation} path="/" />
          <Route component={Home} exact path="/" />
          <Route exact path="/datasett/" render={(props) => (
            <TableView {...props} service="datasett" title="Datasett" />
          )} />
          <Route exact path="/eiere/" render={(props) => (
            <TableView {...props} service="eiere" title="Eiere" />
          )} />
          <Route exact path="/projeksjoner/" render={(props) => (
            <TableView {...props} service="projeksjoner" title="Projeksjoner" />
          )} />
          <Route exact path="/formater/" render={(props) => (
            <TableView {...props} service="formater" title="Formater" />
          )} />
        </div>
      </Router>
    )
  }
}

export default App
