import React, { Component } from 'react';

export class Log extends Component {
  render() {
    return (
      <React.Fragment>
        <span className="alert-handler-span">Parameters for this Alert Handler</span>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">File Path for Log File:</label>
            <input type="text" className="form-control" placeholder="ex: /tmp/alerts.log" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
