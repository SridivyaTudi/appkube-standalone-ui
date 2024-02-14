import React, { Component } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import AssetsMainFilterModal from "../Components/AssetsMainFilterModal";
class AssetsFilterSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAssetsMainFilterModal: false,
    };
  }

  togglePopup = () => {
    this.setState({
      showAssetsMainFilterModal: !this.state.showAssetsMainFilterModal,
    });
  };

  //  Render applied filters
  renderAppliedFilters = () => {
    let filterData = this.props.data;
    return (
      <Box className="add-filters">
        {filterData?.length ? (
          filterData.map((filter, index) => {
            return (
              <Box className="filter-box" key={v4()}>
                <Box className="d-flex  align-items-center m-r-3">
                  <label>{filter.name} &#58; </label>
                  <span> {filter.value} </span>
                </Box>
                <CloseIcon
                  fontSize="inherit"
                  className="close-btn"
                  onClick={() => this.onClickCloseIcon(index)}
                />
              </Box>
            );
          })
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
  render() {
    const { showAssetsMainFilterModal } = this.state;
    return (
      <Box className="head-top-section">
        <Button
          onClick={this.togglePopup}
          className="primary-outline-btn min-width"
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
        {showAssetsMainFilterModal ? (
          <AssetsMainFilterModal
            showModal={showAssetsMainFilterModal}
            togglePopup={this.togglePopup}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default AssetsFilterSection;
