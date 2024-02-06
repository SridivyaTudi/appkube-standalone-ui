import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
} from "@mui/material";
import { Component } from "react";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pg: 0,
      rpg: 10,
      showCreateUserControlModal: false,
      actionButton: null,
      selectedUsers: [],
    };
  }

  componentDidMount = () => {
    this.setRowsStateOrReturn();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.groupDetailsById.status !== prevProps.groupDetailsById.status
    ) {
      if (this.props.groupDetailsById.status === status.SUCCESS) {
        this.setRowsStateOrReturn();
      }
    }
  };

  setRowsStateOrReturn = (isStateSet = 1) => {
    let groupDetails = this.props.groupDetailsById.data || {};
    if (groupDetails.users) {
      if (isStateSet) {
        this.setState({ rows: groupDetails.users });
      } else {
        return groupDetails.users;
      }
    }
  };
  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10), pg: 0 });
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

  // Render header of table
  renderTableHead = () => {
    const { rows, selectedUsers } = this.state;
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              size="small"
              className="check-box"
              disabled={rows?.length ? false : true}
              checked={
                rows?.length > 0 && rows.length === selectedUsers?.length
              }
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />
            User
          </TableCell>
          <TableCell>Email Address</TableCell>
          <TableCell align="center">Groups</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render body of table
  renderTableBody = () => {
    const { rows, pg, rpg, selectedUsers } = this.state;
    return (
      <TableBody>
        {rows?.length ? (
          rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  size="small"
                  className="check-box"
                  id={`${row.id}`}
                  checked={selectedUsers.includes(row.id)}
                  onChange={this.handleCheckBox}
                />
                <span
                  onClick={(e) => {
                    this.handleCheckBox({
                      target: {
                        id: row.id,
                        checked: !selectedUsers.includes(row.id),
                      },
                    });
                  }}
                >
                  {row.userName}
                </span>
              </TableCell>
              <TableCell>{row.eMail}</TableCell>
              <TableCell align="center">{row.numberOfGroups}</TableCell>
            </TableRow>
          ))
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

  // Render table container
  renderTableContainer = () => {
    return (
      <TableContainer component={Paper} className="access-control-table">
        <Table
          sx={{ minWidth: 800 }}
          aria-label="custom pagination table"
          className="table"
        >
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  };

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedUsers } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedUsers.push(+id);
    } else {
      selectedUsers = selectedUsers.filter((value) => value !== +id);
    }
    this.props.setRemoveDetails(
      selectedUsers.length ? { tab: "users", data: selectedUsers } : null
    );
    this.setState({ selectedUsers });
  };

  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { selectedUsers } = this.state;

    let { checked } = event.target;
    let users = this.setRowsStateOrReturn(0);
    if (checked) {
      selectedUsers = users.map((value) => value.id);
    } else {
      selectedUsers = [];
    }
    this.props.setRemoveDetails(
      selectedUsers.length ? { tab: "users", data: selectedUsers } : null
    );
    this.setState({ selectedUsers });
  };
  render() {
    return (
      <>
        {this.renderTableContainer()}
        {this.renderComponentTablePagination()}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { groupDetailsById } = state.settings;
  return { groupDetailsById };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
