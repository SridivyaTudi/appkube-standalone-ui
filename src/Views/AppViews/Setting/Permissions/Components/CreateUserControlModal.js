import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Box,
  Grid,
  List,
  ListItem,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material/";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import { ToastMessage } from "Toast/ToastMessage";
const steps = ["User details ", "Add  user to group ", "Review and Create"];
const initialFormData = {
  name: "",
  email: "",
  group: 0,
};
let groupData = [
  {
    name: "Super Admin",
    policiesname: "Multiple",
    id: 1,
  },
  {
    name: "Defaulta User",
    policiesname: "Single",
    id: 2,
  },
  {
    name: "Infra Team",
    policiesname: "Multiple",
    id: 3,
  },
  {
    name: "Design Architect",
    policiesname: "Multiple",
    id: 4,
  },
];
class CreateUserControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: {},
      selectedGroups: [],
      groups: groupData,
      formData: [Object.assign({}, initialFormData)],
      isSubmit: false,
    };
  }
  totalSteps = () => {
    return this.state.steps?.length;
  };

  completedSteps = () => {
    return Object.keys(this.state.completed).length;
  };

  allStepsCompleted = () => {
    return this.completedSteps() === this.totalSteps();
  };

  handleStep = (step) => () => {
    this.setState({ activeStep: step });
  };

  //  Render footer buttons
  renderFooterBtnsSection = () => {
    let { activeStep } = this.state;
    return (
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          className="info-btn min-width-inherit"
          sx={{ mr: 1 }}
          onClick={() => this.handleCancel()}
        >
          Cancel
        </Button>
        {activeStep > 0 ? (
          <Button
            className="info-btn min-width-inherit"
            sx={{ mr: 1 }}
            onClick={() => this.handlePreviousSteps()}
          >
            Previous
          </Button>
        ) : (
          <></>
        )}

        <Button
          className="primary-btn min-width-inherit"
          onClick={(e) =>
            activeStep === 2 ? this.handleCreateUser() : this.setActiveStep(e)
          }
          sx={{ mr: 1 }}
        >
          {activeStep === 2 ? "Create User" : "Next"}
        </Button>
      </Box>
    );
  };

  // Set next activeStep state.
  handleNextSteps = () => {
    let { activeStep } = this.state;
    activeStep = activeStep + 1;
    this.setState({ activeStep });
  };

  // Set previous activeStep state.
  handlePreviousSteps = () => {
    let { activeStep } = this.state;
    activeStep = activeStep - 1;
    this.setState({ activeStep });
  };

  // Close modal
  handleCancel = () => {
    this.props.handleCreateUserControlModal();
  };

  // Create user API call
  handleCreateUser = () => {
    this.handleCancel();
  };

  //  Render inputs
  renderInputs = (errors) => {
    let { formData } = this.state;
    return (
      formData.length &&
      formData.map((user, index) => {
        return (
          <Box className="d-flex align-items-center form-row " key={v4()}>
            <Box className="form-group">
              <Box className="d-inline-block">
                <input
                  id={`name_${index}`}
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Write Request Title"
                  value={user.name}
                  onChange={(e) => {
                    this.handleInputChange(e, index);
                  }}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? this.setActiveStep(e) : <></>
                  }
                  autoFocus={
                    document.activeElement.id === `name_${index}`
                      ? "autofocus"
                      : null
                  }
                />
              </Box>
            </Box>
            <Box className="form-group">
              <Box className="d-inline-block">
                <input
                  id={`email_${index}`}
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Write Request Title"
                  value={user.email}
                  onChange={(e) => this.handleInputChange(e, index)}
                  autoFocus={
                    document.activeElement.id === `email_${index}`
                      ? "autofocus"
                      : null
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" ? this.setActiveStep(e) : <></>
                  }
                />
                {errors?.includes(index) ? (
                  <span className="red">Please provide valid email</span>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
            {index !== 0 ? (
              <Box
                className="form-group"
                onClick={() => this.onClickRemoveRow(index)}
              >
                <IconButton
                  variant="outlined"
                  color="error"
                  aria-label="delete"
                  size="small"
                  className="close-icon"
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        );
      })
    );
  };

  //Click on Add Another Person button
  onClickAnotherPerson = () => {
    let { formData } = this.state;
    let isEmailValidate = true;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line

    if (formData?.length) {
      for (let index = 0; index < formData.length; index++) {
        const element = formData[index];
        if (!emailRegex.test(element.email)) {
          isEmailValidate = false;
        }
      }

      if (isEmailValidate) {
        formData.push(Object.assign({}, initialFormData));
      }
      this.setState({ formData, isSubmit: false });
    }
  };

  //Set state on  input changes
  handleInputChange = (e, index) => {
    e.preventDefault();
    let { formData } = this.state;
    const { name, value } = e.target;
    formData[index][name] = value;

    this.setState({ formData });
  };

  // Remove row
  onClickRemoveRow = (index) => {
    let { formData } = this.state;
    formData.splice(index, 1);
    this.setState({ formData });
  };

  // Set active step
  setActiveStep = (e) => {
    e.preventDefault();
    let { activeStep, isSubmit } = this.state;
    isSubmit = true;
    if (activeStep === 0) {
      let { isStepValid } = this.validateStep1(isSubmit);
      if (isStepValid) {
        activeStep = activeStep + 1;
      }
    } else if (activeStep === 1) {
      let isValid = this.validateStep2(isSubmit);
      if (isValid) {
        activeStep = activeStep + 1;
      } else {
        ToastMessage.error("Please select any group.");
        return;
      }
    }
    this.setState({ activeStep, isSubmit });
  };

  //  Validate step 1
  validateStep1 = (isSubmit) => {
    let { formData } = this.state;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
    let isStepValid = true;
    let errors = [];
    if (isSubmit) {
      formData = formData.map((user, index) => {
        if (!emailRegex.test(user.email)) {
          errors.push(index);
          isStepValid = false;
          return user;
        }

        return user;
      });
    }

    return { errors, isStepValid };
  };

  //  Validate step 2
  validateStep2 = (isSubmit) => {
    let { selectedGroups } = this.state;
    let isValid = selectedGroups.length ? true : false;
    return isValid;
  };

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedGroups } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedGroups.push(+id);
    } else {
      selectedGroups = selectedGroups.filter((value) => value !== +id);
    }

    this.setState({ selectedGroups });
  };

  //  Serach group
  handleSearchChange = (e) => {
    let value = e.target.value;

    let { groups, searchedGroup } = this.state;

    if (groupData?.length) {
      searchedGroup = value;

      if (value) {
        groups = groupData.filter((row) => {
          if (row?.name.toLowerCase().includes(value.toLowerCase())) {
            return row;
          } else {
            return null;
          }
        });
      } else {
        groups = groupData;
      }

      this.setState({ groups, searchedGroup });
    }
  };

  renderUserReview = () => {
    let { formData } = this.state;
    return formData && formData.length ? (
      formData.map((row, index) => {
        return (
          <React.Fragment key={v4()}>
            <Grid item xs={6}>
              <Box className="form-group">
                {index === 0 ? (
                  <label htmlFor="username" className="form-label">
                    Username (optional)
                  </label>
                ) : (
                  <></>
                )}

                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="James"
                  disabled
                  value={row.name}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="form-group">
                {index === 0 ? (
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                ) : (
                  <></>
                )}

                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="James@synectiks.com"
                  disabled
                  value={row.email}
                />
              </Box>
            </Grid>
          </React.Fragment>
        );
      })
    ) : (
      <></>
    );
  };
  render() {
    const {
      activeStep,
      completed,
      isSubmit,
      groups,
      selectedGroups,
      searchedGroup,
    } = this.state;
    let { errors } = this.validateStep1(isSubmit);

    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCancel}
        className="invite-user-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
            Create Users
            <IconButton
              onClick={this.handleCancel}
              variant="outlined"
              aria-label="delete"
              size="small"
              className="close-btn"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </h5>
        </ModalHeader>
        <ModalBody>
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
            <div>
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
                  <form onSubmit={this.setActiveStep}>
                    <Box sx={{ mt: 2 }}>
                      <Box className="users-content">
                        {/* step1 */}
                        {activeStep === 0 ? (
                          <Box className="d-block">
                            <Box className="title">
                              <label className="form-label">
                                Name (Optional)
                              </label>
                              <label className="form-label">
                                Email Address
                              </label>
                            </Box>
                            <Box className="d-block">
                              {" "}
                              {this.renderInputs(errors)}
                            </Box>

                            <Box
                              className="add-user"
                              onClick={this.onClickAnotherPerson}
                            >
                              <Button
                                className="compliance-btn min-width"
                                variant="contained"
                              >
                                Add Another person
                              </Button>
                            </Box>
                          </Box>
                        ) : activeStep === 1 ? (
                          <>
                            {/* step2 */}

                            <Box className="d-block">
                              <Box className="setting-common-searchbar p-t-0">
                                <h5>Add users to the group(324)</h5>
                                <Grid
                                  container
                                  className="h-100"
                                  alignItems={"center"}
                                >
                                  <Grid item xs={8}>
                                    <Box className="top-search">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search policy"
                                        value={searchedGroup}
                                        onChange={(e) =>
                                          this.handleSearchChange(e)
                                        }
                                      />
                                      <button className="button">
                                        <SearchOutlinedIcon />
                                      </button>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Box className="overview-buttons">
                                      <List>
                                        <ListItem>
                                          <Button
                                            className="primary-btn min-width-inherit"
                                            variant="contained"
                                          >
                                            <Link to={``}> Create Group</Link>
                                          </Button>
                                        </ListItem>
                                      </List>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                              <Box className="create-user-control-table">
                                <TableContainer
                                  component={Paper}
                                  className="table"
                                >
                                  <Table
                                    sx={{ minWidth: 500 }}
                                    aria-label="custom pagination table"
                                    className="table"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Group</TableCell>
                                        <TableCell>Attached Policies</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {groups.map((row, index) => (
                                        <TableRow key={index}>
                                          <TableCell>
                                            <Checkbox
                                              size="small"
                                              className="check-box"
                                              id={row.id}
                                              checked={selectedGroups.includes(
                                                row.id
                                              )}
                                              onChange={this.handleCheckBox}
                                            />
                                            {row.name}
                                          </TableCell>
                                          <TableCell>
                                            {row.policiesname}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Box>
                          </>
                        ) : (
                          <>
                            {/* step3 */}

                            <Box className="d-block">
                              <Box className="user-review">
                                <h4 className="m-t-0 m-b-0">Review</h4>
                                <Box className="d-block m-t-1">
                                  <Grid
                                    container
                                    alignItems={"center"}
                                    rowSpacing={1}
                                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                  >
                                    {this.renderUserReview()}
                                  </Grid>
                                </Box>
                              </Box>
                              <h4 className="m-t-0">Group</h4>
                              <Box className="create-user-control-table">
                                <TableContainer
                                  component={Paper}
                                  className=" table"
                                >
                                  <Table
                                    sx={{ minWidth: 500 }}
                                    aria-label="custom pagination table"
                                    className="table"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Group</TableCell>
                                        <TableCell>Attached Policies</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {groups.map((row, index) => (
                                        <TableRow key={index}>
                                          <TableCell>
                                            <Checkbox
                                              size="small"
                                              className="check-box"
                                            />
                                            {row.permissionName}
                                          </TableCell>
                                          <TableCell>
                                            {row.policiesname}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            </Box>
                          </>
                        )}
                      </Box>
                    </Box>
                  </form>
                  {this.renderFooterBtnsSection()}
                </React.Fragment>
              )}
            </div>
          </Box>
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateUserControlModal;
