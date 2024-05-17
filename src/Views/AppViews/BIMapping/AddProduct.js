import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import ProductBanner from "assets/img/bimapping/product-banner.png";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import AddIcon from "assets/img/bimapping/add-icon.png";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { setProductIntoDepartment } from "Redux/BIMapping/BIMappingSlice";
import { connect } from "react-redux";
import { PRODUCT_CATEGORY_ENUM } from "Utils";
import { v4 } from "uuid";

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
        category: PRODUCT_CATEGORY_ENUM.THREE_TIER,
      },
    };
  }

  componentDidMount = () => {
    let { createProductFormData } = this.props;
    if (createProductFormData) {
      let { productName, category, environment } = createProductFormData;
      let formData = {
        name: productName,
        environment,
        category: category || PRODUCT_CATEGORY_ENUM.THREE_TIER,
      };
      this.setState({ formData });
    }
  };

  /** Click event for next button. */
  handleNext = (e) => {
    e.preventDefault();
    let { developmentStatus, formData } = this.state;

    this.setState(
      {
        isSubmit: true,
        developmentStatus: formData.environment ? true : developmentStatus,
      },
      () => {
        let { isValid } = this.validateForm();

        if (isValid) {
          let {
            name: departmentName,
            id: depanrtmentId,
            landingZoneId,cloud
          } = this.getUrlDetails();
          let { createProductFormData } = this.props;
          let productData = {
            ...createProductFormData,
            ...formData,
            departmentName,
            depanrtmentId,
          };
          productData["productName"] = productData.name;

          delete productData.name;
          departmentName = departmentName?.toLowerCase()?.replaceAll(" ", "-");
          this.props.setProductIntoDepartment(productData);
          if (formData.category === PRODUCT_CATEGORY_ENUM.THREE_TIER) {
            this.props.navigate(
              `${APP_PREFIX_PATH}/bim/add-product/${departmentName}/${depanrtmentId}/${landingZoneId}/${cloud}/product-category/${PRODUCT_CATEGORY_ENUM.THREE_TIER.toLowerCase().replace(
                " ",
                "-"
              )}`
            );
          } else if (formData.category === PRODUCT_CATEGORY_ENUM.LAMBDA) {
            this.props.navigate(
              `${APP_PREFIX_PATH}/bim/add-product/${departmentName}/${depanrtmentId}/${landingZoneId}/${cloud}/product-category/${PRODUCT_CATEGORY_ENUM.LAMBDA.toLowerCase()}`
            );
          } else {
            this.props.navigate(
              `${APP_PREFIX_PATH}/bim/add-product/${departmentName}/${depanrtmentId}/${landingZoneId}/${cloud}/product-category`
            );
          }
        }
      }
    );
  };

  /** View the buttons. */
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
          type="submit"
          className="primary-btn"
          variant="contained"
          onClick={this.handleNext}
        >
          Next
        </Button>
      </Box>
    );
  };

  /** Manage the previous button click event. */
  handlePrevious = () => {
    this.props.navigate(`${APP_PREFIX_PATH}/bim`);
  };

  /** Form input changes. */
  handleInputChange = (e) => {
    const { name, value } = e.target;
    let { formData } = this.state;
    formData[name] = value;

    this.setState({ formData });
  };

  /** Render environments. */
  renderEnvironments = () => {
    let { formData } = this.state;
    return environments.map((environment) => {
      return (
        <ListItem
          className={`${environment === formData.environment ? "active" : ""}`}
          key={v4()}
        >
          <Button
            className="secondary-btn min-width"
            variant="contained"
            onClick={() =>
              this.setState({
                formData: {
                  ...formData,
                  environment,
                  developmentStatus: true,
                },
              })
            }
          >
            {environment}
          </Button>
        </ListItem>
      );
    });
  };

  /** Validate form for data. */
  validateForm = () => {
    let { formData, isSubmit, developmentStatus } = this.state;
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

      if (developmentStatus) {
        if (!formData.category) {
          errors.category = "Please select the category.";
          isValid = false;
        } else {
          errors.category = "";
        }
      }
    }
    return { isValid, errors };
  };

  /** Get url details. */
  getUrlDetails() {
    let name = this.props.params.name;
    let id = this.props.params.id;
    let landingZoneId = this.props.params.landingZoneId;
    name = name?.replaceAll("-", " ");
    let cloud = this.props.params.cloud;

    return { name, id, landingZoneId, cloud };
  }

  render() {
    const { formData, isSubmit } = this.state;
    let { errors } = this.validateForm();
    let { name } = this.getUrlDetails();
    name = name?.charAt(0)?.toUpperCase() + name?.slice(1);
    return (
      <Box className="department-container">
        <Box className="department-step">
          <Box className="department-left">
            <Box className="department-left-content">
              <span className="d-flex width-100">{name}</span>
              <h2 className="d-flex width-100 m-t-0 m-b-0">
                Add Product into the {name} deparment
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
                        A new Product will add in {name} department
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
                    <form
                      onSubmit={(e) => {
                        this.handleNext(e);
                      }}
                    >
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
                            <Box className="category-title">
                              Select Category
                            </Box>
                            <Box className="select-categorys">
                              <Box className="d-flex align-items-center m-r-3">
                                <input
                                  type="radio"
                                  name="category"
                                  className="radio-btn"
                                  value={PRODUCT_CATEGORY_ENUM.THREE_TIER}
                                  checked={
                                    formData.category ===
                                    PRODUCT_CATEGORY_ENUM.THREE_TIER
                                  }
                                  onChange={this.handleInputChange}
                                  id={PRODUCT_CATEGORY_ENUM.THREE_TIER}
                                />
                                <label
                                  htmlFor={PRODUCT_CATEGORY_ENUM.THREE_TIER}
                                >
                                  {PRODUCT_CATEGORY_ENUM.THREE_TIER}
                                </label>
                              </Box>
                              <Box className="d-flex align-items-center m-r-3">
                                <input
                                  type="radio"
                                  name="category"
                                  id={PRODUCT_CATEGORY_ENUM.SOA}
                                  className="radio-btn"
                                  value={PRODUCT_CATEGORY_ENUM.SOA}
                                  checked={
                                    formData.category ===
                                    PRODUCT_CATEGORY_ENUM.SOA
                                  }
                                  onChange={this.handleInputChange}
                                />
                                <label htmlFor={PRODUCT_CATEGORY_ENUM.SOA}>
                                  {PRODUCT_CATEGORY_ENUM.SOA}
                                </label>
                              </Box>
                              <Box className="d-flex align-items-center">
                                <input
                                  type="radio"
                                  name="category"
                                  id={PRODUCT_CATEGORY_ENUM.LAMBDA}
                                  className="radio-btn"
                                  value={PRODUCT_CATEGORY_ENUM.LAMBDA}
                                  checked={
                                    formData.category ===
                                    PRODUCT_CATEGORY_ENUM.LAMBDA
                                  }
                                  onChange={this.handleInputChange}
                                />
                                <label htmlFor={PRODUCT_CATEGORY_ENUM.LAMBDA}>
                                  {PRODUCT_CATEGORY_ENUM.LAMBDA}
                                </label>
                              </Box>
                            </Box>
                            {isSubmit && errors?.category ? (
                              <span className="red">{errors.category}</span>
                            ) : (
                              ""
                            )}
                          </Box>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </form>
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
