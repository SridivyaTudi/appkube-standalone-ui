import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Grid, List, ListItem, Button } from "@mui/material";
import { v4 } from "uuid";
import ChartWebLayerIcon from "assets/img/assetmanager/chart-web-layer-icon.png";
import ChartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import DataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import Springboot from "assets/img/assetmanager/springboot.png";
import Nginx from "assets/img/assetmanager/nglnx.png";
import Postgresql from "assets/img/assetmanager/postgresql.png";
import Opensearch from "assets/img/assetmanager/opensearch.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import RightArrow from "assets/img/assetmanager/right-arrow.png";

let transformScale = 0;

let zoomElement = () => {};

class TopologyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // active view maintains the current active node on the given level.
      // at index 0, 0 node will be by default active. -1 indicates that that level would render but
      // there will not be any active node.
      // it would also contain sublevel. if at index 2, value is 0.1, that means,
      // at level 2, sublevel 0, index 1 is active.
      activeView: [0, -1],
      currentActiveNode: "",
    };
  }


  getTargetId = (currentLevel) => {
    const activeNode = this.getChild(currentLevel);
    if (activeNode) {
      return activeNode.label;
    }
    return "";
  };

  getChild = (level) => {
    const { activeView } = this.state;
    const { data } = this.props;
    let retData = data;
    for (let i = 0; i <= level; i++) {
      if (i === 0) {
        retData = data;
      } else {
        if (activeView[i] && activeView[i] !== -1) {
          let activeSublevel = parseInt(activeView[i].split(".")[0]);
          let activeNode = parseInt(activeView[i].split(".")[1]);
          retData = retData.children[activeSublevel][activeNode];
        } else {
          retData = null;
          break;
        }
      }
    }
    return retData;
  };

  renderChildNodes = (nodes, currentLevel, activeView) => {
    let retData = [];
    const strokeStyles = { strokeColor: "#a5a5d7", strokeWidth: 2 };
    if (activeView.length > currentLevel) {
      let activeSublevel = -1;
      let activeNode = -1;
      if (activeView[currentLevel] !== -1) {
        activeSublevel = parseInt(activeView[currentLevel].split(".")[0]);
        activeNode = parseInt(activeView[currentLevel].split(".")[1]);
      }
      const childJSX = [];
      nodes.map((item, sublevelIndex) => {
        if (item.length > 0) {
          retData.push(
            <ul>
              {item.map((item, nodeIndex) => {
                if (item.children.length > 0) {
                  if (
                    activeSublevel === sublevelIndex &&
                    activeNode === nodeIndex
                  ) {
                    childJSX.push(
                      this.renderChildNodes(
                        item.children,
                        currentLevel + 1,
                        activeView
                      )
                    );
                  }
                }
                return (
                  <ArcherElement
                    key={v4()}
                    id={item.label}
                    relations={[
                      {
                        targetId:
                          activeSublevel === sublevelIndex &&
                          activeNode === nodeIndex
                            ? this.getTargetId(currentLevel + 1)
                            : "",
                        targetAnchor: "left",
                        sourceAnchor: "right",
                        style: strokeStyles,
                      },
                    ]}
                  >
                    <li
                      className={
                        activeSublevel === sublevelIndex &&
                        activeNode === nodeIndex
                          ? "active"
                          : ""
                      }
                      id={item.label}
                      onClick={() => {
                        // this.setState({ currentActiveNode: item.label }, () => {
                        //   this.zoomToElementCallback();
                        // });
                        this.handleNodeClick(
                          currentLevel,
                          sublevelIndex,
                          nodeIndex
                        );
                      }}
                    >
                      <span>
                        <img src={item.image} alt={item.label} />
                      </span>
                      {this.getServiceName(item.label)}
                    </li>
                  </ArcherElement>
                );
              })}
            </ul>
          );
        }
      });
      retData = [<div className="global-servies">{retData}</div>];
      if (childJSX.length > 0) {
        retData.push(childJSX);
      }
    }
    return retData;
  };

  handleNodeClick = (currentLevel, activeSublevel, activeIndex) => {
    const { activeView } = this.state;
    // active view length will alway be added by 2 than current level.
    // suppose current level is 1. so active view lenght should be 3.
    // it would contain [index-of-root-active-node, root-of-level1-active-node, -1]
    activeView.length = currentLevel + 2;
    activeView[currentLevel] = activeSublevel + "." + activeIndex;
    activeView[currentLevel + 1] = -1;
    this.setState({
      activeView,
    });
  };

  /** Get name in form of capitalize. */
  getServiceName(name) {
    let firstChar = name ? name.charAt(0) : "";
    let otherStr = name ? name.toLowerCase().slice(1) : "";
    let string = firstChar + otherStr;
    return string;
  }

  render() {
    const { data } = this.props;
    return (
      <>
        <Grid item xs={5}>
          <Box className="topology-panel">
            <Box className="topology-panel-body">
              <Box className="topology-inner-content">
                <Box className="content-left">
                  <List>
                    <ListItem>
                      <Box className="button-box">
                        <span>
                          <img src={ChartWebLayerIcon} alt="" />
                        </span>
                        <p>Web Layer</p>
                      </Box>
                      <span>
                        <img src={RightArrow} alt="" />
                      </span>
                    </ListItem>
                    <ListItem>
                      <Box className="button-box">
                        <span>
                          <img src={ChartAppLayerIcon} alt="" />
                        </span>
                        <p>App Layer</p>
                      </Box>
                      <span>
                        <img src={RightArrow} alt="" />
                      </span>
                    </ListItem>
                    <ListItem>
                      <Box className="button-box">
                        <span>
                          <img src={DataServiceSvgrepo} alt="" />
                        </span>
                        <p>Data Layer</p>
                      </Box>
                      <span>
                        <img src={RightArrow} alt="" />
                      </span>
                    </ListItem>
                  </List>
                </Box>
                <Box className="content-right">
                  <List>
                    <ListItem>
                      <Box className="application-balancer">
                        <Button
                          className="secondary-btn min-width"
                          variant="contained"
                          onClick={() => {
                            this.props.setActiveLayer("SSL");
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
                    <ListItem>
                      <Box className="application-balancer">
                        <Button
                          className="primary-btn min-width"
                          variant="contained"
                          onClick={() => {
                            this.props.setActiveLayer("NGINX");
                          }}
                        >
                          <img src={Nginx} alt="" /> NGINX
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
                        <Button
                          className="primary-btn min-width"
                          variant="contained"
                          onClick={() => {
                            this.props.setActiveLayer("Springboot");
                          }}
                        >
                          <img src={Springboot} alt="" /> Springboot
                        </Button>
                        <Box className="balancer-boxs">
                          <Box className="balancer-box" onClick={()=>{
                            this.props.setActiveLayer('Postgresql') 
                           }}>
                            <span>
                              <img src={bottomArrow} alt="" />
                            </span>
                            <Box className="icon">
                              <img src={Postgresql} alt="" />
                            </Box>
                            <p>PostgreSQL</p>
                          </Box>
                          <Box className="balancer-box" onClick={()=>{
                            this.props.setActiveLayer('Opensearch') 
                           }}>
                            <span>
                              <img src={bottomArrow} alt="" />
                            </span>
                            <Box className="icon">
                              <img src={Opensearch} alt="" />
                            </Box>
                            <p>Opensearch</p>
                          </Box>
                        </Box>
                      </Box>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </>
    );
  }
}

export default TopologyView;
