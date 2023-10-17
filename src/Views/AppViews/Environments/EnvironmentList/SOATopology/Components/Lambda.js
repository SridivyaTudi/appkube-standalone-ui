import React, { Component } from "react";
import { Box, List, ListItem, Grid, Button, IconButton } from "@mui/material";
import Gateway from "assets/img/assetmanager/gateway.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import FunctionImg from "assets/img/assetmanager/function-img.png";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

class Lambda extends Component {
  render() {
    let { activeServiceChildTopology, toggleView } = this.props;
    return (
      <Grid item xs={6}>
        <Box className="common-service">
          {!toggleView ? (
            <IconButton
              size="small"
              className="open-close"
              onClick={() =>
                this.props.setCurrentActiveNode(
                  activeServiceChildTopology,
                  !toggleView
                )
              }
            >
              <KeyboardArrowRightIcon fontSize="inherit" />
            </IconButton>
          ) : (
            <></>
          )}

          <Box className="title">Lambda Based</Box>
          <List>
            <ListItem
              className={` ${
                activeServiceChildTopology === "SSL" ? "active" : ""
              }`}
            >
              <Box className="application-balancer">
                <Button
                  className="secondary-btn min-width"
                  variant="contained"
                  onClick={() => {
                    this.props.setCurrentActiveNode("SSL", toggleView);
                  }}
                >
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
            <ListItem
              className={`${
                activeServiceChildTopology === "APIGateway" ? "active" : ""
              }`}
            >
              <Box className="application-balancer">
                <Button
                  className="secondary-btn min-width"
                  variant="contained"
                  onClick={() => {
                    this.props.setCurrentActiveNode("APIGateway", toggleView);
                  }}
                >
                  <img src={Gateway} alt="" /> API Gateway
                  <i className="fa-solid fa-angle-down"></i>
                </Button>
                <Box className="balancer-boxs">
                  <Box
                    className={`balancer-box ${
                      activeServiceChildTopology === "Function" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.props.setCurrentActiveNode("Function", toggleView);
                    }}
                  >
                    <span>
                      <img src={bottomArrow} alt="" />
                    </span>
                    <Box className="icon">
                      <img src={FunctionImg} alt="" />
                    </Box>
                    <p>Function</p>
                  </Box>
                  <Box
                    className={`balancer-box ${
                      activeServiceChildTopology === "Function1" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.props.setCurrentActiveNode("Function", toggleView);
                    }}
                  >
                    <span>
                      <img src={bottomArrow} alt="" />
                    </span>
                    <Box className="icon">
                      <img src={FunctionImg} alt="" />
                    </Box>
                    <p>Function</p>
                  </Box>
                  <Box
                    className={`balancer-box ${
                      activeServiceChildTopology === "Function2" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({
                        activeServiceChildTopology: "Function2",
                      });
                      this.props.setCurrentActiveNode("Function", toggleView);
                    }}
                  >
                    <span>
                      <img src={bottomArrow} alt="" />
                    </span>
                    <Box className="icon">
                      <img src={FunctionImg} alt="" />
                    </Box>
                    <p>Function</p>
                  </Box>
                  <Box
                    className={`balancer-box ${
                      activeServiceChildTopology === "Function3" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.props.setCurrentActiveNode("Function", toggleView);
                    }}
                  >
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
