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
      tableData: data,
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
                  {info.dropDownValues ? (
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
                        {info.dropDownValues.map((val) => (
                          <MenuItem value={val}>{val}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <input
                      id={`organizationName`}
                      type="text"
                      className="form-control"
                      name="organizationName"
                      placeholder="User inut"
                      // value={formData.organizationName}
                      // onChange={this.handleInputChange}
                    />
                  )}
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

export default ConfigInfo;
