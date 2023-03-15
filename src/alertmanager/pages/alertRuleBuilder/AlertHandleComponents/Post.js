import React from "react";

export class Post extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span className="alert-handler-span">
          Parameters for this Alert Handler
        </span>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">
              HTTP endpoint for POST request
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="ex:http://example.com/api/alert"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">Header Key</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">Heade Value</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

