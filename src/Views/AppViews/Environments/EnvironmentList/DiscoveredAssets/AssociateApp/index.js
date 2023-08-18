import React, { Component } from "react";
import { Button, Box } from "@mui/material";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Link } from "react-router-dom";
import clusterIcon from "assets/img/assetmanager/cluster-icon.png";
import { v4 } from "uuid";

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
              {data.elementType} ID: {data.id}
            </h3>
            <Button
              className="primary-text-btn min-width"
              component={Link}
              variant="contained"
              to={`${APP_PREFIX_PATH}/environments/associatechartapp?elementType=${data.elementType}&elementId=${data.id}`}
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
