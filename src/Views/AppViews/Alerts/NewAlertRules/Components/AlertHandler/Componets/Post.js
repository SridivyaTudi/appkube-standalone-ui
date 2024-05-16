import React, { Component } from "react";
import { Box, Grid, Button, List, ListItem } from "@mui/material";

class Post extends Component {
  render() {
    return (
      <Box>
        <Box className="alert-handler-span">
          Parameters for this Alert Handler
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box className="form-group">
              <label className="alert-handler-label">
                HTTP endpoint for POST request
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Placeholder"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="form-group">
              <label className="alert-handler-label">Header Key</label>
              <input
                type="text"
                class="form-control"
                placeholder="Placeholder"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="form-group">
              <label className="alert-handler-label">Header Value</label>
              <input
                type="text"
                class="form-control"
                placeholder="Placeholder"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Post;
