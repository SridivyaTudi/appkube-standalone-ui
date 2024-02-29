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
  Button,
  IconButton,
} from "@mui/material";
import { v4 } from "uuid";
import { ADD_PRODUCT_ENUMS } from "Utils";
import CloseIcon from "@mui/icons-material/Close";

const HOSTED_ON_DROP_DOWN = [
  {
    key: ADD_PRODUCT_ENUMS.EC2,
    value: ADD_PRODUCT_ENUMS.EC2,
  },
  {
    key: ADD_PRODUCT_ENUMS.EKS,
    value: ADD_PRODUCT_ENUMS.EKS,
  },
  {
    key: ADD_PRODUCT_ENUMS.ECS,
    value: ADD_PRODUCT_ENUMS.ECS,
  },
  {
    key: ADD_PRODUCT_ENUMS.LAMBDA,
    value: ADD_PRODUCT_ENUMS.LAMBDA,
  },
  {
    key: ADD_PRODUCT_ENUMS.S3,
    value: ADD_PRODUCT_ENUMS.S3,
  },
];
const MANAGEMENT_ENDPOINT__DROP_DOWN = [
  {
    key: "IP_PORT",
    value: "ip/port",
  },
  {
    key: "DNS",
    value: "dns",
  },
];
const PROMETHEUS_ENDPOINT_DROP_DOWN = [
  {
    key: "IP_PORT",
    value: "ip/port",
  },
  {
    key: "DNS",
    value: "dns",
  },
];
const LOG_LOCATION_DROP_DOWN = [
  {
    key: "CLOUD_WATCH",
    value: "Cloudwatch",
  },
  {
    key: "SERVER",
    value: "server",
  },
];
const LOG_LOCATION_SUBKEY_DROP_DOWN = [
  {
    key: "LOG_GROUP",
    value: "Log group",
  },
  {
    key: "PROMTAIL",
    value: "Promtail",
  },
];

let data = [
  {
    key: "Hosted on",
    dropDownValues: HOSTED_ON_DROP_DOWN,
    subKeyValue: {
      EC2: {
        subKey: "Instance ID",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
      },
      EKS: {
        subKey: "Cluster id",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
      },
      ECS: {
        subKey: "Cluster id",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
      },
      LAMBDA: {
        subKey: "Function name",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
      },
      S3: {
        subKey: "Bucket name",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
      },
    },
  },
  {
    key: "Management Endpoint	",
    dropDownValues: MANAGEMENT_ENDPOINT__DROP_DOWN,
    subKeyValue: {
      IP_PORT: {
        subKey: "ip/port",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
      },
      DNS: {
        subKey: "Dns",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
      },
    },
  },
  {
    key: "Prometheus Endpoint",
    dropDownValues: PROMETHEUS_ENDPOINT_DROP_DOWN,
    subKeyValue: {
      IP_PORT: {
        subKey: "ip/port",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
      },
      DNS: {
        subKey: "Dns",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
      },
    },
  },
  {
    key: "Log Location",
    dropDownValues: LOG_LOCATION_DROP_DOWN,
    subKeyValue: {
      CLOUD_WATCH: {
        subKey: "Log group",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
      },
      SERVER: {
        subKey: "Promtail",
        subValue: ADD_PRODUCT_ENUMS.USER_INPUT,
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

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.onClickAddEntryBtn !== this.props.onClickAddEntryBtn) {
      this.onClickAddEntry();
    }
  };

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
  handleCustomInputChange = (event, Id) => {
    let { name, value } = event.target;
    let { tableData } = this.state;

    tableData = tableData.map((info, index) => {
      if (Id === index) {
        info[name] = value;
      }
      return info;
    });
    this.setState({ tableData });
  };
  renderTableBody = () => {
    let { tableData, selectedInfo, selectedSubkeys } = this.state;
    return (
      <TableBody>
        {tableData.map((info, index) => {
          return (
            <TableRow key={index}>
              <TableCell align="left">
                {info.isCustomField ? (
                  <Box className="subvalue">
                    <input
                      id={`key_${index}`}
                      type="text"
                      className="form-control"
                      name={`key`}
                      placeholder="Enter the key"
                      value={info.key}
                      onChange={(e) => this.handleCustomInputChange(e, index)}
                    />
                  </Box>
                ) : (
                  info.key
                )}
              </TableCell>
              <TableCell align="center">
                {info.isCustomField ? (
                  <Box className="subvalue">
                    <input
                      id={`value_${index}`}
                      type="text"
                      className="form-control"
                      name={`value`}
                      placeholder="Enter the value"
                      value={info.value}
                      onChange={(e) => this.handleCustomInputChange(e, index)}
                    />
                  </Box>
                ) : (
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
                          <MenuItem value={val.key}>{val.value}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                )}
              </TableCell>
              <TableCell align="center">
                {info.isCustomField ? (
                  <Box className="subvalue">
                    <input
                      id={`subKey_${index}`}
                      type="text"
                      className="form-control"
                      name={`subKey`}
                      placeholder="Enter the subKey"
                      value={info.subKey}
                      onChange={(e) => this.handleCustomInputChange(e, index)}
                    />
                  </Box>
                ) : info.subKeyDropDownValue ? (
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
                          <MenuItem value={val.key}>{val.value}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ) : (
                  info.subKeyValue[selectedInfo[`${info.key}_${index}`]]
                    ?.subKey || "-"
                )}
              </TableCell>
              <TableCell align="center" className="text-center">
                {info.isCustomField ? (
                  <>
                    <Box className="subvalue">
                      <input
                        id={`subvalue${index}`}
                        type="text"
                        className="form-control"
                        name={`subValue`}
                        placeholder="Enter the subvalue"
                        value={info.subValue}
                        onChange={(e) => this.handleCustomInputChange(e, index)}
                      />
                      <IconButton
                        variant="outlined"
                        color="error"
                        aria-label="delete"
                        size="small"
                        // className="close-icon m-t-2"
                        onClick={() => this.onClickCloseIcon(index)}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </>
                ) : info.subKeyValue[selectedInfo[`${info.key}_${index}`]]
                    ?.subValue === ADD_PRODUCT_ENUMS.USER_INPUT ? (
                  <Box className="subvalue">
                    <input
                      id={`organizationName`}
                      type="text"
                      className="form-control"
                      name="organizationName"
                      placeholder="User input"
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

  onClickAddEntry = () => {
    let { tableData } = this.state;
    tableData.push({
      key: "",
      subKey: "",
      subValue: "",
      value: "",
      isCustomField: true,
    });
    this.setState({ tableData });
  };

  onClickCloseIcon = (index) => {
    let { tableData } = this.state;
    delete tableData[index];
    this.setState({ tableData });
  };
  render() {
    return (
      <>
        <Box className="tier-table-section">
          <TableContainer className="table">
            <Table className="overview">
              {this.renderTableHead()}
              {this.renderTableBody()}
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

export default ManagementInfo;
