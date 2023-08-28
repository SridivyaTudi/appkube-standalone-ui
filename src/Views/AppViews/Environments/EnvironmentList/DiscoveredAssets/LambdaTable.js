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

class LambdaTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lambdaFunctionsData: [
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "136k",
          invocations: "125k",
          throttles: "1.2k",
          errors: "25k",
          latency: "2.3k",
          networkReceived: "230",
          requests: "230",
          product: "We Desk",
          environment: "Dev",
          actions: "",
        },
        {
          functionName: "12:1564adscx23",
          responseTime: "0.005ms",
          duration: "752",
          invocations: "1.25k",
          throttles: "2.3",
          errors: "03",
          latency: "02",
          networkReceived: "210",
          requests: "210",
          product: "Procurement",
          environment: "Stage",
          actions: "",
        },
      ],
      pg: 0,
      rpg: 10,
    };
  }

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10) });
  };

  /** Render table level-1 data . */
  renderTableData() {
    let { data } = this.state;
    return data.map((datas, index) => {
      return (
        <TableRow key={v4()}>
          <TableCell align="center">{datas.resources}</TableCell>
          <TableCell align="center">{datas.resourcesType}</TableCell>
          <TableCell align="center">{datas.primaryResources}</TableCell>
          <TableCell align="center">{datas.failureResources}</TableCell>
          <TableCell align="center">
            <Box className="done">{datas.status}</Box>
          </TableCell>
        </TableRow>
      );
    });
  }

  render() {
    const { lambdaFunctionsData, pg, rpg } = this.state;
    const { tableData } = this.props;
    return (
      <Box className="lambda-functions-container">
        <Box className="heading">Lambda Functions</Box>
        <Box className="lambda-functions-table-section">
          <TableContainer className="table">
            <Table className="lambda-functions-table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Function name</TableCell>
                  <TableCell align="center">Response time</TableCell>
                  <TableCell align="center">Duration</TableCell>
                  <TableCell align="center">Invocations</TableCell>
                  <TableCell align="center">Throttles</TableCell>
                  <TableCell align="center">Errors</TableCell>
                  <TableCell align="center">Latency</TableCell>
                  <TableCell align="center">Network received</TableCell>
                  <TableCell align="center">Requests</TableCell>
                  <TableCell align="center">Product</TableCell>
                  <TableCell align="center">Environment</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                  <TableRow key={v4()}>
                    <TableCell align="center">{row.functionName}</TableCell>
                    <TableCell align="center">{row.responseTime}</TableCell>
                    <TableCell align="center">{row.duration}</TableCell>
                    <TableCell align="center">{row.invocations}</TableCell>
                    <TableCell align="center">{row.throttles}</TableCell>
                    <TableCell align="center">{row.errors}</TableCell>
                    <TableCell align="center">{row.latency}</TableCell>
                    <TableCell align="center">{row.networkReceived}</TableCell>
                    <TableCell align="center">{row.requests}</TableCell>
                    <TableCell align="center">{row.product}</TableCell>
                    <TableCell align="center">{row.environment}</TableCell>
                    <TableCell align="center">{row.actions}</TableCell>
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

export default LambdaTable;
