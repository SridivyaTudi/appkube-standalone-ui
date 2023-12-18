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
import CreateAddPolicyControlModal from "../Components/CreateAddPolicyControlModal";
import AccordionView from "../../Components/AccordionView";
import ConfirmationPopup from "Components/ConfirmationPopup";

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
      showConfirmPopup: false,
      currentDeleteFlag: "",
    };
  }
  handleCreateAddPolicyControlModal = () => {
    this.setState({
      showCreateAddPolicyControlModal:
        !this.state.showCreateAddPolicyControlModal,
    });
  };
  // toggle confirmation popup
  togglePopup = (name) => {
    let { showConfirmPopup } = this.state;
    this.setState({
      showConfirmPopup: !showConfirmPopup,
      currentDeleteFlag: showConfirmPopup ? "" : name,
    });
  };

  render() {
    const {
      showCreateAddPolicyControlModal,
      currentDeleteFlag,
      showConfirmPopup,
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
            <Grid item xs={12} md={8} lg={6}>
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
          <Box className="setting-common-searchbar">
            <Grid container alignItems={"center"}>
              <Grid item xs={4} md={4}>
                <h4 className="m-t-0 m-b-0">Allowed Policy set</h4>
              </Grid>
              <Grid item xs={8} md={8}>
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
                      onClick={() =>
                        this.setState({
                          currentDeleteFlag: "policy",
                          showConfirmPopup: true,
                        })
                      }
                      className="danger-outline-btn min-width-inherit"
                      variant="outlined"
                    >
                      <i className="p-r-10 fas fa-trash-alt"></i>
                      Delete Policy
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={() =>
                        this.setState({
                          currentDeleteFlag: "role",
                          showConfirmPopup: true,
                        })
                      }
                      className="danger-outline-btn min-width-inherit"
                      variant="outlined"
                    >
                      <i className="p-r-10 fas fa-trash-alt"></i>
                      Delete
                    </Button>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
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
                      control={<Checkbox className="check-box" />}
                      label="Policy Name"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="setting-table">
              <AccordionView data={accessPolicyData} />
            </Box>
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

        {showConfirmPopup ? (
          <ConfirmationPopup
            showModal={showConfirmPopup}
            togglePopup={() => this.togglePopup()}
            labels={{
              btnYes: "Delete",
              header: `Do you want to delete this  ${
                currentDeleteFlag === "policy" ? "Policy" : "Role"
              } ? `,
              description: "This action can’t be undone",
              btnNo: "Cancel",
            }}
            handleCallBack={() => this.togglePopup()}
            showLoader={false}
          />
        ) : (
          <></>
        )}
      </Box>
    );
  }
}

export default SetPolicy;
