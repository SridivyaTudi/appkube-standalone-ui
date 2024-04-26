import React, { Component } from "react";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

class CreateRole extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isValid, errors } = this.props.validateCreateRoleForm();
    return (
      <>
        {/* <Link className="close-btn" to={`${APP_PREFIX_PATH}/assets/environments`}>
          <i className="fa-solid fa-xmark"></i>
        </Link> */}
        <Box className="d-inline-block width-100 new-account-setup-tab-contents">
          <h3>Create Roles</h3>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Grid item xs={7}>
                <Box className="create-role-border">
                  <h4>Create IAM Roles For Appkube</h4>
                  <ul>
                    <li>
                      <span>1.</span> in the
                      <strong> Access Management menu, Select Roles</strong> and
                      Click <strong>Create Role</strong>
                    </li>
                    <li>
                      <span>2.</span> in the
                      <strong> Select Trusted Entity</strong> Window, Select
                      <strong> AWS Account</strong>
                    </li>
                    <li>
                      <span>3.</span> Under An AWS account, Select
                      <strong> Another AWS Account</strong>and Enter the
                      <strong> Account ID: 65790774754</strong>
                    </li>
                    <li>
                      <span>4.</span> Under Option, Select the
                      <strong> Required External ID</strong> and Enter the
                      <strong> External ID: ME4@s7fv@sQsghDvsea4RE</strong>
                    </li>
                    <li>
                      <span>5.</span> Make Sure Not To Select Require MFA
                    </li>
                    <li>
                      <span>6.</span> Select The Following:
                      <strong> 'SecurityAudit'</strong> (AWS managed policy)
                      <strong> 'Appkube-readonly-policy'</strong> that we
                      created before. you can sea Appkube in the filter
                    </li>
                    <li>
                      <span>7.</span> Click on the <strong>'Next'</strong>{" "}
                      button at the bottom of the page
                    </li>
                    <li>
                      <span>8.</span> Set Role Name with Your choice (
                      <strong> 'Appkube-Connect'</strong> makes sense) and click
                      on <strong>'Create Role'</strong> at the bottom of the
                      page
                    </li>
                    <li>
                      <span>9.</span> On the search box look for the 'Role name'
                      you set in the previous step, and click on it
                    </li>
                    <li>
                      <span>10.</span>&nbsp;Copy the <strong>Role ARN</strong>{" "}
                      and fill it in the Role ARN field
                    </li>
                  </ul>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box className="account-setup-right-contents">
                  <Box className="form-group">
                    <label>Display Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Display name"
                      name="displayName"
                      value={this.state.name}
                      onChange={(e) => {
                        this.props.handleCreateRoleInput(e);
                      }}
                    />
                    <span className="red">
                      {!isValid && errors.displayName ? errors.displayName : ""}
                    </span>
                  </Box>
                  <Box className="form-group">
                    <label>Role ARN</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="arn:aws:iam::893233071719:user/user"
                      name="roleArn"
                      value={this.state.role}
                      onChange={(e) => {
                        this.props.handleCreateRoleInput(e);
                      }}
                    />
                    <span className="red">
                      {!isValid && errors.roleArn ? errors.roleArn : ""}
                    </span>
                  </Box>
                  <Box className="form-group">
                    <label>External ID</label>
                    <input
                      className="form-control"
                      type="text"
                      name="externalId"
                      placeholder="ME4@s7fvs@dQdghDvdsea4RE"
                      value={this.state.externalId}
                      onChange={(e) => {
                        this.props.handleCreateRoleInput(e);
                      }}
                    />
                    <span className="red">
                      {!isValid && errors.externalId ? errors.externalId : ""}
                    </span>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
}

export default CreateRole;
