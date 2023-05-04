import React, { Component } from 'react';

class WafTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <div className="environment-table-section" style={{ height: '300px' }}>
        <div className="table">
          <table className="overview">
            <thead>
              <tr>
                <th>Name</th>
                <th>Performance</th>
                <th>Availability</th>
                <th>Security</th>
                <th>Data Protection</th>
                <th>User Exp</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default WafTable;
