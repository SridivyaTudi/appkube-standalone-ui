import React, { Component } from "react";
import Wizard from "Views/AppViews/Environments/NewAccountSetup/AccountPolicy/Wizard";
import AssociateOu from "Views/AppViews/Environments/NewAccountSetup/AccountPolicy/AssociateOu";
import PreparePolicy from "Views/AppViews/Environments/NewAccountSetup/AccountPolicy/PreparePolicy";
import CreateRole from "Views/AppViews/Environments/NewAccountSetup/AccountPolicy/CreateRole";
import Finish from "Views/AppViews/Environments/NewAccountSetup/AccountPolicy/Finish";
import Box from "@mui/material/Box";
import { REGEX_TYPE } from "CommonData";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class AccountPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        displayName: "",
        roleArn: "",
        externalId: "",
      },
      checkedId: false,
      finishPrevious: false,
      isSubmit: false,
    };
    this.steps = [
      {
        name: "Prepare Policy",
        component: () => <PreparePolicy />,
      },
      {
        name: "Create Role",
        component: () => (
          <CreateRole
            handleCreateRoleInput={this.handleCreateRoleInput}
            validateCreateRoleForm={this.validateCreateRoleForm}
            isSubmit={this.state.isSubmit}
          />
        ),
      },
      {
        name: "Associate OU",
        component: () => (
          <AssociateOu
            setDepartment={(checkedId, departmentName, description) => {
              this.setState({ checkedId, departmentName, description });
            }}
            roleDetails={{
              departmentName: this.state.departmentName,
              description: this.state.description,
              departmentId: this.state.checkedId,
            }}
          />
        ),
      },
      {
        name: "Finish",
        component: () => (
          <Finish
            roleDetails={{
              departmentName: this.state.departmentName,
              departmentId: this.state.checkedId,
              description: this.state.description,
            }}
            formData={this.state.formData}
            previousStep={() => {
              this.setState({ finishPrevious: true });
            }}
          />
        ),
      },
    ];
  }

  handleCreateRoleInput = (e) => {
    const { formData } = this.state;
    const { name, value } = e.target;
    formData[name] = value;
    this.setState({ formData });
  };

  validateCreateRoleForm = () => {
    const {
      formData: { displayName, roleArn, externalId },
      isSubmit,
    } = this.state;
    let isValid = true;
    let errors = {};
    let regex = REGEX_TYPE.ROLE_ARN;

    if (isSubmit) {
      if (!displayName) {
        errors = { ...errors, displayName: "Display name is required!" };
        isValid = false;
      } else {
        errors.displayName = "";
      }
      if (!roleArn) {
        errors.roleArn = "Role ARN is required!";
        isValid = false;
      } else if (!regex.test(roleArn)) {
        errors.roleArn = "Role ARN format is not valid!";
        isValid = false;
      } else {
        errors.roleArn = "";
      }
      if (!externalId) {
        errors.externalId = "External ID is required!";
        isValid = false;
      } else {
        errors.externalId = "";
      }
    }
    return {
      isValid,
      errors,
    };
  };

  setIsSubmit = (submit) => {
    this.setState({ isSubmit: submit });
  };

  render() {
    const { formData, isSubmit, checkedId, finishPrevious } = this.state;
    return (
      <Box className="new-account-container">
        <Box className="new-account-page-container">
        <Link className="close-btn" to={`${APP_PREFIX_PATH}/assets/environments`}>
          <i className="fa-solid fa-xmark"></i>
        </Link>
          <Wizard
            steps={this.steps}
            formData={formData}
            validateCreateRoleForm={this.validateCreateRoleForm}
            setIsSubmit={this.setIsSubmit}
            isSubmit={isSubmit}
            departmentId={checkedId}
            previousStep={(finishPrevStep) => {
              if (finishPrevStep === "finishPrevStep") {
                this.setState({ finishPrevious: false });
              } else {
                this.props.previousStep();
              }
            }}
            finishPrevious={finishPrevious}
          />
          
        </Box>
      </Box>
    );
  }
}

export default AccountPolicy;
