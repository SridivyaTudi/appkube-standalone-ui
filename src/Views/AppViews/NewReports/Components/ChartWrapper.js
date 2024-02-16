import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import {Link} from "react-router-dom";
class ChartWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { style, ChartComponent, data } = this.props;
    let { title, labelOfBtn } = data;
    return (
      <Grid
        container
        rowSpacing={1}
        style={style}
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4}>
          <Box className="chart-box">
            <Box className="heading m-b-10">
              <h4>{title}</h4>
              <Link to={`/app/new-reports/spend-overview`}>
                <Button
                  className="primary-outline-btn min-width"
                  variant="outlined"
                >
                  {labelOfBtn}
                </Button>
              </Link>
            </Box>
            {ChartComponent}
          </Box>
        </Grid>
      </Grid>
    );
  }
}

export default ChartWrapper;
