import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Grid,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { v4 } from "uuid";
import { getEventsHistory } from "Redux/DiscoveredAssets/DiscoveredAssetsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { API_ERROR_MESSAGE, NO_DATA_FOUND } from "CommonData";
import Loader from "Components/Loader";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import CloudTrailEventPopup from "../Components/CloudTrailEventPopup";

class EventHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventHistories: [],
      searchedKey: "",
      ShowCloudTrailEventPopup: false,
      selectedCloudTrailEvents: null,
    };
  }

  componentDidMount = () => {
    let { instanceId, landingZoneId } = this.getUrlDetails();
    this.props.getEventsHistory({ instanceId, landingZoneId });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.eventHistoryData.status !==
        this.props.eventHistoryData.status &&
      this.props.eventHistoryData.status === status.SUCCESS &&
      this.props.eventHistoryData?.data
    ) {
      const eventHistories = this.props.eventHistoryData?.data?.Events || [];
      this.setState({ eventHistories });
    }
  }

  getUrlDetails() {
    let instanceId = this.props.params?.instanceId;
    let landingZoneId = this.props.params?.landingZoneId;

    return { instanceId, landingZoneId };
  }

  //  Render table
  renderTable = () => {
    return (
      <TableContainer className="table">
        <Table style={{ minWidth: 1000 }}>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  };

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">
            <Checkbox
              className="check-box"
              size="small"
              //id={index}
              onChange={this.handleCheckBox}
              //checked={selectedService.includes(index)}
            />
            Event name
          </TableCell>
          <TableCell align="left">Event time</TableCell>
          <TableCell align="left">User name</TableCell>
          <TableCell align="left">Event source</TableCell>
          {/* <TableCell align="left">Resources</TableCell> */}
          <TableCell align="left">Resource name</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { eventHistories } = this.state;
    return (
      <TableBody>
        {eventHistories?.length ? (
          eventHistories.map((event) => {
            let resourceNames = "";
            if (event?.Resources?.length) {
              resourceNames = event.Resources.map(
                (resource) => resource?.ResourceName
              ).join(",");
            }

            return (
              <TableRow key={v4()}>
                <TableCell align="left">
                  <Box className="d-flex align-items-center">
                    <Checkbox
                      className="check-box"
                      size="small"
                      //id={index}
                      onChange={this.handleCheckBox}
                      //checked={selectedService.includes(index)}
                    />

                    <Link
                      onClick={() => {
                        this.setState(
                          {
                            selectedCloudTrailEvents: JSON.parse(
                              event.CloudTrailEvent
                            ),
                          },
                          () => {
                            this.togglePopup();
                          }
                        );
                      }}
                    >
                      {event?.EventName}
                    </Link>
                  </Box>
                </TableCell>
                <TableCell align="left">{event?.EventTime}</TableCell>
                <TableCell align="left">{event?.Username}</TableCell>
                <TableCell align="left">{event?.EventSource}</TableCell>
                {/* <TableCell align="left">{event?.resources}</TableCell> */}
                <TableCell align="left">{resourceNames}</TableCell>
              </TableRow>
            );
          })
        ) : (
          <Box className="d-blck text-center w-100 h-100 ">
            <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
              <h5 className="m-t-0 m-b-0">
                {" "}
                {this.props.eventHistoryData.status === status.FAILURE
                  ? API_ERROR_MESSAGE
                  : NO_DATA_FOUND}{" "}
              </h5>
            </Box>
          </Box>
        )}
      </TableBody>
    );
  };

  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 p-t-20 p-b-20">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  };

  handleSearchChange = (e) => {
    let value = e.target.value;
    let { eventHistories } = this.state;
    let data = this.props.eventHistoryData?.data?.Events || [];

    if (Array.isArray(data) && data?.length) {
      if (value) {
        eventHistories = data.filter((tableData) => {
          if (
            tableData?.EventName?.toLowerCase().includes(value.toLowerCase()) ||
            tableData?.EventTime?.toLowerCase().includes(value.toLowerCase()) ||
            tableData?.Username?.toLowerCase().includes(value.toLowerCase()) ||
            tableData?.EventSource?.toLowerCase().includes(value.toLowerCase())
          ) {
            return tableData;
          } else {
            return null;
          }
        });
      } else {
        eventHistories = data;
      }
      this.setState({ eventHistories, searchedKey: value });
    }
  };

  togglePopup = () => {
    let { ShowCloudTrailEventPopup, selectedCloudTrailEvents } = this.state;
    this.setState({
      ShowCloudTrailEventPopup: !ShowCloudTrailEventPopup,
      selectedCloudTrailEvents: ShowCloudTrailEventPopup
        ? null
        : selectedCloudTrailEvents,
    });
  };
  render() {
    let loder = this.props.eventHistoryData.status === status.IN_PROGRESS;
    let {
      searchedKey,
      eventHistories,
      ShowCloudTrailEventPopup,
      selectedCloudTrailEvents,
    } = this.state;
    return (
      <Box className="discovered-assets-container">
        <Box className="assets-heading">
          <h3 className="m-b-0">ASSETS MANAGEMENT</h3>
          <Button
            className="primary-btn min-width-inherit"
            type="button"
            variant="contained"
            onClick={() =>
              this.props.navigate(`${APP_PREFIX_PATH}/assets/discovered-assets`)
            }
          >
            Back
          </Button>
        </Box>
        <Box className="global-services-fliter">
          <Box className="heading">
            Event history <span>({eventHistories?.length})</span>
          </Box>
        </Box>
        <Box className="d-flex width-100 search-box">
          <Box className="search">
            <input
              type="text"
              className="input"
              placeholder="AWS:EC2:Instance"
              value={searchedKey}
              onChange={this.handleSearchChange}
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
          <Button className="primary-btn min-width">Filter</Button>
        </Box>
        <Box className="assets-table">
          {loder ? this.renderLoder() : this.renderTable()}
        </Box>
        <Box className="width-100 m-t-3">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <Box className="d-block text-center">
                <LoadingButton
                  className={`primary-btn min-width-inherit  m-r-3`}
                  variant="contained"
                >
                  Set Up
                </LoadingButton>
              </Box>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>

        {ShowCloudTrailEventPopup ? (
          <CloudTrailEventPopup
            showModal={ShowCloudTrailEventPopup}
            togglePopup={this.togglePopup}
            data={selectedCloudTrailEvents}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { eventHistoryData } = state.discoveredAssets;

  return { eventHistoryData };
}

const mapDispatchToProps = { getEventsHistory };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(EventHistory));
