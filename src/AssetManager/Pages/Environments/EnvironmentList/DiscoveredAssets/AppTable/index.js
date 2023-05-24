import React, { Component } from "react";
import Lambda from "../../../../../../assets/img/assetmanager/cloud-managed-icon1.png";
import S3 from "../../../../../../assets/img/assetmanager/cloud-managed-icon2.png";
import SQS from "../../../../../../assets/img/assetmanager/cloud-managed-icon3.png";
import SNS from "../../../../../../assets/img/assetmanager/cloud-managed-icon4.png";
import Redshift from "../../../../../../assets/img/assetmanager/cloud-managed-icon5.png";
import RDS from "../../../../../../assets/img/assetmanager/cloud-managed-icon6.png";
import AppMesh from "../../../../../../assets/img/assetmanager/cloud-managed-icon7.png";
import Kinesis from "../../../../../../assets/img/assetmanager/cloud-managed-icon8.png";
import TimeSeries from "../../../../../../assets/img/assetmanager/cloud-managed-icon9.png";
import Athena from "../../../../../../assets/img/assetmanager/cloud-managed-icon10.png";
import dummyData from "./../dummy.json";

class AppTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serivceImages: [
        Lambda,
        S3,
        SQS,
        SNS,
        Redshift,
        RDS,
        AppMesh,
        Kinesis,
        TimeSeries,
        Athena,
      ],
    };
  }

  render() {
    const {} = this.state;
    return (
      <>
        <div className="cloud-managed-section">
          <h4> Cloud Managed Services</h4>
          <div className="cloud-managed-cards">
            {dummyData.cloudManagedServices.map((item, index) => {
              return (
                <div className="service-card active">
                  <div className="service-icon">
                    <img
                      src={this.state.serivceImages[index]}
                      alt="serviceicon"
                    />
                  </div>
                  <div className="service-contant">
                    <label>{item.name}</label>
                    <strong>{item.value}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="resources-section">
          <h4>Lambda Resources</h4>
          <div className="account-list-conitant">
            {dummyData.lambdaResources.map((item) => {
              return (
                <div className="account-list-details">
                  <div className="d-block">
                    <strong>{item.value}</strong>
                    <p>{item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="performance-section">
          <div className="performance-head">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-5">
                <h4>Lambda Performance</h4>
              </div>
              <div className="col-lg-7">
                <div className="head-right">
                  <button className="light-blue-button m-b-0">
                    <i class="far fa-stream p-r-10"></i>
                    fillter
                  </button>
                  <button className="light-blue-outline m-b-0 m-r-0">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="environment-table-section">
            <div className="table discovered-assets-table">
              <table className="overview">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Performance</th>
                    <th>Availability</th>
                    <th>Security</th>
                    <th>Data Protection</th>
                    <th>User Exp</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.lambdaPerformance.map((item) => {
                    return (
                      <tr>
                        <td>
                          <strong>
                            <a href="#">{item.name}</a>
                          </strong>
                          <i className="fas fa-caret-right m-l-1"></i>
                        </td>
                        <td>
                          <div className="box green">
                            <i className="far fa-check"></i>
                          </div>
                        </td>
                        <td>
                          <div className="box orange">
                            <i class="fas fa-sort-up"></i>
                          </div>
                        </td>
                        <td>
                          <div className="box red">
                            <i class="far fa-stop-circle"></i>
                          </div>
                        </td>
                        <td>
                          <div className="box red">
                            <i class="far fa-stop-circle"></i>
                          </div>
                        </td>
                        <td>
                          <div className="box green">
                            <i className="far fa-check"></i>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AppTable;
