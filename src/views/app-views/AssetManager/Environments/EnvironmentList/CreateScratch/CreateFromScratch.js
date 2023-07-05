import { Component } from "react";
import { Box, Grid, FormGroup, FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import AccountAddedImage from "../../../../../../assets/img/assetmanager/account-added-image.png";

class CreateFromScratch extends Component {
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
            <Grid item xs={6}>
              <Box className="account-setup-right-contents">
                <h3 className="m-b-1">Create From Scratch</h3>
                <Box className="form-group">
                  <label>Department Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="HRMS"
                    onChange={(e) => {
                      this.props.handleCreateRoleInput(e);
                    }}
                  />
                </Box>
                <Box className="form-group">
                  <label>Prodect Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="HR"
                    onChange={(e) => {
                      this.props.handleCreateRoleInput(e);
                    }}
                  />
                </Box>
                <Box>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Development"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Test"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label=" Stage"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Production"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box className="form-group">
                  <label>Prodect Name</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="HR"
                    onChange={(e) => {
                      this.props.handleCreateRoleInput(e);
                    }}
                  />
                </Box>
                <Box className="form-group">
                  <label>Git repository URL</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter url"
                    onChange={(e) => {
                      this.props.handleCreateRoleInput(e);
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
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

export default CreateFromScratch;
