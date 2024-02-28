import React, { Component } from "react";
import TimeSpendComponent from "Views/AppViews/NewReports/Components/TimeSpendComponent";
import SpendingTable from "Views/AppViews/NewReports/OverviewDashboard/SpendOverviewDetails/Components/SpendingTable";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box } from "@mui/material";
let timeSpendData = [
  {
    name: "Total EC2 Instances",
    value: "200",
    percentage: "5",
    subName: " vs Last Month",
  },
  {
    name: "Running Instances",
    value: "$70,000",
    percentage: "5",
    subName: " vs Last Month",
  },
  {
    name: "Stopped Instances",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Month",
  },
  {
    name: "Terminated Instances",
    value: "$90,000",
    percentage: "5",
    subName: " vs Last Month",
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
class Compute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      costConsumptionData: computeSpendingTable,
      searchedKey: "",
    };
  }
  /** Get url details. */
  getUrlDetails() {
    const name = this.props.params.name;
    return { name };
  }
  //  Serach 
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { costConsumptionData, searchedKey } = this.state;
    let data = computeSpendingTable || [];
    if (data?.length) {
      if (value) {
        costConsumptionData = data.filter((tableData) => {
          if (tableData?.tags.toLowerCase().includes(value.toLowerCase())) {
            return tableData;
          } else {
            return null;
          }
        });
      } else {
        costConsumptionData = data;
      }
      this.setState({ costConsumptionData, searchedKey: value });
    }
  };
  
  render() {
    const { name } = this.getUrlDetails();
    let { searchedKey, costConsumptionData } = this.state;
    return (
      <>
        <TimeSpendComponent data={timeSpendData} />

        <h3 className="m-t-3">{name} SPENDINGS</h3>
        <Box className="table-head">
          <h4 className="m-t-0 m-b-0">Cost consumption of {name}</h4>
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

        <SpendingTable data={costConsumptionData} />
      </>
    );
  }
}

export default navigateRouter(Compute);
