import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import DetailView from './routes/DetailView'
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
          <Route exact path="/datasett/:id([0-9]+)/" render={(props) => (
            <DetailView {...props} service="datasets" />
          )} />
          <Route exact path="/datasett/" render={(props) => (
            <TableView {...props} service="datasets" title="Datasett" />
          )} />
          <Route exact path="/eiere/:id([a-z\-]+)/" render={(props) => (
            <DetailView {...props} service="owners" />
          )} />
          <Route exact path="/eiere/" render={(props) => (
            <TableView {...props} service="owners" title="Eiere" />
          )} />
          <Route exact path="/projeksjoner/:id([0-9a-z]+)/" render={(props) => (
            <DetailView {...props} service="projections" />
          )} />
          <Route exact path="/projeksjoner/" render={(props) => (
            <TableView {...props} service="projections" title="Projeksjoner" />
          )} />
          <Route exact path="/formater/:id([0-9a-z\-]+)/" render={(props) => (
            <DetailView {...props} service="formats" />
          )} />
          <Route exact path="/formater/" render={(props) => (
            <TableView {...props} service="formats" title="Formater" />
          )} />
        </div>
      </Router>
    )
  }
}

export default App
