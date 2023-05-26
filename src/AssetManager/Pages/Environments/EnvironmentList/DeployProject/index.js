import React, { Component } from "react";
import { Link } from "react-router-dom";
import DeploymentImg1 from "../../../../../assets/img/assetmanager/deployment-img1.png";
import DeploymentImg2 from "../../../../../assets/img/assetmanager/deployment-img2.png";

class DeployProject extends Component {
  render() {
    return (
      <div className="deploy-project-container">
        <div className="page-heading">
          <h3>Deploy product</h3>
        </div>
        <div className="opration-mode-section text-center">
          <div className="opration-head-section">
            <h4>Select Deployment Type</h4>
            <p>
              Use our pre-existing template or you can create your own code or
              migrate your project to get started
            </p>
          </div>
          <div className="opration-cards">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-lg-6">
                <div className="opration-card">
                  <div className="card-images">
                    <img src={DeploymentImg1} alt="opration" />
                  </div>
                  <div className="card-title">Use Pre-existing Template</div>
                  <p>
                    choose from Pre-existing templates to start your products
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="opration-card">
                  <div className="card-images">
                    <img src={DeploymentImg2} alt="opration" />
                  </div>
                  <div className="card-title">Create from Scratch</div>
                  <p>
                   Create your own or migrate an existing products
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-block">
            <button className="asset-blue-button">
              <Link
                style={{ color: "white" }}
                to={""}
              >
                Back
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeployProject;
