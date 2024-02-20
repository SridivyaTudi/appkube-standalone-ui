import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
class ChartWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { style, ChartComponent, data } = this.props;
    let { title, labelOfBtn, link } = data;
    return (
      <Box className="chart-box">
        <Box className="heading m-b-10">
          <h4>{title}</h4>
          <Link to={`${link ? link : "#"} `}>
            <Button
              className="primary-outline-btn min-width"
              variant="outlined"
            >
              {labelOfBtn}
            </Button>
          </Link>
        </Box>
        <Box className="chart-content">{ChartComponent}</Box>
      </Box>
    );
  }
}

export default ChartWrapper;
