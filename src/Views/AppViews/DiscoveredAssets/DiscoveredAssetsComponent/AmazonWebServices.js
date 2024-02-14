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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { v4 } from "uuid";

class AmazonWebServices extends Component {
  render() {
    return (
      <>
        <Box className="head-top-section">
          <Button className="primary-outline-btn min-width" variant="outlined">
            Filters
          </Button>
          <Box className="add-filters">
            <Box className="filter-box">
              <Box className="d-flex  align-items-center m-r-3">
                <label>Region &#58; </label>
                <span> US East 2 </span>
              </Box>
              <CloseIcon fontSize="inherit" className="close-btn" />
            </Box>
            <Box className="filter-box">
              <Box className="d-flex  align-items-center m-r-3">
                <label>AWS Account: &#58; </label>
                <span>AWS (657) </span>
              </Box>
              <CloseIcon fontSize="inherit" className="close-btn" />
            </Box>
            <Box className="filter-box">
              <Box className="d-flex  align-items-center m-r-3">
                <label>Product Enclave : &#58; </label>
                <span> 8 VPC </span>
              </Box>
              <CloseIcon fontSize="inherit" className="close-btn" />
            </Box>
            <Box className="filter-box">
              <Box className="d-flex  align-items-center m-r-3">
                <label>Element Type : &#58; </label>
                <span> EC2 </span>
              </Box>
              <CloseIcon fontSize="inherit" className="close-btn" />
            </Box>
            <Box className="filter-box">
              <Box className="d-flex  align-items-center m-r-3">
                <label>App / Data &#58; </label>
                <span>  </span>
              </Box>
              <CloseIcon fontSize="inherit" className="close-btn" />
            </Box>
          </Box>
          <Box className="clear-filter-box">
            <label>Clear Filter</label>
            <DeleteForeverIcon fontSize="inherit" className="delete-btn" />
          </Box>
        </Box>
        <Box className="environment-table">
          <TableContainer className="table">
            <Table>
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
              <TableBody>
                <TableRow>
                  <TableCell align="left">45sdf28d</TableCell>
                  <TableCell align="left">EKS</TableCell>
                  <TableCell align="left">AWS (657907747554)</TableCell>
                  <TableCell align="left">VPC-ds42es114</TableCell>
                  <TableCell align="center"><Box className="tag"><i class="fas fa-tag"></i></Box></TableCell>
                  <TableCell align="center"><Box className="log-eye-icon"><i class="fas fa-eye"></i></Box></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">45sdf28d</TableCell>
                  <TableCell align="left">EKS</TableCell>
                  <TableCell align="left">AWS (657907747554)</TableCell>
                  <TableCell align="left">VPC-ds42es114</TableCell>
                  <TableCell align="center"><Box className="tag"><i class="fas fa-tag"></i></Box></TableCell>
                  <TableCell align="center"><Box className="log-eye-icon"><i class="fas fa-eye"></i></Box></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">45sdf28d</TableCell>
                  <TableCell align="left">EKS</TableCell>
                  <TableCell align="left">AWS (657907747554)</TableCell>
                  <TableCell align="left">VPC-ds42es114</TableCell>
                  <TableCell align="center"><Box className="tag"><i class="fas fa-tag"></i></Box></TableCell>
                  <TableCell align="center"><Box className="log-eye-icon"><i class="fas fa-eye"></i></Box></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">45sdf28d</TableCell>
                  <TableCell align="left">EKS</TableCell>
                  <TableCell align="left">AWS (657907747554)</TableCell>
                  <TableCell align="left">VPC-ds42es114</TableCell>
                  <TableCell align="center"><Box className="tag"><i class="fas fa-tag"></i></Box></TableCell>
                  <TableCell align="center"><Box className="log-eye-icon"><i class="fas fa-eye"></i></Box></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">45sdf28d</TableCell>
                  <TableCell align="left">EKS</TableCell>
                  <TableCell align="left">AWS (657907747554)</TableCell>
                  <TableCell align="left">VPC-ds42es114</TableCell>
                  <TableCell align="center"><Box className="tag"><i class="fas fa-tag"></i></Box></TableCell>
                  <TableCell align="center"><Box className="log-eye-icon"><i class="fas fa-eye"></i></Box></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">45sdf28d</TableCell>
                  <TableCell align="left">EKS</TableCell>
                  <TableCell align="left">AWS (657907747554)</TableCell>
                  <TableCell align="left">VPC-ds42es114</TableCell>
                  <TableCell align="center"><Box className="tag"><i class="fas fa-tag"></i></Box></TableCell>
                  <TableCell align="center"><Box className="log-eye-icon"><i class="fas fa-eye"></i></Box></TableCell>
                  <TableCell align="center"><span className="orange"><i class="fas fa-times"></i></span></TableCell>
                  <TableCell align="center"><span className="orange"><i class="fas fa-times"></i></span></TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">45sdf28d</TableCell>
                  <TableCell align="left">EKS</TableCell>
                  <TableCell align="left">AWS (657907747554)</TableCell>
                  <TableCell align="left">VPC-ds42es114</TableCell>
                  <TableCell align="center"><Box className="setting-icon"><i class="fas fa-cog"></i></Box></TableCell>
                  <TableCell align="center"><Box className="log-eye-icon"><i class="fas fa-eye"></i></Box></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">45sdf28d</TableCell>
                  <TableCell align="left">EKS</TableCell>
                  <TableCell align="left">AWS (657907747554)</TableCell>
                  <TableCell align="left">VPC-ds42es114</TableCell>
                  <TableCell align="center"><Box className="setting-icon"><i class="fas fa-cog"></i></Box></TableCell>
                  <TableCell align="center"><Box className="log-eye-icon"><i class="fas fa-eye"></i></Box></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center"><span className="green"><i class="fas fa-check"></i></span></TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}

export default AmazonWebServices;
