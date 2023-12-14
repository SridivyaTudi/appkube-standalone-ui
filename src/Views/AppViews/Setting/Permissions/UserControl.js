import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateUserControlModal from "./Components/CreateUserControlModal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { v4 } from "uuid";
let users = [
  {
    user: "Super Admin",
    emailAddress: "Carolina.Patzwahl81@gmal.com",
    loginDetails: "Never Login",
    groups: "01",
    createdDate: "30/Nov/2023",
    applications: "AppKube",
  },
  {
    user: "Mats Ertl I",
    emailAddress: "Juliane17@hotmail.com",
    loginDetails: (
      <>
        <span className="d-block">Count : 12</span>
        <span className="d-block">Last : 5 Minutes ago</span>
      </>
    ),
    groups: "0",
    createdDate: "28/Sept/2023",
    applications: "AppKube",
  },
  {
    user: "Tayler Buschbaum",
    emailAddress: "Charlotta_Peters4@gmail.com",
    loginDetails: (
      <>
        <span className="d-block">Count : 33</span>
        <span className="d-block">Last : 13 Minutes ago</span>
      </>
    ),
    groups: "80",
    createdDate: "26/Oct/2023",
    applications: "AppKube",
  },
  {
    user: "Mikail Hooss",
    emailAddress: "Malte50@gmail.com",
    loginDetails: "Never Login",
    groups: "10",
    createdDate: "01/AUg/2023",
    applications: "AppKube",
  },
  {
    user: "Irem Olbrich",
    emailAddress: "Anny.Bremer@gmail.com",
    loginDetails: "Never Login",
    groups: "03",
    createdDate: "30/Aug/2022",
    applications: "AppKube",
  },
  {
    user: "Karoline Kraft",
    emailAddress: "Anny.Bremer@gmail.com",
    loginDetails: "Never Login",
    groups: "03",
    createdDate: "13/Jan/2023",
    applications: "AppKube",
  },
  {
    user: "Arian Sauerland",
    emailAddress: "Anny.Bremer@gmail.com",
    loginDetails: "Never Login",
    groups: "09",
    createdDate: "26/Nov/2021",
    applications: "AppKube",
  },
  {
    user: "Prof. Dr. Till Neimke",
    emailAddress: "Aliya.Freimuth29@hotmail.com",
    loginDetails: "Never Login",
    groups: "05",
    createdDate: "14/Feb/2020",
    applications: "AppKube",
  },
];

let getFormattedDate = (dateString) => {
  try {
    const monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = new Date(dateString);
    let day = date.getDate();
    let year = date.getFullYear();
    let month = monthList[date.getMonth()];
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.log(error);
    return null;
  }
};
class UserControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
      searchedKey: "",
    };
  }

  componentDidMount = () => {
    this.setUsersStateOrReturnData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.allUsers?.status !== prevProps.allUsers?.status) {
      if (this.props.allUsers.status === status.SUCCESS) {
        this.setUsersStateOrReturnData();
      }
    }
  };

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10) });
  };

  handleCreateUserControlModal = () => {
    this.setState({
      showCreateUserControlModal: !this.state.showCreateUserControlModal,
    });
  };

  handleActionButton = (index) => {
    const { actionButton } = this.state;
    if (actionButton === null) {
      this.setState({
        actionButton: index,
      });
    } else {
      this.setState({
        actionButton: null,
      });
    }
  };

  //  Serach Users
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { rows } = this.state;

    if (value) {
      rows = users.filter((userData) => {
        if (
          userData?.user.toLowerCase().includes(value.toLowerCase()) ||
          userData?.emailAddress.toLowerCase().includes(value.toLowerCase())
        ) {
          return userData;
        } else {
          return null;
        }
      });
    } else {
      rows = users;
    }

    this.setState({ rows, searchedKey: value });
  };

  // Render user search input and btn
  renderSearchInputAndBtn = () => {
    let { searchedKey } = this.state;
    return (
      <Box className="d-flex width-100 search-box">
        <Box className="search">
          <input
            type="text"
            className="input"
            placeholder="Search User"
            value={searchedKey}
            onChange={this.handleSearchChange}
          />
          <button className="button">
            <SearchOutlinedIcon />
          </button>
        </Box>
        <Button
          className="primary-btn min-width"
          onClick={this.handleCreateUserControlModal}
        >
          Create User
        </Button>
      </Box>
    );
  };

  // Render header of table
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>
          <TableCell>Email Address</TableCell>
          <TableCell>Login Details</TableCell>
          <TableCell>Groups</TableCell>
          <TableCell>Created Date</TableCell>
          <TableCell>Applications</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render body of table
  renderTableBody = () => {
    const { rows, pg, rpg, actionButton } = this.state;
    return (
      <TableBody>
        {rows?.length ? (
          rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
            <TableRow key={v4()}>
              <TableCell>
                <Link to={`/app/setting/user-profile`}>{row.username}</Link>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.loginDetails}</TableCell>
              <TableCell>{row.groups}</TableCell>
              <TableCell>{getFormattedDate(row.createdAt)}</TableCell>
              <TableCell>{row.applications}</TableCell>
              <TableCell align="center">
                <IconButton
                  className="action-btn"
                  aria-label="morevertIcon"
                  size="small"
                  onClick={() => this.handleActionButton(index)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                {actionButton === index && (
                  <>
                    <Box className="action-buttons">
                      <Button
                        startIcon={
                          <DeleteOutlineOutlinedIcon className="icon" />
                        }
                        className="secondary-text-btn"
                      >
                        Delete User
                      </Button>
                      <Button
                        startIcon={<EditCalendarIcon className="icon" />}
                        className="secondary-text-btn"
                      >
                        Edit User
                      </Button>
                    </Box>
                    <Box
                      className="action-buttons-bg"
                      onClick={() => this.handleActionButton(index)}
                    ></Box>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">There are no users available.</h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  // Render table container
  renderTableContainer = () => {
    const { status: userStatus } = this.props.allUsers;

    if (userStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return (
        <TableContainer component={Paper} className="access-control-table">
          <Table
            sx={{ minWidth: 1000 }}
            aria-label="custom pagination table"
            className="table"
          >
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
      );
    }
  };

  // Render component of table pagination
  renderComponentTablePagination = () => {
    const { rows, pg, rpg } = this.state;
    return rows?.length ? (
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rpg}
        page={pg}
        className="access-control-pagination"
        onPageChange={this.handleChangePage}
        onRowsPerPageChange={this.handleChangeRowsPerPage}
      />
    ) : (
      <></>
    );
  };

  // Render component of Create User Modal
  renderComponentCreateUserModal = () => {
    const { showCreateUserControlModal } = this.state;
    return showCreateUserControlModal ? (
      <CreateUserControlModal
        showModal={showCreateUserControlModal}
        handleCreateUserControlModal={this.handleCreateUserControlModal}
      />
    ) : (
      <></>
    );
  };

  // Set state or return data
  setUsersStateOrReturnData = (isStateSet = 1) => {
    let rows = this.props?.allUsers.data || [];
    if (isStateSet) {
      this.setState({ rows });
    } else {
      return rows;
    }
  };

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  render() {
    return (
      <>
        {this.renderSearchInputAndBtn()}
        {this.renderTableContainer()}
        {this.renderComponentTablePagination()}
        {this.renderComponentCreateUserModal()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { allUsers } = state.settings;
  return {
    allUsers,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserControl);
