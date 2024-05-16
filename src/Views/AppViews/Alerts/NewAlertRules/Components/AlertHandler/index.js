import React, { Component } from "react";
import { Box, Grid, Button, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import Post from "./Componets/Post";

export class AlertHandler extends Component {
  tabMapping = [
    {
      name: "Post",
      dataKey: "post",
      index: 0,
    },
    {
      name: "Tcp",
      dataKey: "tcp",
      index: 1,
    },
    {
      name: "Exec",
      dataKey: "exec",
      index: 2,
    },
    {
      name: "Log",
      dataKey: "log",
      index: 3,
    },
    {
      name: "Slack (default)",
      dataKey: "Slack",
      index: 4,
    },
    {
      name: "Email",
      dataKey: "email",
      index: 5,
    },
    {
      name: "Alert",
      dataKey: "alert",
      index: 6,
    },
    {
      name: "Hipchart",
      dataKey: "hipchart",
      index: 7,
    },
    {
      name: "kafka (local host)",
      dataKey: "kafka",
      index: 8,
    },
    {
      name: "OpsGenie",
      dataKey: "opsGenie",
      index: 9,
    },
    {
      name: "Pushover",
      dataKey: "pushover",
      index: 10,
    }
    
   
  ];
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

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  // Render tabs
  renderTabMenu = () => {
    const { activeTab } = this.state;
    return (
      <List>
        {this.tabMapping.map((tabData, index) => {
          return (
            <ListItem
              key={`ops-tab-${index}`}
              className={index === activeTab ? "active" : ""}
              onClick={() => this.setActiveTab(index)}
            >
              {tabData.name} <i className="fas fa-times"></i>
            </ListItem>
          );
        })}
      </List>
    );
  };

  // Render active tab component
  renderActiveTabOfComponent = () => {
    const { activeTab, selectedGranularity } = this.state;
    return (
      <Box className="tab-content">
        {activeTab === 0 ? (
          <Post />
        ) : activeTab === 1 ? (
          <Box> Tcp</Box>
        ) : activeTab === 2 ? (
          <Box> Exec</Box>
        ) : activeTab === 3 ? (
          <Box> Log</Box>
        ): activeTab === 4 ?(
          <Box> slack (default)</Box>
        ): activeTab === 5 ?(
          <Box>email</Box>
        ): activeTab === 6 ?(
          <Box>Alert</Box>
        ): activeTab === 7 ?(
          <Box>Hipchart</Box>
        ): activeTab === 8 ?(
          <Box> kafka</Box>
        ): activeTab === 9 ?(
          <Box>opsGenie</Box>
        ): activeTab === 10 ?(
          <Box>Pushover</Box>
        ):(
          <></>
        )}
      </Box>
    );
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
                  Add another handler
                  <i className="fas fa-angle-down "></i>
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
                    {this.renderTabMenu()}
                  </Box>
                </Grid>
                <Grid item lg={10} md={9} sm={6} sx={12}>
                  {this.renderActiveTabOfComponent()}
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
