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

import CloseIcon from "@mui/icons-material/Close";
const BUILD_TOOLS_DROP_DOWN = ["maven", "gradle", "gant"];
let data = [
  {
    key: "java version",
    value: "user input",
    subKey: "-",
    subValue: "-",
  },
  {
    key: "min memory (xms) ",
    value: "user input",
    subKey: "-",
    subValue: "-",
  },
  {
    key: "max memory (xmx) ",
    value: "user input",
    subKey: "-",
    subValue: "-",
  },
  {
    key: "build tool",
    value: "",
    subKey: "-",
    subValue: "-",
    dropDownValues: BUILD_TOOLS_DROP_DOWN,
  },
];
class ConfigInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      selectedInfo: {},
      selectCustomInfo: [],
      tableData: JSON.parse(JSON.stringify(data)),
    };
  }

  componentDidMount = () => {
    this.setPreviousData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.onClickAddEntryBtn !== this.props.onClickAddEntryBtn) {
      this.onClickAddEntry();
    }
    if (prevProps.currentActiveData !== this.props.currentActiveData) {
      this.setPreviousData();
    }
  };

  setPreviousData = () => {
    let { tableData, selectedInfo } = this.state;
    tableData = [];

    tableData = JSON.parse(JSON.stringify(data));
    let currentActiveData = this.props.currentActiveData;

    if (currentActiveData?.length) {
      currentActiveData.forEach((activeData) => {
        if (activeData.isCustomField) {
          tableData.push(activeData);
        } else {
          tableData.forEach((prev, index) => {
            if (
              prev.key?.split(" ")?.join("")?.toLowerCase() === activeData.key
            ) {
              selectedInfo[`${prev.key?.split(" ")?.join("_")}_${index}`] =
                activeData.value;
            }
          });
        }
      });
    }

    this.setState({ tableData, selectedInfo });
  };

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
    this.setConfigInfo();
  };

  setConfigInfo = () => {
    let { selectedInfo } = this.state;
    try {
      let inputData = this.manipulateInputData(selectedInfo);

      let customInputData = this.manipulateCustomInputData();
      this.props.setConfigInfo(inputData.concat(customInputData));
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

  // Click on close icon
  onClickCloseIcon = (index) => {
    let { tableData } = this.state;
    delete tableData[index];
    this.setState({ tableData });
  };

  // Render table of body.
  renderTableBody = () => {
    let { tableData } = this.state;
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
                    {info.dropDownValues ? (
                      <FormControl
                        className="Region-fliter"
                        sx={{ m: 1, minWidth: 100 }}
                      >
                        <Select
                          className="fliter-toggel"
                          value={`${
                            this.state.selectedInfo[
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
                            <MenuItem value={val}>{val}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <Box className="subvalue">
                        <input
                          id={`organizationName`}
                          type="text"
                          className="form-control"
                          name="organizationName"
                          placeholder="User input"
                          value={
                            this.state.selectedInfo[
                              `${info.key?.split(" ")?.join("_")}_${index}`
                            ]
                          }
                          onChange={(e) =>
                            this.handleChange(
                              e,
                              `${info.key?.split(" ")?.join("_")}_${index}`
                            )
                          }
                        />
                      </Box>
                    )}
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
                ) : (
                  info.subKey
                )}{" "}
              </TableCell>
              <TableCell align="center">
                {" "}
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
                ) : (
                  info.subValue
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  // Custom input changes
  handleCustomInputChange = (event, Id) => {
    let { name, value } = event.target;
    let { tableData } = this.state;
    let collectKeyValue = [];
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
        this.setConfigInfo();
      }
    });
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

  render() {
    let { style } = this.props;
    return (
      <Box className="tier-table-section" style={style}>
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

export default ConfigInfo;
