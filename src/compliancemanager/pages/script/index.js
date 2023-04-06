import React from "react";
import awsLogo from "../../img/amazon-logo.png";
import microsoftAzureLogo from "../../img/microsoftazure.png";
import gcpLogo from "../../img/google-cloud.png";
import KubernetesLogo from "../../img/kubernetes.png";
import ApiGateway from "../../img/ApiGateway.png";
import ApplicationLoadBalancer from "../../img/ApplicationLoadBalancer.png";
import CloudFront from "../../img/CloudFront.png";
import CustomerGateway from "../../img/CustomerGateway.png";
import ELB from "../../img/ELB.png";
import AutoScalingGroup from "../../img/AutoScalingGroup.png";
import ECSCluster from "../../img/ECSCluster.png";
import lamServeCertificate from "../../img/lamServeCertificate.png";
import CloudWatchEventsRule from "../../img/CloudWatchEventsRule.png";
import Organization from "../../img/Organization.png";
import Route53Domain from "../../img/Route53Domain.png";

class Script extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="compliance-dashboard-container">
        <div className="compliancemanager-page-container script-page-container">
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
                      <input type="radio" id="Wizard" name="selector" />
                      <label htmlFor="Wizard">Wizard</label>
                    </li>
                    <li>
                      <input type="radio" id="Script" name="selector" checked />
                      <label htmlFor="Script">Script</label>
                    </li>
                  </ul>
                </div>
                <div className="row region-section">
                  <div className="col-md-3 col-sm-6">
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
                  <div className="col-md-3 col-sm-6">
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
                  <div className="col-md-3 col-sm-6">
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
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group filter-control-group">
                      <a className="blue-button m-r-0 m-b-0 runtest-button">
                        <i className="fa fa-play-circle"></i> RUN TEST
                      </a>
                    </div>
                  </div>
                </div>
                <div className="editor-add-code">
                  <div className="d-inline-block code">
                    <p className="m-b-1">ApiGateway</p>
                  </div>
                  <div className="choosh-popup">
                    <ul>
                      <li>
                        <a>
                          <span>
                            <img src={ApiGateway} alt="" />
                          </span>
                          <p>ApiGateway</p>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>
                            <img src={ApplicationLoadBalancer} alt="" />
                          </span>
                          <p>ApplicationLoadBalancer</p>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>
                            <img src={CustomerGateway} alt="" />
                          </span>
                          <p>CustomerGateway</p>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>
                            <img src={ELB} alt="" />
                          </span>
                          <p>ELB</p>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>
                            <img src={CloudFront} alt="" />
                          </span>
                          <p>CloudFront</p>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>
                            <img src={AutoScalingGroup} alt="" />
                          </span>
                          <p>AutoScalingGroup</p>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>
                            <img src={ECSCluster} alt="" />
                          </span>
                          <p>ECSCluster</p>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>
                            <img src={lamServeCertificate} alt="" />
                          </span>
                          <p>lamServeCertificate</p>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>
                            <img src={CloudWatchEventsRule} alt="" />
                          </span>
                          <p>CloudWatchEventsRule</p>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>
                            <img src={Organization} alt="" />
                          </span>
                          <p>Organization</p>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>
                            <img src={Route53Domain} alt="" />
                          </span>
                          <p>Route53Domain</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-sm-12">
                <div className="context-preview-box">
                  <h4>Context Preview</h4>
                  <div className="context-preview">
                    <div className="search-box">
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

                    <div className="preview">
                      <ul>
                        <li>
                          apiKeySource:<span>string</span>
                        </li>
                        <li>
                          <i className="fa fa-caret-down"></i>
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
                          <i className="fa fa-caret-right"></i>
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

export default Script;
