import React, { Component } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Grid,
  Card,
  FormControlLabel,
} from "@mui/material";
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
import {
  createDepartment,
  getLandingzone,
  createDepartmentWithLandingZone,
} from "Redux/BIMapping/BIMappingThunk";
import { connect } from "react-redux";
import { getCurrentOrgId, getCurrentUser, ENVIRONMENTS } from "Utils";
import LoadingButton from "@mui/lab/LoadingButton";
import status from "Redux/Constants/CommonDS";
import { ToastMessage } from "Toast/ToastMessage";
import Loader from "Components/Loader";
import { API_ERROR_MESSAGE, LOGOS } from "CommonData";

class AddDepartment extends Component {
  steps = {
    STEP1: 0,
    STEP2: 1,
    STEP3: 2,
  };
  apiConstants = {
    ADMIN: "ADMIN",
    CMDB: "CMDB",
  };

  user = { cmdbOrgId: "" };
  constructor(props) {
    super(props);
    this.state = {
      activeStep: this.steps.STEP1,
      step1: {},
      step2: {},
      step2FormData: {
        selectedLandingZone: "",
        selectedChildLandingZone: "",
        isIncludeLandingZone: false,
      },
      step1FormData: {
        name: "",
        description: "",
      },
      isCreateWithoutLandingZone: false,
      landingZones: [],
    };
    let userDetails = getCurrentUser()?.info?.user?.organization;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.creationDepartment.status !==
        this.props.creationDepartment.status &&
      this.props.creationDepartment.status === status.SUCCESS
    ) {
      if (this.props.creationDepartment?.data) {
        ToastMessage.success("Department Created Successfully.");
        this.redirectPage(`${APP_PREFIX_PATH}/bim`);
      } else {
        ToastMessage.error("Department Creation  Failed.");
      }
    }

    if (
      prevProps.creationDepartmentWithLandingZone.status !==
        this.props.creationDepartmentWithLandingZone.status &&
      this.props.creationDepartmentWithLandingZone.status === status.SUCCESS
    ) {
      if (this.props.creationDepartmentWithLandingZone?.data) {
        ToastMessage.success("Department Created Successfully.");
        this.redirectPage(`${APP_PREFIX_PATH}/bim`);
      } else {
        ToastMessage.error("Department Creation  Failed.");
      }
    }

    if (
      prevProps.landingZones.status !== this.props.landingZones.status &&
      this.props.landingZones.status === status.SUCCESS &&
      this.props.landingZones?.data
    ) {
      let landingZones = this.props.landingZones?.data || [];
      let { isIncludeLandingZone } = this.state;
      landingZones = landingZones.filter((landingZone) =>
        isIncludeLandingZone
          ? landingZone.departmentId !== null &&
            landingZone.departmentName !== null
          : landingZone.departmentId === null &&
            landingZone.departmentName === null
      );
      this.setState({ landingZones });
    }
  }

  // Render Step of the form
  renderForm = () => {
    let { activeStep } = this.state;
    return activeStep === 0 ? this.renderStep1Form() : this.renderStep2Form();
  };

  // Render form of the input changes
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

  // Render step-1 of the form
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

  // Render buttons
  renderBtns = () => {
    let { activeStep, isCreateWithoutLandingZone } = this.state;
    let { creationDepartmentWithLandingZone, creationDepartment } = this.props;
    let departmentStatus = [
      creationDepartment?.status,
      creationDepartmentWithLandingZone?.status,
    ].includes(status.IN_PROGRESS);
    return (
      <Box>
        {activeStep !== 0 ? (
          <Box className="landing-zone-check-box d-block m-t-1 p-l-5">
            <FormControlLabel
              label="Create without landing-zone"
              control={
                <Checkbox
                  className="check-box"
                  size="small"
                  checked={isCreateWithoutLandingZone}
                  onClick={this.onClickCheckBox}
                />
              }
            />
          </Box>
        ) : (
          <></>
        )}

        <Box className="d-flex align-items-center wizard-step-button m-t-2">
          <Button
            className="primary-outline-btn m-r-2"
            variant="outlined"
            onClick={() => this.setActiveTab()}
            disabled={departmentStatus}
          >
            Previous
          </Button>

          <LoadingButton
            className="primary-btn"
            variant="contained"
            onClick={this.onClickNextBtn}
            disabled={departmentStatus}
            loading={departmentStatus}
          >
            Next
          </LoadingButton>
        </Box>
      </Box>
    );
  };

  // set activeTab
  setActiveTab = (isNextStep = 0) => {
    let { activeStep, isCreateWithoutLandingZone } = this.state;

    if (activeStep === 0 && !isNextStep) {
      this.redirectPage(`${APP_PREFIX_PATH}/bim`);
    } else if ([1, 2].includes(activeStep) && isNextStep) {
      let { isValid } = this.validateSteps();
      if (isValid) {
        let { name: departmentName, description: departmentDescription } =
          this.state.step1FormData;
        let { step2FormData, landingZones } = this.state;
        if (isCreateWithoutLandingZone) {
          let params = {
            name: departmentName,
            organizationId: +this.user.cmdbOrgId,
            description: departmentDescription,
          };
          this.props.createDepartment(params);
        } else {
          let landingZone = landingZones.find(
            (landing) => landing.id === step2FormData.selectedChildLandingZone
          );
          let params = {
            departmentName,
            departmentDescription,
            orgId: +this.user.cmdbOrgId,
            landingZoneId: [+landingZone?.id],
            cloud: landingZone?.cloud,
          };

          this.props.createDepartmentWithLandingZone(params);
        }
      }
    }

    if (isNextStep) {
      activeStep = 1;
    } else {
      activeStep = 0;
    }

    this.setState({ activeStep, isSubmit: false });
  };

  // Click on the landing zone
  onClickLandingZone(selectedAccount) {
    let { step2FormData, activeStep, isCreateWithoutLandingZone } = this.state;
    let isSameSelectLandingZone =
      step2FormData.selectedLandingZone === selectedAccount;

    if (isSameSelectLandingZone) {
      step2FormData.selectedLandingZone = "";
    } else {
      step2FormData.selectedLandingZone = selectedAccount;
      activeStep = 2;
      this.props.getLandingzone({
        orgId: getCurrentOrgId(),
        cloud: selectedAccount,
      });
    }

    step2FormData.selectedChildLandingZone = "";
    isCreateWithoutLandingZone = false;

    this.setState({
      step2FormData,
      activeStep,
      isCreateWithoutLandingZone,
    });
  }
  // Redirect the page
  redirectPage = (redirectUrl) => {
    this.props.navigate(redirectUrl);
  };

  // validate step-1 of form
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

  // validate all steps
  validateSteps = () => {
    let { activeStep } = this.state;

    if (activeStep === 0) {
      return this.validateStep1();
    } else if ([1, 2].includes(activeStep)) {
      return this.validateStep2();
    }
  };
  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  };
  // Render step-2 of form
  renderStep2Form = () => {
    const {
      step2FormData: { selectedLandingZone, selectedChildLandingZone },
      isCreateWithoutLandingZone,
      isSubmit,
      landingZones,
      isIncludeLandingZone,
    } = this.state;
    let landingZoneLoder =
      this.props.landingZones.status === status.IN_PROGRESS;
    let { errors } = this.validateSteps();
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
                className={`${
                  selectedLandingZone === ENVIRONMENTS.AWS ? "active" : ""
                }`}
              >
                <Button
                  disabled={isCreateWithoutLandingZone}
                  className={` ${
                    isCreateWithoutLandingZone ? "" : "secondary-btn"
                  } min-width `}
                  variant="contained"
                  onClick={() => this.onClickLandingZone(ENVIRONMENTS.AWS)}
                >
                  <Box className="image-box">
                    <img src={Aws} alt="" />
                  </Box>
                  AWS
                </Button>
              </ListItem>
              <ListItem
                className={`${
                  selectedLandingZone === ENVIRONMENTS.AZURE ? "active" : ""
                }`}
              >
                <Button
                  disabled={isCreateWithoutLandingZone}
                  className={` ${
                    isCreateWithoutLandingZone ? "" : "secondary-btn"
                  } min-width `}
                  variant="contained"
                  onClick={() => this.onClickLandingZone(ENVIRONMENTS.AZURE)}
                >
                  <Box className="image-box">
                    <img src={Microsoftazure} alt="" />
                  </Box>
                  Microsoft azure
                </Button>
              </ListItem>
              <ListItem
                className={`${
                  selectedLandingZone === ENVIRONMENTS.GCP ? "active" : ""
                }`}
              >
                <Button
                  disabled={isCreateWithoutLandingZone}
                  className={` ${
                    isCreateWithoutLandingZone ? "" : "secondary-btn"
                  } min-width `}
                  variant="contained"
                  onClick={() => this.onClickLandingZone(ENVIRONMENTS.GCP)}
                >
                  <Box className="image-box">
                    <img src={GoogleCloud} alt="" />
                  </Box>
                  GCP
                </Button>
              </ListItem>
            </List>
          </Box>
          {isSubmit && errors?.associateLandingZone ? (
            <span className="red">{errors.associateLandingZone}</span>
          ) : (
            ""
          )}
          {selectedLandingZone && !isCreateWithoutLandingZone ? (
            <Box className="select-landing-section">
              <Box className="landing-head">
                <span>Select Landing zone</span>
                <span>
                  <FormControlLabel
                    label="Include associated LZ"
                    control={
                      <Checkbox
                        className="check-box"
                        size="small"
                        checked={isIncludeLandingZone}
                        onClick={(e) => this.onClickCheckBox(e, 1)}
                      />
                    }
                  />
                </span>
              </Box>
              <Box className="select-card-section">
                <Box className="select-landing-cards m-t-2">
                  {landingZoneLoder ? (
                    this.renderLoder()
                  ) : (
                    <>
                      <Grid
                        container
                        rowSpacing={1.5}
                        columnSpacing={{ xs: 1.5 }}
                        alignItems={"center"}
                        className="p-b-10"
                      >
                        {landingZones?.length ? (
                          landingZones.map((val, index) => {
                            return (
                              <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                xs={12}
                                onClick={() =>
                                  this.setState({
                                    step2FormData: {
                                      ...this.state.step2FormData,
                                      selectedChildLandingZone:
                                        selectedChildLandingZone === val.id
                                          ? ""
                                          : val.id,
                                    },
                                  })
                                }
                                key={v4()}
                              >
                                <Card
                                  className={`select-landing-card ${
                                    selectedChildLandingZone === val.id
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img
                                        src={LOGOS[selectedLandingZone]}
                                        alt=""
                                      />
                                    </Box>
                                    <Box className="card-title">
                                      Landing-Zone : {val.landingZone}
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        {val.departmentName}
                                      </span>
                                    </Box>
                                    <Box className="footer-right-content">
                                      <span className="d-block text-right">
                                        Assets
                                      </span>
                                      <label className="d-block text-right">
                                        {val.totalAssets}
                                      </label>
                                    </Box>
                                  </Box>
                                </Card>
                              </Grid>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </Grid>
                      {landingZones.length ? (
                        <></>
                      ) : (
                        <Box className="environment-loader text-center  align-item-center justify-center p-t-20 p-b-20 ">
                          <h5 className="m-t-0 m-b-0">
                           {this.props.landingZones.status === status.FAILURE ? API_ERROR_MESSAGE :'There are no data available.'} 
                          </h5>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Box>
              {isSubmit && errors?.landingZone ? (
                <span className="red">{errors.landingZone}</span>
              ) : (
                ""
              )}
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  };

  onClickCheckBox = (e, isIncludeLandingZoneAction = 0) => {
    let { checked } = e.target;
    let {
      isCreateWithoutLandingZone,
      step2FormData,
      isIncludeLandingZone,
      landingZones,
    } = this.state;
    if (checked) {
      if (isIncludeLandingZoneAction) {
        let landingZonesData = this.props.landingZones?.data || [];
        landingZones = landingZonesData.filter(
          (landingZone) =>
            landingZone.departmentId !== null &&
            landingZone.departmentName !== null
        );
        isIncludeLandingZone = true;
      } else {
        isCreateWithoutLandingZone = true;
        step2FormData.selectedLandingZone = "";
        step2FormData.selectedChildLandingZone = "";
        isIncludeLandingZone = false;
      }
    } else {
      if (isIncludeLandingZoneAction) {
        let landingZonesData = this.props.landingZones?.data || [];
        landingZones = landingZonesData.filter(
          (landingZone) =>
            landingZone.departmentId === null &&
            landingZone.departmentName === null
        );
        isIncludeLandingZone = false;
      } else {
        isCreateWithoutLandingZone = false;
      }
    }

    this.setState({
      isCreateWithoutLandingZone,
      step2FormData,
      isIncludeLandingZone,
      landingZones,
    });
  };

  onClickNextBtn = () => {
    this.setState({ isSubmit: true }, () => {
      let { isValid } = this.validateSteps();
      if (isValid) {
        this.setActiveTab(1);
      }
    });
  };

  validateStep2 = () => {
    let { step2FormData, isSubmit, isCreateWithoutLandingZone } = this.state;
    let isValid = true;
    let errors = {
      associateLandingZone: "",
      landingZone: "",
    };

    if (isSubmit && !isCreateWithoutLandingZone) {
      if (!step2FormData.selectedLandingZone) {
        errors.associateLandingZone =
          "Please select the associate landing-zone.";
        isValid = false;
      } else {
        errors.associateLandingZone = "";
      }

      if (!step2FormData.selectedChildLandingZone) {
        errors.landingZone = "Please select the  landing-zone.";
        isValid = false;
      } else {
        errors.landingZone = "";
      }
    }
    return { isValid, errors };
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
function mapStateToProps(state) {
  const {
    creationDepartment,
    creationDepartmentWithLandingZone,
    landingZones,
  } = state.biMapping;
  return {
    creationDepartment,
    landingZones,
    creationDepartmentWithLandingZone,
  };
}

const mapDispatchToProps = {
  createDepartment,
  getLandingzone,
  createDepartmentWithLandingZone,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AddDepartment));
