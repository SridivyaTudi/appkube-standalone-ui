import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

class CloudTrailEventPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    this.props.togglePopup();
  };

  render() {
    let trialEvents = JSON.parse(JSON.stringify(this.props.data));
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.toggle}
        className="select-account-modal-container"
      >
        <ModalHeader className="m-b-1 border-bottom">
          Cloud Trail Event
          <IconButton
            variant="outlined"
            aria-label="delete"
            size="small"
            className="close-btn"
            onClick={() => {
              this.props.togglePopup();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </ModalHeader>
        <ModalBody
          style={{ overflowY: "auto", overflowX: "auto", maxHeight: "300px" }}
        >
          <Box sx={{ width: "100%" }} className="p-10">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <p> {trialEvents}</p>
            </Grid>
          </Box>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const {} = state.environments;
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloudTrailEventPopup);
