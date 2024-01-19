import React, { Component } from "react";
import { Box, Button, List, ListItem, Grid, Card } from "@mui/material";
import AddIcon from "../../../assets/img/bimapping/add-icon.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
class AddingProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      status: false,
      selectedLandingZone: "",
      developmentStatus: false,
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
    const { status, selectedLandingZone, developmentStatus, activeTab } =
      this.state;
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>HR Department</h3>
        </Box>
        <Box className="create-department-container">
          <Box className="create-department-content">
            <Box className="create-department-inner-content">
              <Box className="add-department d-flex align-items-center">
                <Box className="icon-box m-r-2">
                  <img src={AddIcon} alt="" />
                </Box>
                <Box className="department-text d-inline-block">
                  <label className="d-block">Adding Product</label>
                  <span className="d-block">
                    A new Product will add in Hr department
                  </span>
                </Box>
              </Box>
              <Box className="basic-information-section">
                <Box className="basic-information">
                  <Box className="d-flex align-items-center">
                    <Box className="check-box">
                      <i className="fa-solid fa-check"></i>
                    </Box>
                    <Box className="information-text">
                      <label className="d-block">Basic Information</label>
                      <span className="d-block">
                        Add product and choose environment
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
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="HRMS"
                    />
                  </Box>
                  <Box className="associate-title m-t-3">
                    Select Environment
                  </Box>
                  <Box className="associate-boxs">
                    <List>
                      <ListItem
                        className={`${developmentStatus ? "active" : ""}`}
                      >
                        <Button
                          className="secondary-btn min-width"
                          variant="contained"
                          onClick={() =>
                            this.setState({ developmentStatus: true })
                          }
                        >
                          Development
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          className="secondary-btn min-width"
                          variant="contained"
                        >
                          Test
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          className="secondary-btn min-width"
                          variant="contained"
                        >
                          Stage
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          className="secondary-btn min-width"
                          variant="contained"
                        >
                          Production
                        </Button>
                      </ListItem>
                    </List>
                  </Box>
                  {developmentStatus ? (
                    <Box className="select-category-section">
                      <Box className="category-title">Select Category</Box>
                      <Box className="select-categorys">
                        <Box className="d-flex align-items-center m-r-3">
                          <input
                            type="radio"
                            name="product"
                            className="radio-btn"
                          />
                          <label>3 Tier</label>
                        </Box>
                        <Box className="d-flex align-items-center">
                          <Link to={`/app/bim/product-category`}>
                            <input
                              type="radio"
                              name="product"
                              className="radio-btn"
                            />
                            <label>SOA</label>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
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

export default AddingProduct;
