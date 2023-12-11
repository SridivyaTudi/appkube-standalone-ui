import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Component } from "react";
import { v4 } from "uuid";
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
          <TableCell width={100}>
            <Checkbox
              size="small"
              className="check-box"
              disabled={rows?.length ? false : true}
              checked={rows?.length === selectedGroup?.length}
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />{" "}
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
        {rows.map((row, index) => (
          <TableRow key={v4()}>
            <TableCell>
              <Checkbox
                size="small"
                className="check-box"
                id={row.id}
                checked={selectedGroup.includes(row.id)}
                onChange={this.handleCheckBox}
              />
              {row.permissionName}
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
      </>
    );
  }
}

export default Group;
