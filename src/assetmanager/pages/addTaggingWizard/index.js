import React, { Component } from "react";
import { Collapse } from "reactstrap";
//import { config } from "../../config";

export class AddTaggingWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="asset-container">
        <div className="tagging-wizard-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Discovered Assets</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <a
                    className="white-button m-r-0"
                    href="/assetmanager/pages/taggingWizard"
                  >
                    <i className="fa fa-arrow-circle-left"></i>
                    &nbsp;&nbsp; Back
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className=" common-container border-bottom-0">
            <div className="urganisational-unit-container add-tagging-contant">
              <div className="associate-head p-b-1">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <strong>Associate Elements</strong>
                  </div>
                </div>
              </div>
              <div className="select-resources">
                <p className="m-t-1">
                  Please select below the resources you want to tag with element
                </p>
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Resources</h4>
                      </div>
                      <div className="resources-contant">
                        <table className="data-table">
                          <tr>
                            <td>
                              <div className="table-contant">
                                <input type="checkbox" className="checkbox" />
                                <span>Synectiks</span>
                              </div>
                              <table className="data-table inner">
                                <tr>
                                  <td>
                                    <div className="table-contant">
                                      <input
                                        type="checkbox"
                                        className="checkbox"
                                      />
                                      <span>Human Resource</span>
                                    </div>
                                    <table className="data-table inner">
                                      <tr>
                                        <td>
                                          <div className="table-contant">
                                            <input
                                              type="checkbox"
                                              className="checkbox"
                                            />
                                            <span>HRMS</span>
                                          </div>
                                          <table className="data-table inner">
                                            <tr>
                                              <td>
                                                <div className="table-contant">
                                                  <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                  />
                                                  <span>Development</span>
                                                </div>
                                                <table className="data-table inner">
                                                  <tr>
                                                    <td>
                                                      <div className="table-contant">
                                                        <input
                                                          type="checkbox"
                                                          className="checkbox"
                                                        />
                                                        <span>
                                                          Payroll Management
                                                        </span>
                                                      </div>
                                                      <table className="data-table inner">
                                                        <tr>
                                                          <td>
                                                            <div className="table-contant">
                                                              <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                              />
                                                              <span>
                                                                App Services
                                                              </span>
                                                            </div>
                                                            <table className="data-table inner">
                                                              <tr>
                                                                <td>
                                                                  <div className="table-contant">
                                                                    <input
                                                                      type="checkbox"
                                                                      className="checkbox"
                                                                    />
                                                                    <span>
                                                                      Java
                                                                      Springboot
                                                                      API
                                                                      Service
                                                                    </span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td>
                                                                  <div className="table-contant">
                                                                    <input
                                                                      type="checkbox"
                                                                      className="checkbox"
                                                                    />
                                                                    <span>
                                                                      Golang API
                                                                      Services
                                                                    </span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td>
                                                                  <div className="table-contant">
                                                                    <input
                                                                      type="checkbox"
                                                                      className="checkbox"
                                                                    />
                                                                    <span>
                                                                      NodeJs API
                                                                      Services
                                                                    </span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td>
                                                                  <div className="table-contant">
                                                                    <input
                                                                      type="checkbox"
                                                                      className="checkbox"
                                                                    />
                                                                    <span>
                                                                      Java
                                                                      Lambda
                                                                      Functions{" "}
                                                                    </span>
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>
                                                            <div className="table-contant">
                                                              <input
                                                                type="checkbox"
                                                                className="checkbox"
                                                              />
                                                              <span>
                                                                Data Services
                                                              </span>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <div className="table-contant">
                                                        <input
                                                          type="checkbox"
                                                          className="checkbox"
                                                        />
                                                        <span>
                                                          Leave Management
                                                        </span>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <div className="table-contant">
                                                        <input
                                                          type="checkbox"
                                                          className="checkbox"
                                                        />
                                                        <span>
                                                          Facility Management
                                                        </span>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <div className="table-contant">
                                                        <input
                                                          type="checkbox"
                                                          className="checkbox"
                                                        />
                                                        <span>
                                                          Appraisal Management
                                                        </span>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <div className="table-contant">
                                                        <input
                                                          type="checkbox"
                                                          className="checkbox"
                                                        />
                                                        <span>
                                                          H&M Management
                                                        </span>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <div className="table-contant">
                                                        <input
                                                          type="checkbox"
                                                          className="checkbox"
                                                        />
                                                        <span>
                                                          Vendor Management
                                                        </span>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <div className="table-contant">
                                                  <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                  />
                                                  <span>Stage</span>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <div className="table-contant">
                                                  <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                  />
                                                  <span>Testing</span>
                                                </div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <div className="table-contant">
                                                  <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                  />
                                                  <span>Production</span>
                                                </div>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="table-contant">
                                            <input
                                              type="checkbox"
                                              className="checkbox"
                                            />
                                            <span>Account Management</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="table-contant">
                                            <input
                                              type="checkbox"
                                              className="checkbox"
                                            />
                                            <span>Inventory Management</span>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="table-contant">
                                            <input
                                              type="checkbox"
                                              className="checkbox"
                                            />
                                            <span>Travel Management</span>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="table-contant">
                                      <input
                                        type="checkbox"
                                        className="checkbox"
                                      />
                                      <span>IT Networking</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="table-contant">
                                      <input
                                        type="checkbox"
                                        className="checkbox"
                                      />
                                      <span>Monitoring</span>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Existing tags of element</h4>
                      </div>
                      <div className="existing-tags-contant">
                        <div className="existing-tags-text">
                          <p>
                            HRMS &#8250; Development &#8250; Payroll Management
                            &#8250; App Service &#8250; JavavSpringboot API
                            Services
                          </p>
                        </div>
                      </div>
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

export default AddTaggingWizard;
