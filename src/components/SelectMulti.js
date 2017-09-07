import React from 'react'
import PropTypes from 'prop-types'

import SelectSingle from './SelectSingle'

class SelectMulti extends SelectSingle {
  getSelected () {
    const { selected } = this.props
    return selected
  }
  itemAdd (id) {
    const { items } = this.state
    const { apiKey, apiName, selected } = this.props
    const selectedIndex = selected.findIndex( ({id:_id}) => _id === id )
    if (selectedIndex === -1) {
      const item = items.find( ({ [apiKey]:_id }) => _id === id )
      const { [apiName]:name } = item
      selected.push({
        id: id,
        name: name,
      })
      this.props.onUpdate(selected)
    }
  }
  itemRemove (id) {
    const { selected } = this.props
    const selectedIndex = selected.findIndex( ({id:_id}) => _id === id )
    if (selectedIndex !== -1) {
      selected.splice(selectedIndex, 1)
      this.props.onUpdate(selected)
    }
  }
  selectedItem = (item) => (
    <li className="item-on" key={item.id}>
      <span className="truncate">{item.name}</span>
      <button className="close" onClick={this.itemRemove.bind(this, item.id)} type="button" />
    </li>
  )
}

SelectMulti.propTypes = {
  selected: PropTypes.array.isRequired,
}

export default SelectMulti
