import React, { Component } from "react";
import { Link } from "react-router-dom";
class Glue extends Component {
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
                    <p>Total Number of Roles</p>
                  </div>
                  <label>112</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Total Number of Policies</p>
                  </div>
                  <label>250</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Total Number of Users</p>
                  </div>
                  <label>75</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Total Number of Groups</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>Password Policy Violations</p>
                  </div>
                  <label>05</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>Unused roles (Last 30 days)</p>
                  </div>
                  <label>32</label>
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
                    <p>Role Events </p>
                  </div>
                  <label>112</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Policy Change</p>
                  </div>
                  <label>250</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Role Creations </p>
                  </div>
                  <label>75</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Role Deletions</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>Number of Access Denials</p>
                  </div>
                  <label>05</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>Number of Policy violation</p>
                  </div>
                  <label>32</label>
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
                    <p>Total Number of Roles</p>
                  </div>
                  <label>112</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#8676ff" }}></span>
                    <p>Total Number of Policies</p>
                  </div>
                  <label>250</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff708b" }}></span>
                    <p>Total Number of Users</p>
                  </div>
                  <label>75</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ffba69" }}></span>
                    <p>Total Number of Groups</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#e323ff" }}></span>
                    <p>Password Policy Violations</p>
                  </div>
                  <label>05</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#02eae4" }}></span>
                    <p>Unused roles (Last 30 days)</p>
                  </div>
                  <label>32</label>
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
                    <strong>Role Name</strong>
                  </th>
                  <th>Policy Name </th>
                  <th>Trust Relationship</th>
                  <th>Access Advisor</th>
                  <th>Key Tags</th>
                  <th>Creation Date</th>
                  <th>Created By</th>
                  <th>Last Updated Time</th>
                  <th>Updated By</th>
                  <th>Deletion Time</th>
                  <th>Deleted By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="lake-heading">
          <h3>Deleted Data Lake Primary Roles</h3>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead className="active">
                <tr>
                  <th>
                    <strong>Role Name</strong>
                  </th>
                  <th>Creation Date</th>
                  <th>Created By</th>
                  <th>Last Updated Time</th>
                  <th>Updated By</th>
                  <th>Deletion Time</th>
                  <th>Deleted By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={``}>Deleted Producer</Link>
                  </td>
                  <td>01-03-2023</td>
                  <td>Eve</td>
                  <td>28-02-2023</td>
                  <td>Carol</td>
                  <td>30-03-2023</td>
                  <td>Grace</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Deleted Consumer</Link>
                  </td>
                  <td>01-03-2023</td>
                  <td>Eve</td>
                  <td>28-02-2023</td>
                  <td>Frank</td>
                  <td>30-03-2023</td>
                  <td>Grace</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="lake-heading">
          <h3>Deleted Data Lake Key Policy</h3>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead className="active">
                <tr>
                  <th>
                    <strong>Role Name</strong>
                  </th>
                  <th>Creation Date</th>
                  <th>Created By</th>
                  <th>Last Updated Time</th>
                  <th>Updated By</th>
                  <th>Deletion Time</th>
                  <th>Deleted By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={``}>Producer Policy</Link>
                  </td>
                  <td>01-03-2023</td>
                  <td>Eve</td>
                  <td>28-02-2023</td>
                  <td>Frank</td>
                  <td>30-03-2023</td>
                  <td>Grace</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Consumer Policy</Link>
                  </td>
                  <td>01-03-2023</td>
                  <td>Carol</td>
                  <td>28-02-2023</td>
                  <td>Frank</td>
                  <td>30-03-2023</td>
                  <td>Grace</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Glue;
