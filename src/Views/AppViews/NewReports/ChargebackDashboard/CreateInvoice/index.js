import React, { Component } from "react";
import { Box, IconButton, Button, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import status from "Redux/Constants/CommonDS";
import SuccessfullyIcon from "assets/img/assetmanager/successfully-icon.png";
const steps = ["Add OU ", "Add Project & Services ", "Payment and Date"];
class CreateInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: {},
      selectedGroups: [],
      groups: [],
      isAddNewEnvironmentShown: false,
    };
  }
  toggleAddNewEnvironmentMenu = () => {
    this.setState({
      isAddNewEnvironmentShown: !this.state.isAddNewEnvironmentShown,
    });
  };
  renderAddNewEnvironmentList = () => {
    return (
      <>
        <ListItem>
          <Link to={``}>
            <p>Amazon Web Services</p>
          </Link>
        </ListItem>
        <ListItem>
          <Link to={``}>
            <p>Azure Cloud</p>
          </Link>
        </ListItem>
        <ListItem>
          <Link to={``}>
            <p>Google Cloud Platform</p>
          </Link>
        </ListItem>
        <ListItem>
          <Link to={``}>
            <p>Kubernetes</p>
          </Link>
        </ListItem>
      </>
    );
  };

  // Set active step
  setActiveStep = (e) => {
    let { activeStep } = this.state;
    activeStep = activeStep + 1;
    this.setState({ activeStep });
  };
  // Render active step
  renderActiveStep = () => {
    let { activeStep, isAddNewEnvironmentShown } = this.state;

    return (
      <form onSubmit={this.setActiveStep}>
        <Box className="users-content" sx={{ mt: 2 }}>
          {activeStep === 0 ? (
            <>
              <Box className="form-group">
                <label className="form-label ">Organization Name</label>
                <Box className="d-block">
                  <input
                    //id={`lastName_${index}`}
                    type="text"
                    className="form-control"
                    name="organizationName"
                    placeholder="Organization Name"
                    //value={user.lastName}
                    //onChange={(e) => this.handleInputChange(e, index)}
                  />
                </Box>
              </Box>
              <Box className="form-group">
                <label className="form-label ">Select Department</label>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Select Department
                      <i className="fas fa-chevron-down arrow-icon"></i>
                    </Box>
                    <Box
                      className={
                        isAddNewEnvironmentShown
                          ? "fliter-collapse active"
                          : "fliter-collapse"
                      }
                    >
                      <List>{this.renderAddNewEnvironmentList()}</List>
                    </Box>
                  </>

                  <div
                    className={
                      isAddNewEnvironmentShown
                        ? "fliters-collapse-bg active"
                        : "fliters-collapse-bg"
                    }
                    onClick={this.toggleAddNewEnvironmentMenu}
                  />
                </Box>
              </Box>
            </>
          ) : activeStep === 1 ? (
            <>
              <Box className="form-group">
                <label className="form-label ">Select Services</label>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Select Services
                      <i className="fas fa-chevron-down arrow-icon"></i>
                    </Box>
                    <Box
                      className={
                        isAddNewEnvironmentShown
                          ? "fliter-collapse active"
                          : "fliter-collapse"
                      }
                    >
                      <List>{this.renderAddNewEnvironmentList()}</List>
                    </Box>
                  </>

                  <div
                    className={
                      isAddNewEnvironmentShown
                        ? "fliters-collapse-bg active"
                        : "fliters-collapse-bg"
                    }
                    onClick={this.toggleAddNewEnvironmentMenu}
                  />
                </Box>
              </Box>
              <Box className="form-group">
                <label className="form-label ">Select Products</label>
                <Box className="environment-fliter">
                  <>
                    <Box
                      className="fliter-toggel new-environment"
                      onClick={this.toggleAddNewEnvironmentMenu}
                    >
                      Select Products
                      <i className="fas fa-chevron-down arrow-icon"></i>
                    </Box>
                    <Box
                      className={
                        isAddNewEnvironmentShown
                          ? "fliter-collapse active"
                          : "fliter-collapse"
                      }
                    >
                      <List>{this.renderAddNewEnvironmentList()}</List>
                    </Box>
                  </>

                  <div
                    className={
                      isAddNewEnvironmentShown
                        ? "fliters-collapse-bg active"
                        : "fliters-collapse-bg"
                    }
                    onClick={this.toggleAddNewEnvironmentMenu}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box className="form-group">
                <label className="form-label ">Invoice Issuing date</label>
                <Box className="d-block">
                  <input
                    //id={`lastName_${index}`}
                    type="date"
                    className="form-control"
                    name="organizationName"
                    placeholder="Select date"
                    //value={user.lastName}
                    //onChange={(e) => this.handleInputChange(e, index)}
                  />
                </Box>
              </Box>
              <Box className="form-group">
                <label className="form-label ">Invoice Expiration Date</label>
                <Box className="d-block">
                  <input
                    //id={`lastName_${index}`}
                    type="date"
                    className="form-control"
                    name="organizationName"
                    placeholder="Select date "
                    //value={user.lastName}
                    //onChange={(e) => this.handleInputChange(e, index)}
                  />
                </Box>
              </Box>
              <Box className="completed-steper m-t-5">
                <Box className="completed-imge">
                  <img src={SuccessfullyIcon} alt="Carrier" />
                </Box>
                <Box className="completed-content m-t-3">
                  <h4>Completed!!</h4>
                  <span>Invoice Created Successfully!!</span>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </form>
    );
  };

  totalSteps = () => {
    return this.state.steps?.length;
  };

  // Set previous activeStep state.
  handlePreviousSteps = () => {
    let { activeStep } = this.state;
    activeStep = activeStep - 1;
    this.setState({ activeStep });
  };

  completedSteps = () => {
    return Object.keys(this.state.completed).length;
  };

  handleStep = (step) => () => {
    this.setState({ activeStep: step });
  };

  allStepsCompleted = () => {
    return this.completedSteps() === this.totalSteps();
  };

  //  Render footer buttons
  renderFooterBtnsSection = () => {
    let { activeStep } = this.state;
    let userStatus = this.props.userCreation?.status;
    return (
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />

        {activeStep > 0 ? (
          <Button
            className="primary-outline-btn min-width-inherit"
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => {
              if (activeStep === 2) {
              } else {
                this.handlePreviousSteps();
              }
            }}
          >
            {activeStep === 2 ? "Home" : "Back"}
          </Button>
        ) : (
          <></>
        )}
        <LoadingButton
          disabled={userStatus === status.IN_PROGRESS}
          loading={userStatus === status.IN_PROGRESS}
          className="primary-btn min-width-inherit"
          variant="contained"
          onClick={(e) => (activeStep === 2 ? "" : this.setActiveStep(e))}
        >
          {activeStep === 2 ? "Create User" : "Continue"}
        </LoadingButton>
      </Box>
    );
  };
  render() {
    let { activeStep, completed } = this.state;
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3>
            <Link to={`/app/new-reports/over-view-dashboard`}>
              <IconButton className="m-r-2">
                <i class="fas fa-long-arrow-left"></i>
              </IconButton>
            </Link>
            Create Invoice
          </h3>
        </Box>
        <Box className="create-invoice-container m-t-3">
          <h4 className="m-t-0 m-b-0">Create Invoice</h4>
          <Box className="stepar-content">
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step
                  key={label}
                  completed={completed[index]}
                  className="stepar-head"
                >
                  <Box className="steper-label"> {label}</Box>
                  <StepButton
                    className="steper-button"
                    color="inherit"
                    onClick={this.handleStep(index)}
                  ></StepButton>
                </Step>
              ))}
            </Stepper>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "300px",
              }}
            >
              {this.allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={this.handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Box className="steper-body-content">
                    {this.renderActiveStep()}
                  </Box>
                </React.Fragment>
              )}
            </Box>
            <Box> {this.renderFooterBtnsSection()}</Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default CreateInvoice;
