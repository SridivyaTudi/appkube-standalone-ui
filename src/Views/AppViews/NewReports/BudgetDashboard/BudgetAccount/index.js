import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectFilterModal from "../../Components/SelectFilterModal";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import AccountTable from "../Components/AccountTable";
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
    subName: "vs Last Quarter",
  },
  {
    name: "Last Quarter Spend",
    value: "$90,000",
    percentage: "5",
    subName: "vs Last Quarter",
  },
  {
    name: "Avg Daily Spend",
    value: "$1500",
    percentage: "",
    subName: "",
  },
];
let dummyTableData = [
  {
    id: "160079380622",
    department: "Central Operations",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$1,205",
    varience: "$20,000",
    budget: "$30,000",
  },
  {
    id: "587170574722",
    department: "Security Organization",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$1,205",
    varience: "$20,000",
    budget: "$30,000",
  },
  {
    id: "160079380622",
    department: "App Development",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$1,205",
    varience: "$20,000",
    budget: "$30,000",
  },
  {
    id: "160079380622",
    department: "Central Operations",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$1,205",
    varience: "$20,000",
    budget: "$30,000",
  },
  {
    id: "587170574722",
    department: "Production",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$1,205",
    varience: "$20,000",
    budget: "$30,000",
  },
  {
    id: "160079380622",
    department: "HR Department",
    vpc: "vpc-d24664bb",
    serviceCount: "22",
    region: "US-East (N.virginia)",
    spending: "$1,205",
    varience: "$20,000",
    budget: "$30,000",
  },
];
let tableHeader = [
  "Account ID",
  "Department",
  "Vpc",
  "Service count",
  "High spending region",
  "Spending",
  "Variance",
  "Budget",
];
class BudgetAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      accounts: dummyTableData,
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
    let { accounts, searchedKey } = this.state;
    let data = dummyTableData || [];
    if (data?.length) {
      if (value) {
        accounts = data.filter((tableData) => {
          if (tableData?.name.toLowerCase().includes(value.toLowerCase())) {
            return tableData;
          } else {
            return null;
          }
        });
      } else {
        accounts = data;
      }
      this.setState({ accounts, searchedKey: value });
    }
  };
  render() {
    let { accounts, searchedKey, showSelectFilterModal } = this.state;
    return (
      <>
        <Box className="new-reports-container">
          <Box className="list-heading">
            <h3>Budget Account</h3>
            <Box className="breadcrumbs">
              <ul>
                <li
                  onClick={() =>
                    this.props.navigate("/app/new-reports/budget-dashboard")
                  }
                >
                  Budget Dashboard
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">Budget Account</li>
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
                <i className="fas fa-calendar-minus m-r-2"></i> Last Quarter
              </Button>
            </Box>
          <Box className="m-t-4">
            <TimeSpendComponent data={timeSpendData} />
          </Box>
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">Top 5 Spending Accounts</h4>
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
          <AccountTable headers={tableHeader} data={accounts} />
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

export default navigateRouter(BudgetAccount);
