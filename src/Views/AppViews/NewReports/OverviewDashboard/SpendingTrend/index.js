import React, { Component } from "react";
import { Box, Button, Grid } from "@mui/material";
import ChartWrapper from "../../Components/ChartWrapper";
import GroupedBarplotChart from "../../Components/GroupedBarplotChart";
import SelectFilterModal from "../../Components/SelectFilterModal";
import { navigateRouter } from "Utils/Navigate/navigateRouter";

let verticalBarChartData = [
  {
    label: "Compute Cost",
    value: 110011100,
  },
  {
    label: "Network ",
    value: 40267984,
  },
  {
    label: "Storage",
    value: 30672088,
  },
  {
    label: "Database",
    value: 53980105,
  },
  {
    label: "Others",
    value: 81489445,
  },
];

class SpendingTrend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectFilterModal: false,
    };
  }
  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
    });
  };
  render() {
    const { showSelectFilterModal } = this.state;
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3>Spending Trend</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() =>
                  this.props.navigate("/app/new-reports/over-view-dashboard")
                }
              >
                Overview Dashboard
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Spending Trend</li>
            </ul>
          </Box>
        </Box>
        <Box className="d-flex align-items-center justify-content-end m-t-2">
          <Button
            className="light-btn p-l-15 p-r-15 m-r-3"
            onClick={this.handleSelectFilterModal}
          >
            <i className="fas fa-filter m-r-2"></i> Filter
          </Button>
          <Button className="light-btn p-l-15 p-r-15">
            <i className="fas fa-calendar-minus m-r-2"></i> Last Month
          </Button>
        </Box>
        <Box className="reports-tab-section m-t-3">
          <Box className="reports-charts">
            <Grid
              container
             spacing={3}
            >
              <Grid item xs={12}>
                <ChartWrapper
                  data={{
                    title: "Previous Year Spending VS Present Year Spending",
                    description:
                      " See how much you have spent previous year vs present year",
                    labelOfBtn: " View Details",
                  }}
                  ChartComponent={
                    <GroupedBarplotChart data={verticalBarChartData} />
                  }
                  // style={{ height: '450px', width: '840px' }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        {showSelectFilterModal ? (
          <SelectFilterModal
            showModal={showSelectFilterModal}
            handleSelectFilterModal={this.handleSelectFilterModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default navigateRouter(SpendingTrend);
