import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import {
  getProductsByDepId,
  getDepartmentsOrgWise,
  getDeploymentEnvs,
  getEnvsByFilters,
} from "redux/assetManager/environments/environmentsThunk";
import { getCurrentOrgId } from "utils";
import Button from "@mui/material/Button";
import status from "redux/constants/commonDS";
import LoadingButton from "@mui/lab/LoadingButton";

const deploymentImgs = {
  DEV: "department",
  TEST: "testing",
  STAGE: "stage",
  PROD: "production",
};

class SelectDepartmentPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedDepartments: [],
      selectedProductions: [],
      selectedEnvs: [],
      products: {},
      departments: [],
      deploymentEnvs: [],
      selectedDepartments: [],
    };
  }

  componentDidMount = () => {
    let currentOrgId = localStorage.getItem("currentOrgId");
    if (currentOrgId > 0) {
      this.props.getDepartmentsOrgWise(currentOrgId);
      this.props.getDeploymentEnvs(currentOrgId);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.environments.departmentsFilters.status !==
      this.props.environments.departmentsFilters.status
    ) {
      if (
        this.props.environments.departmentsFilters.status === status.SUCCESS &&
        this.props.environments.departmentsFilters.data
      ) {
        if (this.props.environments.departmentsFilters.data.departments) {
          this.setState({
            departments:
              this.props.environments.departmentsFilters.data.departments,
          });
        }
      }
    }

    if (
      prevProps.environments.deploymentEnvs.status !==
      this.props.environments.deploymentEnvs.status
    ) {
      if (
        this.props.environments.deploymentEnvs.status === status.SUCCESS &&
        this.props.environments.deploymentEnvs.data
      ) {
        if (this.props.environments.deploymentEnvs.data) {
          this.setState({
            deploymentEnvs: this.props.environments.deploymentEnvs.data,
          });
        }
      }
    }

    if (
      prevProps.environments.productsByDepId.status !==
      this.props.environments.productsByDepId.status
    ) {
      if (
        this.props.environments.productsByDepId.status === status.SUCCESS &&
        this.props.environments.productsByDepId.data
      ) {
        let { products, depId } = this.props.environments.productsByDepId.data;
        let { selectedDepartments } = this.state;
        selectedDepartments.push(depId);
        this.setState((prevState) => ({
          products: { ...prevState.products, [depId]: products },
          selectedDepartments,
        }));
      }
    }
  }

  toggle = () => {
    this.props.togglePopup();
    this.setState({
      selectedDepartments: [],
      products: [],
      selectedEnvs: [],
      selectedProductions: [],
    });
  };

  handleCheckChange = (e, type, depId) => {
    let orgId = getCurrentOrgId();
    let departmentId = depId;

    const { value, checked } = e.target;
    let { selectedProductions, selectedEnvs, selectedDepartments } = this.state;

    if (type === "dep") {
      if (checked) {
        this.props.getProductsByDepId({ orgId: orgId, depId: depId });
      } else {
        let removeProducts = this.state.products;
        delete removeProducts[depId];
        selectedDepartments = selectedDepartments.filter(
          (departmentId) => departmentId !== depId
        );
        if (!this.productsLength()) {
          selectedProductions = selectedEnvs = selectedDepartments = [];
        }
        this.setState({
          products: removeProducts,
          selectedProductions,
          selectedEnvs,
          selectedDepartments,
        });
      }
    } else if (type === "prod") {
      if (checked) {
        this.setState((prevState) => ({
          selectedProductions: [...prevState.selectedProductions, value],
        }));
      } else {
        let newChecked = selectedProductions.filter((item) => item !== value);
        if (!newChecked.length) {
          selectedEnvs = [];
        }
        this.setState({ selectedProductions: newChecked, selectedEnvs });
      }
    }
  };

  handleEnvChange = (name) => {
    let { selectedEnvs } = this.state;
    if (selectedEnvs.includes(name)) {
      selectedEnvs = selectedEnvs.filter((item) => item !== name);
    } else {
      selectedEnvs.push(name);
    }
    this.setState({ selectedEnvs });
  };

  renderDepartMents = () => {
    let { departments } = this.state;
    return departments.map((department, index) => {
      return (
        <Grid item lg={4} md={4} xs={12} key={index}>
          <Box className="d-flex align-items-center checkbox">
            <input
              className="checkbox-input"
              type="checkbox"
              checked={this.isDepartmentSelected(department.id)}
              onChange={(e) => this.handleCheckChange(e, "dep", department.id)}
            />
            <label
              htmlFor={department.name}
              onClick={(e) =>
                this.handleCheckChange(
                  {
                    target: {
                      checked: !this.isDepartmentSelected(department.id),
                    },
                  },
                  "dep",
                  department.id
                )
              }
            >
              {department.name}
            </label>
          </Box>
        </Grid>
      );
    });
  };

  renderProducts = () => {
    return Object.keys(this.state.products).map((departmentProducts, index) => {
      return this.state.products[departmentProducts].map(
        (product, innerIndex) => {
          return (
            <Grid key={innerIndex} item lg={4} md={4} xs={12}>
              <Box className="d-flex align-items-center">
                <input
                  type="checkbox"
                  value={product}
                  onChange={(e) => this.handleCheckChange(e, "prod")}
                  id={product}
                />
                <label htmlFor={product}>{product}</label>
              </Box>
            </Grid>
          );
        }
      );
    });
  };

  isDepartmentSelected = (depId) => {
    let { selectedDepartments } = this.state;
    if (selectedDepartments.length)
      return selectedDepartments.filter(
        (departmentId) => departmentId === depId
      ).length
        ? true
        : false;
    else return false;
  };

  productsLength = (products = []) => {
    let isProduct = false;
    let productData = products.length ? products : {};
    if (Object.keys(this.state.products).length) {
      Object.keys(this.state.products).forEach((productKey) => {
        if (
          this.state.products[productKey] &&
          this.state.products[productKey].length &&
          !isProduct
        ) {
          isProduct = true;
        }
      });
    }
    return isProduct;
  };

  handleSubmit = () => {
    let { selectedDepartments, selectedProductions, selectedEnvs } = this.state;
    let filterString = "";
    if (selectedDepartments.length) {
      filterString += `departmentId=${selectedDepartments[0]}`;
    }
    if (selectedProductions.length) {
      filterString += `&product=${selectedProductions[0]}`;
    }
    if (selectedEnvs.length) {
      filterString += `&env=${selectedEnvs[0]}`;
    }
    this.props.getEnvsByFilters(filterString).then((res)=>{
      this.toggle();
    })
  };

  render() {
    const {
      selectedProductions,
      selectedEnvs,
      products,
      departments,
      deploymentEnvs,
    } = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className="select-account-modal-container"
      >
        <ModalHeader>
          Filter
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.toggle}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", height: "300px" }}
        >
          <h4 className="text-left m-b-1">Select Department</h4>
          {this.props.environments.departmentsFilters.status ===
          status.IN_PROGRESS ? (
            <Box className="text-center align-self-center p-t-20 p-b-20">
              <i className="fa-solid fa-spinner fa-spin" /> Loading...
            </Box>
          ) : (
            <>
              <Box sx={{ width: "100%" }} className="border-bottom p-b-10">
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  {(departments.length && this.renderDepartMents()) || ""}
                </Grid>
              </Box>
              {(this.productsLength() && (
                <>
                  <h4 className="text-left m-b-1 m-t-2">Select Production</h4>
                  <Box sx={{ width: "100%" }} className="border-bottom p-b-10">
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                    >
                      {this.renderProducts()}
                    </Grid>
                  </Box>
                </>
              )) ||
                ""}
              {(selectedProductions.length && Object.keys(products).length && (
                <>
                  <h4 className="text-left m-b-1 m-t-2">Select Environment</h4>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                    >
                      {deploymentEnvs.map((item) => {
                        return (
                          <Grid key={item.name} item lg={3} md={4} xs={12}>
                            <Box
                              onClick={() => this.handleEnvChange(item.name)}
                              className={`environment-box ${
                                selectedEnvs.includes(item.name) ? "active" : ""
                              }`}
                            >
                              <Box className="d-block">
                                <Box
                                  className={`envir-image ${
                                    deploymentImgs[item.name]
                                  }`}
                                ></Box>
                                <Box className="environment-title">
                                  {item.name}
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </>
              )) ||
                ""}
            </>
          )}
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <Button
              className="secondary-btn m-r-2"
              variant="contained"
              onClick={this.toggle}
            >
              Clear
            </Button>
            {/* {this.productsLength() ? (
              <Button
                onClick={() => this.handleSubmit()}
                className="primary-btn min-width"
                variant="contained"
              >
                Submit
              </Button>
            ) : (
              <></>
            )} */}
            <LoadingButton
              disabled={
                this.props.environments.envSummary.status === status.IN_PROGRESS ? true : false
              }
              loading={
                this.props.environments.envSummary.status === status.IN_PROGRESS ? true : false
              }
              className="primary-btn min-width"
              loadingPosition="start"
              variant="contained"
              onClick={() => this.handleSubmit()}
            >
              Submit
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { orgWiseDepartments, environments } = state;
  return {
    orgWiseDepartments,
    environments,
  };
};

const mapDispatchToProps = {
  getProductsByDepId,
  getDepartmentsOrgWise,
  getDeploymentEnvs,
  getEnvsByFilters,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDepartmentPopup);
