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
import { getAlarmList } from "Redux/DiscoveredAssets/DiscoveredAssetsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import { API_ERROR_MESSAGE, NO_DATA_FOUND } from "CommonData";
import Loader from "Components/Loader";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Link } from "react-router-dom";

class AlarmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmList: [],
      searchedKey: "",
    };
  }

  componentDidMount = () => {
    let { instanceId, landingZoneId, elementType } = this.getUrlDetails();
    this.props.getAlarmList({ instanceId, landingZoneId, elementType });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.alarmListData.status !== this.props.alarmListData.status &&
      this.props.alarmListData.status === status.SUCCESS &&
      this.props.alarmListData?.data
    ) {
      const alarmList = this.props.alarmListData?.data || [];
      this.setState({ alarmList });
    }
  }

  getUrlDetails() {
    let instanceId = this.props.params?.instanceId;
    let landingZoneId = this.props.params?.landingZoneId;
    let elementType = this.props.params?.elementType;

    return { instanceId, landingZoneId, elementType };
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
    let { alarmList } = this.state;
    return (
      <TableBody>
        {alarmList?.length ? (
          alarmList.map((event) => {
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

                    <Link>{event?.EventName}</Link>
                  </Box>
                </TableCell>
                <TableCell align="left">{event?.EventTime}</TableCell>
                <TableCell align="left">{event?.Username}</TableCell>
                <TableCell align="left">{event?.EventSource}</TableCell>

                <TableCell align="left">{}</TableCell>
              </TableRow>
            );
          })
        ) : (
          <Box className="d-blck text-center w-100 h-100 ">
            <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
              <h5 className="m-t-0 m-b-0">
                {" "}
                {this.props.alarmListData.status === status.FAILURE
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
    let { alarmList } = this.state;
    let data = this.props.alarmListData?.data?.Events || [];

    if (Array.isArray(data) && data?.length) {
      if (value) {
        alarmList = data.filter((tableData) => {
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
        alarmList = data;
      }
      this.setState({ alarmList, searchedKey: value });
    }
  };

  render() {
    let loder = this.props.alarmListData.status === status.IN_PROGRESS;
    let { searchedKey, alarmList } = this.state;
    return (
      <Box className="discovered-assets-container">
        <Box className="assets-heading">
          <h3 className="m-b-0">Alarms</h3>
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
            Alarm List <span>({alarmList?.length})</span>
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
        </Box>
        <Box className="assets-table">
          {loder ? this.renderLoder() : this.renderTable()}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { alarmListData } = state.discoveredAssets;

  return { alarmListData };
}

const mapDispatchToProps = { getAlarmList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AlarmList));
