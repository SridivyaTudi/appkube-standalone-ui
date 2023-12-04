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

const steps = ["User details ", "Add  user to group ", "Review and Create"];
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
                          <Grid
                            container
                            alignItems={"center"}
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                          >
                            <Grid item xs={6}>
                              <Box className="form-group">
                                <Box className="d-inline-block">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="roleName"
                                    name="roleName"
                                    placeholder="Write Request Title"
                                  />
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box className="form-group">
                                <Box className="d-inline-block">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="roleName"
                                    name="roleName"
                                    placeholder="Write Request Title"
                                  />
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                          <Box className="add-user">
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
                            <TableContainer
                              component={Paper}
                              className="access-control-table"
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
                                      <TableCell>{row.policiesname}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </>
                      ) : (
                        <>
                          {/* step3 */}

                          <Box className="d-block">
                            <Box className="user-review">
                              <h4>Review</h4>
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
                              <Box className="form-group">
                                <label htmlFor="email" className="form-label">
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
                            </Box>
                            <h4>Group</h4>
                            <TableContainer
                              component={Paper}
                              className="access-control-table"
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
                                      <TableCell>{row.policiesname}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
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
