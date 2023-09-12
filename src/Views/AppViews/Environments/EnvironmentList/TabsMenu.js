import React, { Component } from "react";
import { v4 } from "uuid";
import { List, ListItem, Select, MenuItem, Box } from "@mui/material";

class TabsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
    this.updateWindowDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.width !== this.state.width) {
      this.updateWindowDimensions();
    }
  };

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    if (this.state.width > this.props.breakWidth) {
      return (
        <List>
          {this.props.tabs.map((tabData, index) => {
            return (
              <ListItem
                key={v4()}
                className={index === this.props.activeTab ? "active" : ""}
                onClick={() => this.props.setActiveTab(index)}
              >
                {tabData.name}
              </ListItem>
            );
          })}
        </List>
      );
    } else {
      return (
        <Box className="tabs-break-width">
          <Select
            labelId="tabs-menu-small-label"
            id="tabs-menu-small"
            className="tabs-menu"
            value={this.props.activeTab}
            onChange={(e) => this.props.setActiveTab(e.target.value)}
          >
            {this.props.tabs.map((item, index) => {
              return <MenuItem value={index} key={v4()}>{item.name}</MenuItem>;
            })}
          </Select>
        </Box>
      );
    }
  }
}

export default TabsMenu;
