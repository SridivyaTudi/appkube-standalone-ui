import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Grid, List, ListItem, Button } from "@mui/material";
import DefaultIcon from "../../../../../assets/img/setting/default-icon.png";
import React, { Component } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

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
class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          user: "Milena Kahles",
          emailAddress: "Carolina.Patzwahl81@gmal.cm",
          groups: "02",
          date: "03/01/2023",
        },
        {
          user: "Natalie Clark",
          emailAddress: "mia.johnson@example.com",
          groups: "03",
          date: "03/01/2023",
        },
        {
          user: "David Garcia",
          emailAddress: "sophia.brown@example.com",
          groups: "08",
          date: "03/01/2023",
        },
        {
          user: "Olivia Martin",
          emailAddress: "sarah.lee@example.com",
          groups: "03",
          date: "03/01/2023",
        },
        {
          user: "William Davis",
          emailAddress: "noah.thompson@example.com",
          groups: "02",
          date: "03/01/2023",
        },
        {
          user: "Ella Lewis",
          emailAddress: "bob.johnson@example.com",
          groups: "00",
          date: "03/01/2023",
        },
        {
          user: "David Garcia",
          emailAddress: "emma.davis@example.com",
          groups: "04",
          date: "03/01/2023",
        },
        {
          user: "William Davis",
          emailAddress: "lucas.martinez@example.com",
          groups: "06",
          date: "03/01/2023",
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
    const { rows, pg, rpg } = this.state;
    return (
      <Box className="add-users-container">
        <Box className="list-heading">
          <h3>Group Infra team Add Role</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`/app/setting/setpolicy`}>Users and Permissions</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <Link to={`/app/setting/super-admin`}>Super Admin Group</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Add Role</li>
            </ul>
          </Box>
        </Box>
        <Box className="setting-common-searchbar">
          <h5>Add users to infra team</h5>
          <Grid container className="h-100" alignItems={"center"}>
            <Grid item xs={6}>
              <Box className="top-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search policy"
                />
                <button className="button">
                  <SearchOutlinedIcon />
                </button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <Button
                    className="danger-btn min-width-inherit"
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </ListItem>
                <ListItem>
                  <Link to={`/app/setting/super-admin`}>
                    <Button
                      className="primary-btn min-width-inherit"
                      variant="contained"
                    >
                      Add role
                    </Button>
                  </Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
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
                  <Checkbox className="check-box" size="small" /> User
                </TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Groups</TableCell>
                <TableCell>User Creation Date</TableCell>
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
                    <Checkbox className="check-box" size="small" /> {row.user}
                    <Box className="d-flex roles-box">
                      <HtmlTooltip
                        className="table-tooltip"
                        title={
                          <React.Fragment>
                            <span>
                              This role created by default by the system
                            </span>
                          </React.Fragment>
                        }
                      >
                        <span>
                          <img src={DefaultIcon} alt="" />
                        </span>
                        Default
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell>{row.emailAddress}</TableCell>
                  <TableCell>{row.groups}</TableCell>
                  <TableCell>{row.date}</TableCell>
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
      </Box>
    );
  }
}

export default AddRole;
