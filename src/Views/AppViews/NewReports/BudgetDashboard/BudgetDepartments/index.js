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
import { Link } from "react-router-dom";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

class BudgetDepartments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
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
        <Table style={{ width: 1700 }}>
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
          <TableCell>Spend</TableCell>
          <TableCell>Budget</TableCell>
          <TableCell>Forecast</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    return (
      <TableBody>
        <TableRow>
          <TableCell>vpc-d24664bb</TableCell>
          <TableCell>sales & Marketing </TableCell>
          <TableCell>
            <Link to={`/app/new-reports/budget-dashboard/budget-products`}>
              <Box className="d-flex align-items-center">
                12 <OpenInNewIcon className="p-l-5" />
              </Box>
            </Link>
          </TableCell>
          <TableCell>Internal CRM Tool</TableCell>
          <TableCell>
            <strong>$2120</strong>{" "}
            <Box className="d-inline-block variance-count red ">
              <i className="fas fa-sort-up red p-l-5 p-r-5"> </i> 10%
            </Box>
          </TableCell>
          <TableCell>
            <strong>$1200</strong>
          </TableCell>
          <TableCell>
            <strong>$2120</strong>{" "}
            <Box className="d-inline-block variance-count red ">
              <i className="fas fa-sort-up red p-l-5 p-r-5"> </i> 10%
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>vpc-d24664bb</TableCell>
          <TableCell>sales & Marketing </TableCell>
          <TableCell>
            <Link to={`/app/new-reports/budget-dashboard/budget-products`}>
              <Box className="d-flex align-items-center">
                12 <OpenInNewIcon className="p-l-5" />
              </Box>
            </Link>
          </TableCell>
          <TableCell>Internal CRM Tool</TableCell>
          <TableCell>
            <strong>$2120</strong>{" "}
            <Box className="d-inline-block variance-count red ">
              <i className="fas fa-sort-up red p-l-5 p-r-5"> </i> 10%
            </Box>
          </TableCell>
          <TableCell>
            <strong>$1200</strong>
          </TableCell>
          <TableCell>
            <strong>$2120</strong>{" "}
            <Box className="d-inline-block variance-count red ">
              <i className="fas fa-sort-up red p-l-5 p-r-5"> </i> 10%
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>vpc-d24664bb</TableCell>
          <TableCell>sales & Marketing </TableCell>
          <TableCell>
            <Link to={`/app/new-reports/budget-dashboard/budget-products`}>
              <Box className="d-flex align-items-center">
                12 <OpenInNewIcon className="p-l-5" />
              </Box>
            </Link>
          </TableCell>
          <TableCell>Internal CRM Tool</TableCell>
          <TableCell>
            <strong>$2120</strong>{" "}
            <Box className="d-inline-block variance-count red ">
              <i className="fas fa-sort-up red p-l-5 p-r-5"> </i> 10%
            </Box>
          </TableCell>
          <TableCell>
            <strong>$1200</strong>
          </TableCell>
          <TableCell>
            <strong>$2120</strong>{" "}
            <Box className="d-inline-block variance-count red ">
              <i className="fas fa-sort-up red p-l-5 p-r-5"> </i> 10%
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>vpc-d24664bb</TableCell>
          <TableCell>sales & Marketing </TableCell>
          <TableCell>
            <Link to={`/app/new-reports/budget-dashboard/budget-products`}>
              <Box className="d-flex align-items-center">
                12 <OpenInNewIcon className="p-l-5" />
              </Box>
            </Link>
          </TableCell>
          <TableCell>Internal CRM Tool</TableCell>
          <TableCell>
            <strong>$2120</strong>{" "}
            <Box className="d-inline-block variance-count red ">
              <i className="fas fa-sort-up red p-l-5 p-r-5"> </i> 10%
            </Box>
          </TableCell>
          <TableCell>
            <strong>$1200</strong>
          </TableCell>
          <TableCell>
            <strong>$2120</strong>{" "}
            <Box className="d-inline-block variance-count red ">
              <i className="fas fa-sort-up red p-l-5 p-r-5"> </i> 10%
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>vpc-d24664bb</TableCell>
          <TableCell>sales & Marketing </TableCell>
          <TableCell>
            <Link to={`/app/new-reports/budget-dashboard/budget-products`}>
              <Box className="d-flex align-items-center">
                12 <OpenInNewIcon className="p-l-5" />
              </Box>
            </Link>
          </TableCell>
          <TableCell>Internal CRM Tool</TableCell>
          <TableCell>
            <strong>$2120</strong>{" "}
            <Box className="d-inline-block variance-count red ">
              <i className="fas fa-sort-up red p-l-5 p-r-5"> </i> 10%
            </Box>
          </TableCell>
          <TableCell>
            <strong>$1200</strong>
          </TableCell>
          <TableCell>
            <strong>$2120</strong>{" "}
            <Box className="d-inline-block variance-count red ">
              <i className="fas fa-sort-up red p-l-5 p-r-5"> </i> 10%
            </Box>
          </TableCell>
        </TableRow>
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
                    this.props.navigate(`/app/new-reports/budget-dashboard`);
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
            <Button className="light-btn p-l-15 p-r-15">
              <i className="fas fa-calendar-minus m-r-2"></i> Last Month
            </Button>
          </Box>
          <Box className="table-head m-t-3">
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
