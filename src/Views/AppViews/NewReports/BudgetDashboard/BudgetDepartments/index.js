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
import { v4 } from "uuid";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectFilterModal from "../../Components/SelectFilterModal";
import { Link } from "react-router-dom";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

let departmentsData = [
  {
    vpc: "vpc-d24664bb",
    department: "sales & Marketing",
    allProduct: "12",
    spending: "Internal CRM Tool",
    spend: "$2120",
    budget: "$1200",
    forecast: "$2120",
  },
  {
    vpc: "vpc-d24664bb",
    department: "R&D",
    allProduct: "12",
    spending: "jira",
    spend: "$3200",
    budget: "$2200",
    forecast: "$3200",
  },
  {
    vpc: "vpc-d24664bb",
    department: "sales & Marketing",
    allProduct: "12",
    spending: "Internal CRM Tool",
    spend: "$2120",
    budget: "$1200",
    forecast: "$2120",
  },
  {
    vpc: "vpc-d24664bb",
    department: "R&D",
    allProduct: "12",
    spending: "jira",
    spend: "$3200",
    budget: "$2200",
    forecast: "$3200",
  },
  {
    vpc: "vpc-d24664bb",
    department: "sales & Marketing",
    allProduct: "12",
    spending: "Internal CRM Tool",
    spend: "$2120",
    budget: "$1200",
    forecast: "$2120",
  },
  {
    vpc: "vpc-d24664bb",
    department: "R&D",
    allProduct: "12",
    spending: "jira",
    spend: "$3200",
    budget: "$2200",
    forecast: "$3200",
  },
  {
    vpc: "vpc-d24664bb",
    department: "R&D",
    allProduct: "12",
    spending: "jira",
    spend: "$3200",
    budget: "$2200",
    forecast: "$3200",
  },
  {
    vpc: "vpc-d24664bb",
    department: "sales & Marketing",
    allProduct: "12",
    spending: "Internal CRM Tool",
    spend: "$2120",
    budget: "$1200",
    forecast: "$2120",
  },
  {
    vpc: "vpc-d24664bb",
    department: "R&D",
    allProduct: "12",
    spending: "jira",
    spend: "$3200",
    budget: "$2200",
    forecast: "$3200",
  },
  {
    vpc: "vpc-d24664bb",
    department: "sales & Marketing",
    allProduct: "12",
    spending: "Internal CRM Tool",
    spend: "$2120",
    budget: "$1200",
    forecast: "$2120",
  },
  {
    vpc: "vpc-d24664bb",
    department: "R&D",
    allProduct: "12",
    spending: "jira",
    spend: "$3200",
    budget: "$2200",
    forecast: "$3200",
  },
];

class BudgetDepartments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      departmentsData,
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
        <Table style={{ minWidth: 1620 }}>
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
          <TableCell>VPC</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>All Product</TableCell>
          <TableCell>Product With High Spending</TableCell>
          <TableCell align="center">Spend</TableCell>
          <TableCell align="center">Budget</TableCell>
          <TableCell align="center">Forecast</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { departmentsData } = this.state;
    return (
      <TableBody>
        {departmentsData?.length ? (
          departmentsData.map((data) => {
            return (
              <TableRow key={v4()}>
                <TableCell>{data.vpc}</TableCell>
                <TableCell>{data.department}</TableCell>
                <TableCell>
                  <Link
                    to={`${APP_PREFIX_PATH}/new-reports/budget-dashboard/budget-products`}
                  >
                    <Box className="d-flex align-items-center">
                      {data.allProduct}{" "}
                      <OpenInNewIcon className="p-l-5" />
                    </Box>
                  </Link>
                </TableCell>
                <TableCell>{data.spending}</TableCell>
                <TableCell>
                  <Box
                    className="d-flex align-items-center"
                    justifyContent={"center"}
                  >
                    <strong>{data.spend}</strong>
                    <Box className="variance-count red ">
                      <i className="fas fa-sort-up red p-l-5 p-r-5"> </i>
                      <strong>10% </strong>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <strong>{data.budget}</strong>
                </TableCell>
                <TableCell>
                  <Box
                    className="d-flex align-items-center"
                    justifyContent={"center"}
                  >
                    <strong>{data.forecast}</strong>
                    <Box className="variance-count red ">
                      <i className="fas fa-sort-up red p-l-5 p-r-5"> </i>{" "}
                      <strong>10% </strong>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-10 p-b-10 ">
                  <h5 className="m-t-0 m-b-0">There are no data available.</h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };
  render() {
    let { searchedKey, showSelectFilterModal } = this.state;
    return (
      <>
        <Box className="new-reports-container">
          <Box className="list-heading">
            <h3>Departments</h3>
            <Box className="breadcrumbs">
              <ul>
                <li
                  onClick={() => {
                    this.props.navigate(
                      `${APP_PREFIX_PATH}/new-reports/budget-dashboard`
                    );
                  }}
                >
                  Budget Dashboard
                </li>
                <li>
                  <i className="fa-solid fa-chevron-right"></i>
                </li>
                <li className="active">Budget Departments</li>
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
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">Top Department Exceeding Budget</h4>
            <Box className="search">
              <input
                type="text"
                className="input"
                placeholder="Search Department "
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

export default navigateRouter(BudgetDepartments);
