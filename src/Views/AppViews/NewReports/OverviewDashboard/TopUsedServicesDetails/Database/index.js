import React, { Component } from "react";
import TimeSpendComponent from "../../../Components/TimeSpendComponent";
import SpendingTable from "Views/AppViews/NewReports/OverviewDashboard/SpendOverviewDetails/Components/SpendingTable";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box } from "@mui/material";
let timeSpendData = [
  {
    name: "Total EC2 Instances",
    value: "200",
    percentage: "5",
    subName: " vs Last Quarter",
  },
  {
    name: "Running Instances",
    value: "$70,000",
    percentage: "5",
    subName: " vs Last Quarter",
  },
  {
    name: "Stopped Instances",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Quarter",
  },
  {
    name: "Terminated Instances",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Quarter",
  },
];
let computeSpendingTable = [
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    InstanceID: "i-0c1234dc",
    type: "t2.2xlarge	",
    status: "Running",
    priceModel: "on Demand",
    availabilityZone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    RICostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
];

class Database extends Component {
    /** Get url details. */
    getUrlDetails() {
      const name = this.props.params.name;
      return { name };
    }
  render() {
    const { name } = this.getUrlDetails();
    return (
      <>
        <TimeSpendComponent data={timeSpendData} />
        <Box className="table-head" alignItems={"end"}>
          <Box className="d-block">
            <h3 className="m-t-0 m-b-0">{name} SPENDINGS</h3>
            <h4 className="m-t-3 m-b-0">Cost consumption of {name}</h4>
          </Box>
          <Box className="search m-r-0">
            <input
              type="text"
              className="input"
              placeholder="Search Insatnce "
              //value={searchedKey}
              onChange={this.handleSearchChange}
              autoFocus="autoFocus"
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
        </Box>
        <SpendingTable data={computeSpendingTable} />
      </>
    );
  }
}
export default navigateRouter(Database);
