import React from "react";
import { Box, List, ListItem } from "@mui/material";
import dummyData from "./dummy.json";
import EksCluster from "./EksCluster";
import EcsCluster from "./EcsCluster";
import GlobalIcon4 from "assets/img/assetmanager/global-icon4.png";
import GlobalIcon5 from "assets/img/assetmanager/global-icon5.png";
import { v4 } from 'uuid';
class ClusterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveCluster: "eksCluster",
    };
  }

  changeActiveCluster = (cluster) => {
    this.setState({ currentActiveCluster: cluster });
  };

  render() {
    const { currentActiveCluster } = this.state;
    return (
      <>
        <Box className="environment-boxs m-t-4">
          <Box
            className="environment-box"
            onClick={() => this.changeActiveCluster("eksCluster")}
            style={{
              border:
                currentActiveCluster === "eksCluster"
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
              <List>
                {dummyData.eksCluster.map((item) => {
                  return (
                    <ListItem key={v4()}>
                      <Box className="data-text">
                        <span
                          style={{
                            backgroundColor: item.backgroundColor,
                          }}
                        ></span>
                        <p>{item.name}</p>
                      </Box>
                      <label>{item.value}</label>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
          <Box
            className="environment-box"
            onClick={() => this.changeActiveCluster("ecsCluster")}
            style={{
              border:
                currentActiveCluster === "ecsCluster"
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
              <List>
                {dummyData.ecsCluster.map((item) => {
                  return (
                    <ListItem key={v4()}>
                      <Box className="data-text">
                        <span
                          style={{
                            backgroundColor: item.backgroundColor,
                          }}
                        ></span>
                        <p>{item.name}</p>
                      </Box>
                      <label>{item.value}</label>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Box>
        {/* {currentActiveCluster === "eksCluster" && <EksCluster />}
        {currentActiveCluster === "ecsCluster" && <EcsCluster />} */}
      </>
    );
  }
}

export default ClusterDetails;
