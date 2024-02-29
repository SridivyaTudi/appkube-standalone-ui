import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import SelectFilterModal from "../../Components/SelectFilterModal";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import ServiceIcon1 from "assets/img/report/service-icon1.png";
import AccountTable from "../Components/AccountTable";
let timeSpendData = [
  {
    name: "Month to date spend",
    value: "$70,000",
    percentage: "",
    subName: "",
  },
  {
    name: "Forecasted Spend",
    value: "$85,000",
    percentage: "15",
    subName: "vs Last Month",
  },
  {
    name: "Last Month Spend",
    value: "$90,000",
    percentage: "5",
    subName: "vs Last Month",
  },
  {
    name: "Avg Daily Spend",
    value: "$1500",
    percentage: "",
    subName: "",
  },
];
let tableHeader = [
  "Service name	",
  "Current month spend",
  "Last month Spend	",
  "Variance",
  "Avg daily spend	",
  "Actions",
];
let dummyTableData = [
  {
    name: "EC2",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$20,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    nameImageShow: (
      <Box className="service-image d-inline-block">
        <img src={ServiceIcon1} alt="" />
      </Box>
    ),
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal/cost-central-services-internal-details",
  },
  {
    name: "EC2",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$20,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    nameImageShow: (
      <Box className="service-image d-inline-block">
        <img src={ServiceIcon1} alt="" />
      </Box>
    ),
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal/cost-central-services-internal-details",
  },
  {
    name: "EC2",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$20,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    nameImageShow: (
      <Box className="service-image d-inline-block">
        <img src={ServiceIcon1} alt="" />
      </Box>
    ),
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal/cost-central-services-internal-details",
  },
  {
    name: "EC2",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$20,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    nameImageShow: (
      <Box className="service-image d-inline-block">
        <img src={ServiceIcon1} alt="" />
      </Box>
    ),
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal/cost-central-services-internal-details",
  },
  {
    name: "EC2",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$20,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    nameImageShow: (
      <Box className="service-image d-inline-block">
        <img src={ServiceIcon1} alt="" />
      </Box>
    ),
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal/cost-central-services-internal-details",
  },
  {
    name: "EC2",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$20,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    nameImageShow: (
      <Box className="service-image d-inline-block">
        <img src={ServiceIcon1} alt="" />
      </Box>
    ),
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal/cost-central-services-internal-details",
  },
  {
    name: "EC2",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$20,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    nameImageShow: (
      <Box className="service-image d-inline-block">
        <img src={ServiceIcon1} alt="" />
      </Box>
    ),
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal/cost-central-services-internal-details",
  },
  {
    name: "EC2",
    currentMonthSpend: "$20,000",
    lastMonthSpend: "$20,000",
    varience: "10%",
    avgDailySpend: "$1,205",
    nameImageShow: (
      <Box className="service-image d-inline-block">
        <img src={ServiceIcon1} alt="" />
      </Box>
    ),
    actionUrl:
      "/app/new-reports/central-dashboard/cost-central-top-internal/cost-central-services-internal/cost-central-services-internal-details",
  },
];
class BudgetServicesAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      services: dummyTableData,
    };
  }

  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
    });
  };
  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { services, searchedKey } = this.state;
    let data = dummyTableData || [];
    if (data?.length) {
      if (value) {
        services = data.filter((tableData) => {
          if (tableData?.name.toLowerCase().includes(value.toLowerCase())) {
            return tableData;
          } else {
            return null;
          }
        });
      } else {
        services = data;
      }
      this.setState({ services, searchedKey: value });
    }
  };
  render() {
    const { showSelectFilterModal, services, searchedKey } = this.state;
    return (
      <>
        <Box className="new-reports-container">
          <Box className="list-heading">
            <h3>Budget Sevices Account</h3>
            <Box className="breadcrumbs">
              <ul>
                <li>Budget Dashboard</li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>Budget Account</li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">Budget Services Account</li>
              </ul>
            </Box>
          </Box>
          <Box className="list-heading m-t-2 ">
            <h4 className="m-t-0 m-b-0">Cost of Top Services in US East (N.Virginia) </h4>
            <Box className="d-flex ">
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
          </Box>
          <Box className="m-t-2">
            <TimeSpendComponent data={timeSpendData} />
          </Box>
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">
              Overview of Top Services in N. Virginia
            </h4>
            <Box className="search">
              <input
                type="text"
                className="input"
                placeholder="Search Insatnce "
                value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
              <button className="button">
                <SearchOutlinedIcon />
              </button>
            </Box>
          </Box>
          <AccountTable
            headers={tableHeader}
            data={services}
            notShowingField={["id", "orgUnit"]}
          />

          {showSelectFilterModal ? (
            <SelectFilterModal
              showModal={showSelectFilterModal}
              handleSelectFilterModal={this.handleSelectFilterModal}
            />
          ) : (
            <></>
          )}
        </Box>
      </>
    );
  }
}
export default navigateRouter(BudgetServicesAccount);
