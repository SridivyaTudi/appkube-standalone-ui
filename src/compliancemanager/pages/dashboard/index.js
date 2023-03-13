import React, {Component} from 'react';
//import { Breadcrumbs } from '../../components/Breadcrumbs';
import settingsIcon from '../../img/settings.png';
import fileExportIcon from '../../img/file-export.png';
import  AssessmentPopup  from './assessmentPopup';
import  AssetssmentPopup  from './assetssmentPopup';

class ComplianDashboard extends Component{
  breadCrumbs;
  assessmentRef;
  assetssmentRef;
  constructor(props) {
    super(props);
    this.state = {
      settingsActive: false,
      fileExporActive: false,
      dashboardData: [
        {
          title: 'AWS Network Alerts',
          awsdata: 'AWS (657907747545)',
          percentage: '55%',
          color: 'orange',
        },
        {
          title: 'AWS HIPPA',
          awsdata: 'AWS (657907747545)',
          percentage: '92%',
          color: 'yellow-green',
        },
        {
          title: 'Azure CheckUp',
          awsdata: 'AWS (657907747545)',
          percentage: '9%',
          color: 'red',
        },
        {
          title: 'GCP CheckUp',
          awsdata: 'AWS (657907747545)',
          percentage: '',
          color: '',
        },
        {
          title: 'AWS Dashboard',
          awsdata: 'AWS (657907747545)',
          percentage: '66%',
          color: 'orange',
        },
        {
          title: 'AWS S3 Bucket',
          awsdata: 'AWS (657907747545)',
          percentage: '',
          color: '',
        },
        {
          title: 'AWS CIS Foundations',
          awsdata: 'AWS (657907747545)',
          percentage: '85%',
          color: 'orange',
        },
        {
          title: 'AWS NIST 800-53 Rev 4',
          awsdata: 'AWS (657907747545)',
          percentage: '2%',
          color: 'red',
        },
        {
          title: 'GCP CIS Foundations',
          awsdata: 'AWS (657907747545)',
          percentage: '35%',
          color: 'orange',
        },
        {
          title: 'Azure CIS Foundations',
          awsdata: 'AWS (657907747545)',
          percentage: '100%',
          color: 'yellow-green',
        },
      ],
      settingsToggle: true,
    };
    this.breadCrumbs = [
      {
        label: 'Home',
        route: `/`,
      },
      {
        label: 'Compiiance | Dashboard',
        isCurrentPage: true,
      },
    ];

    this.assessmentRef = React.createRef();
    this.assetssmentRef = React.createRef();
    this.settingsHandleClick = this.settingsHandleClick.bind(this);
    this.fileExportHandleClick = this.fileExportHandleClick.bind(this);
  }

  settingsHandleClick() {
    let openStatus = !this.state.settingsActive;
    this.setState({ settingsActive: openStatus });
  }

  fileExportHandleClick() {
    var toggle = !this.state.fileExporActive;
    this.setState({ fileExporActive: toggle });
  }

  onClickonClickRunAssessment = (e) => {
    this.assessmentRef.current.toggle();
  };

  onClickonClickRunAssetssment = (e) => {
    this.assetssmentRef.current.toggle();
  };

  displayDashboardData() {
    const { dashboardData } = this.state;
    const retData = [];
    for (let i = 0; i < dashboardData.length; i++) {
      const data = dashboardData[i];
      retData.push(
        <div className="col-xl-5 col-lg-4 col-md-6 col-sm-12">
          <div className="d-block compliance-main-box" onClick={this.onClickonClickRunAssetssment}>
            <div className="d-block heading">
              <strong className="d-inline-block">{data.title}</strong>
              <i className="fa fa-caret-right float-right"></i>
            </div>
            <div className="d-block text-center compliance-inner">
              <p className="d-block">{data.awsdata}</p>
              {data.percentage != '' && (
                <span className={data.color != '' ? data.color : 'd-block'}>{data.percentage}</span>
              )}
              {data.percentage == '' && (
                <a className="d-block">
                  Click to run
                </a>
              )}
            </div>
          </div>
        </div>
      );
    }
    return retData;
  }

  render() {
    const { settingsActive, fileExporActive } = this.state;
    return (
      <div className="compliance-dashboard-container">
        {/* <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="COMPLIANCE | DASHBOARD" /> */}
        <div className="compliancemanager-page-container">
          <div className="common-container filter-container">
            <div className="row">
              <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12">
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
                <div className="form-group filter-control-group m-r-0 clear-filters">
                  <button className="blue-button m-r-0 m-b-0 clear-btn">Clear All Filters</button>
                </div>
              </div>
              <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                <div className="form-group filter-control-group assessments">
                  <a onClick={this.onClickonClickRunAssessment} className="blue-button">
                    <i className="fa fa-caret-right"></i>&nbsp;&nbsp; RUN ASSESSMENTS
                  </a>

                  <div className="d-inline-block settings">
                    <a className="white-button" onClick={this.settingsHandleClick}>
                      <img src={settingsIcon} alt="" />
                    </a>

                    {settingsActive && (
                      <div>
                        <div className="open-full-screen" onClick={this.settingsHandleClick}></div>
                        <div className="settings-toggle">
                          <ul>
                            <li>
                              <span className="red">Red </span>
                              <span>form </span>
                              <span className="p-r-5">0% </span>
                              <span className="p-r-5">to </span>
                              <span>10%</span>
                            </li>
                            <li>
                              <span className="orange">Yellow </span>
                              <span>form </span>
                              <span className="p-r-5">10% </span>
                              <span className="p-r-5">to </span>
                              <span>90%</span>
                            </li>
                            <li>
                              <span className="yellow-green">Green </span>
                              <span>form </span>
                              <span className="p-r-5">90% </span>
                              <span className="p-r-5">to </span>
                              <span>100%</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="d-inline-block file-export">
                    <a className="white-button m-r-0" onClick={this.fileExportHandleClick}>
                      <img src={fileExportIcon} alt="" />
                    </a>

                    {fileExporActive && (
                      <div className="file-export-toggle">
                        <ul>
                          <li>
                            <img src={fileExportIcon} alt="" /> Export to CSV - All Result
                          </li>
                          <li>
                            <img src={fileExportIcon} alt="" /> Export to CSV - Flitered Result
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container">
            <div className="row">{this.displayDashboardData()}</div>
          </div>
        </div>
        <AssessmentPopup ref={this.assessmentRef} />
        <AssetssmentPopup ref={this.assetssmentRef} />
      </div>
    );
  }
}

export default ComplianDashboard;
