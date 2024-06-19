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
  { label: "Regions", dropDownItems: [], key: "regions" },
  { label: "AWS Account", dropDownItems: [] },
  { label: "Product Enclave", dropDownItems: [] },
  { label: "Element Type", dropDownItems: [] },
  { label: "App/Data", dropDownItems: [] },
  { label: "Resource Type", dropDownItems: [] },
  { label: "Node", dropDownItems: [] },
  { label: "Tags", dropDownItems: [] },
  { label: "Resource State", dropDownItems: [] },
  { label: "Data Source", dropDownItems: [] },
  { label: "Service", dropDownItems: [] },
];
// let data = [
//   {
//     label: "Region",
//     values: [
//       "China (Hong Kong)",
//       "East US",
//       "East US 2",
//       "France Central",
//       "Germany West Central",
//       "India (Mumbai)",
//       "Indonesia ( Jakarta)",
//     ],
//   },
//   {
//     label: "AWS Account",
//     values: [
//       "AWS (657907747554)",
//       "AWS (657907747551)",
//       "AWS (657907747552)",
//       "AWS (657907747553)",
//       "AWS (65790774755)",
//     ],
//   },
//   {
//     label: "Product Enclave",
//     values: ["8 VPC", "8 VPC", "5 VPC", "4 VPC", "3 VPC"],
//   },
//   {
//     label: "Element Type",
//     values: ["EC2", "Lambda", "EKS", "ECS", "DynameDB", "Redshift"],
//   },
//   {
//     label: "App/Data",
//     values: ["App", "Data", "Both"],
//   },
//   {
//     label: "Resource Type",
//     values: [
//       "API Request",
//       "Bucket",
//       "Business Analytics",
//       "CF Stack (Cluster)",
//       "Compute",
//       "Data Transfer",
//       "Dev Stand (IT Environment)",
//       "Encryption",
//       "IP Address",
//       "Instance",
//       "KB Pod",
//     ],
//   },
//   {
//     label: "Node",
//     values: ["Orchid-Staging"],
//   },
//   {
//     label: "Tags",
//     values: [
//       "Seed",
//       "app",
//       "app_kubernetes_to_component",
//       "app_kubernetes_to_managed_by",
//       "app_kubernetes_to_name",
//       "app_kubernetes_to_part_of",
//       "app_kubernetes_to_version",
//       "aqa",
//       "aqa_tag",
//       "aqa_uuid",
//     ],
//   },
//   {
//     label: "Resource State",
//     values: ["Billing Only", "Active"],
//   },
//   {
//     label: "Data Source",
//     values: [
//       "AWS HQ",
//       "AWS Marketing",
//       "All dev",
//       "Azure QA",
//       "Dev Environment",
//       "GCP dev",
//       "K8s dev",
//     ],
//   },
//   {
//     label: "Service",
//     values: [
//       "AWS",
//       "AWSCloudTrail",
//       "AWSCostExplorer",
//       "AWSELB",
//       "AWSCloudWatch",
//       "AmazonEc2",
//       "AmazonEKS",
//       "AmazonKinesis",
//       "AmazonQuickSight",
//       "AmazonRDS",
//     ],
//   },
// ];

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

  andleSelectboxChange = (event, index) => {
    const {
      target: { value },
    } = event;
    let { selectedPolicy } = this.state;

    selectedPolicy[index] = value;
    this.setState({ selectedPolicy });
  };

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
          {/* <Checkbox
            className="check-box"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          /> */}
          {policy.label}
        </MenuItem>
      ));
    }
  };

  handleSelectboxChange = (e, index) => {
    let { selectedLog } = this.state;
    selectedLog[index] = e.target.value;
    console.log(selectedLog);
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
                            {/* <Box className="dropdown-select-menu"> */}
                            {this.renderData(filter?.dropDownItems || [])}
                            {/* </Box> */}
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
