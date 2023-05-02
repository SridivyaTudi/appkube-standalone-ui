import React, { Component } from "react";
import Aws from "../../../assets/img/aws.png";
import Microsoftazure from "../../../assets/img/microsoftazure.png";
import GoogleCloud from "../../../assets/img/google-cloud.png";
import kubernetes from "../../../assets/img/kubernetes.png";

class EnvironmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterShow: false,
      recentShow: false,
      envShow: false,
      showMenu: false,
    };
  }
  toggleColumnSelect = (drdName) => {
    let current = this.state[drdName];
    this.setState({
      [drdName]: !current,
    });
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  render() {
    const { filterShow, envShow, recentShow } = this.state;
    return (
      <div className="environmentlist-container">
        <div className="list-heading">
          <h3>Environments</h3>
        </div>
        <div className="environment-boxs">
          <div className="environment-box">
            <div className="environment-title">
              <div className="environment-image">
                <img src={Aws} />
              </div>
              <div className="title-name">Amazon Web Services</div>
            </div>
            <div className="data-contant">
              <ul>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff9900" }}></span>
                    <p>Environments</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#0089d6" }}></span>
                    <p>Assets</p>
                  </div>
                  <label>150</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#da4f44" }}></span>
                    <p>Alerts</p>
                  </div>
                  <label>100</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#00b929" }}></span>
                    <p>Total Billing</p>
                  </div>
                  <label>&#65284;200</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="environment-box">
            <div className="environment-title">
              <div className="environment-image">
                <img src={Microsoftazure} />
              </div>
              <div className="title-name">Azure Cloud</div>
            </div>
            <div className="data-contant">
              <ul>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff9900" }}></span>
                    <p>Environments</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#0089d6" }}></span>
                    <p>Assets</p>
                  </div>
                  <label>150</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#da4f44" }}></span>
                    <p>Alerts</p>
                  </div>
                  <label>100</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#00b929" }}></span>
                    <p>Total Billing</p>
                  </div>
                  <label>&#65284;200</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="environment-box">
            <div className="environment-title">
              <div className="environment-image">
                <img src={GoogleCloud} />
              </div>
              <div className="title-name">Google Cloud Platform</div>
            </div>
            <div className="data-contant">
              <ul>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff9900" }}></span>
                    <p>Environments</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#0089d6" }}></span>
                    <p>Assets</p>
                  </div>
                  <label>150</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#da4f44" }}></span>
                    <p>Alerts</p>
                  </div>
                  <label>100</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#00b929" }}></span>
                    <p>Total Billing</p>
                  </div>
                  <label>&#65284;200</label>
                </li>
              </ul>
            </div>
          </div>
          <div className="environment-box">
            <div className="environment-title">
              <div className="environment-image">
                <img src={kubernetes} />
              </div>
              <div className="title-name">Kubernetes</div>
            </div>
            <div className="data-contant">
              <ul>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#ff9900" }}></span>
                    <p>Environments</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#0089d6" }}></span>
                    <p>Assets</p>
                  </div>
                  <label>150</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#da4f44" }}></span>
                    <p>Alerts</p>
                  </div>
                  <label>100</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: "#00b929" }}></span>
                    <p>Total Billing</p>
                  </div>
                  <label>&#65284;200</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="add-new-environment">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <div className="multiselect">
                <div
                  className="form-control select-label"
                  onClick={() => this.toggleColumnSelect("filterShow")}
                >
                  <i className="fas fa-funnel-dollar fillter-icon"></i>
                  Select columns
                  <i className="fas fa-caret-down arrow-icon"></i>
                </div>
                <div
                  style={{ display: filterShow ? "" : "none" }}
                  className="border options"
                >
                  <div className="search-bar">
                    <input type="text" placeholder="Search...." />
                  </div>
                  <label className="option">
                    <input
                      type="checkbox"
                      onChange={() => this.handleChecked()}
                    />
                    OU
                  </label>
                  <label className="option">
                    <input
                      type="checkbox"
                      onChange={() => this.handleChecked()}
                    />
                    Status
                  </label>
                  <label className="option">
                    <input
                      type="checkbox"
                      onChange={() => this.handleChecked()}
                    />
                    No of Assets
                  </label>
                  <label className="option">
                    <input
                      type="checkbox"
                      onChange={() => this.handleChecked()}
                    />
                    Logs
                  </label>
                  <label className="option">
                    <input
                      type="checkbox"
                      onChange={() => this.handleChecked()}
                    />
                    Performance & Availability
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12">
              <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <div className="export-sction">
                    <div className="multiselect">
                      <div
                        className="form-control select-label"
                        onClick={() => this.toggleColumnSelect("recentShow")}
                      >
                        <i className="fas fa-stopwatch fillter-icon"></i>
                        Recent
                        <i className="fas fa-caret-down arrow-icon"></i>
                      </div>
                      <div
                        style={{ display: recentShow ? "" : "none" }}
                        className="border options"
                      >
                        <ul>
                          <li>
                            <a href="">
                              <span>
                                <img src={Aws} />
                              </span>
                              <p>AWS (657907747545)</p>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <span>
                                <img src={Aws} />
                              </span>
                              <p>AWS (657907747545)</p>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <span>
                                <img src={Microsoftazure} />
                              </span>
                              <p>AWS (657907747545)</p>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="multiselect m-l-1 m-r-1">
                      <div
                        className="form-control new-environment"
                        onClick={() => this.toggleColumnSelect("envShow")}
                      >
                        Add New Environment
                        <i className="fas fa-caret-down arrow-icon"></i>
                      </div>
                      <div
                        style={{ display: envShow ? "" : "none" }}
                        className="border options"
                      >
                        <ul>
                          <li>
                            <a href="">
                              <span>
                                <img src={Aws} />
                              </span>
                              <p>AWS (657907747545)</p>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <span>
                                <img src={Aws} />
                              </span>
                              <p>AWS (657907747545)</p>
                            </a>
                          </li>
                          <li>
                            <a href="">
                              <span>
                                <img src={Microsoftazure} />
                              </span>
                              <p>AWS (657907747545)</p>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <button class="new-button m-r-0">
                      <i className="fas fa-external-link-square-alt p-r-10"></i>
                      Export
                    </button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="search-box">
                    <form>
                      <div className="form-group search-control-group m-b-0">
                        <input
                          type="text"
                          className="input-group-text"
                          placeholder="Search"
                        />
                        <button>
                          <i className="fa fa-search" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead>
                <tr>
                  <th className="active">
                    <i className="fas fa-sort-down"></i>
                    <div className="environment-image">
                      <img src={Aws} />
                    </div>{" "}
                    AWS
                  </th>
                  <th>Product Enclave</th>
                  <th>Product</th>
                  <th>App Services</th>
                  <th>Data Services</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>2 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>5 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>8 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>5 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>6 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead>
                <tr>
                  <th className="active">
                    <i className="fas fa-sort-down"></i>
                    <div className="environment-image">
                      <img src={Microsoftazure} />
                    </div>
                    Azure Cloud
                  </th>
                  <th>Product Enclave</th>
                  <th>Product</th>
                  <th>App Services</th>
                  <th>Data Services</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>2 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>5 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>8 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>5 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>6 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead>
                <tr>
                  <th className="active">
                    <i className="fas fa-sort-down"></i>
                    <div className="environment-image">
                      <img src={GoogleCloud} />
                    </div>
                    Google Cloud Platform
                  </th>
                  <th>Product Enclave</th>
                  <th>Product</th>
                  <th>App Services</th>
                  <th>Data Services</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>2 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>5 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>8 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>5 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>6 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead>
                <tr>
                  <th className="active">
                    <i className="fas fa-sort-down"></i>
                    <div className="environment-image">
                      <img src={kubernetes} />
                    </div>
                    Kubernetes
                  </th>
                  <th>Product Enclave</th>
                  <th>Product</th>
                  <th>App Services</th>
                  <th>Data Services</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>2 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>5 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>8 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>5 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>
                      <a href="#">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>6 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button
                      type="button"
                      onClick={this.toggleMenu}
                      className="list-icon"
                    >
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fal fa-exclamation-circle"></i>
                              Helpe
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-clone"></i>
                              Duplicate
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-eye"></i>
                              Disable
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-trash-alt"></i>
                              Delete
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-th-large"></i>
                              Move
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EnvironmentList;
