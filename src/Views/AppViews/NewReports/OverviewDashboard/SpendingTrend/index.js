import React, { Component } from "react";
import { Box, Button, Grid, List, ListItemButton } from "@mui/material";
import ChartWrapper from "../../Components/ChartWrapper";
import GroupedBarplotChart from "../../Components/GroupedBarplotChart";
import SelectFilterModal from "../../Components/SelectFilterModal";
import { connect } from "react-redux";
import { getSpendingTrend } from "Redux/Reports/ReportsThunk";
import status from "Redux/Constants/CommonDS";
import { getCurrentOrgId } from "Utils";
import Loader from "Components/Loader";
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
      isSelectDepartmentOpen: false,
      spendingTrendData: [],
      quarterMenuData: [
        {
          menuItem: "daily",
        },
        {
          menuItem: "weekly",
        },
        {
          menuItem: "monthly",
        },
        {
          menuItem: "quarterly",
        },
        {
          menuItem: "half-yearly",
        },
        {
          menuItem: "yearly",
        },
      ],
      selectedGranularity: "quarterly",
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
      this.props.spendingTrendData?.data
    ) {
      const spendingTrendData = this.props.spendingTrendData.data;
      if (spendingTrendData) {
        // console.log(spendingTrendData);
        this.maniplateSpendingTrendData(spendingTrendData.data);
      }
    }
  }

  // Maniplate Spending Trend data
  maniplateSpendingTrendData = (data) => {
    let { spendingTrendData } = this.state;
    spendingTrendData = [];

    if (data) {
      let { current = [], forcast = [], previous = [] } = data;
      spendingTrendData = this.manipulateDateWiseData(
        current.concat(forcast, previous)
      );
    }
    this.setState({ spendingTrendData });
  };

  getMonthDays = (dates) => {
    const month = [
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
    const d = new Date(dates);
    let name = month[d.getMonth()];
    return name;
  };

  manipulateDateWiseData = (data) => {
    let spendTrendData = [];
    if (data?.length) {
      let allData = JSON.parse(JSON.stringify(data));
      let currentSum = 0;
      let previousSum = 0;
      let forcastSum = 0;
      let currentMonth = [];
      let previousMonth = [];
      data.forEach((obj) => {
        if (obj.tenure === "current") {
          currentMonth.push(this.getMonthDays(obj.dates));
        } else if (obj.tenure === "previous") {
          previousMonth.push(this.getMonthDays(obj.dates));
        }
      });
      console.log(currentMonth);

      data.forEach((obj) => {
        if (obj.tenure === "current") {
          currentSum += obj.total;
        }
      });

      data.forEach((obj) => {
        if (obj.tenure === "previous") {
          previousSum += obj.total;
        }
      });

      data.forEach((obj) => {
        if (obj.tenure === "forcast") {
          forcastSum += obj.total;
        }
      });

      data.forEach((obj) => {
        // Find data date wise
        let sameDateData = JSON.parse(
          JSON.stringify(allData.filter((spend) => spend.dates === obj.dates))
        );

        if (sameDateData.length) {
          let pushData = {
            name: this.getMonthDays(obj.dates),
            value1: currentSum,
            value2: previousSum,
            value3: forcastSum,
          };

          spendTrendData.push(pushData);

          // Remove data
          allData = allData.filter((spend) => spend.dates !== obj.dates);
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

  toggleSelectDepartment = () => {
    this.setState({
      isSelectDepartmentOpen: !this.state.isSelectDepartmentOpen,
    });
  };

  quarterMenuSelected = (menuItem) => {
    this.setState({
      selectedGranularity: menuItem,
    });
    this.props.getSpendingTrend({
      cloud: "aws",
      granularity: menuItem,
      compareTo: -1,
      forcast: true,
      orgId: getCurrentOrgId(),
    });
  };

  renderQuarterMenu = () => {
    let { quarterMenuData, selectedGranularity } = this.state;
    return (
      <Box>
        {quarterMenuData?.length ? (
          quarterMenuData.map((menu) => {
            return (
              <ListItemButton
                className="menuItem"
                onClick={() => this.quarterMenuSelected(menu.menuItem)}
                selected={selectedGranularity === menu.menuItem}
              >
                <i className="fa-solid fa-circle-dot"></i> {menu.menuItem}
              </ListItemButton>
            );
          })
        ) : (
          <ListItemButton>There are no data available.</ListItemButton>
        )}
      </Box>
    );
  };

  // Render loder
  renderLoder = () => {
    return (
      <Box className="chart-loader">
        <Loader />
      </Box>
    );
  };
  render() {
    const { isSelectDepartmentOpen, showSelectFilterModal, spendingTrendData } =
      this.state;
    let { spendingTrendData: spendingTrendProps } = this.props;
    let spendingTrendLoder = spendingTrendProps.status === status.IN_PROGRESS;
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
                <i class="fas fa-calendar-minus m-r-2"></i> Last Quarter
              </Button>
              {this.state.isSelectDepartmentOpen === true && (
                <div
                  className={
                    isSelectDepartmentOpen
                      ? "fliter-collapse active"
                      : "fliter-collapse"
                  }
                >
                  {this.renderQuarterMenu()}
                </div>
              )}
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
                    spendingTrendLoder ? (
                      this.renderLoder()
                    ) : (
                      <GroupedBarplotChart data={spendingTrendData} />
                    )
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
