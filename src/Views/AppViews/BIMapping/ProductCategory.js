import React, { Component } from "react";
import { Box, Button, IconButton, Grid } from "@mui/material";
import admissionIcon from "assets/img/bimapping/admission.png";
import searchIcon from "assets/img/bimapping/search.png";
import rbacIcon from "assets/img/bimapping/rbac.png";
import ServiceModal from "./Components/ServiceModal";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { setProductIntoDepartment } from "Redux/BIMapping/BIMappingSlice";
import { connect } from "react-redux";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { v4 } from "uuid";
import { ToastMessage } from "Toast/ToastMessage";
import LoadingButton from "@mui/lab/LoadingButton";
import status from "Redux/Constants/CommonDS";
import { createBiMapping } from "Redux/BIMapping/BIMappingThunk";
import { getCurrentOrgId } from "Utils";

const orgId = getCurrentOrgId();
class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showServiceModal: false,
      activeCommonService: [],
    };
  }

  componentDidMount = () => {
    window.addEventListener("load", this.redirectPage);
  };

  componentWillUnmount() {
    window.removeEventListener("load", this.redirectPage);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.creationBiMapping.status !==
        this.props.creationBiMapping.status &&
      this.props.creationBiMapping.status === status.SUCCESS
    ) {
      if (this.props.creationBiMapping?.data) {
        ToastMessage.success("Created Product of BI-Mapping.");
        this.props.navigate(`${APP_PREFIX_PATH}/bim`);
      } else {
        ToastMessage.error("Creation Of Add BI-mapping Failed.");
      }
    }
  }
  redirectPage = () => {
    let { name: departMentName, id } = this.getUrlDetails();

    this.props.navigate(
      `${APP_PREFIX_PATH}/bim/add-product/${departMentName}/${id}`
    );
  };

  handleServiceModal = () => {
    this.setState({
      showServiceModal: !this.state.showServiceModal,
    });
  };
  /** Get url details. */
  getUrlDetails() {
    let name = this.props.params.name;
    let id = this.props.params.id;
    return { name, id };
  }
  // Move to next page
  moveToNextPage = (serviceType) => {
    let { createProductFormData } = this.props;
    let { name: departMentName, id } = this.getUrlDetails();
    let { activeCommonService } = this.state;

    if (
      serviceType === "common" &&
      !createProductFormData.currentCommonService
    ) {
      ToastMessage.error("Please select the one of the common service.");
      return 0;
    }
    this.props.navigate(
      `${APP_PREFIX_PATH}/bim/add-product/${departMentName}/${id}/product-category/${createProductFormData?.category
        ?.toLowerCase()
        ?.replace(" ", "-")}`
    );
    this.props.setProductIntoDepartment({
      ...createProductFormData,
      serviceType,
      editServiceId: -1,
      activeCommonService,
    });
  };

  renderBusinessService = () => {
    let soaData = this.props.createProductFormData.soaData || [];
    if (soaData.length) {
      return soaData.map((soa, index) => {
        if (soa.service !== "common") {
          return (
            <Box className="product-category-card" key={v4()}>
              <Box className="d-flex icon-buttons">
                <IconButton
                  className="edit-icon"
                  onClick={() => this.onClickEditIconBusinessService(index)}
                >
                  <i class="fas fa-edit"></i>
                </IconButton>
                <IconButton
                  className="close-icon"
                  onClick={() => this.onClickCloseBtn(index)}
                >
                  <i class="fas fa-close"></i>
                </IconButton>
              </Box>
              <Box className="product-category-details">
                <Box className="product-image">
                  <img src={admissionIcon} alt="" />
                </Box>
                <span className="d-block name">{soa.module}</span>
              </Box>
            </Box>
          );
        } else {
          return null;
        }
      });
    }
  };

  onClickEditIconBusinessService = (editServiceId) => {
    let { createProductFormData } = this.props;
    let passData = JSON.parse(
      JSON.stringify({
        ...createProductFormData,
        editServiceId,
      })
    );
    this.props.setProductIntoDepartment(passData);
    let { name, id } = this.getUrlDetails();
    this.props.navigate(
      `/app/bim/add-product/${name}/${id}/product-category/soa`
    );
  };

  onClickEditIconCommonService = (editServiceId) => {
    let { createProductFormData } = this.props;
    let passData = JSON.parse(
      JSON.stringify({
        ...createProductFormData,
        editServiceId,
      })
    );
    this.props.setProductIntoDepartment(passData);
    let { name, id } = this.getUrlDetails();
    this.props.navigate(
      `/app/bim/add-product/${name}/${id}/product-category/soa`
    );
  };

  onClickCloseBtn = (index) => {
    let { createProductFormData } = this.props;
    let soaData = JSON.parse(
      JSON.stringify(createProductFormData.soaData || [])
    );
    if (soaData.length) {
      soaData = soaData.filter((soa, soaIndex) => soaIndex !== index);
      let passData = JSON.parse(
        JSON.stringify({
          ...createProductFormData,
          soaData,
          "3_tierData": null,
        })
      );
      this.props.setProductIntoDepartment(passData);
    }
  };

  isCommonServiceAdded = (keys) => {
    try {
      let { createProductFormData } = this.props;
      let isExist = false;
      if (createProductFormData.soaData?.length) {
        createProductFormData.soaData.forEach((element) => {
          if (keys.includes(element.currentCommonService)) {
            isExist = true;
          }
        });
        return isExist;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  isBothCommonServiceAdded = () => {
    return (
      this.isCommonServiceAdded(["search"]) &&
      this.isCommonServiceAdded(["security"])
    );
  };

  onClickSave = () => {
    let { id } = this.getUrlDetails();
    let { selectedServiceData } = this.state;
    let {
      createProductFormData: {
        productName,
        environment,
        moduleName,
        serviceType,
        soaData = [],
      },
    } = this.props;
    let business = [];
    let common = [];
    if (soaData?.length) {
      soaData.forEach((soa) => {
        let { service: serviceCategory } = soa;
        let { savedData, selectedServiceData } = soa.values;

        savedData.forEach((service) => {
          let appendData = {
            name: selectedServiceData[service.serviceName],
            type: service.serviceName?.toUpperCase(),
            cloudElementMapping: {
              id: service.selectedInstance,
              managementInfo: service.managementInfo
                .map((management) => {
                  let { isSubValue, key, value } = management;
                  if (!isSubValue) {
                    let formatData = {
                      key,
                      value,
                    };
                    return formatData;
                  }
                })
                .filter((obj) => obj),
              configInfo: service.configInfo.map((config) => {
                let { key, value } = config;

                let formatData = {
                  key,
                  value,
                };
                return formatData;
              }),
            },
          };
          if (serviceCategory === "business") {
            business.push(appendData);
          } else {
            common.push(appendData);
          }
        });
      });
    }

    let params = {
      org: {
        id: +orgId,
        dep: {
          id: +id,
          product: {
            name: productName,
            type: "SOA",
            productEnv: {
              name: environment,
              module: {
                name: moduleName,
                service: {
                  business,
                  common,
                },
              },
            },
          },
        },
      },
    };

    this.props.createBiMapping(params);
  };
  render() {
    const { showServiceModal, activeCommonService } = this.state;
    let { createProductFormData, creationBiMapping } = this.props;

    let { name: departMentName, id } = this.getUrlDetails();
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Product Category</h3>
          <Box className="breadcrumbs">
            <ul>
              <li onClick={() => this.props.navigate("/app/bim")}>
                BI-Mapping
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li
                onClick={() =>
                  this.props.navigate(
                    `/app/bim/add-product/${departMentName}/${id}`
                  )
                }
              >
                Add Product
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Product Category</li>
            </ul>
          </Box>
        </Box>

        <Box className="product-category-container">
          <Box className="d-block">
            <Box className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Business Services</h3>

                <Button
                  className="primary-btn"
                  onClick={() => this.moveToNextPage("business")}
                >
                  Add
                </Button>
              </Box>
            </Box>
            <Box className="product-category-cards">
              <Box className="product-category-inner">
                {this.renderBusinessService()}
              </Box>
            </Box>
          </Box>
          <Box className="d-block">
            <Box className="product-title-card">
              <Box className="d-flex justify-content-between align-items-center">
                <h3>Common Services</h3>

                <LoadingButton
                  className="primary-btn"
                  variant="contained"
                  onClick={() => this.moveToNextPage("common")}
                  disabled={this.isBothCommonServiceAdded()}
                >
                  Add
                </LoadingButton>
              </Box>
            </Box>
            <Box className="product-category-cards">
              <Box className="product-category-inner">
                <Box
                  className={`product-category-card ${
                    this.isCommonServiceAdded(["search"]) ? "active" : ""
                  }`}
                >
                  <Box className="d-flex icon-buttons">
                    {this.isCommonServiceAdded(["search"]) ? (
                      <IconButton
                        className="edit-icon"
                        onClick={() =>
                          this.onClickEditIconCommonService("search")
                        }
                      >
                        <i class="fas fa-edit"></i>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </Box>
                  <Box
                    className="product-category-details"
                    onClick={() => {
                      let service = activeCommonService;
                      if (!activeCommonService.includes("search")) {
                        service.push("search");
                        let { createProductFormData } = this.props;
                        this.props.setProductIntoDepartment({
                          ...createProductFormData,
                          currentCommonService: "search",
                        });
                      }

                      this.setState({
                        activeCommonService: service,
                      });
                    }}
                  >
                    <Box className="product-image">
                      <img src={searchIcon} alt="" />
                    </Box>
                    <span className="d-block name">Search</span>
                  </Box>
                </Box>
                <Box
                  className={`product-category-card ${
                    this.isCommonServiceAdded(["security"]) ? "active" : ""
                  }`}
                >
                  <Box className="d-flex icon-buttons">
                    {this.isCommonServiceAdded(["security"]) ? (
                      <IconButton
                        className="edit-icon"
                        onClick={() =>
                          this.onClickEditIconCommonService("security")
                        }
                      >
                        <i class="fas fa-edit"></i>
                      </IconButton>
                    ) : (
                      <></>
                    )}
                  </Box>
                  <Box
                    className="product-category-details"
                    onClick={() => {
                      let service = activeCommonService;
                      if (!activeCommonService.includes("security")) {
                        service.push("security");
                        let { createProductFormData } = this.props;
                        this.props.setProductIntoDepartment({
                          ...createProductFormData,
                          currentCommonService: "security",
                        });
                      }

                      this.setState({
                        activeCommonService: service,
                      });
                    }}
                  >
                    <Box className="product-image">
                      <img src={rbacIcon} alt="" />
                    </Box>
                    <span className="d-block name">Security</span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {createProductFormData?.soaData?.length ? (
          <Grid item xs={4}>
            <Box className="d-block text-center">
              <LoadingButton
                className={` primary-btn min-width-inherit`}
                variant="contained"
                onClick={this.onClickSave}
                disabled={creationBiMapping.status === status.IN_PROGRESS}
                loading={creationBiMapping.status === status.IN_PROGRESS}
              >
                Save
              </LoadingButton>
            </Box>
          </Grid>
        ) : (
          <></>
        )}

        {showServiceModal ? (
          <ServiceModal
            showModal={showServiceModal}
            handleServiceModal={this.handleServiceModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { createProductFormData, creationBiMapping } = state.biMapping;
  return {
    createProductFormData,
    creationBiMapping,
  };
}

const mapDispatchToProps = {
  setProductIntoDepartment,
  createBiMapping,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(ProductCategory));
