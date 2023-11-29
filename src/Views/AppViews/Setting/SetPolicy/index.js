import {
  Box,
  List,
  ListItem,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";
import { setActiveTab } from "Utils";
import CreateAddPolicyControlModal from "../Permissions/Components/CreateAddPolicyControlModal";
import DeletePolicyControlModal from "../Permissions/Components/DeletePolicyControlModal";
import DeleteRoleControlModal from "../Permissions/Components/DeleteRoleControlModal";
import AccordionView from "../Components/AccordionView";

let accessPolicyData = [
  {
    name: "ALL ACCESS",
    chlidren: [
      {
        name: "Environment",
        chlidren: [
          {
            name: "Create Landing Zone",
          },
          {
            name: "Clone Landing Zone",
          },
          {
            name: "Delete Landing Zone",
          },
          { name: "Create Product Enclave" },
          { name: "Edit Product Enclave" },
        ],
      },
      {
        name: "Product",
        chlidren: [
          { name: "Create Landing Zone" },
          { name: "Clone Landing Zone" },
          { name: "Delete Landing Zone" },
          { name: "Create Product Enclave" },
          { name: "Edit Product Enclave" },
        ],
      },
      {
        name: "SRE",
        chlidren: [
          { name: "Create Landing Zone" },
          { name: "Clone Landing Zone" },
          { name: "Delete Landing Zone" },
          { name: "Create Product Enclave" },
          { name: "Edit Product Enclave" },
        ],
      },
      {
        name: "DevSecOps",
        chlidren: [
          { name: "Create Landing Zone" },
          { name: "Clone Landing Zone" },
          { name: "Delete Landing Zone" },
          { name: "Create Product Enclave" },
        ],
      },
    ],
  },
];
class SetPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateAddPolicyControlModal: false,
      showDeletePolicyControlModal: false,
      showDeleteRoleControlModal: false,
    };
  }
  handleCreateAddPolicyControlModal = () => {
    this.setState({
      showCreateAddPolicyControlModal:
        !this.state.showCreateAddPolicyControlModal,
    });
  };
  handleDeletePolicyControlModal = () => {
    this.setState({
      showDeletePolicyControlModal: !this.state.showDeletePolicyControlModal,
    });
  };

  handleDeleteRoleControlModal = () => {
    this.setState({
      showDeleteRoleControlModal: !this.state.showDeleteRoleControlModal,
    });
  };

  render() {
    const {
      showCreateAddPolicyControlModal,
      showDeletePolicyControlModal,
      showDeleteRoleControlModal,
    } = this.state;
    return (
      <Box className="set-policy-container">
        <Box className="list-heading">
          <h3>Administrator View Policy </h3>
          <Box className="breadcrumbs">
            <ul>
              <li>
                <Link
                  to={`/app/setting`}
                  onClick={() => setActiveTab("permissions")}
                >
                  Users and Permissions{" "}
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Set Policy</li>
            </ul>
          </Box>
        </Box>
        <Box className="overview-section">
          <Grid
            container
            rowSpacing={1}
            className="h-100"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Box className="overview-card">
                <h5>Overview</h5>
                <p>
                  The super admin is the highest level of administrative
                  authority within a system or platform, possessing unparalleled
                  control and access to all features, settings, and user data
                  Super admins hold the key to managing and overseeing the
                  entire infrastructure, making critical decisions, and
                  implementing security measures to protect the system from
                  unauthorized access and potential breaches.
                </p>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="policy-section">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <h4>Allowed Policy set</h4>
            </Grid>
            <Grid item xs={6}>
              <Box className="overview-buttons">
                <List>
                  <ListItem>
                    <Button
                      className="primary-btn min-width-inherit"
                      variant="contained"
                      onClick={this.handleCreateAddPolicyControlModal}
                    >
                      Add Policy
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={this.handleDeletePolicyControlModal}
                      className="danger-outline-btn min-width-inherit"
                      variant="outlined"
                    >
                      <i className="p-r-10 fas fa-trash-alt"></i>
                      Delete
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={this.handleDeleteRoleControlModal}
                      className="danger-outline-btn min-width-inherit"
                      variant="outlined"
                    >
                      <i className="p-r-10 fas fa-trash-alt"></i>
                      Delete Role
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>

          <Box className="policy-permission">
            <Box className="policy-permission-head">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <Box className="title">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Policy Name"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <div className="environment-table">
              <AccordionView data={accessPolicyData} />
            </div>
          </Box>
        </Box>
        {showCreateAddPolicyControlModal ? (
          <CreateAddPolicyControlModal
            showModal={showCreateAddPolicyControlModal}
            handleCreateAddPolicyControlModal={
              this.handleCreateAddPolicyControlModal
            }
          />
        ) : (
          <></>
        )}
        {showDeletePolicyControlModal ? (
          <DeletePolicyControlModal
            showModal={showDeletePolicyControlModal}
            handleDeletePolicyControlModal={this.handleDeletePolicyControlModal}
          />
        ) : (
          <></>
        )}
        {showDeleteRoleControlModal ? (
          <DeleteRoleControlModal
            showModal={showDeleteRoleControlModal}
            handleDeleteRoleControlModal={this.handleDeleteRoleControlModal}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default SetPolicy;
