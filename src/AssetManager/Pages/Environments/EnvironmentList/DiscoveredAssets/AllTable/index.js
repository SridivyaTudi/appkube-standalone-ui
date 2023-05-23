import React, { Component } from "react";
import CloudManagedIcon1 from "../../../../../../assets/img/assetmanager/cloud-managed-icon1.png";
import CloudManagedIcon2 from "../../../../../../assets/img/assetmanager/cloud-managed-icon2.png";
import CloudManagedIcon3 from "../../../../../../assets/img/assetmanager/cloud-managed-icon3.png";
import CloudManagedIcon4 from "../../../../../../assets/img/assetmanager/cloud-managed-icon4.png";
import CloudManagedIcon5 from "../../../../../../assets/img/assetmanager/cloud-managed-icon5.png";
import CloudManagedIcon6 from "../../../../../../assets/img/assetmanager/cloud-managed-icon6.png";
import CloudManagedIcon7 from "../../../../../../assets/img/assetmanager/cloud-managed-icon7.png";
import CloudManagedIcon8 from "../../../../../../assets/img/assetmanager/cloud-managed-icon8.png";
import CloudManagedIcon9 from "../../../../../../assets/img/assetmanager/cloud-managed-icon9.png";
import CloudManagedIcon10 from "../../../../../../assets/img/assetmanager/cloud-managed-icon10.png";

class AllTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return (
      <>
        <div className="cloud-managed-section">
          <h4> Cloud Managed Services</h4>
          <div className="cloud-managed-cards">
            <div className="service-card active">
              <div className="service-icon">
                <img src={CloudManagedIcon1} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>Lambda</label>
                <strong>235</strong>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src={CloudManagedIcon2} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>S3</label>
                <strong>146</strong>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src={CloudManagedIcon3} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>SQS</label>
                <strong>06</strong>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src={CloudManagedIcon4} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>SNS</label>
                <strong>06</strong>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src={CloudManagedIcon5} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>Redshift</label>
                <strong>235</strong>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src={CloudManagedIcon6} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>RDS</label>
                <strong>235</strong>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src={CloudManagedIcon7} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>AppMesh</label>
                <strong>235</strong>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src={CloudManagedIcon8} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>Kinesis</label>
                <strong>235</strong>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src={CloudManagedIcon9} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>Time-Series</label>
                <strong>235</strong>
              </div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <img src={CloudManagedIcon10} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>Athena</label>
                <strong>235</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="resources-section">
          <h4>Lambda Resources</h4>
          <div className="account-list-conitant">
            <div className="account-list-details">
              <div className="d-block">
                <strong>$96k</strong>
                <p>Total Cost</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>540k</strong>
                <p>Total function</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>43k</strong>
                <p>Error Rate</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>365</strong>
                <p>Throttle</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>199</strong>
                <p>Latency</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>142</strong>
                <p>Trends</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>450k</strong>
                <p>Failure Function</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>450k</strong>
                <p>Total Buckets</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>41MB</strong>
                <p>Used CPU</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>152</strong>
                <p>Net Received</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>142</strong>
                <p>Request</p>
              </div>
            </div>
            <div className="account-list-details">
              <div className="d-block">
                <strong>450</strong>
                <p>Memory Used</p>
              </div>
            </div>
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
                  <tr>
                    <td>
                      <strong>
                        <a href="#">S3</a>
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
                  <tr>
                    <td>
                      <strong>
                        <a href="#">Attendence</a>
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
                        {" "}
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
                  <tr>
                    <td>
                      <strong>
                        <a href="#">Free</a>
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
                        {" "}
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
                  <tr>
                    <td>
                      <strong>
                        <a href="#">Exam</a>
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
                        {" "}
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AllTable;
