import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";

class Conditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayThresoldData: true,
      displayRelativeData: false,
      displayDadmanData: false,
      isComparisionDropDownOpen: false,
      isTimeSeriesDropDownOpen: false,
      selectedDropDowns: {
        timeSeries: '',
        comparision: '',
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataFromAlertType !== this.props.dataFromAlertType) {
      console.log(this.props.dataFromAlertType);
    }
  }
  toggleComparisionAction = () => {
    this.setState({
      isComparisionDropDownOpen: !this.state.isComparisionDropDownOpen,
    });
  };

  toggleTimeSeriesAction = () => {
    this.setState({
      isTimeSeriesDropDownOpen: !this.state.isTimeSeriesDropDownOpen,
    });
  };

  renderDropDownData = (isTimeSeriesData = 1) => {
    let {
      selectedDropDowns: { timeSeries, comparision },
    } = this.state;

    let data = isTimeSeriesData
      ? ["Query Ok", "Query Fail"]
      : ["Greater than", "Less than", "Equal to"];

    return data.map((data, index) => {
      let activeClass = isTimeSeriesData
        ? (timeSeries === data && "active") || ""
        : (comparision === data && "active") || "";
      return (
        <ListItem
          key={index}
          onClick={() => this.onClickDropDown(isTimeSeriesData, data)}
          className={activeClass}
        >
          <i className="fa-solid fa-circle-dot"></i>
          {data}
        </ListItem>
      );
    });
  };

  onClickDropDown = (isTimeSeriesData, data) => {
    let {
      selectedDropDowns: { timeSeries, comparision },
    } = this.state;

    if (isTimeSeriesData) {
      timeSeries = data;
    } else {
      comparision = data;
    }

    this.setState({ selectedDropDowns: { timeSeries, comparision } });
  };

  onChangeAlertType = (alertType) => {
    if (alertType === "Threshold") {
      this.setState({
        displayThresoldData: true,
        displayRelativeData: true,
        displayDadmanData: false,
      });
    } else if (alertType === "Relative") {
      this.setState({
        displayThresoldData: false,
        displayRelativeData: true,
        displayDadmanData: false,
      });
    } else if (alertType === "Availability") {
      this.setState({
        displayThresoldData: false,
        displayRelativeData: false,
        displayDadmanData: true,
      });
    }
  };

  thresoldCondition() {
    let {
      isComparisionDropDownOpen,
      isTimeSeriesDropDownOpen,
      selectedDropDowns: { timeSeries, comparision },
    } = this.state;
    let thresoldData = (
      <Box className="condition-header">
        <Box className="send-alert-text">
          Conditions{" "}
          {/* <span className="time-series-text">Select a Time-Series</span> is */}
        </Box>
        <Box className="mapping-fliter m-r-2">
          <Box
            className="fliter-toggel p-l-15 p-r-15"
            onClick={this.toggleTimeSeriesAction}
          >
            {timeSeries || "Select time series"}
            <i className="fas fa-angle-down"></i>
          </Box>
          {isTimeSeriesDropDownOpen && (
            <div
              className={
                isTimeSeriesDropDownOpen
                  ? "fliter-collapse active"
                  : "fliter-collapse"
              }
            >
              <List>{this.renderDropDownData()}</List>
            </div>
          )}

          <div
            className={
              isTimeSeriesDropDownOpen
                ? "fliters-collapse-bg active"
                : "fliters-collapse-bg"
            }
            onClick={this.toggleTimeSeriesAction}
          />
        </Box>

        <label className="m-r-2 d-inline-block">is</label>
        <Box className="mapping-fliter">
          <Box
            className="fliter-toggel p-l-15 p-r-15"
            onClick={this.toggleComparisionAction}
          >
            {comparision || "greater than"}
            <i className="fas fa-angle-down"></i>
          </Box>
          {isComparisionDropDownOpen && (
            <div
              className={
                isComparisionDropDownOpen
                  ? "fliter-collapse active"
                  : "fliter-collapse"
              }
            >
              <List>{this.renderDropDownData(0)}</List>
            </div>
          )}

          <div
            className={
              isComparisionDropDownOpen
                ? "fliters-collapse-bg active"
                : "fliters-collapse-bg"
            }
            onClick={this.toggleComparisionAction}
          />
        </Box>
        <Box className="greater-search">
          <input type="text" />
        </Box>
      </Box>
    );
    return thresoldData;
  }

  relativeCondition() {
    let relativeData = (
      <Box className="condition-header">
        <Box className="send-alert-text">Send Alert when</Box>
        <Box className="greater-select">
          <select>
            <option>Change</option>
            <option>% Change</option>
          </select>
          <Box className="send-alert-text">Compare to previous</Box>
          <select>
            <option>1m</option>
            <option>5m</option>
            <option>10m</option>
            <option>30m</option>
            <option>1h</option>
            <option>2h</option>
            <option>24h</option>
          </select>
          <Box>is</Box>
          <select>
            <option>Greater than</option>
            <option>equal to or greater</option>
            <option>equal to or less than</option>
            <option>less than</option>
            <option>equal to</option>
            <option>not equal to</option>
            <option>inside range</option>
            <option>outside range</option>
          </select>
        </Box>

        <Box className="greater-search">
          <input type="text" placeholder="placeholder" />
        </Box>
      </Box>
    );
    return relativeData;
  }

  dadmanCondition() {
    let dadmanData = (
      <Box className="condition-header">
        <Box className="send-alert-text">Send Alert if Data is missing for</Box>
        <Box className="greater-select">
          <select>
            <option>1m</option>
            <option>5m</option>
            <option>10m</option>
            <option>30m</option>
            <option>1h</option>
            <option>2h</option>
            <option>24h</option>
          </select>
        </Box>
      </Box>
    );
    return dadmanData;
  }
  render() {
    const { displayThresoldData, displayRelativeData, displayDadmanData } =
      this.state;
    return (
      <>
        <Box className="alert-details">
          <Box className="alert-detail-head">
            <label>Conditions</label>
            <Button
              className="primary-btn min-width"
              variant="contained"
              disabled
            >
              Save Rule
            </Button>
          </Box>
          <Box className="alert-details-description">
            <Box className="condition-box">
              {displayThresoldData ? this.thresoldCondition() : null}
              {displayRelativeData ? this.relativeCondition() : null}
              {displayDadmanData ? this.dadmanCondition() : null}
              <Box className="time-series-preview-box">
                {/* <ConditionsChart /> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

export default Conditions;
