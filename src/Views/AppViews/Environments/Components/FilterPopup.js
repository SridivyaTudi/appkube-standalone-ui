import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import {
  getProductsByDepId,
  getOrgWiseDepartments,
  getEnvsSummary,
} from "Redux/Environments/EnvironmentsThunk";
import status from "Redux/Constants/CommonDS";
import LoadingButton from "@mui/lab/LoadingButton";
import Loader from "Components/Loader";
import { v4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
import { NO_DATA_FOUND,API_ERROR_MESSAGE } from "CommonData";

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
      selectedEnv: -1,
    };
  }

  componentDidMount = () => {
    this.props.getOrgWiseDepartments();
    const { selectedDepartment, selectedEnv, selectedProduct } =
      this.props.selectedFilters;
    this.setState({
      selectedDepartment,
      selectedEnv,
      selectedProduct,
    });
    if (selectedDepartment !== -1) {
      this.props.getProductsByDepId(selectedDepartment);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.organizationWiseDepartments.status !==
        this.props.organizationWiseDepartments.status &&
      this.props.organizationWiseDepartments.status === status.SUCCESS &&
      this.props.organizationWiseDepartments.data?.departments
    ) {
      this.setState({
        departments: this.sortDepartments(
          JSON.parse(
            JSON.stringify(
              this.props.organizationWiseDepartments.data.departments
            )
          )
        ),
      });
    }
    if (prevProps.deploymentEnvs.status !== this.props.deploymentEnvs.status) {
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
    this.setState({
      selectedDepartment: -1,
      selectedProduct: -1,
      selectedEnv: -1,
    });
  };

  handleDepartmentCheck = (departmentID) => {
    this.setState(
      {
        selectedDepartment: departmentID,
        selectedProduct: -1,
        selectedEnv: -1,
      },
      () => {
        this.props.getProductsByDepId(this.state.selectedDepartment);
      }
    );
  };

  handleProductCheck = (product) => {
    this.setState({
      selectedProduct: product,
      selectedEnv: -1,
    });
  };

  handleEnvCheck = (env) => {
    this.setState({
      selectedEnv: env,
    });
  };

  renderDepartments = () => {
    let { departments, selectedDepartment } = this.state;
    let organizationStatus = this.props.organizationWiseDepartments.status;
    if (departments.length) {
      return departments.map((department, index) => {
        return (
          <Grid item lg={4} md={4} xs={4} key={v4()}>
            <Box className="d-flex align-items-center checkbox">
              <input
                className="checkbox-input"
                type="radio"
                name="department"
                checked={department.id === selectedDepartment}
                onChange={(e) => this.handleDepartmentCheck(department.id)}
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
    } else {
      return this.renderNoDataHtml(
        organizationStatus === status.FAILURE
          ? API_ERROR_MESSAGE
          : NO_DATA_FOUND
      );
    }
  };

  renderNoDataHtml = (text) => {
    return (
      <Box className="group-loader text-center  h-100  m-r-auto m-l-auto  p-t-20 p-b-20">
        <h5 className="m-t-0 m-b-0">{text}</h5>
      </Box>
    );
  };

  renderProducts = () => {
    const { productsByDepId } = this.props;
    const { selectedDepartment, selectedProduct } = this.state;
    if (
      productsByDepId &&
      productsByDepId.data &&
      productsByDepId.data.depId === selectedDepartment
    ) {
      return productsByDepId.data.products.map((product, innerIndex) => {
        return (
          <Grid item lg={4} md={4} xs={4} key={v4()}>
            <Box className="d-flex align-items-center">
              <input
                type="radio"
                name="product"
                value={product.name}
                checked={product.id === selectedProduct}
                onChange={(e) => this.handleProductCheck(product.id)}
              />
              <label
                htmlFor={product.name}
                onClick={(e) => this.handleProductCheck(product.id)}
              >
                {product.name}
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
    const { selectedEnv } = this.state;

    if (deploymentEnvs && deploymentEnvs.data) {
      return deploymentEnvs.data.map((item) => {
        return (
          <Grid item lg={3} md={4} xs={12} key={v4()}>
            <Box
              onClick={() => this.handleEnvCheck(item.name)}
              className={`
                environment-box 
                ${selectedEnv === item.name ? "active" : ""}`}
            >
              <Box className="d-block">
                <Box
                  className={`envir-image ${deploymentImgs[item.name]}`}
                ></Box>
                <Box className="environment-title">{item.name}</Box>
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
    let params = {};
    if (selectedDepartment !== -1) {
      params = {
        departmentId: selectedDepartment,
      };
      if (selectedProduct !== -1) {
        params.productId = selectedProduct;
        if (selectedEnv !== -1) {
          params.env = selectedEnv;
        }
      }
      this.props.getEnvsSummary(params);
      this.props.handleSubmitFilter({
        selectedDepartment,
        selectedProduct,
        selectedEnv,
      });
    }
  };

  handleClearFilters = () => {
    let { selectedDepartment } = this.props.selectedFilters;
    if (selectedDepartment !== -1) {
      this.props.getEnvsSummary();
    } else {
      this.props.togglePopup();
    }
    this.props.handleSubmitFilter({
      selectedDepartment: -1,
      selectedProduct: -1,
      selectedEnv: -1,
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
    const { selectedDepartment } = this.state;
    let { selectedFilters } = this.props;

    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className="select-account-modal-container"
      >
        <ModalHeader className="m-b-1 border-bottom">
          Filter
          <IconButton
            variant="outlined"
            aria-label="delete"
            size="small"
            className="close-btn"
            onClick={() => {
              this.props.togglePopup();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "300px" }}
        >
          <h4 className="text-left m-b-1 m-t-0 ">Select Department</h4>
          {this.props.organizationWiseDepartments.status ===
          status.IN_PROGRESS ? (
            <Loader className="filter-pop-loading" />
          ) : (
            <>
              <Box sx={{ width: "100%" }} className="p-b-10">
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
                  <Box className="border-top m-t-1">
                    <h4 className="text-left m-b-1 m-t-2">Select Product</h4>
                    <Box sx={{ width: "100%" }} className=" p-b-10">
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
                  </Box>
                </>
              ) : null}
            </>
          )}
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <Box className="d-block text-center">
            <LoadingButton
              className="secondary-btn m-r-2"
              variant="contained"
              onClick={this.handleClearFilters}
              disabled={
                selectedFilters.selectedDepartment === -1 &&
                this.props.envSummary.status === status.IN_PROGRESS
              }
              loading={
                selectedFilters.selectedDepartment === -1 &&
                this.props.envSummary.status === status.IN_PROGRESS
              }
            >
              Clear
            </LoadingButton>
            {selectedDepartment !== -1 ? (
              <LoadingButton
                disabled={
                  selectedFilters.selectedDepartment !== -1 &&
                  this.props.envSummary.status === status.IN_PROGRESS
                }
                loading={
                  selectedFilters.selectedDepartment !== -1 &&
                  this.props.envSummary.status === status.IN_PROGRESS
                }
                className="primary-btn min-width"
                variant="contained"
                onClick={this.handleSubmit}
              >
                Submit
              </LoadingButton>
            ) : null}
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    organizationWiseDepartments,
    deploymentEnvs,
    productsByDepId,
    envSummary,
  } = state.environments;
  return {
    organizationWiseDepartments,
    deploymentEnvs,
    productsByDepId,
    envSummary,
  };
};

const mapDispatchToProps = {
  getProductsByDepId,
  getOrgWiseDepartments,
  getEnvsSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPopup);
