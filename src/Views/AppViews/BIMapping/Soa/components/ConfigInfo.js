import React, { Component } from "react";
import { Box, Grid } from "@mui/material";

class ConfigInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      selectedInfo: {},
    };
  }

  componentDidMount = () => {
    this.setPreviousData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.currentActiveData !== this.props.currentActiveData) {
      this.setPreviousData();
    }
  };

  setPreviousData = () => {
    let { selectedInfo } = this.state;

    let currentActiveData = this.props.currentActiveData;

    if (currentActiveData?.length) {
      selectedInfo["endPoint"] = currentActiveData[0]?.endPoint;
      selectedInfo["query"] = currentActiveData[0]?.query;
    }

    this.setState({ selectedInfo });
  };

  handleChange = (event, key) => {
    let { name, value } = event.target;
    let { selectedInfo } = this.state;

    selectedInfo[name] = value;
    this.setState({ selectedInfo });
    this.setConfigInfo();
  };

  setConfigInfo = () => {
    let { selectedInfo } = this.state;
    try {
      this.props.setConfigInfo([selectedInfo]);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { style } = this.props;
    let { selectedInfo } = this.state;
    return (
      <Box className="d-block p-b-20 m-t-2" style={style}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="prometheus-endpoint">
              <label className="">Config Endpoint</label>
              <input
                type="text"
                className="form-control m-t-1"
                name="endPoint"
                value={selectedInfo["endPoint"]}
                onChange={this.handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box className="prometheus-endpoint">
              <label className="">Query</label>
              <input
                type="text"
                className="form-control m-t-1"
                value={selectedInfo["query"]}
                name="query"
                onChange={this.handleChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default ConfigInfo;
