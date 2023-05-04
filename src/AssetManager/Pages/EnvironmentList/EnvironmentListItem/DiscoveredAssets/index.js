import React, { Component } from 'react';
import Aws from '../../../../../assets/img/aws.png';
import Microsoftazure from '../../../../../assets/img/microsoftazure.png';
import VpcServicesIcon from '../../../../../assets/img/assetmanager/vpc-services-icon.png';
import ClusterIcon from '../../../../../assets/img/assetmanager/cluster-icon.png';
import { Link } from 'react-router-dom';
import S3Table from './S3Table';
import CdnTable from './CdnTable';
import WafTable from './WafTable';

class DiscoveredAssets extends Component {
  tableMapping = [
    {
      name: 'S3',
      dataKey: 's3',
      component: S3Table,
    },
    {
      name: 'CDN',
      dataKey: 'cdn',
      component: CdnTable,
    },
    {
      name: 'WAF',
      dataKey: 'waf',
      component: WafTable,
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      showSelectFilter: false,
      showServiceViewFilter: false,
      activeTab: 0,
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

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { showSelectFilter, showServiceViewFilter, activeTab } = this.state;
    return (
      <div className="discovered-assets">
        <div className="discovered-assets-head">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
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
              <div className="environment-fliter">
                <div
                  className="fliter-toggel"
                  onClick={() =>
                    this.setState({
                      showServiceViewFilter: !showServiceViewFilter,
                    })
                  }
                >
                  <i class="far fa-eye fillter-icon"></i>
                  Service View
                  <i className="fas fa-caret-down arrow-icon"></i>
                </div>
                <div
                  className={
                    showServiceViewFilter === true ? 'fliter-collapse recent-collapse active' : 'fliter-collapse'
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
                  className={showServiceViewFilter === true ? 'fliters-collapse-bg active' : 'fliters-collapse-bg'}
                  onClick={() =>
                    this.setState({
                      showServiceViewFilter: !showServiceViewFilter,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="d-inline-block width-100 text-right">
                <button class="new-button m-b-0">
                  <i className="fas fa-external-link-square-alt p-r-10"></i>
                  Export
                </button>
                <div className="search-box">
                  <div className="form-group search-control-group m-b-0">
                    <input type="text" className="input-group-text" placeholder="Search" />
                    <button className="search-btn">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="discovered-assets-body">
          <div className="row">
            <div className="col-lg-7 col-md-7 col-sm-12">
              <div className="services-panel">
                <div className="services-panel-title bottom-border">
                  <div className="name">Topology View</div>
                </div>
                <div className="services-panel-body">
                  <div className="gmnoprint">
                    <div className="gmnoprint-plus-minus">
                      <button className="btn btn-plus">
                        <i class="fal fa-plus"></i>
                      </button>
                      <button className="btn btn-minus">
                        <i class="fal fa-minus"></i>
                      </button>
                    </div>
                    <div className="gmnoprint-map">
                      <button className="btn btn-map">
                        <i class="fal fa-map-marker-alt"></i>
                      </button>
                    </div>
                  </div>
                  <div className="services-inner-body">
                    <div className="services-text-box active">Amazon Web Services</div>
                    <div className="global-servies">
                      <ul>
                        <li>
                          <span>
                            <img src={VpcServicesIcon} alt="" />
                          </span>
                          VPC 1
                        </li>
                        <li className="active">
                          <span>
                            <img src={VpcServicesIcon} alt="" />
                          </span>
                          VPC 2
                        </li>
                        <li>
                          <span>
                            <img src={VpcServicesIcon} alt="" />
                          </span>
                          VPC 3
                        </li>
                        <li>
                          <span>
                            <img src={VpcServicesIcon} alt="" />
                          </span>
                          VPC 4
                        </li>
                      </ul>
                      <div className="global-servies-menu">
                        <label className="active">
                          <span>
                            <img src={VpcServicesIcon} alt="" />
                          </span>
                          Global servies
                        </label>
                      </div>
                    </div>
                    <div className="global-servies cluster-servies">
                      <ul>
                        <li>
                          <span>
                            <img src={ClusterIcon} alt="" />
                          </span>
                          Cluster 1
                        </li>
                        <li className="active">
                          <span>
                            <img src={ClusterIcon} alt="" />
                          </span>
                          Cluster 2
                        </li>
                        <li>
                          <span>
                            <img src={ClusterIcon} alt="" />
                          </span>
                          Cluster 3
                        </li>
                        <li>
                          <span>
                            <img src={ClusterIcon} alt="" />
                          </span>
                          Cluster 4
                        </li>
                      </ul>
                      <div className="global-servies-menu">
                        <label className="active">Cloud Management Services</label>
                        <label>Gateway Services</label>
                      </div>
                    </div>
                    <div className="global-servies app-servies">
                      <div className="global-servies-menu">
                        <label className="active">App Services</label>
                        <label>Data Services</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12">
              {/* <div className="environment-table-section" style={{ height: '395px' }}>
                <div className="table">
                  <table className="overview">
                    <thead>
                      <tr>
                        <th>
                          <div className="environment-image">
                            <img src={Aws} />
                          </div>
                        </th>
                        <th>Products</th>
                        <th>App Services</th>
                        <th>Data Services</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>VPC 1</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
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
                        <td>VPC 2</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
                        <td>
                          <button type="button" className="list-icon">
                            <i class="fas fa-ellipsis-v"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>VPC 3</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
                        <td>
                          <button type="button" className="list-icon">
                            <i class="fas fa-ellipsis-v"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>VPC 4</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
                        <td>
                          <button type="button" className="list-icon">
                            <i class="fas fa-ellipsis-v"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Global Service</td>
                        <td>02</td>
                        <td>25</td>
                        <td>35</td>
                        <td>
                          <button type="button" className="list-icon">
                            <i class="fas fa-ellipsis-v"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}
              {/* <div className="fliter-tabs">
                <div className="global-services-fliter">
                  <div className="heading">
                    <div className="breadcrumbs">
                      <ul>
                        <li>
                          <a href="#">AWS</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <span>Global Services</span>
                        </li>
                      </ul>
                    </div>
                    <button type="button" className="btn btn-ellipsis">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                  <div className="fliter-inputs">
                    <div className="search-control">
                      <input type="text" className="input-group-text" placeholder="" />
                    </div>
                    <div className="search-control">
                      <input type="text" className="input-group-text" placeholder="" />
                    </div>
                    <div className="search-control">
                      <input type="text" className="input-group-text" placeholder="" />
                    </div>
                  </div>
                </div>
                <div className="services-panel-tabs">
                  <div className="tabs-head">
                    <ul>
                      {this.tableMapping.map((tabData, index) => {
                        return (
                          <li
                            key={`ops-tab-${index}`}
                            className={index === activeTab ? 'active' : ''}
                            onClick={(e) => this.setActiveTab(index)}
                          >
                            {tabData.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="tabs-content">
                    {this.tableMapping.map((tabData, index) => {
                      if (activeTab === index) {
                        return <tabData.component data={[tabData.dataKey]} />;
                      } else {
                        return <></>;
                      }
                    })}
                  </div>
                </div>
              </div> */}
              {/* <div className="fliter-tabs">
                <div
                  className="global-services-fliter"
                  style={{ height: '533px', boxShadow: '0px 10px 20px 0px rgba(0, 0, 0, 0.04)' }}
                >
                  <div className="heading">
                    <div className="breadcrumbs">
                      <ul>
                        <li>
                          <a href="#">AWS</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <span>VPC 1</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="fliter-inputs">
                    <div className="search-control">
                      <input type="text" className="input-group-text" placeholder="" />
                    </div>
                    <div className="search-control">
                      <input type="text" className="input-group-text" placeholder="" />
                    </div>
                    <div className="search-control">
                      <input type="text" className="input-group-text" placeholder="" />
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="fliter-tabs">
                <div className="global-services-fliter">
                  <div className="heading">
                    <div className="breadcrumbs">
                      <ul>
                        <li>
                          <a href="#">AWS</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <a href="#">VPC 1</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <a href="#">Cluster 1</a>
                        </li>
                        <li>
                          <i class="far fa-chevron-right"></i>
                        </li>
                        <li>
                          <span>App Services</span>
                        </li>
                      </ul>
                    </div>
                    <button type="button" className="btn btn-ellipsis">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                  <div className="fliter-inputs">
                    <div className="search-control">
                      <input type="text" className="input-group-text" placeholder="" />
                    </div>
                    <div className="search-control">
                      <input type="text" className="input-group-text" placeholder="" />
                    </div>
                    <div className="search-control">
                      <input type="text" className="input-group-text" placeholder="" />
                    </div>
                  </div>
                </div>
                <div className="environment-table-section" style={{ height: '373px' }}>
                  <div className="table">
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
                              <a href="#">EMS</a>
                            </strong>
                            <i class="fas fa-caret-right m-l-1"></i>
                          </td>
                          <td>
                            <div className="box red">2</div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box orange">3</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>
                              <a href="#">Supply Chain</a>
                            </strong>
                            <i class="fas fa-caret-right m-l-1"></i>
                          </td>
                          <td>
                            <div className="box red">2</div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box orange">3</div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>
                              <a href="#">Procurement</a>
                            </strong>
                            <i class="fas fa-caret-right m-l-1"></i>
                          </td>
                          <td>
                            <div className="box red">2</div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i class="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box orange">3</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscoveredAssets;
