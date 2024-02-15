import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { v4 } from "uuid";
let logs = [
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
  {
    timeStamp: "2024-02-12T 09:48:12.342+05:30 ",
    ingestionTime: "2024-02-12T 09:48:12.342+05:30 ",
    message: "util.py[DEBUG] : Reading from /usr/lib/python3.9/site-package",
    id: 38082895194,
  },
];
class LoginEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logEvents:logs
    };
  }
  //  Render table
  renderTable = () => {
    return (
      <TableContainer className="table">
        <Table>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  };

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">Timestamp</TableCell>
          <TableCell align="left">Ingestion Time</TableCell>
          <TableCell align="left">Message</TableCell>
          <TableCell align="left">Event ID</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let environmentList =  this.state.logEvents;
    return (
      <TableBody>
        {environmentList.length ? (
          environmentList.map((environment) => {
            let { timeStamp, ingestionTime, message, id } = environment;
            return (
              <TableRow key={v4()}>
                <TableCell align="left">{timeStamp}</TableCell>
                <TableCell align="left">{ ingestionTime}</TableCell>
                <TableCell align="left">{ message}</TableCell>
                <TableCell align="left">{id}</TableCell>
              </TableRow>
            );
          })
        ) : (
          <Box className="d-blck text-center w-100 h-100 ">
            <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
              <h5 className="m-t-0 m-b-0">There are no data available.</h5>
            </Box>
          </Box>
        )}
      </TableBody>
    );
  };

   //  Serach Groups
   handleSearchChange = (e) => {
    let value = e.target.value;
    let { logEvents } = this.state;
    let data = logs;

    if (data?.length) {
      if (value) {
        logEvents = data.filter((user) => {
          if (user?.timeStamp?.toLowerCase().includes(value.toLowerCase())) {
            return user;
          } else {
            return null;
          }
        });
      } else {
        logEvents = data;
      }
      this.setState({ logEvents, searchedKey: value });
    }
  };
  render() {
    return (
      <Box className="discovered-assets-container">
        <Box className="assets-heading">
          <h3 className="m-b-0">ASSETS MANAGEMENT</h3>
          <Button className="primary-btn min-width-inherit" variant="contained">
            Back
          </Button>
        </Box>
        <Box className="global-services-fliter">
          <Box className="heading">Log Events</Box>
        </Box>
        <Box className="d-flex width-100 search-box">
          <Box className="search">
            <input
              type="text"
              className="input"
              placeholder="AWS:EC2:Instance"
              //value={searchedKey}
              onChange={this.handleSearchChange}
              autoFocus="autoFocus"
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
          <IconButton className="undo-icon">
            <i className="fas fa-undo"></i>
          </IconButton>
        </Box>
        <Box className="assets-table">{this.renderTable()}</Box>
      </Box>
    );
  }
}

export default LoginEvents;
