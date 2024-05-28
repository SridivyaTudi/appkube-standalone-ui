import React, { Component, Fragment } from "react";
import { Button, Box, Grid, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import topBottomArrow from "assets/img/assetmanager/top-bottom-arrow.png";
import BusinessAssociationMapping from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/Components/BusinessAssociationMapping";
import {
  addService,
  getExistingTags,
  deleteExistingTag,
  getProductList,
  getProductEnv,
  getModules,
  getModuleElements,
  getModulesOf3Tier,
} from "Redux/AssociateApp/AssociateAppThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastMessage } from "Toast/ToastMessage";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import {
  getCurrentOrgId,
  getCurrentOrgName,
  setCurrentOrgName,
  getCurrentUser,
  deleteSelectedInfraTopologyView,
  PRODUCT_CATEGORY_ENUM,
} from "Utils";
import ConfirmationPopup from "Components/ConfirmationPopup";
import Loader from "Components/Loader";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {
  API_ERROR_MESSAGE,
  NO_DATA_FOUND,
  SERVICE_TYPE,
  THREE_TIER_LAYERS,
} from "CommonData";
import RBAC_MAPPING from "Utils/RbacMapping";
import Rbac from "Views/AppViews/Rbac";

const existingTagKeys = [
  "org",
  "dep",
  "product",
  "productEnv",
  "type",
  "module",
  "service",
];
const productCategory = {
  [`${PRODUCT_CATEGORY_ENUM.THREE_TIER}`]: [
    THREE_TIER_LAYERS.WEB_LAYER,
    THREE_TIER_LAYERS.APP_LAYER,
    THREE_TIER_LAYERS.DATA_LAYER,
    THREE_TIER_LAYERS.AUXILARY_LAYER,
  ],
  SOA: [SERVICE_TYPE.BUSINESS, SERVICE_TYPE.COMMON],
};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 280,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
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
      resetBreadCrumb: "",
      selectedExistingTag: {},
      selectedServiceId: "",
      existingTagServiceIds: [],
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
      this.setExistingTagServiceIds(existingTags);
    }

    if (
      prevProps.deleteTag.status !== this.props.deleteTag.status &&
      this.props.deleteTag.status === status.SUCCESS
    ) {
      if (this.props.deleteTag.data === "OK") {
        this.getTags();
        this.togglePopup();
        ToastMessage.success("Tag removed successfully.");
      } else {
        ToastMessage.error("Tag is not removed.");
      }
    }

    if (
      prevProps.serviceCreation.status !== this.props.serviceCreation.status &&
      this.props.serviceCreation.status === status.SUCCESS
    ) {
      if (this.props.serviceCreation.data.id) {
        this.setState({ resetBreadCrumb: v4() });
        this.getTags();
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
  renderBreadCrumbs() {
    let { activeLevels, levelsData, serviceName } = this.state;
    let activeBAM = Object.keys(activeLevels);
    let breadcrumbs = serviceName
      ? [
          <Fragment key={v4()}>
            <li
              className={`${levelsData.length === 1 ? "active" : ""}`}
              onClick={() => {
                levelsData.length ? (
                  this.setState({
                    clickBreadCrumbDetails: {
                      type: "Synectiks",
                      breadcrumbId: v4(),
                    },
                    selectedServiceId: "",
                  })
                ) : (
                  <></>
                );
              }}
              key={v4()}
            >
              <span>{serviceName}</span>
            </li>
            {!levelsData.length ? (
              <li key={v4()}>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
            ) : (
              <></>
            )}
          </Fragment>,
        ]
      : [];

    if (activeBAM.length) {
      activeBAM.forEach((bamItemKey, index) => {
        let label = activeLevels[bamItemKey]?.label;
        let type = activeLevels[bamItemKey]?.type;
        let productType = activeLevels[bamItemKey]?.productType || "";
        let currentLevelIndex = activeLevels[bamItemKey]?.id;
        let selectedLevel = +bamItemKey.split("_")?.[1];
        breadcrumbs.push(
          <Fragment key={v4()}>
            <li key={v4()}>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li
              className={`${activeBAM.length === index ? "active" : ""}`}
              onClick={() => {
                this.setState({
                  clickBreadCrumbDetails: {
                    selectedLevel,
                    currentLevelIndex,
                    label,
                    type,
                    productType,
                    breadcrumbId: v4(),
                  },
                  selectedServiceId: "",
                });
              }}
              key={v4()}
            >
              <span>{label}</span>
            </li>
          </Fragment>
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
    let { levelsData, activeLevels } = this.state;
    let { selectedLevel_0, selectedLevel_1 } = activeLevels;
    if (levelsData.length) {
      return (
        levelsData[isProduct] &&
        levelsData[isProduct].map((item) => {
          let productType = item.productType || "";

          let activeClass = isProduct
            ? selectedLevel_1?.id === item.id
              ? "active"
              : ""
            : selectedLevel_0?.id === item.id
            ? "active"
            : "";
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
                  selectedServiceId: "",
                });
              }}
              className={activeClass}
            >
              <i className="fa-solid fa-circle-dot"></i>
              <HtmlTooltip className="table-tooltip" title={item.label}>
                <span>{item.label}</span>
              </HtmlTooltip>
            </ListItem>
          );
        })
      );
    }
  }

  // Add service API call
  onClickAddService = () => {
    const { instanceId, landingZoneId } = this.getUrlDetails();
    const {
      activeLevels: {
        selectedLevel_0,
        selectedLevel_1,
        selectedLevel_2,
        selectedLevel_3,
        selectedLevel_4,
        selectedLevel_5,
      },
      productType: type,
    } = this.state;
    let serviceId;

    let typeJson = {
      name: selectedLevel_3.label,
    };

    if (type?.toUpperCase() === PRODUCT_CATEGORY_ENUM.SOA) {
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
    } else if (type?.toUpperCase() === PRODUCT_CATEGORY_ENUM.THREE_TIER) {
      typeJson = {
        ...typeJson,
        service: { id: selectedLevel_4?.id, name: selectedLevel_4?.label },
      };
      serviceId = selectedLevel_4?.id;
    }

    let paramsObj = {
      instanceId,
      serviceId,
      landingZoneId: parseInt(landingZoneId),
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
      return <Loader className="h-100 text-center" key={v4()} />;
    } else if (existingTags.length) {
      return existingTags.map((tag, index) => (
        <ul
          key={v4()}
          onClick={(e) => {
            let type =
              PRODUCT_CATEGORY_ENUM.THREE_TIER === tag.tag.type?.toUpperCase()
                ? PRODUCT_CATEGORY_ENUM.THREE_TIER
                : PRODUCT_CATEGORY_ENUM.SOA;
            e.target?.attributes?.name?.value !== "deleteBtn" &&
              this.onClickExistingTag(tag.tag, type);
          }}
        >
          {this.renderTags(tag.tag, tag.tag.type)}
        </ul>
      ));
    } else {
      return tagStatus === status.FAILURE ? API_ERROR_MESSAGE : NO_DATA_FOUND;
    }
  }

  /**
   *   Render exisiting tags
   *  @param {Object} tags - tag object
   *  @param {String} type - tag type - 1. SOA, 2. 3-Tier
   * */
  renderTags = (tags, type) => {
    let tempTag = tags;
    let tagKeys = this.filterExistingTagKeys(type);
    const { CLONE_PRODUCT_ENVIRONMENT, DELETE_PRODUCT_ENVIRONMENT } =
      RBAC_MAPPING;
    if (tempTag) {
      return tagKeys.map((tag) => {
        tempTag = tempTag[tag];
        return (
          <Fragment key={v4()}>
            <li key={v4()} className={this.findActiveTag(tags, type)}>
              <span>{tempTag.name}</span>
            </li>
            {tag === "service" ? (
              <li style={{ float: "right" }} key={v4()} name={"deleteBtn"}>
                <Rbac
                  permissions={[
                    CLONE_PRODUCT_ENVIRONMENT,
                    DELETE_PRODUCT_ENVIRONMENT,
                  ]}
                >
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
                    name={"deleteBtn"}
                  >
                    <i className="fa-solid fa-xmark" name={"deleteBtn"}></i>
                  </Button>
                </Rbac>
              </li>
            ) : (
              <></>
            )}
          </Fragment>
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

  /**
   *   Fire event exisiting tags
   *  @param {Object} tags - tag object
   *  @param {String} type - tag type - 1. SOA, 2. 3-Tier
   * */
  onClickExistingTag = (tags, type) => {
    let tempTag = tags;
    let tagKeys = this.filterExistingTagKeys(type);

    let activeLevels = {};
    let selectedServiceId = "";

    if (tempTag) {
      tagKeys.forEach((tag, index) => {
        tempTag = tempTag[tag];
        if (index) {
          if (tag === "service") {
            selectedServiceId = tempTag?.id;
          }

          activeLevels[`selectedLevel_${index - 1}`] = {
            label: tempTag?.name,
            id:
              tag === "type"
                ? this.getTypeId(tempTag?.name, type)
                : tempTag?.id,
            productType: type,
          };
        }
      });
    }

    this.setState({
      selectedExistingTag: { activeLevels, type },
      selectedServiceId,
    });
  };

  // Type -(BUSINESS,COMMON) return id
  getTypeId = (name, type) => {
    return productCategory[type?.toUpperCase()].findIndex((label) => {
      let labelformat = label.replace(" Layer", "")?.toLowerCase();
      let nameformat = name.replace(" Layer", "")?.toLowerCase();

      return labelformat === nameformat || labelformat.startsWith(nameformat);
    });
  };

  // Find active tag and return active class
  findActiveTag = (tag, type) => {
    let tempTag = tag;
    let activeClass = "";

    let { selectedServiceId } = this.state;
    let tagKeys = this.filterExistingTagKeys(type);

    if (selectedServiceId) {
      tagKeys.forEach((tagName) => {
        tempTag = tempTag[tagName];
        if (tagName === "service" && tempTag.id === selectedServiceId) {
          activeClass = "active";
        }
      });
    }

    return activeClass;
  };

  // set Existing Tag ServiceIds  in state
  setExistingTagServiceIds = (existingTags = []) => {
    if (existingTags.length) {
      let collectServiceIds = [];
      existingTags.forEach((tags, index) => {
        let tagKeys = this.filterExistingTagKeys(tags.tag.type);
        let tempTag = tags.tag;
        tagKeys.forEach((tag, index) => {
          tempTag = tempTag?.[tag];
          if (tag === "service") {
            collectServiceIds.push(tempTag?.id);
          }
        });
      });
      this.setState({ existingTagServiceIds: collectServiceIds });
    }
  };

  // update ExistingTag If product is 3Tier
  filterExistingTagKeys = (type) => {
    return type?.toUpperCase() === PRODUCT_CATEGORY_ENUM.THREE_TIER
      ? existingTagKeys.filter((key) => key !== "module")
      : existingTagKeys;
  };
  render() {
    const {
      isSelectDepartmentOpen,
      isSelectProductOpen,
      clickBreadCrumbDetails,
      activeLevels,
      productType,
      showConfirmPopup,
      resetBreadCrumb,
      selectedExistingTag,
      existingTagServiceIds,
    } = this.state;

    const {
      selectedLevel_0,
      selectedLevel_1,
      selectedLevel_4,
      selectedLevel_5,
    } = activeLevels;
    const departmentName = selectedLevel_0?.label || "";
    const productName = selectedLevel_1?.label || "";

    const showBtn =
      productType?.toUpperCase() === PRODUCT_CATEGORY_ENUM.SOA
        ? selectedLevel_5?.id &&
          !existingTagServiceIds.includes(selectedLevel_5.id)
        : selectedLevel_4?.id &&
          !existingTagServiceIds.includes(selectedLevel_4.id);
    const {
      serviceCreation: { status: serviceCreationStatus },
      deleteTag: { status: deleteTagStatus },
    } = this.props;

    const { instanceId, elementType, landingZone, landingZoneId, cloudName } =
      this.getUrlDetails();

    return (
      <Box className="environment-container associate-container">
        <Box className="list-heading">
          <HtmlTooltip
            className="table-tooltip"
            title={
              <React.Fragment>
                <Box className="list-heading-tooltip">
                  Business Association Mapping ({elementType}:{instanceId})
                </Box>
              </React.Fragment>
            }
          >
            <h3>
              Business Association Mapping ({elementType}:{instanceId})
            </h3>
          </HtmlTooltip>

          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link
                  to={`${APP_PREFIX_PATH}/assets/environments`}
                  onClick={() => deleteSelectedInfraTopologyView()}
                >
                  Environments
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <Link
                  to={`${APP_PREFIX_PATH}/assets/environments/environmentlist?landingZone=${landingZone}&cloudName=${cloudName}&landingZoneId=${landingZoneId}`}
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
            resetBreadCrumbId={resetBreadCrumb}
            selectedExistingTag={selectedExistingTag}
            serviceIdReset={() => {
              this.setState({ selectedServiceId: "" });
            }}
          />
        </Box>
        <Box className="d-block width-100 text-center top-bottom-arrow">
          <img src={topBottomArrow} alt="" />
        </Box>
        <Box className="infra-existing">
          <div className="heading">Infra Existing tags of element</div>
          <Box className="breadcrumbs" key={v4()}>
            {this.renderTagBody()}
          </Box>
        </Box>
        <Box className="d-block width-100 text-center m-t-4">
          {showBtn ? (
            <LoadingButton
              className="primary-btn min-width"
              onClick={this.onClickAddService}
              disabled={serviceCreationStatus === status.IN_PROGRESS}
              loading={serviceCreationStatus === status.IN_PROGRESS}
              // loadingPosition="start"
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
              header: "Are you sure delete the tag ? ",
              btnNo: "Cancel",
            }}
            icon={<i className="fas fa-trash-alt"></i>}
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
  getProductList,
  getProductEnv,
  getModules,
  getModuleElements,
  getModulesOf3Tier,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssociateChartApp);
