import React, { Component } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import AssetsMainFilterModal from "../Components/AssetsMainFilterModal";
import FilterPopup from "Views/AppViews/DiscoveredAssets/Components/FilterPopup";
import { connect } from "react-redux";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import {
  clearDiscoveredAssetsFilters,
  setDiscoveredAssetsFilters,
} from "Redux/DiscoveredAssets/DiscoveredAssetsSlice";
const LABELS = {
  accounts: "Account",
  encalve: "Product Enclave",
  elementType: "Element Type",
};

class AssetsFilterSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAssetsMainFilterModal: false,
      noOfRow: 0,
      currentWidthRange: window.innerWidth,
      showFilterPopup: false,
    };
  }

  componentDidMount() {
    if (
      this.props.flag === "all" &&
      this.props.discoveredAssetsFilters?.data?.length === 0
    ) {
      this.setState({ showAssetsMainFilterModal: true });
    }
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
      noOfRow = 5;
    } else if (width >= 1290 && width < 1500) {
      noOfRow = 3;
    } else if (width >= 1100 && width < 1120) {
      noOfRow = 2;
    } else if (width >= 1100 && width < 1290) {
      noOfRow = 3;
    } else if (width >= 882 && width < 1100) {
      noOfRow = 1;
    } else if (width >= 660 && width < 882) {
      noOfRow = 1;
    } else {
      noOfRow = 0;
    }
    this.setState({ noOfRow });
  };

  togglePopup = () => {
    this.setState({
      showAssetsMainFilterModal: !this.state.showAssetsMainFilterModal,
    });
  };

  toggleFilterPopup = () => {
    this.setState({
      showFilterPopup: !this.state.showFilterPopup,
    });
  };

  //  Render applied filters
  renderAppliedFilters = () => {
    let filterData = this.props.discoveredAssetsFilters.data || [];
    let { noOfRow } = this.state;

    return (
      <Box className="add-filters">
        {filterData?.length ? (
          <>
            {filterData.slice(0, noOfRow).map((filter, index) => {
              return (
                <Box className="filter-box" key={v4()}>
                  <Box className="d-flex  align-items-center m-r-3">
                    <label>{LABELS[filter.name]} &#58; </label>
                    <span className="p-l-5">
                      {filter.label || filter.value}
                    </span>
                  </Box>
                  {filter.name !== "accounts" ? (
                    <CloseIcon
                      fontSize="inherit"
                      className="close-btn"
                      style={{ cursor: "pointer" }}
                      onClick={() => this.onClickCloseIcon(filter.name)}
                    />
                  ) : (
                    <></>
                  )}
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

  onClickCloseIcon = (name) => {
    try {
      let filterData = JSON.parse(
        JSON.stringify(this.props.discoveredAssetsFilters.data || [])
      );

      this.props.setDiscoveredAssetsFilters(
        filterData.filter((assest) => assest.name !== name)
      );
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

  render() {
    const { showAssetsMainFilterModal, showFilterPopup, noOfRow } = this.state;
    let filterData = this.props.discoveredAssetsFilters.data || [];
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
        </Box>
        {filterData.length !== 1 ? (
          <Box
            className="clear-filter-box"
            onClick={() => this.props.clearDiscoveredAssetsFilters()}
          >
            <label>Clear Filter</label>
            <DeleteForeverIcon fontSize="inherit" className="delete-btn" />
          </Box>
        ) : (
          <></>
        )}

        {showAssetsMainFilterModal ? (
          <AssetsMainFilterModal
            showModal={showAssetsMainFilterModal}
            togglePopup={this.togglePopup}
            flag={this.props.flag}
          />
        ) : (
          <></>
        )}

        {showFilterPopup ? (
          <FilterPopup
            showModal={showFilterPopup}
            togglePopup={this.toggleFilterPopup}
            data={filterData?.slice(noOfRow) || []}
            onClickCloseIcon={(id) => this.props.onClickCloseIcon(id)}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}
function mapStateToProps(state) {
  const { discoveredAssetsFilters } = state.discoveredAssets;

  return { discoveredAssetsFilters };
}

const mapDispatchToProps = {
  clearDiscoveredAssetsFilters,
  setDiscoveredAssetsFilters,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AssetsFilterSection));
