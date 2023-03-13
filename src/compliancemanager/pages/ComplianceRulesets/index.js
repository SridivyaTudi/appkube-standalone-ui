import React, {Component} from 'react';
//import * as React from 'react';
//import { Breadcrumbs } from '../../components/Breadcrumbs';
import amazonLogo from '../../img/amazon-logo.png';
import  NewRulSetPopup  from './NewRuleSetPopup';
import  NewPolicyPopup  from './NewPolicyPopup';
import  AssessmentPopup  from './AssessmentPopup';
import  CreateRemediationPopup  from './CreateRemediationPopup';
import  CreateExclusionPopup  from './CreateExclusionPopup';
//import { config } from '../../config';
//import { PLUGIN_BASE_URL } from '../../constants';
//import Utils from '../../utils';

class ComplianceRulesets extends Component{
  breadCrumbs;
  rulesetRef;
  policyRef;
  assessmentRef;
  remediationRef;
  exclusionRef;
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      totalPages: '',
      currentPage: 0,
      perPageLimit: 6,
      entities: [],
      rules: [],
      searchRules: [],
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
        label: 'Compiiance Rulesets',
        isCurrentPage: true,
      },
    ];
    this.rulesetRef = React.createRef();
    this.policyRef = React.createRef();
    this.assessmentRef = React.createRef();
    this.exclusionRef = React.createRef();
    this.remediationRef = React.createRef();
  }

  assessmentHandleClick(index) {
    // const { rules } = this.state;
    // for (let i = 0; i < rules.length; i++) {
    //     if (i == index) {
    //         rules[i].menuStatusOpen = !ruleSetData[i].menuStatusOpen;
    //     }
    // }
    // console.log(ruleSetData);
    // this.setState({
    //     ruleSetData
    // })
  }

  // componentDidMount() {
  //   Utils.getReq(config.GET_ENTITIES_LIST).then((response) => {
  //     this.setState({
  //       entities: response.data,
  //     });
  //   });
  //   console.log('entities: ', this.state.entities);
  //   Utils.getReq(config.LIST_RULES).then((response) => {
  //     this.setState({
  //       rules: response.data,
  //     });
  //     this.calculateTotalPages(this.state.rules);
  //   });
  //   this.calculateTotalPages(this.state.ruleSetData);
  // }

  calculateTotalPages = (displayData) => {
    if (displayData) {
      const { perPageLimit } = this.state;
      let indexOfLastData = Math.ceil(displayData.length / perPageLimit);
      this.setState({
        totalPages: indexOfLastData,
      });
    }
  };

  onClickonClickRunRuleset = (e) => {
    console.log('onClickonClickRunRuleset clicked');
    this.rulesetRef.current.toggle();
  };

  addNewPolicy = (e) => {
    console.log('addNewPolicy clicked');
    this.policyRef.current.toggle();
  };

  onClickonClickRunAssessment = (data) => {
    console.log('onClickonClickRunAssessment clicked');
    this.assessmentRef.current.toggle(data);
  };

  onClickonClickopenExclusionPopup = (e) => {
    console.log('onClickonClickopenExclusionPopup clicked');
    this.exclusionRef.current.toggle();
  };

  onClickonClickopenRemediationPopup = (e) => {
    console.log('onClickonClickopenRemediationPopup clicked');
    this.remediationRef.current.toggle();
  };

  displayRuleSetData = () => {
    const { rules, perPageLimit, currentPage } = this.state;
    const retData = [];
    const length = rules ? rules.length : 0;
    if (length > 0) {
      for (let i = 0; i < length; i++) {
        if (i >= currentPage * perPageLimit && i <= currentPage * perPageLimit + (perPageLimit - 1)) {
          const data = rules[i];
          retData.push(this.getDataRow(data, i));
        }
      }
    } else {
      retData.push(<div className="d-block width-100 there-no-data">There is no data</div>);
    }

    return retData;
  };

  getDataRow = (data, indx) => {
    console.log('Rule object:');
    console.log(data);
    return (
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="d-block width-100 assessment-box" onClick={() => this.onClickonClickRunAssessment(data)}>
          <div className="d-block width-100 assessment-heading">
            <i className="fa fa-caret-right left-arrow"></i>
            <strong className="d-inline-block">{data.name}</strong>
            <div className="d-inline-block float-right width-auto assessment-toggle-main">
              <a
              
                className="gray-button min-width-inherit m-r-0"
                onClick={() => this.assessmentHandleClick(indx)}
              >
                <i className="fa fa-ellipsis-v"></i>
              </a>
              {/* {data.menuStatusOpen == true && <div className="assessment-toggle">
                                <a onClick={this.onClickonClickopenRemediationPopup} className="d-inline-block">
                                    <img src={runSettingisIcon} alt="" />
                                </a>
                                <a onClick={this.onClickonClickopenExclusionPopup} className="d-inline-block">
                                    <img src={runHandIcon} alt="" />
                                </a>
                            </div>} */}
            </div>
          </div>
          <div className="d-block width-100 assessment-inner">
            <div className="d-block width-100 p-b-15">
              <div className="d-inline-block width-50">
                <strong className="d-block cat-sub-name">{data.description}</strong>
              </div>
              <div className="d-inline-block width-50 text-right">
                <img src={amazonLogo} alt="" />
              </div>
            </div>
            <div className="d-block width-100 p-b-5 cat-name">{data.entity}</div>
            <div className="d-block width-100 p-b-10 rules-policies-text">{data.checks.length}</div>
            {data.checks.map((item) => {
              <div className="d-block width-100 p-b-5 privacy-text">{item}</div>;
            })}
            <div className="d-block width-100 p-b-10 rules-policies-text">Searchable: {data.searchable}</div>
          </div>
        </div>
      </div>
    );
  };

  onSearchChange = (e) => {
    const { value } = e.target;
    this.setState({
      searchKey: value,
    });
    const { rules } = this.state;
    var searchResult = [];
    for (let i = 0; i < rules.length; i++) {
      if (rules[i].name.indexOf(value) !== -1 || value === '') {
        searchResult.push(rules[i]);
      } else if (rules[i].name.toLowerCase().indexOf(value) !== -1 || value === '') {
        searchResult.push(rules[i]);
      }
    }
    this.calculateTotalPages(searchResult);
    this.setState({
      searchRules: searchResult,
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
          
            onClick={(e) => this.navigatePage('pre', e, '')}
          >
            Previous
          </a>
        </li>
        {rows}
        <li className="next">
          <a
            className={currentPage === this.state.totalPages - 1 ? 'desable' : 'enable'}
          
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
    const { perPageLimit, rules } = this.state;
    return (
      <div className="compliance-rulesets-container">
        {/* <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="COMPLIANCE | COMPLIANCE RULESETS" /> */}
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
                Policy Category&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="resources">
                <option value="" selected>
                  Select Policy Category
                </option>
                <option value="All">All</option>
                <option value="ComplianceFramework">Compliance Framework</option>
                <option value="BestPractices">Best Practices</option>
              </select>
            </div>
            <div className="form-group filter-control-group">
              <label htmlFor="timeRange">
                Type&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="timeRange">
                <option value="" selected>
                  Select Type
                </option>
                <option value="All">All</option>
                <option value="Managed">Managed</option>
                <option value="All">Customer Managed</option>
              </select>
            </div>
            <div className="form-group filter-control-group">
              <label htmlFor="timeRange">
                Policy Enabled&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="timeRange">
                <option value="" selected>
                  Select Policy Enabled
                </option>
                <option value="All">All</option>
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
                <div className="d-inline-block width-50">
                  <h3>
                    Showing {rules.length} of {perPageLimit} results
                  </h3>
                </div>
                <div className="d-inline-block width-50 text-right">
                  <a onClick={this.addNewPolicy} className="blue-button m-b-0">
                    ADD POLICY
                  </a>
                  <a onClick={this.onClickonClickRunRuleset} className="blue-button m-r-0 m-b-0">
                    ADD RULESET
                  </a>
                </div>
                <div className="d-inline-block width-50 text-right"></div>
              </div>
              <div className="d-block width-100 p-t-15 p-b-20 search-box">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
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
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="d-block text-right width-100 view">
                      <a className="d-inline-block">
                        <i className="fa fa-bars"></i>
                      </a>
                      <a className="d-inline-block m-r-0">
                        <i className="fa fa-th-large"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block width-100">
                <div className="row">{this.displayRuleSetData()}</div>
              </div>

              {rules.length > 0 && (
                <div className="d-block width-100 text-right pagination">{this.peginationOfBox()}</div>
              )}
            </div>
          </div>
        </div>
        <AssessmentPopup ref={this.assessmentRef} />
        <NewRulSetPopup ref={this.rulesetRef} entities={this.state.entities} />
        <NewPolicyPopup ref={this.policyRef} entities={this.state.entities} rules={this.state.rules} />
        <CreateRemediationPopup ref={this.remediationRef} />
        <CreateExclusionPopup ref={this.exclusionRef} />
      </div>
    );
  }
}

export default ComplianceRulesets;
