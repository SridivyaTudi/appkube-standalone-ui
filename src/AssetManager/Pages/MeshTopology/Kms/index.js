import React, { Component } from "react";
import { Link } from "react-router-dom";

class Kms extends Component {
  render() {
    return (
      <div className="mesh-iam-service">
        <div className="account-list-conitant">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>487</strong>
                  <p>Total KMS Keys</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>162</strong>
                  <p>Enabled Key Rotation</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>325</strong>
                  <p>Disabled Key Ratation</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>07</strong>
                  <p>Key Expiring in 30 days</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>08</strong>
                  <p>Expired keys</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>02</strong>
                  <p>Key with Policy Violation</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>01</strong>
                  <p>Key with Orphan grant</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>02</strong>
                  <p>Alias Modification</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>01</strong>
                  <p>ARN Modifications</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>03</strong>
                  <p>Key Revocation</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>01</strong>
                  <p>Unrestricted access</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-4">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>15</strong>
                  <p>Cross account access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Kms;
