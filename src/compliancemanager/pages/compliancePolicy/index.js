import React, {Component} from 'react';
//import * as React from 'react';
//import { Breadcrumbs } from '../../components/Breadcrumbs';
import amazonLogo from '../../img/amazon-logo.png';
import AddOrganizationalUnitPolicyPopup  from './AddOrganizationalUnitPolicyPopup';
import CloudAccountPolicyPopup from './CloudAccountPolicyPopup';
//import { PLUGIN_BASE_URL } from '../../constants';

class CompliancePolicy extends Component {
  breadCrumbs;
  cloudAccountPolicyRef;
  addOrganizationalUnitPolicyRef;
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      totalPages: '',
      currentPage: 0,
      perPageLimit: 3,
      policyData: [
        {
          mainTitle: 'AWS CCPA Framework',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CIS Foundations',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CloudGuard',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CIS Foundations',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CCPA Framework',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CloudGuard',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CloudGuard',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CIS Foundations',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CCPA Framework',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CCPA Framework',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CloudGuard',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CIS Foundations',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
      ],
      duplicatepolicyData: [
        {
          mainTitle: 'AWS CCPA Framework',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CIS Foundations',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CloudGuard',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CIS Foundations',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CCPA Framework',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CloudGuard',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CloudGuard',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CIS Foundations',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CCPA Framework',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CCPA Framework',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CloudGuard',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
        {
          mainTitle: 'AWS CIS Foundations',
          title1: 'Organizational Units / Cloud Accounts',
          title2: 'Notifications',
        },
      ],
    };
    this.breadCrumbs = [
      {
        label: 'Home',
        route: `/`,
      },
      {
        label: 'Compliance | Dashboard',
        route: `/dashboard`,
      },
      {
        label: 'Compliance Policy',
        isCurrentPage: true,
      },
    ];
    this.cloudAccountPolicyRef = React.createRef();
    this.addOrganizationalUnitPolicyRef = React.createRef();
  }

  componentDidMount() {
    this.calculateTotalPages(this.state.policyData);
  }

  calculateTotalPages = (displayData) => {
    const { perPageLimit } = this.state;
    let indexOfLastData = Math.ceil(displayData.length / perPageLimit);
    this.setState({
      totalPages: indexOfLastData,
    });
  };

  displaypolicyData = () => {
    const { policyData, perPageLimit, currentPage } = this.state;
    const retData = [];
    const length = policyData.length;
    if (length > 0) {
      for (let i = 0; i < length; i++) {
        if (i >= currentPage * perPageLimit && i <= currentPage * perPageLimit + (perPageLimit - 1)) {
          const data = policyData[i];
          retData.push(
            <div className="d-block width-100 framework-box">
              <div className="d-inline-block framework-box-heading">
                <div className="d-inline-block heading-img">
                  <img src={amazonLogo} alt="" />
                </div>
                <strong className="d-inline-block">{data.mainTitle}</strong>
              </div>
              <div className="d-block width-100 framework-inner">
                <table className="framework-table">
                  <thead>
                    <tr>
                      <th>
                        <div className="pointer-label">
                          <input type="checkbox" className="checkbox" />
                          {data.title1}
                        </div>
                      </th>
                      <th>{data.title2}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>No Policies</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        }
      }
    } else {
      retData.push(<div className="d-block width-100 there-no-data">There is no data</div>);
    }

    return retData;
  };

  onSearchChange = (e) => {
    const { value } = e.target;
    this.setState({
      searchKey: value,
    });
    const { duplicatepolicyData } = this.state;
    var searchResult = [];
    for (let i = 0; i < duplicatepolicyData.length; i++) {
      if (duplicatepolicyData[i].mainTitle.indexOf(value) !== -1 || value === '') {
        searchResult.push(duplicatepolicyData[i]);
      } else if (duplicatepolicyData[i].mainTitle.toLowerCase().indexOf(value) !== -1 || value === '') {
        searchResult.push(duplicatepolicyData[i]);
      }
    }
    this.calculateTotalPages(searchResult);
    this.setState({
      policyData: searchResult,
      currentPage: 0,
    });
  };

  peginationOfBox() {
    const { currentPage, totalPages } = this.state;
    let rows = [];
    for (let i = 0; i < totalPages; i++) {
      console.log(currentPage);
      rows.push(
        <li className="" key={i}>
          <a
            className={currentPage === i ? 'active' : 'deactive'}
            href="#"
            onClick={(e) => this.navigatePage('btn-click', e, i)}
          >
            {i + 1}
          </a>
        </li>
      );
    }
    return (
      <ul>
        <li className="previous">
          <a
            className={currentPage === 0 ? 'desable' : 'enable'}
            href="#"
            onClick={(e) => this.navigatePage('pre', e, '')}
          >
            Previous
          </a>
        </li>
        {rows}
        <li className="next">
          <a
            className={currentPage === this.state.totalPages - 1 ? 'desable' : 'enable'}
            href="#"
            onClick={(e) => this.navigatePage('next', e, '')}
          >
            Next
          </a>
        </li>
      </ul>
    );
  }

  navigatePage(target, e, i) {
    const { totalPages, currentPage } = this.state;
    e.preventDefault();
    switch (target) {
      case 'pre':
        if (currentPage !== 0) {
          this.setState({
            currentPage: currentPage - 1,
          });
        }
        break;
      case 'next':
        if (currentPage !== totalPages - 1) {
          this.setState({
            currentPage: currentPage + 1,
          });
        }
        break;
      case 'btn-click':
        this.setState({
          currentPage: i,
        });
        break;
    }
  }

  onClickCloudAccountPolicy = (e) => {
    this.cloudAccountPolicyRef.current.toggle();
  };
  onClickAddOrganizationalUnitPolicy = (e) => {
    this.addOrganizationalUnitPolicyRef.current.toggle();
  };

  render() {
    const { perPageLimit, policyData } = this.state;
    return (
      <div className="compliance-policy-container">
        {/* <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="COMPLIANCE | COMPLIANCE POLICY" /> */}
        <div className="compliancemanager-page-container">
          <div className="common-container filter-container">
            <div className="form-group filter-control-group">
              <label htmlFor="rousourceGroup">
                Platform&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="rousourceGroup">
                <option value="" selected>
                  Select Platform
                </option>
                <option value="All">All</option>
                <option value="AWS">AWS</option>
                <option value="Azure">Azure</option>
                <option value="Gcp">Gcp</option>
                <option value="Kubernetes">Kubernetes</option>
              </select>
            </div>
            <div className="form-group filter-control-group">
              <label htmlFor="resources">
                Cloud Accounts&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="resources">
                <option value="" selected>
                  Select Cloud Accounts
                </option>
                <option value="AllAccounts">All Accounts</option>
                <option value="AWS(123456)">AWS (123456)</option>
              </select>
            </div>
            <div className="form-group filter-control-group">
              <label htmlFor="timeRange">
                Ruleset&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="timeRange">
                <option value="" selected>
                  Select Ruleset
                </option>
                <option value="All">All</option>
                <option value="AWS-Test">AWS-Test</option>
                <option value="AWSNetworkAlerts">AWS Network Alerts</option>
                <option value="AzureCheckUp">Azure CheckUp</option>
                <option value="GCPCheckUp">GCP CheckUp</option>
              </select>
            </div>
            <div className="form-group filter-control-group">
              <label htmlFor="timeRange">
                Notification&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="timeRange">
                <option value="" selected>
                  Select Notification
                </option>
                <option value="NoData">No Data</option>
              </select>
            </div>
            <div className="form-group filter-control-group">
              <label htmlFor="timeRange">
                Show Associated&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="timeRange">
                <option value="" selected>
                  Select Ruleset
                </option>
                <option value="SelectAll">Select All</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group filter-control-group clear-filters">
              <button className="blue-button m-r-0 m-b-0 clear-btn">Clear All Filters</button>
            </div>
          </div>
          <div className="common-container">
            <div className="assessment-boxes">
              <div className="d-block width-100 heading">
                <div className="d-inline-block width-50 heading-left">
                  <h3>
                    Showing {policyData.length} of {perPageLimit} results
                  </h3>
                </div>
                <div className="d-inline-block width-50 text-right heading-right">
                  <a onClick={this.onClickCloudAccountPolicy} className="blue-button">
                    Add Cloud Account Policy
                  </a>
                  <a onClick={this.onClickAddOrganizationalUnitPolicy} className="blue-button m-r-0">
                    Add Organizational Unit Policy
                  </a>
                </div>
              </div>

              <div className="d-block width-100 p-t-15 p-b-20 search-box">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="d-inline-block form-group search-control-group">
                      <input
                        type="text"
                        onChange={this.onSearchChange}
                        value={this.state.searchKey}
                        className="input-group-text"
                        placeholder="Search"
                      />
                      <button>
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-block width-100">{this.displaypolicyData()}</div>

              {policyData.length > 0 && (
                <div className="d-block width-100 text-right pagination">{this.peginationOfBox()}</div>
              )}
            </div>
          </div>
        </div>
        <CloudAccountPolicyPopup ref={this.cloudAccountPolicyRef} />
        <AddOrganizationalUnitPolicyPopup ref={this.addOrganizationalUnitPolicyRef} />
      </div>
    );
  }
}
export default CompliancePolicy;