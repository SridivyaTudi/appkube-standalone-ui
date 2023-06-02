import React, { Component } from "react";
import { ToastMessage } from "../../../../Toast/ToastMessage";
import { config } from "./../../../../AssetManager/config";
import { RestService } from "./../../../../Services/RestService";
import { Link } from 'react-router-dom';



class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      rolesDetails: this.props.rolesDetails ? this.props.rolesDetails : null,
      departmentId: 0,
      redirectToEnviroment:false,
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
    const { steps } = this.props;
    const { currentStep } = this.state;
    const retData = [];
    if (steps && steps.length > 0) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <div
            className={`wizard-step-button ${currentStep === i ? "active" : ""
              }`}
            // onClick={(e) => this.onClickStepButton(i)}
          >
            {step.name}
          </div>
        );
      }
    }
    return retData;
  };

  createStepContainer = () => {
    const { steps } = this.props;
    const { currentStep } = this.state;
    const retData = [];
    if (steps && steps.length > 0) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <div
            className={`wizard-step-component ${currentStep === i ? "" : "d-none"
              }`}
          >
            {step.component()}
          </div>
        );
      }
    }
    return retData;
  };

  validateCreateRoleForm = () => {

    let { name, role, externalId } = this.props.rolesDetails
    if (!name || name == '') {
      this.props.validateCreateRoleForm({ name: true, role: false, externalId: false })
      return false;
    } else if (!role || role == '') {
      this.props.validateCreateRoleForm({ name: false, role: true, externalId: false })
      return false;
    } else if (!externalId || externalId == '') {
      this.props.validateCreateRoleForm({ name: false, role: false, externalId: true })
      return false;
    } else {
      this.props.validateCreateRoleForm({ name: false, role: false, externalId: false })
      return true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.departmentId) !== JSON.stringify(prevState.departmentId) && this.props.departmentId > 0) {
      this.setState({
        departmentId: this.props.departmentId,
      });
      if(this.state.currentStep == 2){
        this.onClickStepButton(this.state.currentStep + 1)
      }
      
    }
    if(JSON.stringify(prevProps.roleDetails) !== JSON.stringify(prevState.roleDetails)){
      this.setState({roleDetails:this.props.roleDetails})
    }
  }
  createSubmit = () =>{
    console.log(this.props.roleDetails)
    let postData = {
      "displayName": this.props.rolesDetails.name,
      "roleArn": this.props.rolesDetails.role || '',
      "cloud": "AWS",
      "externalId": this.props.rolesDetails.externalId,
      "department": {
        "id": this.state.departmentId
      }
    }
    RestService.postData(config.ADD_CLOUD_ENV,postData).then(
      (response) => {
        if(response.status == 500){
          ToastMessage("Successfuly not enviroment created", "unsuccess");
           return 1 
        }
        ToastMessage("Successfully new enviroment created", "success");
        this.setState({redirectToEnviroment:true})
      }
    )
  }
  render() {
    const { currentStep } = this.state;
    const { steps } = this.props;
    return (
      <>
        <div className="new-account-tab-container">
          <div className="row row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <div className="wizard-tab-line-container">
                {this.createStepLine()}
              </div>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12">
              <div className="wizard-step-component-container">
                {this.createStepContainer()}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center ">
          {currentStep < steps.length - 1 && (
            <button
              onClick={(e) => {
                this.onClickStepButton(currentStep - 1)
              }}
              className="asset-blue-button m-b-0"
            >
              Previous
            </button>
          )}
          {currentStep >= steps.length + 1 && (
            <button className="asset-blue-button m-b-0">Previous</button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              onClick={(e) => {

                if (this.state.currentStep == 1) {
                  if (this.validateCreateRoleForm()) {
                    this.onClickStepButton(currentStep + 1)
                  }
                } else {
                  this.onClickStepButton(currentStep + 1)
                }
              }}
              className="asset-blue-button m-r-0 m-b-0"
            >
              Next
            </button>
          )}
          {currentStep >= steps.length - 1 && (
            <button
              onClick={()=>this.createSubmit()}
              className="asset-blue-button m-r-0 m-b-0"
              // to={`/assetmanager/pages/environments`}
            >
              Submit
            </button>
          )}
        </div>
      </>
    );
  }
}

export default Wizard;
