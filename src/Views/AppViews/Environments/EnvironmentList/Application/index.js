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
                  <label htmlFor={"radio"}>DRS</label>
                  <input id="radio"
                    className="checkbox-input"
                    type="radio"
                    name="department"
                  />
                </Box>
                <Box className="d-flex align-items-center checkbox">
                  <label htmlFor={"radio"}>IOT</label>
                  <input id="radio"
                    className="checkbox-input"
                    type="radio"
                    name="department"
                  />
                </Box>
                <Box className="d-flex align-items-center checkbox">
                  <label htmlFor={"radio"}>Mesh</label>
                  <input id="radio"
                    className="checkbox-input"
                    type="radio"
                    name="department"
                  />
                </Box>
                <Box className="d-flex align-items-center checkbox">
                  <label htmlFor={"radio"}>Lake</label>
                  <input id="radio"
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
                  <TableCell align="center">RPO</TableCell>
                  <TableCell align="center">RTO</TableCell>
                  <TableCell align="center">Web Layer</TableCell>
                  <TableCell align="center">App Layer</TableCell>
                  <TableCell align="center">Data Layer</TableCell>
                  <TableCell align="center">Auxiliary</TableCell>
                  <TableCell align="center">DR Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    <Link
                      to={`${APP_PREFIX_PATH}/environments/disasterrecovery`}
                    >
                      Majesco
                    </Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Dev</TableCell>
                  <TableCell align="center">5 min</TableCell>
                  <TableCell align="center">2 hrs</TableCell>
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
                  <TableCell align="center">
                    <span className="done">Done</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link to={`#`}>Xuber</Link>
                  </TableCell>
                  <TableCell align="center">Finance</TableCell>
                  <TableCell align="center">Test</TableCell>
                  <TableCell align="center">8 min</TableCell>
                  <TableCell align="center">4 hrs</TableCell>
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
                  <TableCell align="center">
                    <div className="done">Done</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link to={`#`}>Insurity</Link>
                  </TableCell>
                  <TableCell align="center">Legal</TableCell>
                  <TableCell align="center">Stage</TableCell>
                  <TableCell align="center">5 min</TableCell>
                  <TableCell align="center">5 hrs</TableCell>
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
                        <span className="orange"></span>
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
                        <span className="orange"></span>
                      </HtmlTooltip>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <div className="error">Error</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link to={`#`}>Vertafore</Link>
                  </TableCell>
                  <TableCell align="center">Reimbursement</TableCell>
                  <TableCell align="center">Prod</TableCell>
                  <TableCell align="center">10 min</TableCell>
                  <TableCell align="center">2 hrs</TableCell>
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
                  <TableCell align="center">
                    <div className="done">Done</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link to={`#`}>Guidewire</Link>
                  </TableCell>
                  <TableCell align="center">Claims</TableCell>
                  <TableCell align="center">Prod</TableCell>
                  <TableCell align="center">2 min</TableCell>
                  <TableCell align="center">3 hrs</TableCell>
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
                  <TableCell align="center">
                    <div className="inprogress">Inprogress</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link to={`#`}>Duck Creek</Link>
                  </TableCell>
                  <TableCell align="center">Legal</TableCell>
                  <TableCell align="center">Test</TableCell>
                  <TableCell align="center">5 min</TableCell>
                  <TableCell align="center">2.5 hrs</TableCell>
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
                  <TableCell align="center">
                    <div className="done">Done</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Link to={`#`}>eBaoTech</Link>
                  </TableCell>
                  <TableCell align="center">Cashless</TableCell>
                  <TableCell align="center">Prod</TableCell>
                  <TableCell align="center">3 min</TableCell>
                  <TableCell align="center">2 hrs</TableCell>
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
                  <TableCell align="center">
                    <div className="done">Done</div>
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
