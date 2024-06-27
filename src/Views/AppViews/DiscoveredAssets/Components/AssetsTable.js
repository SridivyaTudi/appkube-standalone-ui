import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  ListItem,
  List,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import AssetsSetUpModal from "./AssetsSetUpModal";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Loader from "Components/Loader";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { navigateRouter } from "Utils/Navigate/navigateRouter";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
class AssetsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAssetsSetUpModal: false,
      isSelectDepartmentOpen: -1,
      pg: 1,
      rpg: 10,
      anchorEl: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps?.activeTab !== this.props?.activeTab ||
      prevProps?.data !== this.props?.data
    ) {
      this.setState({ pg: 1, rpg: 10 });
    }
  }
  toggleAssetsSetUp = () => {
    this.setState({
      showAssetsSetUpModal: !this.state.showAssetsSetUpModal,
    });
  };

  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 p-t-20 p-b-20">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  };

  //  Render table
  renderTable = () => {
    let { data: assestData, totalRecords } = this.props;

    let { rpg, pg } = this.state;

    return this.props.loderStatus ? (
      this.renderLoder()
    ) : (
      <>
        <TableContainer className="table">
          <Table style={{ minWidth: 1320 }}>
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="end" alignItems="center" m={2}>
          {assestData?.length ? (
            <>
              <span className="m-r-3">Rows per page: </span>
              <FormControl variant="outlined" size="small">
                <Select
                  id="rows-per-page"
                  className="m-r-3"
                  value={rpg}
                  onChange={this.handleChangeRowsPerPage}
                >
                  {[10, 20, 50, 100].map((rowsPerPageOption) => (
                    <MenuItem key={rowsPerPageOption} value={rowsPerPageOption}>
                      {rowsPerPageOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Pagination
                selected={pg}
                count={Math.ceil(totalRecords / rpg)}
                onChange={this.handleChangePage}
                variant="outlined"
                shape="rounded"
                page={pg}
                className="access-control-pagination"
              />
            </>
          ) : (
            <></>
          )}
        </Box>
      </>
    );
  };

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">Resource Name</TableCell>
          <TableCell align="left">Element Type</TableCell>
          <TableCell align="left">Landing Zone</TableCell>
          <TableCell align="left">Product Enclave</TableCell>
          <TableCell align="center">Tag Status</TableCell>
          <TableCell align="center">Log</TableCell>
          <TableCell align="center">Event</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  handleMenuToggle = (envKey) => {
    const { tagShowMenu } = this.state;
    if (tagShowMenu) {
      this.setState({ tagShowMenu: null });
    } else {
      this.setState({ tagShowMenu: envKey });
    }
  };

  handleMenuListToggle = (envKey) => {
    const { tagShowMenuList } = this.state;
    if (tagShowMenuList) {
      this.setState({ tagShowMenuList: null });
    } else {
      this.setState({ tagShowMenuList: envKey });
    }
  };

  toggleSelectDepartment = (index, isStatus = 0, anchorEl) => {
    let { isSelectDepartmentOpen, isSelectStatusOpen } = this.state;
    if (isStatus) {
      isSelectStatusOpen = index;
    } else {
      isSelectDepartmentOpen = index;
    }
    this.setState({
      isSelectDepartmentOpen,
      isSelectStatusOpen,
      anchorEl,
    });
  };

  //  Render table body
  renderTableBody = () => {
    const { isSelectStatusOpen, rpg, pg } = this.state;

    let { data = [], errorMessage } = this.props;

    return (
      <TableBody>
        {data?.length ? (
          data
            .slice((pg - 1) * rpg, (pg - 1) * rpg + rpg)
            .map((environment, index) => {
              let {
                name,
                elementType,
                landingZone,
                productEnclave,
                isLogEnabled,
                isTagged,
                instanceId,
                landingZoneId,
                cloud,
              } = environment;
              return (
                <TableRow key={index}>
                  <TableCell align="left">
                    <HtmlTooltip className="table-tooltip" title={name}>
                      <Box className="resource-name">{name}</Box>
                    </HtmlTooltip>
                  </TableCell>
                  <TableCell align="left">{elementType}</TableCell>
                  <TableCell align="left">
                    <HtmlTooltip className="table-tooltip" title={landingZone}>
                      <Box className="resource-name">{landingZone}</Box>
                    </HtmlTooltip>
                  </TableCell>
                  <TableCell align="left">
                    <HtmlTooltip
                      className="table-tooltip"
                      title={productEnclave}
                    >
                      <Box className="resource-name">{productEnclave}</Box>
                    </HtmlTooltip>{" "}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      className={`tag-icon ${
                        isTagged ? "tag " : "orange"
                      } tag-status	`}
                    >
                      <i
                        className={isTagged ? "fas fa-tag " : "fas fa-times"}
                        onClick={() => this.toggleSelectDepartment(index, 1)}
                      ></i>
                      {isSelectStatusOpen === index && !isTagged && (
                        <div
                          className={
                            isSelectStatusOpen === index
                              ? "fliter-collapse active"
                              : "fliter-collapse"
                          }
                        >
                          <List menu-list>
                            <ListItem
                              onClick={() =>
                                this.props.navigate(
                                  `${APP_PREFIX_PATH}/assets/environments/associatechartapp?landingZone=${landingZone}&cloudName=${cloud}&landingZoneId=${landingZoneId}&elementType=${elementType}&instanceId=${instanceId}`
                                )
                              }
                            >
                              <i className="fa-solid fa-circle-dot"></i> Tag
                            </ListItem>
                          </List>
                        </div>
                      )}
                      <div
                        className={
                          isSelectStatusOpen === index
                            ? "fliters-collapse-bg active"
                            : "fliters-collapse-bg"
                        }
                        onClick={() => this.toggleSelectDepartment(null, 1)}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      className={`tag-icon ${
                        isLogEnabled ? "log-eye-icon" : "orange"
                      } log-status`}
                      onClick={this.toggleAssetsSetUp}
                    >
                      <i
                        className={isLogEnabled ? "fas fa-eye" : "fas fa-times"}
                      ></i>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      className={`tag-icon green log-status`}
                      onClick={() =>
                        this.props.navigate(
                          `${APP_PREFIX_PATH}/assets/discovered-assets/events-history/${
                            environment?.instanceId
                          }/${environment?.landingZoneId || 0}`
                        )
                      }
                    >
                      <i className={"fas fa-check"}></i>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">
                    {errorMessage || "There are no data available."}
                  </h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10), pg: 1 });
  };

  renderDropDownData = () => {
    return ["Set Up"].map((data, index) => {
      return (
        <MenuItem key={index}>
          <i className="fa-solid fa-circle-dot"></i>
          {data}
        </MenuItem>
      );
    });
  };

  render() {
    const { showAssetsSetUpModal } = this.state;
    return (
      <>
        <Box className="assets-table">{this.renderTable()}</Box>
        {showAssetsSetUpModal ? (
          <AssetsSetUpModal
            showModal={showAssetsSetUpModal}
            toggleAssetsSetUp={this.toggleAssetsSetUp}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default navigateRouter(AssetsTable);
