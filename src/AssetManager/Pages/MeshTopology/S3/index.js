import React, { Component } from "react";
import { Link } from "react-router-dom";

class S3 extends Component {
  render() {
    return (
      <div className="mesh-iam-service">
       <div className="account-list-conitant">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>450</strong>
                  <p>Total Buckets</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>9TB</strong>
                  <p>Size Buckets</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>14</strong>
                  <p>versioning enabled</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>06</strong>
                  <p>object lock enabled</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>13</strong>
                  <p>Bucket Policies</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>05</strong>
                  <p>Requester Pays enabled</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>03</strong>
                  <p>hosting enabled</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>06</strong>
                  <p>public write access</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>25</strong>
                  <p>public read access</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>15</strong>
                  <p>replication enabled</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>50</strong>
                  <p>life cycle Policies</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>20</strong>
                  <p>public access blocked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default S3;
