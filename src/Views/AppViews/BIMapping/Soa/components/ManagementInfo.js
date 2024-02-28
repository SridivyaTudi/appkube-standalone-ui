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
let HOSTED_ON_DROP_DOWN = ["ec2", "eks", "ecs", "lambda", "s3"];
let MANAGEMENT_ENDPOINT__DROP_DOWN = ["ip/port", "dns"];
let PROMETHEUS_ENDPOINT_DROP_DOWN = ["ip/port", "dns"];
let LOG_LOCATION_DROP_DOWN = ["Cloudwatch", "server"];

let data = [
  {
    key: "Hosted on",
    dropDownValues: HOSTED_ON_DROP_DOWN,
    subKeyValue: {
      ec2: {
        subKey: "Instance ID",
        subValue: "user input",
      },
      eks: {
        subKey: "cluster id",
        subValue: "user input",
      },
      ecs: {
        subKey: "cluster id",
        subValue: "user input",
      },
      lambda: {
        subKey: "function name",
        subValue: "user input",
      },
      s3: {
        subKey: "bucket name",
        subValue: "user input",
      },
    },
  },
  {
    key: "Management Endpoint	",
    dropDownValues: MANAGEMENT_ENDPOINT__DROP_DOWN,
    subKeyValue: {
      "ip/port": {
        subKey: "ip/port",
        subValue: "user input",
      },
      dns: {
        subKey: "dns",
        subValue: "user input",
      },
    },
  },
  {
    key: "Prometheus Endpoint",
    dropDownValues: PROMETHEUS_ENDPOINT_DROP_DOWN,
    subKeyValue: {
      "ip/port": {
        subKey: "ip/port",
        subValue: "user input",
      },
      dns: {
        subKey: "dns",
        subValue: "user input",
      },
    },
  },
  {
    key: "Log Location",
    dropDownValues: LOG_LOCATION_DROP_DOWN,
    subKeyValue: {
      Cloudwatch: {
        subKey: "Log group",
        subValue: "user input",
      },
      server: {
        subKey: "Promtail",
        subValue: "user input",
      },
    },
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
    let { tableData,selectedInfo } = this.state;
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
                      value={`${selectedInfo[`${info.key}_${index}`] || ""}`}
                      onChange={(e) =>
                        this.handleChange(e, `${info.key}_${index}`)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">Select </MenuItem>
                      {info.dropDownValues.map((val) => (
                        <MenuItem value={val}>{val}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell align="center">
                {info.subKeyValue[selectedInfo[`${info.key}_${index}`]]
                  ?.subKey || "-"}{" "}
              </TableCell>
              <TableCell align="center">
                {info.subKeyValue[selectedInfo[`${info.key}_${index}`]]
                  ?.subValue || "-"}
              </TableCell>
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
