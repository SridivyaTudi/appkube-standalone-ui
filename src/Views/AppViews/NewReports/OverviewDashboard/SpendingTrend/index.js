import React, { Component } from "react";
import { Box, Button, Grid, List, ListItem } from "@mui/material";
import ChartWrapper from "../../Components/ChartWrapper";
import GroupedBarplotChart from "../../Components/GroupedBarplotChart";
import SelectFilterModal from "../../Components/SelectFilterModal";
import { connect } from "react-redux";
import { getSpendingTrend } from "Redux/Reports/ReportsThunk";
import status from "Redux/Constants/CommonDS";
import { getCurrentOrgId } from "Utils";
import Loader from "Components/Loader";
import { GRANULARITY_DROPDOWN_DATA, GRANULARITY_TYPE } from "CommonData";
import { v4 } from "uuid";
import { getDateInWeek } from "Utils";
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
      spendingTrendChartData: {},
      selectedGranularity: GRANULARITY_TYPE.QUARTERLY.toLowerCase(),
      isGranularityOpen: false,
    };
  }

  componentDidMount = () => {
    this.props.getSpendingTrend({
      cloud: "aws",
      granularity: this.state.selectedGranularity,
      compareTo: -1,
      forcast: true,
      orgId: getCurrentOrgId(),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.spendingTrendData.status !==
        this.props.spendingTrendData.status &&
      this.props.spendingTrendData.status === status.SUCCESS &&
      this.props.spendingTrendData?.data &&
      this.props.spendingTrendData.data.data
    ) {
      this.maniplateSpendingTrendData(this.props.spendingTrendData.data.data);
    }
  }

  // Maniplate Spending Trend data
  maniplateSpendingTrendData = (data) => {
    let { spendingTrendChartData, selectedGranularity } = this.state;

    if (data) {
      let { current = [], forcast = [], previous = [] } = data;
      if (selectedGranularity === "daily") {
        const dataSource = current.concat(forcast, previous);
        spendingTrendChartData = {
          daily: {
            name: dataSource[0].dates,
            current: 0,
            forcast: 0,
            previous: 0,
            [dataSource[0].tenure]: dataSource[0].total,
          },
        };
      } else {
        spendingTrendChartData = this.manipulateDateWiseData(
          current.concat(forcast, previous)
        );
      }
    }
    this.setState({ spendingTrendChartData });
  };

  getListByGranularity = () => {
    const { selectedGranularity } = this.state;
    if (selectedGranularity === "weekly") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];
      return days;
    } else if (selectedGranularity === "monthly") {
      const weeks = ["Week1", "Week2", "Week3", "Week4", "Week5"];
      return weeks;
    } else if (selectedGranularity === "quarterly") {
      const quarter = ["Month1", "Month2", "Month3"];
      return quarter;
    } else if (selectedGranularity === "yearly") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months;
    }
  };

  getMonthDays = (dates, nameList) => {
    const { selectedGranularity } = this.state;
    if (selectedGranularity === "weekly") {
      const d = new Date(dates).getDay();
      return nameList[d];
    } else if (selectedGranularity === "monthly") {
      const weekNumber = getDateInWeek(dates);
      return nameList[weekNumber - 1];
    } else if (selectedGranularity === "quarterly") {
      const d = new Date(dates).getMonth();
      return nameList[d % 3];
    } else if (selectedGranularity === "yearly") {
      const d = new Date(dates).getMonth();
      return nameList[d];
    }
  };

  manipulateDateWiseData = (data) => {
    let spendTrendData = {};
    const dataObject = {
      name: "",
      current: 0,
      forcast: 0,
      previous: 0,
    };
    const nameList = this.getListByGranularity();
    if (data?.length) {
      spendTrendData = data.reduce((acc, crr) => {
        const monthStr = this.getMonthDays(crr.dates, nameList);
        if (acc[monthStr]) {
          acc[monthStr][crr.tenure] =
            acc[monthStr][crr.tenure] + parseFloat(crr.total);
        } else {
          acc[monthStr] = {
            ...dataObject,
            name: monthStr,
            [crr.tenure]: parseFloat(crr.total),
          };
        }
        return acc;
      }, {});
      spendTrendData = nameList.map((e) => {
        if (spendTrendData[e]) {
          return spendTrendData[e];
        } else {
          return {
            ...dataObject,
            name: e,
          };
        }
      });
    }

    return spendTrendData;
  };

  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
    });
  };

  getSelectedGranularity = () => {
    let { selectedGranularity } = this.state;
    let findValue = GRANULARITY_DROPDOWN_DATA.find(
      (data) => data.key === selectedGranularity
    );

    return findValue.value || "";
  };

  toggleSelectDepartment = () => {
    this.setState({
      isGranularityOpen: !this.state.isGranularityOpen,
    });
  };

  renderDropDownData = () => {
    let { selectedGranularity } = this.state;
    return GRANULARITY_DROPDOWN_DATA.map((data) => {
      return (
        <ListItem
          onClick={() => this.onClickDropDown(data.key)}
          key={v4()}
          className={`${data.key === selectedGranularity ? "active" : ""}`}
        >
          <i className="fa-solid fa-circle-dot"></i>
          {data.value}
        </ListItem>
      );
    });
  };

  onClickDropDown = (selectedGranularity) => {
    if (selectedGranularity !== this.state.selectedGranularity) {
      this.props.getSpendingTrend({
        cloud: "aws",
        granularity: selectedGranularity,
        compareTo: -1,
        forcast: true,
        orgId: getCurrentOrgId(),
      });
      this.setState({ selectedGranularity, isGranularityOpen: false });
    }
  };

  // Render loder
  renderLoder = () => {
    return (
      <Box className="chart-loader">
        <Loader />
      </Box>
    );
  };

  renderMultipleChart = (chartData) => {
    let { selectedGranularity } = this.state;
    if (Object.values(chartData).length > 0) {
      return <GroupedBarplotChart data={Object.values(chartData)} granularity={selectedGranularity} />;
    } else {
      return null;
    }
  };

  render() {
    const { isGranularityOpen, showSelectFilterModal, spendingTrendChartData } =
      this.state;
    return (
      <Box className="new-reports-container">
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
        <Box className="list-heading">
          <h3>Spending Trend</h3>
          <Box className="d-flex align-items-center justify-content-end m-t-2">
            <Button
              className="light-btn p-l-15 p-r-15 m-r-3"
              onClick={this.handleSelectFilterModal}
            >
              <i className="fas fa-filter m-r-2"></i> Filter
            </Button>
            <Box className="fliter-button">
              <Button
                className="light-btn p-l-15 p-r-15"
                onClick={this.toggleSelectDepartment}
              >
                <i class="fas fa-calendar-minus m-r-2"></i>{" "}
                {this.getSelectedGranularity()}
              </Button>
              {this.state.isGranularityOpen === true && (
                <div
                  className={
                    isGranularityOpen
                      ? "fliter-collapse active"
                      : "fliter-collapse"
                  }
                >
                  <List>{this.renderDropDownData()}</List>
                </div>
              )}

              <div
                className={
                  isGranularityOpen
                    ? "fliters-collapse-bg active"
                    : "fliters-collapse-bg"
                }
                onClick={this.toggleSelectDepartment}
              />
            </Box>
          </Box>
        </Box>
        <Box className="reports-tab-section m-t-3">
          <Box className="reports-charts">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ChartWrapper
                  data={{
                    title: "Previous Year Spending VS Present Year Spending",
                    description:
                      " See how much you have spent previous year vs present year",
                    labelOfBtn: " View Details",
                  }}
                  ChartComponent={
                    this.props.spendingTrendData.status === status.IN_PROGRESS
                      ? this.renderLoder()
                      : this.renderMultipleChart(spendingTrendChartData)
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

function mapStateToProps(state) {
  const { spendingTrendData } = state.reports;
  return {
    spendingTrendData,
  };
}

const mapDispatchToProps = {
  getSpendingTrend,
};

export default connect(mapStateToProps, mapDispatchToProps)(navigateRouter(SpendingTrend));
