import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectFilterModal from "../../Components/SelectFilterModal";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { v4 } from "uuid";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

let timeSpendData = [
  {
    name: "Avg Daily Spend",
    value: "$1500",
    percentage: "",
    subName: "",
  },
  {
    name: "Month to date spend",
    value: "$70,000",
    percentage: "",
    subName: "",
  },
  {
    name: "Last Quarter Spend",
    value: "$90,000",
    percentage: "5",
    subName: "vs Last Quarter",
  },
];

let consumptionData = [
  {
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    tags: "dev-prod",
    instanceStatus: "Running",
    pricingModel: "On Demand",
    availabilityZone: "us-east-1a",
    OnDemandCosthr: "$0.0015",
    riCosthr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    tags: "dev-prod",
    instanceStatus: "Running",
    pricingModel: "On Demand",
    availabilityZone: "us-east-1a",
    OnDemandCosthr: "$0.0015",
    riCosthr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    tags: "dev-prod",
    instanceStatus: "Running",
    pricingModel: "On Demand",
    availabilityZone: "us-east-1a",
    OnDemandCosthr: "$0.0015",
    riCosthr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    tags: "dev-prod",
    instanceStatus: "Running",
    pricingModel: "On Demand",
    availabilityZone: "us-east-1a",
    OnDemandCosthr: "$0.0015",
    riCosthr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    tags: "dev-prod",
    instanceStatus: "Running",
    pricingModel: "On Demand",
    availabilityZone: "us-east-1a",
    OnDemandCosthr: "$0.0015",
    riCosthr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    tags: "dev-prod",
    instanceStatus: "Running",
    pricingModel: "On Demand",
    availabilityZone: "us-east-1a",
    OnDemandCosthr: "$0.0015",
    riCosthr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    tags: "dev-prod",
    instanceStatus: "Running",
    pricingModel: "On Demand",
    availabilityZone: "us-east-1a",
    OnDemandCosthr: "$0.0015",
    riCosthr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    tags: "dev-prod",
    instanceStatus: "Running",
    pricingModel: "On Demand",
    availabilityZone: "us-east-1a",
    OnDemandCosthr: "$0.0015",
    riCosthr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
];
class BudgetAccountDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      consumptions: consumptionData,
      searchedKey: "",
    };
  }

  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
    });
  };

  renderTable = () => {
    return (
      <TableContainer className="table">
        <Table style={{ width: 2000 }}>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  };

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Instance ID</TableCell>
          <TableCell>Instance Type</TableCell>
          <TableCell>Tags</TableCell>
          <TableCell>Instance Status</TableCell>
          <TableCell>Pricing model</TableCell>
          <TableCell>Availability zone</TableCell>
          <TableCell align="center">Ondemand cost / hr</TableCell>
          <TableCell>RI cost / hr</TableCell>
          <TableCell align="center">Usage Hours</TableCell>
          <TableCell align="center">Add-ons</TableCell>
          <TableCell align="center">Total Spend</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { consumptions } = this.state;
    return (
      <TableBody>
        {consumptions?.length ? (
          consumptions.map((consumption) => {
            return (
              <TableRow key={v4()}>
                <TableCell>{consumption.instanceId}</TableCell>
                <TableCell>{consumption.instanceType} </TableCell>
                <TableCell>{consumption.tags}</TableCell>
                <TableCell>{consumption.instanceStatus}</TableCell>
                <TableCell>{consumption.pricingModel}</TableCell>
                <TableCell>{consumption.availabilityZone}</TableCell>
                <TableCell align="center">
                  <strong>{consumption.OnDemandCosthr}</strong>
                </TableCell>
                <TableCell>{consumption.riCosthr}</TableCell>
                <TableCell align="center">
                  <strong>{consumption.usageHrs}</strong>
                </TableCell>
                <TableCell align="center">{consumption.addOns}</TableCell>
                <TableCell align="center">
                  <strong>{consumption.totalSpend}</strong>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">There are no data available.</h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { consumptions } = this.state;
    let data = consumptionData || [];
    if (data?.length) {
      if (value) {
        consumptions = data.filter((tableData) => {
          if (
            tableData?.instanceId.toLowerCase().includes(value.toLowerCase())
          ) {
            return tableData;
          } else {
            return null;
          }
        });
      } else {
        consumptions = data;
      }
      this.setState({ consumptions, searchedKey: value });
    }
  };
  render() {
    let { searchedKey, showSelectFilterModal } = this.state;
    return (
      <>
        <Box className="new-reports-container">
          <Box className="list-heading">
            <h3>Budget Account Details</h3>
            <Box className="breadcrumbs">
              <ul>
                <li
                  onClick={() =>
                    this.props.navigate(
                      `${APP_PREFIX_PATH}/new-reports/budget-dashboard`
                    )
                  }
                >
                  Budget Dashboard
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li
                  onClick={() =>
                    this.props.navigate(
                      `${APP_PREFIX_PATH}/new-reports/budget-dashboard`
                    )
                  }
                >
                  Budget Account
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li
                  onClick={() =>
                    this.props.navigate(
                      `${APP_PREFIX_PATH}/new-reports/budget-dashboard/budget-services-account`
                    )
                  }
                >
                  Budget Services Account
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">Budget Account Details</li>
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
            <Box className="fliter-button">
              <Button className="light-btn p-l-15 p-r-15">
                <i className="fas fa-calendar-minus m-r-2"></i> Last Quarter
              </Button>
            </Box>
          </Box>
          <Box className="m-t-4">
            <TimeSpendComponent data={timeSpendData} />
          </Box>
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">Cost consumption of EC2</h4>
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
          <Box className="new-reports-table">{this.renderTable()}</Box>
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

export default navigateRouter(BudgetAccountDetails);
