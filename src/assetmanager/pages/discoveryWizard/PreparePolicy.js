import React, { Component } from "react";

class PreparePolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="d-inline-block width-100 account-setup-tab-contents">
        <div className="contents">
          <strong>Prepare IAM Policy for AppKube</strong>
          <ul className="m-t-1">
            <li>
              Login to your AWS console <a>aws.amazon.com</a>
            </li>
            <li>
              Click <strong>‘Services’</strong>and select the
              <strong>IAM</strong>service <i class="far fa-question-circle"></i>
            </li>
            <li>
              select ‘Policies’ and click on <strong>‘Create Policy’ </strong>
              button <i class="far fa-question-circle"></i>
            </li>
            <li>
              select the<strong>‘JSON’</strong>tab
              <i class="far fa-question-circle"></i>
            </li>
            <li>
              ‘Review this <a>policy document</a>and copy-and paste its content
              to the <strong>JSON</strong>tab in AWS. Then click the
              <strong>‘Next: Tags’ </strong> button at<br></br> the bottom of the page  <i class="far fa-question-circle"></i>
            </li>
            <li>
              Click ‘Next: Review’ to review the policy. Enter AppKube-readonly-policy for the policy name and click <strong>'Create Policy' </strong>  <i class="far fa-question-circle"></i>
            </li>
            <li>
              Click on <a>'NEXT'</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PreparePolicy;
