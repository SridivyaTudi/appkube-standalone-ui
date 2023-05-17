import React, { Component } from "react";
import { Link } from "react-router-dom";

class S3 extends Component {
  render() {
    return (
      <div className="mesh-iam-service">
        <div className="d-flex radio-btn-group">
          <div className="radio-btn">
            <input type="radio" id="age1" name="age"  />
            <label>Central Account</label>
          </div>
          <div className="radio-btn">
            <input type="radio" id="age1" name="age"  />
            <label>Producer Account</label>
          </div>
          <div className="radio-btn">
            <input type="radio" id="age1" name="age"  />
            <label>Consumer Account</label>
          </div>
          <div className="radio-btn">
            <input type="radio" id="age1" name="age"  />
            <label>All</label>
          </div>
        </div>
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
                    <p>Total Storage Used</p>
                  </div>
                  <label>128GB</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Number Of Objects</p>
                  </div>
                  <label>600</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Ingestion Rate (Per Hour)</p>
                  </div>
                  <label>12</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Data Retrivel Time (In Ms)</p>
                  </div>
                  <label>500</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>Data Deletion Rate</p>
                  </div>
                  <label>1.2%</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>Data Access Patterns</p>
                  </div>
                  <label>140</label>
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
                  <label>12000</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Put Requests</p>
                  </div>
                  <label>4500</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Get Requests </p>
                  </div>
                  <label>2500</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Delete Requests</p>
                  </div>
                  <label>800</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>List Requests</p>
                  </div>
                  <label>1900</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>Data Transfer</p>
                  </div>
                  <label>3600</label>
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
                    <p>Bucket Encryption Status</p>
                  </div>
                  <label>23</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Object Encryption Status</p>
                  </div>
                  <label>4600</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Access Control</p>
                  </div>
                  <label>Limited</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Versioning</p>
                  </div>
                  <label>7000</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>Audit Logs</p>
                  </div>
                  <label>4900</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>Compliance Status</p>
                  </div>
                  <label>85%</label>
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
                    <p>Total Storage</p>
                  </div>
                  <label>1028GB</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Total Buckets</p>
                  </div>
                  <label>200</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Total Folders</p>
                  </div>
                  <label>952</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Buckets Storage</p>
                  </div>
                  <label>256GB</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>Folder Storage</p>
                  </div>
                  <label>256GB</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>Exceptions</p>
                  </div>
                  <label>263</label>
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
