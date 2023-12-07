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
} from "@mui/material/";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
const steps = ["User details ", "Add  user to group ", "Review and Create"];
const initialFormData = {
  names: "",
  email: "",
  group: 0,
};
class CreateUserControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: {},
      rows: [
        {
          permissionName: "Super Admin",
          policiesname: "Multiple",
        },
        {
          permissionName: "Defaulta User",
          policiesname: "Single",
        },
        {
          permissionName: "Infra Team",
          policiesname: "Multiple",
        },
        {
          permissionName: "Design Architect",
          policiesname: "Multiple",
        },
      ],
      formData: [initialFormData],
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
          onClick={() =>
            activeStep === 2 ? this.handleCreateUser() : this.handleNextSteps()
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
  renderInputs = () => {
    let { formData } = this.state;
    return (
      formData.length &&
      formData.map((user, index) => {
        return (
          <Grid
            container
            alignItems={"center"}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            key={v4()}
          >
            <Grid item xs={6}>
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
                    autoFocus={
                      document.activeElement.id === `name_${index}`
                        ? "autofocus"
                        : null
                    }
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
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
                  />
                </Box>
              </Box>
            </Grid>

            <Box className="status-btn">
              <IconButton
                aria-label="delete"
                size="small"
                className="close-icon"
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Grid>
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
      this.setState({ formData });
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
  render() {
    const { activeStep, completed, rows } = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCancel}
        className="invite-user-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
            Create Users
            <button onClick={this.handleCancel}>
              <i className="fa-solid fa-xmark"></i>
            </button>
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
                  <form>
                    <Box sx={{ mt: 2, mb: 1, py: 1 }}>
                      <Box className="users-content">
                        {/* step1 */}
                        {activeStep === 0 ? (
                          <Box className="d-block">
                            <Box className="title">
                              <Grid
                                container
                                alignItems={"center"}
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                              >
                                <Grid item xs={6}>
                                  <label className="form-label">
                                    Name (Optional)
                                  </label>
                                </Grid>
                                <Grid item xs={6}>
                                  <label className="form-label">
                                    Email Address
                                  </label>
                                </Grid>
                              </Grid>
                            </Box>
                            {this.renderInputs()}
                            <Box className="add-user"  onClick={this.onClickAnotherPerson}>
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
                              <Box className="adduser-top-section">
                                <h4>Add users to the group(324)</h4>
                                <Grid
                                  container
                                  rowSpacing={1}
                                  className="h-100"
                                  alignItems={"center"}
                                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                >
                                  <Grid item xs={8}>
                                    <Box className="top-search">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search policy"
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
                                      {rows.map((row, index) => (
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
                                    <Grid item xs={6}>
                                      <Box className="form-group">
                                        <label
                                          htmlFor="username"
                                          className="form-label"
                                        >
                                          Username (optional)
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="username"
                                          name="username"
                                          placeholder="James"
                                          autoFocus={"autoFocus"}
                                        />
                                      </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Box className="form-group">
                                        <label
                                          htmlFor="email"
                                          className="form-label"
                                        >
                                          Email Address
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="email"
                                          name="email"
                                          placeholder="James@synectiks.com"
                                          autoFocus={"autoFocus"}
                                        />
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Box>
                              <h4 className="m-t-0 m-b-0">Group</h4>
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
                                      {rows.map((row, index) => (
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
