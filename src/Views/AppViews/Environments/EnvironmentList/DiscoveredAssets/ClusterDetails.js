import React from "react";
import { Box, ListItem } from "@mui/material";
import GlobalIcon4 from "assets/img/assetmanager/global-icon4.png";
import GlobalIcon5 from "assets/img/assetmanager/global-icon5.png";
import { v4 } from "uuid";
import TitleIconWithInfoOfCard from "Components/TitleIconWithInfoOfCard";
import { REGEX_TYPE } from "CommonData";
const backgroundColor = [
  "#ff9900",
  "#0089d6",
  "#da4f44",
  "#383874",
  "#ff708b",
  "#416bff",
  "#006bb9",
];
let clusterInfo = [
  {
    image: GlobalIcon4,
    title: "EKS-Cluster",
    type: "EKS",
    data: [],
    active: "",
    style: {},
  },
  {
    image: GlobalIcon5,
    title: "ECS-Cluster",
    type: "ECS",
    data: [],
    active: "",
    style: {},
  },
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
    const result = text.replace(REGEX_TYPE.CAPITAL_LETTER, " $1");
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
          {clusterInfo.map((cluster) => {
            cluster["style"] = {
              border:
                currentActiveCluster === cluster.type
                  ? "2px solid #416bff"
                  : "2px solid #fff",
              with: "296px",
              minHeight: "365px",
            };
            let keys = Object.keys(cluster.type === "EKS" ? eksData : ecsData);
            const data = keys.map((key, innerIndex) => {
              return {
                backgroundColor: backgroundColor[innerIndex],
                label: this.convertToCapitalCase(key),
                value: cluster.type === "EKS" ? eksData[key] : ecsData[key],
              };
            });
            cluster["data"] = data;
            return (
              <TitleIconWithInfoOfCard
                cardDetails={cluster}
                key={v4()}
                onClickCard={(details) =>
                  this.changeActiveCluster(cluster.type)
                }
              />
            );
          })}
        </Box>
        {/* {currentActiveCluster === "EKS" && <EksCluster />} */}
        {/* {currentActiveCluster === "ECS" && <EcsCluster />} */}
      </>
    );
  }
}

export default ClusterDetails;
