import React, { Component } from "react";
import DrTopology from "./DrTopology";
import Topology from "./Topology";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ActivityLogViewDetails from "Views/AppViews/Environments/EnvironmentList/ThreeTierTopology/Components/ActivityLogViewDetails";
import { v4 } from "uuid";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import TabsMenu from "../TabsMenu";
import { removeActiveTabInEnvironmentData } from "Utils";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
class ThreeTierTopology extends Component {
  tabMapping = [
    {
      name: "Topology",
      dataKey: "Topology",
    },
    {
      name: "DR Topology",
      dataKey: "DRTopology",
    },
    {
      name: "IOT Topology",
      dataKey: "IotTopology",
    },
    {
      name: "Lake Topology",
      dataKey: "LakeTopology",
    },
    {
      name: "Mesh Topology",
      dataKey: "MeshTopology",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      isActivityViewDetails: false,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  /** Get url details. */
  getUrlDetails() {
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    const landingZoneId = queryPrm.get("landingZoneId");
    const landingZone = queryPrm.get("landingZone");
    const productName = queryPrm.get("productName");
    const departmentName = queryPrm.get("departmentName");
    const environmentName = queryPrm.get("environmentName");

    return {
      landingZone,
      landingZoneId,
      cloudName,
      departmentName,
      environmentName,
      productName,
    };
  }

  render() {
    const { activeTab, isActivityViewDetails } = this.state;
    const { landingZone, landingZoneId, cloudName, productName } =
      this.getUrlDetails();
    return (
      <Box className="disaster-recovery-container environment-container">
        <Box className="list-heading">
          <HtmlTooltip className="table-tooltip" title={productName}>
            <h3>{productName}</h3>
          </HtmlTooltip>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link
                  to={`${APP_PREFIX_PATH}/assets/environments`}
                  onClick={() => removeActiveTabInEnvironmentData()}
                >
                  <HtmlTooltip className="table-tooltip" title={`Environments`}>
                    Environments
                  </HtmlTooltip>
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <Link
                  to={`${APP_PREFIX_PATH}/assets/environments/environmentlist?landingZone=${landingZone}&cloudName=${cloudName}&landingZoneId=${landingZoneId}`}
                >
                  <HtmlTooltip
                    className="table-tooltip"
                    title={`${cloudName} ${landingZone}`}
                  >
                    {cloudName} &nbsp;(
                    {landingZone})
                  </HtmlTooltip>
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">
                <HtmlTooltip className="table-tooltip" title={productName}>
                  {productName}
                </HtmlTooltip>
              </li>
            </ul>
          </Box>
        </Box>
        {isActivityViewDetails ? (
          <ActivityLogViewDetails
            backToDRS={() => {
              this.setState({ isActivityViewDetails: false });
            }}
          />
        ) : (
          <Box className="services-panel-tabs">
            <Box className="tabs-head text-center">
              <TabsMenu
                tabs={this.tabMapping}
                setActiveTab={this.setActiveTab}
                activeTab={activeTab}
                breakWidth={767}
                key={v4()}
              />
            </Box>
            <Box className="tabs-content">
              {activeTab === 0 && <Topology />}
              {activeTab === 1 && (
                <DrTopology
                  redirectViewDetails={() => {
                    this.setState({ isActivityViewDetails: true });
                  }}
                />
              )}
              {activeTab === 2 && <Box>IOT Topology</Box>}
              {activeTab === 3 && <Box>Lake Topology</Box>}
              {activeTab === 4 && <Box>Mesh Topology</Box>}
            </Box>
          </Box>
        )}
      </Box>
    );
  }
}

export default ThreeTierTopology;
