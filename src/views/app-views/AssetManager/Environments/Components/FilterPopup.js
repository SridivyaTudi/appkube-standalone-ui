import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import {
  getProductsByDepId,
  getOrgWiseDepartments,
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

class FilterPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      departments: [],
      deploymentEnvs: [],
    };
  }

  componentDidMount = () => {
    let currentOrgId = localStorage.getItem("currentOrgId");
    if (currentOrgId > 0) {
      this.props.getOrgWiseDepartments(currentOrgId);
      this.props.getDeploymentEnvs(currentOrgId);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.environments.organizationWiseDepartments.status !==
      this.props.environments.organizationWiseDepartments.status
    ) {
      if (
        this.props.environments.organizationWiseDepartments.status ===
          status.SUCCESS &&
        this.props.environments.organizationWiseDepartments.data
      ) {
        if (
          this.props.environments.organizationWiseDepartments.data.departments
        ) {
          this.setState({
            departments:
              this.props.environments.organizationWiseDepartments.data
                .departments,
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
  }

  toggle = () => {
    this.props.togglePopup();
  };

  renderDepartments = () => {
    let { departments } = this.state;
    if (departments.length) {
      return departments.map((department, index) => {
        return (
          <Grid item lg={4} md={4} xs={12} key={index}>
            <Box className="d-flex align-items-center checkbox">
              <input
                className="checkbox-input"
                type="checkbox"
                checked={this.isDepartmentSelected(department.id)}
                onChange={(e) =>
                  this.props.handleCheckChange(e, "dep", department.id)
                }
              />
              <label
                htmlFor={department.name}
                onClick={(e) =>
                  this.props.handleCheckChange(
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
    }
  };

  renderProducts = () => {
    let { selectedFilters, products } = this.props;
    let { selectedProductions } = selectedFilters;
    return Object.keys(products).map((departmentProducts, index) => {
      return this.props.products[departmentProducts].map(
        (product, innerIndex) => {
          return (
            <Grid key={innerIndex} item lg={4} md={4} xs={12}>
              <Box className="d-flex align-items-center">
                <input
                  type="checkbox"
                  value={product}
                  checked={selectedProductions.includes(product)}
                  onChange={(e) => this.props.handleCheckChange(e, "prod")}
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
    let { selectedDepartments } = this.props.selectedFilters;
    if (selectedDepartments.length)
      return selectedDepartments.filter(
        (departmentId) => departmentId === depId
      ).length
        ? true
        : false;
    else return false;
  };

  productsLength = () => {
    let isProduct = false;
    const { products } = this.props;
    if (Object.keys(products).length) {
      Object.keys(products).forEach((productKey) => {
        if (products[productKey] && products[productKey].length && !isProduct) {
          isProduct = true;
        }
      });
    }
    return isProduct;
  };

  handleSubmit = () => {
    let { selectedDepartments, selectedProductions, selectedEnvs } =
      this.props.selectedFilters;
    const orgId = localStorage.getItem("currentOrgId");
    let params = "";
    if (selectedDepartments.length) {
      params += `departmentId=${selectedDepartments[selectedDepartments.length - 1]}`;
    }
    if (selectedProductions.length) {
      params += `&product=${selectedProductions[selectedProductions.length - 1]}`;
    }
    if (selectedEnvs.length) {
      params += `&env=${selectedEnvs[selectedEnvs.length-1]}`;
    }
    this.props.getEnvsByFilters({ params, orgId });
    this.toggle();
  };

  render() {
    const { departments, deploymentEnvs } = this.state;
    const { selectedProductions, selectedEnvs, selectedDepartments } = this.props.selectedFilters;
    const { products } = this.props;
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
          {this.props.environments.organizationWiseDepartments.status ===
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
                  {this.renderDepartments()}
                </Grid>
              </Box>
              {selectedDepartments.length ?  this.productsLength() ?  (
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
              ): <></>  :<></>}
              {selectedDepartments.length ?  selectedProductions.length && this.productsLength() ? (
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
                              onClick={() =>
                                this.props.handleEnvChange(item.name)
                              }
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
              ) : <></> :<></>} 
            </>
          )}
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <Button
              className="secondary-btn m-r-2"
              variant="contained"
              onClick={() => {
                this.props.handleClearFilters();
                this.toggle();
              }}
            >
              Clear
            </Button>
            {(selectedDepartments.length && (
              <LoadingButton
                disabled={
                  this.props.environments.envSummary.status ===
                  status.IN_PROGRESS
                    ? true
                    : false
                }
                loading={
                  this.props.environments.envSummary.status ===
                  status.IN_PROGRESS
                    ? true
                    : false
                }
                className="primary-btn min-width"
                loadingPosition="start"
                variant="contained"
                onClick={() => this.handleSubmit()}
              >
                Submit
              </LoadingButton>
            )) ||
              ""}
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
  getOrgWiseDepartments,
  getDeploymentEnvs,
  getEnvsByFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPopup);
