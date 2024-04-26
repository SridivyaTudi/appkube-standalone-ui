import React, { Component } from "react";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
//import { Link } from "react-router-dom";
import IamImg from "assets/img/login/iam-img.png";
import PolicyImg from "assets/img/login/policy-img.png";
import JsonImg from "assets/img/login/json-img.png";
import PolicyDocumentImg from "assets/img/login/policy-document-img.png";
import Box from "@mui/material/Box"
class PreparePolicy extends Component {
  render() {
    return (
      <>
        {/* <Link className="close-btn" to={`${APP_PREFIX_PATH}/assets/environments`}>
          <i className="fa-solid fa-xmark"></i>
        </Link> */}
        <Box className="d-block new-account-setup-tab-contents">
          <h3>Prepare IAM Policy For Appkube</h3>
          <ul>
            <li>
              <span>1.</span> Login to your AWS console{" "}
              <a href="https://aws.amazon.com/" target={"_blank"} rel="noreferrer">
                (aws.amzon.com)
              </a>
            </li>
            <li>
              <span>2.</span> Click <strong>'Services'</strong> and select the{" "}
              <strong>IAM</strong> Services
              <div className="tooltip">
                <i className="fas fa-question-circle"></i>
                <div className="tooltip-img">
                  <img src={IamImg} alt="" />
                </div>
              </div>
            </li>
            <li>
              <span>3.</span> Select <strong>'Policies'</strong> and click on{" "}
              <strong>'Create Policy'</strong> button
              <div className="tooltip">
                <i className="fas fa-question-circle"></i>
                <div className="tooltip-img">
                  <img src={PolicyImg} alt="" />
                </div>
              </div>
            </li>
            <li>
              <span>4.</span> Select the <strong>'JSON'</strong> tab{" "}
              <div className="tooltip">
                <i className="fas fa-question-circle"></i>
                <div className="tooltip-img">
                  <img src={JsonImg} alt="" />
                </div>
              </div>
            </li>
            <li>
              <span>5.</span> Review this <strong className="link">Policy document</strong> and
              copy-and-paste its content to the <strong>'JSON'</strong> tab in
              AWS. Then click the <strong>'Next:Tags'</strong> button at the
              botton of the page
              <div className="tooltip">
                <i className="fas fa-question-circle"></i>
                <div className="tooltip-img">
                  <img src={PolicyDocumentImg} alt="" />
                </div>
              </div>
            </li>
            <li>
              <span>6.</span> Click <strong>'Next:Review'</strong> to review the
              policy.Enter Appkube-readonly-policy for the policy name and click{" "}
              <strong>'Create Policy'</strong>
              <div className="tooltip">
                <i className="fas fa-question-circle"></i>
                <div className="tooltip-img">
                  <img src={PolicyImg} alt="" />
                </div>
              </div>
            </li>
            <li>
              <span>7.</span> Click on <strong className="link">'NEXT'</strong>
            </li>
          </ul>
        </Box>
      </>
    );
  }
}

export default PreparePolicy;
