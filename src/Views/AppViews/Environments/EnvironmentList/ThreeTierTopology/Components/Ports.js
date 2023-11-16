import React, { Component } from "react";
import { Box,  List, ListItem } from "@mui/material";
import GreenArrow from "assets/img/assetmanager/green-arrow.png";
import BlueArrow from "assets/img/assetmanager/blue-arrow.png";
import OrangeArrow from "assets/img/assetmanager/orange-arrow.png";
import GreenBothArrow from "assets/img/assetmanager/green-both-arrow.png";
import BlueBothArrow from "assets/img/assetmanager/blue-both-arrow.png";
import OrangeBothArrow from "assets/img/assetmanager/orange-both-arrow.png";
import CloseBottomArrow from "assets/img/assetmanager/close-bottom-arrow.png";
import GrayBottomArrow from "assets/img/assetmanager/gray-bottom-arrow.png";
class Ports extends Component {
  render() {
    return (
      <Box className="ports-content">
        <Box className="ports-number">
          Ports <span>80,8080,8686,8443,4848,4949,7979</span> are opened by
          default
        </Box>
        <Box className="ports-inner-content p-l-10 p-r-10 p-b-20">
          <Box className="ports-public-section">
            <List>
              <ListItem>
                <Box className="ports-public">
                  <Box className="balancer-boxs m-b-2">
                    <Box className="balancer-box">
                      <p className="green">80</p>
                      <span>
                        <img src={GreenArrow} alt="" />
                      </span>
                    </Box>
                    <Box className="balancer-box">
                      <p className="blue">2333</p>
                      <span>
                        <img src={BlueArrow} alt="" />
                      </span>
                    </Box>
                    <Box className="balancer-box">
                      <p className="orange">5777</p>
                      <span>
                        <img src={OrangeArrow} alt="" />
                      </span>
                    </Box>
                  </Box>
                  <Box className="public-ip" variant="contained">
                    Public IP
                  </Box>
                  <Box className="balancer-boxs m-t-2">
                    <Box className="balancer-box">
                      <span>
                        <img src={GreenArrow} alt="" />
                      </span>
                      <Box className="icon">
                        <p>80</p>
                      </Box>
                    </Box>
                    <Box className="balancer-box">
                      <span>
                        <img src={BlueArrow} alt="" />
                      </span>
                      <Box className="icon">
                        <p>2333</p>
                      </Box>
                    </Box>
                    <Box className="balancer-box">
                      <span>
                        <img src={OrangeArrow} alt="" />
                      </span>
                      <Box className="icon">
                        <p>5777</p>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="ports-public-chart">
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                  </Box>
                  <Box className="ports-title">Node 1</Box>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="ports-public">
                  <Box className="both-arrows">
                    <Box className="balancer-box">
                      <p className="green">80</p>
                      <span>
                        <img src={GreenBothArrow} alt="" />
                      </span>
                    </Box>
                    <Box className="balancer-box">
                      <p className="blue">2333</p>
                      <span>
                        <img src={BlueBothArrow} alt="" />
                      </span>
                    </Box>
                    <Box className="balancer-box">
                      <p className="orange">5777</p>
                      <span>
                        <img src={OrangeBothArrow} alt="" />
                      </span>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
              <ListItem>
                <Box className="ports-public">
                  <Box className="balancer-boxs m-b-2">
                    <Box className="balancer-box">
                      <p className="green">80</p>
                      <span>
                        <img src={GreenArrow} alt="" />
                      </span>
                    </Box>
                    <Box className="balancer-box">
                      <p className="blue">2333</p>
                      <span>
                        <img src={BlueArrow} alt="" />
                      </span>
                    </Box>
                    <Box className="balancer-box">
                      <p className="orange">5777</p>
                      <span>
                        <img src={CloseBottomArrow} alt="" />
                      </span>
                    </Box>
                  </Box>
                  <Box className="public-ip green">SLB (DNAT)</Box>
                  <Box className="balancer-boxs m-t-2">
                    <Box className="balancer-box">
                      <span>
                        <img src={GreenArrow} alt="" />
                      </span>
                      <Box className="icon">
                        <p>80</p>
                      </Box>
                    </Box>
                    <Box className="balancer-box">
                      <span>
                        <img src={BlueArrow} alt="" />
                      </span>
                      <Box className="icon">
                        <p>2333</p>
                      </Box>
                    </Box>
                    <Box className="balancer-box">
                      <span>
                        <img src={OrangeArrow} alt="" />
                      </span>
                      <Box className="icon">
                        <p>5777</p>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="ports-public-chart">
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                    <Box className="chart-bar"></Box>
                  </Box>
                  <Box className="ports-title">Node 2</Box>
                </Box>
              </ListItem>
            </List>
            <Box className="open-ports">
              <Box className="open-box">
                <span>
                  <img src={GreenArrow} alt="" />
                </span>
                <p>Open Port by default</p>
              </Box>
              <Box className="open-box">
                <span>
                  <img src={GrayBottomArrow} alt="" />
                </span>
                <Box className="end-point-box">Endpoint</Box>
                <p>Randomly assigned port</p>
              </Box>
              <Box className="open-box">
                <span>
                  <img src={CloseBottomArrow} alt="" />
                </span>
                <p>Dead (closed) port by default</p>
              </Box>
              <Box className="open-box">
                <span className="load-balancer-box"></span>
                <p>Shared load balancer</p>
              </Box>
            </Box>
          </Box>
          <Box className="following-section">
            <Box className="following-ports">
              <Box className="following-title">
                The following ports are opened by default:
              </Box>
              <List>
                <ListItem>
                  80, 8080, 8686 - proxies HTTP traffic to HTTP (80 port)
                </ListItem>
                <ListItem>
                  4848, 8443, 4901-4910 - proxies SSL (HTTPS) traffic is proxied
                  to SSL
                </ListItem>
                <ListItem>
                  443 - proxies SSL traffic is proxied to HTTP (80 port)
                </ListItem>
                <ListItem>4949, 7979 - proxies SSL traffic to HTTP</ListItem>
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Ports;
