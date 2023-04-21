import React, { Component } from "react";

export class Hipchat extends Component {
  render() {
    return (
      <React.Fragment>
        <span className="alert-handler-alerta-span">
          This Handler is not enabled
        </span>
        <div className="exit-rule-config">
          <a href="#" className="exit-rule-config-box">
            <span>Exit Rule and Configure this Alert Handler</span>
          </a>
        </div>
      </React.Fragment>
    );
  }
}
