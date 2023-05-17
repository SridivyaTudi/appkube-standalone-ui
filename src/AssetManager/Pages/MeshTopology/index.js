import React, { Component } from "react";
import AWS from "../../../assets/img/aws.png";
import { Link } from "react-router-dom";
import Iam from "./Iam";
import Kms from "./Kms";
import S3 from "./S3";
import Glue from "./Glue";
import Lakeformation from "./Lakeformation";

class MeshTopology extends Component {
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
    const { servicesPanelShow, activeTab } = this.state;
    return (
      <div className="mesh-topology-container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="mesh-topology-left">
              <h2>Mesh Topology</h2>
              <div className="topology-chart-box"></div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <div className="mesh-topology-right">
              <h2 className="text-center">Central Account</h2>
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
                    <Glue
                      updateCurrentAccountId={this.updateCurrentAccountId}
                    />
                  ) : activeTab === 4 ? (
                    <Lakeformation
                      updateCurrentAccountId={this.updateCurrentAccountId}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="environment-table-section">
          <div className="table">
            <table className="overview">
              <thead className="active">
                <tr>
                  <th>
                    <strong>Role Name</strong>
                  </th>
                  <th>Policy Name </th>
                  <th>Trust Relationship</th>
                  <th>Access Advisor</th>
                  <th>Key Tags</th>
                  <th>Creation Date</th>
                  <th>Created By</th>
                  <th>Last Updated Time</th>
                  <th>Updated By</th>
                  <th>Deletion Time</th>
                  <th>Deleted By</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>
                    <Link to={``}>Central Datalake</Link>
                  </td>
                  <td>Policy-1</td>
                  <td>PAVE Role</td>
                  <td>S3</td>
                  <td>Tarraform</td>
                  <td>01-01-2023</td>
                  <td>Alice</td>
                  <td>15-01-2023</td>
                  <td>Bob</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MeshTopology;
