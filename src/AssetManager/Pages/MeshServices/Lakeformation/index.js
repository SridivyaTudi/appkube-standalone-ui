import React, { Component } from "react";
import { Link } from "react-router-dom";
class Lakeformation extends Component {
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
                    <strong>Databases Name</strong>
                  </th>
                  <th>Data sharing Modal </th>
                  <th>Producer Account</th>
                  <th>Consumer Account</th>
                  <th>Shared Tables</th>
                  <th>Shared Columns</th>
                  <th>Tags</th>
                  <th>Filter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={``}>Sales_DB</Link>
                  </td>
                  <td>BI Reporting</td>
                  <td>prod_acct_1</td>
                  <td>cons_acct_1</td>
                  <td>Sales</td>
                  <td>Date, Amount</td>
                  <td>BI</td>
                  <td>Region:East</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Finance_DB</Link>
                  </td>
                  <td>Compliance</td>
                  <td>prod_acct_2</td>
                  <td>cons_acct_2</td>
                  <td>Transaction</td>
                  <td>Amount</td>
                  <td>FISMA</td>
                  <td>Division: Legal</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Marketing_DB</Link>
                  </td>
                  <td>Analytics</td>
                  <td>prod_acct_3</td>
                  <td>cons_acct_3</td>
                  <td>Campaigns</td>
                  <td>Date, Amount</td>
                  <td>BI</td>
                  <td>Region:East</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>HR_DB</Link>
                  </td>
                  <td>BI Reporting</td>
                  <td>prod_acct_1</td>
                  <td>cons_acct_1</td>
                  <td>Sales</td>
                  <td>Date, Amount</td>
                  <td>BI</td>
                  <td>Region:East</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Audit_DB</Link>
                  </td>
                  <td>BI Reporting</td>
                  <td>prod_acct_1</td>
                  <td>cons_acct_1</td>
                  <td>Sales</td>
                  <td>Date, Amount</td>
                  <td>BI</td>
                  <td>Region:East</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="lake-heading">
          <h3>database Monitoring</h3>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead className="active">
                <tr>
                  <th>
                    <strong>database Name</strong>
                  </th>
                  <th>Linked Databases</th>
                  <th>Last Sync</th>
                  <th>Status</th>
                  <th>Error Messages</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={``}>Sales_DB</Link>
                  </td>
                  <td>DB1, DB2, DB3</td>
                  <td>2023-04-28 12:34:56</td>
                  <td>OK</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Finance_DB</Link>
                  </td>
                  <td>DB4, DB5, DB6</td>
                  <td>2023-04-28 12:34:56</td>
                  <td>Error</td>
                  <td>Connection timed out</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Marketing_DB</Link>
                  </td>
                  <td>DB7, DB8, DB9</td>
                  <td>2023-04-28 12:34:56</td>
                  <td>OK</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>HR_DB</Link>
                  </td>
                  <td>DB4, DB5, DB6</td>
                  <td>2023-04-28 12:34:56</td>
                  <td>Error</td>
                  <td>Connection timed out</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Audit_DB</Link>
                  </td>
                  <td>DB7, DB8, DB9</td>
                  <td>2023-04-28 12:34:56</td>
                  <td>OK</td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Lakeformation;
