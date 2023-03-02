import React, { Component } from "react";
import { Link } from "react-router-dom";
import AWS from "../../../assets/img/assetmanager/aws.png";
import SourceImg1 from "../../../assets/img/assetmanager/source-img1.png";
import Microsoftazure from'../../../assets/img/assetmanager/microsoftazure.png';

class AddDatasource extends Component {
  render() {
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
                      <select className="input-group-text" name="environment">
                        <option value="">Select Environment</option>
                        <option value="aws">aws</option>
                        <option value="azure">azure</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group description-content">
                      <select class="input-group-text" name="account">
                        <option value="">Select Account</option>
                        <option value="897373451">897373451</option>
                        <option value="456262373">456262373</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group">
                      <div className="right-search-bar">
                        <div className="form-group search-control m-b-0">
                          <i className="fa fa-search"></i>
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder="Search"
                            name="searchkey"
                            value=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-12">
                    <div className="back-btn">
                      <Link type="button" className="asset-blue-button" to="/assetmanager/pages/add-data-source">
                        Add input
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="specific-input-inner-content">
                  <div class="account-details-heading">
                    <span>
                      <img src={AWS} alt="" />
                    </span>
                    <h5>aws</h5>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <p className="account-input-heading">
                        aws Account specific Input sources
                      </p>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="services-heading">
                        <p>
                          Account : <span>aws 897373451</span>
                        </p>
                      </div>
                    </div>
                    <div className="source-boxs">
                      <Link to={``}>
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
                            <label>AWS-PullLogs-Api-o2K37</label>
                            <span>aws</span>
                            <p>Pull AWS matrics with cloud API</p>
                          </div>
                        </div>
                      </Link>
                      <Link to={``}>
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
                            <label>AWS-PullLogs-Api-o2K37</label>
                            <span>aws</span>
                            <p>Pull AWS matrics with cloud API</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="specific-input-inner-content">
                  <div class="account-details-heading">
                    <span>
                      <img src={AWS} alt="" />
                    </span>
                    <h5>aws</h5>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <p className="account-input-heading">
                        aws Account specific Input sources
                      </p>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="services-heading">
                        <p>
                          Account : <span>aws 897373451</span>
                        </p>
                      </div>
                    </div>
                    <div className="source-boxs">
                      <Link to={``}>
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
                            <label>AWS-PullLogs-Api-o2K37</label>
                            <span>aws</span>
                            <p>Pull AWS matrics with cloud API</p>
                          </div>
                        </div>
                      </Link>
                      <Link to={``}>
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
                            <label>AWS-PullLogs-Api-o2K37</label>
                            <span>aws</span>
                            <p>Pull AWS matrics with cloud API</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
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
