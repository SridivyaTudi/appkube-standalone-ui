import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { v4 } from "uuid";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

class ExcludeLambdaTableOfGlobalService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pg: 0,
      rpg: 10,
    };
  }

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ pg: 0, rpg: parseInt(event.target.value, 10) });
  };

  render() {
    const { pg, rpg } = this.state;
    const { title } = this.props;
    const { tableData } = this.props;

    if (!tableData.length) {
      return (
        <Box className="lambda-functions-container">
          <Box className="heading">
            <h4> {`${title} Functions`}</h4>
          </Box>
          <Box className="lambda-functions-table-section">
            <h3>No Data available!</h3>
          </Box>
        </Box>
      );
    }

    return (
      <Box className="lambda-functions-container">
        <Box className="heading">
          <h4>{`${title} Functions`}</h4>
        </Box>
        <Box className="lambda-functions-table-section">
          <TableContainer className="table">
            <Table className="lambda-functions-table">
              <TableHead>
                <TableRow>
                  <TableCell>Instance Id</TableCell>
                  <TableCell align="center">Landing Zone</TableCell>
                  <TableCell align="center">Element Type</TableCell>
                  <TableCell align="center">
                    Product Enclave InstanceId
                  </TableCell>
                  <TableCell align="center">Service Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                  <TableRow key={v4()}>
                    <TableCell className="functionid">
                      <HtmlTooltip
                        className="table-tooltip"
                        title={row.instanceId}
                      >
                        <span> {row.instanceId}</span>
                      </HtmlTooltip>
                    </TableCell>
                    <TableCell align="center">{row.landingZone}</TableCell>
                    <TableCell align="center">{row.elementType}</TableCell>
                    <TableCell align="center">
                      {row.productEnclaveInstanceId || '-'}
                    </TableCell>
                    <TableCell align="center">{row.serviceCategory}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={tableData.length}
            rowsPerPage={rpg}
            page={pg}
            className="access-control-pagination"
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    );
  }
}

export default ExcludeLambdaTableOfGlobalService;
