import React, { Component } from "react";
import { Button, Box, Grid, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import chartLogo from "assets/img/assetmanager/chart-logo.png";
import calendarMouseIcon from "assets/img/assetmanager/calendar-mouse-icon.png";
import databaseIcon from "assets/img/assetmanager/database-icon.png";
import BusinessAssociationMapping from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/Components/BusinessAssociationMapping";
import { createAssociate } from "Redux/AssociateApp/AssociateAppThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import LoadingButton from "@mui/lab/LoadingButton";
import { withRouter } from "Views/AppViews/Environments/NewAccountSetup/AccountPolicy/withRouter";
import { ToastMessage } from "Toast/ToastMessage";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
export class AssociateChartApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectDepartmentOpen: false,
      isSelectProductOpen: false,
      selectedActiveBAMLevels: {},
      clickBreadCrumbDetails: {},
      BAMData: [],
      resetBreadCrumb: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.associateCreation.status !== this.props.associateCreation.status
    ) {
      if (
        this.props.associateCreation.status === status.SUCCESS &&
        this.props.associateCreation?.data?.id
      ) {
        const landingZone = localStorage.getItem("landingZone");
        const cloudName = localStorage.getItem("cloudName");
        this.props.navigate(
          `${APP_PREFIX_PATH}/environments/environmentlist?landingZone=${landingZone}&cloudName=${cloudName}`
        );
        ToastMessage.success("Service tagged successfully.");
        localStorage.removeItem("landingZone");
        localStorage.removeItem("cloudName");
      } else if (this.props.associateCreation.status === status.FAILURE) {
        ToastMessage.error("Service is not tag  successfully.");
      }
    }
  }

  toggleSelectDepartment = () => {
    this.setState({
      isSelectDepartmentOpen: !this.state.isSelectDepartmentOpen,
    });
  };

  toggleSelectProduct = () => {
    this.setState({
      isSelectProductOpen: !this.state.isSelectProductOpen,
    });
  };

  /** Render the BreadCrumbs. */
  renderBreadCrumbs(isBreadCrumb = 1) {
    let { selectedActiveBAMLevels, BAMData, serviceName } = this.state;

    let activeBAM = Object.keys(selectedActiveBAMLevels);

    let breadcrumbs = serviceName
      ? [
          <>
            <li
              className={`${BAMData.length === 1 ? "active" : ""}`}
              onClick={() => {
                isBreadCrumb ? (
                  this.setState({
                    clickBreadCrumbDetails: {
                      type: "Synectiks",
                      breadcrumbId: v4(),
                    },
                  })
                ) : (
                  <></>
                );
              }}
              key={v4()}
            >
              <a>{serviceName}</a>
            </li>
            {isBreadCrumb && !BAMData.length ? (
              <li key={v4()}>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
            ) : (
              <></>
            )}
          </>,
        ]
      : [];

    if (activeBAM.length) {
      activeBAM.map((bamItemKey, index) => {
        let label = selectedActiveBAMLevels[bamItemKey]?.label;
        let type = selectedActiveBAMLevels[bamItemKey]?.type;
        let productType =
          selectedActiveBAMLevels[bamItemKey]?.productType || "";
        let currentLevelIndex = selectedActiveBAMLevels[bamItemKey]?.id;
        let selectedLevel = +bamItemKey.split("_")?.[1];
        breadcrumbs.push(
          <>
            {isBreadCrumb ? (
              <li key={v4()}>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
            ) : (
              <></>
            )}

            <li
              className={`${activeBAM.length === index ? "active" : ""}`}
              onClick={() => {
                isBreadCrumb ? (
                  this.setState({
                    clickBreadCrumbDetails: {
                      selectedLevel,
                      currentLevelIndex,
                      label,
                      type,
                      productType,
                      breadcrumbId: v4(),
                    },
                  })
                ) : (
                  <></>
                );
              }}
              key={v4()}
            >
              <a>{label}</a>
            </li>
          </>
        );
      });
    }
    return breadcrumbs;
  }

  /** Get associateId Or Type. */
  getAssociateIdOrType() {
    const queryPrm = new URLSearchParams(document.location.search);
    const elementType = queryPrm.get("elementType");
    const instanceId = queryPrm.get("instanceId");

    return { instanceId, elementType };
  }
  /**
   * Render Department or Product list
   *  @param {Number} isProduct - 1 if it is products, else 0 .
   */
  renderDepartmentsOrProducts(isProduct = 0) {
    let { BAMData } = this.state;
    if (BAMData.length) {
      return (
        BAMData[isProduct] &&
        BAMData[isProduct].map((item) => {
          let productType = item.productType || "";
          return (
            <ListItem
              key={v4()}
              onClick={() => {
                this.setState({
                  clickBreadCrumbDetails: {
                    selectedLevel: isProduct,
                    currentLevelIndex: item.id,
                    label: item.label,
                    type: isProduct ? "Product" : "Department",
                    productType,
                    breadcrumbId: v4(),
                  },
                });
              }}
            >
              <i className="fa-solid fa-circle-dot"></i>
              {item.label}
            </ListItem>
          );
        })
      );
    }
  }

  onClickSubmit = () => {
    const { instanceId } = this.getAssociateIdOrType();
    const {
      selectedActiveBAMLevels: {
        selectedLevel_5: { id: serviceId },
      },
    } = this.state;
    this.props.createAssociate(JSON.stringify({ instanceId, serviceId }));
  };
  render() {
    const {
      isSelectDepartmentOpen,
      isSelectProductOpen,
      clickBreadCrumbDetails,
      selectedActiveBAMLevels,
      resetBreadCrumb,
    } = this.state;
    const departmentName = selectedActiveBAMLevels["selectedLevel_0"]
      ? selectedActiveBAMLevels["selectedLevel_0"].label
      : "";
    const productName = selectedActiveBAMLevels["selectedLevel_1"]
      ? selectedActiveBAMLevels["selectedLevel_1"].label
      : "";
    const { associateCreation } = this.props;
    return (
      <Box className="environment-container associate-container">
        <Box className="list-heading">
          <h3>
            Business Association Mapping (
            {this.getAssociateIdOrType().elementType}:
            {this.getAssociateIdOrType().instanceId})
          </h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`${APP_PREFIX_PATH}/environments`}>Environments</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <Link
                  to={`${APP_PREFIX_PATH}/environments/environmentlist?landingZone=1234&cloudName=AWS`}
                >
                  Environments List
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">AWS</li>
            </ul>
          </Box>
        </Box>
        <Box className="mapping-breadcrumbs">
          <ul>{this.renderBreadCrumbs()}</ul>
        </Box>
        <Box className="associate-chart-container">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <Box className="text-right">
                <Box className="mapping-fliter">
                  <Box
                    className="fliter-toggel"
                    onClick={this.toggleSelectDepartment}
                  >
                    {departmentName ? departmentName : "Select Department"}
                    <i className="fa-solid fa-caret-down arrow-icon"></i>
                  </Box>
                  <Box
                    className={
                      isSelectDepartmentOpen
                        ? "fliter-collapse active"
                        : "fliter-collapse"
                    }
                  >
                    <List>{this.renderDepartmentsOrProducts()}</List>
                  </Box>
                  <div
                    className={
                      isSelectDepartmentOpen
                        ? "fliters-collapse-bg active"
                        : "fliters-collapse-bg"
                    }
                    onClick={this.toggleSelectDepartment}
                  />
                </Box>
                <Box className="mapping-fliter m-r-0">
                  <Box
                    className="fliter-toggel"
                    onClick={this.toggleSelectProduct}
                  >
                    {productName ? productName : "Select Product"}
                    <i className="fa-solid fa-caret-down arrow-icon"></i>
                  </Box>
                  <Box
                    className={
                      isSelectProductOpen
                        ? "fliter-collapse active"
                        : "fliter-collapse"
                    }
                    style={{ right: 0, left: "auto" }}
                  >
                    <List>{this.renderDepartmentsOrProducts(1)}</List>
                  </Box>
                  <div
                    className={
                      isSelectProductOpen
                        ? "fliters-collapse-bg active"
                        : "fliters-collapse-bg"
                    }
                    onClick={this.toggleSelectProduct}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <BusinessAssociationMapping
            setBreadCrumbs={(selectedActiveBAMLevels, BAMData, serviceName) => {
              this.setState({
                selectedActiveBAMLevels,
                BAMData,
                serviceName,
              });
            }}
            clickBreadCrumbDetails={clickBreadCrumbDetails}
            resetBreadCrumbId={resetBreadCrumb}
          />
        </Box>
        <Box className="infra-existing">
          <div className="heading">Infra Existing tags of element</div>
          <Box className="breadcrumbs">
            <ul>{this.renderBreadCrumbs(0)}</ul>
            <Button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => {
                this.setState({ resetBreadCrumb: v4() });
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </Button>
          </Box>
        </Box>
        <Box className="d-block width-100 text-center m-t-4">
          {Object.keys(selectedActiveBAMLevels).length === 6 ? (
            <LoadingButton
              className="primary-btn min-width"
              onClick={this.onClickSubmit}
              disabled={
                associateCreation.status === status.IN_PROGRESS ? true : false
              }
              loading={
                associateCreation.status === status.IN_PROGRESS ? true : false
              }
              loadingPosition="start"
              variant="contained"
            >
              Add Service
            </LoadingButton>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { associateCreation } = state.associateApp;
  return {
    associateCreation,
  };
}

const mapDispatchToProps = {
  createAssociate,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssociateChartApp)
);
