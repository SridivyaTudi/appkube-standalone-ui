import LoadingButton from "@mui/lab/LoadingButton";
import { Box, IconButton, ListItem } from "@mui/material/";
import { Component } from "react";
import { List, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 250,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

class CloudElementInstancePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //  Reset state and close modal
  handleCloseModal = () => {
    this.props.handleShowInstanceModal();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="service-details-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
            Service Details
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

        <ModalBody>
          {this.props.data?.length ? (
            this.props.data.map((details) => {
              return (
                <Box className={`service-details `} key={v4()}>
                  <List>
                    <ListItem className="width-100 d-flex align-items-center  justify-content-between">
                      <label>{details.label}</label>
                      <HtmlTooltip
                          className="table-tooltip"
                          title={details.value}
                        >
                          {details.value}
                        </HtmlTooltip>
                    </ListItem>
                  </List>
                  <Box></Box>
                </Box>
              );
            })
          ) : (
            <></>
          )}
        </ModalBody>
      </Modal>
    );
  }
}

export default CloudElementInstancePopup;
