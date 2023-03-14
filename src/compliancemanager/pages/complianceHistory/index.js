import React, {Component} from 'react';
//import * as React from 'react';
//import { PLUGIN_BASE_URL } from '../../constants';
//import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Progress } from 'reactstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

class ComplianceHistory extends Component {
  breadCrumbs;
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      totalPages: '',
      currentPage: 0,
      perPageLimit: 2,
      historyData: [
        {
          mainTitle: 'Credentials report was generated in the last 24 hours',
          status: 'Failed',
          step1: 'TASTED',
          step2: 'RELEVENT',
          step3: 'NON COMPLAINT',
          detail: 'Prerequisite for CIS AWS Credentials Sections 1.1, 1.2, 1.3, 1.4, 1.12',
        },
        {
          mainTitle: 'Credentials report was generated in the last 24 hours',
          status: 'Passed',
          step1: 'TASTED',
          step2: 'RELEVENT',
          step3: 'NON COMPLAINT',
          detail: 'Prerequisite for CIS AWS Credentials Sections 1.1, 1.2, 1.3, 1.4, 1.12',
        },
        {
          mainTitle: 'Credentials report was generated in the last 24 hours',
          status: 'Failed',
          step1: 'TASTED',
          step2: 'RELEVENT',
          step3: 'NON COMPLAINT',
          detail: 'Prerequisite for CIS AWS Credentials Sections 1.1, 1.2, 1.3, 1.4, 1.12',
        },
      ],
      duplicateHistoryData: [
        {
          mainTitle: 'Credentials report was generated in the last 24 hours',
          status: 'Failed',
          step1: 'TASTED',
          step2: 'RELEVENT',
          step3: 'NON COMPLAINT',
          detail: 'Prerequisite for CIS AWS Credentials Sections 1.1, 1.2, 1.3, 1.4, 1.12',
        },
        {
          mainTitle: 'Credentials report was generated in the last 24 hours',
          status: 'Passed',
          step1: 'TASTED',
          step2: 'RELEVENT',
          step3: 'NON COMPLAINT',
          detail: 'Prerequisite for CIS AWS Credentials Sections 1.1, 1.2, 1.3, 1.4, 1.12',
        },
        {
          mainTitle: 'Credentials report was generated in the last 24 hours',
          status: 'Failed',
          step1: 'TASTED',
          step2: 'RELEVENT',
          step3: 'NON COMPLAINT',
          detail: 'Prerequisite for CIS AWS Credentials Sections 1.1, 1.2, 1.3, 1.4, 1.12',
        },
      ],
      barData: [
        {
          label: 'Line Dataset',
          lineTension: 0.2,
          fill: false,
          borderColor: 'rgba(255,255,255,0.5)',
          data: ['50', '30', '70', '90'],
          borderWidth: 2,
          type: 'line',
        },
      ],
      barLabels: ['Lam', 'Cloud', 'Security', 'KMS'],        
      singleChartdata: [
        {
          data: [100],
          backgroundColor: ['#E31335'],
        },
      ],
      singleLabels: ['High'],
      pieLabels: ['S3 Buge', 'Cloud', 'lamUser'],
      pieData: [
        {
          data: [15, 17, 90],
          backgroundColor: ['#E31335', '#15C64C', '#3C495A'],
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
        label: 'Assessment History',
        isCurrentPage: true,
      },
    ];
  }

  barOptions = {
    scales: {
      x: {
        ticks: {
          fontColor: 'white',
          stepSize: 12,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  };

  pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
    },
  };

  onSearchChange = (e) => {
    const { value } = e.target;
    this.setState({
      searchKey: value,
    });
    const { duplicateHistoryData } = this.state;
    var searchResult = [];
    for (let i = 0; i < duplicateHistoryData.length; i++) {
      if (duplicateHistoryData[i].mainTitle.indexOf(value) !== -1 || value === '') {
        searchResult.push(duplicateHistoryData[i]);
      } else if (duplicateHistoryData[i].mainTitle.toLowerCase().indexOf(value) !== -1 || value === '') {
        searchResult.push(duplicateHistoryData[i]);
      }
    }
    this.calculateTotalPages(searchResult);
    this.setState({
      historyData: searchResult,
      currentPage: 0,
    });
  };

  componentDidMount() {
    this.calculateTotalPages(this.state.historyData);
  }

  calculateTotalPages = (displayData) => {
    const { perPageLimit } = this.state;
    let indexOfLastData = Math.ceil(displayData.length / perPageLimit);
    this.setState({
      totalPages: indexOfLastData,
    });
  };

  displayNo_of_data = 0;

  displayHistoryData = () => {
    const { historyData, perPageLimit, currentPage } = this.state;
    const retData = [];
    const length = historyData.length;
    if (length > 0) {
      for (let i = 0; i < length; i++) {
        if (i >= currentPage * perPageLimit && i <= currentPage * perPageLimit + (perPageLimit - 1)) {
          const data = historyData[i];
          retData.push(
            <div
              className={
                data.status == 'Failed'
                  ? 'd-block width-100 p-b-15 credentials-box failed'
                  : 'd-block width-100 p-b-15 credentials-box passed'
              }
            >
              <div className="heading d-inline-block">{data.status}</div>
              <div className="d-block width-100 p-t-15 p-r-15 p-b-5 p-l-15 credential">
                <div className="row">
                  <div className="col-lg-10 col-md-9 col-sm-12">
                    <div className="d-block width-100 credential-text">{data.mainTitle}</div>
                    <p className="d-block width-100">
                      I am should have creadentialReportGeneratedTime after (-24, 'hours')
                    </p>
                    <div className="d-block width-100 tasted-boxes">
                      <div className="d-inline-block p-r-5 tasted-box">
                        <span className="d-inline-block">1</span> {data.step1}
                      </div>
                      <div className="d-inline-block p-r-5 tasted-box">
                        <span className="d-inline-block">1</span> {data.step2}
                      </div>
                      <div className="d-inline-block p-r-5 tasted-box">
                        <span className="d-inline-block non-complaint">1</span> {data.step3}
                      </div>
                    </div>
                    <div className="d-inline-block credential-bottom-text">{data.detail}</div>
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-12 high-expand">
                    <div className="high">HIGH</div>
                    <div className="expand">Expand</div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    } else {
      retData.push(<div className="d-block width-100 there-no-data">There is no data</div>);
    }
    this.displayNo_of_data = retData.length;
    return retData;
  };

  peginationOfBox() {
    const { currentPage, totalPages } = this.state;
    let rows = [];
    for (let i = 0; i < totalPages; i++) {
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

  render() {
    const { historyData, barData, barLabels, singleChartdata, singleLabels, pieLabels, pieData } = this.state;
    const now = 60;
    return (
      <div className="compliance-history-container">
        {/* <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="COMPLIANCE | ASSESSMENT HISTORY" /> */}
        <div className="compliancemanager-page-container">
          <div className="common-container results-container">
            <div className="d-block heading">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h2>
                    <strong>RESULTS</strong> ( Ruleset: AWS CCP Framework, Account: AWS | Mumbai )
                  </h2>
                  <p>July 16 2020 05 : 20 PM</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 text-right">
                  <a className="white-button m-r-0 min-width-inherit width-auto back-button">
                    <i className="fa fa-arrow-circle-o-left"></i> Back
                  </a>
                </div>
              </div>
            </div>
            <div className="d-block p-t-20">
              <div className="d-inline-block results-left-chart">
                <div className="d-inline-block chart-box">
                  <div className="d-block heading">
                    <strong>Test Score</strong>
                  </div>
                  <div className="d-block chart-inner">
                    <div className="text-center progress-text">{now}% 4/12 passed tests (5 excluded)</div>
                    <Progress color="success" value={now} />
                  </div>
                </div>
                <div className="d-inline-block chart-box">
                  <div className="d-block heading">
                    <strong>Failed Tests by Rule Serverity</strong>
                  </div>
                  <div className="d-block chart-inner">
                    <Pie data={{datasets: singleChartdata, labels: singleLabels}} options={this.pieOptions} />
                  </div>
                </div>
                <div className="d-inline-block chart-box green-chart">
                  <div className="d-block heading">
                    <strong>Entitles by Type, Pass Vs Fail</strong>
                  </div>
                  <div className="d-block chart-inner">
                    <Bar data={{datasets: barData, labels: barLabels}} options={this.barOptions} />
                  </div>
                </div>
                <div className="d-inline-block chart-box">
                  <div className="d-block heading">
                    <strong>Tested Entities</strong>
                  </div>
                  <div className="d-block chart-inner">
                    <Pie data={{datasets: pieData, labels: pieLabels}} options={this.pieOptions} />
                  </div>
                </div>
              </div>
              <div className="d-inline-block float-right results-right-chart">
                <div className="d-block map-box">
                  <div className="d-block heading">
                    <strong>Distribution by Geolocation</strong>
                  </div>
                  <div className="d-block map-inner">
                    <iframe
                      width="100%"
                      height="290"
                      frameBorder="0"
                      scrolling="no"
                      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=usa+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container filter-container">
            <div className="row">
              <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="form-group filter-control-group">
                  <label htmlFor="rulesGroup">
                    Rules&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-info-circle"></i>
                  </label>
                  <select className="form-control" id="selectRules">
                    <option value="" selected>
                      Select Rules
                    </option>
                    <option value="All">All</option>
                    <option value="Passed">Passed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div className="form-group filter-control-group">
                  <label htmlFor="resourcesGroup">
                    Severity&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-info-circle"></i>
                  </label>
                  <select className="form-control" id="selectSeverity">
                    <option value="">Select Severity</option>
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="form-group filter-control-group">
                  <label htmlFor="typeGroup">
                    Type&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-info-circle"></i>
                  </label>
                  <select className="form-control" id="selectType">
                    <option value="All">All</option>
                    <option value="S3Bucket">S3Bucket</option>
                    <option value="CloudTrail">CloudTrail</option>
                    <option value="Lambda">Lambda</option>
                  </select>
                </div>
                <div className="form-group filter-control-group">
                  <label htmlFor="complianceSectionGroup">
                    Compliance Section&nbsp;&nbsp;&nbsp;
                    <i className="fa fa-info-circle"></i>
                  </label>
                  <select className="form-control" id="ComplianceSection">
                    <option value="selectComplianceSection">Select Compliance Section</option>
                    <option value="All">All</option>
                    <option value="1798185">1798 185</option>
                    <option value="1798150">1798 150</option>
                    <option value="1798105">1798 105</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="d-inline-block form-group search-control-group">
                  <form>
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
                  </form>
                </div>
              </div>
            </div>
            <div className="d-block width-100 p-t-20 showing-showing-text">
              <h3>
                Showing {historyData.length} of {this.displayNo_of_data} results
              </h3>
            </div>
            <div className="d-block width-100 p-t-20">{this.displayHistoryData()}</div>
            {historyData.length > 0 && (
              <div className="d-block width-100 text-right pagination">{this.peginationOfBox()}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default ComplianceHistory;
