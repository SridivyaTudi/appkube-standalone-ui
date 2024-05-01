import React, { Component } from "react";
import { Box, Button } from "@mui/material";

class Wizard extends Component {
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

  setActiveStep = (step) => {
    this.setState({
      currentStep: step,
    });
  };

  createStepLine = () => {
    const { currentStep } = this.state;
    const { steps } = this.props;
    const retData = [];
    if (steps?.length) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <Box
            className={`wizard-step-button ${
              currentStep === i ? "active" : ""
            }`}
            onClick={(e) => this.onClickStepButton(i)}
          >
            {step.name}
          </Box>
        );
      }
    }
    return retData;
  };

  createStepContainer = () => {
    const { currentStep } = this.state;
    const { steps } = this.props;
    const retData = [];
    if (steps?.length) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <Box
            className={`wizard-step-component ${
              currentStep === i ? "" : "d-none"
            }`}
          >
            {step.component}
          </Box>
        );
      }
    }
    return retData;
  };
  render() {
    const { currentStep } = this.state;
    const { steps } = this.props;
    const isDisabled = false;
    return (
      <Box className="wizard-container">
        <Box className="wizard-step-line-container">
          {this.createStepLine()}
        </Box>
        <Box className="wizard-step-component-container">
          {this.createStepContainer()}
          <Box className="d-block text-right next">
            <Button
              onClick={(e) => this.onClickStepButton(currentStep - 1)}
              className="primary-outline-btn m-r-2"
              variant="outlined"
              disabled={currentStep == 0}
            >
              Previous
            </Button>
            {/* {currentStep >= steps.length + 1 && (
            <button className="blue-button m-b-0">Previous</button>
          )} */}
            {currentStep < steps.length - 1 && (
              <Button
                onClick={(e) => this.onClickStepButton(currentStep + 1)}
                className="primary-btn"
              >
                Next
              </Button>
            )}
            {currentStep >= steps.length - 1 && (
              <Button
                disabled={isDisabled ? true : false}
                onClick={this.props.submitPage}
                className={
                  isDisabled
                    ? "asset-blue-button asset-disabled m-r-0 m-b-0 "
                    : "primary-btn"
                }
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Wizard;
