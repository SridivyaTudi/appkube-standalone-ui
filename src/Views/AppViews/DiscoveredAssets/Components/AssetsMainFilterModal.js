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

let dropDownData = [
  {
    name: "China (Hong Kong)",
    value: "2",
  },
  {
    name: "East US",
    value: "3",
  },
  {
    name: "East US 2",
    value: "4",
  },
  {
    name: "France Central",
    value: "5",
  },
  {
    name: "Germany West Central",
    value: "6",
  },
  {
    name: "India (Mumbai)",
    value: "7",
  },
  {
    name: "Indonesia ( Jakarta)",
    value: "8",
  },
];

let dropDowns = [
  "Regions",
  "AWS Account",
  "Product Enclave",
  "Element Type",
  "App/Data",
  "Resource Type",
  "Node",
  "Tags",
  "Resource State",
  "Data Source",
  "Service",
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
    };
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

  getSelectedPolicies = (policies) => {
    let selectedPolicy = [];
    if (policies.length) {
      let { policyList } = this.state;
      policies.forEach((value) => {
        let isExist = false;

        for (let index = 0; index < policyList.length; index++) {
          const element = policyList[index];
          if (element.id === value.id) {
            isExist = true;
          }
        }

        if (isExist) {
          selectedPolicy.push(value.id);
        }
      });
    }
    return selectedPolicy;
  };

  renderData = () => {
    if (dropDownData.length) {
      return dropDownData.map((policy) => (
        <MenuItem value={policy.value} key={v4()} className="select-menu">
          <Checkbox
            className="check-box"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
          {policy.name}
        </MenuItem>
      ));
    }
  };

  // toggleAddNewEnvironmentMenu = (e, id) => {
  //   let { isAddNewEnvironmentShown } = this.state;
  //   this.setState({
  //     isAddNewEnvironmentShown: !this.state.isAddNewEnvironmentShown,
  //     openDropDownId: isAddNewEnvironmentShown ? -1 : id,
  //   });
  // };

  // renderAddNewEnvironmentList = (environmentTypeData) => {
  //   return environmentTypeData?.length ? (
  //     environmentTypeData.map((value) => {
  //       return (
  //         <ListItem>
  //           <Checkbox
  //             className="check-box"
  //             size="small"
  //             onChange={(e) => {
  //               // this.handleCheckBox(e);
  //             }}
  //           />
  //           <p>{value}</p>
  //         </ListItem>
  //       );
  //     })
  //   ) : (
  //     <></>
  //   );
  // };

  // renderDropDowns = () => {
  //   const { isAddNewEnvironmentShown, openDropDownId } = this.state;
  //   return data.length ? (
  //     data.map((fillterData, index) => {
  //       return (
  //         <Grid item xs={12} sm={6} md={6} lg={4} key={v4()}>
  //           <Box className="environment-fliter">
  //             <Box
  //               className="fliter-toggel new-environment"
  //               onClick={(e) => this.toggleAddNewEnvironmentMenu(e, index)}
  //             >
  //               {fillterData.label}
  //               <i class="fas fa-angle-down arrow-icon"></i>
  //             </Box>
  //             {openDropDownId === index ? (
  //               <Box
  //                 className={
  //                   isAddNewEnvironmentShown
  //                     ? "fliter-collapse active"
  //                     : "fliter-collapse"
  //                 }
  //               >
  //                 <List>
  //                   {this.renderAddNewEnvironmentList(fillterData.values)}
  //                 </List>
  //               </Box>
  //             ) : (
  //               <></>
  //             )}

  //             <div
  //               className={
  //                 isAddNewEnvironmentShown
  //                   ? "fliters-collapse-bg active"
  //                   : "fliters-collapse-bg"
  //               }
  //               onClick={(e) => this.toggleAddNewEnvironmentMenu(e, index)}
  //             />
  //           </Box>
  //         </Grid>
  //       );
  //     })
  //   ) : (
  //     <></>
  //   );
  // };

  handleSelectboxChange = (value, index) => {
    let { selectedLog } = this.state;
    selectedLog[index] = value;
    this.setState({ selectedLog });
  };

  render() {
    let { selectedLog } = this.state;
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
          {/* <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              {this.renderDropDowns()}
            </Grid>
          </Box> */}

          <Box sx={{ width: "100%" }} className="p-r-5">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              {" "}
              {dropDowns.map((filter, index) => {
                return (
                  <Grid item xs={12} sm={6} md={6} lg={4} className="p-t-10">
                    <Box className="form-group" key={v4()}>
                      <FormControl className="select-policy">
                        <Select
                          value={selectedLog[`${filter}_${index}`] || ""}
                          displayEmpty
                          onChange={(e) =>
                            this.handleSelectboxChange(
                              e.target.value,
                              `${filter}_${index}`
                            )
                          }
                        >
                          <MenuItem
                            value=""
                            style={{ fontSize: 14, color: "383874" }}
                          >
                            {dropDowns[index]}
                          </MenuItem>
                          <Box className="dropdown-select-menu">
                            {this.renderData()}
                          </Box>
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

export default AssetsMainFilterModal;
