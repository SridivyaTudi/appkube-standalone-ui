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
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DefaultIcon from "assets/img/setting/default-icon.png";

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
class AddUserGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          groupName: "Super Admin",
          attachedPolicies: "Single ",
        },
        {
          groupName: "Defaults Users",
          attachedPolicies: "Single ",
        },
        {
          groupName: "System Engineer",
          attachedPolicies: "Multiple ",
        },
        {
          groupName: "Design Architect",
          attachedPolicies: "Multiple ",
        },
        {
          groupName: "Design Architect",
          attachedPolicies: "Multiple ",
        },
        {
          groupName: "Design Architect",
          attachedPolicies: "Multiple ",
        },
        {
          groupName: "Design Architect",
          attachedPolicies: "Multiple ",
        },
        {
          groupName: "Design Architect",
          attachedPolicies: "Multiple ",
        },
      ],
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
    };
  }
  render() {
    const { rows } = this.state;

    return (
      <Box className="create-group-container">
        <Box className="list-heading">
          <h3>Add user to groups</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`/app/setting`}>Users</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <Link to={`/app/setting/user-profile`}>Milena</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Add user to groups</li>
            </ul>
          </Box>
        </Box>
        <Box className="group-name">
          <Grid container alignItems={"center"}>
            <Grid item xs={6}>
              <h4 className="m-t-0 m-b-0">Add user to groups</h4>
            </Grid>
            <Grid item xs={6} display={"flex"} justifyContent={"flex-end"}>
              <Box className="overview-buttons">
                <List>
                  <ListItem>
                    <Link to={`/app/setting/create-group`}>
                      <Button
                        className="primary-btn min-width-inherit"
                        variant="contained"
                      >
                        Create Group
                      </Button>
                    </Link>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="setting-common-searchbar p-b-20">
          <Grid container className="h-100" alignItems={"center"}>
            <Grid item xs={6}>
              <Box className="top-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search groups here"
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
                <TableCell width={100}>
                  {" "}
                  <Checkbox size="small" />
                  Group Name
                </TableCell>
                <TableCell width={200}>Attached Policies</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {" "}
                    <Checkbox size="small" /> {row.groupName}{" "}
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
                  <TableCell>{row.attachedPolicies}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box className="overview-buttons d-flex justify-content-end  m-t-4">
          <List>
            <ListItem>
              <Button
                onClick={this.handleCancelGroupControlModal}
                className="danger-outline-btn min-width-inherit m-r-2"
                variant="outlined"
              >
                Cancel
              </Button>
              <Link to={`/app/setting/create-group`}>
                <Button
                  className="primary-btn min-width-inherit"
                  variant="contained"
                >
                  Add user to groups
                </Button>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }
}

export default AddUserGroup;
