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
  TablePagination,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { v4 } from "uuid";
import { API_ERROR_MESSAGE, NO_DATA_FOUND } from "CommonData";
import RBAC_MAPPING from "Utils/RbacMapping";
import Rbac from "Views/AppViews/Rbac";
import { getViewServiceData } from "Redux/EnvironmentData/EnvironmentDataThunk";
import { PRODUCT_CATEGORY_ENUM, getCurrentOrgId } from "Utils";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";

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
class EcsCluster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewServices: [],
      pg: 0,
      rpg: 10,
      actionButton: null,
      activeTierTab: PRODUCT_CATEGORY_ENUM.THREE_TIER,
    };
  }

  componentDidMount = () => {
    let orgId = getCurrentOrgId();
    let { landingZoneId } = this.getUrlDetails();
    this.props.getViewServiceData({ orgId, landingZoneId });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.viewServiceData?.status !==
        this.props.viewServiceData?.status &&
      this.props.viewServiceData?.status === status.SUCCESS &&
      this.props.viewServiceData?.data
    ) {
      const viewServices = this.props.viewServiceData?.data || [];

      this.setState({ viewServices });
    }
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
    this.setState({ activeTierTab: type, pg: 0, rpg: 10 });
  };

  getUrlDetails() {
    const queryPrm = new URLSearchParams(document.location.search);

    const cloudName = queryPrm.get("cloudName");
    const landingZoneId = queryPrm.get("landingZoneId");
    const landingZone = queryPrm.get("landingZone");
    const elementType = queryPrm.get("elementType");
    return { landingZone, landingZoneId, cloudName, elementType };
  }

  renderHeader = () => {
    return (
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
    );
  };

  renderBody = () => {
    let { viewServices, pg, rpg, activeTierTab, actionButton } = this.state;

    viewServices = viewServices.filter(
      (service) => service?.productType?.toUpperCase() === activeTierTab
    );

    const {
      ADD_SERVICE_IN_NON_PROD_PRODUCT_ENVIRONMENT,
      EDIT_SERVICE_IN_NON_PROD_PRODUCT_ENVIRONMENT,
      DELETE_SERVICE_IN_NON_PROD_PRODUCT_ENVIRONMENT,
      REPLICATE_SERVICE_IN_NON_PROD_PRODUCT_ENVIRONMENT,
      ADD_SERVICE_IN_PROD_PRODUCT_ENVIRONMENT,
      EDIT_SERVICE_IN_PROD_PRODUCT_ENVIRONMENT,
      DELETE_SERVICE_IN_PROD_PRODUCT_ENVIRONMENT,
      REPLICATE_SERVICE_IN_PROD_PRODUCT_ENVIRONMENT,
    } = RBAC_MAPPING;
    return (
      <TableBody>
        {viewServices?.length ? (
          viewServices.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
            <TableRow key={v4()}>
              <TableCell>{row.product}</TableCell>
              <TableCell align="center">{row.environment}</TableCell>
              <TableCell>{row.serviceName}</TableCell>
              <TableCell>{row.serviceType}</TableCell>
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
                <Rbac
                  permissions={[
                    ADD_SERVICE_IN_NON_PROD_PRODUCT_ENVIRONMENT,
                    EDIT_SERVICE_IN_NON_PROD_PRODUCT_ENVIRONMENT,
                    DELETE_SERVICE_IN_NON_PROD_PRODUCT_ENVIRONMENT,
                    REPLICATE_SERVICE_IN_NON_PROD_PRODUCT_ENVIRONMENT,
                    ADD_SERVICE_IN_PROD_PRODUCT_ENVIRONMENT,
                    EDIT_SERVICE_IN_PROD_PRODUCT_ENVIRONMENT,
                    DELETE_SERVICE_IN_PROD_PRODUCT_ENVIRONMENT,
                    REPLICATE_SERVICE_IN_PROD_PRODUCT_ENVIRONMENT,
                  ]}
                >
                  {" "}
                  <button
                    type="button"
                    className="list-icon"
                    onClick={() => this.handleActionButton(index)}
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </Rbac>

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
                        startIcon={<EditCalendarIcon className="icon" />}
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
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">
                    {this.props.viewServiceData?.status === status.FAILURE
                      ? API_ERROR_MESSAGE
                      : NO_DATA_FOUND}
                  </h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };
  renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }
  render() {
    const { activeTierTab, rpg, pg, viewServices } = this.state;
    const { landingZone, landingZoneId, cloudName, elementType } =
      this.getUrlDetails();

    const serviceLength = viewServices.filter(
      (service) => service?.productType?.toUpperCase() === activeTierTab
    )?.length;

    let { viewServiceData } = this.props;
    return (
      <Box className="environment-container environmentlist cluster-container">
        <Box className="list-heading">
          <h3>{elementType}</h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link to={`${APP_PREFIX_PATH}/assets/environments`}>
                  Environments
                </Link>
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
              <li className="active">{elementType}</li>
            </ul>
          </Box>
        </Box>
        <Box className="tier-buttons float-right">
          <Button
            variant={
              activeTierTab === PRODUCT_CATEGORY_ENUM.THREE_TIER
                ? "contained"
                : "outlined"
            }
            className={
              activeTierTab === PRODUCT_CATEGORY_ENUM.THREE_TIER
                ? "primary-btn min-width"
                : "primary-outline-btn min-width"
            }
            onClick={() =>
              this.handleTierTabToggle(PRODUCT_CATEGORY_ENUM.THREE_TIER)
            }
          >
            3 Tier
          </Button>
          <Button
            variant={
              activeTierTab === PRODUCT_CATEGORY_ENUM.SOA
                ? "contained"
                : "outlined"
            }
            className={
              activeTierTab === PRODUCT_CATEGORY_ENUM.SOA
                ? "primary-btn min-width"
                : "primary-outline-btn min-width"
            }
            onClick={() => this.handleTierTabToggle(PRODUCT_CATEGORY_ENUM.SOA)}
          >
            SOA
          </Button>
        </Box>

        <Box className="cluster-table">
          <TableContainer component={Paper} className="access-control-table">
            {viewServiceData?.status === status.IN_PROGRESS ? (
              this.renderLoder()
            ) : (
              <Table
                sx={{ minWidth: 850 }}
                aria-label="custom pagination table"
                className="table"
              >
                {this.renderHeader()}
                {this.renderBody()}
              </Table>
            )}
          </TableContainer>
          {serviceLength > 0 ? (
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={serviceLength}
              rowsPerPage={rpg}
              page={pg}
              className="access-control-pagination"
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { viewServiceData } = state.environmentData;
  return {
    viewServiceData,
  };
}

const mapDispatchToProps = {
  getViewServiceData,
};

export default connect(mapStateToProps, mapDispatchToProps)(EcsCluster);
