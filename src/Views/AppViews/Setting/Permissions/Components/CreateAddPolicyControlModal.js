import { Box, Button, Grid, Checkbox, ListItem } from "@mui/material/";
import { Component } from "react";
import { List, Modal, ModalBody, ModalHeader } from "reactstrap";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

class CreateAddPolicyControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleCreateAddPolicyControlModal}
        className="add-policy-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
            Choose Policy
            <button onClick={this.props.handleCreateAddPolicyControlModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </h5>
        </ModalHeader>
        <ModalBody>
          <Box className="top-search">
            <input
              type="text"
              className="form-control"
              placeholder="Search policy"
            />
            <button className="button">
              <SearchOutlinedIcon />
            </button>
          </Box>
          <Box className="policy-list p-t-10 p-b-10">
            <h5>List of Policies (5)</h5>
            <Button
              className="primary-btn min-width-inherit"
              variant="contained"
              onClick={this.handleCreateAddPolicyControlModal}
            >
              Add Policies
            </Button>
          </Box>
          <Box className="policy-boxs">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={4}>
                <Box className="policy-box">
                  <Box className="head">
                    <Box className="title">Environment</Box>
                    <Box className="d-inline-block">
                      <Checkbox size="small" />
                    </Box>
                  </Box>
                  <Box className="policy-list-content">
                    <Box className="title">list of permissons</Box>
                    <List>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Edit Landing Zone</ListItem>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Clone Landing Zone</ListItem>
                      <ListItem>Migrate Landing Zone</ListItem>
                      <ListItem>Delete Landing Zone</ListItem>
                      <ListItem>Replicate Landing Zone</ListItem>
                    </List>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="policy-box">
                  <Box className="head">
                    <Box className="title">Product</Box>
                    <Box className="d-inline-block">
                      <Checkbox size="small" />
                    </Box>
                  </Box>
                  <Box className="policy-list-content">
                    <Box className="title">list of permissons</Box>
                    <List>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Edit Landing Zone</ListItem>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Clone Landing Zone</ListItem>
                      <ListItem>Migrate Landing Zone</ListItem>
                      <ListItem>Delete Landing Zone</ListItem>
                      <ListItem>Replicate Landing Zone</ListItem>
                    </List>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="policy-box">
                  <Box className="head">
                    <Box className="title">SHE</Box>
                    <Box className="d-inline-block">
                      <Checkbox size="small" />
                    </Box>
                  </Box>
                  <Box className="policy-list-content">
                    <Box className="title">list of permissons</Box>
                    <List>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Edit Landing Zone</ListItem>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Clone Landing Zone</ListItem>
                      <ListItem>Migrate Landing Zone</ListItem>
                      <ListItem>Delete Landing Zone</ListItem>
                      <ListItem>Replicate Landing Zone</ListItem>
                    </List>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="policy-box">
                  <Box className="head">
                    <Box className="title">DevSecOps</Box>
                    <Box className="d-inline-block">
                      <Checkbox size="small" />
                    </Box>
                  </Box>
                  <Box className="policy-list-content">
                    <Box className="title">list of permissons</Box>
                    <List>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Edit Landing Zone</ListItem>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Clone Landing Zone</ListItem>
                      <ListItem>Migrate Landing Zone</ListItem>
                      <ListItem>Delete Landing Zone</ListItem>
                      <ListItem>Replicate Landing Zone</ListItem>
                    </List>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="policy-box">
                  <Box className="head">
                    <Box className="title">Full Access</Box>
                    <Box className="d-inline-block">
                      <Checkbox size="small" />
                    </Box>
                  </Box>
                  <Box className="policy-list-content">
                    <Box className="title">list of permissons</Box>
                    <List>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Edit Landing Zone</ListItem>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Clone Landing Zone</ListItem>
                      <ListItem>Migrate Landing Zone</ListItem>
                      <ListItem>Delete Landing Zone</ListItem>
                      <ListItem>Replicate Landing Zone</ListItem>
                    </List>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className="policy-box">
                  <Box className="head">
                    <Box className="title">Minimal Access</Box>
                    <Box className="d-inline-block">
                      <Checkbox size="small" />
                    </Box>
                  </Box>
                  <Box className="policy-list-content">
                    <Box className="title">list of permissons</Box>
                    <List>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Edit Landing Zone</ListItem>
                      <ListItem>Create Landing Zone</ListItem>
                      <ListItem>Clone Landing Zone</ListItem>
                      <ListItem>Migrate Landing Zone</ListItem>
                      <ListItem>Delete Landing Zone</ListItem>
                      <ListItem>Replicate Landing Zone</ListItem>
                    </List>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateAddPolicyControlModal;
