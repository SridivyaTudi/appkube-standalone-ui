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
import { Component } from "react";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        {
          user: "Milena Kahles",
          emailAddress: "Carolina.Patzwahl81@gmal.cm",
          groups: "02",
        },
        {
          user: "Natalie Clark",
          emailAddress: "mia.johnson@example.com",
          groups: "03",
        },
        {
          user: "David Garcia",
          emailAddress: "sophia.brown@example.com",
          groups: "08",
        },
        {
          user: "Olivia Martin",
          emailAddress: "sarah.lee@example.com",
          groups: "03",
        },
        {
          user: "William Davis",
          emailAddress: "noah.thompson@example.com",
          groups: "02",
        },
        {
          user: "Ella Lewis",
          emailAddress: "bob.johnson@example.com",
          groups: "00",
        },
        {
          user: "David Garcia",
          emailAddress: "emma.davis@example.com",
          groups: "04",
        },
        {
          user: "William Davis",
          emailAddress: "lucas.martinez@example.com",
          groups: "06",
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
    const { rows, pg, rpg, actionButton } = this.state;
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
                <TableCell> <Checkbox size="small" /> User</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Groups</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                <TableRow key={index}>
                  <TableCell> <Checkbox size="small" /> {row.user}</TableCell>
                  <TableCell>{row.emailAddress}</TableCell>
                  <TableCell>{row.groups}</TableCell>
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
          count={rows.length}
          rowsPerPage={rpg}
          page={pg}
          className="access-control-pagination"
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
      </>
    );
  }
}

export default Users;
