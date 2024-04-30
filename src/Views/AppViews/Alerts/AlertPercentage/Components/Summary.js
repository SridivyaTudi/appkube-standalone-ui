import React, { Component } from "react";
import { Box, Button, Grid, List, ListItem } from "@mui/material";
import ChartWrapper from "../../Components/ChartWrapper";
import LineChart from "../../Components/LineChart";

class Summary extends Component {
  render() {
    return (
      <>
        <Box className="affected-resource">
          <List>
            <ListItem>
              <label>Severity</label>
              <Box className="d-flex align-items-center">
                <Box className="high"></Box>
                <span>High</span>
              </Box>
            </ListItem>
            <ListItem>
              <label>Affected Resource</label>
              <span>Prod_DB_SYN14</span>
            </ListItem>
            <ListItem>
              <label>State</label>
              <span>New</span>
            </ListItem>
            <ListItem>
              <label>Monitor Condition</label>
              <span>Fired</span>
            </ListItem>
            <ListItem>
              <label>Fired Time</label>
              <span>08-03-2024; 3:17:17 PM</span>
            </ListItem>
          </List>
        </Box>
        <Box className="alerts-charts" >
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <ChartWrapper  
                data={{
                  title: `Usage`,
                  description:
                    "A standard line chart provides a clear way to compare trends over time.",
                  labelOfBtn: " View Details",
                  link: "#",
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className="alert-details m-t-3">
          <Box className="title">Alert Details </Box>
          <Box className="details-head">
            <List>
              <ListItem>
                <label>Affected Resource : <span>Prod_DB_SYN14</span></label>
              </ListItem>
              <ListItem>
                <label>Affected Resource : <span>Prod_DB_SYN14</span></label>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <label>Affected Resource </label>
                <span>09-03-2024; 3:17:17 PM</span>
              </ListItem>
              <ListItem>
                <label>Affected Resource </label>
                <span>09-03-2024; 3:22:12 PM</span>
              </ListItem>
            </List>
          </Box>
          <Box className="title"> Criterion</Box>
          <Box className="alert-details-content">
            <List>
              <ListItem>
                <label>Metric Name</label>
                <span>Percentage CPU</span>
              </ListItem>
              <ListItem>
                <label>Metric Namespace</label>
                <span>Microsoft.Compute/VirtualMachines</span>
              </ListItem>
              <ListItem>
                <label>Time Aggregation</label>
                <span>Average</span>
                <span>Threshold : 0.2%</span>
              </ListItem>
              <ListItem>
                <label>Operator</label>
                <span>GreaterThan</span>
                <span>Metric value (when alert fired) : 0.62%</span>
              </ListItem>
              <ListItem>
                <label>Dimension Name</label>
                <span>microsoft.resourceID</span>
                <span>microsoft.resourceType</span>
              </ListItem>
              <ListItem>
                <label>Dimension Value</label>
                <span>/subscriptions/5be0a6dc-5104-4088-bd4-86b6587deb36/Res...</span>
                <span>Microsoft.Compute/virtualmachines</span>
              </ListItem>
              <ListItem>
                <label>Description</label>
                <span>CPU alert, greater than 80.0%</span>
              </ListItem>
              <ListItem>
                <label>Target Resource Type</label>
                <span>microsoft.compute/virtualmachines</span>
              </ListItem>
              <ListItem>
                <label>Monitor Service</label>
                <span>Platform</span>
              </ListItem>
              <ListItem>
                <label>Single Type</label>
                <span>Metric</span>
              </ListItem>
              <ListItem>
                <label>Alert ID</label>
                <span>9e8b7d58-1d16-4983-b882-e22ae68ef7a2</span>
              </ListItem>
              <ListItem>
                <label>Alert Rule</label>
                <span>CPU Alert</span>
              </ListItem>
              <ListItem>
                <label>Suppression Status</label>
                <span>None</span>
              </ListItem>
            </List>
          </Box>
        </Box>
      </>
    );
  }
}

export default Summary;
