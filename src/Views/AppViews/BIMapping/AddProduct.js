import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import ProductBanner from "assets/img/bimapping/product-banner.png";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import AddIcon from "assets/img/bimapping/add-icon.png";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { setProductIntoDepartment } from "Redux/BIMapping/BIMappingSlice";
import { connect } from "react-redux";
let environments = ["Development", "Test", "Stage", "Production"];
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
        environment: "",
        category: "",
        moduleName: "",
      },
    };
  }

  handleNext() {
    this.setState({ isSubmit: true }, () => {
      let { isValid } = this.validateForm();
      if (isValid) {
      }
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

  renderEnvironments = () => {
    let { formData } = this.state;
    return environments.map((environment) => {
      return (
        <ListItem
          className={`${environment === formData.environment ? "active" : ""}`}
        >
          <Button
            className="secondary-btn min-width"
            variant="contained"
            onClick={() =>
              this.setState({ formData: { ...formData, environment } })
            }
          >
            {environment}
          </Button>
        </ListItem>
      );
    });
  };

  validateForm = () => {
    let { formData, isSubmit } = this.state;
    let isValid = true;
    let errors = {
      name: "",
      environment: "",
      category: "",
      moduleName: "",
    };

    if (isSubmit) {
      if (!formData.name) {
        errors.name = "Please enter the product name.";
        isValid = false;
      } else {
        errors.name = "";
      }

      if (!formData.environment) {
        errors.environment = "Please select the environment.";
        isValid = false;
      } else {
        errors.environment = "";
      }
      if (formData.environment !== "") {
        if (!formData.category) {
          errors.category = "Please select the category.";
          isValid = false;
        } else {
          errors.category = "";
        }
        if (!formData.moduleName) {
          errors.moduleName = "Please enter the module name.";
          isValid = false;
        } else {
          errors.moduleName = "";
        }
      }
    }
    return { isValid, errors };
  };
  render() {
    const { developmentStatus, formData, isSubmit } = this.state;
    let { departmentName } = this.props.createProductFormData;
    let { errors } = this.validateForm();
    return (
      <Box className="department-container">
        <Box className="department-step">
          <Box className="department-left">
            
            <Box className="department-left-content">
              <span className="d-flex width-100"> {departmentName} Department Appkube</span>
              <h2 className="d-flex width-100 m-t-0 m-b-0">
                Add Product into the {departmentName} deparment
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
                        A new Product will add in {departmentName} department
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
                        {isSubmit && errors?.name ? (
                          <span className="red">{errors.name}</span>
                        ) : (
                          ""
                        )}
                      </Box>
                      <Box className="associate-title m-t-3">
                        Select Environment
                      </Box>
                      <Box className="associate-boxs">
                        <List>{this.renderEnvironments()}</List>
                      </Box>
                      {isSubmit && errors?.environment ? (
                        <span className="red">{errors.environment}</span>
                      ) : (
                        ""
                      )}
                      {formData.environment ? (
                        <Box className="select-category-section">
                          <Box className="category-title">Select Category</Box>
                          <Box className="select-categorys">
                            <Box className="d-flex align-items-center m-r-3">
                              {/* <Link to={`/app/bim/tier`}> */}
                              <input
                                type="radio"
                                name="category"
                                className="radio-btn"
                                value="3 Tier"
                                checked={formData.category === "3 Tier"}
                                onChange={this.handleInputChange}
                                id="3 Tier"
                              />
                              <label htmlFor="3 Tier">3 Tier</label>
                              {/* </Link> */}
                            </Box>
                            <Box className="d-flex align-items-center">
                              <input
                                type="radio"
                                name="category"
                                id="SOA"
                                className="radio-btn"
                                value="SOA"
                                checked={formData.category === "SOA"}
                                onChange={this.handleInputChange}
                              />
                              <label htmlFor="SOA">SOA</label>
                            </Box>
                          </Box>
                          {isSubmit && errors?.category ? (
                            <span className="red">{errors.category}</span>
                          ) : (
                            ""
                          )}
                          <Box className="form-group m-t-2">
                            <label htmlFor="moduleName" className="form-label">
                              Module Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="moduleName"
                              name="moduleName"
                              placeholder=""
                              value={formData.moduleName}
                              onChange={this.handleInputChange}
                            />
                            {isSubmit && errors?.moduleName ? (
                              <span className="red">{errors.moduleName}</span>
                            ) : (
                              ""
                            )}
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
function mapStateToProps(state) {
  const { createProductFormData } = state.biMapping;
  return {
    createProductFormData,
  };
}

const mapDispatchToProps = {
  setProductIntoDepartment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AddProduct));
