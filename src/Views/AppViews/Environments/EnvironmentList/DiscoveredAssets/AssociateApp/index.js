import React, { Component } from "react";
import { Button, Box } from "@mui/material";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Link } from "react-router-dom";
import clusterIcon from "assets/img/assetmanager/cluster-icon.png";
import { v4 } from "uuid";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

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
export class AssociateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTierTabIndexes: [],
    };
  }

  handleTierTabToggle = (index, type) => {
    let { activeTierTabIndexes } = this.state;
    if (activeTierTabIndexes.includes(index) && type !== "soa") {
      activeTierTabIndexes = activeTierTabIndexes.filter(
        (item) => item !== index
      );
    }
    if (!activeTierTabIndexes.includes(index) && type !== "3Tier") {
      activeTierTabIndexes.push(index);
    }
    this.setState({ activeTierTabIndexes });
  };

  convertStringToCapCase = (string) => {
    const result = string.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  renderTierSoc() {
    const { activeTierTabIndexes } = this.state;
    const dataTierSoc = this.props.data;
    const JSX = [];
    dataTierSoc.map((data, index) => {
      const tier3Data = Object.entries(data.threeTier);
      const soaData = Object.entries(data.soa);
      JSX.push(
        <Box className="tiersoc-box" key={data.id}>
          <Box className="heading">
            <h3>
              <span>
                <img src={clusterIcon} alt="" />
              </span>
              {data.elementType} ID:
              <HtmlTooltip title={data.instanceId}>
                {data.instanceId}
              </HtmlTooltip>
            </h3>
            <Button
              className="primary-text-btn min-width"
              component={Link}
              variant="contained"
              onClick={() => {
                const queryPrm = new URLSearchParams(document.location.search);
                localStorage.setItem(
                  "landingZone",
                  queryPrm.get("landingZone")
                );
                localStorage.setItem("cloudName", queryPrm.get("cloudName"));
              }}
              to={`${APP_PREFIX_PATH}/environments/associatechartapp?elementType=${data.elementType}&instanceId=${data.instanceId}`}
            >
              Associate App
            </Button>
          </Box>
          <Box className="contents">
            <div className="d-block width-100">
              <Box className="tier-buttons">
                <Button
                  className={
                    !activeTierTabIndexes.includes(index) ? "active" : ""
                  }
                  onClick={() => this.handleTierTabToggle(index, "3Tier")}
                >
                  3 Tier
                </Button>
                <Button
                  className={
                    activeTierTabIndexes.includes(index) ? "active" : ""
                  }
                  onClick={() => this.handleTierTabToggle(index, "soa")}
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
            </div>
          </Box>
          <Box className="buttons">
            <Button
              className="primary-outline-btn min-width"
              component={Link}
              variant="contained"
              to={`${APP_PREFIX_PATH}/environments/ecscluster`}
            >
              View Services
            </Button>
            <Button className="primary-btn min-width" variant="contained">
              EC2 Explorer
            </Button>
          </Box>
        </Box>
      );
    });
    return JSX;
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
