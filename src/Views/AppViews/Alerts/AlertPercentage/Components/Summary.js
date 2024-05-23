import React, { Component } from "react";
import { Box, Button, Grid, List, ListItem } from "@mui/material";
import ChartWrapper from "../../Components/ChartWrapper";
import LineChart from "../../Components/LineChart";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { v4 } from "uuid";

let alertData = [
  {
    titile: "Metric Name",
    text: "Percentage CPU",
  },
  {
    titile: "Metric Namespace",
    text: "Microsoft.Compute/VirtualMachines",
  },
  {
    titile: "Time Aggregation",
    text: "Average",
    description: "Threshold : 0.2%",
  },
  {
    titile: "Operator",
    text: "GreaterThan",
    description: "Metric value (when alert fired) : 0.62%",
  },
  {
    titile: "Dimension Name",
    text: "microsoft.resourceID",
    description: "microsoft.resourceType",
  },
  {
    titile: "Dimension Value",
    text: "subscriptions/5be0a6dc-5104-4088-bd4-86b6587deb36/Res",
    description: "Microsoft.Compute/virtualmachines",
  },
  {
    titile: "Description",
    text: "CPU alert, greater than 80.0%",
  },
  {
    titile: "Target Resource Type",
    text: "microsoft.compute/virtualmachines",
  },
  {
    titile: "Monitor Service",
    text: "Platform",
  },
  {
    titile: "Single Type",
    text: "Metric",
  },
  {
    titile: "Alert ID",
    text: "9e8b7d58-1d16-4983-b882-e22ae68ef7a2",
  },
  {
    titile: "Alert Rule",
    text: "CPU Alert",
  },
  {
    titile: "Suppression Status",
    text: "None",
  },
];

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertData,
    };
  }

  renderAlertDetails = () => {
    let { alertData } = this.state;
    return (
      <List>
        {alertData?.length ? (
          alertData.map((data) => {
            return (
              <ListItem key={v4()}>
                <label>{data.titile}</label>
                <span>
                  <HtmlTooltip className="table-tooltip" title={data.text}>
                    {data.text}
                  </HtmlTooltip>
                </span>
                <span>
                  <HtmlTooltip
                    className="table-tooltip"
                    title={data.description}
                  >
                    {data.description}
                  </HtmlTooltip>
                </span>
              </ListItem>
            );
          })
        ) : (
          <></>
        )}
      </List>
    );
  };
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
        <Box className="alerts-charts">
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
                <label>
                  Affected Resource : <span>Prod_DB_SYN14</span>
                </label>
              </ListItem>
              <ListItem>
                <label>
                  Affected Resource : <span>Prod_DB_SYN14</span>
                </label>
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
            {this.renderAlertDetails()}
          </Box>
        </Box>
      </>
    );
  }
}

export default Summary;
