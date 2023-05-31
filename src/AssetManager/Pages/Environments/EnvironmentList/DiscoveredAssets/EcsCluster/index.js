import React from "react";
import dummyData from "../dummy.json";

class EcsCluster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="resources-section">
          <h4>ECS Resources</h4>
          <div className="account-list-conitant">
            <div className="account-list-conitant-scroll">
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
        </div>
        <div className="performance-section">
          <div className="performance-head">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-5">
                <h4>ECS Performance</h4>
              </div>
              <div className="col-lg-7">
                <div className="head-right">
                  <button className="light-blue-button m-b-0">
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
      </>
    );
  }
}

export default EcsCluster;
