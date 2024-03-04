import React, { Component } from "react";
import { Box, Button, List, ListItem, Grid, Card } from "@mui/material";
import DepartmentBanner from "assets/img/bimapping/department-banner.png";
import DepartmentBanner1 from "assets/img/bimapping/department-banner1.png";
import AddIcon from "../../../assets/img/bimapping/add-icon.png";
import Aws from "../../../assets/img/aws.png";
import Microsoftazure from "../../../assets/img/microsoftazure.png";
import GoogleCloud from "../../../assets/img/google-cloud.png";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import Checkbox from "@mui/material/Checkbox";
import { v4 } from "uuid";
import { navigateRouter } from "Utils/Navigate/navigateRouter";

class AddDepartment extends Component {
  ACCOUNTS_ICON = {
    MICROSOFT_AZURE: Microsoftazure,
    AWS: Aws,
    GOOGLE_CLOUD: GoogleCloud,
  };
  steps = {
    STEP1: 0,
    STEP2: 1,
    STEP3: 2,
  };
  apiConstants = {
    ADMIN: "ADMIN",
    CMDB: "CMDB",
  };

  constructor(props) {
    super(props);
    this.state = {
      activeStep: this.steps.STEP1,
      step1: {},
      step2: {},
      step2FormData: {
        selectedLandingZone: "",
        selectedChildLandingZone: "",
      },
      step1FormData: {
        name: "",
        description: "",
      },
    };
  }

  renderForm = () => {
    let { activeStep } = this.state;
    return activeStep === 0 ? this.renderStep1Form() : this.renderStep2Form();
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { step1FormData, step2FormData, activeStep } = this.state;

    if (activeStep === 0) {
      step1FormData[name] = value;
    } else if (activeStep === 1) {
      step2FormData[name] = value;
    }

    this.setState({ step1FormData, step2FormData });
  };
  renderStep1Form = () => {
    let { isSubmit, step1FormData } = this.state;
    let { errors } = this.validateSteps();
    return (
      <Box className="basic-information-section">
        <Box className="basic-information">
          <Box className="d-flex align-items-center">
            <Box className="check-box">
              <i className="fa-solid fa-check"></i>
            </Box>
            <Box className="information-text">
              <label className="d-block">Basic Information</label>
              <span className="d-block">
                Choose a department name and product assign environment
              </span>
            </Box>
          </Box>
          <Box className="arrow-icon">
            <i className="fa-solid fa-caret-down "></i>
          </Box>
        </Box>
        <Box className="information-form">
          <Box className="form-group ">
            <label htmlFor="roleName" className="form-label">
              Department Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="HR"
              value={step1FormData.name}
              onChange={this.handleInputChange}
            />
            {isSubmit && errors?.name ? (
              <span className="red">{errors.name}</span>
            ) : (
              ""
            )}
          </Box>
          <Box className="form-group m-t-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control "
              id="description"
              name="description"
              maxLength={255}
              style={{
                height: "100px",
                lineHeight: "18px",
                paddingRight: "15px",
              }}
              placeholder="Enter Description"
              value={step1FormData.description}
              onChange={this.handleInputChange}
            />
            {isSubmit && errors?.description ? (
              <span className="red">{errors.description}</span>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  renderBtns = () => {
    let {
      activeStep,
      step2FormData: { selectedChildLandingZone, selectedLandingZone },
    } = this.state;

    return (
      <Box
        justifyContent={"center"}
        className="d-flex align-items-center wizard-step-button m-t-4"
      >
        <Button
          className="primary-outline-btn m-r-2"
          variant="outlined"
          onClick={() => this.setActiveTab()}
        >
          Previous
        </Button>
        <Button
          className="primary-btn"
          variant="contained"
          onClick={() => {
            this.setState({ isSubmit: true }, () => {
              let { isValid } = this.validateSteps();
              if (isValid) {
                this.setActiveTab(1);
              }
            });
          }}
          disabled={
            activeStep === 1 &&
            !selectedChildLandingZone &&
            !selectedLandingZone
          }
        >
          Next
        </Button>
      </Box>
    );
  };

  setActiveTab = (isNextStep = 0) => {
    let { activeStep } = this.state;
    let isRedirectPage =
      (activeStep === 2 && isNextStep) || (activeStep === 0 && !isNextStep);
    if (isRedirectPage) {
      this.redirectPage(`${APP_PREFIX_PATH}/bim`);
    }

    if (isNextStep) {
      activeStep++;
    } else {
      activeStep--;
    }

    this.setState({ activeStep });
  };

  onClickLandingZone(selectedAccount) {
    let { step2FormData } = this.state;
    step2FormData.selectedLandingZone = selectedAccount;
    this.setState({ step2FormData, activeStep: 2 });
  }

  redirectPage = (redirectUrl) => {
    this.props.navigate(redirectUrl);
  };

  validateStep1 = () => {
    let { step1FormData, isSubmit } = this.state;
    let isValid = true;
    let errors = {
      name: "",
      description: "",
    };

    if (isSubmit) {
      if (!step1FormData.name) {
        errors.name = "Please enter the department name.";
        isValid = false;
      } else {
        errors.name = "";
      }

      if (!step1FormData.description) {
        errors.description = "Please enter the description.";
        isValid = false;
      } else if (step1FormData.description.length > 255) {
        errors.description =
          "Description should be a maximum of 255 characters.";
        isValid = false;
      } else {
        errors.description = "";
      }
    }
    return { isValid, errors };
  };

  validateSteps = () => {
    let { activeStep, step2FormData } = this.state;

    if (activeStep === 0) {
      return this.validateStep1();
    } else if (
      (activeStep === 1 && step2FormData.selectedLandingZone) ||
      activeStep === 2
    ) {
      return { isValid: true };
    }
  };

  renderStep2Form = () => {
    const {
      step2FormData: { selectedLandingZone, selectedChildLandingZone },
      activeStep,
    } = this.state;
    return (
      <Box className="basic-information-section">
        <Box className="basic-information">
          <Box className="d-flex align-items-center">
            <Box className="check-box">
              <i className="fa-solid fa-check"></i>
            </Box>
            <Box className="information-text">
              <label className="d-block">Landing zone</label>
              <span className="d-block">
                Choose a associate landing zone and select landing zone
              </span>
            </Box>
          </Box>
          <Box className="arrow-icon">
            <i className="fa-solid fa-caret-down "></i>
          </Box>
        </Box>
        <Box className="information-form">
          <Box className="associate-title">Associate landing zone</Box>
          <Box className="associate-boxs">
            <List>
              <ListItem
                className={`${selectedLandingZone === "AWS" ? "active" : ""}`}
              >
                <Button
                  className="secondary-btn min-width"
                  variant="contained"
                  onClick={() => this.onClickLandingZone("AWS")}
                >
                  <Box className="image-box">
                    <img src={Aws} alt="" />
                  </Box>
                  AWS
                </Button>
              </ListItem>
              <ListItem
                className={`${
                  selectedLandingZone === "MICROSOFT_AZURE" ? "active" : ""
                }`}
              >
                <Button
                  className="secondary-btn min-width"
                  variant="contained"
                  onClick={() => this.onClickLandingZone("MICROSOFT_AZURE")}
                >
                  <Box className="image-box">
                    <img src={Microsoftazure} alt="" />
                  </Box>
                  Microsoft azure
                </Button>
              </ListItem>
              <ListItem
                className={`${
                  selectedLandingZone === "GOOGLE_CLOUD" ? "active" : ""
                }`}
              >
                <Button
                  className="secondary-btn min-width"
                  variant="contained"
                  onClick={() => this.onClickLandingZone("GOOGLE_CLOUD")}
                >
                  <Box className="image-box">
                    <img src={GoogleCloud} alt="" />
                  </Box>
                  GCP
                </Button>
              </ListItem>
            </List>
          </Box>
          {activeStep === 2 ? (
            <Box className="select-landing-section">
              <Box className="landing-head">
                <span>Select Landing zone</span>
                <span>
                  <Checkbox disabled className="check-box" size="small" />
                  Include associated LZ
                </span>
              </Box>
              <Box className="select-card-section">
                <Box className="select-landing-cards m-t-2">
                  <Grid
                    container
                    rowSpacing={1.5}
                    columnSpacing={{ xs: 1.5 }}
                    alignItems={"center"}
                    className="p-b-10"
                  >
                    {[...Array(13)].map((val, index) => {
                      return (
                        <Grid
                          item
                          xl={6}
                          lg={6}
                          md={12}
                          xs={12}
                          onClick={() =>
                            this.setState({
                              step2FormData: {
                                ...this.state.step2FormData,
                                selectedChildLandingZone: index,
                              },
                            })
                          }
                          key={v4()}
                        >
                          <Card
                            className={`select-landing-card ${
                              selectedChildLandingZone === index ? "active" : ""
                            }`}
                          >
                            <Box className="card-content text-center">
                              <Box className="card-image">
                                <img
                                  src={this.ACCOUNTS_ICON[selectedLandingZone]}
                                  alt=""
                                />
                              </Box>
                              <Box className="card-title">
                                Account no 123456
                              </Box>
                            </Box>
                            <Box className="card-footer">
                              <Box className="footer-left-content">
                                <span className="d-block">Associated LOB</span>
                                <label className="d-block">002</label>
                              </Box>
                              <Box className="footer-right-content">
                                <span className="d-block">Assets</span>
                                <label className="d-block text-right">
                                  150
                                </label>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  };

  render() {
    const { activeStep } = this.state;
    const { STEP1, STEP2, STEP3 } = this.steps;
    return (
      <Box className="department-container">
        <Box className="department-step">
          <Box className="department-left">
            <Box className="department-left-content">
              <span className="d-flex width-100">
                {activeStep === STEP1 ? "Department" : "Landing Zone"} Appkube
              </span>
              <h2 className="d-flex width-100 m-t-0 m-b-0">
                Create department to map your business
              </h2>
              <Box className="d-flex width-100 banner-image">
                <img
                  src={
                    (activeStep === STEP1 && DepartmentBanner) ||
                    (activeStep === STEP2 && DepartmentBanner1) ||
                    (activeStep === STEP3 && DepartmentBanner1)
                  }
                  alt="DepartmentBanner"
                  style={{
                    maxHeight: `${activeStep === this.steps.STEP3 && "450px"}`,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box className="department-right">
            <Box className="department-right-content">
              <List className="steps-container">
                <ListItem
                  className={
                    [STEP1, STEP2, STEP3].includes(activeStep) ? "active" : ""
                  }
                >
                  <span>step 1</span>
                </ListItem>
                <ListItem
                  className={
                    [STEP2, STEP3].includes(activeStep) ? "active" : ""
                  }
                >
                  <span>step 2</span>
                </ListItem>
                <ListItem
                  className={[STEP3].includes(activeStep) ? "active" : ""}
                >
                  <span>step 3</span>
                </ListItem>
              </List>

              {/* <form onSubmit={this.setActiveStep}> */}
              <Box className="create-department-content">
                <Box className="create-department-inner-content">
                  <Box className="add-department d-flex align-items-center">
                    <Box className="icon-box m-r-2">
                      <img src={AddIcon} alt="" />
                    </Box>
                    <Box className="department-text d-inline-block">
                      <label className="d-block">Create Department</label>
                      <span className="d-block">
                        A new department will be created
                      </span>
                    </Box>
                  </Box>
                  {this.renderForm()}
                </Box>
                {this.renderBtns()}
              </Box>
              {/* </form> */}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default navigateRouter(AddDepartment);
