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
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import CloudTrailEventPopup from "../Components/CloudTrailEventPopup";

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
class AlarmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmList: [],
      searchedKey: "",
      selectedJson: "",
    };
  }

  componentDidMount = () => {
    let { instanceId, landingZoneId } = this.getUrlDetails();
    this.props.getAlarmList({
      instanceId,
      landingZoneId,
      elementType: "landingZone",
    });
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

  togglePopup = () => {
    let { ShowCloudTrailEventPopup, selectedJson } = this.state;
    this.setState({
      ShowCloudTrailEventPopup: !ShowCloudTrailEventPopup,
      selectedJson: ShowCloudTrailEventPopup ? null : selectedJson,
    });
  };

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
          <TableCell align="left">Name</TableCell>
          <TableCell align="center">Enabled </TableCell>
          <TableCell align="left">Arn </TableCell>
          <TableCell align="left">State </TableCell>
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
          alarmList.map((alarm) => {
            return (
              <TableRow key={v4()}>
                <TableCell align="left">
                  <Box className="d-flex align-items-center">
                    <HtmlTooltip
                      className="table-tooltip"
                      title={alarm.AlarmName}
                      onClick={() => {
                        this.setState({ selectedJson: alarm }, () => {
                          this.togglePopup();
                        });
                      }}
                    >
                      <Box className="resource-name">{alarm.AlarmName}</Box>
                    </HtmlTooltip>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    className={`tag-icon ${
                      alarm?.ActionsEnabled ? "green " : "orange"
                    } tag-status	`}
                  >
                    <i
                      className={
                        alarm?.ActionsEnabled ? "fas fa-check " : "fas fa-times"
                      }
                    ></i>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <HtmlTooltip
                    className="table-tooltip"
                    title={alarm.AlarmName}
                  >
                    {alarm?.AlarmName}{" "}
                  </HtmlTooltip>
                </TableCell>
                <TableCell align="left">{alarm?.StateValue}</TableCell>
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
    let data = this.props.alarmListData?.data || [];

    if (Array.isArray(data) && data?.length) {
      if (value) {
        alarmList = data.filter((tableData) => {
          if (
            tableData?.AlarmName?.toLowerCase().includes(value.toLowerCase()) ||
            tableData?.AlarmArn?.toLowerCase().includes(value.toLowerCase()) ||
            tableData?.StateValue?.toLowerCase().includes(value.toLowerCase())
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
    let { searchedKey, alarmList, selectedJson, ShowCloudTrailEventPopup } =
      this.state;
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
        {ShowCloudTrailEventPopup ? (
          <CloudTrailEventPopup
            showModal={ShowCloudTrailEventPopup}
            togglePopup={this.togglePopup}
            data={selectedJson}
            title="Alarm"
          />
        ) : (
          <></>
        )}
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
