import React, { Component } from "react";
import { Link } from "react-router-dom";
import DeploymentImg1 from "assets/img/assetmanager/deployment-img1.png";
import DeploymentImg2 from "assets/img/assetmanager/deployment-img2.png";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

class DeployProject extends Component {
  render() {
    return (
      <Box className="deploy-project-container">
        <Box className="page-heading">
          <h3>Deploy product</h3>
        </Box>
        <Box className="opration-mode-section text-center">
          <Box className="opration-head-section">
            <h4>Select Deployment Type</h4>
            <p>
              Use our pre-existing template or you can create your own code or
              migrate your project to get started
            </p>
          </Box>
          <Box className="opration-cards">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Link to={`${APP_PREFIX_PATH}/assets/environments/SelectYourTemplate`}>
                  <Box className="opration-card">
                    <Box className="card-images">
                      <img src={DeploymentImg1} alt="opration" />
                    </Box>
                    <Box className="card-title">Use Pre-existing Template</Box>
                    <p>
                      choose from Pre-existing templates to start your products
                    </p>
                  </Box>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link to={`${APP_PREFIX_PATH}/assets/environments/configurtopology`}>
                  <Box className="opration-card">
                    <Box className="card-images">
                      <img src={DeploymentImg2} alt="opration" />
                    </Box>
                    <Box className="card-title">Create from Scratch</Box>
                    <p>Create your own or migrate an existing products</p>
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box className="d-block">
            <Button className="primary-btn" variant="contained">
              <Link style={{ color: "white" }} to={""}>
                Back
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default DeployProject;
