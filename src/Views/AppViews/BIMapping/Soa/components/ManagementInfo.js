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
  IconButton,
} from "@mui/material";
import { ADD_PRODUCT_ENUMS } from "Utils";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";

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

const data = [
  {
    key: "Management Endpoint",
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
      tableData: JSON.parse(JSON.stringify(data)),
      selectedInfo: {},
      selectedSubkeys: {},
      country: "",
      selectedSubValues: {},
    };
  }

  componentDidMount = () => {
    this.setPreviousData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.onClickAddEntryBtn !== this.props.onClickAddEntryBtn) {
      this.onClickAddEntry();
    } else if (prevProps.currentActiveData !== this.props.currentActiveData) {
      this.setPreviousData();
    }
  };

  setPreviousData = () => {
    let { tableData, selectedInfo, selectedSubValues } = this.state;
    tableData = [];

    tableData = JSON.parse(JSON.stringify(data));
    let currentActiveData = this.props.currentActiveData;

    if (currentActiveData?.length) {
      this.props.currentActiveData.forEach((activeData) => {
        if (activeData.isCustomField) {
          tableData.push(activeData);
        } else {
          tableData.forEach((prev, index) => {
            if (
              prev.key?.split(" ")?.join("")?.toLowerCase() === activeData.key
            ) {
              let prepareIndex = `${prev.key?.split(" ")?.join("_")}_${index}`;
              if (activeData.isSubValue) {
                selectedSubValues[prepareIndex] = activeData.value;
              } else {
                selectedInfo[prepareIndex] = activeData.value;
              }
            }
          });
        }
      });
    }
    this.setState({ tableData, selectedInfo, selectedSubValues });
  };

  // Set active tab
  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  // Set the dropdown changes.
  handleChange = (event, key, isSubkey = 0, isSubValue = 0) => {
    let { value } = event.target;
    let { selectedInfo, selectedSubkeys, selectedSubValues } = this.state;
    if (isSubkey) {
      selectedSubkeys[key] = value;
    } else if (isSubValue) {
      selectedSubValues[key] = value;
    } else {
      selectedInfo[key] = value;
    }

    this.setState({
      selectedInfo,
      selectedSubkeys,
      selectedSubValues,
    });
    this.setManagementInfo();
  };

  setManagementInfo = () => {
    let { selectedInfo, selectedSubValues } = this.state;
    try {
      let inputData = this.manipulateInputData(selectedInfo);
      let subValue = this.manipulateSubvaluesInputData(selectedSubValues);
      let customInputData = this.manipulateCustomInputData();
      this.props.setManagentInfo(inputData.concat(customInputData, subValue));
    } catch (error) {
      console.log(error);
    }
  };

  manipulateInputData = (selectedInfo) => {
    let keyValues = [];
    Object.keys(selectedInfo).forEach((infoKey) => {
      if (selectedInfo[infoKey]) {
        let key = infoKey.split("_");
        key.pop();
        key = key.join("").toLowerCase();
        let value = selectedInfo[infoKey];
        keyValues.push({ key, value });
      }
    });
    return keyValues;
  };

  manipulateCustomInputData = () => {
    let { tableData } = this.state;
    let customKeyValues = [];

    tableData.forEach((infoKey) => {
      let { key, value, isCustomField, subKey, subValue } = infoKey;
      if (isCustomField && infoKey?.key && infoKey.value) {
        customKeyValues.push({
          key,
          value,
          subKey,
          subValue,
          isCustomField: true,
        });
      }
    });

    return customKeyValues;
  };

  manipulateSubvaluesInputData = (subValues) => {
    let keyValues = [];
    Object.keys(subValues).forEach((infoKey) => {
      if (subValues[infoKey]) {
        let key = infoKey.split("_");
        key.pop();
        key = key.join("").toLowerCase();
        let value = subValues[infoKey];
        keyValues.push({ key, value, isSubValue: true });
      }
    });
    return keyValues;
  };

  // Render table of head.
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

  // Custom input changes
  handleCustomInputChange = (event, Id) => {
    let { name, value } = event.target;
    let { tableData } = this.state;
    let currentData;
    tableData = tableData.map((info, index) => {
      if (Id === index) {
        info[name] = value;
        currentData = info;
      }
      return info;
    });
    this.setState({ tableData }, () => {
      if (currentData.key && currentData?.value) {
        this.setManagementInfo();
      }
    });
  };

  // Render table of body.
  renderTableBody = () => {
    let { tableData, selectedInfo, selectedSubkeys, selectedSubValues } =
      this.state;
    return (
      <TableBody>
        {tableData.map((info, index) => {
          return (
            <TableRow key={index}>
              <TableCell align="left">
                {info.isCustomField ? (
                  <Box className="first-entry-form">
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
                        value={`${
                          selectedInfo[
                            `${info.key?.split(" ")?.join("_")}_${index}`
                          ] || ""
                        }`}
                        onChange={(e) =>
                          this.handleChange(
                            e,
                            `${info.key?.split(" ")?.join("_")}_${index}`
                          )
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
                  info.subKeyValue[
                    selectedInfo[`${info.key?.split(" ")?.join("_")}_${index}`]
                  ]?.subKey || "-"
                )}
              </TableCell>
              <TableCell align="center" className="text-center">
                {info.isCustomField ? (
                  <>
                    <Box className="last-entry-form">
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
                ) : info.subKeyValue[
                    selectedInfo[`${info.key?.split(" ")?.join("_")}_${index}`]
                  ]?.subValue === ADD_PRODUCT_ENUMS.USER_INPUT ? (
                  <Box className="subvalue">
                    <input
                      id={`organizationName`}
                      type="text"
                      className="form-control"
                      name="organizationName"
                      placeholder="User input"
                      value={`${
                        selectedSubValues[
                          `${info.key?.split(" ")?.join("_")}_${index}`
                        ] || ""
                      }`}
                      onChange={(e) =>
                        this.handleChange(
                          e,
                          `${info.key?.split(" ")?.join("_")}_${index}`,
                          0,
                          1
                        )
                      }
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

  // Click on add entry button
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

  // Click on close icon
  onClickCloseIcon = (index) => {
    let { tableData } = this.state;
    delete tableData[index];
    this.setState({ tableData });
  };

  render() {
    let { style } = this.props;
    return (
      <>
        <Box className="tier-table-section" style={style}>
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
function mapStateToProps(state) {
  const { createProductFormData } = state.biMapping;
  return {
    createProductFormData,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManagementInfo);
