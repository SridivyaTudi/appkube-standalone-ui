import React, { Component } from "react";
import {
  Box,
  IconButton,
  Button,
  List,
  ListItem,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import status from "Redux/Constants/CommonDS";
import SuccessfullyIcon from "assets/img/assetmanager/successfully-icon.png";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
const steps = ["Add OU ", "Add Project & Services ", "Payment and Date"];
const departments = ["It", "Hr", "Prodution", "Finance"];
const services = [
  { id: 1, name: "Business" },
  { id: 2, name: "Common" },
];
let products = ["PROCUMENT", "INVENTORY"];
class CreateInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: {},
      selectedGroups: [],
      groups: [],
      isAddNewEnvironmentShown: false,
      formData: {
        organizationName: "",
        department: "",
        services: [],
        product: "",
        invoiceIssueDate: "",
        invoiceExpirationDate: "",
      },
      isSubmit: false,
    };
  }

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
    e.preventDefault();

    this.setState({ isSubmit: true }, () => {
      let { isValid } = this.validateSteps();
      if (isValid) {
        let { activeStep } = this.state;
        if (activeStep !== 3) {
          activeStep = activeStep + 1;
        }

        this.setState({ activeStep, isSubmit: false });
      }
    });
  };

  validateSteps = () => {
    let { activeStep, isSubmit } = this.state;
    if (isSubmit) {
      if (activeStep === 0) {
        let { isValid, errors } = this.validateStep1();
        return { isValid, errors };
      } else if (activeStep === 1) {
        let { isValid, errors } = this.validateStep2();
        return { isValid, errors };
      } else if (activeStep === 2) {
        let { isValid, errors } = this.validateStep3();
        return { isValid, errors };
      } else if (activeStep === 3) {
        return { isValid: true, errors: {} };
      }
    } else {
      return { isValid: false, errors: {} };
    }
  };

  validateStep1 = () => {
    let { formData } = this.state;
    let isValid = true;
    let errors = {
      organizationName: "",
      department: "",
    };

    if (!formData.organizationName) {
      errors.organizationName = "Please enter the Organization name.";
      isValid = false;
    } else {
      errors.organizationName = "";
    }

    if (!formData.department) {
      errors.department = "Please select the department name.";
      isValid = false;
    } else {
      errors.department = "";
    }

    return { isValid, errors };
  };

  validateStep2 = () => {
    let { formData } = this.state;
    let isValid = true;
    let errors = {
      services: "",
      product: "",
    };

    if (!formData.services?.length) {
      errors.services = "Please select the service.";
      isValid = false;
    } else {
      errors.services = "";
    }

    if (!formData.product) {
      errors.product = "Please select the product.";
      isValid = false;
    } else {
      errors.product = "";
    }

    return { isValid, errors };
  };

  validateStep3 = () => {
    let { formData } = this.state;
    let isValid = true;
    let errors = {
      invoiceIssueDate: "",
      invoiceExpirationDate: "",
    };

    if (!formData.invoiceIssueDate) {
      errors.invoiceIssueDate = "Please select the date.";
      isValid = false;
    } else {
      errors.invoiceIssueDate = "";
    }

    if (!formData.invoiceExpirationDate) {
      errors.invoiceExpirationDate = "Please select the date.";
      isValid = false;
    } else {
      errors.invoiceExpirationDate = "";
    }

    return { isValid, errors };
  };
  handleMultiSelectboxChange = (event) => {
    const {
      target: { value },
    } = event;
    let { formData } = this.state;
    formData["services"] = value;
    this.setState({ formData });
  };
  // Render active step
  renderActiveStep = () => {
    let { activeStep, isAddNewEnvironmentShown, formData, isSubmit } =
      this.state;
    let { errors } = this.validateSteps();
    return (
      <form onSubmit={this.setActiveStep}>
        <Box className="users-content" sx={{ mt: 2 }}>
          {activeStep === 0 ? (
            <>
              <Box className="form-group">
                <label className="form-label" htmlFor="organizationName">
                  Organization Name
                </label>
                <Box className="d-block">
                  <input
                    id={`organizationName`}
                    type="text"
                    className="form-control"
                    name="organizationName"
                    placeholder="Organization Name"
                    value={formData.organizationName}
                    onChange={this.handleInputChange}
                    onKeyPress={(e) =>
                      e.key === "Enter" ? this.setActiveStep(e) : ""
                    }
                  />{" "}
                </Box>
                {isSubmit && errors.organizationName ? (
                  <span className="red">{errors.organizationName}</span>
                ) : (
                  <></>
                )}
              </Box>
              <Box className="form-group">
                <label className="form-label" htmlFor="departmentName">
                  Select Department
                </label>
                <Box className="environment-fliter">
                  <Select
                    id="departmentName"
                    className="fliter-toggel new-environment"
                    name="department"
                    value={formData.department}
                    onChange={this.handleInputChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">Select Department</MenuItem>
                    {departments.map((val) => (
                      <MenuItem value={val}>{val}</MenuItem>
                    ))}
                  </Select>
                </Box>
                {isSubmit && errors.department ? (
                  <span className="red">{errors.department}</span>
                ) : (
                  <></>
                )}
              </Box>
            </>
          ) : activeStep === 1 ? (
            <>
              <Box className="form-group">
                <label className="form-label ">Select Services</label>
                <Box className="environment-fliter">
                  <Select
                    labelId="demo-multiple-name-label"
                    className="fliter-toggel new-environment"
                    multiple
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return "Select services";
                      }
                      let labels = [];
                      services.forEach((service) => {
                        if (selected.includes(+service.id)) {
                          labels.push(service.name);
                        }
                      });
                      return labels.join(", ");
                    }}
                    value={formData.services}
                    onChange={this.handleMultiSelectboxChange}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {services.map((val) => (
                      <MenuItem value={val.id}>{val.name}</MenuItem>
                    ))}
                  </Select>
                </Box>
                {isSubmit && errors.services ? (
                  <span className="red">{errors.services}</span>
                ) : (
                  <></>
                )}
              </Box>
              <Box className="form-group">
                <label className="form-label ">Select Product</label>
                <Box className="environment-fliter">
                  <Select
                    className="fliter-toggel new-environment"
                    name="product"
                    value={formData.product}
                    onChange={this.handleInputChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">Select Product</MenuItem>
                    {products.map((val) => (
                      <MenuItem value={val}>{val}</MenuItem>
                    ))}
                  </Select>
                </Box>
                {isSubmit && errors.product ? (
                  <span className="red">{errors.product}</span>
                ) : (
                  <></>
                )}
              </Box>
            </>
          ) : activeStep === 2 ? (
            <>
              <Box className="form-group">
                <label className="form-label ">Invoice Issuing date</label>
                <Box className="d-block">
                  <input
                    type="date"
                    className="form-control"
                    name="invoiceIssueDate"
                    placeholder="Select date"
                    value={formData.invoiceIssueDate}
                    onChange={this.handleInputChange}
                  />
                </Box>
                {isSubmit && errors.invoiceIssueDate ? (
                  <span className="red">{errors.invoiceIssueDate}</span>
                ) : (
                  <></>
                )}
              </Box>
              <Box className="form-group">
                <label className="form-label ">Invoice Expiration Date</label>
                <Box className="d-block">
                  <input
                    type="date"
                    className="form-control"
                    name="invoiceExpirationDate"
                    placeholder="Select date"
                    value={formData.invoiceExpirationDate}
                    onChange={this.handleInputChange}
                  />
                </Box>
                {isSubmit && errors.invoiceExpirationDate ? (
                  <span className="red">{errors.invoiceExpirationDate}</span>
                ) : (
                  <></>
                )}
              </Box>{" "}
            </>
          ) : activeStep === 3 ? (
            <Box className="completed-steper m-t-5">
              <Box className="completed-imge">
                <img src={SuccessfullyIcon} alt="Carrier" />
              </Box>
              <Box className="completed-content m-t-3">
                <h4>Completed!!</h4>
                <span>Invoice Created Successfully!!</span>
              </Box>
            </Box>
          ) : (
            <></>
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
              if ([3].includes(activeStep)) {
                this.props.navigate("/app/new-reports/chargeback-dashboard");
              } else {
                this.handlePreviousSteps();
              }
            }}
          >
            {activeStep === 3 ? "Home" : "Back"}
          </Button>
        ) : (
          <></>
        )}
        <LoadingButton
          disabled={userStatus === status.IN_PROGRESS}
          loading={userStatus === status.IN_PROGRESS}
          className="primary-btn min-width-inherit"
          variant="contained"
          onClick={this.setActiveStep}
        >
          Continue
        </LoadingButton>
      </Box>
    );
  };

  //Set state on  input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    let { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };
  render() {
    let { activeStep, completed } = this.state;
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3>
            <Link to={`/app/new-reports/chargeback-dashboard`}>
              <IconButton className="m-r-2">
                <i class="fas fa-long-arrow-left"></i>
              </IconButton>
            </Link>
            Create Invoice
          </h3>
          <Box className="d-flex align-items-center">
            <Button className="danger-btn min-width-inherit m-r-3 p-l-15 p-r-15">
              Delete <i className="fas fa-trash-alt p-l-5"></i>
            </Button>
            <Button className="pending-btn min-width-inherit m-r-3 p-l-15 p-r-15">
              Edit <i className="far fa-edit p-l-5"></i>
            </Button>
            <Link
              to={`/app/new-reports/chargeback-dashboard/history-departments`}
            >
              <Button className="success-btn min-width-inherit  p-l-15 p-r-15">
                Send <i className="fas fa-paper-plane p-l-5"></i>
              </Button>
            </Link>
          </Box>
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
                  <Box className="steper-label">
                    {completed[index] ? "Completed" : label}
                  </Box>
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
export default navigateRouter(CreateInvoice);
