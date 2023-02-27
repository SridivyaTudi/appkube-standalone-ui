import React, { Component } from "react";

class SlaCentral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slaData: undefined,
      dataLoaded: false,
    };
  }

  componentDidMount = () => {
    fetch("http://34.199.12.114:5057/api/analytics/sla-central")
      .then((response) => response.json())
      .then((result) => {
        this.setState({ slaData: result });
      });
  };

  handletableColor = (number) => {
    let color = "";
    if (number > 98) {
      color = "green";
    } else if (number > 75 && number < 90) {
      color = "orange";
    } else {
      color = "red";
    }
    return color;
  };

  showTableData = () => {
    const { slaData } = this.state;
    let tableHTML = [];
    if (slaData) {
      let products = Object.keys(slaData);
      products.forEach((product, index) => {
        const productData = slaData[product];
        tableHTML.push(
          <tr key={`${index}-sla-central`}>
            <td className="products"> {product} </td>
            <td className={this.handletableColor(productData.Performance)}>
              {productData.Performance}%
            </td>
            <td className={this.handletableColor(productData.Availability)}>
              {productData.Availability}%
            </td>
            <td className={this.handletableColor(productData.Reliability)}>
              {productData.Reliability}%
            </td>
            <td className={this.handletableColor(productData.Security)}>
              {productData.Security}%
            </td>
            <td className={this.handletableColor(productData["End Usage"])}>
              {productData["End Usage"]}%
            </td>
          </tr>
        );
      });
      return tableHTML;
    }
  };

  render() {
    const {} = this.props;

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
                  <tbody>{this.showTableData()}</tbody>
                </table>
              </div>
              <div className="metrics-performance">
                <div className="performance-box green">
                  <span>❯</span>98%
                </div>
                <div
                  className="performance-box"
                  style={{ marginright: 2, paddingLeft: 0 }}
                >
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
