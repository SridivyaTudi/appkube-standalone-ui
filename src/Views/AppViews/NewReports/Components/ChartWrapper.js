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
      <Box className="reports-chart-box">
        <Box className="heading m-b-10">
          <Box className="chart-title">
            <h4 className="title">{title}</h4>
            {data?.description ? (
              <span className="description">{data?.description}</span>
            ) : (
              <></>
            )}
          </Box>
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
