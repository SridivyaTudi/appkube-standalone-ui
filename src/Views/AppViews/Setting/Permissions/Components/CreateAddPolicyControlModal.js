import {
  Box,
  Button,
  Grid,
  Checkbox,
  ListItem,
  IconButton,
} from "@mui/material/";
import { Component } from "react";
import { List, Modal, ModalBody, ModalHeader } from "reactstrap";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";

let policy = [
  {
    id: 1,
    name: "Environment",
    permissions: [
      "Create Landing Zone",
      "Edit Landing Zone",
      "Create Landing Zone",
      "Clone Landing Zone",
      "Migrate Landing Zone",
      "Delete Landing Zone",
      "Replicate Landing Zone",
    ],
  },
  {
    id: 2,
    name: "Product",
    permissions: [
      "Create Landing Zone",
      "Edit Landing Zone",
      "Create Landing Zone",
      "Clone Landing Zone",
      "Migrate Landing Zone",
      "Delete Landing Zone",
      "Replicate Landing Zone",
    ],
  },
  {
    id: 3,
    name: "SHE",
    permissions: [
      "Create Landing Zone",
      "Edit Landing Zone",
      "Create Landing Zone",
      "Clone Landing Zone",
      "Migrate Landing Zone",
      "Delete Landing Zone",
      "Replicate Landing Zone",
    ],
  },
  {
    id: 4,
    name: "DevSecOps",
    permissions: [
      "Create Landing Zone",
      "Edit Landing Zone",
      "Create Landing Zone",
      "Clone Landing Zone",
      "Migrate Landing Zone",
      "Delete Landing Zone",
      "Replicate Landing Zone",
    ],
  },
  {
    id: 5,
    name: "Full Access",
    permissions: [
      "Create Landing Zone",
      "Edit Landing Zone",
      "Create Landing Zone",
      "Clone Landing Zone",
      "Migrate Landing Zone",
      "Delete Landing Zone",
      "Replicate Landing Zone",
    ],
  },
  {
    id: 6,
    name: "Minimal Access",
    permissions: [
      "Create Landing Zone",
      "Edit Landing Zone",
      "Create Landing Zone",
      "Clone Landing Zone",
      "Migrate Landing Zone",
      "Delete Landing Zone",
      "Replicate Landing Zone",
    ],
  },
];
class CreateAddPolicyControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policies: policy,
      selectedPolicy: [],
    };
  }

  // Render modal header
  renderModalHeader = () => {
    return (
      <ModalHeader tag="div">
        <h5>
          Choose Policy
          <IconButton
            onClick={this.props.handleCreateAddPolicyControlModal}
            variant="outlined"
            aria-label="delete"
            size="small"
            className="close-btn"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </h5>
      </ModalHeader>
    );
  };

  // Render modal body
  renderModalBody = () => {
    let { searchedPolicy } = this.state;
    return (
      <ModalBody>
        <Box className="setting-common-searchbar p-t-5 p-b-0">
          <Grid container>
            <Grid item xs={12}>
              <Box className="top-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search policy"
                  value={searchedPolicy}
                  onChange={this.handleSearchChange}
                />
                <button className="button">
                  <SearchOutlinedIcon />
                </button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className="setting-common-searchbar">
          <Grid container>
            <Grid item xs={6}>
              <h5>List of Policies (5)</h5>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <Button
                    className="primary-btn min-width-inherit"
                    variant="contained"
                    onClick={this.handleCreateAddPolicyControlModal}
                  >
                    Add Policies
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
        <Box className="policy-boxs">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {this.renderPolicies()}
          </Grid>
        </Box>
      </ModalBody>
    );
  };

  //  Serach policy
  handleSearchChange = (e) => {
    let value = e.target.value;

    let { policies, searchedPolicy } = this.state;

    if (policy?.length) {
      searchedPolicy = value;

      if (value) {
        policies = policy.filter((row) => {
          if (row?.name.toLowerCase().includes(value.toLowerCase())) {
            return row;
          } else {
            return null;
          }
        });
      } else {
        policies = policy;
      }

      this.setState({ policies, searchedPolicy });
    }
  };

  // Render policies
  renderPolicies = () => {
    let { policies, selectedPolicy } = this.state;
    return policies?.length ? (
      policies.map((policy) => (
        <Grid item xs={4} key={v4()}>
          <Box className="policy-box">
            <Box className="head">
              <Box className="title">{policy.name}</Box>
              <Box className="d-inline-block">
                <Checkbox className="check-box"
                  size="small"
                  id={policy.id}
                  checked={selectedPolicy.includes(policy.id)}
                  onChange={this.handleCheckBox}
                />
              </Box>
            </Box>
            <Box className="policy-list-content">
              <Box className="title">list of permissons</Box>
              <List>
                {policy.permissions?.length ? (
                  policy.permissions.map((permisson) => (
                    <ListItem>{permisson}</ListItem>
                  ))
                ) : (
                  <></>
                )}
              </List>
            </Box>
          </Box>
        </Grid>
      ))
    ) : (
      <></>
    );
  };

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedPolicy } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedPolicy.push(+id);
    } else {
      selectedPolicy = selectedPolicy.filter((value) => value !== +id);
    }

    this.setState({ selectedPolicy });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleCreateAddPolicyControlModal}
        className="add-policy-modal-container"
      >
        {this.renderModalHeader()}
        {this.renderModalBody()}
      </Modal>
    );
  }
}

export default CreateAddPolicyControlModal;
