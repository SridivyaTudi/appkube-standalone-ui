import React, { Component } from "react";
import { Box, List, ListItem, Grid, Button, IconButton } from "@mui/material";
import Gateway from "assets/img/assetmanager/gateway.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import FunctionImg from "assets/img/assetmanager/function-img.png";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

class Lambda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLayer: "",
    };
  }
  render() {
    let { activeLayer } = this.state;
    let { arrowRightIconShow = true } = this.props;
    return (
      <Grid item xs={6}>
        <Box className="common-service">
          {arrowRightIconShow ? (
            <IconButton
              size="small"
              className="open-close"
              onClick={() => this.props.setCurrentActiveNode("", true)}
            >
              <KeyboardArrowRightIcon fontSize="inherit" />
            </IconButton>
          ) : (
            <></>
          )}

          <Box className="title">Lambda Based</Box>
          <List>
            <ListItem className={` ${activeLayer === "SSL" ? "active" : ""}`}>
              <Box className="application-balancer">
                <Button
                  className="secondary-btn min-width"
                  variant="contained"
                  onClick={() => {
                    this.setState({ activeLayer: "SSL" });
                    this.props.setCurrentActiveNode("SSL");
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
              className={`${activeLayer === "APIGateway" ? "active" : ""}`}
            >
              <Box className="application-balancer">
                <Button
                  className="secondary-btn min-width"
                  variant="contained"
                  onClick={() => {
                    this.setState({ activeLayer: "APIGateway" });
                    this.props.setCurrentActiveNode("APIGateway");
                  }}
                >
                  <img src={Gateway} alt="" /> API Gateway
                  <i className="fa-solid fa-angle-down"></i>
                </Button>
                <Box className="balancer-boxs">
                  <Box
                    className={`balancer-box ${
                      activeLayer === "Function" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ activeLayer: "Function" });
                      this.props.setCurrentActiveNode("Function");
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
                      activeLayer === "Function1" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ activeLayer: "Function1" });
                      this.props.setCurrentActiveNode("Function");
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
                      activeLayer === "Function2" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ activeLayer: "Function2" });
                      this.props.setCurrentActiveNode("Function");
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
                      activeLayer === "Function3" ? "active" : ""
                    }`}
                    onClick={() => {
                      this.setState({ activeLayer: "Function3" });
                      this.props.setCurrentActiveNode("Function");
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
