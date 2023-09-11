import React, { Component } from "react";
import { Button, Box, Grid, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import topBottomArrow from "assets/img/assetmanager/top-bottom-arrow.png";
import BusinessAssociationMapping from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/Components/BusinessAssociationMapping";
import {
  addService,
  getExistingTags,
  deleteExistingTag,
} from "Redux/AssociateApp/AssociateAppThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import LoadingButton from "@mui/lab/LoadingButton";
import { withRouter } from "Views/AppViews/Environments/NewAccountSetup/AccountPolicy/withRouter";
import { ToastMessage } from "Toast/ToastMessage";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import {
  getCurrentOrgId,
  getCurrentOrgName,
  setCurrentOrgName,
  getCurrentUser,
} from "Utils";
import ConfirmationPopup from "Components/ConfirmationPopup";
import Loader from "Components/Loader";

const existingTagKeys = [
  "org",
  "dep",
  "product",
  "productEnv",
  "type",
  "module",
  "service",
];

export class AssociateChartApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectDepartmentOpen: false,
      isSelectProductOpen: false,
      activeLevels: {},
      clickBreadCrumbDetails: {},
      levelsData: [],
      productType: "",
      existingTags: [],
      showConfirmPopup: false,
      serviceId: 0,
    };
  }

  componentDidMount() {
    this.getTags();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.existingTags.status !== this.props.existingTags.status &&
      this.props.existingTags.status === status.SUCCESS &&
      this.props.existingTags.data
    ) {
      let { data: existingTags } = this.props.existingTags;
      this.setState({ existingTags });
    }

    if (
      prevProps.deleteTag.status !== this.props.deleteTag.status &&
      this.props.deleteTag.status === status.SUCCESS
    ) {
      if (this.props.deleteTag.data == "OK") {
        this.getTags();
        this.togglePopup();
        ToastMessage.success("Tag removed successfully.");
      } else {
        ToastMessage.success("Tag is not removed.");
      }
    }

    if (
      prevProps.serviceCreation.status !== this.props.serviceCreation.status &&
      this.props.serviceCreation.status === status.SUCCESS
    ) {
      if (this.props.serviceCreation.data.id) {
        const { landingZone, landingZoneId, cloudName } = this.getUrlDetails();
        this.props.navigate(
          `${APP_PREFIX_PATH}/environments/environmentlist?landingZone=${landingZone}&cloudName=${cloudName}&landingZoneId=${landingZoneId}`
        );
        ToastMessage.success("Service tagged successfully.");
      } else if (this.props.serviceCreation.status === status.FAILURE) {
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
    let { activeLevels, levelsData, serviceName } = this.state;
    let activeBAM = Object.keys(activeLevels);
    let breadcrumbs = serviceName
      ? [
          <>
            <li
              className={`${levelsData.length === 1 ? "active" : ""}`}
              onClick={() => {
                isBreadCrumb && levelsData.length ? (
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
            {isBreadCrumb && !levelsData.length ? (
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
        let label = activeLevels[bamItemKey]?.label;
        let type = activeLevels[bamItemKey]?.type;
        let productType = activeLevels[bamItemKey]?.productType || "";
        let currentLevelIndex = activeLevels[bamItemKey]?.id;
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
  getUrlDetails() {
    const queryPrm = new URLSearchParams(document.location.search);
    const elementType = queryPrm.get("elementType");
    const instanceId = queryPrm.get("instanceId");
    const cloudName = queryPrm.get("cloudName");
    const landingZoneId = queryPrm.get("landingZoneId");
    const landingZone = queryPrm.get("landingZone");

    return { instanceId, elementType, landingZone, landingZoneId, cloudName };
  }

  /**
   * Render Department or Product list
   *  @param {Number} isProduct - 1 if it is products, else 0 .
   */
  renderDepartmentsOrProducts(isProduct = 0) {
    let { levelsData } = this.state;
    if (levelsData.length) {
      return (
        levelsData[isProduct] &&
        levelsData[isProduct].map((item) => {
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

  // Add service API call
  onClickAddService = () => {
    const { instanceId } = this.getUrlDetails();
    const { productType: type } = this.state;
    const {
      activeLevels: {
        selectedLevel_0,
        selectedLevel_1,
        selectedLevel_2,
        selectedLevel_3,
        selectedLevel_4,
        selectedLevel_5,
      },
    } = this.state;
    let serviceId;

    let typeJson = {
      name: selectedLevel_3.label,
    };

    if (type === "SOA") {
      typeJson = {
        ...typeJson,
        module: {
          id: selectedLevel_4?.id,
          name: selectedLevel_4?.label,
          service: {
            id: selectedLevel_5?.id,
            name: selectedLevel_5?.label,
          },
        },
      };
      serviceId = selectedLevel_5?.id;
    } else if (type === "3 Tier") {
      typeJson = {
        ...typeJson,
        service: { id: selectedLevel_4?.id, name: selectedLevel_4?.label },
      };
      serviceId = selectedLevel_4?.id;
    }

    let paramsObj = {
      instanceId,
      serviceId,
      tag: {
        type,
        org: {
          id: getCurrentOrgId(),
          name: getCurrentOrgName()
            ? getCurrentOrgName()
            : this.setCurrentOrganizationName(),
          dep: {
            id: selectedLevel_0.id,
            name: selectedLevel_0.label,
            product: {
              id: selectedLevel_1.id,
              name: selectedLevel_1.label,
              productEnv: {
                id: selectedLevel_2.id,
                name: selectedLevel_2.label,
                type: typeJson,
              },
            },
          },
        },
      },
    };

    this.props.addService(JSON.stringify(paramsObj));
  };

  /** Set current organization name in local storage */
  setCurrentOrganizationName() {
    let currentUser = getCurrentUser();
    if (currentUser) {
      try {
        setCurrentOrgName(currentUser.info.user.organization.name);
        return currentUser.info.user.organization.name;
      } catch (e) {
        console.error(e);
      }
    }
  }

  /** Render the exisiting tag body. */
  renderTagBody() {
    let { existingTags } = this.state;
    let { status: tagStatus } = this.props.existingTags;

    if (tagStatus === status.IN_PROGRESS) {
      return <Loader className="h-100 text-center" />;
    } else if (existingTags.length) {
      return existingTags.map((tag, index) => (
        <ul key={v4()}>{this.renderTags(tag.tag, tag.tag.type)}</ul>
      ));
    } else {
      return "There is no existing tag";
    }
  }

  /**
   *   Render exisiting tags
   *  @param {Object} tags - tag object
   *  @param {String} type - tag type - 1. SOA, 2. 3-Tier
   * */
  renderTags = (tags, type) => {
    let tempTag = tags;
    let updateExistingTagIf3Tier =
      type === "3 Tier"
        ? existingTagKeys.filter((key) => key !== "module")
        : existingTagKeys;

    if (tempTag) {
      return updateExistingTagIf3Tier.map((tag) => {
        tempTag = tempTag[tag];
        return (
          <>
            <li key={v4()}>
              <a>{tempTag.name}</a>
            </li>
            {tag === "service" ? (
              <li style={{ float: "right" }} key={v4()}>
                <Button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => {
                    this.setState({
                      showConfirmPopup: true,
                      serviceId: tempTag.id,
                    });
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </Button>
              </li>
            ) : (
              <></>
            )}
          </>
        );
      });
    }
  };

  // toggle confirmation popup
  togglePopup = () => {
    let { showConfirmPopup, serviceId } = this.state;
    this.setState({
      showConfirmPopup: !showConfirmPopup,
      serviceId: showConfirmPopup ? 0 : serviceId,
    });
  };

  // Get existing tags
  getTags() {
    const { instanceId, landingZoneId } = this.getUrlDetails();
    this.props.getExistingTags({ instanceId, landingZoneId });
  }

  // Delete tag API call
  handleDeleteTag = () => {
    let { serviceId } = this.state;
    let { landingZoneId, instanceId } = this.getUrlDetails();
    this.props.deleteExistingTag({ landingZoneId, instanceId, serviceId });
  };

  render() {
    const {
      isSelectDepartmentOpen,
      isSelectProductOpen,
      clickBreadCrumbDetails,
      activeLevels,
      productType,
      showConfirmPopup,
    } = this.state;

    const { selectedLevel_0, selectedLevel_1 } = activeLevels;
    const departmentName = selectedLevel_0?.label || "";
    const productName = selectedLevel_1?.label || "";
    const activeLevelLength = Object.keys(activeLevels).length;

    const showBtn =
      productType === "SOA" ? activeLevelLength === 6 : activeLevelLength === 5;
    const {
      serviceCreation: { status: serviceCreationStatus },
      deleteTag: { status: deleteTagStatus },
    } = this.props;

    const { instanceId, elementType, landingZone, landingZoneId, cloudName } =
      this.getUrlDetails();

    return (
      <Box className="environment-container associate-container">
        <Box className="list-heading">
          <h3>
            Business Association Mapping ({elementType}:{instanceId})
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
                  to={`${APP_PREFIX_PATH}/environments/environmentlist?landingZone=${landingZone}&cloudName=${cloudName}&landingZoneId=${landingZoneId}`}
                >
                  {cloudName} &nbsp;(
                  {landingZone})
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">
                {elementType}:{instanceId}
              </li>
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
            setBreadCrumbs={(
              activeLevels,
              levelsData,
              serviceName,
              productType
            ) => {
              this.setState({
                activeLevels,
                levelsData,
                serviceName,
                productType,
              });
            }}
            clickBreadCrumbDetails={clickBreadCrumbDetails}
          />
        </Box>
        <Box className="d-block width-100 text-center top-bottom-arrow">
          <img src={topBottomArrow} alt="" />
        </Box>
        <Box className="infra-existing">
          <div className="heading">Infra Existing tags of element</div>
          <Box className="breadcrumbs">{this.renderTagBody()}</Box>
        </Box>
        <Box className="d-block width-100 text-center m-t-4">
          {showBtn ? (
            <LoadingButton
              className="primary-btn min-width"
              onClick={this.onClickAddService}
              disabled={serviceCreationStatus === status.IN_PROGRESS}
              loading={serviceCreationStatus === status.IN_PROGRESS}
              loadingPosition="start"
              variant="contained"
            >
              Add Service
            </LoadingButton>
          ) : (
            <></>
          )}
        </Box>
        {showConfirmPopup ? (
          <ConfirmationPopup
            showModal={showConfirmPopup}
            togglePopup={this.togglePopup}
            labels={{
              btnYes: "Yes",
              description: "Are you sure delete the tag ? ",
              btnNo: "Cancel",
            }}
            handleCallBack={this.handleDeleteTag}
            showLoader={deleteTagStatus === status.IN_PROGRESS}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { serviceCreation, existingTags, deleteTag } = state.associateApp;
  return {
    serviceCreation,
    existingTags,
    deleteTag,
  };
}

const mapDispatchToProps = {
  getExistingTags,
  addService,
  deleteExistingTag,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssociateChartApp)
);
