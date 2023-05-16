import React, { Component } from "react";
import AWS from "../../../assets/img/aws.png";
import { Link } from "react-router-dom";

class MeshServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showSelectFilter: false,
        showApplicationFilter: false,
        showAccountFilter: false,
        showMeshFilter: false,
    };
  }

  render() {
    const {showSelectFilter, showApplicationFilter, showAccountFilter, showMeshFilter} = this.state;
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
                      <label>Mesh 1 </label>
                      <i class="fas fa-sort-up"></i>
                    </li>
                    <li>
                      <label>Mesh 1</label>
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
                            <Link
                              to={``}
                            >
                              <span className="image-box">
                                <img src={AWS} alt="AWS" />
                              </span>
                              <p>(657907747545)</p>
                              <i class="fas fa-sort-up"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={``}
                            >
                              <span className="image-box">
                                <img src={AWS} alt="AZURE" />
                              </span>
                              <p>(657907747545)</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={``}
                            >
                              <span className="image-box">
                                <img src={AWS} alt="GCP" />
                              </span>
                              <p>(657907747545)</p>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={``}
                            >
                              <span className="image-box">
                                <img src={AWS} alt="Kubernetes" />
                              </span>
                              <p>(657907747545)</p>
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
                      <label>Mesh 1 </label>
                      <i class="fas fa-sort-up"></i>
                    </li>
                    <li>
                      <label>Mesh 1</label>
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
                      <label>Mesh 1 </label>
                      <i class="fas fa-sort-up"></i>
                    </li>
                    <li>
                      <label>Mesh 1</label>
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
      </div>
    );
  }
}

export default MeshServices;
