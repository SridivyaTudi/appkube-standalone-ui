import React, { Component } from "react";
import { Link } from "react-router-dom";

class S3 extends Component {
  render() {
    return (
      <div className="mesh-iam-service">
        <div className="environment-boxs">
          <div className="environment-box">
            <div className="environment-title">
              <div className="title-name">Kry Insights</div>
            </div>
            <div className="data-contant">
              <ul>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#00b929" }}></span>
                    <p>Total Date Volume</p>
                  </div>
                  <label>5.7PB</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Data Ingestion Rate</p>
                  </div>
                  <label>20 GB/Mn</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Data Quality Score</p>
                  </div>
                  <label>93%</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Most Accessed Dataset</p>
                  </div>
                  <label>Scales</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>Data Gov Compliance</p>
                  </div>
                  <label>89%</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>DataLake Health Score</p>
                  </div>
                  <label>87%</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="environment-box">
            <div className="environment-title">
              <div className="title-name">Activity Details</div>
            </div>
            <div className="data-contant">
              <ul>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#00b929" }}></span>
                    <p>Total Requests</p>
                  </div>
                  <label>5200</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Successful Requests</p>
                  </div>
                  <label>24952</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Falled Requests</p>
                  </div>
                  <label>275</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Requests per minute</p>
                  </div>
                  <label>85</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>Average Response Time</p>
                  </div>
                  <label>4.3s</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>Peak Response Time</p>
                  </div>
                  <label>12.8s</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="environment-box">
            <div className="environment-title">
              <div className="title-name">Compliance</div>
            </div>
            <div className="data-contant">
              <ul>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#00b929" }}></span>
                    <p>Compliance Violations</p>
                  </div>
                  <label>63</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Falled Compliance Checks</p>
                  </div>
                  <label>15</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Compliance Exceptions</p>
                  </div>
                  <label>5</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Compliance Issues Resolved</p>
                  </div>
                  <label>12</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>Compliance Audit Findings</p>
                  </div>
                  <label>04</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>Compliance Training</p>
                  </div>
                  <label>50</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="environment-box">
            <div className="environment-title">
              <div className="title-name">Storage</div>
            </div>
            <div className="data-contant">
              <ul>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#00b929" }}></span>
                    <p>Compliance Violations</p>
                  </div>
                  <label>63</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Falled Compliance Checks</p>
                  </div>
                  <label>15</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Compliance Exceptions</p>
                  </div>
                  <label>5</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Compliance Issues Resolved</p>
                  </div>
                  <label>12</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>Compliance Audit Findings</p>
                  </div>
                  <label>04</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>Compliance Training</p>
                  </div>
                  <label>50</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="environment-table-section">
              <div className="table">
                <table className="overview">
                  <thead className="active">
                    <tr>
                      <th>
                        <strong>Bucket Name</strong>
                      </th>
                      <th>Folder Name</th>
                      <th>Folder Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to={``}>Customer-documenits</Link>
                      </td>
                      <td>Account-opening</td>
                      <td>10 GB</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Customer-documenits</Link>
                      </td>
                      <td>Lean-application</td>
                      <td>15 GB</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Customer-documenits</Link>
                      </td>
                      <td>KYC</td>
                      <td>10 GB</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Transaction-history</Link>
                      </td>
                      <td>2021</td>
                      <td>15 GB</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Transaction-history</Link>
                      </td>
                      <td>2020</td>
                      <td>10 GB</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Analytics</Link>
                      </td>
                      <td>Customer-segmentation</td>
                      <td>10 GB</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Analytics</Link>
                      </td>
                      <td>Fraud-detection</td>
                      <td>15 GB</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Backupp</Link>
                      </td>
                      <td>Daily-backup</td>
                      <td>15 GB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="environment-table-section">
              <div className="table">
                <table className="overview">
                  <thead className="active">
                    <tr>
                      <th>
                        <strong>validation Check</strong>
                      </th>
                      <th>Total Bucket</th>
                      <th>Exceptions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>virsioning Enabled</td>
                      <td>50</td>
                      <td>03</td>
                    </tr>
                    <tr>
                      <td>Bucket Default Lock Enabled</td>
                      <td>50</td>
                      <td>00</td>
                    </tr>
                    <tr>
                      <td>Bucket Logging Enabled</td>
                      <td>50</td>
                      <td>03</td>
                    </tr>
                    <tr>
                      <td>Cloud Trail S3 Data Events Enabled</td>
                      <td>50</td>
                      <td>04</td>
                    </tr>
                    <tr>
                      <td>Default Encryption KMS</td>
                      <td>50</td>
                      <td>01</td>
                    </tr>
                    <tr>
                      <td>Bucket Server-side Encryption Enabled</td>
                      <td>50</td>
                      <td>01</td>
                    </tr>
                    <tr>
                      <td>Bucket SSL Requests Only</td>
                      <td>50</td>
                      <td>00</td>
                    </tr>
                    <tr>
                      <td>Bucket Replication Enabled</td>
                      <td>50</td>
                      <td>03</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead className="active">
                <tr>
                  <th>Bucket Name</th>
                  <th>Lifecycle </th>
                  <th>Virsioning Enabled</th>
                  <th>Account-label Public Accesse Blocks (Periodic)</th>
                  <th>Bucket Default Lock Enabled</th>
                  <th>Bucket Logging Enabled</th>
                  <th>Cloud Trail S3 Data Events Enabled</th>
                  <th>Bucket-level Public Access Prohibited</th>
                  <th>Bucket Public Read Prohibited</th>
                  <th>Bucket Public Write Prohibited</th>
                  <th>Default Encryption KMS</th>
                  <th>Bucket Server-side Encryption Enabled</th>
                  <th>Bucket SSL Requests Only</th>
                  <th>Bucket Replication Enabled</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={``}>Bucket1</Link>
                  </td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Bucket1</Link>
                  </td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Bucket1</Link>
                  </td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Bucket1</Link>
                  </td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Bucket1</Link>
                  </td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Bucket1</Link>
                  </td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Bucket1</Link>
                  </td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Bucket1</Link>
                  </td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Bucket1</Link>
                  </td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Bucket1</Link>
                  </td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default S3;
