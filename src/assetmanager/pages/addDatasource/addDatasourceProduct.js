import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../img";
import dummyData from "./DataSourcesDummy.json";

class AddDatasourceProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      environment: "",
      account: "",
      sourceList: [],
      environmentList: [],
      accountList: [],
      searchkey: "",
    };
  }

  async componentDidMount() {
    await this.getAccountList();
  }

  getAccountList = async () => {
    this.manipulateData(dummyData);
  };

  manipulateData = (data) => {
    let { environmentList, accountList } = this.state;
    let dataobj = {};
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].accountID) {
          dataobj[data[i].cloudType] = dataobj[data[i].cloudType] || {};
          dataobj[data[i].cloudType][data[i].accountID] =
            dataobj[data[i].cloudType][data[i].accountID] || [];
          dataobj[data[i].cloudType][data[i].accountID].push(data[i]);
          if (environmentList && environmentList.length > 0) {
            if (environmentList.indexOf(data[i].cloudType) === -1) {
              environmentList.push(data[i].cloudType);
            }
          } else {
            environmentList.push(data[i].cloudType);
          }

          if (data[i].accountID && data[i].accountID != "") {
            if (accountList && accountList.length > 0) {
              if (accountList.indexOf(data[i].accountID) === -1) {
                accountList.push(data[i].accountID);
              }
            } else {
              accountList.push(data[i].accountID);
            }
          }
        }
      }
    }
    this.setState({
      sourceList: dataobj,
      environmentList,
      accountList,
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
              <div className="account-details-heading">
                <span>
                  <img src={images.awsLogo} alt="" />
                </span>
                <h5>{source}</h5>
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <p className="account-input-heading">
                    {source} Account specific Input sources
                  </p>
                </div>
                {Object.keys(sourceList[source]).map((datasource, i) => {
                  if (
                    (account == "" || account == datasource) &&
                    !sourceList[source][datasource]["isHide"]
                  ) {
                    return (
                      <React.Fragment>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="services-heading">
                            <p>
                              Account &#8282;
                              <span>
                                {source} {datasource}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="source-boxs">
                          {sourceList[source][datasource] &&
                            sourceList[source][datasource].map(
                              (accountdata, i) => {
                                if (
                                  (accountdata.accountID == account ||
                                    account == "") &&
                                  !accountdata.isHide
                                ) {
                                  return (
                                    <Link
                                      to={`/datasources/edit/${accountdata.uid}`}
                                    >
                                      <div className="source-box">
                                        <div className="images">
                                          <img
                                            src={accountdata.typeLogoUrl}
                                            height="50px"
                                            width="50px"
                                            alt=""
                                          />
                                        </div>
                                        <div className="source-content">
                                          <label>{accountdata.name}</label>
                                          <span>{accountdata.cloudType}</span>
                                          <p>Pull AWS matrics with cloud API</p>
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                } else {
                                  return;
                                }
                              }
                            )}
                        </div>
                      </React.Fragment>
                    );
                  } else {
                    return;
                  }
                })}
              </div>
            </React.Fragment>
          );
        }
      });
    }
    if (retData.length == 0) {
      retData.push(<div>Selected Account Not found</div>);
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
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSearchChange = (e) => {
    const { sourceList } = this.state;
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    Object.keys(sourceList).map((source, indexedDB) => {
      {
        sourceList[source] &&
          Object.keys(sourceList[source]).map((datasource, i) => {
            sourceList[source][datasource].map((accountdata, i) => {
              if (accountdata.name.toLowerCase().indexOf(value) === -1) {
                sourceList[source][datasource][i].isHide = true;
              } else {
                sourceList[source][datasource][i].isHide = false;
              }
            });
            let count = 0;
            for (let j = 0; j < sourceList[source][datasource].length; j++) {
              if (sourceList[source][datasource][j].isHide == true) {
                count++;
              }
            }
            if (count == sourceList[source][datasource].length) {
              sourceList[source][datasource]["isHide"] = true;
            } else {
              sourceList[source][datasource]["isHide"] = false;
            }
          });
      }
    });
    this.setState({
      sourceList,
    });
  };

  render() {
    const { environmentList, environment, account, accountList, searchkey } =
      this.state;
    return (
      <div className="add-data-source-container">
        <div className="add-data-source-page-container">
          <div className="data-source-product">
            <div className="source-head">
              <h3>inputs</h3>
            </div>
            <div className="source-content">
              <div className="add-input-content">
                <div className="row justify-content-end">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group description-content">
                      <select
                        className="input-group-text"
                        name="environment"
                        value={environment}
                        onChange={this.onChangeDataSource}
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
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group description-content">
                      <select
                        className="input-group-text"
                        name="account"
                        value={account}
                        onChange={this.onChangeDataSource}
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
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <div className="search-box">
                        <div className="form-group search-control-group m-b-0">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder="Search"
                            name="searchkey"
                            value={searchkey}
                            onChange={this.handleSearchChange}
                          />
                          <button><i className="fa fa-search" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="back-btn">
                      <Link
                        to={`/assetmanager/pages/add-data-source`}
                        type="button"
                        className="asset-blue-button"
                      >
                        Add input
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="specific-input-inner-content">
                {this.displayDataSource()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddDatasourceProduct;
