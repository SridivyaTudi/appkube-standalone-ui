import React, { Component } from 'react';
import Aws from '../../../assets/img/aws.png';
import Microsoftazure from '../../../assets/img/microsoftazure.png';
import GoogleCloud from '../../../assets/img/google-cloud.png';
import Kubernetes from '../../../assets/img/kubernetes.png';
import { Link } from 'react-router-dom';
import { config } from '../../config';

const LOGOS = {
  aws: Aws,
  azure: Microsoftazure,
  gcp: GoogleCloud,
  kubernetes: Kubernetes,
};

class Environments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecentFilter: false,
      showAddNewFilter: false,
      showSelectFilter: false,
      accountList: {},
      commonData: {},
      searchkey: '',
      accounts: '',
      searchedAccountList: {},
      currentActiveTableIndex: [0,1,2],
    };
  }

  componentDidMount = () => {
    this.getAccountList();
  };

  getAccountList = () => {
    fetch(config.GET_ALL_ENVS)
      .then((response) => response.json())
      .then((data) => {
        const commonData = {};
        const accounts = {};
        data.forEach((account) => {
          accounts[account.cloud] = accounts[account.cloud] || [];
          accounts[account.cloud].push(account);
          commonData[account.cloud] = commonData[account.cloud]
            ? commonData[account.cloud]
            : {
                totalBill: 0,
              };
          commonData[account.cloud].totalBill += account.totalBilling || 0;
        });
        this.setState({
          accountList: accounts,
          commonData,
          searchedAccountList: JSON.parse(JSON.stringify(accounts)),
        });
      });
  };

  renderEnvironmentBoxes = () => {
    const { accountList, commonData } = this.state;
    const keys = Object.keys(accountList);
    const retData = [];
    keys.forEach((env) => {
      const accounts = accountList[env];
      if (accounts.length > 0) {
        const account = accounts[0];
        const data = commonData[account.cloud];
        retData.push(
          <div className="environment-box" key={account.cloud}>
            <div className="environment-title">
              <div className="environment-image">
                <img src={LOGOS[account.cloud.toLowerCase()]} alt="" />
              </div>
              <div className="title-name">{account.cloud}</div>
            </div>
            <div className="data-contant">
              <ul>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#ff9900' }}></span>
                    <p>Environments</p>
                  </div>
                  <label>{accounts.length}</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#0089d6' }}></span>
                    <p>Assets</p>
                  </div>
                  <label>0</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#da4f44' }}></span>
                    <p>Alerts</p>
                  </div>
                  <label>0</label>
                </li>
                <li>
                  <div className="data-text">
                    <span style={{ backgroundColor: '#00b929' }}></span>
                    <p>Total Billing</p>
                  </div>
                  <label>&#65284;{data.totalBill}</label>
                </li>
              </ul>
            </div>
          </div>
        );
      }
    });
    return retData;
  };

  handleMenuToggle = (envKey, accountIndex) => {
    const { searchedAccountList } = this.state;
    searchedAccountList[envKey][accountIndex].showMenu = !searchedAccountList[envKey][accountIndex].showMenu;
    this.setState({
      searchedAccountList,
    });
  };

  handleTableToggle = (envIndex) => {
    let { currentActiveTableIndex } = this.state;
    if (!currentActiveTableIndex.includes(envIndex)) {
      currentActiveTableIndex.push(envIndex);
    } else {
      currentActiveTableIndex = currentActiveTableIndex.filter((item) => item !== envIndex);
    }
    this.setState({
      currentActiveTableIndex,
    });
  };

  renderEnvironmentTable() {
    const { searchedAccountList } = this.state;
    const keys = Object.keys(searchedAccountList);
    const retData = [];
    keys.forEach((env, envIndex) => {
      const accounts = searchedAccountList[env];
      const accountsJSX = [];
      accounts.forEach((account, accountIndex) => {
        accountsJSX.push(
          <tr key={`env-${envIndex}-${accountIndex}`}>
            <td>
              <Link
                to={`/assetmanager/pages/environments/environmentlist?accountId=${account.accountId}&cloudName=${account.cloud}`}
              >
                {account.cloud} ({account.accountId})
              </Link>
            </td>
            <td>{account.totalProductEnclave}</td>
            <td>{account.totalProducts}</td>
            <td>{account.totalAppServices}</td>
            <td>{account.totalDataServices}</td>
            <td>
              <button
                type="button"
                className="list-icon"
                onClick={(e) => {
                  this.handleMenuToggle(env, accountIndex);
                }}
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
              {account.showMenu == true && (
                <>
                  <div
                    className="open-create-menu-close"
                    onClick={(e) => {
                      this.handleMenuToggle(env, accountIndex);
                    }}
                  ></div>
                  <div className="menu-list">
                    <ul>
                      <li className="active">
                        <a
                          href={`/assetmanager/pages/add-data-source?accountId=${account.accountId}&cloudName=${account.cloud}`}
                        >
                          Add New datasource
                        </a>
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
                </>
              )}
            </td>
          </tr>
        );
      });
      if (accounts.length > 0) {
        const account = accounts[0];
        retData.push(
          <div className="environment-table-section">
            <div className="table">
              <table className="overview">
                <thead className={this.state.currentActiveTableIndex.includes(envIndex) ? 'active' : ''}>
                  <tr>
                    <th>
                      <i
                        className={
                          this.state.currentActiveTableIndex.includes(envIndex)
                            ? 'fas fa-sort-down'
                            : 'fas fa-caret-right'
                        }
                        onClick={() => {
                          this.handleTableToggle(envIndex);
                        }}
                      ></i>
                      <div className="environment-image">
                        <img src={LOGOS[account.cloud.toLowerCase()]} alt="" />
                      </div>
                      <strong>{account.cloud}</strong>
                    </th>
                    <th>Product Enclave</th>
                    <th>Products</th>
                    <th>App Services</th>
                    <th>Data Services</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {this.state.currentActiveTableIndex.includes(envIndex) && <tbody>{accountsJSX}</tbody>}
              </table>
            </div>
          </div>
        );
      }
    });
    return retData;
  }

  handleSearchChange = (e) => {
    let value = e.target.value;
    this.setState({ searchkey: value });
    let { accountList, searchedAccountList } = this.state;
    searchedAccountList = JSON.parse(JSON.stringify(accountList));
    const result = {};
    const keys = Object.keys(accountList);
    keys.map((env, envIndex) => {
      if (value.length) {
        accountList[env].map((account, index) => {
          result[env] = result[env] || [];
          if (account.accountId.includes(value)) {
            result[env].push(account);
          }
        });
        this.setState({
          searchedAccountList: result,
        });
      } else if (value.length <= 0) {
        this.setState({ searchedAccountList: accountList });
      }
    });
  };

  render() {
    const { showRecentFilter, showAddNewFilter, showSelectFilter, searchkey } = this.state;
    return (
      <div className="environmentlist-container">
        <div className="list-heading">
          <h3>Environments</h3>
        </div>
        <div className="environment-boxs">{this.renderEnvironmentBoxes()}</div>
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
                  <i className="fas fa-filter fillter-icon"></i>
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
                      <label>OU</label>
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      <label>Status</label>
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      <label>No of Assets</label>
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      <label>Logs</label>
                    </li>
                    <li>
                      <input type="checkbox" onChange={() => this.handleChecked()} />
                      <label>Performance & Availability</label>
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
                      <div className={showRecentFilter === true ? 'fliter-collapse  active' : 'fliter-collapse'}>
                        <ul>
                          <li>
                            <Link to={`/assetmanager/pages/environments/accountsetup`}>
                              <span>
                                <img src={Aws} alt="AWS" />
                              </span>
                              <p>(657907747545)</p>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/assetmanager/pages/environments/accountsetup`}>
                              <span>
                                <img src={Aws} alt="" />
                              </span>
                              <p>(655668745458)</p>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/assetmanager/pages/environments/accountsetup`}>
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
                            <Link to={`/assetmanager/pages/environments/accountsetup`}>
                              <span className="image-box">
                                <img src={Aws} alt="Aws" />
                              </span>
                              <p>Amazon Web Services</p>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/assetmanager/pages/environments/accountsetup`}>
                              <span className="image-box">
                                <img src={Microsoftazure} alt="Microsoftazure" />
                              </span>
                              <p>Azure Cloud</p>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/assetmanager/pages/environments/accountsetup`}>
                              <span className="image-box">
                                <img src={GoogleCloud} alt="GoogleCloud" />
                              </span>
                              <p>Google Cloud Platform</p>
                            </Link>
                          </li>
                          <li>
                            <Link to={`/assetmanager/pages/environments/accountsetup`}>
                              <span className="image-box">
                                <img src={Kubernetes} alt="Kubernetes" />
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
                    <button className="new-button m-r-0 m-b-0">
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
                          name="searchkey"
                          value={searchkey}
                          onChange={this.handleSearchChange}
                        />
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
        {this.renderEnvironmentTable()}
      </div>
    );
  }
}

export default Environments;
