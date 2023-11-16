import { Box, FormControlLabel, Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Component } from "react";
import AccountAddedImage from "assets/img/assetmanager/account-added-image.png";

class CreateFromScratch extends Component {
  render() {
    return (
      <Box className="d-inline-block width-100 new-account-setup-tab-contents">
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
                <h3>Create From Scratch</h3>
                <Box className="form-group">
                  <label>Department Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="HRMS"
                  />
                </Box>
                <Box className="form-group">
                  <label>Prodect Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="HR"
                  />
                </Box>
                <Box className="checkbox-group form-group">
                  <label>Services</label>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    <Grid item xs={6}>
                      <FormControlLabel
                        className="service-check-box m-b-0 m-r-0 d-flex
                  align-items-center"
                        control={<Checkbox size="small" />}
                        label="Development"
                      />
                      <FormControlLabel
                        className="service-check-box m-b-0 m-r-0 d-flex
                        align-items-center"
                        control={<Checkbox size="small" />}
                        label="Test"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        className="service-check-box m-b-0 m-r-0 d-flex
                        align-items-center"
                        control={<Checkbox size="small" />}
                        label=" Stage"
                      />
                      <FormControlLabel
                        className="service-check-box m-b-0 m-r-0 d-flex
                        align-items-center"
                        control={<Checkbox size="small" />}
                        label="Production"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box className="form-group">
                  <label>Select AWS Account</label>
                  <select name="number" id="number" className="form-control">
                    <option value="1234546547654">1234546547654</option>
                    <option value="1234546547655">1234546547655</option>
                    <option value="1234546547656">1234546547656</option>
                    <option value="1234546547657">1234546547657</option>
                  </select>
                </Box>
                <Box className="form-group">
                  <label>Git repository URL</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter url"
                  />
                </Box>
                <Box className="form-group">
                  <label>Custom URL</label>
                  <Box className="d-flex">
                    <input className="custom-url" type="text" placeholder="" />
                    <p>.appkube.com</p>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className="added-image">
                <img src={AccountAddedImage} alt="account added." />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default CreateFromScratch;
