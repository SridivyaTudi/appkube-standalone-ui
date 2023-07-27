import React, { Component } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ArcherContainer, ArcherElement } from "react-archer";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import chartLogo from "assets/img/assetmanager/chart-logo.png";
import calendarMouseIcon from "assets/img/assetmanager/calendar-mouse-icon.png";
import databaseIcon from "assets/img/assetmanager/database-icon.png";

let Data = {
  label: "",
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
                        label: "sub 4",
                        id: "",
                        image: "",
                        type: "cluster",
                        children: [
                          {
                            label: "sub 5",
                            id: "",
                            image: "",
                            type: "cluster",
                            children: [
                              {
                                label: "sub 6",
                                id: "",
                                image: "",
                                type: "cluster",
                                children: [
                                  {
                                    label: "sub 7",
                                    id: "",
                                    image: "",
                                    type: "cluster",
                                    children: [
                                      {
                                        label: "sub 8",
                                        id: "",
                                        image: "",
                                        type: "cluster",
                                        children: [
                                          {
                                            label: "sub 9",
                                            id: "",
                                            image: "",
                                            type: "cluster",
                                            children: [
                                              {
                                                label: "sub 10",
                                                id: "",
                                                image: "",
                                                type: "cluster",
                                                children: [],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    label: "sub 5",
                                    id: "",
                                    image: "",
                                    type: "cluster",
                                    children: [],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            label: "sub 1",
                            id: "",
                            image: "",
                            type: "cluster",
                            children: [],
                          },
                        ],
                      },
                      {
                        label: "sub 1",
                        id: "",
                        image: "",
                        type: "cluster",
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
            label: "Accounts",
            id: "",
            image: databaseIcon,
            type: "Accounts",
            children: [],
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
        children: [
          {
            label: "gateway",
            id: "",
            image: "",
            type: "cluster",
            children: [],
          },
        ],
      },
      {
        label: "IT",
        id: null,
        type: "It",
        image: calendarMouseIcon,
        children: [
          {
            label: "gateway",
            id: "",
            image: "",
            type: "cluster",
            children: [],
          },
        ],
      },
      {
        label: "Admin",
        id: null,
        type: "Admin",
        image: databaseIcon,
        children: [
          {
            label: "gateway",
            id: "",
            image: "",
            type: "cluster",
            children: [],
          },
        ],
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
        radius: 2,
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
        <span>
          <img src={image} alt={label} />
        </span>
        {label}
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
      breadcrumbs: {
        breadcrumbId: v4(),
        cloudName: cloudName?.toUpperCase(),
        selectedLevel1: "",
        selectedLevel2: "",
      },
      isSelectDepartmentOpen: false,
      isSelectProductOpen: false,
      selectedActiveLevels: {},
      selectedHtml: [],
    };
  }

  /** Render the BreadCrumbs of Topologyview. */
  renderBreadCrumbs() {
    let { breadcrumbs } = this.state;
    let { selectedLevel1, selectedLevel2, cloudName } = breadcrumbs;
    let activeClassKey =
      cloudName && selectedLevel1 && !selectedLevel2
        ? "selectedLevel1"
        : selectedLevel1 && selectedLevel2
        ? "selectedLevel2"
        : "cloudName";
    let breadCrumbsData = Object.keys(breadcrumbs);

    return breadCrumbsData.map((breadCrumb, index) => {
      if (breadcrumbs[breadCrumb] && breadCrumb !== "breadcrumbId") {
        return (
          <>
            {breadCrumb !== "cloudName" ? (
              <li key={v4()}>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
            ) : (
              <></>
            )}
            <li
              onClick={() => {
                this.onClickBreadCrumbOfTopology(breadCrumb);
              }}
              className={`${activeClassKey === breadCrumb ? "active" : ""}`}
              key={v4()}
            >
              <a>
                {breadCrumb === "cloudName" || breadCrumb === "selectedLevel1"
                  ? breadcrumbs[breadCrumb]?.toUpperCase()
                  : breadCrumb === "selectedLevel2"
                  ? `${breadcrumbs[breadCrumb][0]?.toUpperCase()}${breadcrumbs[
                      breadCrumb
                    ].slice(1)}`
                  : breadcrumbs[breadCrumb]}
              </a>
            </li>
          </>
        );
      }
    });
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

  /** Render the main body including level-1 and level-2 data. */
  renderMainBody = () => {
    // const { data } = Data;
    let { selectedActiveLevels } = this.state;
    return Object.keys(Data).length &&
      (Data?.children[0].length || Data?.children[1].length) ? (
      <ArcherContainer className="chart-container">
        <ArcherElement
          id="root"
          relations={this.onClickLevelsThenDrawArrow()}
          // className="chart-container"
        >
          <div
            className="chart-box active"
            onClick={() => {
              this.onClickLevels({}, 1);
            }}
          >
            <img src={Data.image} alt="aws image" />
          </div>
        </ArcherElement>
        {this.renderHtml()}
      </ArcherContainer>
    ) : (
      ""
    );
  };

  /** Render specific level
   *  @param {Array} data - The data of the selected level.
   * @param {Number} selectedLevel - SelectedLevel.
   */
  renderLevels = (data, selectedLevel) => {
    let { selectedActiveLevels, selectedHtml } = this.state;

    if (data.length) {
      return data.map((level, currentLevelIndex) => {
        let isActive =
          selectedActiveLevels[`selectedLevel_${selectedLevel}`]?.id ===
          currentLevelIndex;
        let elementId = `selectedLevel_${selectedLevel}_${currentLevelIndex}`;
        return (
          <ArcherElement
            id={elementId}
            relations={
              isActive ? this.onClickLevelsThenDrawArrow(selectedLevel) : []
            }
            key={v4()}
          >
            {/* <li
              className={`${
                selectedLevels[`selectedLevel_${selectedLevel}`]?.id ===
                currentLevelIndex
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                this.onClickLevel({
                  selectedLevel,
                  currentLevelIndex,
                  label: level.label,
                });
              }}
            >
              <span>
                <img src={level.image} alt={level.label} />
              </span>
              {this.getServiceName(level.label, "vpc")}
            </li> */}
            {staticHtml.selectedLevel({
              isActive,
              selectedLevel,
              currentLevelIndex,
              label: this.getServiceName(level.label, "vpc"),
              image: level.image,
              onClickLevel: (arg) => this.onClickLevels(arg),
            })}
          </ArcherElement>
        );
      });
    }
  };

  renderHtml = () => {
    const { selectedHtml } = this.state;
    if (selectedHtml.length) {
      return selectedHtml.map((html, selectedLevel) => {
        if (html.length) {
          return (
            <div className={` global-servies`} style={{ width: "140px" }}>
              <ul>{this.renderLevels(html, selectedLevel)}</ul>
            </div>
          );
        }
      });
    }
  };

  /** Get name in form of capitalize. */
  getServiceName(name, type) {
    if (type === "vpc") {
      return name ? name.toUpperCase() : "";
    } else {
      let firstChar = name ? name.charAt(0).toUpperCase() : "";
      let otherStr = name ? name.toLowerCase().slice(1) : "";
      let string = firstChar + otherStr;
      return string;
    }
  }

  onClickLevels(
    { selectedLevel, currentLevelIndex, label },
    isIntialClick = 0
  ) {
    let { selectedActiveLevels, selectedHtml } = this.state;
    let currentSelectedLevelIndex = `selectedLevel_${selectedLevel}`;

    if (isIntialClick) {
      let { children } = Data;
      selectedHtml = selectedHtml.length ? [] : [children[0]];
      selectedActiveLevels = {};
      this.setState({ selectedActiveLevels, selectedHtml });
    } else {
      if (selectedActiveLevels[currentSelectedLevelIndex]) {
        if (
          selectedActiveLevels[currentSelectedLevelIndex]?.id ===
          currentLevelIndex
        ) {
          delete selectedActiveLevels[currentSelectedLevelIndex];
          selectedHtml.length = selectedLevel + 1;
          this.setState({
            selectedHtml,
            selectedActiveLevels,
          });
        } else {
          this.pushData(selectedLevel, label, currentLevelIndex, 1);
        }
      } else {
        this.pushData(selectedLevel, label, currentLevelIndex);
      }
    }
  }

  pushData(selectedLevel, name, currentLevelIndex, isReplaceData = 0) {
    let { selectedActiveLevels, selectedHtml } = this.state;
    let dataGet = Data.children[0];
    let currentSelectedLevelIndex = `selectedLevel_${selectedLevel}`;
    selectedActiveLevels[currentSelectedLevelIndex] = {
      id: currentLevelIndex,
    };
    // Remove all selected level greater than current selected level
    Object.keys(selectedActiveLevels).forEach((item, inIndex) => {
      let level = item.split("_")[1];
      if (selectedLevel < level) {
        delete selectedActiveLevels[item];
      }
    });
    selectedHtml.length = selectedLevel + 1;

    // Get selected level data
    Object.keys(selectedActiveLevels).forEach((item, inIndex) => {
      if (dataGet[selectedActiveLevels[item].id]?.children) {
        dataGet = dataGet[selectedActiveLevels[item].id]["children"];
      } else {
        dataGet = [];
      }
    });

    // Replace data on specific index
    if (dataGet.length) {
      selectedHtml[selectedLevel + 1] = dataGet;
    }
    this.setState({ selectedActiveLevels, selectedHtml });
  }

  onClickLevelsThenDrawArrow = (selectedLevel) => {
    let { selectedHtml } = this.state;
    let selectedLevelIndex = selectedLevel >= 0 ? selectedLevel + 1 : 0;

    if (selectedHtml.length && selectedHtml[selectedLevelIndex]) {
      return selectedHtml[selectedLevelIndex].map((item, index) => {
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

  render() {
    const { isSelectDepartmentOpen, isSelectProductOpen } = this.state;
    return (
      <Box className="environment-container associate-container">
        <Box className="breadcrumbs">
          {/* <ul>{this.renderBreadCrumbs()}</ul> */}
          <ul>
            <li>
              <a>Synectiks</a>
            </li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li>
              <a>Human Resource</a>
            </li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li>
              <a>Accounts</a>
            </li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li>
              <a>Production</a>
            </li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li>
              <a>Business</a>
            </li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li>
              <a>Fee</a>
            </li>
            <li>
              <i className="fa-solid fa-chevron-right"></i>
            </li>
            <li className="active">
              <a>DynamoDB</a>
            </li>
          </ul>
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
          {this.renderMainBody()}
        </Box>
        <Box className="infra-existing">
          <div className="heading">Infra Existing tags of element</div>
          <Box className="breadcrumbs">
            <ul>
              <li>Synectiks</li>
              <li>Human Resources</li>
              <li>Accounts</li>
              <li>Production</li>
              <li>Business</li>
              <li>Fees</li>
              <li>Dynam DB</li>
            </ul>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default AssociateChartApp;
