import React, { Component } from 'react'

class SortPicker extends Component {
  render() {
    return (
      <div className='d-block'>
        <select name="selectedFruit">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>
      </div>
    )
  }
}

export default SortPicker;