import React from "react";

class WebServiceWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }

  onClickStepButton = (activeStep) => {
    this.setState({
      currentStep: activeStep,
    });
  };

  createStepLine = () => {
    const { steps } = this.props;
    const { currentStep } = this.state;
    const retData = [];
    if (steps && steps.length > 0) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <li
            className={`${currentStep === i ? "active" : ""}`}
            onClick={(e) => this.onClickStepButton(i)}
          >
            <a>{step.name}</a>
          </li>
        );
      }
    }
    return retData;
  };

  createStepContainer = () => {
    const { steps } = this.props;
    const { currentStep } = this.state;
    if (steps && steps.length > 0) {
      const Component = steps[currentStep].component;
      return (
        <div
          key={steps[currentStep].apiKey}
          className={`webservice-step-component`}
        >
          <Component {...this.props} apiKey={steps[currentStep].apiKey} />
        </div>
      );
    }
    return <></>;
  };

  render() {
    return (
      <div className="webservice-tabs-container">
        <div className="tabs">
          <ul>{this.createStepLine()}</ul>
        </div>
        <div className="tabs-container">
          <div className="storage-section">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="network-boxs">
                  <ul>{this.createStepContainer()}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WebServiceWizard;
