import React from "react";
import { Box, List, ListItem } from "@mui/material";
import GlobalIcon4 from "assets/img/assetmanager/global-icon4.png";
import GlobalIcon5 from "assets/img/assetmanager/global-icon5.png";
import { v4 } from "uuid";

const backgroundColor = [
  "#ff9900",
  "#0089d6",
  "#da4f44",
  "#383874",
  "#ff708b",
  "#416bff",
  "#006bb9",
];

class ClusterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveCluster: "EKS",
    };
  }

  changeActiveCluster = (cluster) => {
    this.setState({ currentActiveCluster: cluster });
    this.props.setCategory(cluster);
  };

  convertToCapitalCase = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  renderClusterData = (clusterData) => {
    let JSX = [];
    let colorIndex = 0;
    for (const data in clusterData) {
      JSX.push(
        <ListItem key={v4()}>
          <Box className="data-text">
            <span
              style={{
                backgroundColor: backgroundColor[colorIndex],
              }}
            ></span>
            <p>{this.convertToCapitalCase(data)}</p>
          </Box>
          <label>{clusterData[data]}</label>
        </ListItem>
      );
      colorIndex++;
    }
    return JSX;
  };

  render() {
    const { currentActiveCluster } = this.state;
    const { eksData, ecsData } = this.props;
    return (
      <>
        <Box className="cluster-heading m-t-4">Cluster</Box>
        <Box className="environment-boxs m-t-4">
          <Box
            className="environment-box"
            onClick={() => this.changeActiveCluster("EKS")}
            style={{
              border:
                currentActiveCluster === "EKS"
                  ? "2px solid #416bff"
                  : "2px solid #fff",
            }}
          >
            <Box className="environment-title">
              <Box className="environment-image">
                <img src={GlobalIcon4} alt="" />
              </Box>
              <Box className="title-name">EKS-Cluster</Box>
            </Box>
            <Box className="data-contant">
              <List>{this.renderClusterData(eksData)}</List>
            </Box>
          </Box>
          <Box
            className="environment-box"
            onClick={() => this.changeActiveCluster("ECS")}
            style={{
              border:
                currentActiveCluster === "ECS"
                  ? "2px solid #416bff"
                  : "2px solid #fff",
            }}
          >
            <Box className="environment-title">
              <Box className="environment-image">
                <img src={GlobalIcon5} alt="" />
              </Box>
              <Box className="title-name">ECS-Cluster</Box>
            </Box>
            <Box className="data-contant">
              <List>{this.renderClusterData(ecsData)}</List>
            </Box>
          </Box>
        </Box>
        {/* {currentActiveCluster === "EKS" && <EksCluster />} */}
        {/* {currentActiveCluster === "ECS" && <EcsCluster />} */}
      </>
    );
  }
}

export default ClusterDetails;
