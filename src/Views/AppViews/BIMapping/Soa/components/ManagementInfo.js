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
const HOSTED_ON_DROP_DOWN = ["ec2", "eks", "ecs", "lambda", "s3"];
const MANAGEMENT_ENDPOINT__DROP_DOWN = ["ip/port", "dns"];
const PROMETHEUS_ENDPOINT_DROP_DOWN = ["ip/port", "dns"];
const LOG_LOCATION_DROP_DOWN = ["Cloudwatch", "server"];
const LOG_LOCATION_SUBKEY_DROP_DOWN = ["Log group", "Promtail"];

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
    subKeyDropDownValue: LOG_LOCATION_SUBKEY_DROP_DOWN,
  },
];
class ManagementInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tableData: data,
      selectedInfo: {},
      selectedSubkeys: {},
      country: "",
    };
  }
  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  handleChange = (event, key, isSubkey = 0) => {
    let { value } = event.target;
    let { selectedInfo, selectedSubkeys } = this.state;
    if (isSubkey) {
      selectedSubkeys[`${key}`] = value;
    } else {
      selectedInfo[`${key}`] = value;
    }

    this.setState({
      selectedInfo,
      selectedSubkeys,
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
    let { tableData, selectedInfo, selectedSubkeys } = this.state;
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
                {info.subKeyDropDownValue ? (
                  <Box className="region">
                    <FormControl
                      className="Region-fliter"
                      sx={{ m: 1, minWidth: 100 }}
                    >
                      <Select
                        className="fliter-toggel"
                        value={`${
                          selectedSubkeys[`${info.key}_${index}`] || ""
                        }`}
                        onChange={(e) =>
                          this.handleChange(e, `${info.key}_${index}`, 1)
                        }
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Select </MenuItem>
                        {info.subKeyDropDownValue.map((val) => (
                          <MenuItem value={val}>{val}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ) : (
                  info.subKeyValue[selectedInfo[`${info.key}_${index}`]]
                    ?.subKey || "-"
                )}{" "}
              </TableCell>
              <TableCell align="center" className="text-center">
                {info.subKeyValue[selectedInfo[`${info.key}_${index}`]]
                  ?.subValue === "user input" ? (
                  <Box className="subvalue">
                    <input
                      id={`organizationName`}
                      type="text"
                      className="form-control"
                      name="organizationName"
                      placeholder="User inut"
                      // value={formData.organizationName}
                      // onChange={this.handleInputChange}
                    />
                  </Box>
                ) : (
                  "-"
                )}
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
