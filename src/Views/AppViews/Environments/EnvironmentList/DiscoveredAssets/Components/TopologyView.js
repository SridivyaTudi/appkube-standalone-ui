import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box } from "@mui/material";
import { v4 } from "uuid";
import aws from "assets/img/aws.png";
import vpcServicesIcon from "assets/img/assetmanager/vpc-services-icon.png";
import { LOGOS } from "CommonData";
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
      topologyData: this.props.data,
    };
  }

  zoomToElementCallback = (animationTime) => {
    zoomElement(
      this.state.currentActiveNode,
      transformScale,
      animationTime ? animationTime : 0
    );
  };

  renderBody = () => {
    const {
      topologyData: { data },
      activeView,
    } = this.state;
    const { productEnclaveList, globalServiceList } = data;

    const strokeStyles = { strokeColor: "#a5a5d7", strokeWidth: 2 };
    const { cloudName } = this.getLandingZoneOrCloudName();

    return (
      <ArcherContainer
        noCurves
        style={{
          width: `100%`,
          height: "100%",
        }}
      >
        <TransformWrapper
          onTransformed={(instance) => {
            transformScale = instance && instance.state.scale;
            this.setState({ scale: true });
          }}
        >
          {({ zoomIn, zoomOut, instance, zoomToElement, ...rest }) => {
            transformScale = instance.transformState.scale;
            zoomElement = zoomToElement;
            return (
              <>
                <div className="gmnoprint">
                  <div className="gmnoprint-plus-minus">
                    <button className="btn btn-plus" onClick={() => zoomIn()}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="btn btn-minus" onClick={() => zoomOut()}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                  <div
                    className="gmnoprint-map"
                    onClick={() => {
                      this.zoomToElementCallback(300);
                    }}
                  >
                    <button className="btn btn-map">
                      <i className="fa-solid fa-map-marker-alt"></i>
                    </button>
                  </div>
                </div>
                <TransformComponent
                  wrapperStyle={{
                    width: `100%`,
                    height: "100%",
                  }}
                  contentStyle={{
                    width: `464px`,
                    height: "100%",
                    transform: "translate(0px, 0px) scale(0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <ArcherElement
                    id="root"
                    relations={[
                      {
                        targetId: this.getTargetId(1),
                        targetAnchor: "left",
                        sourceAnchor: "right",
                        style: strokeStyles,
                      },
                    ]}
                  >
                    <div
                      className="services-text-box active"
                      id={`${data.label}`}
                    >
                      <div className="d-flex">
                        <div className="account-image">
                          <img
                            src={LOGOS[cloudName] ? LOGOS[cloudName] : ""}
                            alt={cloudName}
                          />
                        </div>
                        <div className="account-id">
                          <span className="d-block">Account ID</span>
                          <span id="custom_location_1" className="d-block">
                            {data.landingZone}
                          </span>
                          {/* <span className="d-block">{data.subLabel}</span> */}
                        </div>
                      </div>
                    </div>
                  </ArcherElement>
                  {productEnclaveList.length ? (
                    this.renderChildNodes(
                      [productEnclaveList, globalServiceList],
                      1,
                      activeView
                    )
                  ) : (
                    <></>
                  )}
                </TransformComponent>
              </>
            );
          }}
        </TransformWrapper>
      </ArcherContainer>
    );
  };

  renderChildNodes = (nodes, currentLevel, activeView) => {
    let retData = [];
    const strokeStyles = { strokeColor: "#a5a5d7", strokeWidth: 2 };
    if (activeView.length > currentLevel) {
      let activeSublevel = -1;
      let activeNode = -1;
      if (activeView[currentLevel] !== -1) {
        const activeViewArr = activeView[currentLevel].split(".");
        activeSublevel = parseInt(activeViewArr[0]);
        activeNode = parseInt(activeViewArr[1]);
      }
      const childJSX = [];
      nodes.map((item, sublevelIndex) => {
        // item = [item];
        if (item?.length > 0) {
          retData.push(
            <ul>
              {item.map((item, nodeIndex) => {
                if (item.productEnclaveList?.length > 0) {
                  if (
                    activeSublevel === sublevelIndex &&
                    activeNode === nodeIndex
                  ) {
                    childJSX.push(
                      this.renderChildNodes(
                        [item.productEnclaveList, item.globalServiceList],
                        currentLevel + 1,
                        activeView
                      )
                    );
                  }
                }
                return (
                  <ArcherElement
                    key={v4()}
                    id={item.id}
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
                      id={item.instanceId}
                      onClick={() => {
                        this.setState(
                          { currentActiveNode: item.instanceId },
                          () => {
                            this.zoomToElementCallback();
                          }
                        );
                        this.props.setCurrentActiveNode(
                          item.instanceId,
                          this.state.activeView,
                          item.id
                        );
                        this.handleNodeClick(
                          currentLevel,
                          sublevelIndex,
                          nodeIndex
                        );
                      }}
                    >
                      <span>
                        <img
                          src={item.image ? item.image : vpcServicesIcon}
                          alt={item.instanceId}
                        />
                      </span>
                      {this.getServiceName(
                        item.instanceId ? item.instanceId : "Global Services"
                      )}
                    </li>
                  </ArcherElement>
                );
              })}
            </ul>
          );
        }
      });
      retData = [
        <div className="global-servies" style={{ marginLeft: "50px" }}>
          {retData}
        </div>,
      ];
      if (childJSX.length > 0) {
        retData.push(childJSX);
      }
    }
    return retData;
  };

  getTargetId = (currentLevel) => {
    const activeNode = this.getChild(currentLevel);
    if (activeNode) {
      return activeNode.id;
    }
    return "";
  };

  getChild = (level) => {
    const {
      topologyData: { productEnclaveList, globalServiceList },
      activeView,
    } = this.state;
    let retData = [
      JSON.parse(JSON.stringify(productEnclaveList)),
      JSON.parse(JSON.stringify(globalServiceList)),
    ];
    for (let i = 0; i <= level; i++) {
      if (i === 0) {
        retData = [
          JSON.parse(JSON.stringify(productEnclaveList)),
          JSON.parse(JSON.stringify(globalServiceList)),
        ];
      } else {
        if (activeView[i] && activeView[i] !== -1) {
          let activeSublevel = parseInt(activeView[i].split(".")[0]);
          let activeNode = parseInt(activeView[i].split(".")[1]);
          // let newArray = [retData.productEnclaveList[activeSublevel]];
          // retData.productEnclaveList[activeSublevel] = newArray;
          retData = retData[activeSublevel][activeNode];
        } else {
          retData = null;
          break;
        }
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
    return name ? name.toUpperCase() : "";
  }
  getLandingZoneOrCloudName = () => {
    const queryPrm = new URLSearchParams(document.location.search);
    const landingZone = queryPrm.get("landingZone");
    const cloudName = queryPrm.get("cloudName")?.toUpperCase();
    return { cloudName, landingZone };
  };

  render() {
    const { data, parentCssClass } = this.props;
    return (
      <>
        <Box className={`${parentCssClass} topology-view`}>
          {Object.keys(data).length ? this.renderBody() : <></>}
        </Box>
      </>
    );
  }
}

export default TopologyView;
