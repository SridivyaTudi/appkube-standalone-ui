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
import { v4 } from "uuid";
import { setActiveTab } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
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

let data = [
  { id: 1, groupName: "Super Admin", attachedPolicies: "Single " },
  { id: 2, groupName: "Defaults Users", attachedPolicies: "Single " },
  { id: 3, groupName: "System Engineer", attachedPolicies: "Multiple " },
  { id: 4, groupName: "Design Architect", attachedPolicies: "Multiple " },
  { id: 5, groupName: "Design Architect", attachedPolicies: "Multiple " },
  { id: 6, groupName: "Design Architect", attachedPolicies: "Multiple " },
  { id: 7, groupName: "Design Architect", attachedPolicies: "Multiple " },
  { id: 8, groupName: "Design Architect", attachedPolicies: "Multiple " },
];
class AddUserGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: data,
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
      selectedGroup: [],
      searchedKey: "",
    };
  }

  // Render table header
  renderTableHeader = () => {
    const { rows, selectedGroup } = this.state;
    return (
      <TableHead>
        <TableRow>
          <TableCell width={100}>
            <Checkbox
              size="small" className="check-box"
              disabled={rows?.length ? false : true}
              checked={rows?.length === selectedGroup?.length}
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />
            Group Name
          </TableCell>
          <TableCell width={200}>Attached Policies</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render table body
  renderTableBody = () => {
    const { rows, selectedGroup } = this.state;
    return (
      <TableBody>
        {rows?.length ? (
          rows.map((row, index) => (
            <TableRow key={v4()}>
              <TableCell>
                <Checkbox
                  size="small"
                  id={row.id}
                  checked={selectedGroup.includes(row.id)}
                  onChange={this.handleCheckBox}
                />
                {row.groupName}
                <Box className="d-flex roles-box">
                  <HtmlTooltip
                    className="table-tooltip-dark"
                    title={
                      <React.Fragment>
                        <span>This role created by default by the system</span>
                      </React.Fragment>
                    }
                  >
                   <Box className="d-inline-block default-Icon p-r-5">
                    <img src={DefaultIcon} alt=""  />Default 
                  </Box>
                  
                  </HtmlTooltip>
                </Box>
              </TableCell>
              <TableCell>{row.attachedPolicies}</TableCell>
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

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedGroup } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedGroup.push(+id);
    } else {
      selectedGroup = selectedGroup.filter((value) => value !== +id);
    }

    this.setState({ selectedGroup });
  };

  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { selectedGroup } = this.state;

    let { checked } = event.target;

    if (checked) {
      selectedGroup = data.map((value) => value.id);
    } else {
      selectedGroup = [];
    }
    this.setState({ selectedGroup });
  };

  //  Serach Groups
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { rows } = this.state;

    if (data?.length) {
      if (value) {
        rows = data.filter((group) => {
          if (group?.groupName.toLowerCase().includes(value.toLowerCase())) {
            return group;
          } else {
            return null;
          }
        });
      } else {
        rows = data;
      }
      this.setState({ rows, searchedKey: value });
    }
  };

  // Move to previous page
  handlePreviousPage = (tab, url) => {
    setActiveTab(tab);
    this.props.navigate(url);
  };

  render() {
    let { searchedKey } = this.state;
    return (
      <Box className="create-group-container">
        <Box className="list-heading">
          <h3>Add user to groups</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() =>
                  this.handlePreviousPage("permissions/user", "/app/setting")
                }
              >
                <Link>Users</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li
                onClick={() =>
                  this.handlePreviousPage("group", "/app/setting/user-profile")
                }
              >
                <Link>Milena</Link>
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
                  value={searchedKey}
                  onChange={this.handleSearchChange}
                  autoFocus="autoFocus"
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
            {this.renderTableHeader()}
            {this.renderTableBody()}
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
export default navigateRouter(AddUserGroup);
