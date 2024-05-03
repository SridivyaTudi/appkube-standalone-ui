import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Grid,
  List,
  ListItem,
  Checkbox,
  IconButton,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import { v4, validate } from "uuid";

let data = [
  {
    dropDownData: [
      {
        label: "Landing Zone",
        values: [
          { name: "AWS (657907747554)", value: 1 },
          { name: "AWS (657907747554)", value: 2 },
          { name: "AWS (657907747554)", value: 3 },
          { name: "AWS (657907747554)", value: 4 },
          { name: "AWS (657907747554)", value: 5 },
        ],
      },
      {
        label: "Product Enclave",
        values: [
          { name: "8 VPC", value: 1 },
          { name: "8 VPC", value: 2 },
          { name: "8 VPC", value: 3 },
          { name: "8 VPC", value: 4 },
          { name: "5 VPC", value: 5 },
        ],
      },
      {
        label: "Elements",
        values: [
          { name: "EC2", value: 11 },
          { name: "Lambda", value: 2 },
          { name: "EKS", value: 3 },
          { name: "DynamoDB", value: 4 },
          { name: "Redshift", value: 5 },
        ],
      },
    ],
    title: "Infra",
  },

  {
    dropDownData: [
      {
        label: "Department",
        values: [
          { name: "HR", value: 11 },
          { name: "Finance", value: 21 },
          { name: "Procurement", value: 31 },
          { name: "Inventory Department", value: 41 },
        ],
      },
      {
        label: "Product",
        values: [{ name: "HRMS", value: 1 }],
      },
      {
        label: "Environment",
        values: [{ name: "Development", value: 1 }],
      },
      {
        label: "Module",
        values: [
          { name: "Payroll Management", value: 1 },
          { name: "Leave Management", value: 2 },
          { name: "Onboarding Management", value: 3 },
        ],
      },
      {
        label: "Services Type",
        values: [{ name: "Development", value: 1 }],
      },
      {
        label: "Services",
        values: [{ name: "Development", value: 1 }],
      },
      {
        label: "Product Type",
        values: [{ name: "Development", value: 1 }],
      },
    ],
    title: "Business/Common Services",
  },
  {
    dropDownData: [
      {
        label: "Severity",
        values: [
          { name: "Low", value: 1 },
          { name: "Medium", value: 12 },
        ],
      },
      {
        label: "Alert State",
        values: [
          { name: "New Generated", value: 1 },
          { name: "In process", value: 2 },
        ],
      },
      {
        label: "Alert type",
        values: [{ name: "CPU percentage", value: 1 }],
      },
    ],
    title: "Filters",
  },
];

class AlertMainFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddNewEnvironmentShown: false,
      openDropDownId: -1,
      selectedData: {},
    };
  }

  toggleDropDown = (e, id) => {
    let { isDropDownShown, openDropDownId } = this.state;
    this.setState({
      isDropDownShown:
        openDropDownId === id ? false : !this.state.isDropDownShown,
      openDropDownId: isDropDownShown ? -1 : id,
    });
  };

  renderAddNewEnvironmentList = (environmentTypeData) => {
    return environmentTypeData?.length ? (
      environmentTypeData.map((value) => {
        return (
          <ListItem>
            <Checkbox
              className="check-box"
              size="small"
              onChange={(e) => {
                // this.handleCheckBox(e);
              }}
            />
            <p>{value}</p>
          </ListItem>
        );
      })
    ) : (
      <></>
    );
  };

  renderDropDowns = (dropDownData = [], title) => {
    const { isDropDownShown, openDropDownId } = this.state;
    return dropDownData?.length ? (
      dropDownData.map((fillterData, index) => {
        return (
          <Grid item xs={12} sm={6} md={6} lg={4} key={v4()}>
            <Box className="environment-fliter">
              <Box
                className="fliter-toggel new-environment"
                onClick={(e) => this.toggleDropDown(e, `${title}_${index}`)}
              >
                {fillterData.label}
                <i class="fas fa-angle-down arrow-icon"></i>
              </Box>
              {openDropDownId === `${title}_${index}` ? (
                <Box
                  className={
                    isDropDownShown
                      ? "fliter-collapse active"
                      : "fliter-collapse"
                  }
                >
                  <List>
                    {this.renderAddNewEnvironmentList(fillterData.values)}
                  </List>
                </Box>
              ) : (
                <></>
              )}

              <div
                className={
                  isDropDownShown
                    ? "fliters-collapse-bg active"
                    : "fliters-collapse-bg"
                }
                onClick={(e) => this.toggleDropDown(e, `${title}_${index}`)}
              />
            </Box>
          </Grid>
        );
      })
    ) : (
      <></>
    );
  };

  renderPolicies = (data, title) => {
    if (data.length) {
      return data.map((policy) => (
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

  handleSelectboxChange = (value, index) => {
    let { selectedData } = this.state;
    selectedData[index] = value;
    console.log(selectedData);
    this.setState({ selectedData });
  };
  render() {
    let { selectedData } = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.togglePopup}
        className="assets-fillter-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
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
          {data?.length ? (
            data.map((details, outerIndex) => {
              return (
                <Box sx={{ width: "100%" }} className="p-r-5">
                  <h5>{details.title}</h5>
                  <Grid
                    className="m-t-2"
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    {/* {this.renderDropDowns(details.dropDownData, details.title)} */}
                    {details.dropDownData?.length ? (
                      details.dropDownData.map((data, index) => {
                        return (
                          <Grid item xs={12} sm={6} md={6} lg={4} key={v4()}>
                            <Box className="form-group">
                              <FormControl className="select-policy">
                                <Select
                                  labelId="demo-multiple-name-label"
                                  displayEmpty
                                  value={
                                    selectedData[
                                      `${details.title}_${outerIndex}_${index}`
                                    ] || ""
                                  }
                                  onChange={(e) =>
                                    this.handleSelectboxChange(
                                      e.target.value,
                                      `${details.title}_${outerIndex}_${index}`
                                    )
                                  }
                                >
                                  <MenuItem
                                    value=""
                                    style={{ fontSize: 14, color: "383874" }}
                                  >
                                    {data.label}
                                  </MenuItem>
                                  <Box className="dropdown-select-menu">
                                    {this.renderPolicies(data.values)}
                                  </Box>
                                </Select>
                              </FormControl>
                            </Box>
                          </Grid>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Box>
              );
            })
          ) : (
            <></>
          )}
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

export default AlertMainFilterModal;
