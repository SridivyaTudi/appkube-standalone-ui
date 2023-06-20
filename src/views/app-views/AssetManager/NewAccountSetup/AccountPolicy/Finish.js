import React, { Component } from "react";
import AccountAddedImage from "../../../../../assets/img/assetmanager/account-added-image.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ToastMessage } from "../../../../../Toast/ToastMessage";
import config from "../../../config";
import { RestService } from "./../../../Services/RestService";
import { withRouter } from "./withRouter";

class Finish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentId: this.props.departmentId,
      roleDetails: this.props.roleDetails,
    };
  }

  componentDidMount() {
    this.setState({
      departmentId: this.props.departmentId,
      roleDetails: this.props.roleDetails,
    });
  }

  createSubmit = () => {
    let postData = {
      displayName: this.props.roleDetails.name,
      roleArn: this.props.roleDetails.role || "",
      cloud: "AWS",
      externalId: this.props.roleDetails.externalId,
      department: {
        id: this.props.roleDetails.departmentId,
      },
    };
    this.setState({ loadingData: true });
    RestService.postData(config.ADD_CLOUD_ENV, postData).then((response) => {
      this.setState({ loadingData: false });
      if (response.status == 500) {
        ToastMessage(response.title, "unsuccess");
        return 1;
      }
      ToastMessage("Successfully new account created", "success");

      this.props.navigate("/environments");
    });
  };

  render() {
    return (
      <div className="d-inline-block width-100 new-account-setup-tab-contents">
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Grid item xs={7}>
              <div className="account-added-content">
                <h3>Account Added</h3>
                <h4 className="m-b-2">
                  Your AWS Account name will be added to Appkube and will
                  assocate with the OU's
                </h4>
                <div className="contents">
                  <label>Display Name</label>
                  <p> {this.props.roleDetails.name}</p>
                </div>
                <div className="contents">
                  <label>Role ARN</label>
                  <p> {this.props.roleDetails.role}</p>
                </div>
                <div className="contents">
                  <label>External ID</label>
                  <p> {this.props.roleDetails.externalId}</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className="added-image">
                <img src={AccountAddedImage} alt="added image" />
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default withRouter(Finish);
