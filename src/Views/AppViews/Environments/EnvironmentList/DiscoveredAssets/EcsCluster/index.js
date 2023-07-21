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
          sle: "",
          endUsage: "Medium",
          cost: "420",
        },
        {
          product: "Xuber",
          environment: "DEV",
          businessName: "Recruitment",
          layer: "Data Layer",
          sle: "",
          endUsage: "High",
          cost: "420",
        },
        {
          product: "Insurity",
          environment: "DEV",
          businessName: "Inventory",
          layer: "Auxiliary Layer",
          sle: "",
          endUsage: "Low",
          cost: "420",
        },
        {
          product: "Vertafore",
          environment: "DEV",
          businessName: "Vendor request",
          layer: "Data Layer",
          sle: "",
          endUsage: "Medium",
          cost: "420",
        },
        {
          product: "Guidewire",
          environment: "DEV",
          businessName: "A/C Payable",
          layer: "Data Layer",
          sle: "",
          endUsage: "High",
          cost: "420",
        },
        {
          product: "Duck Creek",
          environment: "DEV",
          businessName: "Agent request",
          layer: "Data Layer",
          sle: "",
          endUsage: "Low",
          cost: "420",
        },
        {
          product: "eBaoTech",
          environment: "DEV",
          businessName: "Inventory",
          layer: "App Layer",
          sle: "",
          endUsage: "Low",
          cost: "420",
        },
        {
          product: "Vertafore",
          environment: "DEV",
          businessName: "Vendor request",
          layer: "App Layer",
          sle: "",
          endUsage: "Medium",
          cost: "420",
        },
        {
          product: "Xuber",
          environment: "DEV",
          businessName: "A/C Payable",
          layer: "Auxiliary Layer",
          sle: "",
          endUsage: "High",
          cost: "420",
        },
        {
          product: "Insurity",
          environment: "DEV",
          businessName: "Agent request",
          layer: "Auxiliary Layer",
          sle: "",
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
          sle: "",
          endUsage: "Medium",
          cost: "420",
        },
        {
          serviceName: "Service 2",
          businessName: "Recruitment",
          typeOfService: "Data Service",
          product: "HRMS",
          environment: "DEV",
          sle: "",
          endUsage: "High",
          cost: "420",
        },
        {
          serviceName: "Service 3",
          businessName: "Inventory",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "",
          endUsage: "Low",
          cost: "420",
        },
        {
          serviceName: "Service 4",
          businessName: "Vendor request",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "",
          endUsage: "Medium",
          cost: "420",
        },
        {
          serviceName: "Service 5",
          businessName: "A/C Payable",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "",
          endUsage: "High",
          cost: "420",
        },
        {
          serviceName: "Service 6",
          businessName: "Agent request",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "",
          endUsage: "Low",
          cost: "420",
        },
        {
          serviceName: "Service 7",
          businessName: "Inventory",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "",
          endUsage: "Low",
          cost: "420",
        },
        {
          serviceName: "Service 8",
          businessName: "Vendor request",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "",
          endUsage: "Medium",
          cost: "420",
        },
        {
          serviceName: "Service 9",
          businessName: "A/C Payable",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "",
          endUsage: "High",
          cost: "420",
        },
        {
          serviceName: "Service 10",
          businessName: "Agent request",
          typeOfService: "Data Service",
          product: "Procurement",
          environment: "DEV",
          sle: "",
          endUsage: "Low",
          cost: "420",
        },
      ],
      pg: 0,
      rpg: 5,
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

  render() {
    const { tierRows, soaRows, pg, rpg, actionButton, activeTierTab } =
      this.state;
    return (
      <>
        <Box className="resources-section">
          <h4>ECS Resources</h4>
          <Box className="tier-buttons">
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
        </Box>
        {activeTierTab === "3Tier" ? (
          <>
            <TableContainer component={Paper} className="access-control-table">
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
                className="table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Environment</TableCell>
                    <TableCell>Business Name</TableCell>
                    <TableCell>Layer</TableCell>
                    <TableCell>SLE</TableCell>
                    <TableCell>End-usage</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tierRows
                    .slice(pg * rpg, pg * rpg + rpg)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.product}</TableCell>
                        <TableCell>{row.environment}</TableCell>
                        <TableCell>{row.businessName}</TableCell>
                        <TableCell>{row.layer}</TableCell>
                        <TableCell>{row.sle}</TableCell>
                        <TableCell>{row.endUsage}</TableCell>
                        <TableCell>${row.cost}</TableCell>
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
          </>
        ) : (
          <>
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
                    <TableCell>Product</TableCell>
                    <TableCell>Environment</TableCell>
                    <TableCell>SLE</TableCell>
                    <TableCell>End-usage</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {soaRows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.serviceName}</TableCell>
                      <TableCell>{row.businessName}</TableCell>
                      <TableCell>{row.typeOfService}</TableCell>
                      <TableCell>{row.product}</TableCell>
                      <TableCell>{row.environment}</TableCell>
                      <TableCell>{row.sle}</TableCell>
                      <TableCell>{row.endUsage}</TableCell>
                      <TableCell>${row.cost}</TableCell>
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
          </>
        )}
      </>
    );
  }
}

export default EcsCluster;
