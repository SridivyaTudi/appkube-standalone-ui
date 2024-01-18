import React, { Component } from "react";
import { Box, Button, List, ListItem, Grid, Card } from "@mui/material";
import AddIcon from "../../../assets/img/bimapping/add-icon.png";
import Aws from "../../../assets/img/aws.png";
import Microsoftazure from "../../../assets/img/microsoftazure.png";
import GoogleCloud from "../../../assets/img/google-cloud.png";
import Checkbox from "@mui/material/Checkbox";
import { Label } from "reactstrap";

class CreateDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      selectedLandingZone: "",
    };
  }

  handleNext() {
    this.setState({
      status: true,
    });
  }

  onClickLandingZone() {
    this.setState({ selectedLandingZone: "AWS" });
  }
  render() {
    const { status, selectedLandingZone } = this.state;
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

              {!status ? (
                <>
                  {/*  jo bydefault hoga  */}
                  <Box className="basic-information-section">
                    <Box className="basic-information">
                      <Box className="d-flex align-items-center">
                        <Box className="check-box">
                          <i className="fa-solid fa-check"></i>
                        </Box>
                        <Box className="information-text">
                          <label className="d-block">Basic Information</label>
                          <span className="d-block">
                            Choose a department name and product assign
                            environment
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
                        />
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
                        />
                      </Box>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  {/* next button k liye par */}
                  <Box className="basic-information-section">
                    <Box className="basic-information">
                      <Box className="d-flex align-items-center">
                        <Box className="check-box">
                          <i className="fa-solid fa-check"></i>
                        </Box>
                        <Box className="information-text">
                          <label className="d-block">Landing zone</label>
                          <span className="d-block">
                            Choose a associate landing zone and select landing
                            zone
                          </span>
                        </Box>
                      </Box>
                      <Box className="arrow-icon">
                        <i className="fa-solid fa-caret-down "></i>
                      </Box>
                    </Box>
                    <Box className="information-form">
                      <Box className="associate-title">
                        Associate landing zone
                      </Box>
                      <Box className="associate-boxs">
                        <List>
                          <ListItem>
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
                          <ListItem>
                            <Button
                              className="secondary-btn min-width"
                              variant="contained"
                              onClick={() =>
                                this.onClickLandingZone("MICROSOFT_AZURE")
                              }
                            >
                              <Box className="image-box">
                                <img src={Microsoftazure} alt="" />
                              </Box>
                              Microsoft azure
                            </Button>
                          </ListItem>
                          <ListItem>
                            <Button
                              className="secondary-btn min-width"
                              variant="contained"
                              onClick={() =>
                                this.onClickLandingZone("MICROSOFT_AZURE")
                              }
                            >
                              <Box className="image-box">
                                <img src={GoogleCloud} alt="" />
                              </Box>
                              GCP
                            </Button>
                          </ListItem>
                        </List>
                      </Box>
                      {["MICROSOFT_AZURE", "AWS"].includes(
                        selectedLandingZone
                      ) ? (
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                              <Grid item xs={4}>
                                <Card className="select-landing-card">
                                  <Box className="card-content text-center">
                                    <Box className="card-image">
                                      <img src={Aws} alt="" />
                                    </Box>
                                    <Box className="card-title">
                                      Account no 123456
                                    </Box>
                                  </Box>
                                  <Box className="card-footer">
                                    <Box className="footer-left-content">
                                      <span className="d-block">
                                        Associated LOB
                                      </span>
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
                            </Grid>
                          </Box>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Box>
                </>
              )}
            </Box>
            <Box
              justifyContent={"center"}
              className="d-flex align-items-center wizard-step-button m-t-4"
            >
              <Button className="primary-outline-btn m-r-2" variant="outlined">
                Previous
              </Button>
              <Button
                className="primary-btn"
                variant="contained"
                onClick={() => this.handleNext()}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default CreateDepartment;
