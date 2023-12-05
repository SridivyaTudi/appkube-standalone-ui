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

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          permissionName: "Super Admin",
          policiesname: "Single",
          
        },
        {
          permissionName: "Defaulta User",
          policiesname: "Single",
        },
        {
          permissionName: "System Engineer",
          policiesname: "Multiple",
        },
        {
          permissionName: "Design Architect",
          policiesname: "Multiple",
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
                  <Checkbox size="small" className="check-box" /> Group Name
                </TableCell>
                <TableCell width={200}>Attached Policies</TableCell>
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
                   {row.policiesname}
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

export default Group;
