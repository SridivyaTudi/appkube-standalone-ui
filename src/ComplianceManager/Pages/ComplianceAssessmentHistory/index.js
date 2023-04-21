import React from "react";
import { Link } from "react-router-dom";
import Table from "../../Components/Table";

class ComplianceAssessmentHistory extends React.Component {
  constructor(props) {
    super(props);
    this.tableValue = {
      columns: [
        {
          label: "Date",
          key: "date",
        },
        {
          label: "Rule Name",
          key: "ruleName",
        },
        {
          label: "Environment",
          key: "environment",
        },
        {
          label: "Result",
          key: "result",
          renderCallback: (value) => {
            let strClass = "result-text";
            return <td className={strClass}> {value}</td>;
          },
        },
        {
          label: "# Failed Tests",
          key: "failedTest",
        },
        {
          label: "# Excluded Tests",
          key: "excludedTest",
        },
        {
          label: "Triggered By",
          key: "trigger",
        },
        {
          label: "Details",
          key: "detail",
          renderCallback: (value) => {
            let strClass = "fa fa-info-circle";
            return (
              <td>
                <div className="d-inline-block">
                  <Link
                    to={`/compliancemanager/pages/compliancehistory`}
                    className="btn btn-link"
                  >
                    <i className={strClass}></i>
                  </Link>
                </div>
              </td>
            );
          },
        },
      ],
      data: [
        {
          date: "Jul 20, 2020 04:00 PM",
          ruleName: "AWS CCPA Framework",
          environment: "AWS (657907747545), Mumbai",
          result: "64%",
          failedTest: "97",
          excludedTest: "0",
          trigger: "Manual",
        },
        {
          date: "Jul 20, 2020 05:00 PM",
          ruleName: "AWS CCPA Framework",
          environment: "AWS (657907747545), Mumbai",
          result: "76%",
          failedTest: "66",
          excludedTest: "6",
          trigger: "Manual",
        },
        {
          date: "Jul 20, 2020 06:00 PM",
          ruleName: "AWS CCPA Framework",
          environment: "AWS (657907747545), Mumbai",
          result: "34%",
          failedTest: "44",
          excludedTest: "3",
          trigger: "System",
        },
      ],
    };
    this.perPageLimit = 6;
    this.checkboxValue = false;
    this.state = {};
  }

  isLightTheme() {
    const w = window;
    if (w.grafanaBootData && w.grafanaBootData.user) {
      return w.grafanaBootData.user.lightTheme;
    }
    return false;
  }

  render() {
    return (
      <div className="compliance-assessmenthistory-container">
        <div className="compliancemanager-page-container">
          <div className="common-container filter-container">
            <div className="form-group filter-control-group">
              <label htmlFor="rousourceGroup">
                Cloud Accounts&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="rousourceGroup">
                <option value="" selected>
                  Select Cloud Accounts
                </option>
                <option value="All">All Accounts</option>
                <option value="AWS">AWS(123456)</option>
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
              <label htmlFor="rousourceGroup">
                Triggered By&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="rousourceGroup">
                <option value="" selected>
                  Select Trigered By
                </option>
                <option value="All">All</option>
                <option value="Policy">Policy</option>
                <option value="Manual">Manual</option>
                <option value="System">System</option>
              </select>
            </div>
            <div className="form-group filter-control-group">
              <label htmlFor="timeRange">
                Time Period&nbsp;&nbsp;&nbsp;
                <i className="fa fa-info-circle"></i>
              </label>
              <select className="form-control" id="timeRange">
                <option value="">Select Time Period</option>
                <option value="4 Hours">4 Hours</option>
                <option value="24 Hours">24 Hours</option>
                <option value="7 Hours">7 Hours</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="form-group filter-control-group clear-filters">
              <button className="blue-button m-r-0 m-b-0 clear-btn">
                Clear All Filters
              </button>
            </div>
          </div>
          <div className="common-container results-container">
            <Table
              valueFromData={this.tableValue}
              perPageLimit={this.perPageLimit}
              visiblecheckboxStatus={this.checkboxValue}
              tableClasses={{
                table: "exclusion-data-table",
                tableParent: "container-inner",
                parentClass: "exclusion-details",
              }}
              searchKey="ruleName"
              showingLine="Showing %start% to %end% of %total% Assessment History"
              dark={!this.isLightTheme()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ComplianceAssessmentHistory;
