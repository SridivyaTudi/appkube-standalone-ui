import React, { Component } from "react";

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <div className="environment-table-section">
        <div className="table">
          <table className="overview">
            <thead>
              <tr>
                <th>
                  <i className="m-r-1 fas fa-sort-down"></i>
                  <strong>Severity</strong>
                </th>
                <th>Created Time</th>
                <th>Sources</th>
                <th>Title</th>
                <th>Assignee</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="6" >
                  <div className="billing-section">
                    <div className="billing-details">
                    <i class="fal fa-question-circle"></i>
                      <p>Billing details will be displayed here</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Billing;
