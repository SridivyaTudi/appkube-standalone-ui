import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { v4 } from "uuid";
import {
  getDepartments,
  getProductList,
  getProductEnv,
} from "Redux/AssociateApp/AssociateAppThunk";
import { getCurrentOrgId } from "Utils";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import calendarMouseIcon from "assets/img/assetmanager/calendar-mouse-icon.png";
import chartLogo from "assets/img/assetmanager/chart-logo.png";
import Box from "@mui/material/Box";

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
      this.props.departments?.data.length
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
      this.props.products.data?.length
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
      prevProps.clickBreadCrumbDetails?.breadcrumbId !==
      this.props.clickBreadCrumbDetails?.breadcrumbId
    ) {
      let { selectedLevel, currentLevelIndex, label, type, productType } =
        this.props.clickBreadCrumbDetails;
      console.log( this.props.clickBreadCrumbDetails);
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
    let { selectedActiveBAMLevels, departments } = this.state;
    let departmentLength =
      departments?.length && departments[0].departments?.length;

    if (
      this.props.departments.status === status.IN_PROGRESS ||
      this.props.products.status === status.IN_PROGRESS ||
      this.props.productEnv.status === status.IN_PROGRESS
    ) {
      return (
        <Box className="">
          <i className="fa-solid fa-spinner fa-spin" /> Loading...
        </Box>
      );
    }
    return departmentLength ? (
      <ArcherContainer className="chart-container" startMarker>
        <ArcherElement
          id="root"
          relations={this.onClickLevelsThenDrawLine()}
          // className="chart-container"
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
            >
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
        if (levelData.length) {
          return (
            <div
              className={` global-servies`}
              style={{ width: "160px" }}
              key={v4()}
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
    BAMData = BAMData.length
      ? []
      : [
          departments[0].departments.map((department, index) => {
            let { name: label, id } = department;
            return { label, id, image: calendarMouseIcon, type: "Department" };
          }),
        ];
    selectedActiveBAMLevels = {};

    this.props.setBreadCrumbs(
      selectedActiveBAMLevels,
      BAMData,
      initailOrganization
    );
    this.setState({ selectedActiveBAMLevels, BAMData });
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
    let { selectedActiveBAMLevels, BAMData,initailOrganization } = this.state;
    let currentSelectedLevelIndex = `selectedLevel_${selectedLevel}`;

    let activeBAMLevel = selectedActiveBAMLevels[currentSelectedLevelIndex];

    if (activeBAMLevel && activeBAMLevel?.id === departmentId) {
      selectedActiveBAMLevels = {};
      BAMData.length = selectedLevel + 1;

      this.props.setBreadCrumbs(selectedActiveBAMLevels, BAMData,initailOrganization);
    } else {
      selectedActiveBAMLevels = {
        selectedLevel_0: {
          id: departmentId,
          label,
          type,
          productType,
        },
      };
      BAMData.length = selectedLevel + 1;

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
    let { selectedActiveBAMLevels, BAMData,initailOrganization } = this.state;
    let preFix = `selectedLevel_`;

    let activeBAMLevel = selectedActiveBAMLevels[preFix + selectedLevel];

    if (activeBAMLevel && activeBAMLevel?.id === productId) {
      selectedActiveBAMLevels = {
        [`${preFix}0`]: selectedActiveBAMLevels[`${preFix}0`],
      };

      BAMData.length = selectedLevel + 1;
      productType = "";

      this.props.setBreadCrumbs(selectedActiveBAMLevels, BAMData,initailOrganization);
    } else {
      selectedActiveBAMLevels = {
        [`${preFix}0`]: selectedActiveBAMLevels[`${preFix}0`],
        [preFix + selectedLevel]: { id: productId, label, type },
      };
      BAMData.length = selectedLevel + 1;

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
    let { BAMData, selectedActiveBAMLevels,initailOrganization } = this.state;
    let preFix = `selectedLevel_`;

    let activeBAMLevel = selectedActiveBAMLevels[preFix + selectedLevel];

    if (activeBAMLevel && activeBAMLevel?.id === envId) {
      BAMData.length = 3;
      delete selectedActiveBAMLevels["selectedLevel_2"];
    } else {
      BAMData[selectedLevel + 1] = productCategory[productType]
        ? productCategory[productType].map((name, index) => {
            return {
              label: name,
              id: index,
              image: calendarMouseIcon,
              type: "",
            };
          })
        : [];

      selectedActiveBAMLevels["selectedLevel_2"] = {
        id: envId,
        label,
        type,
        productType,
      };
    }
    this.props.setBreadCrumbs(selectedActiveBAMLevels, BAMData,initailOrganization);
    this.setState({ BAMData });
  }

  /** Fire click event then draw
   * BAM = Business Association Mapping
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

  render() {
    return this.renderBAMMainBody();
  }
}

function mapStateToProps(state) {
  const { departments, products, productEnv } = state.associateApp;
  return {
    departments,
    products,
    productEnv,
  };
}

const mapDispatchToProps = {
  getDepartments,
  getProductList,
  getProductEnv,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessAssociationMapping);
