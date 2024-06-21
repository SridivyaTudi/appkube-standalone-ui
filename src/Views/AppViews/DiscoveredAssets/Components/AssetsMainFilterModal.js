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
  }

  manipulateDiscoveredData(data = []) {
    let { filterData } = this.state;
    let prevFilterData = this.props.discoveredAssetsFilters.data || [];

    if (data.cloudElementList?.length) {
      let acconts = [];
      let elementTypes = [];
      let enclaves = [];
      data.cloudElementList.forEach((assest) => {
        let { landingZone, elementType, productEnclaveInstanceId } = assest;

        if (landingZone && !acconts.includes(landingZone)) {
          acconts.push(landingZone);
        }

        if (elementType && !elementTypes.includes(elementType)) {
          elementTypes.push(elementType);
        }

        if (
          productEnclaveInstanceId &&
          !enclaves.includes(productEnclaveInstanceId)
        ) {
          enclaves.push(productEnclaveInstanceId);
        }
      });

      if (prevFilterData?.length) {
        prevFilterData.forEach((account) => {
          if (account.name === "accounts" && !acconts.includes(account.value)) {
            acconts.push(account.value);
          }
          if (account.name === "encalve" && !enclaves.includes(account.value)) {
            enclaves.push(account.value);
          }
          if (
            account.name === "elementType" &&
            !elementTypes.includes(account.value)
          ) {
            elementTypes.push(account.value);
          }
        });
      }

      filterData = [
        { label: "AWS Account", dropDownItems: acconts, key: "accounts" },
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
        <MenuItem value={item} key={v4()} className="select-menu">
          {item}
        </MenuItem>
      ));
    }
  };

  handleSelectboxChange = (e, index) => {
    let { selectedLog } = this.state;
    selectedLog[index] = e.target.value;
    this.setState({ selectedLog });
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
    let { selectedLog } = this.state;
    let keys = Object.keys(selectedLog);

    let filters = [];
    if (keys.length) {
      keys.forEach((key) => {
        if (selectedLog[key] !== "") {
          filters.push({
            name: key,
            value: selectedLog[key],
          });
        }
      });
    }

    this.props.setDiscoveredAssetsFilters(filters);
    this.props.togglePopup();
  };

  render() {
    let { selectedLog, filterData } = this.state;

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
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              value=""
                              style={{ fontSize: 14, color: "383874" }}
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
  const { discoveredAssetsData, discoveredAssetsFilters } =
    state.discoveredAssets;

  return { discoveredAssetsData, discoveredAssetsFilters };
}

const mapDispatchToProps = {
  setDiscoveredAssetsFilters,
  clearDiscoveredAssetsFilters,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AssetsMainFilterModal));
