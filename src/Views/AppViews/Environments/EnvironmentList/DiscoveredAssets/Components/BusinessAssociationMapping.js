import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { v4 } from "uuid";
import {
  getDepartments,
  getProductList,
  getProductEnv,
  getModules,
  getModuleElements,
} from "Redux/AssociateApp/AssociateAppThunk";
import { getCurrentOrgId } from "Utils";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import calendarMouseIcon from "assets/img/assetmanager/calendar-mouse-icon.png";
import chartLogo from "assets/img/assetmanager/chart-logo.png";
import Box from "@mui/material/Box";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const orgId = getCurrentOrgId();

let drawArrow = {
  targetId: "",
  targetAnchor: "left",
  sourceAnchor: "right",
  style: {
    strokeColor: "#d8d8ed",
    strokeWidth: 2,
    endShape: {
      circle: {
        radius: 1.3,
        fillColor: "#6a6a9f",
        strokeColor: "#6a6a9f",
        strokeWidth: -1.2,
      },
    },
  },
};

const productCategory = {
  ["3 Tier"]: ["Web Layer", "App Layer", "Data Layer", "Auxilary Layer"],
  SOA: ["BUSINESS", "COMMON"],
};
let transformScale = 0;
let maxNodeLength = 0;
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
class BusinessAssociationMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedActiveBAMLevels: {},
      BAMData: [],
      productType: "",
      initailOrganization: "",
    };
  }

  componentDidMount = () => {
    this.props.getDepartments(orgId);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.departments.status !== this.props.departments.status &&
      this.props.departments.status === status.SUCCESS &&
      this.props.departments?.data?.length
    ) {
      let { selectedActiveBAMLevels, BAMData } = this.state;
      const initailDepartment = this.props.departments.data;
      this.setState({
        departments: initailDepartment,
        initailOrganization: initailDepartment[0]?.name,
      });
      this.props.setBreadCrumbs(
        selectedActiveBAMLevels,
        BAMData,
        initailDepartment[0]?.name
      );
    }

    if (
      prevProps.products.status !== this.props.products.status &&
      this.props.products.status === status.SUCCESS &&
      this.props.products?.data?.length
    ) {
      let { BAMData, selectedActiveBAMLevels, initailOrganization } =
        this.state;

      BAMData.push(
        this.props.products.data.map((product) => {
          let { name: label, id } = product;
          return {
            label,
            id,
            image: calendarMouseIcon,
            type: "Product",
            productType: product.type,
          };
        })
      );

      this.setState({
        BAMData,
      });
      this.props.setBreadCrumbs(
        selectedActiveBAMLevels,
        BAMData,
        initailOrganization
      );
    }

    if (
      prevProps.productEnv.status !== this.props.productEnv.status &&
      this.props.productEnv.status === status.SUCCESS &&
      this.props.productEnv.data?.length
    ) {
      let {
        BAMData,
        selectedActiveBAMLevels,
        productType,
        initailOrganization,
      } = this.state;

      BAMData.push(
        this.props.productEnv.data.map((env) => {
          let { name: label, id } = env;
          return {
            label,
            id,
            image: calendarMouseIcon,
            type: "ProductEnv",
            productType,
          };
        })
      );

      this.setState({
        BAMData,
      });
      this.props.setBreadCrumbs(
        selectedActiveBAMLevels,
        BAMData,
        initailOrganization
      );
    }

    if (
      prevProps.modules.status !== this.props.modules.status &&
      this.props.modules.status === status.SUCCESS &&
      this.props.modules.data?.length
    ) {
      let { BAMData, selectedActiveBAMLevels, initailOrganization } =
        this.state;

      BAMData[4] = this.props.modules.data.map((module) => {
        let { name: label, id } = module;
        return {
          label,
          id,
          image: calendarMouseIcon,
          type: "Module",
        };
      });

      this.setState({
        BAMData,
      });
      this.props.setBreadCrumbs(
        selectedActiveBAMLevels,
        BAMData,
        initailOrganization
      );
    }

    if (
      prevProps.moduleElements.status !== this.props.moduleElements.status &&
      this.props.moduleElements.status === status.SUCCESS &&
      this.props.moduleElements.data?.length
    ) {
      let { BAMData, selectedActiveBAMLevels, initailOrganization } =
        this.state;

      BAMData[5] = this.props.moduleElements.data.map((module) => {
        let { serviceName: label, id } = module;
        return {
          label,
          id,
          image: calendarMouseIcon,
          type: "ModuleElement",
        };
      });

      this.setState({
        BAMData,
      });
      this.props.setBreadCrumbs(
        selectedActiveBAMLevels,
        BAMData,
        initailOrganization
      );
    }

    if (
      prevProps.clickBreadCrumbDetails?.breadcrumbId !==
      this.props.clickBreadCrumbDetails?.breadcrumbId
    ) {
      let { selectedLevel, currentLevelIndex, label, type, productType } =
        this.props.clickBreadCrumbDetails;
      console.log(this.props.clickBreadCrumbDetails);
      if (type) {
        this[`onClick${type}`]({
          selectedLevel,
          currentLevelIndex,
          label,
          type,
          productType,
        });
      }
    }
  }

  /**
   * BAM = Business Association Mapping
   * Render the main body including all levels data.
   */
  renderBAMMainBody = () => {
    let { selectedActiveBAMLevels, departments, positionX, positionY } =
      this.state;
    let departmentLength =
      departments?.length && departments[0].departments?.length;
    const {
      departments: organization,
      products,
      productEnv,
      modules,
      moduleElements,
    } = this.props;
    const inprogressStatus = status.IN_PROGRESS;
    const lodingData =
      organization.status === inprogressStatus ||
      products.status === inprogressStatus ||
      productEnv.status === inprogressStatus ||
      modules.status === inprogressStatus ||
      moduleElements.status === inprogressStatus;
    return departmentLength ? (
      <ArcherContainer className="chart-container" startMarker>
        <TransformWrapper
          wrapperStyle={{
            width: "100%",
          }}
          onTransformed={(instance) => {
            transformScale = instance && instance.state.scale;
            this.setState({ scale: true });
          }}
        >
          {({ zoomIn, zoomOut, instance, zoomToElement, ...rest }) => {
            transformScale = instance.transformState.scale;
            let maxWidth =
              document.getElementById(`maxNode_${maxNodeLength}`)
                ?.offsetHeight || 0;
            return (
              <>
                <TransformComponent
                  contentStyle={{
                    alignItems: "center",
                    width: "2000px",
                    height: `${maxWidth ? 2 * maxWidth : 1200}px`,
                  }}
                >
                  <ArcherElement
                    id="root"
                    relations={this.onClickLevelsThenDrawLine()}
                  >
                    <div
                      className={"chart-box active"}
                      onClick={() => {
                        this.onClickSynectiks();
                      }}
                    >
                      <img src={chartLogo} alt="Logo" />
                    </div>
                  </ArcherElement>
                  {this.renderChildBody()}
                  {lodingData ? (
                    <Box className="d-flex align-items-center  loading">
                      <i className="fa-solid fa-spinner fa-spin" /> Loading...
                    </Box>
                  ) : (
                    <></>
                  )}
                </TransformComponent>
                <div className="gmnoprint">
                  <div className="gmnoprint-plus-minus">
                    <button className="btn btn-plus" onClick={() => zoomIn()}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="btn btn-minus" onClick={() => zoomOut()}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                  <div
                    className="gmnoprint-map"
                    onClick={() => {
                      zoomToElement("lastNodeActive", transformScale);
                    }}
                  >
                    <button className="btn btn-map">
                      <i className="fa-solid fa-map-marker-alt"></i>
                    </button>
                  </div>
                </div>
              </>
            );
          }}
        </TransformWrapper>
      </ArcherContainer>
    ) : (
      ""
    );
  };

  /**
   * BAM = Business Association Mapping
   * Render specific level
   *  @param {Array} data - The data of the selected level.
   * @param {Number} selectedLevel - SelectedLevel.
   *
   */
  renderChildNodes = (data, selectedLevel) => {
    let { selectedActiveBAMLevels, BAMData } = this.state;

    if (data.length) {
      return data.map((level, currentLevelIndex) => {
        let currentLevel = `selectedLevel_${selectedLevel}`;
        let isActive = selectedActiveBAMLevels[currentLevel]?.id === level.id;
        let elementId = `${currentLevel}_${level.id}`;
        let relationsData = isActive
          ? this.onClickLevelsThenDrawLine(selectedLevel)
          : [];

        let activeNodeLength = Object.keys(selectedActiveBAMLevels).length - 1;
        return (
          <ArcherElement id={elementId} relations={relationsData} key={v4()}>
            <li
              className={`${isActive ? "active" : ""}`}
              onClick={() =>
                level.type ? (
                  this[`onClick${level.type}`]({
                    selectedLevel,
                    currentLevelIndex: level.id,
                    label: level.label,
                    type: level.type,
                    productType: level.productType || "",
                  })
                ) : (
                  <></>
                )
              }
              key={v4()}
              id={`${
                isActive && activeNodeLength === selectedLevel
                  ? "lastNodeActive"
                  : ""
              }`}
            >
              <HtmlTooltip title={level.label}>
                <Box className="tooltip-content">
                  <span>
                    <img src={level.image} alt={level.label} />
                  </span>
                  <div className="content">
                    <p>{level.label}</p>

                    {level.type === "Product" ? (
                      <div
                        className={`box ${
                          level.productType === "SOA" ? "orange" : "blue"
                        }`}
                      >
                        {level.productType}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </Box>
              </HtmlTooltip>
              {isActive &&
              // level.children.length === 0 &&
              BAMData.length === selectedLevel + 1 ? (
                <i className="fa-solid fa-circle-plus"></i>
              ) : (
                <></>
              )}
            </li>
          </ArcherElement>
        );
      });
    }
  };

  /** Render All BAM Levels
   * BAM = Business Association Mapping
   */
  renderChildBody = () => {
    const { BAMData } = this.state;
    if (BAMData.length) {
      return BAMData.map((levelData, selectedLevel) => {
        maxNodeLength =
          levelData.length > maxNodeLength ? levelData.length : maxNodeLength;

        if (levelData.length) {
          return (
            <div
              className={` global-servies`}
              style={{ width: "160px" }}
              key={v4()}
              id={`maxNode_${levelData.length}`}
            >
              <ul>{this.renderChildNodes(levelData, selectedLevel)}</ul>
            </div>
          );
        }
      });
    }
  };

  /**
   * Fired event on click synectiks, then get departments
   */
  onClickSynectiks() {
    let { selectedActiveBAMLevels, BAMData, departments, initailOrganization } =
      this.state;
    selectedActiveBAMLevels = {};

    if (!BAMData.length) {
      BAMData = [
        departments[0]?.departments.map((department, index) => {
          let { name: label, id } = department;
          return { label, id, image: calendarMouseIcon, type: "Department" };
        }),
      ];
    } else {
      BAMData = [];
    }

    this.setStateOrProps(selectedActiveBAMLevels, BAMData, initailOrganization);
  }

  /**
   * Fired event on click Department, then get products
   *  @param {Object} data - get departmentId, selectedLevel and label
   */
  onClickDepartment(data) {
    let {
      currentLevelIndex: departmentId,
      selectedLevel,
      label,
      type,
      productType,
    } = data;

    let { selectedActiveBAMLevels, BAMData, initailOrganization } = this.state;
    let activeBAMLevel = selectedActiveBAMLevels[`selectedLevel_0`];
    BAMData.length = selectedLevel + 1;

    if (activeBAMLevel && activeBAMLevel?.id === departmentId) {
      selectedActiveBAMLevels = {};

      this.props.setBreadCrumbs(
        selectedActiveBAMLevels,
        BAMData,
        initailOrganization
      );
    } else {
      selectedActiveBAMLevels = {
        selectedLevel_0: {
          id: departmentId,
          label,
          type,
          productType,
        },
      };
      this.props.getProductList(departmentId);
    }

    this.setState({
      BAMData,
      selectedActiveBAMLevels,
    });
  }

  /**
   * Fired event on click product, then get product envs
   *  @param {Object} data - get productId, selectedLevel,productType and label
   */
  onClickProduct(data) {
    let {
      currentLevelIndex: productId,
      selectedLevel,
      label,
      type,
      productType,
    } = data;
    let { selectedActiveBAMLevels, BAMData, initailOrganization } = this.state;

    let activeBAMLevel = selectedActiveBAMLevels[`selectedLevel_1`];
    let { selectedLevel_0 } = selectedActiveBAMLevels;

    BAMData.length = selectedLevel + 1;
    selectedActiveBAMLevels = this.getPreviousSelectedLevels(0);

    if (activeBAMLevel && activeBAMLevel?.id === productId) {
      productType = "";
      this.props.setBreadCrumbs(
        selectedActiveBAMLevels,
        BAMData,
        initailOrganization
      );
    } else {
      selectedActiveBAMLevels["selectedLevel_1"] = {
        id: productId,
        label,
        type,
      };
      this.props.getProductEnv(productId);
    }

    this.setState({
      BAMData,
      selectedActiveBAMLevels,
      productType,
    });
  }

  /**
   * Fired event on click product envs, then get product category
   *  @param {Object} data - get envId, selectedLevel and label
   */
  onClickProductEnv(data) {
    let {
      productType,
      currentLevelIndex: envId,
      label,
      selectedLevel,
      type,
    } = data;
    let { BAMData, selectedActiveBAMLevels, initailOrganization } = this.state;
    let activeBAMLevel = selectedActiveBAMLevels[`selectedLevel_2`];

    let { selectedLevel_0, selectedLevel_1 } = selectedActiveBAMLevels;
    BAMData.length = 3;
    selectedActiveBAMLevels = this.getPreviousSelectedLevels(1);

    if (activeBAMLevel && activeBAMLevel?.id === envId) {
    } else {
      BAMData[selectedLevel + 1] = productCategory[productType]
        ? productCategory[productType].map((name, index) => {
            return {
              label: name,
              id: index,
              image: calendarMouseIcon,
              type: "Category",
              productCategory: productType,
            };
          })
        : [];

      selectedActiveBAMLevels = {
        selectedLevel_0,
        selectedLevel_1,
        selectedLevel_2: {
          id: envId,
          label,
          type,
          productType,
        },
      };
    }
    this.setStateOrProps(selectedActiveBAMLevels, BAMData, initailOrganization);
  }

  /**
   * Fired event on click category, then get modules
   *  @param {Object} data - get envId, selectedLevel and label
   */
  onClickCategory(data) {
    let {
      currentLevelIndex: categoryId,
      label,
      selectedLevel,
      type,
      productType,
    } = data;
    let {
      BAMData,
      selectedActiveBAMLevels,
      initailOrganization,
      productType: selectedType,
    } = this.state;

    let activeBAMLevel = selectedActiveBAMLevels[`selectedLevel_3`];
    let { selectedLevel_0, selectedLevel_1, selectedLevel_2 } =
      selectedActiveBAMLevels;

    BAMData.length = 4;
    selectedActiveBAMLevels = this.getPreviousSelectedLevels(2);

    if (activeBAMLevel && activeBAMLevel?.id === categoryId) {
    } else {
      if (selectedType === "SOA") {
        this.props.getModules({
          departmentId: selectedLevel_0.id,
          productId: selectedLevel_1.id,
          productEnvId: selectedLevel_2.id,
          serviceNature: label?.toLowerCase(),
        });
      }
      selectedActiveBAMLevels["selectedLevel_3"] = {
        id: categoryId,
        label,
        type,
        productType,
      };
    }
    this.setStateOrProps(selectedActiveBAMLevels, BAMData, initailOrganization);
  }

  /**
   * Fired event on click category, then get modules
   *  @param {Object} data - get moduleId, selectedLevel and label
   */
  onClickModule(data) {
    let { currentLevelIndex: moduleId, label, selectedLevel, type } = data;
    let { BAMData, selectedActiveBAMLevels, initailOrganization, productType } =
      this.state;

    let activeBAMLevel = selectedActiveBAMLevels[`selectedLevel_4`];
    let { selectedLevel_0, selectedLevel_1, selectedLevel_2, selectedLevel_3 } =
      selectedActiveBAMLevels;

    const departmentId = selectedLevel_0.id;
    const productId = selectedLevel_1.id;
    const productEnvId = selectedLevel_2.id;
    selectedActiveBAMLevels = this.getPreviousSelectedLevels(3);
    BAMData.length = 5;
    if (activeBAMLevel && activeBAMLevel?.id === moduleId) {
    } else {
      if (productType === "SOA") {
        this.props.getModuleElements({
          departmentId,
          productId,
          productEnvId,
          moduleId,
          serviceNature: selectedLevel_3.label?.toLowerCase(),
        });
      }

      selectedActiveBAMLevels["selectedLevel_4"] = {
        id: moduleId,
        label,
        type,
      };
    }
    this.setStateOrProps(selectedActiveBAMLevels, BAMData, initailOrganization);
  }

  onClickModuleElement(data) {
    let { currentLevelIndex: moduleId, label, selectedLevel, type } = data;
    let { BAMData, selectedActiveBAMLevels, initailOrganization, productType } =
      this.state;
    let activeBAMLevel = selectedActiveBAMLevels[`selectedLevel_5`];
    selectedActiveBAMLevels = this.getPreviousSelectedLevels(4);

    if (activeBAMLevel && activeBAMLevel?.id === moduleId) {
      BAMData.length = 6;
    } else {
      selectedActiveBAMLevels["selectedLevel_5"] = {
        id: moduleId,
        label,
        type,
      };
    }

    this.setStateOrProps(selectedActiveBAMLevels, BAMData, initailOrganization);
  }
  /** Fire click event then draw
   *  @param {Number} selectedLevel- The selectedLevel of BAM,
   */
  onClickLevelsThenDrawLine = (selectedLevel) => {
    let { BAMData, selectedActiveBAMLevels } = this.state;
    let selectedLevelIndex = selectedLevel >= 0 ? selectedLevel + 1 : 0;
    let activeBAMKeys = Object.keys(selectedActiveBAMLevels);

    if (BAMData.length && BAMData[selectedLevelIndex]) {
      return BAMData[selectedLevelIndex].map((item, index) => {
        let tempDrawArrow = JSON.parse(JSON.stringify(drawArrow));
        let currentId = `selectedLevel_${selectedLevelIndex}`;

        tempDrawArrow["targetId"] = `${currentId}_${item.id}`;

        let activeIndex = activeBAMKeys.indexOf(currentId);

        if (activeIndex >= 0) {
          let currentLevelIndex =
            selectedActiveBAMLevels[activeBAMKeys[activeIndex]]?.id;
          if (currentLevelIndex === item.id) {
            tempDrawArrow["style"]["strokeColor"] = "#53ca43";
            tempDrawArrow["style"]["endShape"]["circle"]["strokeColor"] =
              "#53ca43";
            tempDrawArrow["style"]["endShape"]["circle"]["fillColor"] =
              "#53ca43";
            tempDrawArrow["order"] = 1;
          }
        }
        return tempDrawArrow;
      });
    } else {
      return [];
    }
  };

  setStateOrProps(selectedActiveBAMLevels, BAMData, initailOrganization) {
    this.props.setBreadCrumbs(
      selectedActiveBAMLevels,
      BAMData,
      initailOrganization
    );
    this.setState({ BAMData, selectedActiveBAMLevels });
  }

  getPreviousSelectedLevels(level) {
    let totalLevels = [0, 1, 2, 3, 4];
    const { selectedActiveBAMLevels } = this.state;

    let activeLevel = {};

    totalLevels.slice(0, level + 1).map((levelNumber) => {
      let key = `selectedLevel_${levelNumber}`;
      activeLevel = { ...activeLevel, [key]: selectedActiveBAMLevels[key] };
    });
    return activeLevel;
  }

  render() {
    return this.renderBAMMainBody();
  }
}

function mapStateToProps(state) {
  const { departments, products, productEnv, modules, moduleElements } =
    state.associateApp;
  return {
    departments,
    products,
    productEnv,
    modules,
    moduleElements,
  };
}

const mapDispatchToProps = {
  getDepartments,
  getProductList,
  getProductEnv,
  getModules,
  getModuleElements,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessAssociationMapping);
