import React, { Component } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { v4 } from "uuid";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";

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
        <Select
          labelId="tabs-menu-small-label"
          id="tabs-menu-small"
          className="tabs-menu"
          value={this.props.activeTab}
          onChange={(e) => this.props.setActiveTab(e.target.value)}
        >
          {this.props.tabs.map((item, index) => {
            return <MenuItem value={index}>{item.name}</MenuItem>;
          })}
        </Select>
      );
    }
  }
}

export default TabsMenu;
