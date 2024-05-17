import React, { Component } from "react";
import {
  Box,
  IconButton,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { Link } from "react-router-dom";
import StatusImg1 from "assets/img/report/status-img1.png";
import StatusImg2 from "assets/img/report/status-img2.png";
import StatusImg3 from "assets/img/report/status-img3.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SelectFilterModal from "../../Components/SelectFilterModal";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

let data = [
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Pending",
    stateClass: "pending"
  },
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Invoece sent",
    stateClass: "sent"
  },
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Pending",
    stateClass: "pending"
  },
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Invoece sent",
    stateClass: "sent"
  },
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Pending",
    stateClass: "pending"
  },
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Invoece sent",
    stateClass: "sent"
  },
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Pending",
    stateClass: "pending"
  },
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Invoece sent",
    stateClass: "sent"
  },
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Pending",
    stateClass: "pending"
  },
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Invoece sent",
    stateClass: "sent"
  },
  {
    month: "January, 2023",
    department: "Information Technology",
    budget: "$10,000",
    currentMonthSpend: "$12,800",
    difference: "$2,800",
    paymentStatus: "Pending",
    stateClass: "pending"
  },
];
class HistoryDepartments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }
  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">Month</TableCell>
          <TableCell align="left">Department </TableCell>
          <TableCell align="center">Budget</TableCell>
          <TableCell align="center">Current Month’s Spend</TableCell>
          <TableCell align="center">Differenece</TableCell>
          <TableCell align="left">Payment Status </TableCell>
        </TableRow>
      </TableHead>
    );
  };
  //  Render table body
  renderTableBody = () => {
    return (
      <TableBody>
        {data?.length ? (
          data.map((details) => {
            return (
              <TableRow>
                <TableCell align="left">{details.month}</TableCell>
                <TableCell align="left">{details.department}</TableCell>
                <TableCell align="center">
                  <strong>{details.budget}</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>{details.currentMonthSpend}</strong>
                </TableCell>
                <TableCell align="center">
                  <Box
                    className="d-flex align-center"
                    justifyContent={"center"}
                  >
                    <Box className="variance-count red">
                      <i class="fas fa-sort-down p-r-5"></i>
                    </Box>
                    <strong>{details.difference}</strong>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Box className={`payment-status ${details.stateClass ? details.stateClass : "" }`}></Box>
                 
                  {details.paymentStatus}
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
  handleSelectFilterModal = () => {
    this.setState({
      showSelectFilterModal: !this.state.showSelectFilterModal,
    });
  };
  render() {
    const { showSelectFilterModal } = this.state;
    return (
      <Box className="new-reports-container">
        <Box className="list-heading">
          <h3>
            <Link to={`${APP_PREFIX_PATH}/new-reports/over-view-dashboard`}>
              <IconButton className="m-r-2">
                <i class="fas fa-long-arrow-left"></i>
              </IconButton>
            </Link>
            Chargeback Dashboard
          </h3>
          <Box className="d-flex align-items-center">
            <Link
              to={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard/create-invoice`}
            >
              <Button
                variant="outlined"
                className="primary-outline-btn min-width-inherit m-r-3 p-l-15 p-r-15"
              >
                View
              </Button>
            </Link>
            <Link to={`${APP_PREFIX_PATH}/new-reports/chargeback-dashboard`}>
              <Button className="primary-btn min-width-inherit m-r-3 p-l-15 p-r-15">
                Home
              </Button>
            </Link>
          </Box>
        </Box>
        <Box className="history-departments-container m-t-3">
          <h4 className="m-t-0 m-b-0">Invoice</h4>
          <Box className="status-cards">
            <Box className="status-card">
              <Box className="status-icon light-green">
                <img src={StatusImg1} alt="" />
              </Box>
              <Box className="status-content">
                <label>Paid</label>
                <span>Total paid Invoices </span>
                <strong>0</strong>
              </Box>
            </Box>
            <Box className="status-card">
              <Box className="status-icon light-blue">
                <img src={StatusImg2} alt="" />
              </Box>
              <Box className="status-content">
                <label>Dispute</label>
                <span>Total Disputed Invoices </span>
                <strong>12</strong>
              </Box>
            </Box>
            <Box className="status-card">
              <Box className="status-icon light-orange">
                <img src={StatusImg3} alt="" />
              </Box>
              <Box className="status-content">
                <label>Pending</label>
                <span>Total Pending Invoices </span>
                <strong>12</strong>
              </Box>
            </Box>
          </Box>
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">History of Departments</h4>
            <Box className=" d-flex align-items-center">
              <Box className="search">
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
              <Button
                className="light-btn p-l-15 p-r-15 m-r-3"
                onClick={this.handleSelectFilterModal}
              >
                <i className="fas fa-filter m-r-2"></i> Filter
              </Button>
            </Box>
          </Box>
          <Box className="new-reports-table history-department-table">
            <TableContainer className="table">
              <Table style={{ minWidth: 1180 }}>
                {this.renderTableHead()}
                {this.renderTableBody()}
              </Table>
            </TableContainer>
          </Box>
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
    );
  }
}

export default HistoryDepartments;
