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
import { GRANULARITY_TYPE } from "CommonData";

const totalUsedServiceColor = {
  CDN: "#01f1e3",
  DYNAMODB: "#fa71a3",
  EC2: "#f9d33d",
  ECS: "#ffba69",
  EKS: "#8676ff",
  KINESYS: "#2b5aff",
  LAMBDA: "#ff8e3e",
  RDS: "#fa6298",
  S3: "#53ca43",
};

class AwsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spendOverviewData: [],
      spendOverviewTotal: 0,
      topUsedServiceData: [],
      potentialSavingsData: [],
      potentialSavingsPercentage: 0,
      costTopAccountsData: [],
      spendingTrendData: [],
    };
  }

  componentDidMount = () => {
    this.allAPICall(this.props.selectedGranularity);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedGranularity !== this.props.selectedGranularity) {
      this.allAPICall(this.props.selectedGranularity);
    }

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
        this.maniplateSpendingTrendData(spendingTrendData.data);
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
      data.forEach((obj) => {
        if (
          !["PREVIOUS_TOTAL", "PERCENTAGE", "CURRENT_TOTAL"].includes(
            obj.elementType
          )
        ) {
          topUsedServiceData.push({
            label: obj.elementType,
            value: obj.total,
            color: totalUsedServiceColor[obj.elementType],
          });
        }
      });
    }
    this.setState({ topUsedServiceData });
  };

  // Manipulate Potential Saving data
  maniplatePotentialSavingData = (data) => {
    let { potentialSavingsData, potentialSavingsPercentage } = this.state;
    potentialSavingsData = [];
    if (data?.length) {
      let total = data.reduce(
        (total, currentVal) => total + parseInt(currentVal.total),
        0
      );

      potentialSavingsData = [];
      potentialSavingsPercentage = 0;
      data.forEach((obj, index) => {
        if (
          !["PREVIOUS_TOTAL", "CURRENT_TOTAL", "PERCENTAGE"].includes(
            obj.instanceType
          )
        ) {
          potentialSavingsData.push({
            name: obj.instanceType,
            value: obj.total,
            percentage: parseInt(
              ((parseInt(obj.total) / total) * 100).toFixed(0)
            ),
          });
        } else if (obj.instanceType === "PERCENTAGE") {
          potentialSavingsPercentage = obj.total;
        }
      });
    }
    this.setState({ potentialSavingsData, potentialSavingsPercentage });
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

    if (data) {
      let { current = [], forcast = [], previous = [] } = data;
      spendingTrendData = this.manipulateDateWiseData(
        current.concat(forcast, previous)
      );
    }
    this.setState({ spendingTrendData });
  };

  manipulateDateWiseData = (data) => {
    let spendTrendData = [];
    if (data?.length) {
      let allData = JSON.parse(JSON.stringify(data));

      data.forEach((obj) => {
        // Find data date wise
        let sameDateData = JSON.parse(
          JSON.stringify(allData.filter((spend) => spend.dates === obj.dates))
        );

        if (sameDateData.length) {
          let pushData = {
            date: new Date(obj.dates),
            last_quarter: 0,
            current_quarter: 0,
            forecasted_spend: 0,
          };

          sameDateData.forEach((sameDate) => {
            if (sameDate.tenure === "current") {
              pushData["current_quarter"] = sameDate.total;
            } else if (sameDate.tenure === "forcast") {
              pushData["forecasted_spend"] = sameDate.total;
            } else if (sameDate.tenure === "previous") {
              pushData["last_quarter"] = sameDate.total;
            }
          });

          spendTrendData.push(pushData);

          // Remove data
          allData = allData.filter((spend) => spend.dates !== obj.dates);
        }
      });
    }

    return spendTrendData;
  };
  // Render loder
  renderLoder = () => {
    return (
      <Box className="chart-loader">
        <Loader />
      </Box>
    );
  };

  allAPICall = (granularity) => {
    this.props.getSpendOverview({
      serviceCategory: "all",
      cloud: "aws",
      granularity,
      compareTo: -1,
      orgId: getCurrentOrgId(),
    });
    this.props.getTopUsedService({
      serviceCategory: "all",
      cloud: "aws",
      granularity,
      compareTo: -1,
      noOfRecords: 10,
      order: "top",
      orgId: getCurrentOrgId(),
    });
    this.props.getPotentialSavings({
      cloud: "aws",
      granularity,
      compareTo: -1,
      orgId: getCurrentOrgId(),
    });
    this.props.getCostTopAccounts({
      cloud: "aws",
      account: "all",
      granularity,
      compareTo: -1,
      noOfRecords: 10,
      order: "top",
      orgId: getCurrentOrgId(),
    });
    this.props.getSpendingTrend({
      cloud: "aws",
      granularity,
      compareTo: -1,
      forcast: true,
      orgId: getCurrentOrgId(),
    });
  };
  renderNoDataHtml = () => {
    return (
      <Box className="environment-loader text-center  align-item-center justify-center p-t-20 p-b-20 ">
        <h5 className="m-t-0 m-b-0">There are no data available.</h5>
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
      potentialSavingsPercentage,
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
                  ) : spendOverviewData.length ? (
                    <DonutChart
                      data={spendOverviewData}
                      width={250}
                      height={300}
                      otherData={{
                        centerValue: `$${spendOverviewTotal}`,
                      }}
                    />
                  ) : (
                    this.renderNoDataHtml()
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
                  ) : topUsedServiceData.length ? (
                    <HorizontalBarChart
                      data={topUsedServiceData}
                      chardBeforeRenderHTML={
                        <Box className="total-cost-incurred">
                          {/* <p>
                            90,579
                            <span>
                              {" "}
                              <i class="fas fa-sort-up p-l-5"></i> 10 &#37;
                            </span>
                          </p> */}
                        </Box>
                      }
                    />
                  ) : (
                    this.renderNoDataHtml()
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
                  ) : potentialSavingsData.length ? (
                    <GaugeChart
                      data={potentialSavingsData}
                      otherData={{
                        centerValue: `${potentialSavingsPercentage}%`,
                      }}
                    />
                  ) : (
                    this.renderNoDataHtml()
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
                  ) : costTopAccountsData?.length ? (
                    <VerticalBarchart
                      data={costTopAccountsData}
                      style={{ width: "100%", height: "350" }}
                    />
                  ) : (
                    this.renderNoDataHtml()
                  )
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <ChartWrapper
                ChartComponent={
                  spendingTrendLoder ? (
                    this.renderLoder()
                  ) : spendingTrendData.length ? (
                    <MultiLineChart
                      data={spendingTrendData}
                      labels={[
                        {
                          name: `Last ${this.props.selectedGranularity}`,
                          color: "orange",
                        },
                        {
                          name: `Current ${this.props.selectedGranularity}`,
                          color: "steelblue",
                        },
                        {
                          name: `Forecasted ${this.props.selectedGranularity}`,
                          color: "pink",
                        },
                      ]}
                    />
                  ) : (
                    this.renderNoDataHtml()
                  )
                }
                data={{
                  title: "Spending Trend",
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
