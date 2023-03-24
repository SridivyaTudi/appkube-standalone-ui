import React, { Component } from "react";

class ThreatAndSecurityEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              <div className="fliter">
                <div className="fliter-toggel">
                    <i className="fa fa-clock-o"></i>
                  <span>Recent</span>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
              <div className="search-box">
                <form>
                  <div className="form-group search-control-group">
                    <input
                      type="text"
                      className="input-group-text"
                      placeholder="Search"
                      value=""
                    />
                    <button>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="table-container">
          <table width="100%" className="table">
            <thead>
              <tr>
                <th>Severity</th>
                <th>Created Time</th>
                <th>Sources</th>
                <th>Title</th>
                <th>Assignee</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6}></td>
              </tr>
              <tr>
                <td colSpan={6}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default ThreatAndSecurityEvents;
