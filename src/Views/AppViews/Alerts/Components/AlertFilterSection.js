import React, { Component } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button, List, ListItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import AlertMainFilterModal from "../Components/AlertMainFilterModal";
import FilterPopup from "Views/AppViews/DiscoveredAssets/Components/FilterPopup";
import { GRANULARITY_DROPDOWN_DATA, GRANULARITY_TYPE } from "CommonData";
class AlertFilterSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlertMainFilterModal: false,
      noOfRow: 0,
      currentWidthRange: window.innerWidth,
      showFilterPopup: false,
    };
  }

  componentDidMount() {
    this.handleResizeFun();
    window.addEventListener("resize", this.handleResizeFun, true);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResizeFun);
  }

  handleResizeFun = () => {
    const width = window.innerWidth;
    let noOfRow;

    if (width > 1400) {
      noOfRow = 4;
    } else if (width >= 1290 && width < 1500) {
      noOfRow = 3;
    } else if (width >= 1100 && width < 1120) {
      noOfRow = 2;
    } else if (width >= 1100 && width < 1290) {
      noOfRow = 3;
    } else if (width >= 882 && width < 1100) {
      noOfRow = 2;
    } else if (width >= 660 && width < 882) {
      noOfRow = 1;
    } else {
      noOfRow = 0;
    }
    this.setState({ noOfRow });
  };
  togglePopup = () => {
    this.setState({
      showAlertMainFilterModal: !this.state.showAlertMainFilterModal,
    });
  };

  toggleFilterPopup = () => {
    this.setState({
      showFilterPopup: !this.state.showFilterPopup,
    });
  };

  //  Render applied filters
  renderAppliedFilters = () => {
    let filterData = this.props.data;
    let { noOfRow } = this.state;

    return (
      <Box className="add-filters">
        {filterData?.length ? (
          <>
            {filterData.slice(0, noOfRow).map((filter, index) => {
              return (
                <Box className="filter-box" key={v4()}>
                  <Box className="d-flex  align-items-center m-r-3">
                    <label>{filter.name} &#58; </label>
                    <span className="p-l-5"> {filter.value} </span>
                  </Box>
                  <CloseIcon
                    fontSize="inherit"
                    className="close-btn"
                    onClick={() => this.onClickCloseIcon(index)}
                  />
                </Box>
              );
            })}
            {filterData.length > noOfRow ? (
              this.renderNextCountForRemainingfilter(
                filterData.length - noOfRow
              )
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Box>
    );
  };

  onClickCloseIcon = (id) => {
    try {
      this.props.onClickCloseIcon(id);
    } catch (e) {
      console.error(e);
    }
  };

  onClickClearFilter = () => {
    try {
      this.props.onClickClearFilter();
    } catch (e) {
      console.error(e);
    }
  };

  renderNextCountForRemainingfilter = (count) => {
    return (
      <Box
        className="filter-box"
        onClick={() => {
          this.setState({
            showFilterPopup: true,
          });
        }}
      >
        <Box className="d-flex  align-items-center m-r-3">
          <label>More &#58; </label> <span className="p-l-5"> +{count} </span>
        </Box>
      </Box>
    );
  };
  toggleGranularity = () => {
    this.setState({
      isGranularityDropDownOpen: !this.state.isGranularityDropDownOpen,
    });
  };
  getSelectedGranularity = () => {
    let { selectedGranularity } = this.state;
    let findValue = GRANULARITY_DROPDOWN_DATA.find(
      (data) => data.key === selectedGranularity
    );

    return findValue?.value || "";
  };

  renderDropDownData = () => {
    let { selectedGranularity } = this.state;
    return GRANULARITY_DROPDOWN_DATA.map((data) => {
      return (
        <ListItem
          onClick={() => this.onClickDropDown(data.key)}
          key={v4()}
          className={`${data.key === selectedGranularity ? "active" : ""}`}
        >
          <i className="fa-solid fa-circle-dot"></i>
          {data.value}
        </ListItem>
      );
    });
  };

  render() {
    const {
      showAlertMainFilterModal,
      showFilterPopup,
      noOfRow,
      isGranularityDropDownOpen,
    } = this.state;
    let filterData = this.props.data;
    return (
      <Box className="head-top-section">
        <Box className="d-flex align-items-center">
          <Button
            onClick={this.togglePopup}
            className="primary-outline-btn min-width m-r-3"
            variant="outlined"
          >
            Filters
          </Button>
          {this.renderAppliedFilters()}
          <Box
            className="clear-filter-box"
            onClick={() => this.onClickClearFilter()}
          >
            <label>Clear Filter</label>
            <DeleteForeverIcon fontSize="inherit" className="delete-btn" />
          </Box>
        </Box>
        <Box className="fliter-button">
          <Button
            className="primary-outline-btn min-width p-l-15 p-r-15" variant="outlined"
            onClick={this.toggleGranularity}
          >
            Timeframe:
            <i className="fas fa-chevron-down p-l-10"></i>
            {/* {this.getSelectedGranularity()} */}
          </Button>
          {isGranularityDropDownOpen && (
            <div
              className={
                isGranularityDropDownOpen
                  ? "fliter-collapse active"
                  : "fliter-collapse"
              }
            >
              <List>{this.renderDropDownData()}</List>
            </div>
          )}

          <div
            className={
              isGranularityDropDownOpen
                ? "fliters-collapse-bg active"
                : "fliters-collapse-bg"
            }
            onClick={this.toggleGranularity}
          />
        </Box>

        {showAlertMainFilterModal ? (
          <AlertMainFilterModal
            showModal={showAlertMainFilterModal}
            togglePopup={this.togglePopup}
          />
        ) : (
          <></>
        )}

        {showFilterPopup ? (
          <FilterPopup
            showModal={showFilterPopup}
            togglePopup={this.toggleFilterPopup}
            data={filterData.slice(noOfRow)}
            onClickCloseIcon={(id) => this.props.onClickCloseIcon(id)}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default AlertFilterSection;
