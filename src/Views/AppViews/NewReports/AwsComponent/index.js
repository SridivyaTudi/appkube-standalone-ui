import React, { Component } from "react";
import { Box, Grid, Button, List, ListItem } from "@mui/material";

class AwsComponent extends Component {
  render() {
    return (
      <>
        <Box className="reports-charts">
          <Grid
            container
            rowSpacing={1}
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <Box className="chart-box">
                <Box className="heading m-b-10">
                  <h4>Spend Overview</h4>
                  <Button
                    className="primary-outline-btn min-width"
                    variant="outlined">
                    View Details
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default AwsComponent;
