import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  IconButton,
  Checkbox,
} from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import { getCurrentUser } from "Utils";
import { v4 } from "uuid";
import Loader from "Components/Loader";
let dropDownData = [
  {
    name: "eu-east-1",
    value: "2",
  },
  {
    name: "eu-west-2",
    value: "3",
  },
  {
    name: "ap-south-1",
    value: "4",
  },
  {
    name: "ap-south-2",
    value: "5",
  },
];

let dropDowns = [
  "Select Regions",
  "Select VPCs",
  "Select Tagname",
  "Select Accounts",
  "Select Products",
];
class SelectFilterModal extends Component {
  user = { id: "", username: "" };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      isSubmit: false,
      policyList: [],
      selectedPolicy: {},
    };
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      this.user = userDetails;
    }
  }

  //Set state on  input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  h;
  andleSelectboxChange = (event, index) => {
    const {
      target: { value },
    } = event;
    let { selectedPolicy } = this.state;

    selectedPolicy[index] = value;
    this.setState({ selectedPolicy });
  };

  //  Reset state and close modal
  handleCloseModal = () => {
    this.setState({
      name: "",
      description: "",
      isSubmit: false,
      selectedPolicy: [],
    });
    this.props.handleSelectFilterModal();
  };

  renderPolicies = () => {
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

  // Get selected policy
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
  // Render loder
  renderLoder = () => {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  };

  render() {
    let { selectedPolicy } = this.state;
    const errors = {};

    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="setting-modal-container permissions-modal"
      >
        <ModalHeader tag="div">
          <h5>
            Filter
            <IconButton
              onClick={this.handleCloseModal}
              variant="outlined"
              aria-label="delete"
              size="small"
              className="close-btn"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </h5>
        </ModalHeader>
        {0 ? (
          this.renderLoder()
        ) : (
          <form onSubmit={this.handleRoleSubmit}>
            <ModalBody>
              {dropDowns.map((filter, index) => {
                return (
                  <Box className="form-group" key={v4()}>
                    <FormControl className="select-policy">
                      <Select
                        labelId="demo-multiple-name-label"
                        multiple
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>{filter}</em>;
                          }
                          let labels = [];
                          dropDownData.forEach((policy) => {
                            if (selected.includes(policy.value)) {
                              labels.push(policy.name);
                            }
                          });
                          return labels.join(", ");
                        }}
                        value={selectedPolicy[index] || []}
                        // onChange={(e) => this.handleSelectboxChange(e, index)}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <Box className="dropdown-select-menu">
                          {this.renderPolicies()}
                        </Box>
                      </Select>
                    </FormControl>
                    {errors.policy ? (
                      <span className="red">{errors.policy}</span>
                    ) : (
                      <></>
                    )}
                  </Box>
                );
              })}
            </ModalBody>

            <ModalFooter className="footer-top-br">
              <Box className="d-block text-right">
                <LoadingButton
                  className="danger-btn min-width-inherit m-r-2"
                  variant="outlined"
                  onClick={this.handleCloseModal}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  className="primary-btn min-width"
                  variant="contained"
                  onClick={this.handleCloseModal}
                >
                  Apply
                </LoadingButton>
              </Box>
            </ModalFooter>
          </form>
        )}
      </Modal>
    );
  }
}

export default SelectFilterModal;
