import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { Component } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DefaultIcon from "assets/img/setting/default-icon.png";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { getCurrentUser } from "Utils";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#16161E",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#16161E",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(11),
  },
}));

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pg: 0,
      rpg: 10,
      showCreateUserControlModal: false,
      actionButton: null,
      selectedRoles: [],
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
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
    const { rows, selectedRoles } = this.state;
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            {" "}
            <Checkbox
              size="small"
              className="check-box"
              disabled={rows?.length ? false : true}
              checked={
                rows?.length > 0 && rows.length === selectedRoles?.length
              }
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />{" "}
            Role Name
          </TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render body of table
  renderTableBody = () => {
    const { rows, pg, rpg, selectedRoles } = this.state;
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
                  checked={selectedRoles.includes(row.id)}
                  onChange={this.handleCheckBox}
                />{" "}
                <span
                  onClick={(e) => {
                    this.handleCheckBox({
                      target: {
                        id: row.id,
                        checked: !selectedRoles.includes(row.id),
                      },
                    });
                  }}
                >
                  {row.name}
                </span>
                {row.default ? (
                  <Box className="d-flex roles-box">
                    <HtmlTooltip
                      className="table-tooltip-dark"
                      title={
                        <React.Fragment>
                          <span>
                            This role created by default by the system
                          </span>
                        </React.Fragment>
                      }
                    >
                      <span className="m-r-0">
                        <img src={DefaultIcon} alt="" /> Default
                      </span>
                    </HtmlTooltip>
                  </Box>
                ) : (
                  <></>
                )}
              </TableCell>
              <TableCell>{row.description}</TableCell>
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
    const { status: groupStatus } = this.props.groupDetailsById;

    if (groupStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return (
        <TableContainer component={Paper} className="access-control-table">
          <Table
            sx={{ minWidth: 900 }}
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

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedRoles } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedRoles.push(+id);
    } else {
      selectedRoles = selectedRoles.filter((value) => value !== +id);
    }
    this.props.setRemoveDetails(
      selectedRoles.length ? { tab: "roles", data: selectedRoles } : null
    );
    this.setState({ selectedRoles });
  };

  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { selectedRoles } = this.state;

    let { checked } = event.target;
    let data = this.setRowsStateOrReturn(0);
    if (checked) {
      selectedRoles = data.map((value) => value.id);
    } else {
      selectedRoles = [];
    }
    this.props.setRemoveDetails(
      selectedRoles.length ? { tab: "roles", data: selectedRoles } : null
    );
    this.setState({ selectedRoles });
  };

  // Render Loder
  renderLoder() {
    return (
      <Box className="d-block text-center w-100 h-100 m-r-auto m-l-auto ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  setRowsStateOrReturn = (isStateSet = 1) => {
    let groupDetails = this.props.groupDetailsById.data || {};
    if (groupDetails.roles) {
      if (isStateSet) {
        this.setState({ rows: groupDetails.roles });
      } else {
        return groupDetails.roles;
      }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
