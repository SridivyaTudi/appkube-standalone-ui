import React, { Component } from "react";
import {
  Box,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TablePagination,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DefaultIcon from "../../../../assets/img/setting/default-icon.png";

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

export class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userrow: [
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
      rolerow: [
        {
          user: "Milena Kahles",
          description:
            "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia	",
        },
        {
          user: "Natalie Clark",
          description:
            "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia	",
        },
        {
          user: "David Garcia",
          description:
            "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia	",
        },
        {
          user: "Olivia Martin",
          description:
            "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia	",
        },
        {
          user: "William Davis",
          description:
            "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia	",
        },
        {
          user: "Ella Lewis",
          description:
            "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia	",
        },
        {
          user: "David Garcia",
          description:
            "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia	",
        },
        {
          user: "William Davis",
          description:
            "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia	",
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
    const { userrow, rolerow, pg, rpg, actionButton } = this.state;
    return (
      <Box className="create-group-container">
        <Box className="list-heading">
          <h3>Create Group</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`/app/setting/setpolicy`}>Users and Permissions</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Create Group</li>
            </ul>
          </Box>
        </Box>
        <Box className="group-name">
          <Grid
            container
            alignItems={"center"}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <h4>Name of the group</h4>
            </Grid>
            <Grid item xs={6}>
              <Box className="overview-buttons">
                <List>
                  <ListItem>
                    <Button
                      className="danger-outline-btn min-width-inherit"
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      className="primary-btn min-width-inherit"
                      variant="contained"
                    >
                      <Link to={`/app/setting`}> Create Group</Link>
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
          <Box className="grop-description-section">
            <Grid
              container
              alignItems={"center"}
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Box className="form-group">
                  <label htmlFor="roleName" className="form-label d-block">
                    Group Name
                  </label>
                  <span className="D-block">
                    Enter a meaningful name to identify this group.
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="roleName"
                    name="name"
                    placeholder="Infra Team"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="form-group">
                  <label
                    htmlFor="roleDescription"
                    className="form-label d-block"
                  >
                    Group Description
                  </label>

                  <textarea
                    type="text"
                    className="form-control"
                    id="roleDescription"
                    name="description"
                    style={{
                      height: "60px",
                      lineHeight: "18px",
                      paddingRight: "15px",
                    }}
                    placeholder="pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia "
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className="adduser-top-section">
          <h4>Add users to the group(324)</h4>
          <Grid
            container
            rowSpacing={1}
            className="h-100"
            alignItems={"center"}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
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
                  <Checkbox size="small" /> User
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
              {userrow.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {" "}
                    <Checkbox size="small" /> {row.user}
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
          count={userrow.length}
          rowsPerPage={rpg}
          page={pg}
          className="access-control-pagination"
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
        <Box className="adduser-top-section">
          <h4>Add Role (10)</h4>
          <Grid
            container
            rowSpacing={1}
            className="h-100"
            alignItems={"center"}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
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
              {rolerow.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {" "}
                    <Checkbox size="small" /> {row.user}
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
                        <img src={DefaultIcon} alt="" className="m-r-1" />
                        Default
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
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
          count={rolerow.length}
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

export default CreateGroup;
