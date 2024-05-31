import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Checkbox,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Loader from "Components/Loader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

class AlertTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //actionButton: null,
      showAssetsSetUpModal: false,
      pg: 0,
      rpg: 10,
      isBulkActionDropDownOpen: false,
      anchorEl: null,
    };
  }

  // handleActionButton = (index) => {
  //   const { actionButton } = this.state;
  //   if (actionButton === null) {
  //     this.setState({
  //       actionButton: index,
  //     });
  //   } else {
  //     this.setState({
  //       actionButton: null,
  //     });
  //   }
  // };
  toggleBulkAction = (index, anchorEl) => {
    this.setState({
      isBulkActionDropDownOpen: index,
      anchorEl,
    });
  };
  renderDropDownData = () => {
    return [
      "Execute Workfolw",
      "Ignore Alert",
      "Create Ticket",
      "Edit Ticket",
    ].map((data, index) => {
      return (
        <MenuItem key={index}>
          {" "}
          <i className="fa-solid fa-circle-dot"></i>
          {data}
        </MenuItem>
      );
    });
  };

  toggleAssetsSetUp = () => {
    this.setState({
      showAssetsSetUpModal: !this.state.showAssetsSetUpModal,
    });
  };

  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 p-t-20 p-b-20">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  };

  //  Render table
  renderTable = () => {
    let alerts = this.props.data || [];
    let { rpg, pg } = this.state;

    return this.props.loderStatus ? (
      this.renderLoder()
    ) : (
      <>
        <TableContainer className="table">
          <Table style={{ minWidth: 1500 }}>
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
        {alerts?.length ? (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={alerts.length}
            rowsPerPage={rpg}
            page={pg}
            className="access-control-pagination"
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">Name</TableCell>
          <TableCell align="left">Ticket ID</TableCell>
          <TableCell align="left">Ticket Status</TableCell>
          <TableCell align="left">Severity</TableCell>
          <TableCell align="center">Alert State</TableCell>
          <TableCell align="center">Affected Resource</TableCell>
          <TableCell align="center">Triggered Time</TableCell>
          <TableCell align="center">Assigned Workflow</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    const { rpg, pg, isBulkActionDropDownOpen } = this.state;
    let alerts = this.props.data || [];

    return (
      <TableBody>
        {alerts.length ? (
          alerts.slice(pg * rpg, pg * rpg + rpg).map((alert, index) => {
            return (
              <TableRow>
                <TableCell align="left">
                  <HtmlTooltip className="table-tooltip" title={alert.name}>
                    <Box className="resource-name">
                      <Checkbox
                        size="small"
                        className="check-box"
                        //id={`${row.id}`}
                        //checked={selectedData.includes(row.id)}
                        onChange={this.handleCheckBox}
                      />
                      <Link to={`/app/alerts/alert-percentage`}>
                        <strong>{alert.name}</strong>
                      </Link>
                    </Box>
                  </HtmlTooltip>
                </TableCell>
                <TableCell align="left">
                  <Box className="resource-name">
                    <strong>{alert.ticketID}</strong>
                  </Box>
                </TableCell>
                <TableCell align="left">{alert.ticketStatus}</TableCell>
                <TableCell align="left">
                  <Box
                    className={`percentage-status ${
                      alert.stateClass ? alert.stateClass : ""
                    }`}
                  ></Box>
                  {alert.Severity}
                </TableCell>
                <TableCell align="center">{alert.alertState}</TableCell>
                <TableCell align="center">{alert.affectedResource}</TableCell>
                <TableCell align="center">{alert.triggeredTime}</TableCell>
                <TableCell align="center">{alert.assignedWorkflow}</TableCell>
                <TableCell align="center">
                  {/* <button type="button" className="list-icon">
                    <i className="fas fa-ellipsis-v"></i>
                  </button> */}
                  <IconButton
                    // id={`basic-menu-${index}`}
                    className="action-btn"
                    aria-label="morevertIcon"
                    size="small"
                    onClick={(e) => {
                      console.log(e.currentTarget);
                      this.toggleBulkAction(index, e.currentTarget);
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>

                  <Menu
                    className="common-list-menu"
                    id={`basic-menu-${index}`}
                    anchorEl={this.state.anchorEl}
                    open={isBulkActionDropDownOpen === index}
                    onClose={() => this.toggleBulkAction(null, null)}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    {this.renderDropDownData()}
                  </Menu>
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

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ pg: 0, rpg: parseInt(event.target.value, 10) });
  };
  render() {
    // const { showAssetsSetUpModal } = this.state;
    return (
      <>
        <Box className="alert-table">{this.renderTable()}</Box>
      </>
    );
  }
}

export default AlertTable;
