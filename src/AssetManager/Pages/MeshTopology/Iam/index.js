import React, { Component } from "react";
import { Link } from "react-router-dom";

class Iam extends Component {
  render() {
    return (
      <div className="mesh-iam-service">
        <div className="account-list-conitant">
          <div className="row">
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>450</strong>
                  <p>Iam Roles</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>280</strong>
                  <p>Iam Policies</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>15</strong>
                  <p>Datalake Roles</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>10</strong>
                  <p>Lakeformation Key Access</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>08</strong>
                  <p>Catalog Permission</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>05</strong>
                  <p>Deleted Roles</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>03</strong>
                  <p>Deleted Policies</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>06</strong>
                  <p>Roles with Trust Relationship Exemptions</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>25</strong>
                  <p>Roles with No Active Policies</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>15</strong>
                  <p>Policies with No Attached Roles</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>50</strong>
                  <p>Roles with Access Advisor</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="account-list-details">
                <div className="d-block">
                  <strong>20</strong>
                  <p>Policies with Access Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Iam;
