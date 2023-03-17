import React from "react";
import { Link } from "react-router-dom";
import Wizard from "./Wizard";
import AlertDetails from "./AlertDetails";
import AlertTypes from "./AlertTypes";
import Conditions from "./Conditions";
import AlertHandler from "./AlertHandler";
import Message from "./Message";

class AlertRuleBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: "Hello World",
      message: "",
      conditionData: true,
      hideNextBtn: false,
      hidePrevBtn: true,
      hideFinishBtn: true,
    };
    this.conditionsRef = React.createRef();
    this.steps = [
      {
        name: "Alert Details",
        component: <AlertDetails />,
      },
      {
        name: "Alert Type",
        component: <AlertTypes parentCallback={this.callbackFunction} />,
      },
      {
        name: "Conditions",
        component: <Conditions ref={this.conditionsRef} />,
      },
      {
        name: "Alert Handlers",
        component: <AlertHandler />,
      },
      {
        name: "Message",
        component: <Message />,
      },
    ];
    this.wizardRef = React.createRef();
  }

  callbackFunction = (childData) => {
    this.conditionsRef.current.onChangeAlertType(childData);
  };

  onClickNext = () => {
    this.wizardRef.current.goToNextPage();
  };

  onClickPrevious = () => {
    this.wizardRef.current.goToPreviousPage();
  };

  onChangeStep = (currentStep, isLastStep) => {
    this.setState({
      hideNextBtn: isLastStep,
      hidePrevBtn: false,
      hideFinishBtn: !isLastStep,
    });
  };

  onChangePrevStep = (firstPage) => {
    this.setState({
      hidePrevBtn: firstPage,
      hideNextBtn: false,
      hideFinishBtn: true,
    });
  };

  render() {
    const state = this.state;
    return (
      <div className="manage-alert-rule-container">
        <div className="alert-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-md-5 col-sm-12">
                <div className="alert-heading">Alert Rule Builder</div>
              </div>
              <div className="col-md-7 col-sm-12">
                <div className="float-right common-right-btn">
                  <button className="alert-blue-button save-rule">
                    Save Rule
                  </button>
                  <Link
                    to={`/alertmanager/pages/monitor-alerts`}
                    className="alert-white-button min-width-inherit"
                  >
                    <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp; Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container wizard-container">
            <Wizard
              steps={this.steps}
              ref={this.wizardRef}
              onChangeStep={this.onChangeStep}
              onChangePrevStep={this.onChangePrevStep}
            />
            <div className="d-block width-100 text-right alert-wizard-buttons">
              {!state.hidePrevBtn && (
                <button
                  className="alert-blue-button m-r-0 m-b-0 previous-btn"
                  onClick={this.onClickPrevious}
                >
                  Previous
                </button>
              )}
              {!state.hideNextBtn && (
                <button
                  className="alert-blue-button m-r-0 m-b-0 next-btn"
                  onClick={this.onClickNext}
                >
                  Next
                </button>
              )}
              {!state.hideFinishBtn && (
                <button className="alert-blue-button m-r-0 m-b-0 finish-btn">
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlertRuleBuilder;
