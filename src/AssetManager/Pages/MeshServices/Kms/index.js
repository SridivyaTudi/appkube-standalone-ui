import React, { Component } from "react";
import { Link } from "react-router-dom";

class Kms extends Component {
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
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead className="active">
                <tr>
                  <th>
                    <strong>Account</strong>
                  </th>
                  <th>Resources </th>
                  <th>Key Tags</th>
                  <th>Creation Date</th>
                  <th>Created By</th>
                  <th>Last Updated Time</th>
                  <th>Updated By</th>
                  <th>Policy validation</th>
                  <th>Grant validation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={``}>Central Account 1</Link>
                  </td>
                  <td>Key-1</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Bob</td>
                  <td>No Exceptions</td>
                  <td>Orphan grant</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Account 1</Link>
                  </td>
                  <td>Key-1</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Bob</td>
                  <td>No Exceptions</td>
                  <td>Orphan grant</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Account 1</Link>
                  </td>
                  <td>Key-1</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Bob</td>
                  <td>No Exceptions</td>
                  <td>Orphan grant</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Account 1</Link>
                  </td>
                  <td>Key-1</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Bob</td>
                  <td>No Exceptions</td>
                  <td>Orphan grant</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Account 1</Link>
                  </td>
                  <td>Key-1</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Bob</td>
                  <td>No Exceptions</td>
                  <td>Orphan grant</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Account 1</Link>
                  </td>
                  <td>Key-1</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Bob</td>
                  <td>No Exceptions</td>
                  <td>Orphan grant</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Account 1</Link>
                  </td>
                  <td>Key-1</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Bob</td>
                  <td>No Exceptions</td>
                  <td>Orphan grant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="lake-heading">
          <h3>Key Revoke Events</h3>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead className="active">
                <tr>
                  <th>
                    <strong>Key Name</strong>
                  </th>
                  <th>Key ID</th>
                  <th>Created By</th>
                  <th>Creation Date</th>
                  <th>Last Updated Time</th>
                  <th>Updated By</th>
                  <th>Revoked Time</th>
                  <th>Revoked By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={``}>Key 1</Link>
                  </td>
                  <td>Key 1-1</td>
                  <td>Eve</td>
                  <td>28-02-2023</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Frank</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Grace</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Key 1</Link>
                  </td>
                  <td>Key 1-1</td>
                  <td>Carol</td>
                  <td>28-02-2023</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Thomas</td>
                  <td>01-01-2023 10:00:00</td>
                  <td>Merk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="lake-heading">
          <h3>Key Events Monitoring</h3>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="environment-table-section">
              <div className="table">
                <table className="overview">
                  <thead className="active">
                    <tr>
                      <th>
                        <strong>Events</strong>
                      </th>
                      <th>Total</th>
                      <th>24 hrs</th>
                      <th>7 Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to={``}>Key Deletion</Link>
                      </td>
                      <td>10</td>
                      <td>02</td>
                      <td>06</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Key Inactive</Link>
                      </td>
                      <td>15</td>
                      <td>03</td>
                      <td>09</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Alias Modification</Link>
                      </td>
                      <td>05</td>
                      <td>01</td>
                      <td>03</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Expiration</Link>
                      </td>
                      <td>20</td>
                      <td>05</td>
                      <td>12</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Renewed</Link>
                      </td>
                      <td>07</td>
                      <td>00</td>
                      <td>02</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>ARN Modification</Link>
                      </td>
                      <td>12</td>
                      <td>04</td>
                      <td>08</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="environment-table-section">
              <div className="table">
                <table className="overview">
                  <thead className="active">
                    <tr>
                      <th>
                        <strong>Events</strong>
                      </th>
                      <th>Time</th>
                      <th>Account ID</th>
                      <th>Key Name</th>
                      <th>Key Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to={``}>Key Deletion</Link>
                      </td>
                      <td>2022-01-02 15:00:00</td>
                      <td>123456789012</td>
                      <td>Pro-lake-key</td>
                      <td>Producer key</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Key Inactive</Link>
                      </td>
                      <td>2022-01-02 15:00:00</td>
                      <td>123456789012</td>
                      <td>Pro-lake-key</td>
                      <td>Producer key</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Alias Modification</Link>
                      </td>
                      <td>2022-01-02 15:00:00</td>
                      <td>123456789012</td>
                      <td>Pro-lake-key</td>
                      <td>Producer key</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Expiration</Link>
                      </td>
                      <td>2022-01-02 15:00:00</td>
                      <td>123456789012</td>
                      <td>Pro-lake-key</td>
                      <td>Producer key</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>Renewed</Link>
                      </td>
                      <td>2022-01-02 15:00:00</td>
                      <td>123456789012</td>
                      <td>Pro-lake-key</td>
                      <td>Producer key</td>
                    </tr>
                    <tr>
                      <td>
                        <Link to={``}>ARN Modification</Link>
                      </td>
                      <td>2022-01-02 15:00:00</td>
                      <td>123456789012</td>
                      <td>Pro-lake-key</td>
                      <td>Producer key</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Kms;
