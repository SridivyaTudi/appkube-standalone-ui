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
  ListItem,
  List,
} from "@mui/material";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
//import AssetsSetUpModal from "./AssetsSetUpModal";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Loader from "Components/Loader";

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
      showAssetsSetUpModal: false,
      pg: 0,
      rpg: 10,
    };
  }

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
    let environmentList = this.props.data || [];
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
        {environmentList?.length ? (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={environmentList.length}
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

  handleMenuToggle = (envKey) => {
    const { tagShowMenu } = this.state;
    if (tagShowMenu) {
      this.setState({ tagShowMenu: null });
    } else {
      this.setState({ tagShowMenu: envKey });
    }
  };
  handleMenuListToggle = (envKey) => {
    const { tagShowMenuList } = this.state;
    if (tagShowMenuList) {
      this.setState({ tagShowMenuList: null });
    } else {
      this.setState({ tagShowMenuList: envKey });
    }
  };

  //  Render table body
  renderTableBody = () => {
    const { tagShowMenu, tagShowMenuList, rpg, pg } = this.state;
    let environmentList = this.props.data || [];

    return (
      <TableBody>
        <TableRow>
          <TableCell align="left">
            <HtmlTooltip className="table-tooltip">
              <Box className="resource-name">Percentage CPU</Box>
            </HtmlTooltip>
          </TableCell>
          <TableCell align="left">102922</TableCell>
          <TableCell align="left">Generated</TableCell>
          <TableCell align="left">Critical </TableCell>
          <TableCell align="center">Open</TableCell>
          <TableCell align="center">Prod_DB_SYN14</TableCell>
          <TableCell align="center">2024-03-08; 15:45</TableCell>
          <TableCell align="center">Alert Management</TableCell>
          <TableCell align="center">
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">
            <HtmlTooltip className="table-tooltip">
              <Box className="resource-name">Percentage CPU</Box>
            </HtmlTooltip>
          </TableCell>
          <TableCell align="left">102922</TableCell>
          <TableCell align="left">Generated</TableCell>
          <TableCell align="left">Critical </TableCell>
          <TableCell align="center">Open</TableCell>
          <TableCell align="center">Prod_DB_SYN14</TableCell>
          <TableCell align="center">2024-03-08; 15:45</TableCell>
          <TableCell align="center">Alert Management</TableCell>
          <TableCell align="center">
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">
            <HtmlTooltip className="table-tooltip">
              <Box className="resource-name">Percentage CPU</Box>
            </HtmlTooltip>
          </TableCell>
          <TableCell align="left">102922</TableCell>
          <TableCell align="left">Generated</TableCell>
          <TableCell align="left">Critical </TableCell>
          <TableCell align="center">Open</TableCell>
          <TableCell align="center">Prod_DB_SYN14</TableCell>
          <TableCell align="center">2024-03-08; 15:45</TableCell>
          <TableCell align="center">Alert Management</TableCell>
          <TableCell align="center">
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">
            <HtmlTooltip className="table-tooltip">
              <Box className="resource-name">Percentage CPU</Box>
            </HtmlTooltip>
          </TableCell>
          <TableCell align="left">102922</TableCell>
          <TableCell align="left">Generated</TableCell>
          <TableCell align="left">Critical </TableCell>
          <TableCell align="center">Open</TableCell>
          <TableCell align="center">Prod_DB_SYN14</TableCell>
          <TableCell align="center">2024-03-08; 15:45</TableCell>
          <TableCell align="center">Alert Management</TableCell>
          <TableCell align="center">
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">
            <HtmlTooltip className="table-tooltip">
              <Box className="resource-name">Percentage CPU</Box>
            </HtmlTooltip>
          </TableCell>
          <TableCell align="left">102922</TableCell>
          <TableCell align="left">Generated</TableCell>
          <TableCell align="left">Critical </TableCell>
          <TableCell align="center">Open</TableCell>
          <TableCell align="center">Prod_DB_SYN14</TableCell>
          <TableCell align="center">2024-03-08; 15:45</TableCell>
          <TableCell align="center">Alert Management</TableCell>
          <TableCell align="center">
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">
            <HtmlTooltip className="table-tooltip">
              <Box className="resource-name">Percentage CPU</Box>
            </HtmlTooltip>
          </TableCell>
          <TableCell align="left">102922</TableCell>
          <TableCell align="left">Generated</TableCell>
          <TableCell align="left">Critical </TableCell>
          <TableCell align="center">Open</TableCell>
          <TableCell align="center">Prod_DB_SYN14</TableCell>
          <TableCell align="center">2024-03-08; 15:45</TableCell>
          <TableCell align="center">Alert Management</TableCell>
          <TableCell align="center">
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">
            <HtmlTooltip className="table-tooltip">
              <Box className="resource-name">Percentage CPU</Box>
            </HtmlTooltip>
          </TableCell>
          <TableCell align="left">102922</TableCell>
          <TableCell align="left">Generated</TableCell>
          <TableCell align="left">Critical </TableCell>
          <TableCell align="center">Open</TableCell>
          <TableCell align="center">Prod_DB_SYN14</TableCell>
          <TableCell align="center">2024-03-08; 15:45</TableCell>
          <TableCell align="center">Alert Management</TableCell>
          <TableCell align="center">
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
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
        <Box className="assets-table">{this.renderTable()}</Box>
        {/* {showAssetsSetUpModal ? (
          <AssetsSetUpModal
            showModal={showAssetsSetUpModal}
            toggleAssetsSetUp={this.toggleAssetsSetUp}
          />
        ) : (
          <></>
        )} */}
      </>
    );
  }
}

export default AlertTable;
