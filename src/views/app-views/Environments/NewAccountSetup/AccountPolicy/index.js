import React, { Component } from "react";
import Wizard from "views/app-views/Environments/NewAccountSetup/AccountPolicy/Wizard";
import AssociateOu from "views/app-views/Environments/NewAccountSetup/AccountPolicy/AssociateOu";
import PreparePolicy from "views/app-views/Environments/NewAccountSetup/AccountPolicy/PreparePolicy";
import CreateRole from "views/app-views/Environments/NewAccountSetup/AccountPolicy/CreateRole";
import Finish from "views/app-views/Environments/NewAccountSetup/AccountPolicy/Finish";
import Box from "@mui/material/Box";
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
    const { formData } = this.state;
    let isValid = true;
    let errors = {};
    let regex = /arn:aws:iam::([0-9]+(:user)+)\/[A-Za-z0-9]+/i;
    if (this.state.isSubmit) {
      if (!formData.displayName) {
        errors = { ...errors, displayName: "Display name is required!" };
        isValid = false;
      } else {
        errors.displayName = "";
      }
      if (!formData.roleArn) {
        errors.roleArn = "Role ARN is required!";
        isValid = false;
      } else if (!regex.test(formData.roleArn)) {
        errors.roleArn = "Role ARN format is not valid!";
        isValid = false;
      } else {
        errors.roleArn = "";
      }
      if (!formData.externalId) {
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
    const { formData } = this.state;
    return (
      <Box className="new-account-container">
        <Box className="new-account-page-container">
          <Wizard
            steps={this.steps}
            formData={formData}
            validateCreateRoleForm={this.validateCreateRoleForm}
            setIsSubmit={this.setIsSubmit}
            isSubmit={this.state.isSubmit}
            departmentId={this.state.checkedId}
            previousStep={(finishPrevStep) => {
              if (finishPrevStep === "finishPrevStep") {
                this.setState({ finishPrevious: false });
              } else {
                this.props.previousStep();
              }
            }}
            finishPrevious={this.state.finishPrevious}
          />
        </Box>
      </Box>
    );
  }
}

export default AccountPolicy;
