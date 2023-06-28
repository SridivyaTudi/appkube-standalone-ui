import React, { Component } from "react";
import PhpIcon from "../../../../../assets/img/assetmanager/php-icon.png";
import RubyIcon from "../../../../../assets/img/assetmanager/ruby-icon.png";
import NetIcon from "../../../../../assets/img/assetmanager/net-icon.png";
import PythonIcon from "../../../../../assets/img/assetmanager/python-icon.png";
import LangIcon from "../../../../../assets/img/assetmanager/lang-icon.png";
import GlobalIcon4 from "../../../../../assets/img/assetmanager/global-icon4.png";
import GlobalIcon5 from "../../../../../assets/img/assetmanager/global-icon5.png";
import GlobalIcon8 from "../../../../../assets/img/assetmanager/global-icon8.png";
import CacheIcon from "../../../../../assets/img/assetmanager/cache-icon.png";
import SqlIcon from "../../../../../assets/img/assetmanager/sql-icon.png";
import NoSqlIcon from "../../../../../assets/img/assetmanager/no-sql-icon.png";
import Button from "@mui/material/Button";

class ConfigurTopology extends Component {
  render() {
    return (
      <div className="deploy-project-container">
        <div className="page-heading">
          <h3>configur Topology</h3>
        </div>
        <div className="configur-head">
          <div className="row">
            <div className="col-lg-8 p-r-5">
              <div className="button-group">
                <button className="asset-blue-button min-width-inherit">
                  <i className="fab fa-java "></i>Java
                </button>
                <button className="btn-light">
                  <img src={PhpIcon} alt="php" />
                  php
                </button>
                <button className="btn-light">
                  <img src={RubyIcon} alt="ruby" />
                  Ruby
                </button>
                <button className="btn-light">
                  <img src={NetIcon} alt="net" /> .Net
                </button>
                <button className="btn-light">
                  <img src={PythonIcon} alt="paython" />
                  Python
                </button>
                <button className="btn-light">
                  <img src={LangIcon} alt="lang" />
                  Lang
                </button>
                <Button
                  className="primary-btn"
                  variant="contained"
                >
                  Custom <i className="fas fa-chevron-down p-l-5"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="configur-content">
          <div className="row">
            <div className="col-lg-4 p-r-5">
              <div className="api-server text-center">
                <div className="d-block">
                  <button className="asset-blue-button min-width-inherit m-r-0 m-b-0">
                    API Gateway Server
                  </button>
                </div>
                <div className="d-block">
                  <div className="plus-icon">
                    <i className="far fa-plus"></i>
                  </div>
                </div>
                <div className="d-block">
                  <button className="asset-blue-button min-width-inherit m-r-0 m-b-0">
                    App Layer Server
                  </button>
                </div>
                <div className="d-block down-arrow">
                  <i className="fas fa-long-arrow-alt-down"></i>
                </div>
                <div className="d-block">
                  <button className="asset-blue-button min-width-inherit m-r-0 m-b-0">
                    Cluster <i className="fas fa-chevron-down p-l-10"></i>
                  </button>
                </div>
                <div className="eks-logo-boxs border-bottom">
                  <div className="d-inline-block">
                    <div className="box-arrow">
                      <i className="fas fa-long-arrow-alt-down"></i>
                    </div>
                    <div className="eks-logo">
                      <img src={GlobalIcon5} alt="" />
                    </div>
                    <div className="title">EKS</div>
                  </div>
                  <div className="d-inline-block">
                    <div className="box-arrow">
                      <i className="fas fa-long-arrow-alt-down"></i>
                    </div>
                    <div className="eks-logo">
                      <img src={GlobalIcon4} alt="" />
                    </div>
                  </div>
                  <div className="d-inline-block">
                    <div className="box-arrow">
                      <i className="fas fa-long-arrow-alt-down"></i>
                    </div>
                    <div className="eks-logo">
                      <img src={GlobalIcon8} alt="" />
                    </div>
                  </div>
                </div>
                <div className="d-block m-t-1">
                  <button className="asset-blue-button min-width-inherit m-r-0 m-b-0">
                    DB Layer
                  </button>
                </div>
                <div className="eks-logo-boxs">
                  <div className="d-inline-block">
                    <div className="box-arrow">
                      <i className="fas fa-long-arrow-alt-down"></i>
                    </div>
                    <div className="eks-logo">
                      <img src={CacheIcon} alt="" />
                    </div>
                    <div className="title">Cache</div>
                  </div>
                  <div className="d-inline-block">
                    <div className="box-arrow">
                      <i className="fas fa-long-arrow-alt-down"></i>
                    </div>
                    <div className="eks-logo">
                      <img src={SqlIcon} alt="" />
                    </div>
                    <div className="title">SQL</div>
                  </div>
                  <div className="d-inline-block">
                    <div className="box-arrow">
                      <i className="fas fa-long-arrow-alt-down"></i>
                    </div>
                    <div className="eks-logo">
                      <img src={NoSqlIcon} alt="" />
                    </div>
                    <div className="title">No SQL</div>
                  </div>
                </div>
                <div className="d-block">
                  <div className="plus-icon">
                    <i className="far fa-plus"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 p-l-5 p-r-5">
              <div className="api-server text-center">
                <h2>Application Servers</h2>
                <p>Vartical Scaling Per Node</p>
                <div className="application-cards">
                  <div className="reserved-card">
                    <div className="title">
                      <h4>RESERVED</h4>
                      <i className="fas fa-question"></i>
                    </div>
                    <div className="reseved-content">
                      <div className="d-flex align-items-center justify-content-center">
                        <input id="number" type="number" value="42" />
                        <div className="dropdown-arrow">
                          <div className="d-block">
                            <i className="fas fa-angle-up"></i>
                          </div>
                          <div className="d-block">
                            <i className="fas fa-angle-down"></i>
                          </div>
                        </div>
                        <span className="p-l-5">Cloudlet(s)</span>
                      </div>
                      <p className="text-left">1.75 GIB, 5.6 GHz</p>
                    </div>
                  </div>
                  <div className="reserved-card">
                    <div className="title">
                      <h4>SCALING LIMIT</h4>
                      <i className="fas fa-question"></i>
                    </div>
                    <div className="reseved-content">
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="p-r-5">Up to</span>
                        <input id="number" type="number" value="42" />
                        <div className="dropdown-arrow">
                          <div className="d-block">
                            <i className="fas fa-angle-up"></i>
                          </div>
                          <div className="d-block">
                            <i className="fas fa-angle-down"></i>
                          </div>
                        </div>
                        <span className="p-l-5">Cloudlet(s)</span>
                      </div>
                      <p className="text-left">up to 44 GIB, 140.8 GHz</p>
                    </div>
                  </div>
                </div>
                <div className="d-block m-t-3">
                  <progress
                    id="file"
                    value="32"
                    className="progress-bar"
                    max="100"
                  >
                    {" "}
                    32%{" "}
                  </progress>
                  <p className="m-t-2">Horizontal Scaling Per Node</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 p-l-5">
              <div className="api-server text-center">
                <div className="address-content">
                  <span><i className="fa-sharp fa-solid fa-location-dot"></i></span>
                  <p>Region: Newyork</p>
                  <i className="fas fa-angle-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfigurTopology;
