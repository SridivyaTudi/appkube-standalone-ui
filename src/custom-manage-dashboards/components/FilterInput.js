import React, { Component } from "react";

class FilterInput extends Component {
  render() {
    return (
      <div className="form-group search-control m-b-0">
        <button className="btn btn-search">
          <i className="fa fa-search" />
        </button>
        <input type="text" className="input-group-text" placeholder="Search" />
      </div>
    );
  }
}

export default FilterInput;
