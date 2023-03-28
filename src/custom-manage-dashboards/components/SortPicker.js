import React, { Component } from 'react'

class SortPicker extends Component {
  render() {
    return (
      <div className="source-content">
        <div className="description-content">
          <select name="selectedFruit" className="input-group-text">
            <option value="apple">Filter by starred</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
          </select>
        </div>
      </div>
    )
  }
}

export default SortPicker;