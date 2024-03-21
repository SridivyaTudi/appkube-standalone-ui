import React, { Component } from "react";
import { Box, Grid } from "@mui/material";
import ChartWrapper from "../../Components/ChartWrapper";
import HorizontalBarChart from "Views/AppViews/NewReports/Components/HorizontalBarChart";
import VerticalBarchart from "Views/AppViews/NewReports/Components/VerticalBarchart";
import DonutChart from "Views/AppViews/NewReports/Components/DonutChart";
import MultiLineChart from "Views/AppViews/NewReports/Components/MultiLineChart";
import GaugeChart from "Views/AppViews/NewReports/Components/GaugeChart";
import { connect } from "react-redux";
import {
  getSpendOverview,
  getTopUsedService,
  getPotentialSavings,
  getCostTopAccounts,
  getSpendingTrend,
} from "Redux/Reports/ReportsThunk";
import status from "Redux/Constants/CommonDS";
import { getCurrentOrgId } from "Utils";
import Loader from "Components/Loader";

const totalUsedServiceColor = [
  "#A145FF",
  "#FA6298",
  "#FAA24B",
  "#F9D33D",
  "#F9D33D",
];

const potentialSavingColor = ["#FF708B", "#FFBA69", "#01F1E3", "#8676FF"];

class AwsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spendOverviewData: [],
      spendOverviewTotal: 0,
      topUsedServiceData: [],
      potentialSavingsData: [],
      costTopAccountsData: [],
      spendingTrendData: [],
    };
  }

  componentDidMount = () => {
    this.props.getSpendOverview({
      serviceCategory: "all",
      cloud: "aws",
      granularity: "quarterly",
      compareTo: -1,
      orgId: getCurrentOrgId(),
    });
    this.props.getTopUsedService({
      serviceCategory: "all",
      cloud: "aws",
      granularity: "quarterly",
      compareTo: -1,
      noOfRecords: 10,
      order: "top",
      orgId: getCurrentOrgId(),
    });
    this.props.getPotentialSavings({
      cloud: "aws",
      granularity: "quarterly",
      compareTo: -1,
      orgId: getCurrentOrgId(),
    });
    this.props.getCostTopAccounts({
      cloud: "aws",
      account: "all",
      granularity: "quarterly",
      compareTo: -1,
      noOfRecords: 10,
      order: "top",
      orgId: getCurrentOrgId(),
    });
    this.props.getSpendingTrend({
      cloud: "aws",
      granularity: "monthly",
      compareTo: -1,
      forcast: true,
      orgId: getCurrentOrgId(),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.spendOverviewData.status !==
        this.props.spendOverviewData.status &&
      this.props.spendOverviewData.status === status.SUCCESS &&
      this.props.spendOverviewData?.data
    ) {
      const spendOverviewData = this.props.spendOverviewData.data;
      if (spendOverviewData) {
        this.maniplateSpendOverviewData(spendOverviewData.data);
      }
    }
    if (
      prevProps.topUsedServiceData.status !==
        this.props.topUsedServiceData.status &&
      this.props.topUsedServiceData.status === status.SUCCESS &&
      this.props.topUsedServiceData?.data
    ) {
      const topUsedServiceData = this.props.topUsedServiceData.data;
      if (topUsedServiceData) {
        this.maniplateTopUsedServiceData(topUsedServiceData.data);
      }
    }
    if (
      prevProps.potentialSavingsData.status !==
        this.props.potentialSavingsData.status &&
      this.props.potentialSavingsData.status === status.SUCCESS &&
      this.props.potentialSavingsData?.data
    ) {
      const potentialSavingsData = this.props.potentialSavingsData.data;
      if (potentialSavingsData) {
        this.maniplatePotentialSavingData(potentialSavingsData.data);
      }
    }
    if (
      prevProps.costTopAccountsData.status !==
        this.props.costTopAccountsData.status &&
      this.props.costTopAccountsData.status === status.SUCCESS &&
      this.props.costTopAccountsData?.data
    ) {
      const costTopAccountsData = this.props.costTopAccountsData.data;
      if (costTopAccountsData) {
        this.maniplateCostTopAccountsData(costTopAccountsData.data);
      }
    }
    if (
      prevProps.spendingTrendData.status !==
        this.props.spendingTrendData.status &&
      this.props.spendingTrendData.status === status.SUCCESS &&
      this.props.spendingTrendData?.data
    ) {
      const spendingTrendData = this.props.spendingTrendData.data;
      if (spendingTrendData) {
        this.maniplateSpendingTrendData(spendingTrendData.data.forcast);
      }
    }
  }

  // Manipulate spendoverview data
  maniplateSpendOverviewData = (data) => {
    let { spendOverviewData, spendOverviewTotal } = this.state;
    spendOverviewTotal = 0;
    spendOverviewData = [];
    if (data?.length) {
      data.forEach((obj) => {
        if (!["Grand Total"].includes(obj.serviceCategory)) {
          spendOverviewData.push({
            age_group: obj.serviceCategory,
            population: obj.total,
            percentage: obj.percentage,
          });
        } else {
          spendOverviewTotal = parseInt(obj.total);
        }
      });
    }
    this.setState({ spendOverviewData, spendOverviewTotal });
  };

  // Manipulate Top Used Service data
  maniplateTopUsedServiceData = (data) => {
    let { topUsedServiceData } = this.state;
    topUsedServiceData = [];
    if (data?.length) {
      data.forEach((obj, index) => {
        if (
          !["PREVIOUS_TOTAL", "PERCENTAGE", "CURRENT_TOTAL"].includes(
            obj.elementType
          )
        ) {
          topUsedServiceData.push({
            label: obj.elementType,
            value: obj.total,
            color: totalUsedServiceColor[index],
          });
        } 
      });
    }
    this.setState({ topUsedServiceData });
  };

  // Manipulate Potential Saving data
  maniplatePotentialSavingData = (data) => {
    let { potentialSavingsData } = this.state;
    potentialSavingsData = [];
    if (data?.length) {
      potentialSavingsData = data.map((obj, index) => {
        return {
          name: obj.instanceType,
          value: obj.total,
          color: potentialSavingColor[index],
        };
      });
    }
    this.setState({ potentialSavingsData });
  };

  // Manipulate Cost Top Accounts data
  maniplateCostTopAccountsData = (data) => {
    let { costTopAccountsData } = this.state;
    costTopAccountsData = [];
    if (data?.length) {
      costTopAccountsData = data.map((obj) => {
        return {
          name: obj.department,
          value: obj.total,
        };
      });
    }
    this.setState({ costTopAccountsData });
  };

  // Maniplate Spending Trend data
  maniplateSpendingTrendData = (data) => {
    let { spendingTrendData } = this.state;
    spendingTrendData = [];
    if (data?.length) {
      spendingTrendData = data.map((obj) => {
        return {
          date: new Date(obj.dates),
          last_quarter: obj.total,
          current_quarter: 35000,
          forecasted_spend: 13000,
        };
      });
    }
    this.setState({ spendingTrendData });
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
    let {
      spendOverviewData,
      spendOverviewTotal,
      topUsedServiceData,
      potentialSavingsData,
      costTopAccountsData,
      spendingTrendData,
    } = this.state;
    let {
      spendOverviewData: spendoverviewProps,
      topUsedServiceData: topUsedServiceProps,
      potentialSavingsData: potentialSavingsProps,
      costTopAccountsData: costTopAccountsProps,
      spendingTrendData: spendingTrendProps,
    } = this.props;
    let spendOverviewLoder = spendoverviewProps.status === status.IN_PROGRESS;
    let topUsedServiceLoder = topUsedServiceProps.status === status.IN_PROGRESS;
    let potentialSavingsLoder =
      potentialSavingsProps.status === status.IN_PROGRESS;
    let costTopAccountsLoder =
      costTopAccountsProps.status === status.IN_PROGRESS;
    let spendingTrendLoder = spendingTrendProps.status === status.IN_PROGRESS;
    return (
      <>
        <Box className="reports-charts">
          <Grid container spacing={3}>
            <Grid item xs={12} md={5} lg={3}>
              <ChartWrapper
                data={{
                  title: "Spend Overview",
                  labelOfBtn: "View Details",
                  link: "/app/new-reports/over-view-dashboard/spend-overview",
                }}
                ChartComponent={
                  spendOverviewLoder ? (
                    this.renderLoder()
                  ) : (
                    <DonutChart
                      data={spendOverviewData}
                      width={250}
                      height={300}
                      otherData={{
                        centerValue: `$${spendOverviewTotal}`,
                      }}
                    />
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={7} lg={6}>
              <ChartWrapper
                data={{
                  title: "Top Used Service ",
                  labelOfBtn: " View Details",
                  description: "Total Cost Incurred",
                  link: "/app/new-reports/over-view-dashboard/top-use-services",
                }}
                ChartComponent={
                  topUsedServiceLoder ? (
                    this.renderLoder()
                  ) : (
                    <HorizontalBarChart
                      data={topUsedServiceData}
                      chardBeforeRenderHTML={
                        <Box className="total-cost-incurred">
                          <p>
                            {" "}
                            90,579{" "}
                            <span>
                              {" "}
                              <i class="fas fa-sort-up p-l-5"></i> 10 &#37;
                            </span>
                          </p>
                        </Box>
                      }
                    />
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={5} lg={3}>
              <ChartWrapper
                data={{
                  title: "Potential Savings",
                  labelOfBtn: " View Details",
                  link: "/app/new-reports/over-view-dashboard/potential-sevings",
                }}
                ChartComponent={
                  potentialSavingsLoder ? (
                    this.renderLoder()
                  ) : (
                    <GaugeChart data={potentialSavingsData} />
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={7} lg={6}>
              <ChartWrapper
                data={{
                  title: "Cost of Top Accounts",
                  labelOfBtn: "View Details",
                  link: "/app/new-reports/over-view-dashboard/cost-top-accounts",
                }}
                ChartComponent={
                  costTopAccountsLoder ? (
                    this.renderLoder()
                  ) : (
                    <VerticalBarchart
                      data={costTopAccountsData}
                      style={{ width: "100%", height: "350" }}
                    />
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <ChartWrapper
                ChartComponent={
                  spendingTrendLoder ? (
                    this.renderLoder()
                  ) : (
                    <MultiLineChart
                      data={spendingTrendData}
                      labels={[
                        { name: "Last Quarter", color: "orange" },
                        { name: "Current Quarter", color: "bule" },
                        { name: "Forecasted Spend", color: "pink" },
                      ]}
                    />
                  )
                }
                data={{
                  title: "Speding Trend",
                  labelOfBtn: " View Details",
                  link: "/app/new-reports/over-view-dashboard/spending-trend",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

function mapStateToProps(state) {
  const {
    spendOverviewData,
    topUsedServiceData,
    potentialSavingsData,
    costTopAccountsData,
    spendingTrendData,
  } = state.reports;
  return {
    spendOverviewData,
    topUsedServiceData,
    potentialSavingsData,
    costTopAccountsData,
    spendingTrendData,
  };
}

const mapDispatchToProps = {
  getSpendOverview,
  getTopUsedService,
  getPotentialSavings,
  getCostTopAccounts,
  getSpendingTrend,
};

export default connect(mapStateToProps, mapDispatchToProps)(AwsComponent);
