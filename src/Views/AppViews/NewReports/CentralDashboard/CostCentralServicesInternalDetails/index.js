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
let data = [
  {
    tags: "dev-prod",
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    instanceStatus: "Running",
    priceModel: "on Demand",
    zone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    riCostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    instanceStatus: "Running",
    priceModel: "on Demand",
    zone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    riCostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    instanceStatus: "Running",
    priceModel: "on Demand",
    zone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    riCostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    instanceStatus: "Running",
    priceModel: "on Demand",
    zone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    riCostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    instanceStatus: "Running",
    priceModel: "on Demand",
    zone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    riCostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    instanceStatus: "Running",
    priceModel: "on Demand",
    zone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    riCostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    instanceStatus: "Running",
    priceModel: "on Demand",
    zone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    riCostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    instanceStatus: "Running",
    priceModel: "on Demand",
    zone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    riCostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    instanceStatus: "Running",
    priceModel: "on Demand",
    zone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    riCostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
  {
    tags: "dev-prod",
    instanceId: "i-0c1234dc",
    instanceType: "t2.2xlarge",
    instanceStatus: "Running",
    priceModel: "on Demand",
    zone: "us-east-1a",
    onDemandCostHr: "$0.0015",
    riCostHr: "Unavailable",
    usageHrs: "720hrs",
    addOns: "NA",
    totalSpend: "$120",
  },
];
class CostCentralServicesInternalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      costConsumptionData: data,
    };
  }

  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
    });
  };

  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">Tags</TableCell>
          <TableCell align="left">Instance ID </TableCell>
          <TableCell align="left">Instance Type</TableCell>
          <TableCell align="left">Instance Status</TableCell>
          <TableCell align="left">Pricing model</TableCell>
          <TableCell align="left">Availability zone</TableCell>
          <TableCell align="left">OnDemand cost/hr</TableCell>
          <TableCell align="left">RI cost / hr</TableCell>
          <TableCell align="center">Usage Hours</TableCell>
          <TableCell align="center">Add-ons</TableCell>
          <TableCell align="center">Total Spend</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { costConsumptionData } = this.state;
    return (
      <TableBody>
        {costConsumptionData?.length ? (
          costConsumptionData.map((details) => {
            return (
              <TableRow>
                <TableCell align="left">{details.tags}</TableCell>
                <TableCell align="left">{details.instanceId}</TableCell>
                <TableCell align="left">{details.instanceType} </TableCell>
                <TableCell align="left">{details.instanceStatus}</TableCell>
                <TableCell align="left">{details.priceModel}</TableCell>
                <TableCell align="left">{details.zone}</TableCell>
                <TableCell align="left">
                  <strong>{details.onDemandCostHr}</strong>
                </TableCell>
                <TableCell align="left">{details.riCostHr}</TableCell>
                <TableCell align="center">
                  <strong>{details.usageHrs}</strong>
                </TableCell>
                <TableCell align="center">{details.addOns}</TableCell>
                <TableCell align="center">
                  <strong>{details.totalSpend}</strong>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <Box className="d-blck text-center w-100 h-100 ">
            <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
              <h5 className="m-t-0 m-b-0">There are no data available.</h5>
            </Box>
          </Box>
        )}
      </TableBody>
    );
  };

  //  Serach
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { costConsumptionData, searchedKey } = this.state;

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
    const { showSelectFilterModal, searchedKey } = this.state;
    return (
      <>
        <Box className="new-reports-container">
        <Box className="list-heading">
            <h3>Cost Central Services Internal Details</h3>
            <Box className="breadcrumbs">
              <ul>
                <li>Cost Central dashboard</li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>Cost Central Top Internal</li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li>Cost Central Services Internal</li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">Cost Central Services Internal Details</li>
              </ul>
            </Box>
          </Box>
          
          <Box className="list-heading m-t-2 ">
            <h4 className="m-t-0 m-b-0">Cost of EC2</h4>
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
              Cost consumption of EC2 in N.Virginia
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
          <Box className="new-reports-table">
            <TableContainer className="table">
              <Table style={{ width: 2000 }}>
                {this.renderTableHead()}
                {this.renderTableBody()}
              </Table>
            </TableContainer>
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
      </>
    );
  }
}
export default navigateRouter(CostCentralServicesInternalDetails);
