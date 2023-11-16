import React, { Component } from "react";
import PhpIcon from "assets/img/assetmanager/php-icon.png";
import RubyIcon from "assets/img/assetmanager/ruby-icon.png";
import NetIcon from "assets/img/assetmanager/net-icon.png";
import PythonIcon from "assets/img/assetmanager/python-icon.png";
import LangIcon from "assets/img/assetmanager/lang-icon.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ConfigureHorizontal from "./ConfigureHorizontal";

class ConfigureTopology extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    return (
      <Box className="configure-topology-container">
        <Box className="page-heading">
          <h3>Configure Topology</h3>
        </Box>
        <Box className="configur-head">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} md={11} lg={8}>
              <Box className="button-group">
                <Button
                  className="primary-btn min-width-inherit m-r-3"
                  variant="contained"
                >
                  <i className="fab fa-java m-r-2"></i> Java
                </Button>
                <Button
                  className="light-btn min-width-inherit m-r-3"
                  variant="contained"
                >
                  <img src={PhpIcon} alt="php" className="m-r-2" /> Php
                </Button>
                <Button
                  className="light-btn min-width-inherit m-r-3"
                  variant="contained"
                >
                  <img src={RubyIcon} alt="ruby" className="m-r-2" /> Ruby
                </Button>
                <Button
                  className="light-btn min-width-inherit m-r-3"
                  variant="contained"
                >
                  <img src={NetIcon} alt="net" className="m-r-2" /> .Net
                </Button>
                <Button
                  className="light-btn min-width-inherit m-r-3"
                  variant="contained"
                >
                  <img src={PythonIcon} alt="paython" className="m-r-2" />{" "}
                  Python
                </Button>
                <Button
                  className="light-btn min-width-inherit m-r-3"
                  variant="contained"
                >
                  <img src={LangIcon} alt="lang" className="m-r-2" /> Lang
                </Button>
                <Button
                  className="primary-btn primary-custom-btn min-width-inherit"
                  variant="contained"
                >
                  Custom <i className="fas fa-chevron-down p-l-10"></i>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* <ConfigureVartical /> */}
        <ConfigureHorizontal />
      </Box>
    );
  }
}

export default ConfigureTopology;
