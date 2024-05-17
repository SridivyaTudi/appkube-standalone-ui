import { Box, IconButton, Button, Grid, Card } from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import { v4 } from "uuid";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import { LOGOS } from "CommonData";
import Loader from "Components/Loader";
import { ENVIRONMENTS, makeSlugForString } from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Link } from "react-router-dom";

class SelectLendingZonePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landingZones: [],
      selectedLandingzone: 0,
      errorMessage: "",
      selectedCloudName: "",
    };
  }
  componentDidMount() {
    let landingZones = this.props.landingZonesByDepartment?.data || [];
    this.setState({ landingZones });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.landingZonesByDepartment.status !==
        this.props.landingZonesByDepartment.status &&
      this.props.landingZonesByDepartment.status === status.SUCCESS &&
      this.props.landingZonesByDepartment?.data
    ) {
      let landingZones = this.props.landingZonesByDepartment?.data || [];
      let { createProductFormData } = this.props;
      if (landingZones.length === 1) {
        this.props.navigate(
          `${APP_PREFIX_PATH}/bim/add-product/${makeSlugForString(
            createProductFormData?.departmentName
          )}/${createProductFormData?.departmentId}/${landingZones[0]?.id}/${
            landingZones[0]?.cloud?.toLowerCase()
          }`
        );
      } else {
        this.setState({ landingZones });
      }
    }
  }

  //  Reset state and close modal
  handleCloseModal = () => {
    this.props.handleSelectLendingModal();
  };

  onClickCard = (selectedLandingzone, selectedCloudName) => {
    if (this.state.selectedLandingzone === selectedLandingzone) {
      this.setState({ selectedLandingzone: 0, selectedCloudName: "" });
    } else {
      this.setState({
        selectedLandingzone,
        errorMessage: "",
        selectedCloudName,
      });
    }
  };

  renderLandingZone = () => {
    let { landingZones, selectedLandingzone } = this.state;
    let { landingZonesByDepartment, createProductFormData } = this.props;
    if (landingZonesByDepartment.status === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return landingZones.length ? (
        landingZones.map((data) => {
          return (
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={6}
              onClick={() => this.onClickCard(data.id, data.selectedCloudName)}
              key={v4()}
            >
              <Card
                className={` select-landing-card ${
                  selectedLandingzone === data.id ? "active" : ""
                }`}
              >
                <Box className="card-content text-center">
                  <Box className="card-image">
                    <img src={LOGOS[data.cloud.toUpperCase()]} alt="" />
                  </Box>
                  <Box className="card-title">
                    Landing-Zone : {data.landingZone}
                  </Box>
                </Box>
                <Box className="card-footer">
                  <Box className="footer-left-content">
                    <span className="d-block">{data.departmentName}</span>
                  </Box>
                  <Box className="footer-right-content">
                    <span className="d-block text-right">Assets</span>
                    <label className="d-block text-right">
                      {data.totalAssets}
                    </label>
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })
      ) : (
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <p>
            No landing-zone associated with department{" "}
            <strong> {createProductFormData.departmentName}. </strong>
            <Link
              to={`${APP_PREFIX_PATH}/assets/environments/${ENVIRONMENTS.AWS?.toLowerCase()}/newaccountsetup/${
                createProductFormData.departmentId
              }`}
            >
              {" "}
              Click here to create and associate the landing zone
            </Link>
          </p>
        </Grid>
      );
    }
  };
  // Render Loder
  renderLoder(widthClass) {
    return (
      <Box className="p-t-20 p-b-20 text-center width-100">
        <Loader />
      </Box>
    );
  }

  onClickSelect = () => {
    let { selectedLandingzone, selectedCloudName } = this.state;
    if (selectedLandingzone === 0) {
      this.setState({ errorMessage: "Please select landingzone." });
    } else {
      let { createProductFormData } = this.props;
      this.props.navigate(
        `${APP_PREFIX_PATH}/bim/add-product/${makeSlugForString(
          createProductFormData?.departmentName
        )}/${
          createProductFormData?.departmentId
        }/${selectedLandingzone}/${selectedCloudName?.toLowerCase()}`
      );
    }
  };

  render() {
    let { landingZones, errorMessage } = this.state;
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.handleCloseModal}
        className="select-lendingzone-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
            Select Landingzone
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
          <Box className="select-landing-cards">
            <Grid
              container
              rowSpacing={1.5}
              columnSpacing={{ xs: 1.5 }}
              alignItems={"center"}
              className="p-b-10"
            >
              {this.renderLandingZone()}
              {errorMessage ? (
                <span className="d-block width-100 p-l-10 p-t-5 red">
                  {errorMessage}
                </span>
              ) : (
                <></>
              )}
            </Grid>
          </Box>
        </ModalBody>
        <ModalFooter className=" m-t-3 p-0">
          <Box className="d-block text-right">
            <Button
              className="danger-btn min-width-inherit m-r-2"
              variant="contained"
              onClick={this.handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              className="primary-btn min-width-inherit "
              variant="contained"
              onClick={this.onClickSelect}
              disabled={landingZones.length === 0}
            >
              Select
            </Button>
          </Box>
        </ModalFooter>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  const { landingZonesByDepartment, createProductFormData } = state.biMapping;
  return {
    landingZonesByDepartment,
    createProductFormData,
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(SelectLendingZonePopup));
