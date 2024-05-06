import React, { Component } from "react";
import { Box, Grid, Button, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

export class AlertHandler extends Component {
  tabComponentsList;
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      isBulkActionDropDownOpen: false,
      tabData: [],
      tabComponents: [],
    };
    // this.tabComponentsList = {
    //   tcp: <Tcp />,
    //   exec: <Exec />,
    //   post: <Post />,
    //   log: <Log />,
    //   'stack(default)': <StackDefault />,
    //   alerta: <Alerta />,
    //   email: <Email />,
    //   hipChat: <Hipchat />,
    //   'Kafka(localhost)': <Kafka />,
    // };
  }
  handleAlertSelection = (event) => {
    const { tabData, tabComponents } = this.state;
    const { value } = event.target;
    tabData.push(value);
    tabComponents.push(this.tabComponentsList[value]);
    this.setState({
      tabData,
      tabComponents,
    });
  };

  toggleTab = (activeTab) => {
    this.setState({
      activeTab,
    });
  };

  deleteTabData = (index) => {
    const { tabData } = this.state;
    tabData.splice(index, 1);
    this.setState({
      tabData,
    });
  };

  toggleBulkAction = () => {
    this.setState({
      isBulkActionDropDownOpen: !this.state.isBulkActionDropDownOpen,
    });
  };

  renderDropDownData = () => {
    return [
      "Post",
      "tcp",
      "exec",
      "log",
      "slack (default)",
      "email",
      "alert",
      "hipchart",
      "kafka (local host)",
      "opsGenie",
      "Pushover",
    ].map((data, index) => {
      return (
        <ListItem key={index}>
          {" "}
          <i className="fa-solid fa-circle-dot"></i>
          {data}
        </ListItem>
      );
    });
  };

  createTabs = (tabData) => {
    const retData = [];

    for (let i = 0; i < tabData.length; i++) {
      retData
        .push
        // <NavItem>
        //   <NavLink
        //     className={`${activeTab == i ? 'side-active' : ''}`}
        //     onClick={() => {
        //       this.toggleTab(i);
        //     }}
        //   >
        //     {tabData[i]}
        //     <i
        //       className="fa fa-close"
        //       onClick={() => {
        //         this.deleteTabData(i);
        //       }}
        //     ></i>
        //   </NavLink>
        // </NavItem>
        ();
    }
    return retData;
  };
  createTabPanes = (tabComponents) => {
    const retData = [];
    for (let i = 0; i < tabComponents.length; i++) {
      // retData.push(<TabPane tabId={i}>{tabComponents[i]}</TabPane>);
    }
    return retData;
  };
  render() {
    let { isBulkActionDropDownOpen } = this.state;
    return (
      <Box className="alert-details">
        <Box className="alert-detail-head">
          <label>Alert Handler</label>
          <Button className="primary-btn min-width" variant="contained">
            Save Rule
          </Button>
        </Box>
        <Box className="alert-details-description">
          <Box className="condition-box">
            <Box className="condition-header">
              <Box className="send-alert-text">Send this alert to:</Box>
              <Box className="mapping-fliter m-r-2">
                <Box
                  className="fliter-toggel p-l-15 p-r-15"
                  onClick={this.toggleBulkAction}
                >
                  Select time series
                  <i className="fas fa-angle-down"></i>
                </Box>
                {isBulkActionDropDownOpen && (
                  <div
                    className={
                      isBulkActionDropDownOpen
                        ? "fliter-collapse active"
                        : "fliter-collapse"
                    }
                  >
                    <List>{this.renderDropDownData()}</List>
                  </div>
                )}

                <div
                  className={
                    isBulkActionDropDownOpen
                      ? "fliters-collapse-bg active"
                      : "fliters-collapse-bg"
                  }
                  onClick={this.toggleBulkAction}
                />
              </Box>
              {/* <Box className="greater-select">
                <select
                  className="form-control"
                  id="rousourceGroup"
                  // onChange={this.handleAlertSelection}
                >
                  <option value="Add another Handler">
                    Add another Handler
                  </option>
                  <option value="post">post</option>
                  <option value="tcp">tcp</option>
                  <option value="exec">exec</option>
                  <option value="log">log</option>
                  <option value="stack(default)">stack(default)</option>
                  <option value="email">email</option>
                  <option value="alerta">alerta</option>
                  <option value="hipChat">hipChat</option>
                  <option value="Kafka(localhost)">Kafka (localhost)</option>
                </select>
              </Box> */}
            </Box>
            <Box className="alert-handler-box">
              <Grid container spacing={2}>
                <Grid item lg={2} md={3} sm={6} sx={12}>
                  <Box className="alert-left-box">
                    <List>
                      <ListItem>
                        <Link to={`#`} className="active">
                          Post<i className="fas fa-times"></i>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          tcp <i className="fas fa-times"></i>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          exec <i className="fas fa-times"></i>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          exec <i className="fas fa-times"></i>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          exec <i className="fas fa-times"></i>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          exec <i className="fas fa-times"></i>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          exec <i className="fas fa-times"></i>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          exec <i className="fas fa-times"></i>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to={`#`}>
                          exec <i className="fas fa-times"></i>
                        </Link>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item lg={9} md={9} sm={6} sx={12}>
                  <Box className="tab-content">
                    <Box className="alert-handler-span">
                      Parameters for this Alert Handler
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box className="form-group">
                          <label className="alert-handler-label">
                            HTTP endpoint for POST request
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Placeholder"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <label className="alert-handler-label">
                            Header Key
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Placeholder"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="form-group">
                          <label className="alert-handler-label">
                            Header Value
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Placeholder"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default AlertHandler;
