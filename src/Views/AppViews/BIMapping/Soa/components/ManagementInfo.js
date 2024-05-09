import React, { Component } from "react";
import { Box, Grid } from "@mui/material";
import { ADD_PRODUCT_ENUMS } from "Utils";
import { connect } from "react-redux";

class ManagementInfo extends Component {
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

  // Set the input changes.
  handleChange = (event) => {
    let { name, value } = event.target;
    let { selectedInfo } = this.state;

    selectedInfo[name] = value;
    this.setState({ selectedInfo });
    this.setManagementInfo();
  };

  setManagementInfo = () => {
    let { selectedInfo } = this.state;
    try {
      this.props.setManagentInfo([selectedInfo]);
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
              <label className="">Prometheus Endpoint</label>
              <input
                type="text"
                className="form-control "
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
                className="form-control "
                name="query"
                value={selectedInfo["query"]}
                onChange={this.handleChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { createProductFormData } = state.biMapping;
  return {
    createProductFormData,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManagementInfo);
