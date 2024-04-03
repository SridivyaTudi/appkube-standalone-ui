import React from "react";
import {
  Button,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { v4 } from "uuid";

class EcsCluster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tierRows: [
        {
          product: "Majesco",
          environment: "DEV",
          businessName: "Payroll",
          layer: "App Layer",
          sle: "98",
          endUsage: "Medium",
          cost: "420",
        },
        {
          product: "Xuber",
          environment: "DEV",
          businessName: "Recruitment",
          layer: "Data Layer",
          sle: "95",
          endUsage: "High",
          cost: "420",
        },
        {
          product: "Insurity",
          environment: "DEV",
          businessName: "Inventory",
          layer: "Auxiliary Layer",
          sle: "96",
          endUsage: "Low",
          cost: "420",
        },
        {
          product: "Vertafore",
          environment: "DEV",
          businessName: "Vendor request",
          layer: "Data Layer",
          sle: "97",
          endUsage: "Medium",
          cost: "420",
        },
        {
          product: "Guidewire",
          environment: "DEV",
          businessName: "A/C Payable",
          layer: "Data Layer",
          sle: "94",
          endUsage: "High",
          cost: "420",
        },
        {
          product: "Duck Creek",
          environment: "DEV",
          businessName: "Agent request",
          layer: "Data Layer",
          sle: "95",
          endUsage: "Low",
          cost: "420",
        },
        {
          product: "eBaoTech",
          environment: "DEV",
          businessName: "Inventory",
          layer: "App Layer",
          sle: "92",
          endUsage: "Low",
          cost: "420",
        },
        {
          product: "Vertafore",
          environment: "DEV",
          businessName: "Vendor request",
          layer: "App Layer",
          sle: "98",
          endUsage: "Medium",
          cost: "420",
        },
        {
          product: "Xuber",
          environment: "DEV",
          businessName: "A/C Payable",
          layer: "Auxiliary Layer",
          sle: "96",
          endUsage: "High",
          cost: "420",
        },
        {
          product: "Insurity",
          environment: "DEV",
          businessName: "Agent request",
          layer: "Auxiliary Layer",
          sle: "93",
          endUsage: "Low",
          cost: "420",
        },
      ],
      soaRows: [
        {
          serviceName: "Service 1",
          businessName: "Payroll",
          typeOfService: "APP Service",
          product: "HRMS",
          environment: "DEV",
          sle: "97",
          endUsage: "Medium",
          cost: "420",
        },
        {
          serviceName: "Service 2",
          businessName: "Recruitment",
          typeOfService: "Data Service",
          product: "HRMS",
          environment: "DEV",
          sle: "94",
          endUsage: "High",
          cost: "420",
        },
        {
          serviceName: "Service 3",
          businessName: "Inventory",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "96",
          endUsage: "Low",
          cost: "420",
        },
        {
          serviceName: "Service 4",
          businessName: "Vendor request",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "97",
          endUsage: "Medium",
          cost: "420",
        },
        {
          serviceName: "Service 5",
          businessName: "A/C Payable",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "98",
          endUsage: "High",
          cost: "420",
        },
        {
          serviceName: "Service 6",
          businessName: "Agent request",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "94",
          endUsage: "Low",
          cost: "420",
        },
        {
          serviceName: "Service 7",
          businessName: "Inventory",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "96",
          endUsage: "Low",
          cost: "420",
        },
        {
          serviceName: "Service 8",
          businessName: "Vendor request",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "95",
          endUsage: "Medium",
          cost: "420",
        },
        {
          serviceName: "Service 9",
          businessName: "A/C Payable",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "93",
          endUsage: "High",
          cost: "420",
        },
        {
          serviceName: "Service 10",
          businessName: "Agent request",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "96",
          endUsage: "Low",
          cost: "420",
        },
      ],
      pg: 0,
      rpg: 10,
      actionButton: null,
      activeTierTab: "3Tier",
    };
  }

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10) });
  };

  handleActionButton = (index) => {
    const { actionButton } = this.state;
    if (actionButton === null) {
      this.setState({
        actionButton: index,
      });
    } else {
      this.setState({
        actionButton: null,
      });
    }
  };

  handleTierTabToggle = (type) => {
    this.setState({ activeTierTab: type });
  };

  getUrlDetails() {
    const queryPrm = new URLSearchParams(document.location.search);

    const cloudName = queryPrm.get("cloudName");
    const landingZoneId = queryPrm.get("landingZoneId");
    const landingZone = queryPrm.get("landingZone");

    return { landingZone, landingZoneId, cloudName };
  }
  render() {
    const { tierRows, soaRows, pg, rpg, actionButton, activeTierTab } =
      this.state;
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
    const { landingZone, landingZoneId, cloudName } = this.getUrlDetails();
    return (
      <Box className="environment-container environmentlist cluster-container">
        <Box className="list-heading">
          <h3>ECS Cluster 01</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`${APP_PREFIX_PATH}/assets/environments`}>Environments</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <Link
                  to={`${APP_PREFIX_PATH}/assets/environments/environmentlist?landingZone=${landingZone}&cloudName=${cloudName}&landingZoneId=${landingZoneId}`}
                >
                  {cloudName} &nbsp;(
                  {landingZone})
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">ECS Cluster 01</li>
            </ul>
          </Box>
        </Box>
        <Box className="tier-buttons float-right">
          <Button
            variant={activeTierTab === "3Tier" ? "contained" : "outlined"}
            className={
              activeTierTab === "3Tier"
                ? "primary-btn min-width"
                : "primary-outline-btn min-width"
            }
            onClick={() => this.handleTierTabToggle("3Tier")}
          >
            3 Tier
          </Button>
          <Button
            variant={activeTierTab === "Soa" ? "contained" : "outlined"}
            className={
              activeTierTab === "Soa"
                ? "primary-btn min-width"
                : "primary-outline-btn min-width"
            }
            onClick={() => this.handleTierTabToggle("Soa")}
          >
            SOA
          </Button>
        </Box>
        {activeTierTab === "3Tier" ? (
          <Box className="cluster-table">
            <TableContainer component={Paper} className="access-control-table">
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
                className="table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Environment</TableCell>
                    <TableCell>Business Name</TableCell>
                    <TableCell>Layer</TableCell>
                    <TableCell align="center">SLE</TableCell>
                    <TableCell align="center">End-usage</TableCell>
                    <TableCell align="center">Cost</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tierRows
                    .slice(pg * rpg, pg * rpg + rpg)
                    .map((row, index) => (
                      <TableRow key={v4()}>
                        <TableCell>{row.product}</TableCell>
                        <TableCell align="center">{row.environment}</TableCell>
                        <TableCell>{row.businessName}</TableCell>
                        <TableCell>{row.layer}</TableCell>
                        <TableCell align="center">
                          <Box className="sle-box">
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
                                        <strong>
                                          US-East - EC2 657907747554
                                        </strong>
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
                              <span>{row.sle}%</span>
                            </HtmlTooltip>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <div
                            className={
                              row.endUsage === "Medium"
                                ? "medium"
                                : "" || row.endUsage === "High"
                                ? "high"
                                : "" || row.endUsage === "Low"
                                ? "low"
                                : ""
                            }
                          >
                            {row.endUsage === "Medium" && (
                              <i className="fa-solid fa-grip-lines"></i>
                            )}
                            {row.endUsage === "High" && (
                              <i className="fa-solid fa-angles-up"></i>
                            )}
                            {row.endUsage === "Low" && (
                              <i className="fa-solid fa-angles-down"></i>
                            )}{" "}
                            {row.endUsage}
                          </div>
                        </TableCell>
                        <TableCell align="center">${row.cost}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            className="action-btn"
                            aria-label="morevertIcon"
                            size="small"
                            onClick={() => this.handleActionButton(index)}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                          {actionButton === index && (
                            <>
                              <Box className="action-buttons">
                                <Button
                                  startIcon={
                                    <DeleteOutlineOutlinedIcon className="icon" />
                                  }
                                  className="secondary-text-btn"
                                >
                                  Delete Role
                                </Button>
                                <Button
                                  startIcon={
                                    <EditCalendarIcon className="icon" />
                                  }
                                  className="secondary-text-btn"
                                >
                                  Edit Role
                                </Button>
                              </Box>
                              <Box
                                className="action-buttons-bg"
                                onClick={() => this.handleActionButton(index)}
                              ></Box>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={soaRows.length}
              rowsPerPage={rpg}
              page={pg}
              className="access-control-pagination"
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Box>
        ) : (
          <Box className="cluster-table">
            <TableContainer component={Paper} className="access-control-table">
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
                className="table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Service Name</TableCell>
                    <TableCell>Business Name</TableCell>
                    <TableCell>Type of service</TableCell>
                    <TableCell align="center">Product</TableCell>
                    <TableCell align="center">Environment</TableCell>
                    <TableCell align="center">SLE</TableCell>
                    <TableCell align="center">End-usage</TableCell>
                    <TableCell align="center">Cost</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {soaRows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                    <TableRow key={v4()}>
                      <TableCell>{row.serviceName}</TableCell>
                      <TableCell>{row.businessName}</TableCell>
                      <TableCell>{row.typeOfService}</TableCell>
                      <TableCell align="center">{row.product}</TableCell>
                      <TableCell align="center">{row.environment}</TableCell>
                      <TableCell align="center">
                        <Box className="sle-box">
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
                                      <strong>
                                        US-East - EC2 657907747554
                                      </strong>
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
                            <span>{row.sle}%</span>
                          </HtmlTooltip>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <div
                          className={
                            row.endUsage === "Medium"
                              ? "medium"
                              : "" || row.endUsage === "High"
                              ? "high"
                              : "" || row.endUsage === "Low"
                              ? "low"
                              : ""
                          }
                        >
                          {row.endUsage === "Medium" && (
                            <i className="fa-solid fa-grip-lines"></i>
                          )}
                          {row.endUsage === "High" && (
                            <i className="fa-solid fa-angles-up"></i>
                          )}
                          {row.endUsage === "Low" && (
                            <i className="fa-solid fa-angles-down"></i>
                          )}{" "}
                          {row.endUsage}
                        </div>
                      </TableCell>
                      <TableCell align="center">${row.cost}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          className="action-btn"
                          aria-label="morevertIcon"
                          size="small"
                          onClick={() => this.handleActionButton(index)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                        {actionButton === index && (
                          <>
                            <Box className="action-buttons">
                              <Button
                                startIcon={
                                  <DeleteOutlineOutlinedIcon className="icon" />
                                }
                                className="secondary-text-btn"
                              >
                                Delete Role
                              </Button>
                              <Button
                                startIcon={
                                  <EditCalendarIcon className="icon" />
                                }
                                className="secondary-text-btn"
                              >
                                Edit Role
                              </Button>
                            </Box>
                            <Box
                              className="action-buttons-bg"
                              onClick={() => this.handleActionButton(index)}
                            ></Box>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={soaRows.length}
              rowsPerPage={rpg}
              page={pg}
              className="access-control-pagination"
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Box>
        )}
      </Box>
    );
  }
}

export default EcsCluster;
