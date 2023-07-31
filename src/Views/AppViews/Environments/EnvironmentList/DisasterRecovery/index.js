import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import noAvaliableBox from "assets/img/assetmanager/no-avaliable-box.png";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  List,
  ListItem,
  Button,
  Grid,
} from "@mui/material";

class DisasterRecovery extends Component {
  tabMapping = [
    {
      name: "DR Topology",
      dataKey: "DRTopology",
    },
    {
      name: "Topology",
      dataKey: "Topology",
    },
    {
      name: "Health",
      dataKey: "Health",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <Box className="disaster-recovery-container">
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <List>
              {this.tabMapping.map((tabData, index) => {
                return (
                  <ListItem
                    key={`${index}`}
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
            {activeTab === 0 && (
              <>
                <Box className="list-heading">
                  <h3>Majesco</h3>
                  <Button
                    className="primary-btn min-width"
                    component={Link}
                    variant="contained"
                    to={`${APP_PREFIX_PATH}/environments`}
                  >
                    Back to Infra View
                  </Button>
                </Box>
                <Box className="disaster-recovery-chart">
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={9}>
                      <Box className="chart">
                        <Box className="heading">
                          <h3>Realtime Disaster Recovery Mode</h3>
                          <Button
                            className="primary-btn min-width"
                            variant="contained"
                          >
                            Application FailOver
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box className="failover-box">
                        <Box className="heading">
                          <h3>Failover Activity Status</h3>
                        </Box>
                        <Box className="no-avaliable-box">
                          <div className="image"><img src={noAvaliableBox} alt="" /> </div>
                          <strong>No Activity Avaliable</strong>
                          <p>Status will be displayed based on the request</p>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
            {activeTab === 1 && (
              <Box>
                <Box className="list-heading">
                  <h3>Disaster recovery</h3>
                  <Button
                    className="primary-btn min-width"
                    component={Link}
                    variant="contained"
                    to={`${APP_PREFIX_PATH}/environments`}
                  >
                    Back to Infra View
                  </Button>
                </Box>
              </Box>
            )}
            {activeTab === 2 && <Box>Health</Box>}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default DisasterRecovery;
