import React, { Component } from "react";
import Aws from "../../../../assets/img/aws.png";
import Alerts from "./Alerts";
import Inputs from "./Inputs";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import Microsoftazure from "../../../../assets/img/microsoftazure.png";
import { config } from "./../../../config";
import GoogleCloud from "../../../../assets/img/google-cloud.png";
import Kubernetes from "../../../../assets/img/kubernetes.png";
const headers = [
  { label: "Service Name", key: "name" },
  { label: "Product", key: "product_count" },
  { label: "App Service", key: "app_count" },
  { label: "Data Service", key: "data_count" },
];
const LOGOS = {
  aws: Aws,
  azure: Microsoftazure,
  gcp: GoogleCloud,
  kubernetes: Kubernetes,
};
class CommonFilterViewSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectFilter: false,
      showServiceViewFilter: false,
      accountList: [],...props.data
    };
  }
  componentDidMount() {
    this.getAccountList();
  }
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
        });
      });
  };
  renderAccountList = () => {
   return Object.keys(this.state.accountList).map((key) => {
      return this.state.accountList[key].map((account, innerKey) => {
        return (
          <li key={innerKey}>
            <Link
              to={`/assetmanager/pages/environments/environmentlist?accountId=${account.accountId}&cloudName=${account.cloud}`} onClick={()=>{
                this.setState({showServiceViewFilter:false})
                this.props.updateAccountId(account.accountId)
                localStorage.setItem('serviceName',account.cloud)
              }}
            >
              <span>
                <img
                  src={LOGOS[account.cloud.toLowerCase()]}
                  alt={account.cloud}
                />
              </span>
              <p>({account.accountId})</p>
            </Link>
          </li>
        );
      });
    });
  };
  componentDidUpdate = async (prevState, prevProps) => {
  if (
      this.props.data.vpcsDetails !== null &&
      this.props.data.vpcsDetails !== this.state.vpcsDetails
    ) {
      this.setState({ vpcsDetails:this.props.data.vpcsDetails })
    }
  };
  render() {
    const { showSelectFilter, showServiceViewFilter } = this.state;
    return (
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
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
            <div
              className={
                showSelectFilter === true
                  ? "fliter-collapse active"
                  : "fliter-collapse"
              }
            >
              <div className="search-bar">
                <input type="text" placeholder="Search...." />
              </div>
              <ul>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => this.handleChecked()}
                  />
                  OU
                </li>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => this.handleChecked()}
                  />
                  Status
                </li>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => this.handleChecked()}
                  />
                  No of Assets
                </li>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => this.handleChecked()}
                  />
                  Logs
                </li>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => this.handleChecked()}
                  />
                  Performance & Availability
                </li>
              </ul>
            </div>
            <div
              className={
                showSelectFilter === true
                  ? "fliters-collapse-bg active"
                  : "fliters-collapse-bg"
              }
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
                showServiceViewFilter === true
                  ? "fliter-collapse recent-collapse active"
                  : "fliter-collapse"
              }
            >
              <ul>
                {this.state.accountList &&
                Object.keys(this.state.accountList).length ? (
                  this.renderAccountList()
                ) : (
                  <></>
                )}
                {/* <li>
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
                </li> */}
              </ul>
            </div>
            <div
              className={
                showServiceViewFilter === true
                  ? "fliters-collapse-bg active"
                  : "fliters-collapse-bg"
              }
              onClick={() =>
                this.setState({
                  showServiceViewFilter: !showServiceViewFilter,
                })
              }
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="d-inline-block width-100 text-right">
            {this.state.vpcsDetails && this.state.vpcsDetails.length ? (
              <CSVLink
                data={this.state.vpcsDetails}
                headers={headers}
                filename={"vpcs.csv"}
                target="_blank"
              >
                <button class="new-button">
                  <i className="fas fa-external-link-square-alt p-r-10"></i>
                  Export
                </button>
              </CSVLink>
            ) : (
              <></>
            )}
            <div className="search-box">
              <div className="form-group search-control-group m-b-0">
                <input
                  type="text"
                  className="input-group-text"
                  placeholder="Search"
                  onChange={(e) => {
                    this.props.handleSearch(e.target.value);
                  }}
                />
                <button className="search-btn">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommonFilterViewSearch;
