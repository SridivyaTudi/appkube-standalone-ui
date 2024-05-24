import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getSlaMetrics } from "Redux/Dashboard/DashboardThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { API_ERROR_MESSAGE, NO_DATA_FOUND } from "CommonData";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

class SLAMetrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slaData: [],
    };
  }

  componentDidMount = () => {
    this.props.getSlaMetrics();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.slaMetrics.status !== this.props.slaMetrics.status &&
      this.props.slaMetrics.status === status.SUCCESS &&
      this.props.slaMetrics.data
    ) {
      const slaData = this.props.slaMetrics.data.length
        ? this.props.slaMetrics.data
        : [];
      this.setState({ slaData });
    }
  }

  // It  return class based on condition
  handletableColor = (number) => {
    let color = "";
    if (number > 98) {
      color = "green";
    } else if (number > 90 && number <= 98) {
      color = "orange";
    } else {
      color = "red";
    }
    return color;
  };

  // Render SLA Metrics table
  renderSlaMetricsTable = () => {
    const { slaData: products } = this.state;
    const { status: slaMetricsStatus } = this.props.slaMetrics;
    let tableHTML = [];

    if (slaMetricsStatus === status.IN_PROGRESS) {
      return (
        <TableRow>
          <TableCell className="products" colSpan={6}>
            <Loader className="metrics-loading" />
          </TableCell>
        </TableRow>
      );
    } else if (products.length) {
      products.forEach((productData, index) => {
        tableHTML.push(
          <TableRow key={uuidv4()}>
            <TableCell className="products">
              <HtmlTooltip className="table-tooltip" title={productData.name}>
                <span>{productData.name}</span>
              </HtmlTooltip>
            </TableCell>
            <TableCell
              className={this.handletableColor(productData.performance)}
            >
              {productData.performance}%
            </TableCell>
            <TableCell
              className={this.handletableColor(productData.availability)}
            >
              {productData.availability}%
            </TableCell>
            <TableCell
              className={this.handletableColor(productData.reliability)}
            >
              {productData.reliability}%
            </TableCell>
            <TableCell className={this.handletableColor(productData.security)}>
              {productData.security}%
            </TableCell>
            <TableCell className={this.handletableColor(productData.endUsage)}>
              {productData.endUsage}%
            </TableCell>
          </TableRow>
        );
      });
      return tableHTML;
    } else {
      return (
        <TableRow colSpan={12}>
          <TableCell className="products">
            <Box className="metrics-loading">
              <h5>
                {slaMetricsStatus === status.FAILURE
                  ? API_ERROR_MESSAGE
                  : NO_DATA_FOUND}
              </h5>
            </Box>
          </TableCell>
        </TableRow>
      );
    }
  };

  render() {
    return (
      <Box className="metrics-container">
        <Box className="metrics-table">
          <TableContainer className="metrics-table-inner">
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell className="products"> Products </TableCell>
                  <TableCell> Performance </TableCell>
                  <TableCell> Availability </TableCell>
                  <TableCell> Reliability </TableCell>
                  <TableCell> Security </TableCell>
                  <TableCell> End Usage </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>{this.renderSlaMetricsTable()}</TableBody>
            </Table>
          </TableContainer>
          <Box className="metrics-performance">
            <Box className="performance-box green">
              <i className="fa-solid fa-angle-right"></i> 98%
            </Box>
            <Box className="performance-box orange">
              <i className="fa-solid fa-angle-right"></i> 90%
            </Box>
            <Box className="performance-box red">
              <i className="fa-solid fa-angle-left"></i> 90%
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { slaMetrics } = state.dashboard;
  return { slaMetrics };
}

const mapDispatchToProps = {
  getSlaMetrics,
};

export default connect(mapStateToProps, mapDispatchToProps)(SLAMetrics);
