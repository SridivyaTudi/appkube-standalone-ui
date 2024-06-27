import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Grid,
  IconButton,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import status from "Redux/Constants/CommonDS";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { connect } from "react-redux";
import Loader from "Components/Loader";
import {
  clearDiscoveredAssetsFilters,
  setDiscoveredAssetsFilters,
} from "Redux/DiscoveredAssets/DiscoveredAssetsSlice";
import { getDiscoveredAssets } from "Redux/DiscoveredAssets/DiscoveredAssetsThunk";
import { getCurrentOrgId } from "Utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

let dropDowns = [
  { label: "AWS Account", dropDownItems: [], key: "accounts" },
  { label: "Product Enclave", dropDownItems: [], key: "encalve" },
  { label: "Element Type", dropDownItems: [], key: "elementType" },
];

class AssetsMainFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddNewEnvironmentShown: false,
      selectedLog: {},
      filterData: dropDowns,
      isAssestsAPICall: false,
    };
  }

  componentDidMount() {
    let filterData = this.props.discoveredAssetsFilters.data || [];
    let { selectedLog } = this.state;

    if (filterData?.length) {
      filterData.forEach((assest) => {
        selectedLog[assest.name] = assest.value;
      });
    }

    this.manipulateDiscoveredData(this.props.discoveredAssetsData?.data);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.discoveredAssetsData.status !==
        this.props.discoveredAssetsData.status &&
      this.props.discoveredAssetsData.status === status.SUCCESS &&
      this.props.discoveredAssetsData?.data
    ) {
      this.manipulateDiscoveredData(this.props.discoveredAssetsData?.data);
    }

    if (
      prevProps.discoveredAssetsFilters.data !==
      this.props.discoveredAssetsFilters?.data
    ) {
      const discoveredData = this.props.discoveredAssetsData?.data || [];
      this.manipulateDiscoveredData(discoveredData);
    }

    if (
      prevProps.landingZoneSearchData.status !==
        this.props.landingZoneSearchData.status &&
      this.props.landingZoneSearchData.status === status.SUCCESS &&
      this.props.landingZoneSearchData?.data
    ) {
      let landingZoneSearchData = this.props.landingZoneSearchData?.data || [];

      if (landingZoneSearchData?.length) {
        let { filterData } = this.state;
        filterData = filterData.map((filter) => {
          if (filter.key === "accounts") {
            filter["dropDownItems"] = landingZoneSearchData.map(
              (landingZoneData) => {
                let { id, landingZone } = landingZoneData;
                return { value: id, label: landingZone };
              }
            );
          }
          return filter;
        });

        this.setState({ filterData });
      }
    }
  }

  manipulateDiscoveredData(data = []) {
    let { filterData } = this.state;

    if (data.cloudElementList?.length) {
      let elementTypes = [];
      let uniqueElementTypes = [];

      let uniqueEnclaves = [];
      let enclaves = [];

      data.cloudElementList.forEach((assest) => {
        let { elementType, productEnclaveInstanceId } = assest;

        if (elementType && !uniqueElementTypes.includes(elementType)) {
          elementTypes.push({ label: elementType, value: elementType });
          uniqueElementTypes.push(elementType);
        }

        if (
          productEnclaveInstanceId &&
          !uniqueEnclaves.includes(productEnclaveInstanceId)
        ) {
          enclaves.push({
            label: productEnclaveInstanceId,
            value: productEnclaveInstanceId,
          });
          uniqueEnclaves.push(productEnclaveInstanceId);
        }
      });

      let landingZoneSearchData = this.props.landingZoneSearchData?.data || [];
      filterData = [
        {
          label: "AWS Account",
          dropDownItems: landingZoneSearchData.map((landingZoneData) => {
            let { id, landingZone } = landingZoneData;
            return { value: id, label: landingZone };
          }),
          key: "accounts",
        },
        { label: "Product Enclave", dropDownItems: enclaves, key: "encalve" },
        {
          label: "Element Type",
          dropDownItems: elementTypes,
          key: "elementType",
        },
      ];
    }

    this.setState({ filterData });
  }

  handleCloseModal = () => {
    this.setState({
      name: "",
      description: "",
      isSubmit: false,
      selectedPolicy: [],
    });
    this.props.handleSelectFilterModal();
  };

  renderData = (data) => {
    if (data.length) {
      return data.map((item) => (
        <MenuItem value={item.value} key={v4()} className="select-menu">
          {item.label}
        </MenuItem>
      ));
    }
  };

  handleSelectboxChange = (e, index) => {
    let { selectedLog, isAssestsAPICall } = this.state;
    let filterData = this.props.discoveredAssetsFilters.data || [];
    filterData = filterData.filter((data) => data.name === "accounts");

    if (index === "accounts" && filterData?.[0]?.["value"] !== e.target.value) {
      this.props.setDiscoveredAssetsFilters(filterData);
      selectedLog = { accounts: e.target.value };
      isAssestsAPICall = true;
    } else {
      selectedLog[index] = e.target.value;
      isAssestsAPICall = false;
    }

    this.setState({ selectedLog, isAssestsAPICall });
  };

  // Render Loder
  renderLoder(widthClass) {
    return (
      <Box className="filter-loder">
        <Loader />
      </Box>
    );
  }

  onClickSubmitBtn = () => {
    let { selectedLog, isAssestsAPICall } = this.state;
    let keys = Object.keys(selectedLog);

    let filters = [];
    if (keys.length) {
      keys.forEach((key) => {
        if (selectedLog[key] !== "") {
          if (selectedLog?.accounts) {
            let landingZoneSearchData =
              this.props.landingZoneSearchData?.data || [];
            filters.push({
              name: key,
              value: selectedLog[key],
              label: landingZoneSearchData.find(
                (landingZoneSearch) => landingZoneSearch.id === selectedLog[key]
              )?.landingZone,
            });
          } else {
            filters.push({
              name: key,
              value: selectedLog[key],
            });
          }
        }
      });
      if (isAssestsAPICall) {
        const orgId = getCurrentOrgId();
        this.props.getDiscoveredAssets({
          orgId,
          filterFlag: this.props.flag,
          landingZoneId: selectedLog?.accounts,
        });
      }
    }

    this.props.setDiscoveredAssetsFilters(filters);
    this.props.togglePopup();
  };

  render() {
    let { selectedLog, filterData, isAssestsAPICall } = this.state;

    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.togglePopup}
        className="assets-fillter-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
            Log Setup for 95dse45ss{" "}
            <IconButton
              onClick={this.props.togglePopup}
              variant="outlined"
              aria-label="delete"
              size="small"
              className="close-btn"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </h5>
        </ModalHeader>
        <ModalBody>
          <Box sx={{ width: "100%" }} className="p-r-5">
            {this.props.discoveredAssetsData.status === status.IN_PROGRESS ? (
              this.renderLoder()
            ) : (
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                {filterData.map((filter, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      className="p-t-10"
                      key={v4()}
                    >
                      <Box className="form-group">
                        <FormControl className="select-policy">
                          <Select
                            value={selectedLog[filter.key] || ""}
                            displayEmpty
                            onChange={(e) => {
                              this.handleSelectboxChange(e, filter.key);
                            }}
                            disabled={
                              filter.key !== "accounts" && isAssestsAPICall
                            }
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              value=""
                              style={{ fontSize: 14, color: "383874" }}
                              disabled={
                                filter.key === "accounts" || isAssestsAPICall
                              }
                            >
                              Select {filter.label}
                            </MenuItem>

                            {this.renderData(filter?.dropDownItems || [])}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br m-t-3">
          <Box className="d-block text-center">
            <LoadingButton
              className="danger-btn min-width-inherit m-r-2"
              variant="contained"
              onClick={() => {
                this.props.togglePopup();
                this.props.clearDiscoveredAssetsFilters();
              }}
            >
              Clear
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width-inherit "
              variant="contained"
              onClick={this.onClickSubmitBtn}
            >
              Submit
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  const {
    discoveredAssetsData,
    discoveredAssetsFilters,
    landingZoneSearchData,
  } = state.discoveredAssets;

  return {
    discoveredAssetsData,
    discoveredAssetsFilters,
    landingZoneSearchData,
  };
}

const mapDispatchToProps = {
  setDiscoveredAssetsFilters,
  clearDiscoveredAssetsFilters,
  getDiscoveredAssets,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AssetsMainFilterModal));
