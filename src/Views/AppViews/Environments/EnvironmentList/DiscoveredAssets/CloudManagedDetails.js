import React from "react";
import { Box, List, ListItem } from "@mui/material";
import Lambda from "assets/img/assetmanager/cloud-managed-icon1.png";
import S3 from "assets/img/assetmanager/cloud-managed-icon2.png";
import SQS from "assets/img/assetmanager/cloud-managed-icon3.png";
import SNS from "assets/img/assetmanager/cloud-managed-icon4.png";
import Redshift from "assets/img/assetmanager/cloud-managed-icon5.png";
import RDS from "assets/img/assetmanager/cloud-managed-icon6.png";
import AppMesh from "assets/img/assetmanager/cloud-managed-icon7.png";
import Kinesis from "assets/img/assetmanager/cloud-managed-icon8.png";
import TimeSeries from "assets/img/assetmanager/cloud-managed-icon9.png";
import Athena from "assets/img/assetmanager/cloud-managed-icon10.png";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import status from "Redux/Constants/CommonDS";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import TabsMenu from "../TabsMenu";
import { v4 } from "uuid";
import {
  getSelectedInfraTopologyView,
  setSelectedInfraTopologyView,
} from "Utils";

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

const filterTabs = {
  1: "app",
  2: "data",
  3: "datalake",
  4: "servicemesh",
};

class CloudManagedDetails extends React.Component {
  tableMapping = [
    {
      name: "All",
    },
    {
      name: "App",
    },
    {
      name: "Data",
    },
    {
      name: "Datalake",
    },
    {
      name: "ServiceMesh",
    },
  ];
  dbMapping = [
    {
      name: "All",
      dataKey: "0",
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      serivceImages: [
        Lambda,
        S3,
        SQS,
        SNS,
        Redshift,
        RDS,
        AppMesh,
        Kinesis,
        TimeSeries,
        Athena,
      ],
      activeTab: 0,
      activeCategory: 0,
      activeDbTab: 0,
      activeDbTabId: 0,
    };
  }

  componentDidMount = () => {
    if (this.props.infraTopologyDbCategories.data) {
     
      const data = this.props.infraTopologyDbCategories.data;
      data.forEach((item) => {
        this.dbMapping.push({ name: item.name, dataKey: item.id });
      });
      this.setPreviousCategory()
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.infraTopologyCategoryWiseData.data !==
        this.props.infraTopologyCategoryWiseData.data &&
      this.props.infraTopologyCategoryWiseData.status === status.SUCCESS
    ) {
      this.setState({
        activeTab: 0,
        activeCategory: 0,
        activeDbTabId: 0,
        activeDbTab: 0,
      });
    }

    if (prevProps.currentActiveNode !== this.props.currentActiveNode) {
      this.setState({ activeTab: 0, activeCategory: 0, activeDbTab: 0 });
    }

    if (prevState.activeDbTab !== this.state.activeDbTab) {
      let data = this.filterCloudManagedData(
        this.props.infraTopologyCategoryWiseData.data,
        filterTabs[this.state.activeTab]
      );
      data = this.filterCloudDatabyDB(data);
      if (data.length) {
        this.props.setCurrentTopologyCategory(data[0].elementType);
      } else {
        this.props.setCurrentTopologyCategory("");
      }
    }

    if (prevState.activeTab !== this.state.activeTab) {
      const data = this.filterCloudManagedData(
        this.props.infraTopologyCategoryWiseData.data,
        filterTabs[this.state.activeTab]
      );
      if (data.length) {
        this.props.setCurrentTopologyCategory(data[0].elementType);
      } else {
        this.props.setCurrentTopologyCategory("");
      }
    }
  };

  setActiveTab = (activeTab) => {
    this.setState({
      activeTab,
      activeCategory: 0,
      activeDbTabId: 0,
      activeDbTab: 0,
    });
  };

  setActiveDbTab = (tab, activeDbTab) => {
    this.setState({
      activeDbTab,
      activeDbTabId: tab.dataKey,
      activeCategory: 0,
    });
  };

  filterCloudManagedData = (data, filterTab) => {
    if (!filterTab) {
      return data;
    }
    return data.filter((item) => item.category.toLowerCase() === filterTab);
  };

  filterCloudDatabyDB = (data) => {
    const { activeDbTabId } = this.state;
    if (activeDbTabId === 0 || activeDbTabId === "0") {
      return data;
    }
    return data.filter((item) => item.dbCategoryId === activeDbTabId);
  };

  renderTable = (data) => {
    const { activeCategory, activeTab, activeDbTab } = this.state;
    let cloudData = this.filterCloudManagedData(data, filterTabs[activeTab]);
    if (activeDbTab) {
      cloudData = this.filterCloudDatabyDB(cloudData);
    }
    const JSX = [];
    const childJSX = [];
    if (activeTab === 2) {
      JSX.push(
        <Box sx={{ width: "100%" }} className="data-cloud-managed" key={v4()}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={3}>
              <Box className="cloud-managed-tab">
                <Box>
                  <List>
                    {this.dbMapping.map((tabData, index) => {
                      return (
                        <ListItem
                          key={v4()}
                          className={index === activeDbTab ? "active" : ""}
                          onClick={() => this.setActiveDbTab(tabData, index)}
                        >
                          {tabData.name}
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box className="tabs-content m-t-0">
                <Box className="cloud-managed-cards">
                  <Box className="cloud-managed-cards-scroll">
                    {cloudData?.forEach((item, index) => {
                      childJSX.push(
                        <Box
                          className={`service-card ${
                            activeCategory === index ? "active" : ""
                          }`}
                          onClick={() => {
                            this.setState({ activeCategory: index });
                            this.props.setCurrentTopologyCategory(
                              item.elementType
                            );
                          }}
                          key={v4()}
                        >
                          <Box className="service-icon">
                            <img
                              src={this.state.serivceImages[index]}
                              alt="serviceicon"
                            />
                          </Box>
                          <Box className="service-contant">
                            <HtmlTooltip
                              className="table-tooltip"
                              title={item.elementType}
                            >
                              <label>{item.elementType}</label>
                            </HtmlTooltip>

                            <strong>{item.totalRecord}</strong>
                          </Box>
                        </Box>
                      );
                    })}
                    {childJSX.length ? (
                      childJSX
                    ) : (
                      <p
                        style={{
                          fontSize: "16px",
                          margin: "30% auto",
                          color: "#000",
                        }}
                      >
                        No Data Available!
                      </p>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      );
    } else {
      cloudData.forEach((item, index) => {
        childJSX.push(
          <Box
            className={`service-card ${
              activeCategory === index ? "active" : ""
            }`}
            onClick={() => {
              this.setState({ activeCategory: index });
              this.props.setCurrentTopologyCategory(item.elementType);
              let infraViewDetails = getSelectedInfraTopologyView();
              setSelectedInfraTopologyView({
                ...infraViewDetails,
                activeCategory: index,
                elementType: item.elementType,
              });
            }}
            key={v4()}
          >
            <Box className="service-icon">
              <img src={this.state.serivceImages[index]} alt="serviceicon" />
            </Box>
            <Box className="service-contant">
              <HtmlTooltip className="table-tooltip" title={item.elementType}>
                <label>{item.elementType}</label>
              </HtmlTooltip>
              <strong>{item.totalRecord}</strong>
            </Box>
          </Box>
        );
      });
      if (cloudData.length) {
        JSX.push(
          <Box className="cloud-managed-cards" key={v4()}>
            <Box className="cloud-managed-cards-scroll">{childJSX}</Box>
          </Box>
        );
      }
    }
    if (JSX.length) {
      return JSX;
    } else {
      return [
        <Box className="cloud-managed-cards" key={v4()}>
          <Box className="cloud-managed-cards-scroll">
            <p style={{ fontSize: "16px", margin: "22% auto", color: "#000" }}>
              No Data Available!
            </p>
          </Box>
        </Box>,
      ];
    }
  };

  setPreviousCategory = () => {
    let viewDetails = getSelectedInfraTopologyView();

    if (viewDetails) {
      let { elementType, activeCategory } = viewDetails;
      if (elementType) {
        this.setState({ activeCategory });
        this.props.setCurrentTopologyCategory(elementType);
      }
    }
  };
  render() {
    const { activeTab } = this.state;
    return (
      <Box className="global-service-penal">
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <TabsMenu
              tabs={this.tableMapping}
              setActiveTab={this.setActiveTab}
              activeTab={activeTab}
              breakWidth={767}
            />
          </Box>
          <Box className="tabs-content">
            <Box className="cloud-managed-section">
              {this.props.infraTopologyCategoryWiseData.data?.length ? (
                this.renderTable(this.props.infraTopologyCategoryWiseData.data)
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  const { infraTopologyCategoryWiseData, infraTopologyDbCategories } =
    state.environmentData;
  return { infraTopologyCategoryWiseData, infraTopologyDbCategories };
};

export default connect(mapStateToProps)(CloudManagedDetails);
