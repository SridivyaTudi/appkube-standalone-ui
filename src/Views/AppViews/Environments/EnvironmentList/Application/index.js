import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {
  IconButton,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import { getEnvironmentsApplicationTableData } from "Redux/EnvironmentData/EnvironmentDataThunk";
import { connect } from "react-redux";
import {
  getCurrentOrgId,
  setActiveTabInEnvironmentData,
  PRODUCT_CATEGORY_ENUM,
} from "Utils";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
import { v4 } from "uuid";
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

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationTableData: [],
    };
  }

  componentDidMount = () => {
    const queryPrm = new URLSearchParams(document.location.search);
    const landingZoneId = queryPrm.get("landingZoneId");
    this.props.getEnvironmentsApplicationTableData({
      orgId: getCurrentOrgId(),
      landingZoneId: landingZoneId,
    });
  };

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.applicationsTableData.status !==
        this.props.applicationsTableData.status &&
      this.props.applicationsTableData.status === status.SUCCESS
    ) {
      this.setState({
        applicationTableData: this.props.applicationsTableData.data || [],
      });
    }
  };

  getMetricColor = (number) => {
    if (number > 98) {
      return (
        <p className="m-t-0 m-b-0" style={{ color: "#53CA43" }}>
          {number}
        </p>
      );
    }
    if (number > 90) {
      return (
        <p className="m-t-0 m-b-0" style={{ color: "#FAA24B" }}>
          {number}
        </p>
      );
    }
    if (number < 90) {
      return (
        <p className="m-t-0 m-b-0" style={{ color: "#FF2D2E" }}>
          {number}
        </p>
      );
    }
  };

  getAverageScore = (item) => {
    const { availability, dataProtection, performance, security, userExp } =
      item;
    const total =
      availability + dataProtection + performance + security + userExp;
    return this.getMetricColor(Math.floor(total / 5));
  };

  renderTable = () => {
    const { applicationTableData } = this.state;
    const { landingZone, landingZoneId, cloudName } = this.getUrlDetails();
    let JSX = [];
    applicationTableData.forEach((item) => {
      let type =
        item.appType.toUpperCase() === PRODUCT_CATEGORY_ENUM.THREE_TIER
          ? "3tier"
          : "soa";
      JSX.push(
        <TableRow key={v4()}>
          <TableCell align="left" className="p-l-15">
            <Link
              to={`${APP_PREFIX_PATH}/assets/environments/${type}/topology?landingZone=${landingZone}&cloudName=${cloudName}&landingZoneId=${landingZoneId}&productName=${item.application}&departmentName=${item.lob}&environmentName=${item.environment}`}
              onClick={() => setActiveTabInEnvironmentData("application")}
            >
              <HtmlTooltip className="table-tooltip" title={item.application}>
                <span>{item.application}</span>
              </HtmlTooltip>
            </Link>
          </TableCell>
          <TableCell align="center">{item.lob}</TableCell>
          <TableCell align="center">{item.environment}</TableCell>
          <TableCell align="center">{item.appType}</TableCell>
          <TableCell align="center">
            <Box className="availability-box">
              <HtmlTooltip
                className="table-tooltip"
                title={
                  <React.Fragment>
                    <Box className="availability-inner">
                      <div className="heading">
                        <strong>SLA</strong>
                      </div>
                      <Box className="location-text">
                        <Box className="location-add">
                          Location:
                          <strong>{item.sle.location}</strong>
                        </Box>
                        <ul>
                          <li>
                            <p>Performance</p>
                            {this.getMetricColor(item.sle.performance)}
                          </li>
                          <li>
                            <p>Availability</p>
                            {this.getMetricColor(item.sle.availability)}
                          </li>
                          <li>
                            <p>Security</p>
                            {this.getMetricColor(item.sle.security)}
                          </li>
                          <li>
                            <p>Data Protection</p>
                            {this.getMetricColor(item.sle.dataProtection)}
                          </li>
                          <li>
                            <p>User exp</p>
                            {this.getMetricColor(item.sle.userExp)}
                          </li>
                        </ul>
                      </Box>
                    </Box>
                  </React.Fragment>
                }
              >
                {this.getAverageScore(item.sle)}
              </HtmlTooltip>
            </Box>
          </TableCell>
          <TableCell align="center">
            <Box className="availability-box">
              <HtmlTooltip
                className="table-tooltip"
                title={
                  <React.Fragment>
                    <Box className="availability-inner">
                      <div className="heading">
                        <strong>SLA</strong>
                      </div>
                      <Box className="location-text">
                        <Box className="location-add">
                          Location:
                          <strong>{item.endUsage.location}</strong>
                        </Box>
                        <ul>
                          <li>
                            <p>Performance</p>
                            {this.getMetricColor(item.endUsage.performance)}
                          </li>
                          <li>
                            <p>Availability</p>
                            {this.getMetricColor(item.endUsage.availability)}
                          </li>
                          <li>
                            <p>Security</p>
                            {this.getMetricColor(item.endUsage.security)}
                          </li>
                          <li>
                            <p>Data Protection</p>
                            {this.getMetricColor(item.endUsage.dataProtection)}
                          </li>
                          <li>
                            <p>User exp</p>
                            {this.getMetricColor(item.endUsage.userExp)}
                          </li>
                        </ul>
                      </Box>
                    </Box>
                  </React.Fragment>
                }
              >
                {this.getAverageScore(item.endUsage)}
              </HtmlTooltip>
            </Box>
          </TableCell>
          <TableCell align="center">
            {item.cost.currencySymbol} {item.cost.total}
          </TableCell>
          <TableCell align="center">
            <IconButton aria-label="delete" size="small" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
    return JSX;
  };

  /** Get url details. */
  getUrlDetails() {
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    const landingZoneId = queryPrm.get("landingZoneId");
    const landingZone = queryPrm.get("landingZone");

    return { landingZone, landingZoneId, cloudName };
  }
  render() {
    const { applicationTableData } = this.state;

    return (
      <>
        <Box className="discovered-assets">
          {this.props.applicationsTableData.status === status.IN_PROGRESS ? (
            <Loader className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20" />
          ) : applicationTableData.length ? (
            <>
              <Box className="discovered-assets-head">
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                >
                  <Grid item lg={6} md={6} xs={12}>
                    <h3 className="m-b-0">My Workspace</h3>
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Box className="radio-group d-flex float-right ">
                      <Box className="d-flex align-items-center checkbox">
                        <label htmlFor={"DRS"}>DRS</label>
                        <input
                          id="DRS"
                          className="checkbox-input"
                          type="radio"
                          name="department"
                        />
                      </Box>
                      <Box className="d-flex align-items-center checkbox">
                        <label htmlFor={"IOT"}>IOT</label>
                        <input
                          id="IOT"
                          className="checkbox-input"
                          type="radio"
                          name="department"
                        />
                      </Box>
                      <Box className="d-flex align-items-center checkbox">
                        <label htmlFor={"Mesh"}>Mesh</label>
                        <input
                          id="Mesh"
                          className="checkbox-input"
                          type="radio"
                          name="department"
                        />
                      </Box>
                      <Box className="d-flex align-items-center checkbox">
                        <label htmlFor={"Lake"}>Lake</label>
                        <input
                          id="Lake"
                          className="checkbox-input"
                          type="radio"
                          name="department"
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box className="environment-table">
                <TableContainer className="table">
                  <Table>
                    <TableHead className="active">
                      <TableRow>
                        <TableCell align="left">Application</TableCell>
                        <TableCell align="center">LOB</TableCell>
                        <TableCell align="center">Environment</TableCell>
                        <TableCell align="center">App Type</TableCell>
                        <TableCell align="center">SLE</TableCell>
                        <TableCell align="center">End Usage</TableCell>
                        <TableCell align="center">Cost</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {applicationTableData.length ? this.renderTable() : <></>}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          ) : (
            <Box
              className="chart-spinner discovered-loading text-center width-100 p-t-20 p-b-20"
              style={{ minHeight: 340 }}
            >
              <h4 style={{ textAlign: "center" }}>
                {this.props.applicationsTableData.status === status.FAILURE
                  ? API_ERROR_MESSAGE
                  : NO_DATA_FOUND}{" "}
              </h4>
            </Box>
          )}
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { applicationsTableData } = state.environmentData;
  return { applicationsTableData };
};

const mapDispatchToProps = {
  getEnvironmentsApplicationTableData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
