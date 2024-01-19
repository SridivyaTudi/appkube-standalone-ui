import React, { Component } from "react";
import { Box, Button, List, ListItem, Grid, Card } from "@mui/material";
import AddIcon from "../../../assets/img/bimapping/add-icon.png";
import Aws from "../../../assets/img/aws.png";
import Microsoftazure from "../../../assets/img/microsoftazure.png";
import GoogleCloud from "../../../assets/img/google-cloud.png";
import Checkbox from "@mui/material/Checkbox";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { v4 } from "uuid";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
class CreateDepartment extends Component {
  ACCOUNTS_ICON = {
    MICROSOFT_AZURE: Microsoftazure,
    AWS: Aws,
    GOOGLE_CLOUD: GoogleCloud,
  };
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      step1FormData: {
        name: "",
        description: "",
      },
      step2FormData: {
        selectedLandingZone: "",
        selectedChildLandingZone: "",
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { step1FormData, step2FormData, activeTab } = this.state;

    if (activeTab === 0) {
      step1FormData[name] = value;
    } else if (activeTab === 1) {
      step2FormData[name] = value;
    }

    this.setState({ step1FormData, step2FormData });
  };

  renderStep1Form = () => {
    let { isSubmit,step1FormData } = this.state;
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
              style={{
                height: "120px",
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

  renderStep2Form = () => {
    const {
      step2FormData: { selectedLandingZone },
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
          {this.ACCOUNTS_ICON[selectedLandingZone] ? (
            <Box className="select-landing-section">
              <Box className="landing-head">
                <span>Select Landing zone</span>
                <span>
                  <Checkbox disabled className="check-box" />
                  Include associated LZ
                </span>
              </Box>
              <Box className="select-landing-cards m-t-3">
                <Grid
                  container
                  rowSpacing={1.5}
                  columnSpacing={{ xs: 1.5 }}
                  alignItems={"center"}
                >
                  {[...Array(13)].map((val, index) => {
                    return (
                      <Grid
                        item
                        xs={4}
                        onClick={() =>
                          this.setState({
                            step2FormData: {
                              ...this.state.step2FormData,
                              selectedChildLandingZone: true,
                            },
                          })
                        }
                        key={v4()}
                      >
                        <Card className="select-landing-card">
                          <Box className="card-content text-center">
                            <Box className="card-image">
                              <img
                                src={this.ACCOUNTS_ICON[selectedLandingZone]}
                                alt=""
                              />
                            </Box>
                            <Box className="card-title">Account no 123456</Box>
                          </Box>
                          <Box className="card-footer">
                            <Box className="footer-left-content">
                              <span className="d-block">Associated LOB</span>
                              <label className="d-block">002</label>
                            </Box>
                            <Box className="footer-right-content">
                              <span className="d-block">Assets</span>
                              <label className="d-block text-right">150</label>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  };

  renderForm = () => {
    let { activeTab } = this.state;
    return activeTab === 0 ? this.renderStep1Form() : this.renderStep2Form();
  };

  renderBtns = () => {
    let {
      activeTab,
      step2FormData: { selectedChildLandingZone },
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
          disabled={activeTab === 1 && !selectedChildLandingZone}
        >
          Next
        </Button>
      </Box>
    );
  };

  setActiveTab = (isNextStep = 0) => {
    let { activeTab } = this.state;
    let isRedirectPage =
      (activeTab === 1 && isNextStep) || (activeTab === 0 && !isNextStep);
    if (isRedirectPage) {
      this.redirectPage(`${APP_PREFIX_PATH}/bim`);
    }

    if (isNextStep) {
      activeTab++;
    } else {
      activeTab--;
    }

    this.setState({ activeTab });
  };

  onClickLandingZone(selectedAccount) {
    let { step2FormData } = this.state;
    step2FormData.selectedLandingZone = selectedAccount;
    this.setState({ step2FormData });
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
      } else {
        errors.description = "";
      }
    }
    return { isValid, errors };
  };

  validateSteps = () => {
    let { activeTab } = this.state;

    if (activeTab === 0) {
      return this.validateStep1();
    } else if (activeTab === 1) {
      return { isValid: true };
    }
  };

  render() {
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Create Department</h3>
        </Box>
        <Box className="create-department-container">
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
        </Box>
      </Box>
    );
  }
}

export default navigateRouter(CreateDepartment);
