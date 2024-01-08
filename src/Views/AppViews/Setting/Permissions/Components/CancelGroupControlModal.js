import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import NoteIcon from "../../../../../assets/img/setting/note-icon.png";
import { setActiveTab } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class CancelGroupControlModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.handleCancelGroupControlModal}
        className="setting-modal-container delete-policy-modal"
      >
        <ModalBody>
          <Box className="delete-policy-content text-center">
            <h5 className="m-b-2 leave-heading">
              {this.props.label ? this.props.label : "Leave Page"} ?
            </h5>
            <Box className="cancel-icon">
              <img src={NoteIcon} alt="" />
            </Box>
            <p>
              are you sure you want to{" "}
              {this.props.label ? this.props.label : "leave the current page"}{" "}
              ?. The change that you made won’t be saved
            </p>
          </Box>
        </ModalBody>
        <ModalFooter className="footer-top-br m-t-3">
          <Box className="d-block text-center">
            <LoadingButton
              className="danger-btn min-width-inherit m-r-2"
              variant="contained"
              onClick={this.props.handleCancelGroupControlModal}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              className="primary-btn min-width-inherit "
              variant="contained"
              onClick={(event) => {
                this.props.handleCancelGroupControlModal(
                  event,
                  this.props.isHandleCallBackOnContinueBtn
                );

                let { redirectUrl, previousTab } = this.props;
                if (previousTab) {
                  setActiveTab(this.props.previousTab);
                }
                if (!this.props.isHandleCallBackOnContinueBtn) {
                  this.props.navigate(
                    redirectUrl || `${APP_PREFIX_PATH}/setting`
                  );
                }
              }}
            >
              Continue
            </LoadingButton>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}

export default navigateRouter(CancelGroupControlModal);
