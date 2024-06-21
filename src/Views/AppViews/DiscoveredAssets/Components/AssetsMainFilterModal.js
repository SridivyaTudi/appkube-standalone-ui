import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Grid,
  List,
  ListItem,
  Checkbox,
  IconButton,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import { getAwsRegions } from "Redux/DiscoveredAssets/DiscoveredAssetsThunk";
import status from "Redux/Constants/CommonDS";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { connect } from "react-redux";
import Loader from "Components/Loader";
import { Height } from "@mui/icons-material";

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
  { label: "AWS Account", dropDownItems: [] },
  { label: "Product Enclave", dropDownItems: [] },
  { label: "Element Type", dropDownItems: [] },
];

class AssetsMainFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddNewEnvironmentShown: false,
      openDropDownId: -1,
      policyList: [],
      selectedLog: {},
      filterData: dropDowns,
    };
  }

  componentDidMount() {
    this.props.getAwsRegions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.awsRegionsData.status !== this.props.awsRegionsData.status &&
      this.props.awsRegionsData.status === status.SUCCESS &&
      this.props.awsRegionsData?.data
    ) {
      let awsRegionsData = this.props.awsRegionsData?.data || [];
      let { filterData } = this.state;
      filterData = filterData.map((region) => {
        if (region.key === "regions") {
          region["dropDownItems"] = awsRegionsData.map((item) => {
            return { label: item, value: item };
          });
        }
        return region;
      });
      this.setState({ filterData });
    }
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
      return data.map((policy) => (
        <MenuItem value={policy.value} key={v4()} className="select-menu">
          {policy.label}
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

  render() {
    let { selectedLog, filterData } = this.state;
    const errors = {};
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
            {this.props.awsRegionsData.status === status.IN_PROGRESS ? (
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
                            value={selectedLog[`${filter.key}_${index}`] || ""}
                            displayEmpty
                            onChange={(e) => {
                              console.log(e);
                              this.handleSelectboxChange(
                                e,
                                `${filter.key}_${index}`
                              );
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
                        {errors.policy ? (
                          <span className="red">{errors.policy}</span>
                        ) : (
                          <></>
                        )}
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
              onClick={this.props.handleAssetsMainFilterModal}
            >
              Clear
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width-inherit "
              variant="contained"
              onClick={this.props.togglePopup}
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
  const { awsRegionsData } = state.discoveredAssets;

  return { awsRegionsData };
}

const mapDispatchToProps = { getAwsRegions };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AssetsMainFilterModal));
