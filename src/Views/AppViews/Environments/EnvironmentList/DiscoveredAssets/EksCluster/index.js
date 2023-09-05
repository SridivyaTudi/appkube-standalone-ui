import React from "react";
import dummyData from "../dummy.json";
import { Box } from "@mui/material";
import { v4 } from "uuid";

class EksCluster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Box className="resources-section">
          <h4>EKS Resources</h4>
          <Box className="account-list-conitant">
            <Box className="account-list-conitant-scroll">
              {dummyData.eksResources.map((item) => {
                return (
                  <Box className="account-list-details" key={v4()}>
                    <Box className="d-block">
                      <strong>{item.value}</strong>
                      <p>{item.title}</p>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

export default EksCluster;
