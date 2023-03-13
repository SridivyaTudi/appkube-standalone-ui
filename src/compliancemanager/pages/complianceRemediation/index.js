import React, {Component} from 'react';
//import * as React from 'react';
//import { PLUGIN_BASE_URL } from '../../constants';
//import { Breadcrumbs } from '../../components/Breadcrumbs';
import  DeleteRemediationPopup  from './DeleteRemediationPopup';
import  EditRemediationPopup  from './EditRemediationPopup';
import fileExportIcon from '../../img/file-export.png';
//import Table from './../../components/table';

class ComplianceRemediation extends Component{
  breadCrumbs;
  deleteRemediationRef;
  editRemediationRef;
  tableValue;
  perPageLimit;
  checkboxValue;
  constructor(props) {
    super(props);
    this.tableValue = {
      columns: [
        {
          label: 'Ruleset',
          key: 'ruleSet',
        },
        {
          label: 'Rule Name',
          key: 'ruleName',
        },
        {
          label: 'Cloud Account',
          key: 'cloudAmount',
        },
        {
          label: 'Entity Name',
          key: 'entityName',
        },
        {
          label: 'Entity ID',
          key: 'entityId',
        },
        {
          label: 'Commnets',
          key: 'comments',
        },
        {
          label: 'Action',
          key: 'action',
          renderCallback: (value) => {
            return (
              <td>
                <div className="d-flex">
                  <button onClick={this.onClickEditRemediation} className="btn btn-link">
                    <i className="fa fa-edit"></i>
                  </button>
                  <button onClick={this.onClickDeleteRemediation} className="btn btn-link">
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </td>
            );
          },
        },
      ],
      data: [
        {
          ruleSet: 'AWS CIS Foundation v.1.0.0',
          ruleName: 'Avoid the use of the root account',
          cloudAmount: 'AWS (657907747545)',
          entityName: 'Account Summary',
          entityId: '',
          comments: 'Password policy excluded.',
        },
        {
          ruleSet: 'AWS CIS Foundation v.1.0.1',
          ruleName: 'Prod_DB_SYN15',
          cloudAmount: 'AWS (657907747545)',
          entityName: 'Account Summary',
          entityId: '',
          comments: 'Password policy excluded.',
        },
        {
          ruleSet: 'AWS CIS Foundation v.1.0.2',
          ruleName: 'Dev_L3Switch',
          cloudAmount: 'AWS (657907747545)',
          entityName: 'Account Summary',
          entityId: '12345',
          comments: 'Password policy excluded.',
        },
        {
          ruleSet: 'AWS CIS Foundation v.1.0.3',
          ruleName: 'Dev-SYN-SYN13',
          cloudAmount: 'AWS (657907747545)',
          entityName: 'Account Summary',
          entityId: '',
          comments: 'Password policy excluded.',
        },
        {
          ruleSet: 'AWS CIS Foundation v.1.0.4',
          ruleName: 'Dev_SYN_SYN12',
          cloudAmount: 'AWS (657907747545)',
          entityName: 'Account Summary',
          entityId: '',
          comments: 'Password policy excluded.',
        },
        {
          ruleSet: 'AWS CIS Foundation v.1.0.5',
          ruleName: 'Prod_DB_SYN28',
          cloudAmount: 'AWS (657907747545)',
          entityName: 'Account Summary',
          entityId: '',
          comments: 'Password policy excluded.',
        },
      ],
    };
    // (this.perPageLimit = 6), (this.checkboxValue = true), (this.state = {});
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
        label: 'Remediation',
        isCurrentPage: true,
      },
    ];
    this.deleteRemediationRef = React.createRef();
    this.editRemediationRef = React.createRef();
    this.fileExportHandleClick = this.fileExportHandleClick.bind(this);
  }

  fileExportHandleClick() {
    var toggle = this.state.fileExportActive === 'active' ? '' : 'active';
    this.setState({ fileExportActive: toggle });
  }

  onClickDeleteRemediation = (e) => {
    this.deleteRemediationRef.current.toggle();
  };

  onClickEditRemediation = (e) => {
    this.editRemediationRef.current.toggle();
  };

  isLightTheme() {
    const w = window;
    if (w.grafanaBootData && w.grafanaBootData.user) {
      return w.grafanaBootData.user.lightTheme;
    }
    return false;
  }

  render() {
    return (
      <div className="compliance-remediation-container">
        {/* <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="COMPLIANCE | Remediation" /> */}
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
                Ruleset&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="resources">
                <option value="">Select Ruleset</option>
                <option value="All">All</option>
                <option value="AWS-Test">AWS-Test</option>
                <option value="AwsnetWorkAlerts">AWS Network Alerts</option>
                <option value="AzureCheckUp">Azure CheckUp</option>
                <option value="GcpCheckUp">GCP CheckUp</option>
              </select>
            </div>
            <div className="form-group filter-control-group">
              <label htmlFor="timeRange">
                Organizational Unit&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="timeRange">
                <option value="">Select Organizational Unit</option>
                <option value="Synectiks">Synectiks</option>
              </select>
            </div>
            <div className="form-group filter-control-group clear-filters">
              <button className="blue-button m-r-0 m-b-0 clear-btn">Clear All Filters</button>
            </div>
          </div>
          <div className="common-container results-container">
            <div className="d-block width-100 heading">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                  <div className="d-inline-block p-r-10 search-box">
                    <div className="d-block text-right file-export">
                      <a className="white-button m-r-0" onClick={this.fileExportHandleClick}>
                        <img src={fileExportIcon} alt="" />
                      </a>

                      <div className={`file-export-toggle `}>
                        <ul>
                          <li>
                            <img src={fileExportIcon} alt="" /> Export to CSV - All Result
                          </li>
                          <li>
                            <img src={fileExportIcon} alt="" /> Export to CSV - Flitered Result
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="d-inline-block exclusion-button">
                    <a onClick={this.onClickEditRemediation} className="blue-button m-r-0">
                      CREATE NEW REMEDIATION
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-block p-t-20 exclusion-details">
              {/* <Table
                valueFromData={this.tableValue}
                perPageLimit={this.perPageLimit}
                visiblecheckboxStatus={this.checkboxValue}
                tableClasses={{
                  table: 'exclusion-data-table',
                  tableParent: 'container-inner',
                  parentClass: 'exclusion-details',
                }}
                searchKey="ruleSet"
                showingLine="Showing %start% to %end% of %total% results"
                dark={!this.isLightTheme()}
              /> */}
            </div>
          </div>
        </div>
        <DeleteRemediationPopup ref={this.deleteRemediationRef} />
        <EditRemediationPopup ref={this.editRemediationRef} />
      </div>
    );
  }
}
export default ComplianceRemediation;  
