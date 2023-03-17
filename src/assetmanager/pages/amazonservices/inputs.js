import React, { Component } from "react";

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputList: [],
    };
  }

  render() {
    return (
      <>
        <div className="Filters-box">
          <p>Select and add Filters</p>
          <span>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </span>
        </div>
        <div className="showing-export">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="showing-heading">Showing results 0 of 0</div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="export-files">
                <span>
                  <i className="fa fa-clock-o"></i>
                </span>
                <p>Recent</p>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
              <div className="search-box form-group">
                <input
                  type="text"
                  className="control-form"
                  placeholder="Search"
                  value=""
                />
                <button>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-container">
          <table width="100%" className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Source of input</th>
                <th>Type of input</th>
                <th>Dashboards</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* <tbody>{this.renderInputs()}</tbody> */}
          </table>
        </div>
      </>
    );
  }
}

export default Inputs;
