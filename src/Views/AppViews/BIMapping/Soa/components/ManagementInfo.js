import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { v4 } from "uuid";
let data = [
  {
    key: "Hosted on",
    value: "",
    subKey: "Instance ID	",
    subValue: "user input",
  },
  {
    key: "Management Endpoint	",
    value: "",
    subKey: "Instance ID	",
    subValue: "user input",
  },
  {
    key: "Prometheus Endpoint",
    value: "",
    subKey: "Instance ID	",
    subValue: "user input",
  },
  {
    key: "Log Location",
    value: "",
    subKey: "Instance ID	",
    subValue: "user input",
  },
];
class ManagementInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tableData: data,
      selectedInfo: {},
      country: "",
    };
  }
  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  handleChange = (event, key) => {
    let { value } = event.target;
    let { selectedInfo } = this.state;

    selectedInfo[`${key}`] = value;

    this.setState({
      selectedInfo,
    });
  };
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left" component="th" scope="row">
            key
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            value
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            subkey
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            subvalue
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  renderTableBody = () => {
    let { tableData } = this.state;
    return (
      <TableBody>
        {tableData.map((info, index) => {
          return (
            <TableRow key={v4()}>
              <TableCell align="left">{info.key}</TableCell>
              <TableCell align="center">
                <Box className="region">
                  <FormControl
                    className="Region-fliter"
                    sx={{ m: 1, minWidth: 100 }}
                  >
                    <Select
                      className="fliter-toggel"
                      value={`${
                        this.state.selectedInfo[`${info.key}_${index}`] || ""
                      }`}
                      onChange={(e) =>
                        this.handleChange(e, `${info.key}_${index}`)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">Select </MenuItem>
                      <MenuItem value={10}>Eks</MenuItem>
                      <MenuItem value={20}>Ecs</MenuItem>
                      <MenuItem value={30}>Ec2</MenuItem>
                      <MenuItem value={40}>S3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell align="center">{info.subKey} </TableCell>
              <TableCell align="center">{info.subValue}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  };
  render() {
    return (
      <Box className="tier-table-section">
        <TableContainer className="table">
          <Table className="overview">
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default ManagementInfo;
