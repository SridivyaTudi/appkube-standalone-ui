import React, { Component } from "react";
import tooltipImg from "../../../../../assets/img/login/signup-banner1.png";

class PreparePolicy extends Component {
  render() {
    return (
      <div className="d-block new-account-setup-tab-contents">
        <h3>Prepare IAM Policy For Appkube</h3>
        <ul>
          <li>
            <span>1.</span> Login to your AWS console{" "}
            <a href="https://aws.amazon.com/" target={"_blank"}>
              (aws.amzon.com)
            </a>
          </li>
          <li>
            <span>2.</span> Click <strong>'Services'</strong> and select the{" "}
            <strong>IAM</strong> Services
            <div className="tooltip">
              <i className="fas fa-question-circle"></i>
              <div className="tooltip-img">
                <img src={tooltipImg} alt="" />
              </div>
            </div>
          </li>
          <li>
            <span>3.</span> Select <strong>'Policies'</strong> and click on{" "}
            <strong>'Create Policy'</strong> button
            <div className="tooltip">
              <i className="fas fa-question-circle"></i>
              <div className="tooltip-img">
                <img src={tooltipImg} alt="" />
              </div>
            </div>
          </li>
          <li>
            <span>4.</span> Select the <strong>'JSON'</strong> tab{" "}
            <i className="fas fa-question-circle"></i>
          </li>
          <li>
            <span>5.</span> Review this <a href="#">Policy document</a> and
            copy-and-paste its content to the <strong>'JSON'</strong> tab in
            AWS. Then click the <strong>'Next:Tags'</strong> button at the
            botton of the page
            <div className="tooltip">
              <i className="fas fa-question-circle"></i>
              <div className="tooltip-img">
                <img src={tooltipImg} alt="" />
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
                <img src={tooltipImg} alt="" />
              </div>
            </div>
          </li>
          <li>
            <span>7.</span> Click on <a href="#">'NEXT'</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default PreparePolicy;
