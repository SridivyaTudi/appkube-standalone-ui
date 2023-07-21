import React, { Component } from "react";
import { Button, Box } from "@mui/material";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Link } from "react-router-dom";
import clusterIcon from "assets/img/assetmanager/cluster-icon.png";
import webLayerIcon from "assets/img/assetmanager/web-layer-icon.png";
import dataLayerIcon from "assets/img/assetmanager/data-layer-icon.png";
import appLayerIcon from "assets/img/assetmanager/app-layer-icon.png";

export class AssociateApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTierSoc: [
        {
          ec2Id: "125636",
          tierData: [
            {
              icon: webLayerIcon,
              label: "Web Layer",
              layer: "01",
            },
            {
              icon: appLayerIcon,
              label: "App Layer",
              layer: "04",
            },
            {
              icon: dataLayerIcon,
              label: "Data Layer",
              layer: "03",
            },
            {
              icon: dataLayerIcon,
              label: "Auxiliary Layer",
              layer: "03",
            },
          ],
          socData: [
            {
              icon: webLayerIcon,
              label: "App Service",
              layer: "01",
            },
            {
              icon: appLayerIcon,
              label: "Data Service",
              layer: "04",
            },
            {
              icon: dataLayerIcon,
              label: "Other Service",
              layer: "03",
            },
          ],
        },
        {
          ec2Id: "125268",
          tierData: [
            {
              icon: webLayerIcon,
              label: "Web Layer",
              layer: "01",
            },
            {
              icon: appLayerIcon,
              label: "App Layer",
              layer: "04",
            },
            {
              icon: appLayerIcon,
              label: "Data Layer",
              layer: "03",
            },
            {
              icon: dataLayerIcon,
              label: "Auxiliary Layer",
              layer: "03",
            },
          ],
          socData: [
            {
              icon: webLayerIcon,
              label: "App Service",
              layer: "01",
            },
            {
              icon: appLayerIcon,
              label: "Data Service",
              layer: "04",
            },
            {
              icon: appLayerIcon,
              label: "Other Service",
              layer: "03",
            },
          ],
        },
        {
          ec2Id: "416495",
          tierData: [
            {
              icon: webLayerIcon,
              label: "Web Layer",
              layer: "01",
            },
            {
              icon: appLayerIcon,
              label: "App Layer",
              layer: "04",
            },
            {
              icon: appLayerIcon,
              label: "Data Layer",
              layer: "03",
            },
            {
              icon: dataLayerIcon,
              label: "Auxiliary Layer",
              layer: "03",
            },
          ],
          socData: [
            {
              icon: webLayerIcon,
              label: "App Service",
              layer: "01",
            },
            {
              icon: appLayerIcon,
              label: "Data Service",
              layer: "04",
            },
            {
              icon: appLayerIcon,
              label: "Other Service",
              layer: "03",
            },
          ],
        },
        {
          ec2Id: "253614",
          tierData: [
            {
              icon: webLayerIcon,
              label: "Web Layer",
              layer: "01",
            },
            {
              icon: appLayerIcon,
              label: "App Layer",
              layer: "04",
            },
            {
              icon: appLayerIcon,
              label: "Data Layer",
              layer: "03",
            },
            {
              icon: dataLayerIcon,
              label: "Auxiliary Layer",
              layer: "03",
            },
          ],
          socData: [
            {
              icon: webLayerIcon,
              label: "App Service",
              layer: "01",
            },
            {
              icon: appLayerIcon,
              label: "Data Service",
              layer: "04",
            },
            {
              icon: appLayerIcon,
              label: "Other Service",
              layer: "03",
            },
          ],
        },
        {
          ec2Id: "778965",
          tierData: [
            {
              icon: webLayerIcon,
              label: "Web Layer",
              layer: "01",
            },
            {
              icon: appLayerIcon,
              label: "App Layer",
              layer: "04",
            },
            {
              icon: appLayerIcon,
              label: "Data Layer",
              layer: "03",
            },
            {
              icon: dataLayerIcon,
              label: "Auxiliary Layer",
              layer: "03",
            },
          ],
          socData: [
            {
              icon: webLayerIcon,
              label: "App Service",
              layer: "01",
            },
            {
              icon: appLayerIcon,
              label: "Data Service",
              layer: "04",
            },
            {
              icon: appLayerIcon,
              label: "Other Service",
              layer: "03",
            },
          ],
        },
      ],
      activeTierTab: "3Tier",
    };
  }

  renderTierSoc() {
    let { dataTierSoc, activeTierTab } = this.state;
    const JSX = [];
    dataTierSoc.map((data, index) => {
      JSX.push(
        <Box className="tiersoc-box" key={data.ec2Id}>
          <Box className="heading">
            <h3>
              <span>
                <img src={clusterIcon} alt="" />
              </span>{" "}
              EC2 ID: {data.ec2Id}
            </h3>
            <Button>Associate App</Button>
          </Box>
          <Box className="contents">
            <Box className="tier-buttons">
              <Button
                className={activeTierTab === "3Tier" ? "active" : ""}
                onClick={(index) => this.handleTierTabToggle("3Tier")}
              >
                3 Tier
              </Button>
              <Button
                className={activeTierTab === "Soa" ? "active" : ""}
                onClick={(index) => this.handleTierTabToggle("Soa")}
              >
                SOA
              </Button>
            </Box>
            <Box className="tier-contents">
              <ul>
                {activeTierTab === "3Tier" &&
                  data.tierData.map((item) => {
                    return (
                      <li key={item.layer}>
                        <span>
                          <img src={item.icon} alt="" />
                        </span>
                        <label>{item.label}</label>
                        <strong>{item.layer}</strong>
                      </li>
                    );
                  })}
                {activeTierTab === "Soa" &&
                  data.socData.map((item) => {
                    return (
                      <li key={item.layer}>
                        <span>
                          <img src={item.icon} alt="" />
                        </span>
                        <label>{item.label}</label>
                        <strong>{item.layer}</strong>
                      </li>
                    );
                  })}
              </ul>
            </Box>
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

  handleTierTabToggle = (type) => {
    this.setState({ activeTierTab: type });
  };

  render() {
    const {} = this.state;
    return <Box className="tiersoc-boxs">{this.renderTierSoc()}</Box>;
  }
}
export default AssociateApp;
