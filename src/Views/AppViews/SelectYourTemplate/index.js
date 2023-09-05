import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import javaicon from "assets/img/selectyourtemplate/java-icon.png";
import javascripticon from "assets/img/selectyourtemplate/javascript-icon.png";
import apacheicon from "assets/img/selectyourtemplate/apache-icon.png";
import filetypegoblackicon from "assets/img/selectyourtemplate/file-type-go-black-icon.png";
import mdidatabaseicon from "assets/img/selectyourtemplate/mdi-database-icon.png";
import apachenetbeansideicon from "assets/img/selectyourtemplate/apachenetbeanside-icon.png";
import phpicon from "assets/img/selectyourtemplate/php-icon.png";
import filetypeelasticicon from "assets/img/selectyourtemplate/file-type-elastic-icon.png";
import plaingatsbyicon from "assets/img/selectyourtemplate/plain-gatsby-icon.png";
import nodejsicon from "assets/img/selectyourtemplate/nodejs-icon.png";
import simplepelicanicon from "assets/img/selectyourtemplate/simple-pelican-icon.png";
import plainrubyicon from "assets/img/selectyourtemplate/plain-ruby-icon.png";
import simpleiconsspringboot from "assets/img/selectyourtemplate/simple-icons_springboot.png";
import jenkinsicon from "assets/img/selectyourtemplate/jenkins-icon.png";
import SelectTypePopup from "./Components/SelectTypePopup";
import SelectLanguagePopup from "./Components/SelectLanguagePopup";
import InfoPopup from "./Components/InfoPopup";
import DeployPopup from "./Components/DeployPopup";

export class SelectYourTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectTypePopup: false,
      showSelectLanguagePopup: false,
      showInfoPopup: false,
      showDeployoPopup: false,
    };
  }

  handleTypePopup = () => {
    this.setState({
      showSelectTypePopup: !this.state.showSelectTypePopup,
    });
  };

  handleLanguagePopup = () => {
    this.setState({
      showSelectLanguagePopup: !this.state.showSelectLanguagePopup,
    });
  };

  handleInfoPopup = () => {
    this.setState({
      showInfoPopup: !this.state.showInfoPopup,
    });
  };

  handleDeployoPopup = () => {
    this.setState({
      showDeployoPopup: !this.state.showDeployoPopup,
    });
  };

  render() {
    const {
      showSelectTypePopup,
      showSelectLanguagePopup,
      showInfoPopup,
      showDeployoPopup,
    } = this.state;
    return (
      <Box className="select-your-template-container">
        <Box className="page-header">
          <Grid container rowSpacing={1} alignItems={"center"}>
            <Grid item xs={4}>
              <Box className="page-heading">
                <h3>Select Your Template</h3>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box className="top-search jusitify-content-center">
                <input type="text" className="input" />
                <button className="button">
                  <SearchOutlinedIcon />
                </button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="template-buttons-container">
          <Grid
            container
            rowSpacing={2}
            alignItems={"center"}
            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
          >
            <Grid item xs={12} md={12} lg={6}>
              <div className="d-block heading">Type</div>
              <Box className="buttons m-t-2">
                <Button
                  className="primary-btn min-width-inherit"
                  variant="contained"
                >
                  All Types
                </Button>
                <Button
                  className="primary-outline-btn min-width-inherit"
                  variant="outlined"
                >
                  Application
                </Button>
                <Button
                  className="primary-outline-btn min-width-inherit"
                  variant="outlined"
                >
                  ASP.NET
                </Button>
                <Button
                  className="primary-outline-btn min-width-inherit"
                  variant="outlined"
                >
                  Express
                </Button>
                <Button
                  onClick={this.handleTypePopup}
                  className="primary-outline-btn min-width-inherit"
                  variant="outlined"
                >
                  Custom
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <div className="d-block heading">Languages</div>
              <Box className="buttons m-t-2">
                <Button
                  className="primary-btn min-width-inherit"
                  variant="contained"
                >
                  All languages
                </Button>
                <Button
                  className="primary-outline-btn min-width-inherit"
                  variant="outlined"
                >
                  <img src={javaicon} alt="" className="m-r-1" />
                  Java
                </Button>
                <Button
                  className="primary-outline-btn min-width-inherit"
                  variant="outlined"
                >
                  <img src={javascripticon} alt="" className="m-r-1" />
                  GO Lang
                </Button>
                <Button
                  className="primary-outline-btn min-width-inherit"
                  variant="outlined"
                >
                  <img src={javaicon} alt="" className="m-r-1" />
                  Flask
                </Button>
                <Button
                  onClick={this.handleLanguagePopup}
                  className="primary-outline-btn min-width-inherit"
                  variant="outlined"
                >
                  <img src={javascripticon} alt="" className="m-r-1" />
                  Custom
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="d-block width-100 template-container">
          <div className="d-block heading">Templates</div>
          <Box className="templates d-block width-100">
            <Box className="templates-boxs d-flex">
              <Box className="template-box">
                <img src={apacheicon} alt="" />
                <span className="d-block name">Apache</span>
                <span className="d-block sub-name">Tomcat</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    onClick={this.handleInfoPopup}
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    onClick={this.handleDeployoPopup}
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={filetypegoblackicon} alt="" />
                <span className="d-block name">Basic</span>
                <span className="d-block sub-name">Go</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={mdidatabaseicon} alt="" />
                <span className="d-block name">Dynamo</span>
                <span className="d-block sub-name">Tomcat</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={apachenetbeansideicon} alt="" />
                <span className="d-block name">Basic</span>
                <span className="d-block sub-name">Python</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={phpicon} alt="" />
                <span className="d-block name">Basic</span>
                <span className="d-block sub-name">PHP</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={filetypeelasticicon} alt="" />
                <span className="d-block name">Elastic APM</span>
                <span className="d-block sub-name">Kibana</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={plaingatsbyicon} alt="" />
                <span className="d-block name">Gatsby</span>
                <span className="d-block sub-name">Tomcat</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={nodejsicon} alt="" />
                <span className="d-block name">Node.JS</span>
                <span className="d-block sub-name">Tomcat</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={simplepelicanicon} alt="" />
                <span className="d-block name">Pelican</span>
                <span className="d-block sub-name">Tomcat</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={plainrubyicon} alt="" />
                <span className="d-block name">Ruby on</span>
                <span className="d-block sub-name">Rails</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={simpleiconsspringboot} alt="" />
                <span className="d-block name">Spring Boot</span>
                <span className="d-block sub-name">Tomcat</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
              <Box className="template-box">
                <img src={jenkinsicon} alt="" />
                <span className="d-block name">Jenkins</span>
                <span className="d-block sub-name">Tomcat</span>
                <div className="d-flex m-t-3 buttons">
                  <Button
                    className="primary-outline-btn min-width-inherit m-r-3"
                    variant="outlined"
                  >
                    Info
                  </Button>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    Deploy
                  </Button>
                </div>
              </Box>
            </Box>
            <Box className="back-btn d-block m-t-1">
              <Button
                className="primary-btn min-width-inherit"
                variant="contained"
              >
                Back
              </Button>
            </Box>
          </Box>
        </Box>
        {showSelectTypePopup ? (
          <SelectTypePopup
            showModal={SelectTypePopup}
            handleTypePopup={this.handleTypePopup}
          />
        ) : (
          <></>
        )}
        {showSelectLanguagePopup ? (
          <SelectLanguagePopup
            showModal={SelectLanguagePopup}
            handleLanguagePopup={this.handleLanguagePopup}
          />
        ) : (
          <></>
        )}
        {showInfoPopup ? (
          <InfoPopup
            showModal={InfoPopup}
            handleInfoPopup={this.handleInfoPopup}
          />
        ) : (
          <></>
        )}
        {showDeployoPopup ? (
          <DeployPopup
            showModal={DeployPopup}
            handleDeployoPopup={this.handleDeployoPopup}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
export default SelectYourTemplate;
