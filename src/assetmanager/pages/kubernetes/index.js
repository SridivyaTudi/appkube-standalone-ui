import React, { Component } from "react";
// import { configFun } from '../../config';

class Kubernetes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.config = configFun(props.meta.jsonData.apiUrl, props.meta.jsonData.mainProductUrl);
  }

  render() {
    return (
      <div className="asset-container">
        <div className="service-container">
          {/* <iframe src={this.config.octantURL} frameBorder="0" width="100%" height="100%"></iframe> */}
          <iframe src={""} frameBorder="0" width="100%" height="100%"></iframe>
        </div>
      </div>
    );
  }
}
export default Kubernetes;
