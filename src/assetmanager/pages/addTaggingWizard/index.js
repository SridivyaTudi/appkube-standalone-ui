import React, { Component } from "react";

export class AddTaggingWizard extends Component {
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
                  <a className="white-button m-r-0" href="#">
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
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Resources</h4>
                      </div>
                      <div className="resources-contant">
                        <table className="data-table">
                          <tr>
                            <td>
                              <input type="checkbox" className="checkbox" />
                              <span>Synectiks</span>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Existing tags of element</h4>
                      </div>
                      <div className="existing-tags-contant">
                       <div className="existing-tags-text">
                        <p>HRMS &#8250; Development &#8250; Payroll Management &#8250; App Service &#8250; JavavSpringboot API Services</p>
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
