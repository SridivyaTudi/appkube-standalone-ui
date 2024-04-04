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
  Button,
} from "@mui/material";
import { v4 } from "uuid";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {
  APPKUBE_UI_ENDPOINT,
  REGEX_TYPE,
  ELEMENT_EXPLORER_MAPPING,
} from "CommonData";
import { Link } from "react-router-dom";
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

class LambdaTable extends Component {
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
  getExplorerLink = (elementType, id) => {
    let element = elementType.toUpperCase();
    return `${
      ELEMENT_EXPLORER_MAPPING[element]
        ? `${APPKUBE_UI_ENDPOINT}${ELEMENT_EXPLORER_MAPPING[element].replace(
            "#element-id#",
            id
          )}`
        : "#"
    }`;
  };
  render() {
    const { pg, rpg } = this.state;
    const { title } = this.props;
    const { tableData } = this.props;
    if (!tableData.length) {
      return (
        <Box className="lambda-functions-container">
          <Box className="heading">
            <h4> {title ? `${title} Functions` : "Lambda Functions"}</h4>
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
          <h4>{title ? `${title} Functions` : "Lambda Functions"}</h4>
        </Box>
        <Box className="lambda-functions-table-section">
          <TableContainer className="table">
            <Table className="lambda-functions-table">
              <TableHead>
                <TableRow>
                  <TableCell>Function name</TableCell>
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
                    <TableCell className="functionid">
                      <HtmlTooltip
                        className="table-tooltip"
                        title={row.functionName}
                      >
                        <Button className="link-btn"
                          component={Link}
                          target="_blank"
                          to={this.getExplorerLink(title, row.id)}
                          disabled={
                            !ELEMENT_EXPLORER_MAPPING[title.toUpperCase()]
                          }
                        >
                          <p>{row.functionName}</p>
                        </Button>
                      </HtmlTooltip>
                    </TableCell>
                    <TableCell align="center">{row.responseTime}</TableCell>
                    <TableCell align="center">{row.duration}</TableCell>
                    <TableCell align="center">{row.invocations}</TableCell>
                    <TableCell align="center">{row.throttles}</TableCell>
                    <TableCell align="center">{row.errors}</TableCell>
                    <TableCell align="center">{row.latency}</TableCell>
                    <TableCell align="center">{row.networkReceived}</TableCell>
                    <TableCell align="center">{row.requests}</TableCell>
                    <TableCell align="center" className="productid">
                      <HtmlTooltip
                        className="table-tooltip"
                        title={row.product}
                      >
                        <span> {row.product}</span>
                      </HtmlTooltip>
                    </TableCell>
                    <TableCell align="center" className="productid">
                      <HtmlTooltip
                        className="table-tooltip"
                        title={row.environment}
                      >
                        <span> {row.environment} </span>
                      </HtmlTooltip>
                    </TableCell>
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
