import {
  Box,
  List,
  ListItem,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { setActiveTab } from "Utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CreateAddPolicyControlModal from "../Permissions/Components/CreateAddPolicyControlModal";
import DeletePolicyControlModal from "../Permissions/Components/DeletePolicyControlModal";
import DeleteRoleControlModal from "../Permissions/Components/DeleteRoleControlModal";
import { v4 } from "uuid";
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
      accessPolicy: accessPolicyData,
      selectedPolicy: [],
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

  renderAccessPolicyTable = () => {
    let { accessPolicy, selectedPolicy } = this.state;
    if (accessPolicy?.length) {
      return accessPolicy.map((policy, index) => {
        return (
          <Table key={v4()}>
            <TableHead onClick={() => this.onClickAccessPolicy(index)}>
              <TableRow>
                <TableCell align="left">
                  <span>
                    <i className="fas fa-chevron-down"></i>
                  </span>
                  <strong>{policy.name}</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedPolicy.includes(index) && policy?.chlidren?.length ? (
                this.renderAccessPolicyChild(policy.chlidren, index)
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        );
      });
    }
  };

  renderAccessPolicyChild = (data, parentIndex) => {
    let { selectedPolicy } = this.state;
    return data.map((subchild, childIndex) => {
      let currentNode = `${parentIndex}_${childIndex}`;
      return (
        <TableRow
          key={v4()}
          onClick={(e) => {
            e.stopPropagation();
            this.onClickAccessPolicy(currentNode);
          }}
        >
          <TableCell align="left">
            <span>
              <i class="fas fa-chevron-right"></i>
            </span>
            {subchild.name}
            {selectedPolicy.includes(currentNode) &&
            subchild?.chlidren?.length ? (
              this.renderAccessPolicyChild(subchild?.chlidren, currentNode)
            ) : (
              <></>
            )}
          </TableCell>
        </TableRow>
      );
    });
  };

  onClickAccessPolicy = (currentNode) => {
    let { selectedPolicy } = this.state;
    let isExistNode = selectedPolicy.filter((policy) => policy === currentNode);

    if (isExistNode.length) {
      selectedPolicy = selectedPolicy.filter(
        (policy) => policy !== currentNode
      );
    } else {
      selectedPolicy.push(currentNode);
    }

    this.setState({ selectedPolicy });
  };

  render() {
    const { showCreateAddPolicyControlModal, showDeletePolicyControlModal, showDeleteRoleControlModal } =
      this.state;
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
                    <Button onClick={this.handleDeleteRoleControlModal}
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
              <TableContainer className="table">
                {this.renderAccessPolicyTable()}
              </TableContainer>
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
