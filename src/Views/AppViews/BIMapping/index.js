import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import Aws from "../../../assets/img/aws.png";
import Microsoftazure from "../../../assets/img/microsoftazure.png";
import GoogleCloud from "../../../assets/img/google-cloud.png";
import Kubernetes from "../../../assets/img/kubernetes.png";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link } from "react-router-dom";
import AccordionView from "Views/AppViews/Setting/Components/AccordionView";
import { getCurrentOrgId, ENVIRONMENTS, makeSlugForString } from "Utils";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import {
  getProductList,
  getProductEnv,
} from "Redux/AssociateApp/AssociateAppThunk";
import { getOrgWiseDepartments } from "Redux/Environments/EnvironmentsThunk";
import {
  getElementType,
  getElementInstancesOfGivenType,
  getLandingzoneByDepartment,
} from "Redux/BIMapping/BIMappingThunk";
import Loader from "Components/Loader";
import { setProductIntoDepartment } from "Redux/BIMapping/BIMappingSlice";
import { getCloudWiseLandingZoneCount } from "Redux/Environments/EnvironmentsThunk";
import CloudElementInstancePopup from "./Components/CloudElementInstancePopup";
import SelectLendingZonePopup from "./Components/SelectLendingZonePopup";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { API_ERROR_MESSAGE, BI_MAPPING_TYPE } from "CommonData";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

const orgId = getCurrentOrgId();
let headers = [
  { name: "Organization Name", styled: {} },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={Aws} alt="" />
        </Box>
        AWS
      </>
    ),
    styled: {},
  },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={Microsoftazure} alt="" />
        </Box>
        Azure
      </>
    ),
    styled: {},
  },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={GoogleCloud} alt="" />
        </Box>
        GCP
      </>
    ),
    styled: {},
  },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={Kubernetes} alt="" />
        </Box>
        Kubernetes
      </>
    ),
    styled: {},
  },
];

class BIMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectDepartmentOpen: false,
      organizationTableData: [],
      clickTableData: {},
      serviceDetails: [],
      landingZoneCounts: [],
      isDepartmentLandingzoneDataStatus: {
        department: false,
        landingZoneCount: false,
      },
    };
  }

  componentDidMount = () => {
    this.props.getCloudWiseLandingZoneCount();
    this.props.getOrgWiseDepartments(orgId);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.cloudWiseLandingZoneCount.status !==
        this.props.cloudWiseLandingZoneCount.status &&
      this.props.cloudWiseLandingZoneCount.status === status.SUCCESS &&
      this.props.cloudWiseLandingZoneCount?.data
    ) {
      const landingZoneCounts =
        this.props.cloudWiseLandingZoneCount?.data || [];
      let { isDepartmentLandingzoneDataStatus } = this.state;
      isDepartmentLandingzoneDataStatus.landingZoneCount = true;
      this.setState({ landingZoneCounts, isDepartmentLandingzoneDataStatus });
    }

    if (
      prevProps.organizationWiseDepartments.status !==
        this.props.organizationWiseDepartments.status &&
      this.props.organizationWiseDepartments.status === status.SUCCESS &&
      this.props.organizationWiseDepartments?.data
    ) {
      let { isDepartmentLandingzoneDataStatus } = this.state;
      isDepartmentLandingzoneDataStatus.department = true;
      this.setState({ isDepartmentLandingzoneDataStatus });
    }

    if (
      prevProps.products.status !== this.props.products.status &&
      this.props.products.status === status.SUCCESS &&
      this.props.products?.data
    ) {
      let products = this.props.products?.data;
      this.manipulateProductData(products);
    }

    if (
      prevProps.productEnv.status !== this.props.productEnv.status &&
      this.props.productEnv.status === status.SUCCESS &&
      this.props.productEnv?.data
    ) {
      let productEnvs = this.props.productEnv.data;
      this.manipulateProductEnvsData(productEnvs);
    }

    if (
      prevProps.elementTypeData.status !== this.props.elementTypeData.status &&
      this.props.elementTypeData.status === status.SUCCESS &&
      this.props.elementTypeData?.data
    ) {
      let elementTypes = this.props.elementTypeData.data;
      this.manipulateElementTypeData(elementTypes);
    }

    if (
      prevProps.elementInstancesOfGivenType.status !==
        this.props.elementInstancesOfGivenType.status &&
      this.props.elementInstancesOfGivenType.status === status.SUCCESS &&
      this.props.elementInstancesOfGivenType?.data
    ) {
      let elementInstancesOfGivenTypeData =
        this.props.elementInstancesOfGivenType.data;
      this.manipulateElementInstancesOfGivenTypeData(
        elementInstancesOfGivenTypeData
      );
    }

    let {
      isDepartmentLandingzoneDataStatus: { department, landingZoneCount },
    } = this.state;
    if (department && landingZoneCount) {
      const organization = this.props.organizationWiseDepartments.data || [];
      const landingZoneCounts =
        this.props.cloudWiseLandingZoneCount?.data || [];

      this.manipulateDepartMentData(organization, landingZoneCounts);
      this.setState({
        isDepartmentLandingzoneDataStatus: {
          department: false,
          landingZoneCount: false,
        },
      });
    }
  }

  toggleSelectDepartment = () => {
    this.setState({
      isSelectDepartmentOpen: !this.state.isSelectDepartmentOpen,
    });
  };

  // Manipulation of new API data
  manipulateChildrenData = (data, type, exptraIds, isArrOfObj = 0) => {
    let isTypeDepartment = type === BI_MAPPING_TYPE.DEPARTMENT;
    return data.map((dataDetails, index) => {
      let { name, id, instanceName } = dataDetails;
      name = isArrOfObj ? dataDetails : instanceName || name;
      id = isArrOfObj ? `${dataDetails}_${exptraIds?.productId}_${index}` : id;

      return {
        name,
        id,
        isLink: type === BI_MAPPING_TYPE.DEPARTMENT,
        url: isTypeDepartment
          ? `/app/bim/add-product/${makeSlugForString(dataDetails?.name)}/${
              dataDetails?.id
            }`
          : "",
        chlidren: [],
        type,
        departmentId: exptraIds?.departmentId,
        isLastClickEnable: true,
        productId: exptraIds?.productId,
        productEnvId: exptraIds?.productEnvId,
        elementTypeId: exptraIds?.elementTypeId,
        otherData: dataDetails,
      };
    });
  };

  // Manipulation of department data
  manipulateDepartMentData = (organization, landingZoneCounts) => {
    if (organization) {
      let { name, id, departments } = organization;
      let { organizationTableData } = this.state;
      let chlidren = [];
      if (departments?.length) {
        chlidren = this.manipulateChildrenData(
          departments,
          BI_MAPPING_TYPE.DEPARTMENT
        );
      }

      let environments = [
        ENVIRONMENTS.AWS,
        ENVIRONMENTS.AZURE,
        ENVIRONMENTS.GCP,
        ENVIRONMENTS.KUBERNETES,
      ];
      let counts = [];
      if (landingZoneCounts?.length) {
        counts = environments.map((cloud) => {
          let details = landingZoneCounts.find(
            (landingZone) => landingZone.cloud.toUpperCase() === cloud
          );
          return { name: details?.totalAccounts || 0 };
        });
      } else {
        counts = environments.map((count) => {
          return { name: 0 };
        });
      }

      organizationTableData = [
        {
          name,
          id,
          isMutipleCell: true,
          multipeCellData: counts,
          type: BI_MAPPING_TYPE.ORGANIZATION,
          chlidren,
        },
      ];

      this.setState({
        organizationTableData,
      });
    }
  };

  // Manipulation of Product data
  manipulateProductData = (products) => {
    if (products) {
      let { organizationTableData, clickTableData } = this.state;

      organizationTableData =
        organizationTableData.map((organization) => {
          if (organization.chlidren?.length) {
            organization.chlidren = organization.chlidren.map((department) => {
              if (department.id === clickTableData.id) {
                department.chlidren = this.manipulateChildrenData(
                  products,
                  BI_MAPPING_TYPE.PRODUCT,
                  {
                    departmentId: department.id,
                  }
                );
              }
              return department;
            });
          }
          return organization;
        }) || [];

      this.setState({
        organizationTableData,
      });
    }
  };

  // Manipulation of ProductEnvs data
  manipulateProductEnvsData = (productEnvs) => {
    if (productEnvs?.length) {
      let { organizationTableData, clickTableData } = this.state;

      organizationTableData =
        organizationTableData.map((organization) => {
          let organizationChlidren = organization.chlidren;

          if (organizationChlidren?.length) {
            organization.chlidren = organizationChlidren.map((department) => {
              if (department.id === clickTableData.departmentId) {
                department.chlidren = department.chlidren.map((product) => {
                  if (product.id === clickTableData.id) {
                    product.chlidren = this.manipulateChildrenData(
                      productEnvs,
                      BI_MAPPING_TYPE.PRODUCT_ENVS,
                      {
                        departmentId: clickTableData.departmentId,
                        productId: product.id,
                      }
                    );
                  }
                  return product;
                });
              }
              return department;
            });
          }
          return organization;
        }) || [];

      this.setState({
        organizationTableData,
      });
    }
  };

  // Manipulation of Element type data
  manipulateElementTypeData = (elemntTypes) => {
    if (elemntTypes?.length) {
      let { organizationTableData, clickTableData } = this.state;

      organizationTableData =
        organizationTableData.map((organization) => {
          let organizationChlidren = organization.chlidren;

          if (organizationChlidren?.length) {
            organization.chlidren = organizationChlidren.map((department) => {
              if (department.id === clickTableData.departmentId) {
                department.chlidren = department.chlidren.map((product) => {
                  if (product.id === clickTableData.productId) {
                    product.chlidren = product.chlidren.map((productEnv) => {
                      if (productEnv.id === clickTableData.id) {
                        productEnv.chlidren = this.manipulateChildrenData(
                          elemntTypes,
                          BI_MAPPING_TYPE.ELEMENT_TYPE,
                          {
                            departmentId: clickTableData.departmentId,
                            productId: clickTableData.productId,
                            productEnvId: productEnv.id,
                          },
                          1
                        );
                      }
                      return productEnv;
                    });
                  }
                  return product;
                });
              }
              return department;
            });
          }
          return organization;
        }) || [];

      this.setState({
        organizationTableData,
      });
    }
  };

  // Manipulation of Element type data
  manipulateElementInstancesOfGivenTypeData = (elemntInstanceTypes) => {
    if (elemntInstanceTypes?.length) {
      let { organizationTableData, clickTableData } = this.state;

      organizationTableData =
        organizationTableData.map((organization) => {
          let organizationChlidren = organization.chlidren;

          if (organizationChlidren?.length) {
            organization.chlidren = organizationChlidren.map((department) => {
              if (department.id === clickTableData.departmentId) {
                department.chlidren = department.chlidren.map((product) => {
                  if (product.id === clickTableData.productId) {
                    product.chlidren = product.chlidren.map((productEnv) => {
                      if (productEnv.id === clickTableData.productEnvId) {
                        productEnv.chlidren = productEnv.chlidren.map(
                          (elementType) => {
                            if (elementType.id === clickTableData.id) {
                              elementType.chlidren =
                                this.manipulateChildrenData(
                                  elemntInstanceTypes,
                                  BI_MAPPING_TYPE.ELEMENT_INSTANCE_TYPE,
                                  {
                                    departmentId: clickTableData.departmentId,
                                    productId: clickTableData.productId,
                                    productEnvId: clickTableData.productEnvId,
                                    elementTypeId: elementType.id,
                                  }
                                );
                            }
                            return elementType;
                          }
                        );
                      }
                      return productEnv;
                    });
                  }
                  return product;
                });
              }
              return department;
            });
          }
          return organization;
        }) || [];

      this.setState({
        organizationTableData,
      });
    }
  };

  // Render Loder
  renderLoder(widthClass) {
    return (
      <Box className="d-blck text-center w-100 h-100 p-t-20 p-b-20 ">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  }

  // Click on organization element types
  onClickNode(data) {
    let { type, departmentId, productId, productEnvId, id, name } = data;
    let { serviceDetails } = this.state;

    if (type === BI_MAPPING_TYPE.DEPARTMENT) {
      this.props.getProductList(id);
    } else if (type === BI_MAPPING_TYPE.PRODUCT) {
      this.props.getProductEnv(id);
    } else if (type === BI_MAPPING_TYPE.PRODUCT_ENVS) {
      this.props.getElementType({ productId, departmentId, productEnvId: id });
    } else if (type === BI_MAPPING_TYPE.ELEMENT_TYPE) {
      this.props.getElementInstancesOfGivenType({
        productId,
        departmentId,
        productEnvId,
        elementType: name,
      });
    } else if (type === BI_MAPPING_TYPE.ELEMENT_INSTANCE_TYPE) {
      let { serviceCategory, serviceName, serviceNature, serviceType } =
        data.otherData;
      serviceDetails = [
        {
          label: "Service Category",
          value: serviceCategory,
        },
        {
          label: "Service Name",
          value: serviceName,
        },
        {
          label: "Service Nature",
          value: serviceNature,
        },
        {
          label: "Service Type",
          value: serviceType,
        },
      ];
    }

    this.setState({ clickTableData: data, serviceDetails }, () => {
      if (type === BI_MAPPING_TYPE.ELEMENT_INSTANCE_TYPE) {
        this.handleShowInstanceModal();
      }
    });
  }

  // Redirect to Add product
  onLinkClick = (data) => {
    const departmentId = data.id;
    const departmentName = data.name;
    const departmentDescription = data.otherData?.description;
    this.setState({ showSelectLendingModal: true });
    this.props.getLandingzoneByDepartment({ orgId, departmentId });
    this.props.setProductIntoDepartment({
      departmentName,
      departmentId,
      departmentDescription,
    });
  };

  // Render html when data is no available
  renderNoDataHtml = (text) => {
    return (
      <Box className="group-loader text-center  h-100  m-r-auto m-l-auto  p-t-20 p-b-20">
        <h5 className="m-t-0 m-b-0">{text}</h5>
      </Box>
    );
  };

  handleShowInstanceModal = () => {
    this.setState({
      showInstanceModal: !this.state.showInstanceModal,
    });
  };
  handleShowSelectLendingModal = () => {
    this.setState({
      showSelectLendingModal: !this.state.showSelectLendingModal,
    });
  };
  render() {
    const {
      isSelectDepartmentOpen,
      organizationTableData,
      showInstanceModal,
      showSelectLendingModal,
      serviceDetails,
    } = this.state;
    const {
      organizationWiseDepartments: organization,
      products,
      productEnv,
      elementTypeData,
      elementInstancesOfGivenType,
      cloudWiseLandingZoneCount,
    } = this.props;
    const inprogressStatus = status.IN_PROGRESS;
    let loderStatus = [
      products.status,
      productEnv.status,
      elementTypeData.status,
      elementInstancesOfGivenType.status,
    ].includes(inprogressStatus);

    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Organization Unit</h3>

          <Box className="mapping-fliter">
            <Button
              onClick={this.toggleSelectDepartment}
              className="primary-outline-btn min-width"
              variant="outlined"
            >
              <ControlPointIcon className="m-r-1 plus-icon" />
              Department
            </Button>
            {this.state.isSelectDepartmentOpen === true && (
              <div
                className={
                  isSelectDepartmentOpen
                    ? "fliter-collapse active"
                    : "fliter-collapse"
                }
              >
                <List>
                  <Link to={`${APP_PREFIX_PATH}/bim/create-department`}>
                    <ListItem>
                      <i className="fa-solid fa-circle-dot"></i>Create
                      Department
                    </ListItem>
                  </Link>
                </List>
              </div>
            )}
            <div
              className={
                isSelectDepartmentOpen
                  ? "fliters-collapse-bg active"
                  : "fliters-collapse-bg"
              }
              onClick={this.toggleSelectDepartment}
            />
          </Box>
        </Box>
        <Box className="bimapping-table">
          {[organization.status, cloudWiseLandingZoneCount.status].includes(
            inprogressStatus
          ) ? (
            this.renderLoder()
          ) : organizationTableData?.length ? (
            <AccordionView
              data={organizationTableData}
              headers={headers}
              onClickNode={(data) => this.onClickNode(data)}
              isLoding={loderStatus}
              onLinkClick={(data) => this.onLinkClick(data)}
            />
          ) : (
            this.renderNoDataHtml(
              organization.status === status.FAILURE
                ? API_ERROR_MESSAGE
                : "There are no data available."
            )
          )}
        </Box>
        {showInstanceModal ? (
          <CloudElementInstancePopup
            showModal={showInstanceModal}
            handleShowInstanceModal={this.handleShowInstanceModal}
            data={serviceDetails}
          />
        ) : (
          <></>
        )}
        {showSelectLendingModal ? (
          <SelectLendingZonePopup
            showModal={showSelectLendingModal}
            handleSelectLendingModal={this.handleShowSelectLendingModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { products, productEnv } = state.associateApp;
  const { organizationWiseDepartments, cloudWiseLandingZoneCount } =
    state.environments;
  const {
    elementTypeData,
    elementInstancesOfGivenType,
    landingZonesByDepartment,
    createProductFormData,
  } = state.biMapping;
  return {
    organizationWiseDepartments,
    products,
    productEnv,
    elementTypeData,
    elementInstancesOfGivenType,
    cloudWiseLandingZoneCount,
    landingZonesByDepartment,
    createProductFormData,
  };
}

const mapDispatchToProps = {
  getOrgWiseDepartments,
  getProductList,
  getProductEnv,
  getElementType,
  getElementInstancesOfGivenType,
  setProductIntoDepartment,
  getCloudWiseLandingZoneCount,
  getLandingzoneByDepartment,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(BIMapping));
