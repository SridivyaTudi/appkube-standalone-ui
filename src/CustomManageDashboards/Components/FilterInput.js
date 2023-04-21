import React, { Component } from "react";

class FilterInput extends Component {
  render() {
    return (
      <div className="search-box">
        <form>
          <div className="form-group search-control-group m-b-0">
            <input
              type="text"
              className="input-group-text"
              placeholder="Search"
            />
            <button className="btn btn-search">
              <i className="fa fa-search" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default FilterInput;
