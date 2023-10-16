import React, { Component } from "react";
import { Box, List, ListItem, Grid, Button } from "@mui/material";
import Gateway from "assets/img/assetmanager/gateway.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import FunctionImg from "assets/img/assetmanager/function-img.png";

class Lambda extends Component {
  render() {
    return (
      <Grid item xs={6}>
        <Box className="common-service">
          <Box className="title">Lambda Based</Box>
          <List>
            <ListItem>
              <Box className="application-balancer">
                <Button className="secondary-btn min-width" variant="contained">
                  SSL
                </Button>
                <Box className="balancer-boxs">
                  <Box className="balancer-box">
                    <span>
                      <img src={bottomArrow} alt="" />
                    </span>
                  </Box>
                </Box>
              </Box>
            </ListItem>
            <ListItem>
              <Box className="application-balancer">
                <Button className="primary-btn min-width" variant="contained">
                  <img src={Gateway} alt="" /> API Gateway
                  <i className="fa-solid fa-angle-down"></i>
                </Button>
                <Box className="balancer-boxs">
                  <Box className="balancer-box">
                    <span>
                      <img src={bottomArrow} alt="" />
                    </span>
                    <Box className="icon">
                      <img src={FunctionImg} alt="" />
                    </Box>
                    <p>Function</p>
                  </Box>
                  <Box className="balancer-box">
                    <span>
                      <img src={bottomArrow} alt="" />
                    </span>
                    <Box className="icon">
                      <img src={FunctionImg} alt="" />
                    </Box>
                    <p>Function</p>
                  </Box>
                  <Box className="balancer-box">
                    <span>
                      <img src={bottomArrow} alt="" />
                    </span>
                    <Box className="icon">
                      <img src={FunctionImg} alt="" />
                    </Box>
                    <p>Function</p>
                  </Box>
                  <Box className="balancer-box">
                    <span>
                      <img src={bottomArrow} alt="" />
                    </span>
                    <Box className="icon">
                      <img src={FunctionImg} alt="" />
                    </Box>
                    <p>Function</p>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Grid>
    );
  }
}

export default Lambda;
