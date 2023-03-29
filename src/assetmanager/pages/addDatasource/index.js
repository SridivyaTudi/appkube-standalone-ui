import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../img";
import { CommonService } from "../_common/common";
import AlertMessage from "../../components/AlertMessage";
import masterDummyData from "./masterDatasourceDummy.json";
import searchData from "./searchData.json";

class AddDatasource extends React.Component {
  constructor(props) {
    super(props);
    let accountId = CommonService.getParameterByName(
      "accountId",
      window.location.href
    );
    let serverName = CommonService.getParameterByName(
      "cloudName",
      window.location.href
    );
    this.state = {
      environment: serverName ? serverName?.toLowerCase() : "",
      account: accountId ? accountId : "",
      sourceList: [],
      environmentList: [],
      accountList: [],
      searchkey: "",
      accountFromUrl: accountId ? accountId : "",
      environmentFromUrl: serverName ? serverName?.toLowerCase() : "",
      isAlertOpen: false,
      severity: null,
      message: null,
    };
  }

  componentDidMount = () => {
    this.getMasterDataSource();
    const accounts = [];
    searchData.forEach((account) => {
      accounts.push(account.accountId);
    });
    this.setState({ accountList: accounts });
    // fetch(
    //   `http://34.199.12.114:5057/api/cloud-environment/search?status=active`
    // ).then((response) => {
    //   const accounts = [];
    //   response.forEach((account) => {
    //     accounts.push(account.accountId);
    //   });
    //   this.setState({
    //     accountList: accounts,
    //   });
    // });
  };

  getMasterDataSource = () => {
    this.manipulateData(masterDummyData);
    // try {
    //   fetch(`/api/datasources/master-datasources`).then((response) => {
    //     console.log("Loading Asstes : ", response);
    //   });
    // } catch (err) {
    //   console.log("Loading Asstes failed. Error: ", err);
    // }
  };

  manipulateData = (data) => {
    let { environmentList } = this.state;
    let dataobj = {};
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let datasource = data[i];
        dataobj[datasource.cloudType] = dataobj[datasource.cloudType] || [];
        datasource.jsonData["uniqId"] = datasource.id;
        dataobj[datasource.cloudType].push(datasource.jsonData);
        if (environmentList && environmentList.length > 0) {
          if (environmentList.indexOf(datasource.cloudType) === -1) {
            environmentList.push(datasource.cloudType);
          }
        } else {
          environmentList.push(datasource.cloudType);
        }
      }
    }
    this.setState({
      sourceList: dataobj,
      environmentList,
    });
  };

  displayDataSource = () => {
    let retData = [];
    const { sourceList, environment, account } = this.state;
    if (sourceList) {
      Object.keys(sourceList).map((source, indexedDB) => {
        if (
          (source == environment || environment === "") &&
          !sourceList[source]["isHide"]
        ) {
          retData.push(
            <React.Fragment>
              <div className="services-heading">
                <span>
                  <img src={images.awsLogo} alt="" />
                </span>
                <h5>{source ? source : "Others"}</h5>
              </div>
              <div className="source-inner-box">
                {sourceList[source] &&
                  sourceList[source].map((accountdata, i) => {
                    if (!accountdata.isHide) {
                      return (
                        <React.Fragment>
                          {account && environment ? (
                            <Link
                              to={`/assetmanager/pages/add-datasource-credential?sourceName=${environment}&accountId=${account}&Id=${accountdata.name}`}
                            >
                              <div className="source-box">
                                <div className="images">
                                  <img
                                    src={accountdata.info.logos.small}
                                    height="50px"
                                    width="50px"
                                    alt=""
                                  />
                                </div>
                                <div className="source-content">
                                  <label>{accountdata.name}</label>
                                  <span>{accountdata.type}</span>
                                  <p>{accountdata.info.description}</p>
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <div
                              className="source-box"
                              onClick={() =>
                                this.toggleAlert(
                                  "Please select account and environment",
                                  "warning",
                                  true
                                )
                              }
                            >
                              <div className="images">
                                <img
                                  src={accountdata.info.logos.small}
                                  height="50px"
                                  width="50px"
                                  alt=""
                                />
                              </div>
                              <div className="source-content">
                                <label>{accountdata.name}</label>
                                <span>{accountdata.type}</span>
                                <p>{accountdata.info.description}</p>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    }
                    return;
                  })}
              </div>
            </React.Fragment>
          );
        }
      });
    }
    if (retData && retData.length == 0) {
      retData.push(
        <div className="d-flex">
          <span>Data source not found, select other account.</span>
        </div>
      );
    }
    return retData;
  };

  onChangeDataSource = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleStateChange = (e) => {
    const { sourceList } = this.state;
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    Object.keys(sourceList).map((source, indexedDB) => {
      {
        sourceList[source] &&
          sourceList[source].map((accountdata, i) => {
            if (accountdata.name.toLowerCase().indexOf(value) === -1) {
              sourceList[source][i].isHide = true;
            } else {
              sourceList[source][i].isHide = false;
            }
          });
        let count = 0;
        for (let j = 0; j < sourceList[source].length; j++) {
          if (sourceList[source][j].isHide == true) {
            count++;
          }
        }
        if (count == sourceList[source].length) {
          sourceList[source]["isHide"] = true;
        } else {
          sourceList[source]["isHide"] = false;
        }
      }
    });
    this.setState({
      sourceList,
    });
  };

  toggleAlert = (message, severity, isAlertOpen) => {
    this.setState({
      isAlertOpen,
      message,
      severity,
    });
  };

  handleCloseAlert = () => {
    this.setState({
      isAlertOpen: false,
      message: "",
      severity: "",
    });
  };

  render() {
    const {
      environment,
      account,
      environmentList,
      accountList,
      searchkey,
      accountFromUrl,
      environmentFromUrl,
      isAlertOpen,
      severity,
      message,
    } = this.state;
    return (
      <div className="add-data-source-container">
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={isAlertOpen}
          severity={severity}
          msg={message}
        ></AlertMessage>
        <div className="add-data-source-page-container">
          <div className="data-source-section">
            <div className="source-head">
              <h3>inputs</h3>
              <div className="right-search-bar">
                <div className="search-box">
                  <form>
                    <div className="form-group search-control-group m-b-0">
                      <input
                        type="text"
                        name="searchkey"
                        value={searchkey}
                        className="input-group-text"
                        placeholder="Search"
                        onChange={this.handleStateChange}
                      />
                      <button className="btn btn-search">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </form>
                </div>

                <div className="back-btn">
                  <Link
                    to="/assetmanager/pages/environments"
                    type="button"
                    className="btn btn-link"
                  >
                    <i className="far fa-arrow-alt-circle-left" />
                    Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="source-content">
              <div className="heading">
                <h4>Input</h4>
              </div>
              <div className="account-details-heading">
                <h5>Account Details</h5>
              </div>
              <div className="environgment-details">
                <div className="form-group description-content select-data-source">
                  <label htmlFor="description">Select Environment</label>
                  <select
                    className="input-group-text"
                    name="environment"
                    value={environment}
                    onChange={this.onChangeDataSource}
                    disabled={accountFromUrl && environmentFromUrl}
                  >
                    <option key={-1} value={""}>
                      Select Environment
                    </option>
                    {environmentList &&
                      environmentList.length > 0 &&
                      environmentList.map((val, index) => {
                        return (
                          <option key={index} value={val}>
                            {val}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group description-content select-data-source">
                  <label htmlFor="description">Select Account</label>
                  <select
                    className="input-group-text"
                    name="account"
                    value={account}
                    onChange={this.onChangeDataSource}
                    disabled={accountFromUrl && environmentFromUrl}
                  >
                    <option key={-1} value={""}>
                      Select Account
                    </option>
                    {accountList &&
                      accountList.length > 0 &&
                      accountList.map((val, index) => {
                        return (
                          <option key={index} value={val}>
                            {val}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="source-boxs">{this.displayDataSource()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddDatasource;
