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

class Devsecops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          permissionName: "Create Landing Zone",
          
        },
        {
          permissionName: "Edit Landing Zone",
        },
        {
          permissionName: "Clone Landing Zone",
        },
        {
          permissionName: "Delete Landing Zone",
        },
        {
          permissionName: "Create Product Environment",
        },
        {
          permissionName: "Edit Product Environment",
        },
        {
          permissionName: "Migrate Product Environment",
        },
        {
          permissionName: "Replicate Product Environment",
        },
        {
          permissionName: "Add Service in Product Environment",
        },
      ],
    };
  }

  render() {
    const { rows } = this.state;
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
                <TableCell width={100}>
                  <Checkbox size="small" className="check-box" /> Permission
                  name
                </TableCell>
                <TableCell width={200}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox size="small" className="check-box" />
                    {row.permissionName}
                  </TableCell>
                  <TableCell>
                    <button className="green-btn">Active</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default Devsecops;
