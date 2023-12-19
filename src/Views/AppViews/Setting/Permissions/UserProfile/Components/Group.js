import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from "@mui/material";
import React, { Component } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DefaultIcon from "../../../../../../assets/img/setting/default-icon.png";
import { v4 } from "uuid";

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
  { id: 1, permissionName: "Super Admin", policiesname: "Single" },
  { id: 2, permissionName: "Defaulta User", policiesname: "Single" },
  { id: 3, permissionName: "System Engineer", policiesname: "Multiple" },
  { id: 4, permissionName: "Design Architect", policiesname: "Multiple" },
];
class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: data,
      selectedGroup: [],
    };
  }

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
              checked={rows?.length === selectedGroup?.length}
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
        {rows.map((row, index) => (
          <TableRow key={v4()}>
            <TableCell>
              <Checkbox
                size="small"
                className="check-box"
                id={`${row.id}`}
                checked={selectedGroup.includes(row.id)}
                onChange={this.handleCheckBox}
              />
              {row.permissionName}
              <Box className="d-flex roles-box">
                <HtmlTooltip
                  className="table-tooltip-dark"
                  title={
                    <React.Fragment>
                      <span>This role created by default by the system</span>
                    </React.Fragment>
                  }
                >
                  <span>
                    <img src={DefaultIcon} alt="" /> Default
                  </span>
                 
                </HtmlTooltip>
              </Box>
            </TableCell>
            <TableCell>{row.policiesname}</TableCell>
          </TableRow>
        ))}
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

export default Group;
