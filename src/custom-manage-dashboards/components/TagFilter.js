import React, { Component } from "react";

class TagFilter extends Component {
  render() {
    return (
      <div className=" description-content">
        <select
          className="input-group-text"
          name="environment">
          <option >Select Environment</option>
          <option >1</option>
          <option >2</option>
          <option >3</option>
        </select>
      </div>
    );
  }
}

export default TagFilter;
