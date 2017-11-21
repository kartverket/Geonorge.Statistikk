import Stats from './Stats'
import * as Constants from '../Constants'

import qs from 'query-string'
import React from 'react'
import { NavLink } from 'react-router-dom'

import Breadcrumbs from '../components/Breadcrumbs'
import Durations from '../components/Durations'
import Heading from '../components/Heading'
import StatusBar from '../components/StatusBar'

class StatsOverview extends Stats {
  state = {
    pending: false,
    response: {},
  }
  componentDidMount () {
    this.setState({
      pending: true,
    }, this.dataLoad)
  }
  render () {
    const { location = {} } = this.props
    const { pathname = '/' } = location
    const { duration = Constants.DEFAULT_DURATION } = qs.parse(location.search)
    const { response } = this.state
    const { description = '', gte = '', lte = '', name = '-', paths = [], results = [], total = 0 } = response
    const lines = description.length === 0 ? [] : description.split('\n')
    return (
      <div className="container">
        <Breadcrumbs paths={paths} />
        <Heading title={name} />
        <div className="btn-toolbar justify-content-between my-3" role="toolbar">
          <StatusBar gte={gte} lte={lte} total={total} />
          <Durations duration={duration} pathname={pathname} />
        </div>
        <div className="row">
          <div className="col-sm-4">
            {lines.map( (line, index) => (
              <p className={index === 0 ? 'lead' : null} key={`line-${index}`}>{line}</p>
            ) )}
            <p>Totalt: <b>{total.toLocaleString()}</b>.</p>
          </div>
          <div className="col-sm-8">
            <div className="list-group">
              {results.slice().sort( (a, b) => {
                let order = 0
                if (a.count < b.count) order = 1
                if (a.count > b.count) order = -1
                return order
              } ).map( (item, index) => (
                <NavLink className="list-group-item list-group-item-action flex-column align-items-start" key={item.id} to={{
                    pathname: `${pathname}${item.id}/`,
                    search: `?duration=${duration}`,
                  }}>
                  <div className="d-flex w-100 justify-content-between">
                    <span>{item.name}</span>
                    <span>{item.count.toLocaleString()}</span>
                  </div>
                  {item.hasOwnProperty('percent') === false ? null : (
                    <div className="progress mt-1 rounded-0" style={{ height: '8px' }}>
                      <div aria-valuemax="100" aria-valuemin="0" aria-valuenow={item.percent} className="progress-bar" role="progressbar" style={{ width: `${item.percent.toFixed(2)}%` }} />
                    </div>
                  )}
                </NavLink>
              ), this ) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StatsOverview
