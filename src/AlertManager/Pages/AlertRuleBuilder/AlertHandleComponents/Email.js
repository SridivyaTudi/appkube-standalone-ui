import React, { Component } from "react";

export class Email extends Component {
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

        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">From Email:</label>
            <input
              type="text"
              className="form-control"
              value="mohdzakirr12345@gmail.com"
              readOnly
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">SMTP Host:</label>
            <input
              type="text"
              className="form-control"
              value="34.207.141.88"
              readOnly
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">SMTP Port:</label>
            <input type="text" className="form-control" value="25" readOnly />
          </div>
        </div>

        <span className="alert-handler-span">
          Parameters for this Alert Handler
        </span>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">
              Recipient E-mail Addresses: (separated by spaces)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="ex: bob@domain.com susan@domain.com"
            />
          </div>
        </div>

        {/* <div className="email-message-box"> */}
        <div className="email-message-examplex">
          <textarea placeholder="Enter the body for your email here. Can contain html"></textarea>
        </div>
        {/* </div> */}
      </React.Fragment>
    );
  }
}
