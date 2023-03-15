import React, { Component } from "react";

export class Exec extends Component {
  render() {
    return (
      <React.Fragment>
        <span className="alert-handler-span">
          Parameters for this Alert Handler
        </span>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 alert-handler-datainput">
            <label className="alert-handler-label">
              command(arguments separated by spaces):
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="command argument"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
