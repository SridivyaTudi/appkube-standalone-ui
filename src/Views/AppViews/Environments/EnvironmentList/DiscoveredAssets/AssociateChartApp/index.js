import React, { Component } from "react";
import { Button, Box, Grid, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import chartLogo from "assets/img/assetmanager/chart-logo.png";
import calendarMouseIcon from "assets/img/assetmanager/calendar-mouse-icon.png";
import databaseIcon from "assets/img/assetmanager/database-icon.png";
import BusinessAssociationMapping from "Views/AppViews/Environments/EnvironmentList/DiscoveredAssets/Components/BusinessAssociationMapping";
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
export class AssociateChartApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectDepartmentOpen: false,
      isSelectProductOpen: false,
      selectedActiveBAMLevels: {},
      clickBreadCrumbDetails: {},
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

  /** Render the BreadCrumbs. */
  renderBreadCrumbs(isBreadCrumb = 1) {
    let { selectedActiveBAMLevels, BAMData } = this.state;

    let activeBAM = Object.keys(selectedActiveBAMLevels);
    let breadcrumbs = [
      <>
        <li
          className={`${BAMData.length === 1 ? "active" : ""}`}
          onClick={() => {
            isBreadCrumb ? (
              this.setState({
                clickBreadCrumbDetails: {
                  isIntialClick: 1,
                  breadcrumbId: v4(),
                },
              })
            ) : (
              <></>
            );
          }}
          key={v4()}
        >
          <a>{Data.label}</a>
        </li>
        {isBreadCrumb && !BAMData.length   ? (
          <li key={v4()}>
            <i className="fa-solid fa-chevron-right"></i>
          </li>
        ) : (
          <></>
        )}
      </>,
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
                  this.setState({
                    clickBreadCrumbDetails: {
                      selectedLevel,
                      currentLevelIndex,
                      label,
                      isIntialClick: 0,
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

  render() {
    const {
      isSelectDepartmentOpen,
      isSelectProductOpen,
      clickBreadCrumbDetails,
      selectedActiveBAMLevels,
    } = this.state;
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
          <BusinessAssociationMapping
            data={Data}
            setBreadCrumbs={(selectedActiveBAMLevels, BAMData) => {
              this.setState({ selectedActiveBAMLevels, BAMData });
            }}
            clickBreadCrumbDetails={clickBreadCrumbDetails}
          />
        </Box>
        <Box className="infra-existing">
          <div className="heading">Infra Existing tags of element</div>
          <Box className="breadcrumbs">
            <ul>{this.renderBreadCrumbs(0)}</ul>
          </Box>
        </Box>
        <Box className="d-block width-100 text-center m-t-4">
          {Object.keys(selectedActiveBAMLevels).length === 6 ? (
            <Button className="primary-btn min-width" variant="contained">
              Submit
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  }
}
export default AssociateChartApp;
