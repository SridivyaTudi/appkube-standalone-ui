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
  getEnvsSummary,
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
      selectedDepartment: -1,
      selectedProduct: -1,
      selectedEnv: -1
    };
  }

  componentDidMount = () => {
    let currentOrgId = getCurrentOrgId();
    this.props.getOrgWiseDepartments(currentOrgId);
    this.props.getDeploymentEnvs(currentOrgId);
    const { selectedDepartment, selectedEnv, selectedProduct } = this.props.selectedFilters;
    this.setState({
      selectedDepartment,
      selectedEnv,
      selectedProduct
    });
    if (selectedDepartment !== -1) {
      this.props.getProductsByDepId({ orgId: currentOrgId, depId: selectedDepartment });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.organizationWiseDepartments.status !==
      this.props.organizationWiseDepartments.status && this.props.organizationWiseDepartments.status ===
      status.SUCCESS
    ) {
      this.setState({
        departments: this.sortDepartments(
          JSON.parse(JSON.stringify(this.props.organizationWiseDepartments.data
            .departments))
        ),
      });
    }
    if (
      prevProps.deploymentEnvs.status !==
      this.props.deploymentEnvs.status
    ) {
      if (
        this.props.deploymentEnvs.status === status.SUCCESS &&
        this.props.deploymentEnvs.data
      ) {
        if (this.props.deploymentEnvs.data) {
          this.setState({
            deploymentEnvs: this.props.deploymentEnvs.data,
          });
        }
      }
    }
  }

  toggle = () => {
    this.props.togglePopup();
  };

  handleDepartmentCheck = (departmentID) => {
    this.setState({
      selectedDepartment: departmentID,
      selectedProduct: -1,
      selectedEnv: -1
    });
    let currentOrgId = getCurrentOrgId();
    this.props.getProductsByDepId({ orgId: currentOrgId, depId: departmentID });
  };

  handleProductCheck = (product) => {
    this.setState({
      selectedProduct: product,
      selectedEnv: -1
    });
  };

  handleEnvCheck = (env) => {
    this.setState({
      selectedEnv: env
    });
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
                type="radio"
                name="department"
                checked={department.id === this.state.selectedDepartment}
                onChange={(e) =>
                  this.handleDepartmentCheck(department.id)
                }
              />
              <label
                htmlFor={department.name}
                onClick={(e) => this.handleDepartmentCheck(department.id)}
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
    const { productsByDepId } = this.props;
    const { selectedDepartment } = this.state;
    if (productsByDepId && productsByDepId.data && productsByDepId.data.depId === selectedDepartment) {
      return productsByDepId.data.products.map((product, innerIndex) => {
        return (
          <Grid item lg={4} md={4} xs={12}>
            <Box className="d-flex align-items-center" >
              <input
                type="radio"
                name="product"
                value={product}
                checked={product === this.state.selectedProduct}
                onChange={(e) => this.handleProductCheck(product)}
              />
              <label htmlFor={product} onClick=
                {(e) => this.handleProductCheck(product)}>
                {product}
              </label>
            </Box>
          </Grid>
        );
      });
    }
    return [];
  };

  renderEnvironments = () => {
    const { deploymentEnvs } = this.props;
    if (deploymentEnvs && deploymentEnvs.data) {
      return deploymentEnvs.data.map((item) => {
        return (
          <Grid key={item.name} item lg={3} md={4} xs={12}>
            <Box
              onClick={() =>
                this.handleEnvCheck(item.name)
              }
              className={`
                environment-box 
                ${this.state.selectedEnv === item.name ? "active" : ""}`
              }
            >
              <Box className="d-block">
                <Box
                  className={`envir-image ${deploymentImgs[item.name]
                    }`}
                ></Box>
                <Box className="environment-title">
                  {item.name}
                </Box>
              </Box>
            </Box>
          </Grid>
        );
      });
    }
    return [];
  };

  handleSubmit = () => {
    let { selectedDepartment, selectedProduct, selectedEnv } = this.state;
    let currentOrgId = getCurrentOrgId();
    let params = {};
    if (selectedDepartment !== -1) {
      params = {
        departmentId: selectedDepartment
      };
      if (selectedProduct !== -1) {
        params.product = selectedProduct;
        if (selectedEnv !== -1) {
          params.env = selectedEnv;
        }
      }
      this.props.getEnvsSummary({ params, orgId: currentOrgId });
      this.props.handleSubmitFilter({
        selectedDepartment,
        selectedProduct,
        selectedEnv
      });
    }
  };

  handleClearFilters = () => {
    let { selectedDepartment } = this.props.selectedFilters;
    if(selectedDepartment !== -1){
      let currentOrgId = getCurrentOrgId();
      this.props.getEnvsSummary({ orgId: currentOrgId });
    } else {
      this.props.togglePopup();
    }
    this.props.handleSubmitFilter({
      selectedDepartment: -1,
      selectedProduct: -1,
      selectedEnv: -1
    });
  };

  sortDepartments = (departments) => {
    departments.sort(function (depA, depB) {
      if (depA.name < depB.name) {
        return -1;
      }
      if (depA.name > depB.name) {
        return 1;
      }
      return 0;
    });
    return departments;
  };

  render() {
    const { selectedDepartment, selectedProduct } = this.state;
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
            onClick={() => {
              this.props.togglePopup()
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", height: "300px" }}
        >
          <h4 className="text-left m-b-1">Select Department</h4>
          {this.props.organizationWiseDepartments.status ===
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
              {selectedDepartment !== -1 ? (
                <>
                  <h4 className="text-left m-b-1 m-t-2">Select Product</h4>
                  <Box
                    sx={{ width: "100%" }}
                    className="border-bottom p-b-10"
                  >
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
              ) : null}
              {selectedProduct !== -1 ?
                <>
                  <h4 className="text-left m-b-1 m-t-2">
                    Select Environment
                  </h4>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                    >
                      {this.renderEnvironments()}
                    </Grid>
                  </Box>
                </>
                : null
              }
            </>
          )}
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <LoadingButton
              className="secondary-btn m-r-2"
              variant="contained"
              onClick={this.handleClearFilters}
              disabled={this.props.envSummary.status ===
                status.IN_PROGRESS}
              loading={
                this.props.envSummary.status ===
                status.IN_PROGRESS}
            >
              Clear
            </LoadingButton>
            {selectedDepartment !== -1 ?
              <LoadingButton
                disabled={this.props.envSummary.status ===
                  status.IN_PROGRESS}
                loading={
                  this.props.envSummary.status ===
                  status.IN_PROGRESS}
                className="primary-btn min-width"
                loadingPosition="start"
                variant="contained"
                onClick={this.handleSubmit}
              >
                Submit
              </LoadingButton>
              : null}
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { organizationWiseDepartments, deploymentEnvs, productsByDepId, envSummary } = state.environments;
  return {
    organizationWiseDepartments,
    deploymentEnvs,
    productsByDepId,
    envSummary
  };
};

const mapDispatchToProps = {
  getProductsByDepId,
  getOrgWiseDepartments,
  getDeploymentEnvs,
  getEnvsSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPopup);
