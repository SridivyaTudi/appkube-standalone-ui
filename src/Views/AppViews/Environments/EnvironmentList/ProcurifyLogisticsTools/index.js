import EnvironmentsIcon from "assets/img/assetmanager/environments-icon1.png";
import LineOfBusinessIcon from "assets/img/assetmanager/line-of-business-icon.png";
import ProcurifyIcon from "assets/img/assetmanager/procurify-icon.png";
import SslIcon from "assets/img/assetmanager/ssl-icon.png";
import UserCountIcon from "assets/img/assetmanager/user-count-icon.png";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Component } from "react";
import { Link } from "react-router-dom";
import UsaFlag from "assets/img/assetmanager/usa-flag.png";
import AccountPricing from "./AccountPricing";
import Container from "./Container";
import Database from "./Database";
import Environments from "./Environments";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  List,
  ListItem,
} from "@mui/material";

export class ProcurifyLogisticsTools extends Component {
  tabMapping = [
    {
      name: "Environments",
      dataKey: "environments",
    },
    {
      name: "Container",
      dataKey: "container",
    },
    {
      name: "Database",
      dataKey: "database",
    },
    {
      name: "Account and Pricing",
      dataKey: "account",
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      country: "",
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  handleChange = (event) => {
    this.setState({
      country: event.target.value,
    });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <Box className="environment-container">
        <Box className="list-heading">
          <h3 className="m-b-0" style={{ lineHeight: "36px" }}>
            Procurify-Logistics-Tools
          </h3>
          <Button
            className="primary-btn min-width-inherit float-right"
            variant="contained"
          >
            <Link
              className="primary-btn min-width-inherit"
              variant="contained"
              style={{ color: "#ffffff" }}
              to={`${APP_PREFIX_PATH}/assets/environments`}
            >
              All Application
            </Link>
          </Button>
        </Box>
        <Box className="procurify-cards">
          <Box className="procurify-card">
            <Box className="image">
              <img src={ProcurifyIcon} alt="" />
            </Box>
            <Box className="content">
              <label>Client Name</label>
              <strong>Procurify</strong>
            </Box>
          </Box>
          <Box className="procurify-card">
            <Box className="image">
              <img src={UserCountIcon} alt="" />
            </Box>
            <Box className="content">
              <label>User Count</label>
              <strong>257</strong>
            </Box>
          </Box>
          <Box className="procurify-card business-card">
            <Box className="image">
              <img src={LineOfBusinessIcon} alt="" />
            </Box>
            <Box className="content ">
              <label>Line of Business</label>
              <strong>Logistics</strong>
            </Box>
          </Box>
          <Box className="procurify-card">
            <Box className="image">
              <img src={EnvironmentsIcon} alt="" />
            </Box>
            <Box className="content">
              <label>Environments</label>
              <strong>02</strong>
            </Box>
          </Box>
          <Box className="procurify-card">
            <Box className="image">
              <img src={SslIcon} alt="" />
            </Box>
            <Box className="content">
              <label>SSL</label>
              <strong>In build SSL</strong>
            </Box>
          </Box>
          <Box className="procurify-card-buttons">
            <Button
              className="primary-btn min-width-inherit"
              variant="contained"
            >
              <i className="fa-solid fa-trash-can"></i>
            </Button>
            <Button
              className="primary-btn min-width-inherit m-r-0"
              variant="contained"
            >
              <i className="fa-solid fa-rotate-right"></i>
            </Button>
          </Box>
        </Box>
        <Box className="main-information">
          <Box className="d-flex list-heading">
            <h3 className="m-b-0" style={{ lineHeight: "36px" }}>
              Main Information
            </h3>
            <Box className="d-inline-block buttons">
              <Button
                className="primary-outline-btn min-width-inherit"
                variant="outlined"
              >
                <i className="fa-solid fa-code-commit"></i> <span>02</span>
                Commits
              </Button>
              <Button
                className="primary-outline-btn min-width-inherit"
                variant="outlined"
              >
                <i className="fa-solid fa-code-branch"></i> <span>01</span>
                Branch
              </Button>
              <Button
                className="primary-outline-btn min-width-inherit"
                variant="outlined"
              >
                <i className="fa-solid fa-tags"></i> <span>31</span> Tags
              </Button>
            </Box>
          </Box>
          <Box className="main-information-box">
            <Box className="heading">
              <Box className="profile-card">
                <Box className="image">
                  <img src={ProcurifyIcon} alt="" />
                </Box>
                <Box className="content">
                  <label>Procurify</label>
                  <span>V 1.2.3</span>
                </Box>
              </Box>
              <Box className="buttons">
                <Box className="stop-button">
                  <label>Workspace</label>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                  >
                    <i className="fa-regular fa-circle-stop m-r-2"></i> Stop
                  </Button>
                </Box>
                <Box className="region">
                  <label>Region</label>
                  <FormControl
                    className="Region-fliter"
                    sx={{ m: 1, minWidth: 100 }}
                  >
                    <Select
                      className="fliter-toggel"
                      value={this.state.country}
                      onChange={this.handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <img src={UsaFlag} alt="" className="p-r-5" /> USA
                      </MenuItem>
                      <MenuItem value={10}>
                        <img src={UsaFlag} alt="" className="p-r-5" /> India
                      </MenuItem>
                      <MenuItem value={20}>
                        <img src={UsaFlag} alt="" className="p-r-5" /> china
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box className="information-contents">
              <Box className="content">
                <label>Status</label>
                <p>
                  <span>
                    <i className="fa-solid fa-gear"></i>
                  </span>
                  Running
                </p>
              </Box>
              <Box className="content">
                <label>Creation Time</label>
                <p>Local : 10 May 2023, 06:19:21</p>
                <p>UTC : 12 May 2023, 21:09:07</p>
              </Box>
              <Box className="content">
                <label>Deployment Time</label>
                <p>Local : 11 May 2023, 06:19:21</p>
                <p>UTC : 12 May 2023, 21:09:07</p>
              </Box>
            </Box>
            <Box className="information-tags">
              <Box className="tags-heading">
                <h3>Tags</h3>
                <Button
                  className="primary-btn min-width-inherit"
                  variant="contained"
                >
                  Add Tags
                </Button>
              </Box>
              <Box className="tags-contains">
                <List>
                  <ListItem>
                    <i className="fa-solid fa-circle"></i> Readme
                  </ListItem>
                  <ListItem>
                    <i className="fa-solid fa-circle"></i> CI/CD Configuration
                  </ListItem>
                  <ListItem>
                    <i className="fa-solid fa-circle"></i> Add License
                  </ListItem>
                  <ListItem>
                    <i className="fa-solid fa-circle"></i> Add Changelog
                  </ListItem>
                  <ListItem>
                    <i className="fa-solid fa-circle"></i> Add Contributing
                  </ListItem>
                  <ListItem>
                    <i className="fa-solid fa-circle"></i> Auto DevOp Enabled
                  </ListItem>
                  <ListItem>
                    <i className="fa-solid fa-circle"></i> Add Kubernetes
                    Cluster
                  </ListItem>
                  <ListItem>
                    <i className="fa-solid fa-circle"></i> Add Wiki
                  </ListItem>
                  <ListItem>
                    <i className="fa-solid fa-circle"></i> Configure Integration
                  </ListItem>
                  <ListItem>
                    <i className="fa-solid fa-circle"></i> CI/CD Configuration
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <List>
              {this.tabMapping.map((tabData, index) => {
                return (
                  <ListItem
                    key={`ops-tab-${index}`}
                    className={index === activeTab ? "active" : ""}
                    onClick={() => this.setActiveTab(index)}
                  >
                    {tabData.name}
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box className="tabs-content">
            {activeTab === 0 ? (
              <Environments />
            ) : activeTab === 1 ? (
              <Container />
            ) : activeTab === 2 ? (
              <Database />
            ) : activeTab === 3 ? (
              <AccountPricing />
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}
export default ProcurifyLogisticsTools;
