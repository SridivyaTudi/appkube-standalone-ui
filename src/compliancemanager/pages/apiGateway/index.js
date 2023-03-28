import React from "react";
import awsLogo from "../../img/amazon-logo.png";
import microsoftAzureLogo from "../../img/microsoftazure.png";
import gcpLogo from "../../img/google-cloud.png";
import KubernetesLogo from "../../img/kubernetes.png";

class ApiGateway extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="compliance-dashboard-container">
        <div className="compliancemanager-page-container aipgateway-page-container">
          <div className="common-container">
            <div className="gsl-editor-logos">
              <h3>GSL Editor</h3>
              <ul>
                <li>
                  <a>
                    <span>
                      <img src={awsLogo} alt="" />
                    </span>
                    <p>AWS</p>
                  </a>
                </li>
                <li>
                  <a>
                    <span>
                      <img src={microsoftAzureLogo} alt="" />
                    </span>
                    <p>Azure</p>
                  </a>
                </li>
                <li>
                  <a>
                    <span>
                      <img src={gcpLogo} alt="" />
                    </span>
                    <p>GCP</p>
                  </a>
                </li>
                <li>
                  <a>
                    <span>
                      <img src={KubernetesLogo} alt="" />
                    </span>
                    <p>Kubernetes</p>
                  </a>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-xl-8 col-sm-12">
                <div className="gsl-editor-radio">
                  <ul>
                    <li>
                      <input type="radio" id="Wizard" name="selector" checked />
                      <label htmlFor="Wizard">Wizard</label>
                    </li>
                    <li>
                      <input type="radio" id="Script" name="selector" />
                      <label htmlFor="Script">Script</label>
                    </li>
                  </ul>
                </div>
                <div className="row region-section">
                  <div className="col-md-3 col-sm-3">
                    <div className="form-group filter-control-group">
                      <label htmlFor="Account">Account</label>
                      <select className="form-control" id="Account">
                        <option value="">AWS</option>
                        <option value="">AWS</option>
                        <option value="">AWS</option>
                        <option value="">AWS</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className="form-group filter-control-group">
                      <label htmlFor="Region">Region</label>
                      <select className="form-control" id="Region">
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className="form-group filter-control-group">
                      <label htmlFor="VPC">VPC</label>
                      <select className="form-control" id="VPC">
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                        <option value="">All</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className="form-group filter-control-group">
                      <a className="blue-button m-r-0 m-b-0 runtest-button">
                        <i className="fa fa-play-circle"></i> RUN TEST
                      </a>
                    </div>
                  </div>
                </div>
                <div className="editor-add-code">
                  <div className="d-inline-block code">
                    <button>
                      <i className="fa fa-trash"></i>
                    </button>
                    <p>ApiGateway</p>
                  </div>
                </div>
                <div className="editor-code">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="editor-code-heading">Actions:</div>
                    </div>
                    <div className="col-md-10">
                      <span>Should have</span>
                      <span>Should not have</span>
                      <span>where</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-sm-12">
                <div className="context-preview-box">
                  <h4>Context Preview</h4>
                  <div className="context-preview">
                    <div className="search-box">
                    <div className="d-block form-group filter-search-control">
                      <form>
                        <div className="form-group search-control-group m-b-0">
                          <input
                            type="text"
                            className="input-group-text"
                            placeholder="Search"
                            value=""
                          />
                          <button>
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                    </div>
                    <div className="preview">
                      <ul>
                        <li>
                          apiKeySource:<span>string</span>
                        </li>
                        <li>
                          <i className="fa fa-caret-down"></i>{" "}
                          binaryMediaTypes:Array <a>[1]</a>
                          <ul>
                            <li>
                              <i className="fa fa-caret-right"></i> O:Object
                            </li>
                          </ul>
                        </li>
                        <li>
                          createdDate:<span>string</span>
                        </li>
                        <li>
                          description:<span>string</span>
                        </li>
                        <li>
                          <i className="fa fa-caret-right"></i>{" "}
                          endpointConfiguration:Object
                        </li>
                        <li>
                          minimumCompressionSize:<span>string</span>
                        </li>
                      </ul>
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

export default ApiGateway;
