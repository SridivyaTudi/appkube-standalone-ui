import { Box, Button, Grid, Checkbox, ListItem, IconButton } from "@mui/material/";
import { Component } from "react";
import { List, Modal, ModalBody, ModalHeader } from "reactstrap";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";

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
        <ModalBody>
          <Box className="setting-common-searchbar p-t-5 p-b-0">
            <Grid container>
              <Grid item xs={12}>
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
