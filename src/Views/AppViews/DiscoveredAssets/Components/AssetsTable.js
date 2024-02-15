import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { v4 } from "uuid";
import AssetsSetUpModal from "./AssetsSetUpModal";
class AssetsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAssetsSetUpModal: false,
    };
  }


  toggleAssetsSetUp = () => {
    this.setState({
      showAssetsSetUpModal: !this.state.showAssetsSetUpModal,
      
    });
  };
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
          <TableCell align="left">Resource Name</TableCell>
          <TableCell align="left">Element Type</TableCell>
          <TableCell align="left">Landing Zone</TableCell>
          <TableCell align="left">Product Enclave</TableCell>
          <TableCell align="center">Tag Status</TableCell>
          <TableCell align="center">Log</TableCell>
          <TableCell align="center">Trace</TableCell>
          <TableCell align="center">Event</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let environmentList = this.props.data || [];
    return (
      <TableBody>
        {environmentList.length ? (
          environmentList.map((environment) => {
            let { name, elementType, landingZone, productEnclave } =
              environment;
            return (
              <TableRow key={v4()}>
                <TableCell align="left">{name}</TableCell>
                <TableCell align="left">{elementType}</TableCell>
                <TableCell align="left">{landingZone}</TableCell>
                <TableCell align="left">{productEnclave}</TableCell>
                <TableCell align="center">
                  <Box className="tag">
                    <i className="fas fa-tag"></i>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box className="log-eye-icon" onClick={this.toggleAssetsSetUp}>
                    <i className="fas fa-eye"></i>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <span className="green">
                    <i className="fas fa-check"></i>
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span className="green">
                    <i className="fas fa-check"></i>
                  </span>
                </TableCell>
                <TableCell align="center">
                  <button type="button" className="list-icon">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">There are no data available.</h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };
  render() {
    const {  showAssetsSetUpModal } = this.state;
    return (
      <>
        <Box className="assets-table">{this.renderTable()}</Box>;
        {showAssetsSetUpModal ? (
          <AssetsSetUpModal
            showModal={showAssetsSetUpModal}
            toggleAssetsSetUp={this.toggleAssetsSetUp}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default AssetsTable;
