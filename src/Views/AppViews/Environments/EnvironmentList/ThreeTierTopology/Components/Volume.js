import React, { Component } from "react";
import {
    Box,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";

class Volume extends Component {
  render() {
    return (
      <Box className="tier-table-section">
        <TableContainer className="table">
          <Table className="overview">
            <TableHead>
              <TableRow>
                <TableCell align="left" component="th" scope="row">
                Local Path
                </TableCell>
                <TableCell align="center">Data Location</TableCell>
                <TableCell align="center">Remote Path</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">/your/dummy/local/path</TableCell>
                <TableCell align="center">/your/dummy/data/location</TableCell>
                <TableCell align="center">htt ps://example.com/remote/dummy/content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">/your/dummy/local/path</TableCell>
                <TableCell align="center">/your/dummy/data/location</TableCell>
                <TableCell align="center">htt ps://example.com/remote/dummy/content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">/your/dummy/local/path</TableCell>
                <TableCell align="center">/your/dummy/data/location</TableCell>
                <TableCell align="center">htt ps://example.com/remote/dummy/content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">/your/dummy/local/path</TableCell>
                <TableCell align="center">/your/dummy/data/location</TableCell>
                <TableCell align="center">htt ps://example.com/remote/dummy/content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">/your/dummy/local/path</TableCell>
                <TableCell align="center">/your/dummy/data/location</TableCell>
                <TableCell align="center">htt ps://example.com/remote/dummy/content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">/your/dummy/local/path</TableCell>
                <TableCell align="center">/your/dummy/data/location</TableCell>
                <TableCell align="center">htt ps://example.com/remote/dummy/content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">/your/dummy/local/path</TableCell>
                <TableCell align="center">/your/dummy/data/location</TableCell>
                <TableCell align="center">htt ps://example.com/remote/dummy/content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">/your/dummy/local/path</TableCell>
                <TableCell align="center">/your/dummy/data/location</TableCell>
                <TableCell align="center">htt ps://example.com/remote/dummy/content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">/your/dummy/local/path</TableCell>
                <TableCell align="center">/your/dummy/data/location</TableCell>
                <TableCell align="center">htt ps://example.com/remote/dummy/content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">/your/dummy/local/path</TableCell>
                <TableCell align="center">/your/dummy/data/location</TableCell>
                <TableCell align="center">htt ps://example.com/remote/dummy/content</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default Volume;
