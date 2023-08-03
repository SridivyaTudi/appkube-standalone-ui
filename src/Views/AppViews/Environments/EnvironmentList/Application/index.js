import React, { Component } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    const HtmlTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.arrow}`]: {
        color: "#ffffffff",
      },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#ffffffff",
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[2],
        maxWidth: 200,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
      },
    }));

    return (
      <Box className="discovered-assets">
        <Box className="discovered-assets-head">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Grid item lg={6} md={6} xs={12}>
              <h3 className="m-b-4">My Workspace</h3>
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
        <Box className="environment-table-section">
          <TableContainer className="table">
            <Table className="overview">
              <TableHead>
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
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      HRMS
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Development</TableCell>
                  <TableCell align="center">3 Tier</TableCell>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">$ 400</TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      Xuber
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Development</TableCell>
                  <TableCell align="center">SOA</TableCell>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">$ 400</TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      HMS
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Development</TableCell>
                  <TableCell align="center">3 Tier</TableCell>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">$ 400</TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      Vertafore
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Development</TableCell>
                  <TableCell align="center">3 Tier</TableCell>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">$ 400</TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      Guidewire
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Development</TableCell>
                  <TableCell align="center">3 Tier</TableCell>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">$ 400</TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      Duck Creek
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Development</TableCell>
                  <TableCell align="center">3 Tier</TableCell>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">$ 400</TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      eBaoTech
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Development</TableCell>
                  <TableCell align="center">3 Tier</TableCell>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">$ 400</TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      Xuber
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Development</TableCell>
                  <TableCell align="center">3 Tier</TableCell>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">$ 400</TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      SCM
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Development</TableCell>
                  <TableCell align="center">3 Tier</TableCell>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">$ 400</TableCell>
                  <TableCell align="center">
                    <button type="button" className="list-icon">
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      Procurement
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Development</TableCell>
                  <TableCell align="center">3 Tier</TableCell>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
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
                                  Location:{" "}
                                  <strong>US-East - EC2 657907747554</strong>
                                </Box>
                                <ul>
                                  <li>
                                    <p>Performance</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Availability</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Security</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>Data Protection</p>
                                    <span></span>
                                  </li>
                                  <li>
                                    <p>User exp</p>
                                    <span></span>
                                  </li>
                                </ul>
                              </Box>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <span className="green"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">$ 400</TableCell>
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
      </Box>
    );
  }
}

export default Application;
