import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import React, { Component } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DefaultIcon from "../../../../../../assets/img/setting/default-icon.png";
import { v4 } from "uuid";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
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

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      selectedGroup: [],
    };
  }

  componentDidMount = () => {
    this.setRowsStateOrReturn();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.userDetailsById.status !== prevProps.userDetailsById.status
    ) {
      if (this.props.userDetailsById.status === status.SUCCESS) {
        this.setRowsStateOrReturn();
      }
    }
  };

  setRowsStateOrReturn = (isStateSet = 1) => {
    let userDetails = this.props.userDetailsById.data || {};
    if (userDetails.roles) {
      if (isStateSet) {
        this.setState({ rows: userDetails.roles });
      } else {
        return userDetails.roles;
      }
    }
  };
  // Render table header
  renderTableHeader = () => {
    const { rows, selectedGroup } = this.state;
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              size="small"
              className="check-box"
              disabled={rows?.length ? false : true}
              checked={
                rows?.length > 0 && rows?.length === selectedGroup?.length
              }
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />{" "}
            Group Name
          </TableCell>
          <TableCell>Attached Policies</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render table body
  renderTableBody = () => {
    const { rows, selectedGroup } = this.state;
    return (
      <TableBody>
        {rows.length ? (
          rows.map((row, index) => {
            if (row.grp) {
              return (
                <TableRow key={v4()}>
                  <TableCell>
                    <Checkbox
                      size="small"
                      className="check-box"
                      id={`${row.id}`}
                      checked={selectedGroup.includes(row.id)}
                      onChange={this.handleCheckBox}
                    />
                    <span
                      onClick={() =>
                        this.handleCheckBox({
                          target: {
                            id: row.id,
                            checked: !selectedGroup.includes(row.id),
                          },
                        })
                      }
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
                          <Box className="d-inline-block default-Icon">
                            <img src={DefaultIcon} alt="" /> Default
                          </Box>
                        </HtmlTooltip>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </TableCell>
                  <TableCell>
                    {this.calculateAttachedPolicies(row.roles)}
                  </TableCell>
                </TableRow>
              );
            } else {
              return null;
            }
          })
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">There are no group.</h5>
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
    try {
      this.props.setGroup(selectedGroup);
    } catch (error) {
      console.log(error);
    }

    this.setState({ selectedGroup });
  };

  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { selectedGroup, rows } = this.state;

    let { checked } = event.target;

    if (checked) {
      selectedGroup = rows.map((value) => value.id);
    } else {
      selectedGroup = [];
    }
    try {
      this.props.setGroup(selectedGroup);
    } catch (error) {
      console.log(error);
    }
    this.setState({ selectedGroup });
  };

  calculateAttachedPolicies = (data) => {
    if (data.length) {
      let policies = [];
      data.forEach((policy) => {
        policies = policies.concat(policy.policies);
      });
      return policies.length
        ? policies.length > 1
          ? "Multiple"
          : "Single"
        : "None";
    }
  };
  render() {
    return (
      <>
        <TableContainer component={Paper} className="setting-common-table">
          <Table
            sx={{ minWidth: 800 }}
            aria-label="custom pagination table"
            className="table"
          >
            {this.renderTableHeader()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { userDetailsById } = state.settings;
  return { userDetailsById };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
