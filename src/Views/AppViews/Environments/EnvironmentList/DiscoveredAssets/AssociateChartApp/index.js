import React, { Component } from "react";
import { Button, Box, Grid, List, ListItem } from "@mui/material";
import { ArcherContainer, ArcherElement } from "react-archer";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import chartLogo from "assets/img/assetmanager/chart-logo.png";
import calendarMouseIcon from "assets/img/assetmanager/calendar-mouse-icon.png";
import databaseIcon from "assets/img/assetmanager/database-icon.png";

let Data = {
  label: "Synectiks",
  subLabel: "",
  image: chartLogo,
  children: [
    [
      {
        label: "Human Resources",
        id: null,
        type: "HumanResources",
        image: calendarMouseIcon,
        children: [
          {
            label: "Payroll",
            id: "",
            image: calendarMouseIcon,
            type: "Payroll",
            children: [],
          },
          {
            label: "Accounts",
            id: "",
            image: databaseIcon,
            type: "Accounts",
            children: [
              {
                label: "Production",
                id: "",
                image: calendarMouseIcon,
                type: "Production",
                children: [
                  {
                    label: "Business",
                    id: "",
                    image: calendarMouseIcon,
                    type: "Business",
                    children: [
                      {
                        label: "Admission",
                        id: "",
                        image: calendarMouseIcon,
                        type: "Admission",
                        children: [],
                      },
                      {
                        label: "Fees",
                        id: "",
                        image: databaseIcon,
                        type: "Fees",
                        children: [
                          {
                            label: "Java Spring boot",
                            id: "",
                            image: calendarMouseIcon,
                            type: "JavaSpringboot",
                            children: [],
                          },
                          {
                            label: "Postgres SQL",
                            id: "",
                            image: databaseIcon,
                            type: "PostgresSQL",
                            children: [],
                          },
                          {
                            label: "Redis",
                            id: "",
                            image: calendarMouseIcon,
                            type: "Redis",
                            children: [],
                          },
                          {
                            label: "Dynamo DB",
                            id: "",
                            image: databaseIcon,
                            type: "DynamoDB",
                            children: [],
                          },
                        ],
                      },
                      {
                        label: "Canteen",
                        id: "",
                        image: calendarMouseIcon,
                        type: "Canteen",
                        children: [],
                      },
                      {
                        label: "Library",
                        id: "",
                        image: databaseIcon,
                        type: "Library",
                        children: [],
                      },
                    ],
                  },
                  {
                    label: "Common",
                    id: "",
                    image: databaseIcon,
                    type: "Common",
                    children: [],
                  },
                ],
              },
              {
                label: "Test",
                id: "",
                image: databaseIcon,
                type: "Test",
                children: [],
              },
              {
                label: "Stage",
                id: "",
                image: calendarMouseIcon,
                type: "Stage",
                children: [],
              },
              {
                label: "Development",
                id: "",
                image: databaseIcon,
                type: "Development",
                children: [],
              },
            ],
          },
          {
            label: "HRMS",
            id: "",
            image: calendarMouseIcon,
            type: "HRMS",
            children: [],
          },
          {
            label: "Procurement",
            id: "",
            image: databaseIcon,
            type: "Procurement",
            children: [],
          },
        ],
      },
      {
        label: "Finance",
        id: null,
        type: "Finance",
        image: databaseIcon,
        children: [],
      },
      {
        label: "IT",
        id: null,
        type: "It",
        image: calendarMouseIcon,
        children: [],
      },
      {
        label: "Admin",
        id: null,
        type: "Admin",
        image: databaseIcon,
        children: [],
      },
    ],
    [],
  ],
};

let transformScale = 0;
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
        strokeWidth: -1.8,
      },
    },
  },
};
let staticHtml = {
  selectedLevel: ({
    isActive,
    selectedLevel,
    currentLevelIndex,
    label,
    image,
    onClickLevel,
  }) => {
    return (
      <li
        className={`${isActive ? "active" : ""}`}
        onClick={() => {
          onClickLevel({
            selectedLevel,
            currentLevelIndex,
            label,
          });
        }}
      >
        <i className="fa-solid fa-circle-plus"></i>
        <span>
          <img src={image} alt={label} />
        </span>
        <div className="content">
          <p>{label}</p>
          <div className="box blue orange">SOA</div>
        </div>
      </li>
    );
  },
};

export class AssociateChartApp extends Component {
  constructor(props) {
    super(props);
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    this.state = {
      isSelectDepartmentOpen: false,
      isSelectProductOpen: false,
      selectedActiveBAMLevels: {},
      BAMData: [],
    };
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

  /**
   * BAM = Business Association Mapping
   * Render the main body including all levels data.
   */
  renderBAMMainBody = () => {
    let { selectedActiveBAMLevels } = this.state;
    return Object.keys(Data).length &&
      (Data?.children[0].length || Data?.children[1].length) ? (
      <ArcherContainer className="chart-container" startMarker>
        <ArcherElement
          id="root"
          relations={this.onClickLevelsThenDrawLine()}
          // className="chart-container"
        >
          <div
            className="chart-box active"
            onClick={() => {
              this.onClickLevels({}, 1);
            }}
          >
            <img src={Data.image} alt="Logo" />
          </div>
        </ArcherElement>
        {this.renderAllBAMLevel()}
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
  renderBAMLevel = (data, selectedLevel) => {
    let { selectedActiveBAMLevels, BAMData } = this.state;
    if (data.length) {
      return data.map((level, currentLevelIndex) => {
        let isActive =
          selectedActiveBAMLevels[`selectedLevel_${selectedLevel}`]?.id ===
          currentLevelIndex;
        let elementId = `selectedLevel_${selectedLevel}_${currentLevelIndex}`;
        return (
          <ArcherElement
            id={elementId}
            relations={
              isActive ? this.onClickLevelsThenDrawLine(selectedLevel) : []
            }
            key={v4()}
          >
            {staticHtml.selectedLevel({
              isActive,
              selectedLevel,
              currentLevelIndex,
              label: level.label,
              image: level.image,
              onClickLevel: (arg) => this.onClickLevels(arg),
            })}
          </ArcherElement>
        );
      });
    }
  };

  /** Render All BAM Levels
   * BAM = Business Association Mapping
   *  @param {Array} data - The data of the selected level.
   * @param {Number} selectedLevel - SelectedLevel.
   *
   */
  renderAllBAMLevel = () => {
    const { BAMData } = this.state;
    if (BAMData.length) {
      return BAMData.map((html, selectedLevel) => {
        if (html.length) {
          return (
            <div className={` global-servies`} style={{ width: "160px" }}>
              <ul>{this.renderBAMLevel(html, selectedLevel)}</ul>
            </div>
          );
        }
      });
    }
  };

  onClickLevels(
    { selectedLevel, currentLevelIndex, label },
    isIntialClick = 0
  ) {
    let { selectedActiveBAMLevels, BAMData } = this.state;
    let currentSelectedLevelIndex = `selectedLevel_${selectedLevel}`;

    if (isIntialClick) {
      let { children } = Data;
      BAMData = BAMData.length ? [] : [children[0]];
      selectedActiveBAMLevels = {};
      this.setState({ selectedActiveBAMLevels, BAMData });
    } else {
      if (selectedActiveBAMLevels[currentSelectedLevelIndex]) {
        if (
          selectedActiveBAMLevels[currentSelectedLevelIndex]?.id ===
          currentLevelIndex
        ) {
          // Remove all selected level greater than current selected level
          Object.keys(selectedActiveBAMLevels).forEach((item, inIndex) => {
            let level = item.split("_")[1];
            if (level && selectedLevel <= level) {
              delete selectedActiveBAMLevels[item];
            }
          });
          BAMData.length = selectedLevel + 1;
          this.setState({
            BAMData,
            selectedActiveBAMLevels,
          });
        } else {
          this.replaceDataOnSpecificIndex(
            selectedLevel,
            label,
            currentLevelIndex
          );
        }
      } else {
        this.replaceDataOnSpecificIndex(
          selectedLevel,
          label,
          currentLevelIndex
        );
      }
    }
  }

  /** Replace data on specific index in selectedBAMHtml state
   * BAM = Business Association Mapping
   *  @param {Number} selectedLevel- The selectedLevel of BAM,
   * @param {String} label - Current click label of BAM
   * @param {Number} currentLevelIndex - Current click level index of BAM
   */
  replaceDataOnSpecificIndex(
    selectedLevel,
    label,
    currentLevelIndex,
    isReplaceData = 0
  ) {
    let { selectedActiveBAMLevels, BAMData } = this.state;
    let dataGet = Data.children[0];
    let currentSelectedLevelIndex = `selectedLevel_${selectedLevel}`;
    selectedActiveBAMLevels[currentSelectedLevelIndex] = {
      id: currentLevelIndex,
      label,
    };
    // Remove all selected level greater than current selected level
    Object.keys(selectedActiveBAMLevels).forEach((item, inIndex) => {
      let level = item.split("_")[1];
      if (selectedLevel < level) {
        delete selectedActiveBAMLevels[item];
      }
    });
    BAMData.length = selectedLevel + 1;

    // Get selected level data
    Object.keys(selectedActiveBAMLevels).forEach((item, inIndex) => {
      if (dataGet[selectedActiveBAMLevels[item].id]?.children) {
        dataGet = dataGet[selectedActiveBAMLevels[item].id]["children"];
      } else {
        dataGet = [];
      }
    });

    // Replace data on specific index
    if (dataGet.length) {
      BAMData[selectedLevel + 1] = dataGet;
    }
    this.setState({ selectedActiveBAMLevels, BAMData });
  }

  /** Fire click event then draw
   * BAM = Business Association Mapping
   *  @param {Number} selectedLevel- The selectedLevel of BAM,
   * @param {String} label - Current click label of BAM
   * @param {Number} currentLevelIndex - Current click level index of BAM
   */
  onClickLevelsThenDrawLine = (selectedLevel) => {
    let { BAMData } = this.state;
    let selectedLevelIndex = selectedLevel >= 0 ? selectedLevel + 1 : 0;

    if (BAMData.length && BAMData[selectedLevelIndex]) {
      return BAMData[selectedLevelIndex].map((item, index) => {
        let tempDrawArrow = Object.assign({}, drawArrow);
        tempDrawArrow[
          "targetId"
        ] = `selectedLevel_${selectedLevelIndex}_${index}`;
        return tempDrawArrow;
      });
    } else {
      return [];
    }
  };

  /** Render the BreadCrumbs. */
  renderBreadCrumbs(isBreadCrumb = 1) {
    let { selectedActiveBAMLevels } = this.state;

    let activeBAM = Object.keys(selectedActiveBAMLevels);
    let breadcrumbs = [
      <li
        className={`${activeBAM.length === 1 ? "active" : ""}`}
        onClick={() => {
          isBreadCrumb ? this.onClickLevels({}, 1) : <></>;
        }}
        key={v4()}
      >
        <a>{Data.label}</a>
      </li>,
    ];

    if (activeBAM.length) {
      activeBAM.map((bamItemKey, index) => {
        let label = selectedActiveBAMLevels[bamItemKey]?.label;
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
                  this.onClickLevels(
                    {
                      selectedLevel,
                      currentLevelIndex,
                      label,
                    },
                    bamItemKey === "root" ? 1 : 0
                  )
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

  render() {
    const { isSelectDepartmentOpen, isSelectProductOpen } = this.state;
    return (
      <Box className="environment-container associate-container">
        <Box className="breadcrumbs">
          <ul>{this.renderBreadCrumbs()}</ul>
        </Box>
        <Box className="associate-chart-container">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={8}>
              <h4>Business Association Mapping (ECS:123D569Y)</h4>
            </Grid>
            <Grid item xs={4}>
              <Box className="text-right">
                <Box className="mapping-fliter">
                  <Box
                    className="fliter-toggel"
                    onClick={this.toggleSelectDepartment}
                  >
                    Select Department
                    <i className="fa-solid fa-caret-down arrow-icon"></i>
                  </Box>
                  <Box
                    className={
                      isSelectDepartmentOpen
                        ? "fliter-collapse active"
                        : "fliter-collapse"
                    }
                  >
                    <List>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          Human Resources
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          Account
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          Digital Auction
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          Admin
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          Finance
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          IT
                        </Link>
                      </ListItem>
                    </List>
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
                    Select Product
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
                    <List>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          Payroll
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          Account
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          HRMS
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          IT
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          Leave Management
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          <i className="fa-solid fa-circle-dot"></i>
                          Support
                        </Link>
                      </ListItem>
                    </List>
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
          {this.renderBAMMainBody()}
        </Box>
        <Box className="infra-existing">
          <div className="heading">Infra Existing tags of element</div>
          <Box className="breadcrumbs">
            <ul>{this.renderBreadCrumbs(0)}</ul>
          </Box>
        </Box>
        <Box className="d-block width-100 text-center m-t-4">
          <Button className="primary-btn min-width" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    );
  }
}
export default AssociateChartApp;
