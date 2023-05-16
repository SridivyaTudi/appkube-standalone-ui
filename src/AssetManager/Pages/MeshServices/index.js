import React, { Component } from "react";
import AWS from "../../../assets/img/aws.png";
import { Link } from "react-router-dom";
import Iam from "./Iam";
import Kms from "./Kms";
import S3 from "./S3";
import Glue from "./Glue";
import Lakeformation from "./Lakeformation";

class MeshServices extends Component {
  tabMapping = [
    {
      name: "Iam",
      dataKey: "iam",
    },
    {
      name: "KSM",
      dataKey: "ksm",
    },
    {
      name: "S3",
      dataKey: "s3",
    },
    {
      name: "Glue",
      dataKey: "glue",
    },
    {
      name: "Lakeformation",
      dataKey: "lakeformation",
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      showSelectFilter: false,
      showApplicationFilter: false,
      showAccountFilter: false,
      showMeshFilter: false,
      servicesPanelShow: false,
      activeTab: 0,
    };
  }

  toggleColumnSelect = () => {
    this.setState({
      servicesPanelShow: !this.state.servicesPanelShow,
    });
  };

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const {
      showSelectFilter,
      showApplicationFilter,
      showAccountFilter,
      showMeshFilter,
      servicesPanelShow,
      activeTab,
    } = this.state;
    return (
      <div className="mesh-service-container">
        <div className="service-head">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <h2>Mesh Services</h2>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 text-right">
              <div className="environment-fliter">
                <div
                  className="fliter-toggel"
                  onClick={() =>
                    this.setState({
                      showMeshFilter: !showMeshFilter,
                    })
                  }
                >
                  Mesh
                  <i className="fas fa-caret-down arrow-icon"></i>
                </div>
                <div
                  className={
                    showMeshFilter === true
                      ? "fliter-collapse active"
                      : "fliter-collapse"
                  }
                >
                  <ul>
                    <li>
                      <p>Mesh 1 </p>
                      <i class="fas fa-sort-up"></i>
                    </li>
                    <li>
                      <p>Mesh 2</p>
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    showMeshFilter === true
                      ? "fliters-collapse-bg active"
                      : "fliters-collapse-bg"
                  }
                  onClick={() =>
                    this.setState({
                      showMeshFilter: !showMeshFilter,
                    })
                  }
                />
              </div>
              <div className="environment-fliter">
                <div
                  className="fliter-toggel"
                  onClick={() =>
                    this.setState({
                      showAccountFilter: !showAccountFilter,
                    })
                  }
                >
                  AWS Account
                  <i className="fas fa-caret-down arrow-icon"></i>
                </div>
                <div
                  className={
                    showAccountFilter === true
                      ? "fliter-collapse active"
                      : "fliter-collapse"
                  }
                >
                  <ul>
                    <li>
                      <Link to={``}>
                        <div className="image-box">
                          <img src={AWS} alt="AWS" />
                        </div>
                        <span>(657907747545)</span>
                        <i class="fas fa-sort-up"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={``}>
                        <div className="image-box">
                          <img src={AWS} alt="AZURE" />
                        </div>
                        <span>(657907747545)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={``}>
                        <div className="image-box">
                          <img src={AWS} alt="GCP" />
                        </div>
                        <span>(657907747545)</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={``}>
                        <div className="image-box">
                          <img src={AWS} alt="Kubernetes" />
                        </div>
                        <span>(657907747545)</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    showAccountFilter === true
                      ? "fliters-collapse-bg active"
                      : "fliters-collapse-bg"
                  }
                  onClick={() =>
                    this.setState({
                      showAccountFilter: !showAccountFilter,
                    })
                  }
                />
              </div>
              <div className="environment-fliter">
                <div
                  className="fliter-toggel"
                  onClick={() =>
                    this.setState({
                      showSelectFilter: !showSelectFilter,
                    })
                  }
                >
                  Products
                  <i className="fas fa-caret-down arrow-icon"></i>
                </div>
                <div
                  className={
                    showSelectFilter === true
                      ? "fliter-collapse active"
                      : "fliter-collapse"
                  }
                >
                  <ul>
                    <li>
                      <p>Products 01 </p>
                      <i class="fas fa-sort-up"></i>
                    </li>
                    <li>
                      <p>Products 02</p>
                    </li>
                    <li>
                      <p>Products 03</p>
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
              <div className="environment-fliter m-r-0">
                <div
                  className="fliter-toggel"
                  onClick={() =>
                    this.setState({
                      showApplicationFilter: !showApplicationFilter,
                    })
                  }
                >
                  Application-Id
                  <i className="fas fa-caret-down arrow-icon"></i>
                </div>
                <div
                  className={
                    showApplicationFilter === true
                      ? "fliter-collapse active"
                      : "fliter-collapse"
                  }
                >
                  <ul>
                    <li>
                      <p>ID:11141324</p>
                      <i class="fas fa-sort-up"></i>
                    </li>
                    <li>
                      <p>ID:25634113</p>
                    </li>
                    <li>
                      <p>ID:33669112</p>
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    showApplicationFilter === true
                      ? "fliters-collapse-bg active"
                      : "fliters-collapse-bg"
                  }
                  onClick={() =>
                    this.setState({
                      showApplicationFilter: !showApplicationFilter,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="services-panel-tabs">
          <div className="tabs-head">
            <ul>
              {this.tabMapping.map((tabData, index) => {
                return (
                  <li
                    key={`ops-tab-${index}`}
                    className={index === activeTab ? "active" : ""}
                    onClick={(e) => this.setActiveTab(index)}
                  >
                    {tabData.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="tabs-content">
            {activeTab === 0 ? (
              <Iam
                updateCloudName={(service) => {
                  this.setState({ service });
                }}
              />
            ) : activeTab === 1 ? (
              <Kms
                departmentWiseData={this.state?.departmentWiseData}
                updateCurrentAccountId={this.updateCurrentAccountId}
              />
            ) : activeTab === 2 ? (
              <S3 />
            ) : activeTab === 3 ? (
              <Glue updateCurrentAccountId={this.updateCurrentAccountId} />
            ) : activeTab === 4 ? (
              <Lakeformation
                updateCurrentAccountId={this.updateCurrentAccountId}
              />
            ) :
            <></>
            //  activeTab === 5 ? (
            //   <Alerts updateCurrentAccountId={this.updateCurrentAccountId} />
            // ) : (
            //   <Inputs updateCurrentAccountId={this.updateCurrentAccountId} />
            // )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MeshServices;
