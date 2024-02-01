import React, { Component } from "react";
import { Box, Button, List, ListItem, Grid, Card } from "@mui/material";
import ProductBanner from "assets/img/bimapping/product-banner.png";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import AddIcon from "assets/img/bimapping/add-icon.png";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      status: false,
      selectedLandingZone: "",
      developmentStatus: false,
      formData: {
        name: "",
      },
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

  renderBtns = () => {
    return (
      <Box
        justifyContent={"center"}
        className="d-flex align-items-center wizard-step-button m-t-4"
      >
        <Button
          className="primary-outline-btn m-r-2"
          variant="outlined"
          onClick={this.handlePrevious}
        >
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
    );
  };

  handlePrevious = () => {
    let { developmentStatus } = this.state;
    if (developmentStatus) {
      this.setState({ developmentStatus: false });
    } else {
      this.props.navigate(`${APP_PREFIX_PATH}/bim`);
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    let { formData } = this.state;
    formData[name] = value;

    this.setState({ formData });
  };

  render() {
    const { developmentStatus, formData } = this.state;
    return (
      <Box className="department-container">
        <Box className="department-step">
          <Box className="department-left">
            <Box className="department-left-content">
              <span className="d-flex width-100">Appkube</span>
              <h2 className="d-flex width-100 m-t-0 m-b-0">
                Add Product into the HR deparment
              </h2>
              <Box className="d-flex width-100 banner-image">
                <img
                  src={ProductBanner}
                  alt="DepartmentBanner"
                  style={{ maxHeight: "450px" }}
                />
              </Box>
            </Box>
          </Box>
          <Box className="department-right">
            <Box className="department-right-content">
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
                          value={formData.name}
                          onChange={this.handleInputChange}
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
                              <Link to={`/app/bim/tier`}>
                                <input
                                  type="radio"
                                  name="product"
                                  className="radio-btn"
                                />
                                <label>3 Tier</label>
                              </Link>
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
                          <Box className="form-group m-t-2">
                            <label htmlFor="roleName" className="form-label">
                              Module Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              placeholder=""
                              value={formData.name}
                              onChange={this.handleInputChange}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Box>
                </Box>
                {this.renderBtns()}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default AddProduct;
