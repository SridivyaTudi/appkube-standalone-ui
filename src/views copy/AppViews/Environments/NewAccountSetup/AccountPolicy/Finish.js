import React, { Component } from "react";
import AccountAddedImage from "assets/img/assetmanager/account-added-image.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { withRouter } from "Views/AppViews/Environments/NewAccountSetup/AccountPolicy/withRouter";

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
              <Box className="account-added-content">
                <h3>Account Added</h3>
                <h4 className="m-b-2">
                  Your AWS Account name will be added to Appkube and will
                  assocate with the OU's
                </h4>
                <Box className="contents">
                  <label>Display Name</label>
                  <p> {this.props.formData.displayName}</p>
                </Box>
                <Box className="contents">
                  <label>Role ARN</label>
                  <p> {this.props.formData.roleArn}</p>
                </Box>
                <Box className="contents">
                  <label>External ID</label>
                  <p> {this.props.formData.externalId}</p>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box className="added-image">
                <img src={AccountAddedImage} alt="added image" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default withRouter(Finish);
