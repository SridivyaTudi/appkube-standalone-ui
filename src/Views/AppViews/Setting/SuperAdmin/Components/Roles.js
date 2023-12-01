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
import DefaultIcon from "../../../../../assets/img/setting/default-icon.png";


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#16161E",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#16161E",
    color: "#ffffff",
    maxWidth: 250,

    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    padding: "8px 10px",
  },
}));

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          user: "Senior Leadership",
          Description: "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
        },
        {
          user: "Administrator",
          Description: "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
        },
        {
          user: "Tech user",
          Description: "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
        },
        {
          user: "DevSecOps",
          Description: "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
        },
        {
          user: "System Engineer",
          Description: "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
        },
        {
          user: "Architect Designer",
          Description: "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
        },
        {
          user: "Product Manager",
          Description: "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
        },
        {
          user: "Tester",
          Description: "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia ",
        },
      ],
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
    };
  }

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
  render() {
    const { rows, pg, rpg, actionButton } = this.state;
    return (
      <>
        <TableContainer component={Paper} className="access-control-table">
          <Table
            sx={{ minWidth: 500 }}
            aria-label="custom pagination table"
            className="table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  <Checkbox size="small" /> Role Name
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {" "}
                    <Checkbox size="small" /> {row.user}{" "}
                    <Box className="d-flex roles-box">
                      <HtmlTooltip
                        className="table-tooltip d-flex"
                        title={
                          <React.Fragment>
                            <span>
                              This role created by default by the system
                            </span>
                          </React.Fragment>
                        }
                      >
                        <img src={DefaultIcon} alt="" />
                        Default
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell>{row.Description}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
      </>
    );
  }
}

export default Roles;
