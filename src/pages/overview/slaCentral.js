import React, { Component } from 'react';


class SlaCentral extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;
    const {} = this.state;

    return (
      <div className="overview-container">
        <div className="applications-container">
          <div className="header">
            <div className="heading">SLA Central</div>
          </div>
          <div className="applications-inner-container">
            <div className="metrics-table">
              <div className="metrics-table-inner">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="products"> Products </th>
                      <th> Performance </th>
                      <th> Availability </th>
                      <th> Reliability </th>
                      <th> Security </th>
                      <th> End Usage </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="products"> HRMS </td>
                      <td className="green"> 99.05% </td>
                      <td className="green"> 99.00% </td>
                      <td className="green"> 99.00% </td>
                      <td className="green"> 99.07% </td>
                      <td className="green"> 99.01% </td>
                    </tr>
                    <tr>
                      <td className="products"> TRAVEL </td>
                      <td className="green"> 99.04% </td>
                      <td className="green"> 98.97% </td>
                      <td className="green"> 98.97% </td>
                      <td className="green"> 98.91% </td>
                      <td className="green"> 98.97% </td>
                    </tr>
                    <tr>
                      <td className="products"> LMS </td>
                      <td className="green"> 98.96% </td>
                      <td className="green"> 98.99% </td>
                      <td className="green"> 98.99% </td>
                      <td className="green"> 99.09% </td>
                      <td className="green"> 99.02% </td>
                    </tr>
                    <tr>
                      <td className="products"> INVENTORY </td>
                      <td className="green"> 99.03% </td>
                      <td className="green"> 99.00% </td>
                      <td className="green"> 99.02% </td>
                      <td className="green"> 98.96% </td>
                      <td className="green"> 99.04% </td>
                    </tr>
                    <tr>
                      <td className="products"> MONITORING </td>
                      <td className="green"> 98.94% </td>
                      <td className="green"> 99.05% </td>
                      <td className="green"> 99.03% </td>
                      <td className="green"> 99.01% </td>
                      <td className="green"> 99.02% </td>
                    </tr>
                    <tr>
                      <td className="products"> TestCentral </td>
                      <td className="green"> 98.96% </td>
                      <td className="green"> 98.94% </td>
                      <td className="green"> 98.99% </td>
                      <td className="green"> 99.02% </td>
                      <td className="green"> 99.04% </td>
                    </tr>
                    <tr>
                      <td className="products"> EMS </td>
                      <td className="green"> 99.07% </td>
                      <td className="green"> 99.00% </td>
                      <td className="green"> 98.98% </td>
                      <td className="green"> 99.00% </td>
                      <td className="green"> 98.96% </td>
                    </tr>
                    <tr>
                      <td className="products"> PROCUREMENT </td>
                      <td className="green"> 99.11% </td>
                      <td className="green"> 99.02% </td>
                      <td className="green"> 98.98% </td>
                      <td className="green"> 99.04% </td>
                      <td className="green"> 98.99% </td>
                    </tr>
                    <tr>
                      <td className="products"> SALES </td>
                      <td className="green"> 98.97% </td>
                      <td className="green"> 98.95% </td>
                      <td className="green"> 99.03% </td>
                      <td className="green"> 99.00% </td>
                      <td className="green"> 99.07% </td>
                    </tr>
                    <tr>
                      <td className="products"> INTERNAL AUDIT </td>
                      <td className="green"> 98.89% </td>
                      <td className="green"> 99.02% </td>
                      <td className="green"> 99.06% </td>
                      <td className="green"> 98.91% </td>
                      <td className="green"> 98.97% </td>
                    </tr>
                    <tr>
                      <td className="products"> DIGITAL AUCTION </td>
                      <td className="green"> 99.00% </td>
                      <td className="green"> 99.08% </td>
                      <td className="green"> 98.93% </td>
                      <td className="green"> 98.98% </td>
                      <td className="green"> 98.99% </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="metrics-performance">
                <div className="performance-box green">
                  <span>❯</span>98%
                </div>
                <div className="performance-box" style={{ marginright: 2, paddingLeft: 0}}>
                  75%<span>❯</span>
                </div>
                <div className="performance-box orange">
                  <span>❯</span>90%
                </div>
                <div className="performance-box red">
                  <span>❮</span>75%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SlaCentral;
