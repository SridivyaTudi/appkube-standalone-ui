import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import { Button, Box, List, ListItem } from "@mui/material";
import { v4 } from "uuid";

class AccountStepsPopup extends Component {
  steps = {
    STEP1: 0,
    STEP2: 1,
    STEP3: 2,
    STEP4: 3,
  };
  cloudFormationTemplate = ["Primary Account: 1234", "Failover Account: 7890"];
  resources = ["Web Layer", "App Layer", "Data Layer"];
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeStep: this.steps.STEP1,
      step1FormData: {
        account: "",
        region: "",
      },
      step2FormData: {
        accountPermission: ["Primary Account: 1234", "Failover Account: 7890"],
      },
      step3FormData: {
        account: "",
        region: "",
        resources: ["Web Layer"],
      },
      step4FormData: {
        application: "",
        resources: ["Web Layer"],
        resourcesByTag: "",
      },
      isSubmit: false,
    };
  }

  toggle = () => {
    this.props.toggleAccountStepsPopup();
  };

  /**
   * Step1 form data changes
   *  @param {Object} event - Event object of step1 inputs
   */
  handleStep1 = (event) => {
    const { name, value } = event.target;
    const { step1FormData } = this.state;
    step1FormData[name] = value;
    this.setState({ step1FormData });
  };

  /**
   * Step2 form data changes
   *  @param {Object} event - Event object of step2 checkbox
   */
  handleStep2 = (event) => {
    let {
      step2FormData: { accountPermission },
    } = this.state;
    let { name } = event.target;

    if (accountPermission.filter((item) => item === name).length) {
      accountPermission = accountPermission.filter((item) => item !== name);
    } else {
      accountPermission.push(name);
    }

    this.setState({ step2FormData: { accountPermission } });
  };

  /**
   * Step3 or Step4 form data changes
   *  @param {Object} event - Event object of Step3 or Step4 checkbox or text input
   * @param {Boolean} isCheckBox - If input is checkbox,then receive 1 else 0
   */
  handleStep3Or4 = (e, isCheckBox = 0) => {
    const { name, value } = e.target;

    let { step3FormData, step4FormData, activeStep } = this.state;
    let { STEP4 } = this.steps;

    let checkStep4 = activeStep === STEP4 ? true : false;
    let { resources } = checkStep4 ? step4FormData : step3FormData;

    if (isCheckBox) {
      if (resources.filter((resource) => resource === name).length) {
        resources = resources.filter((resource) => resource !== name);
      } else {
        resources.push(name);
      }

      if (checkStep4) {
        step4FormData["resources"] = resources;
      } else {
        step3FormData["resources"] = resources;
      }
    } else {
      if (checkStep4) {
        step4FormData[name] = value;
      } else {
        step3FormData[name] = value;
      }
    }
    this.setState({ step3FormData, step4FormData });
  };

  /**
   * Validate step1 form
   * @param {Boolean} isSubmit - When submit btn,then receive 1 else 0
   */
  validateStep1 = (isSubmit) => {
    const {
      step1FormData: { account, region },
    } = this.state;
    let isValid;
    let errors;
    if (isSubmit) {
      isValid = true;

      if (!account) {
        errors = { ...errors, account: "AWS account is required!" };
        isValid = false;
      } else {
        errors = { ...errors, account: "" };
      }

      if (!region) {
        errors = { ...errors, region: "Region is required!" };
        isValid = false;
      } else {
        errors = { ...errors, region: "" };
      }
    }
    return { isValid, errors };
  };

  /**
   * Validate step2 form
   * @param {Boolean} isSubmit - When submit btn,then receive 1 else 0
   */
  validateStep2 = (isSubmit) => {
    const {
      step2FormData: { accountPermission },
    } = this.state;
    let isValid;
    let errors;
    if (isSubmit) {
      isValid = true;

      if (!accountPermission.length) {
        errors = {
          ...errors,
          accountPermission: "Account permission is required!",
        };
        isValid = false;
      } else {
        errors = { ...errors, accountPermission: "" };
      }
    }
    return { isValid, errors };
  };

  /**
   * Validate step3 form
   * @param {Boolean} isSubmit - When submit btn,then receive 1 else 0
   */
  validateStep3 = (isSubmit) => {
    const {
      step3FormData: { account, region, resources },
    } = this.state;
    let isValid;
    let errors;
    if (isSubmit) {
      isValid = true;

      if (!account) {
        errors = { ...errors, account: "AWS account is required!" };
        isValid = false;
      } else {
        errors = { ...errors, account: "" };
      }

      if (!region) {
        errors = { ...errors, region: "Region is required!" };
        isValid = false;
      } else {
        errors = { ...errors, region: "" };
      }

      if (!resources.length) {
        errors = {
          ...errors,
          resources: "Resources is required!",
        };
        isValid = false;
      } else {
        errors = { ...errors, resources: "" };
      }
    }
    return { isValid, errors };
  };

  /**
   * Validate step4 form
   * @param {Boolean} isSubmit - When submit btn,then receive 1 else 0
   */
  validateStep4 = (isSubmit) => {
    const { step4FormData:{resources,application,resourcesByTag} } = this.state;
    let isValid;
    let errors;
    if (isSubmit) {
      isValid = true;

      if (!application) {
        errors = { ...errors, application: "Application is required!" };
        isValid = false;
      } else {
        errors = { ...errors, application: "" };
      }

      if (!resourcesByTag) {
        errors = { ...errors, resourcesByTag: "Tag is required!" };
        isValid = false;
      } else {
        errors = { ...errors, resourcesByTag: "" };
      }

      if (!resources.length) {
        errors = {
          ...errors,
          resources: "Resources is required!",
        };
        isValid = false;
      } else {
        errors = { ...errors, resources: "" };
      }
    }
    return { isValid, errors };
  };

  /**
   * Validate form steps
   * @param {Boolean} isSubmit - When submit btn,then receive 1 else 0
   */
  validateFormSteps = (isSubmit) => {
    let { activeStep } = this.state;

    let { isValid, errors } = this[`validateStep${activeStep + 1}`](isSubmit);
    if (!isValid) return errors;

    return {};
  };

  /**
   * Checkbox html render of step2 form
   */
  renderCheckBoxStep2 = () => {
    let {
      step2FormData: { accountPermission },
    } = this.state;
    return this.cloudFormationTemplate.map((template, templateIndex) => {
      return (
        <Box
          className="d-flex align-items-center form-group-checkbox"
          key={v4()}
        >
          <input
            className="checkbox-input"
            type="checkbox"
            name={`${template}`}
            checked={
              accountPermission.filter((item) => item === template).length
            }
            id={`${template}_${templateIndex}`}
            onChange={this.handleStep2}
          />
          <label htmlFor={`${template}_${templateIndex}`}>{template}</label>
        </Box>
      );
    });
  };

  /**
   * Checkbox html render of step - 3 or 4form
   */
  renderCheckBoxStep3Or4 = () => {
    let { step3FormData, step4FormData, activeStep } = this.state;
    let { STEP4 } = this.steps;

    let { resources } = activeStep === STEP4 ? step4FormData : step3FormData;

    return this.resources.map((resource, resourceIndex) => {
      return (
        <li key={v4()}>
          <Box className="d-flex align-items-center checkbox">
            <input
              className="checkbox-input"
              type="checkbox"
              name={resource}
              id={`${resource}_${resourceIndex}`}
              checked={
                resources.filter((resourceName) => resourceName === resource)
                  .length
              }
              onChange={(e) => this.handleStep3Or4(e, 1)}
            />
            <label for={`${resource}_${resourceIndex}`}>{resource}</label>
          </Box>
        </li>
      );
    });
  };

  //  Render line steps
  renderStepsProgress = () => {
    let { activeStep } = this.state;
    let { STEP2, STEP3, STEP4 } = this.steps;
    let step1ActiveClass = [STEP2, STEP3, STEP4];
    let step2ActiveClass = {
      [STEP2]: "active-25",
      [STEP3]: "active-auto",
      [STEP4]: "active",
    };

    return (
      <List className="steps">
        <ListItem
          className={step1ActiveClass.includes(activeStep) ? "active" : ""}
        >
          <span></span>
          <p>Select your Failover AWS Account</p>
        </ListItem>
        <ListItem className={step2ActiveClass[activeStep] || ""}>
          <span></span>
          <p>Let’s Connect / Mirror your account</p>
        </ListItem>
        <ListItem className={activeStep === STEP4 ? "active" : ""}>
          <span></span>
          <p>Select AWS resources to mirror</p>
        </ListItem>
      </List>
    );
  };

  //  Render back and continue buttons
  renderFooterBtns = () => {
    let { STEP1 } = this.steps;
    let { activeStep } = this.state;
    return (
      <div className="text-center d-block">
        {activeStep !== STEP1 ? (
          <Button
            className="primary-outline-btn m-r-2"
            variant="outlined"
            onClick={this.onClickBackBtn}
          >
            Back
          </Button>
        ) : (
          <></>
        )}

        <Button
          className="primary-btn"
          variant="contained"
          onClick={this.onClickContinueBtn}
        >
          Continue
        </Button>
      </div>
    );
  };

  //  Fire click event on continue button
  onClickContinueBtn = () => {
    let { activeStep } = this.state;

    this.setState({ isSubmit: true }, () => {
      activeStep = activeStep + 1;
      const { isValid } = this[`validateStep${activeStep}`](true);

      if (isValid) {
        if (activeStep === 4) {
          this.toggle();
        }
        this.setState({
          isSubmit: false,
          activeStep,
        });
      }
    });
  };

  //  Fire click event on back button
  onClickBackBtn = () => {
    let { activeStep } = this.state;
    activeStep = activeStep - 1;
    this.setState({ activeStep, isSubmit: false });
  };

  /**
   *  Render step-1 form
   * @param {Number} errorLength - Give the error length
   * @param {Object} stepErrors - Give the errors object
   */
  renderStep1Form = (errorLength, stepErrors) => {
    const {
      activeStep,
      step1FormData: { account: step1Account, region: step1Region },
    } = this.state;
    let { STEP1 } = this.steps;

    return (
      activeStep === STEP1 && (
        <>
          <div className="contents">
            <p className="text-center">
              Selected AWS Account & region details will displayed
            </p>
            <p className="text-center">
              Where Do you want to failover your application?
            </p>
          </div>
          <div className="account-form">
            <Box className="form-group">
              <label htmlFor="step1Account">Select AWS Account</label>
              <input
                className="form-control"
                type="text"
                name="account"
                id="step1Account"
                onChange={this.handleStep1}
                value={step1Account}
              />
              <span
                className="red"
                style={{ fontSize: "12px", marginTop: "5px" }}
              >
                {errorLength && stepErrors.account ? stepErrors.account : ""}
              </span>
            </Box>
            <Box className="form-group">
              <label htmlFor="step1Region">Select Region</label>
              <input
                className="form-control"
                type="text"
                name="region"
                id="step1Region"
                onChange={this.handleStep1}
                value={step1Region}
              />
              <span
                className="red"
                style={{ fontSize: "12px", marginTop: "5px" }}
              >
                {errorLength && stepErrors.region ? stepErrors.region : ""}
              </span>
            </Box>
          </div>
          {this.renderFooterBtns()}
        </>
      )
    );
  };

  /**
   *  Render step-2 form
   * @param {Number} errorLength - Give the error length
   * @param {Object} stepErrors - Give the errors object
   */
  renderStep2Form = (errorLength, stepErrors) => {
    const { activeStep } = this.state;
    let { STEP2 } = this.steps;

    return (
      activeStep === STEP2 && (
        <>
          <div className="contents">
            <p className="text-center">
              Account permission access using cloud formation template
            </p>
          </div>
          <div className="account-form">
            {this.renderCheckBoxStep2()}
            <span
              className="red"
              style={{ fontSize: "12px", marginTop: "5px" }}
            >
              {errorLength && stepErrors.accountPermission
                ? stepErrors.accountPermission
                : ""}
            </span>
          </div>
          {this.renderFooterBtns()}
        </>
      )
    );
  };

  /**
   *  Render step-3 form
   * @param {Number} errorLength - Give the error length
   * @param {Object} stepErrors - Give the errors object
   */
  renderStep3Form = (errorLength, stepErrors) => {
    const {
      activeStep,
      step3FormData: { account: step3Account, region: step3Region },
    } = this.state;
    let { STEP3 } = this.steps;
    return (
      activeStep === STEP3 && (
        <>
          <div className="contents">
            <p className="text-center">
              Account permission access using cloud formation template
            </p>
          </div>
          <div className="account-form">
            <Box className="form-group">
              <label htmlFor="step3Account">Select AWS Account</label>
              <input
                className="form-control"
                type="text"
                name="account"
                onChange={this.handleStep3Or4}
                value={step3Account}
                id="step3Account"
              />
              <span
                className="red"
                style={{ fontSize: "12px", marginTop: "5px" }}
              >
                {errorLength && stepErrors.account ? stepErrors.account : ""}
              </span>
            </Box>
            <Box className="form-group">
              <label htmlFor="step3Region">Select Region</label>
              <input
                className="form-control"
                type="text"
                name="region"
                id="step3Region"
                value={step3Region}
                onChange={this.handleStep3Or4}
              />
              <span
                className="red"
                style={{ fontSize: "12px", marginTop: "5px" }}
              >
                {errorLength && stepErrors.region ? stepErrors.region : ""}
              </span>
            </Box>
            <Box className="form-group">
              <label>Select specific resources</label>
              <ul>{this.renderCheckBoxStep3Or4()}</ul>
              <span
                className="red"
                style={{ fontSize: "12px", marginTop: "5px" }}
              >
                {errorLength && stepErrors.resources
                  ? stepErrors.resources
                  : ""}
              </span>
            </Box>
          </div>
          {this.renderFooterBtns()}
        </>
      )
    );
  };

  /**
   *  Render step-4 form
   * @param {Number} errorLength - Give the error length
   * @param {Object} stepErrors - Give the errors object
   */
  renderStep4Form = (errorLength, stepErrors) => {
    const {
      activeStep,
      step4FormData: { application, resourcesByTag },
    } = this.state;
    let { STEP4 } = this.steps;

    return (
      activeStep === STEP4 && (
        <>
          <div className="account-form">
            <Box className="form-group">
              <label htmlFor="application">Define your application</label>
              <input
                className="form-control"
                type="text"
                name="application"
                id="application"
                onChange={this.handleStep3Or4}
                value={application}
              />
              <span
                className="red"
                style={{ fontSize: "12px", marginTop: "5px" }}
              >
                {errorLength && stepErrors.application
                  ? stepErrors.application
                  : ""}
              </span>
            </Box>
            <Box className="form-group">
              <label htmlFor="resourcesByTag">Select resources by tag</label>
              <input
                className="form-control"
                type="text"
                name="resourcesByTag"
                id="resourcesByTag"
                onChange={this.handleStep3Or4}
                value={resourcesByTag}
              />
              <span
                className="red"
                style={{ fontSize: "12px", marginTop: "5px" }}
              >
                {errorLength && stepErrors.resourcesByTag
                  ? stepErrors.resourcesByTag
                  : ""}
              </span>
            </Box>
            <Box className="form-group">
              <label>Select specific resources</label>
              <ul>{this.renderCheckBoxStep3Or4()}</ul>
              <span
                className="red"
                style={{ fontSize: "12px", marginTop: "5px" }}
              >
                {errorLength && stepErrors.resources
                  ? stepErrors.resources
                  : ""}
              </span>
            </Box>
          </div>
          {this.renderFooterBtns()}
        </>
      )
    );
  };

  render() {
    const { isSubmit } = this.state;
    const stepErrors = this.validateFormSteps(isSubmit);
    const errorLength = stepErrors && Object.keys(stepErrors).length;

    return (
      <>
        <Modal
          isOpen={this.props.showModal}
          toggle={this.toggle}
          className="account-steps-modal-container"
        >
          <ModalBody style={{ overflowY: "auto", overflowX: "hidden" }}>
            {this.renderStepsProgress()}
            {this.renderStep1Form(errorLength, stepErrors)}
            {this.renderStep2Form(errorLength, stepErrors)}
            {this.renderStep3Form(errorLength, stepErrors)}
            {this.renderStep4Form(errorLength, stepErrors)}
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default AccountStepsPopup;
