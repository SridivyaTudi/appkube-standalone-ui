import React, { Component } from "react";
import { Link } from "react-router-dom";
class Glue extends Component {
  render() {
    return (
      <div className="mesh-iam-service">
        <div className="account-list-conitant">
          <div className="row">
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>10</strong>
                  <p>job Run</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>20</strong>
                  <p>Successful job</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>15</strong>
                  <p>failed job</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>10</strong>
                  <p>Total tables</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>08</strong>
                  <p>Crawlers Run</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>05</strong>
                  <p>Total Database</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>03</strong>
                  <p>Total Partitions</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>06</strong>
                  <p>Total Connections</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>25</strong>
                  <p>Data Catalog Size</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>15</strong>
                  <p>Total Schemas</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>50</strong>
                  <p>Total Triggers</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>20</strong>
                  <p>Daily Crawler Runtime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Glue;
