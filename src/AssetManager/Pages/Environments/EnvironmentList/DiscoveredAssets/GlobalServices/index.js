import React from "react";
import GlobalIcon1 from "../../../../../../assets/img/assetmanager/global-icon1.png";
import GlobalIcon2 from "../../../../../../assets/img/assetmanager/global-icon2.png";
import GlobalIcon3 from "../../../../../../assets/img/assetmanager/global-icon3.png";
import dummyData from "../dummy.json";
import SelectDepartmentPopup from "../../../../../Components/SelectDepartmentPopup";

class GlobalSerivces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveTab: "S3",
    };
    this.selectDepartmentPopupModalRef = React.createRef();
  }
  onClickSelectDepartmentPopup = (link) => {
    this.selectDepartmentPopupModalRef.current.setLink(link);
    this.selectDepartmentPopupModalRef.current.toggle();
  };

  handleTabChange = (tab) => {
    this.setState({ currentActiveTab: tab });
  };

  render() {
    const { currentActiveTab } = this.state;
    return (
      <>
        <div className="global-service-penal">
          <div className="global-services-fliter">
            <div className="fliter-tabs">
              <div className="global-services-fliter">
                <div className="heading">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <a href="#">AWS</a>
                      </li>
                      <li>
                        <i className="far fa-chevron-right"></i>
                      </li>
                      <li>
                        <span>App Services</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="global-service-cards">
            <div
              className={`service-card ${
                currentActiveTab === "S3" && "active"
              }`}
              onClick={() => this.handleTabChange("S3")}
            >
              <div className="service-icon">
                <img src={GlobalIcon1} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>S3</label>
                <strong>235</strong>
              </div>
            </div>
            <div
              className={`service-card ${
                currentActiveTab === "API Gateway" && "active"
              }`}
              onClick={() => this.handleTabChange("API Gateway")}
            >
              <div className="service-icon">
                <img src={GlobalIcon2} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>API Gateway</label>
                <strong>03</strong>
              </div>
            </div>
            <div
              className={`service-card ${
                currentActiveTab === "Lambda" && "active"
              }`}
              onClick={() => this.handleTabChange("Lambda")}
            >
              <div className="service-icon">
                <img src={GlobalIcon3} alt="serviceicon" />
              </div>
              <div className="service-contant">
                <label>Lambda</label>
                <strong>19</strong>
              </div>
            </div>
          </div>
          <div className="resources-section">
            <h4>{currentActiveTab} Resources</h4>
            <div className="account-list-conitant">
              {dummyData.eksResources.map((item) => {
                return (
                  <div className="account-list-details">
                    <div className="d-block">
                      <strong>{item.value}</strong>
                      <p>{item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="performance-section">
            <div className="performance-head">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-5">
                  <h4>{currentActiveTab} Performance</h4>
                </div>
                <div className="col-lg-7">
                  <div className="head-right">
                    <button
                      className="light-blue-button m-b-0"
                      onClick={() => this.onClickSelectDepartmentPopup("")}
                    >
                      <i class="far fa-stream p-r-10"></i>
                      fillter
                    </button>
                    <button className="light-blue-outline m-b-0 m-r-0">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="environment-table-section">
              <div className="table discovered-assets-table">
                <table className="overview">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Performance</th>
                      <th>Availability</th>
                      <th>Security</th>
                      <th>Data Protection</th>
                      <th>User Exp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.eksPerformance.map((item) => {
                      return (
                        <tr>
                          <td>
                            <strong>
                              <a href="#">{item.name}</a>
                            </strong>
                            <i className="fas fa-caret-right m-l-1"></i>
                          </td>
                          <td>
                            <div className="box green">
                              <i className="far fa-check"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box orange">
                              <i class="fas fa-sort-up"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box red">
                              <i class="far fa-stop-circle"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box red">
                              <i class="far fa-stop-circle"></i>
                            </div>
                          </td>
                          <td>
                            <div className="box green">
                              <i className="far fa-check"></i>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <SelectDepartmentPopup ref={this.selectDepartmentPopupModalRef} />
        </div>
      </>
    );
  }
}

export default GlobalSerivces;
