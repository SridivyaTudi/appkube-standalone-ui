import React, { Component } from "react";
import { Button, Box } from "@mui/material";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Link } from "react-router-dom";
import clusterIcon from "assets/img/assetmanager/cluster-icon.png";
import { v4 } from "uuid";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { PRODUCT_CATEGORY_ENUM, getCurrentUserRole } from "Utils";
import {
  APPKUBE_UI_ENDPOINT,
  REGEX_TYPE,
  ELEMENT_EXPLORER_MAPPING,
  USER_RBAC_TYPE,
} from "CommonData";
import RBAC_MAPPING from "Utils/RbacMapping";
import Rbac from "Views/AppViews/Rbac";

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

class AssociateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTierTabIndexes: [],
    };
  }

  handleTierTabToggle = (index, type) => {
    let { activeTierTabIndexes } = this.state;
    if (
      activeTierTabIndexes.includes(index) &&
      type !== PRODUCT_CATEGORY_ENUM.SOA
    ) {
      activeTierTabIndexes = activeTierTabIndexes.filter(
        (item) => item !== index
      );
    }
    if (
      !activeTierTabIndexes.includes(index) &&
      type !== PRODUCT_CATEGORY_ENUM.THREE_TIER
    ) {
      activeTierTabIndexes.push(index);
    }
    this.setState({ activeTierTabIndexes });
  };

  convertStringToCapCase = (string) => {
    const result = string.replace(REGEX_TYPE.CAPITAL_LETTER, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  getExplorerLink = (elementType, id) => {
    let element = elementType.toUpperCase();
    return `${
      ELEMENT_EXPLORER_MAPPING[element]
        ? `${APPKUBE_UI_ENDPOINT}${ELEMENT_EXPLORER_MAPPING[element].replace(
            "#element-id#",
            id
          )}`
        : "#"
    }`;
  };
  renderTierSoc() {
    const { activeTierTabIndexes } = this.state;
    const dataTierSoc = this.props.data;
    const JSX = [];
    const { landingZone, landingZoneId, cloudName } = this.getUrlDetails();
    const { CREATE_PRODUCT_ENVIRONMENT } = RBAC_MAPPING;

    dataTierSoc.forEach((data, index) => {
      const tier3Data = Object.entries(data.threeTier);
      const soaData = Object.entries(data.soa);
      JSX.push(
        <Box className="tiersoc-box" key={v4()}>
          <Box className="heading">
            <h3>
              <p>
                <img src={clusterIcon} alt="" />
              </p>
              <HtmlTooltip className="table-tooltip" title={data.instanceId}>
                <span>
                  {data.elementType} ID: {data.instanceId}
                </span>
              </HtmlTooltip>
            </h3>
            <Rbac permissions={[CREATE_PRODUCT_ENVIRONMENT]}>
              <Button
                className={`primary-text-btn min-width`}
                component={Link}
                variant="contained"
                to={`${APP_PREFIX_PATH}/assets/environments/associatechartapp?landingZone=${landingZone}&cloudName=${cloudName}&landingZoneId=${landingZoneId}&elementType=${data.elementType}&instanceId=${data.instanceId}`}
              >
                Associate App
              </Button>
            </Rbac>
          </Box>
          <Box className="contents">
            <Box className="d-block width-100">
              <Box className="tier-buttons">
                <Button
                  className={
                    !activeTierTabIndexes.includes(index) ? "active" : ""
                  }
                  onClick={() =>
                    this.handleTierTabToggle(
                      index,
                      PRODUCT_CATEGORY_ENUM.THREE_TIER
                    )
                  }
                >
                  3 Tier
                </Button>
                <Button
                  className={
                    activeTierTabIndexes.includes(index) ? "active" : ""
                  }
                  onClick={() =>
                    this.handleTierTabToggle(index, PRODUCT_CATEGORY_ENUM.SOA)
                  }
                >
                  SOA
                </Button>
              </Box>
              <Box className="tier-contents">
                <ul>
                  {!activeTierTabIndexes.includes(index)
                    ? tier3Data.map((item) => {
                        return (
                          <li key={v4()}>
                            <span>
                              <img src={item.icon} alt="" />
                            </span>
                            <label>
                              {this.convertStringToCapCase(item[0])}
                            </label>
                            <strong>{item[1]}</strong>
                          </li>
                        );
                      })
                    : soaData.map((item) => {
                        return (
                          <li key={v4()}>
                            <span>
                              <img src={item.icon} alt="" />
                            </span>
                            <label>
                              {this.convertStringToCapCase(item[0])}
                            </label>
                            <strong>{item[1]}</strong>
                          </li>
                        );
                      })}
                </ul>
              </Box>
            </Box>
          </Box>
          <Box className="buttons">
            <Button
              className="primary-outline-btn min-width button"
              component={Link}
              variant="contained"
              to={`${APP_PREFIX_PATH}/assets/environments/ecscluster?landingZone=${landingZone}&cloudName=${cloudName}&landingZoneId=${landingZoneId}&elementType=${data.elementType}`}
            >
              View Services
            </Button>
            <HtmlTooltip
              className="table-tooltip"
              title={`${data.elementType} Explorer`}
            >
              <Button
                className="primary-btn min-width button"
                variant="contained"
                component={Link}
                target="_blank"
                to={this.getExplorerLink(data.elementType, data.id)}
                disabled={
                  !ELEMENT_EXPLORER_MAPPING[data.elementType.toUpperCase()]
                }
              >
                <p>{data.elementType} Explorer</p>
              </Button>
            </HtmlTooltip>
          </Box>
        </Box>
      );
    });
    return JSX;
  }

  getUrlDetails() {
    const queryPrm = new URLSearchParams(document.location.search);
    const landingZone = queryPrm.get("landingZone");
    const cloudName = queryPrm.get("cloudName");
    const landingZoneId = queryPrm.get("landingZoneId");

    return { landingZone, landingZoneId, cloudName };
  }
  render() {
    return (
      <Box className="tiersoc-boxs">
        {this.props.data.length ? this.renderTierSoc() : <></>}
      </Box>
    );
  }
}
export default AssociateApp;
