import React from "react";

export  class StackDefault extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span className="alert-handler-span">
          Parameters from Kapacitor Configuration
        </span>

        <div className="row alert-handler-value-config alert-handler-setting">
          <a href="#">
            <span className="fa fa-gear">
              Exit this rule and Edit Configuration
            </span>
          </a>
        </div>

        <label className="alert-handler-label">Webhook URL:</label>
        <div className="row alert-handler-value-config">
          <i className="fa fa-check icon-color"></i> &nbsp;&nbsp;&nbsp;
          <label>Value set in config</label>
        </div>

        <span className="alert-handler-span">
          Parameters for this Alert Handler
        </span>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">Chanel:</label>
            <input
              type="text"
              className="form-control"
              placeholder="ex: #my_favorite_channel"
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="ex: my_favorite_Username"
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">Emoji:</label>
            <input
              type="text"
              className="form-control"
              placeholder="thumbup:"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}


