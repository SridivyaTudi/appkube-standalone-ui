import React, { Component } from "react";
import { Link } from "react-router-dom";
import Aws from "../../../assets/img/assetmanager/aws.png";
import SourceImg1 from "../../../assets/img/assetmanager/source-img1.png";
import Microsoftazure from '../../../assets/img/assetmanager/microsoftazure.png'

class AddDatasource extends Component {
  render() {
    return (
      <div className="add-data-source-container">
        <div className="add-data-source-page-container">
          <div className="data-source-section">
            <div className="source-head">
              <h3>inputs</h3>
              <div className="right-search-bar">
                <div className="form-group search-control m-b-0">
                  <button className="btn btn-search">
                    <i className="fa fa-search" />
                  </button>
                  <input
                    type="text"
                    name="searchkey"
                    // value={searchkey}
                    className="input-group-text"
                    placeholder="Search"
                    // onChange={this.handleStateChange}
                  />
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
                <div className="form-group description-content">
                  <label htmlFor="description">Select Environment</label>
                  <select
                    className="input-group-text"
                    name="environment"
                    //value={environment}
                    //onChange={this.onChangeDataSource}
                    //disabled={accountFromUrl && environmentFromUrl}
                  >
                    <option>Select Environment</option>
                  </select>
                </div>
                <div className="form-group description-content">
                  <label htmlFor="description">Select Account</label>
                  <select
                    className="input-group-text"
                    name="account"
                    // value={account}
                    //onChange={this.onChangeDataSource}
                    //disabled={accountFromUrl && environmentFromUrl}
                  >
                    <option>Select Account</option>
                  </select>
                </div>
              </div>
              <div className="source-boxs">
                <div className="services-heading">
                  <span>
                    <img src={Aws} alt="" />
                  </span>
                  <h5>aws</h5>
                </div>
                <div className="source-inner-box">
                  <Link to={`/assetmanager/pages/add-datasource-credential`}>
                    <div className="source-box">
                      <div className="images">
                        <img
                          src={SourceImg1}
                          height="50px"
                          width="50px"
                          alt=""
                        />
                      </div>
                      <div className="source-content">
                        <label>AWS-PullMetric-Api</label>
                        <span>datasource</span>
                        <p>Pull AWS metrics with Cloud API</p>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/assetmanager/pages/add-datasource-credential`}>
                    <div className="source-box">
                      <div className="images">
                        <img
                          src={SourceImg1}
                          height="50px"
                          width="50px"
                          alt=""
                        />
                      </div>
                      <div className="source-content">
                        <label>AWS-PullMetric-Api</label>
                        <span>datasource</span>
                        <p>Pull AWS metrics with Cloud API</p>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/assetmanager/pages/add-datasource-credential`}>
                    <div className="source-box">
                      <div className="images">
                        <img
                          src={SourceImg1}
                          height="50px"
                          width="50px"
                          alt=""
                        />
                      </div>
                      <div className="source-content">
                        <label>AWS-PullMetric-Api</label>
                        <span>datasource</span>
                        <p>Pull AWS metrics with Cloud API</p>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/assetmanager/pages/add-datasource-credential`}>
                    <div className="source-box">
                      <div className="images">
                        <img
                          src={SourceImg1}
                          height="50px"
                          width="50px"
                          alt=""
                        />
                      </div>
                      <div className="source-content">
                        <label>AWS-PullMetric-Api</label>
                        <span>datasource</span>
                        <p>Pull AWS metrics with Cloud API</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="services-heading">
                  <span>
                    <img src={Aws} alt="" />
                  </span>
                  <h5>azure</h5>
                </div>
                <div className="source-inner-box">
                  <Link to={`/assetmanager/pages/add-datasource-credential`}>
                    <div className="source-box">
                      <div className="images">
                        <img
                          src={Microsoftazure}
                          height="50px"
                          width="50px"
                          alt=""
                        />
                      </div>
                      <div className="source-content">
                        <label>AWS-PullMetric-Api</label>
                        <span>datasource</span>
                        <p>Pull AWS metrics with Cloud API</p>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/assetmanager/pages/add-datasource-credential`}>
                    <div className="source-box">
                      <div className="images">
                        <img
                          src={Microsoftazure}
                          height="50px"
                          width="50px"
                          alt=""
                        />
                      </div>
                      <div className="source-content">
                        <label>AWS-PullMetric-Api</label>
                        <span>datasource</span>
                        <p>Pull AWS metrics with Cloud API</p>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/assetmanager/pages/add-datasource-credential`}>
                    <div className="source-box">
                      <div className="images">
                        <img
                          src={Microsoftazure}
                          height="50px"
                          width="50px"
                          alt=""
                        />
                      </div>
                      <div className="source-content">
                        <label>AWS-PullMetric-Api</label>
                        <span>datasource</span>
                        <p>Pull AWS metrics with Cloud API</p>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/assetmanager/pages/add-datasource-credential`}>
                    <div className="source-box">
                      <div className="images">
                        <img
                          src={Microsoftazure}
                          height="50px"
                          width="50px"
                          alt=""
                        />
                      </div>
                      <div className="source-content">
                        <label>AWS-PullMetric-Api</label>
                        <span>datasource</span>
                        <p>Pull AWS metrics with Cloud API</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddDatasource;
