import React, { Component } from "react";

class TagFilter extends Component {
  render() {
    return (
      <div className='source-content'>
        <select name="selectedFruit" className="input-group-text">
        <option value="apple">Filter by starred</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>
      </div>
    );
  }
}

export default TagFilter;
