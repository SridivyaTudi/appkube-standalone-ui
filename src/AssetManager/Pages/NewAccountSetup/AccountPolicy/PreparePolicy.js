import React, { Component } from "react";

class PreparePolicy extends Component {
  render() {
    return (
      <div className="d-inline-block width-100 new-account-setup-tab-contents">
        <h3>Prepare IAM Policy For Appkube</h3>
        <ul>
          <li>
            Login to your AWS console <a>(aws.amzon.com)</a>
          </li>
          <li>
            Click <strong>'Services'</strong> and select the
            <strong>IAM</strong> Services <i class="fas fa-question-circle"></i>
          </li>
          <li>
            Select <strong>'Policies'</strong> and click on <strong>'Create Policy'</strong> button <i class="fas fa-question-circle"></i>
          </li>
          <li>
            Select the <strong>'JSON'</strong> tab <i class="fas fa-question-circle"></i>
          </li>
          <li>
            Review this <a>Policy document</a> and copy-and-paste its content to the <strong>'JSON'</strong> tab in AWS. Then click the <strong>'Next:Tags'</strong> button at the botton of the page <i class="fas fa-question-circle"></i>
          </li>
          <li>
            Click <strong>'Next:Review'</strong> to review the policy.Enter Appkube-readonly-policy for the policy name and click
            <strong>'Create Policy'</strong>
          </li>
          <li>
            Click on <a>'NEXT'</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default PreparePolicy;
