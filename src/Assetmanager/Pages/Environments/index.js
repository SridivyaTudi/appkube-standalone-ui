import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jobs from "../../../assets/img/jobs.png";

class Environments extends Component {
  render() {
    return (
      <div className="asset-container">
        <div className="environments-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Environments</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <Link className="asset-white-button min-width-inherit">
                    <img alt="jobs" src={Jobs} style={{ maxWidth: "20px" }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 environments-services-container">
            <div className="row"></div>
          </div>
        </div>
      </div>
    );
  }
}
export default Environments;
