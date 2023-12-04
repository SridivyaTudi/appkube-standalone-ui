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
import CancelGroupControlModal from "../Permissions/Components/CancelGroupControlModal";
import { getRoles, deleteRole } from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { setActiveTab } from "Utils";

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

export class CreatePolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancelGroupControlModal: false,
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
      roles: [],
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
    };
  }

  componentDidMount = () => {
    this.props.getRoles();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.allRoles.status !== prevProps.allRoles.status) {
      if (this.props.allRoles.status === status.SUCCESS) {
        let roles = this.props.allRoles.data;
        if (roles) {
          this.setState({ roles });
        }
      }
    }
  };
  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10) });
  };

  handleCancelGroupControlModal = () => {
    this.setState({
      showCancelGroupControlModal: !this.state.showCancelGroupControlModal,
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
  // Render Loder
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  // render Roles Table
  renderRoleTable = () => {
    const { status: rolesStatus } = this.props.allRoles;

    if (rolesStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return (
        <Table
          sx={{ minWidth: 500 }}
          aria-label="custom pagination table"
          className="table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox size="small" /> Permission Set
              </TableCell>
              <TableCell>Description</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderRoles()}</TableBody>
        </Table>
      );
    }
  };

  // render Roles data
  renderRoles = () => {
    const { roles, pg, rpg, actionButton } = this.state;

    if (roles?.length) {
      return roles.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
        <TableRow key={index}>
          <TableCell>
            {" "}
            <Checkbox size="small" /> {row.name}
            <Box className="d-flex roles-box">
              <HtmlTooltip
                className="table-tooltip d-flex"
                title={
                  <React.Fragment>
                    <span>This role created by default by the system</span>
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
      ));
    } else {
      return (
        <Box className="d-blck text-center w-100 h-100 ">
          <Box className="environment-loader align-item-center justify-center w-100 h-100 p-t-20 p-b-20 ">
            There are no roles available.
          </Box>
        </Box>
      );
    }
  };
  render() {
    const {
      userrow,
      roles,
      pg,
      rpg,
      showCancelGroupControlModal,
      actionButton,
    } = this.state;
    return (
      <Box className="create-group-container">
        <Box className="list-heading">
          <h3>Create policy</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`/app/setting/setpolicy`}>Users and Permissions</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Create policy</li>
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
              <h4>Name of the policy</h4>
            </Grid>
            <Grid item xs={6}>
              <Box className="overview-buttons">
                <List>
                  <ListItem>
                    <Button
                      onClick={this.handleCancelGroupControlModal}
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
                      <Link
                        to={`/app/setting`}
                        onClick={() => setActiveTab("permissions/group")}
                      >
                        {" "}
                        Create policy
                      </Link>
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
                    policy Name
                  </label>
                  <span className="D-block">
                    Enter a meaningful name to identify this policy.
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="roleName"
                    name="name"
                    placeholder="Src-core"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="form-group">
                  <label
                    htmlFor="roleDescription"
                    className="form-label d-block"
                  >
                    policy Description
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
          <h4>Add Permissions to the Policy(68)</h4>
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
                  placeholder="Search Permission here"
                />
                <button className="button">
                  <SearchOutlinedIcon />
                </button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper} className="access-control-table">
          {this.renderRoleTable()}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={roles.length}
          rowsPerPage={rpg}
          page={pg}
          className="access-control-pagination"
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
        {showCancelGroupControlModal ? (
          <CancelGroupControlModal
            showModal={showCancelGroupControlModal}
            handleCancelGroupControlModal={this.handleCancelGroupControlModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { allRoles } = state.settings;
  return {
    allRoles,
  };
};

const mapDispatchToProps = {
  getRoles,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePolicy);
