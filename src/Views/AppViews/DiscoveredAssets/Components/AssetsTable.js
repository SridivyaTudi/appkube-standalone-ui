import React, { Component } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  ListItem,
  List,
} from "@mui/material";
import { v4 } from "uuid";
import AssetsSetUpModal from "./AssetsSetUpModal";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
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
      pg: 0,
      rpg: 10,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps?.activeTab !== this.props?.activeTab) {
      this.setState({ pg: 0, rpg: 10 });
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
        {assestData?.length ? (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={totalRecords || 0}
            rowsPerPage={rpg}
            page={pg}
            className="access-control-pagination"
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        ) : (
          <></>
        )}
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
          <TableCell align="center">Trace</TableCell>
          <TableCell align="center">Event</TableCell>
          <TableCell align="center">Actions</TableCell>
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
  toggleSelectDepartment = (index, isStatus = 0) => {
    let { isSelectDepartmentOpen, isSelectStatusOpen } = this.state;
    if (isStatus) {
      isSelectStatusOpen = index;
    } else {
      isSelectDepartmentOpen = index;
    }
    this.setState({
      isSelectDepartmentOpen,
      isSelectStatusOpen,
    });
  };

  //  Render table body
  renderTableBody = () => {
    const { isSelectDepartmentOpen, isSelectStatusOpen, rpg } = this.state;

    let { data = [], errorMessage } = this.props;

    return (
      <TableBody>
        {data.length ? (
          data.slice(0, rpg).map((environment, index) => {
            let {
              name,
              elementType,
              landingZone,
              productEnclave,
              tagStatusClass,
              logClass,
              traceClass,
              eventClass,
              isEventEnabled,
              isLogEnabled,
              isTagged,
              isTraceEnabled,
            } = environment;
            tagStatusClass = false;
            return (
              <TableRow key={v4()}>
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
                  {" "}
                  <HtmlTooltip className="table-tooltip" title={productEnclave}>
                    <Box className="resource-name">{productEnclave}</Box>
                  </HtmlTooltip>{" "}
                </TableCell>
                <TableCell align="center">
                  <Box
                    className={`${
                      isTagged ? "tag " : "setting-icon"
                    } tag-status	`}
                  >
                    <i
                      className={isTagged ? "fas fa-tag " : "fas fa-cog "}
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
                          <ListItem>
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
                    {/* {tagShowMenu === index ? (
                        <>
                          <div
                            className="open-create-menu-close"
                            onClick={(e) => {
                              this.handleMenuToggle(index);
                            }}
                          ></div>
                          <Box className="menu-list">
                            <List>
                              <ListItem>
                                <span></span>Tag
                              </ListItem>
                            </List>
                          </Box>
                        </>
                      ) : (
                        <></>
                      )} */}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    className={isLogEnabled ? "log-eye-icon" : "setting-icon"}
                    onClick={this.toggleAssetsSetUp}
                  >
                    <i
                      className={isLogEnabled ? "fas fa-eye" : "fa-solid fa-eye-slash" }
                    ></i>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <span className={isTraceEnabled ? "green" : "orange"}>
                    <i
                      className={isTraceEnabled ?  "fas fa-check" :"fas fa-times"}
                    ></i>
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span className={isEventEnabled ? "green" : "orange"}>
                    <i
                      className={isEventEnabled ?  "fas fa-check": "fas fa-times"}
                    ></i>
                  </span>
                </TableCell>
                <TableCell align="center">
                  <Box className="tag-status">
                    <button
                      type="button"
                      className="list-icon"
                      onClick={() => this.toggleSelectDepartment(index)}
                    >
                      <i className="fas fa-ellipsis-v"></i>
                    </button>
                    {isSelectDepartmentOpen === index && (
                      <div
                        className={
                          isSelectDepartmentOpen === index
                            ? "fliter-collapse active"
                            : "fliter-collapse"
                        }
                      >
                        <List menu-list>
                          <ListItem>
                            <i className="fa-solid fa-circle-dot"></i> Set Up
                          </ListItem>
                        </List>
                      </div>
                    )}
                    <div
                      className={
                        isSelectDepartmentOpen === index
                          ? "fliters-collapse-bg active"
                          : "fliters-collapse-bg"
                      }
                      onClick={() => this.toggleSelectDepartment(null)}
                    />
                    {/* {tagShowMenuList === index ? (
                        <>
                          <div
                            className="open-create-menu-close"
                            onClick={(e) => {
                              this.handleMenuListToggle(index);
                            }}
                          ></div>
                          <Box className="menu-list">
                            <List>
                              <ListItem>Set Up</ListItem>
                            </List>
                          </Box>
                        </>
                      ) : (
                        <></>
                      )}
                      <div
                        className={
                          tagShowMenuList
                            ? "fliters-collapse-bg active"
                            : "fliters-collapse-bg"
                        }
                        onClick={this.handleMenuListToggle}
                      /> */}
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
    let { rpg } = this.state;
    this.setState({ pg: newpage });

    try {
      this.props.handleChangePage({ pageNo: newpage, pageSize: rpg });
    } catch (error) {
      console.error(error);
    }
  };

  handleChangeRowsPerPage = (event) => {
    let newRpg = parseInt(event.target.value, 10);

    this.setState({ rpg: newRpg }, () => {
      let { pg, rpg } = this.state;

      try {
        this.props.handleChangePage({ pageNo: pg, pageSize: rpg });
      } catch (error) {
        console.error(error);
      }
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

export default AssetsTable;
