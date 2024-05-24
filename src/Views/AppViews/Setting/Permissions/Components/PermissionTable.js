import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { Component } from "react";
import { v4 } from "uuid";
import { API_ERROR_MESSAGE, NO_DATA_FOUND } from "CommonData";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";

class PermissionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.data || [],
      selectedData: [],
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    let rows = this.props.data || [];
    if (this.props.data !== prevProps.data) {
      this.setState({ rows, selectedData: [] });
    }
  };
  // Render head of table
  renderTableHead = () => {
    let { rows, selectedData } = this.state;
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              size="small"
              className="check-box"
              disabled={rows?.length ? false : true}
              checked={rows?.length > 0 && selectedData.length === rows.length}
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />
            Permission name
          </TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render body of table
  renderTableBody = () => {
    const { rows, selectedData } = this.state;
    return (
      <TableBody>
        {rows?.length ? (
          rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                onClick={() =>
                  this.handleCheckBox({
                    target: {
                      id: row.id,
                      checked: !selectedData.includes(row.id),
                    },
                  })
                }
              >
                <Checkbox
                  size="small"
                  className="check-box"
                  id={`${row.id}`}
                  checked={selectedData.includes(row.id)}
                  onChange={this.handleCheckBox}
                />
                {row.name}
              </TableCell>
              <TableCell>
                <button className="green-btn"> {row.status}</button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow key={v4()}>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">
                    {this.props.userPermissionData.status === status.FAILURE
                      ? API_ERROR_MESSAGE
                      : NO_DATA_FOUND}
                  </h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedData } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedData.push(+id);
    } else {
      selectedData = selectedData.filter((value) => value !== +id);
    }
    this.setState({ selectedData });
  };

  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { rows, selectedData } = this.state;

    let { checked } = event.target;

    if (checked) {
      selectedData = rows.map((value) => value.id);
    } else {
      selectedData = [];
    }

    this.setState({ selectedData });
  };

  render() {
    return (
      <TableContainer component={Paper} className="setting-common-table">
        <Table
          sx={{ minWidth: 800 }}
          aria-label="custom pagination table"
          className="table"
        >
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { userPermissionData } = state.settings;
  return {
    userPermissionData,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PermissionTable);
