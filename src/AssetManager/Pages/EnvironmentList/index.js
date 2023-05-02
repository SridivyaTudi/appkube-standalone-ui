import React, { Component } from 'react';
import Aws from '../../../assets/img/aws.png';
import Microsoftazure from '../../../assets/img/microsoftazure.png';
import GoogleCloud from '../../../assets/img/google-cloud.png';
import kubernetes from '../../../assets/img/kubernetes.png';
import { Link } from 'react-router-dom';

class EnvironmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecentFilter: false,
      showAddNewFilter: false,
      showSelectFilter: false,
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
    const { showRecentFilter, showAddNewFilter, showSelectFilter } = this.state;
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
                    <span style={{ backgroundColor: '#ff9900' }}></span>
                    <p>Environments</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#0089d6' }}></span>
                    <p>Assets</p>
                  </div>
                  <label>150</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#da4f44' }}></span>
                    <p>Alerts</p>
                  </div>
                  <label>100</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#00b929' }}></span>
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
                    <span style={{ backgroundColor: '#ff9900' }}></span>
                    <p>Environments</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#0089d6' }}></span>
                    <p>Assets</p>
                  </div>
                  <label>150</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#da4f44' }}></span>
                    <p>Alerts</p>
                  </div>
                  <label>100</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#00b929' }}></span>
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
                    <span style={{ backgroundColor: '#ff9900' }}></span>
                    <p>Environments</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#0089d6' }}></span>
                    <p>Assets</p>
                  </div>
                  <label>150</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#da4f44' }}></span>
                    <p>Alerts</p>
                  </div>
                  <label>100</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#00b929' }}></span>
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
                    <span style={{ backgroundColor: '#ff9900' }}></span>
                    <p>Environments</p>
                  </div>
                  <label>20</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#0089d6' }}></span>
                    <p>Assets</p>
                  </div>
                  <label>150</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#da4f44' }}></span>
                    <p>Alerts</p>
                  </div>
                  <label>100</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#00b929' }}></span>
                    <p>Total Billing</p>
                  </div>
                  <label>&#65284;200</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="add-new-environment">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <div className="environment-fliter">
                <div
                  className="fliter-toggel"
                  onClick={() =>
                    this.setState({
                      showSelectFilter: !showSelectFilter,
                    })
                  }
                >
                  <i class="fas fa-filter fillter-icon"></i>
                  Select and fillter
                  <i className="fas fa-caret-down arrow-icon"></i>
                </div>
                <div className={showSelectFilter === true ? 'fliter-collapse active' : 'fliter-collapse'}>
                  <div className="search-bar">
                    <input type="text" placeholder="Search...." />
                  </div>
                  <ul>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      OU
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      Status
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      No of Assets
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      Logs
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      Performance & Availability
                    </li>
                  </ul>
                </div>
                <div
                  className={showSelectFilter === true ? 'fliters-collapse-bg active' : 'fliters-collapse-bg'}
                  onClick={() =>
                    this.setState({
                      showSelectFilter: !showSelectFilter,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-8 col-md-12 col-sm-12">
                  <div className="export-sction">
                    <div className="environment-fliter">
                      <div
                        className="fliter-toggel"
                        onClick={() =>
                          this.setState({
                            showRecentFilter: !showRecentFilter,
                          })
                        }
                      >
                        <i className="fas fa-alarm-clock fillter-icon"></i>
                        Recent
                        <i className="fas fa-caret-down arrow-icon"></i>
                      </div>
                      <div
                        className={
                          showRecentFilter === true ? 'fliter-collapse  active' : 'fliter-collapse'
                        }
                      >
                        <ul>
                          <li>
                            <Link to={`/assetmanager/pages/accountsetup`}>
                              <span>
                                <img src={Aws} alt="AWS" />
                              </span>
                              <p>(657907747545)</p>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/assetmanager/pages/accountsetup`}>
                              <span>
                                <img src={Aws} alt="" />
                              </span>
                              <p>(655668745458)</p>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/assetmanager/pages/accountsetup`}>
                              <span>
                                <img src={Microsoftazure} alt="" />
                              </span>
                              <p>(655668745458)</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={showRecentFilter === true ? 'fliters-collapse-bg active' : 'fliters-collapse-bg'}
                        onClick={() =>
                          this.setState({
                            showRecentFilter: !showRecentFilter,
                          })
                        }
                      />
                    </div>
                    <div className="environment-fliter">
                      <div
                        className="fliter-toggel new-environment"
                        onClick={() =>
                          this.setState({
                            showAddNewFilter: !showAddNewFilter,
                          })
                        }
                      >
                        Add New Environment
                        <i className="fas fa-caret-down arrow-icon"></i>
                      </div>
                      <div className={showAddNewFilter === true ? 'fliter-collapse active' : 'fliter-collapse'}>
                        <ul>
                          <li>
                            <Link to={`/assetmanager/pages/accountsetup`}>
                              <span className="image-box">
                                <img src={Aws} alt="Aws" />
                              </span>
                              <p>Amazon Web Services</p>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/assetmanager/pages/accountsetup`}>
                              <span className="image-box">
                                <img src={Microsoftazure} alt="Microsoftazure" />
                              </span>
                              <p>Azure Cloud</p>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/assetmanager/pages/accountsetup`}>
                              <span className="image-box">
                                <img src={GoogleCloud} alt="GoogleCloud" />
                              </span>
                              <p>Google Cloud Platform</p>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/assetmanager/pages/accountsetup`}>
                              <span className="image-box">
                                <img src={kubernetes} alt="Kubernetes" />
                              </span>
                              <p>Kubernetes</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={showAddNewFilter === true ? 'fliters-collapse-bg active' : 'fliters-collapse-bg'}
                        onClick={() =>
                          this.setState({
                            showAddNewFilter: !showAddNewFilter,
                          })
                        }
                      />
                    </div>
                    <button class="new-button m-r-0 m-b-0">
                      <i className="fas fa-external-link-square-alt p-r-10"></i>
                      Export
                    </button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="search-box">
                    <form>
                      <div className="form-group search-control-group m-b-0">
                        <input type="text" className="input-group-text" placeholder="Search" />
                        <button className="search-btn">
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
                  <th>
                    <i className="fas fa-sort-down"></i>
                    <div className="environment-image">
                      <img src={Aws} />
                    </div>
                    <strong>AWS</strong>
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
                      <a href="/assetmanager/pages/environmentlistitem">AWS (657907747554)</a>
                    </strong>
                  </td>
                  <td>2 VPC</td>
                  <td>10</td>
                  <td>25</td>
                  <td>2</td>
                  <td>
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
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
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead>
                <tr>
                  <th>
                    <i className="fas fa-sort-down"></i>
                    <div className="environment-image">
                      <img src={Microsoftazure} />
                    </div>
                    <strong>Azure Cloud</strong>
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
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
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead>
                <tr>
                  <th>
                    <i className="fas fa-sort-down"></i>
                    <div className="environment-image">
                      <img src={GoogleCloud} />
                    </div>
                    <strong>Google Cloud Platform</strong>
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
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
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead>
                <tr>
                  <th>
                    <i className="fas fa-sort-down"></i>
                    <div className="environment-image">
                      <img src={kubernetes} />
                    </div>
                    <strong>Kubernetes</strong>
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
                          </li>
                        </ul>
                      </div>
                    )}
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
                    <button type="button" onClick={this.toggleMenu} className="list-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    {this.state.showMenu == true && (
                      <div className="menu-list">
                        <ul>
                          <li className="active">
                            <a href="#">Add New datasource</a>
                          </li>
                          <li>
                            <a href="#">Add Compliance</a>
                          </li>
                          <li>
                            <a href="#">Associate to OU</a>
                          </li>
                          <li>
                            <a href="#">Add New VPC</a>
                          </li>
                          <li>
                            <a href="#">Add New Product</a>
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
