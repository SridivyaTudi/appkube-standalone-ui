import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box } from "@mui/material";
import { v4 } from "uuid";
import vpcServicesIcon from "assets/img/assetmanager/vpc-services-icon.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {
  setSelectedInfraTopologyView,
  getSelectedInfraTopologyView,
} from "Utils";

let transformScale = 0;

let zoomElement = () => {};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

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

  componentDidMount = () => {
    this.previousCurrentNode();
  };

  zoomToElementCallback = (animationTime) => {
    zoomElement(
      this.state.currentActiveNode,
      transformScale,
      animationTime ? animationTime : 0
    );
  };

  renderBody = () => {
    const { topologyData: data, activeView } = this.state;
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
          minScale={0.4}
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, instance, zoomToElement, ...rest }) => {
            transformScale = instance.transformState.scale;
            zoomElement = zoomToElement;
            return (
              <>
                <Box className="gmnoprint">
                  <Box className="gmnoprint-plus-minus">
                    <button className="btn btn-plus" onClick={() => zoomIn()}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="btn btn-minus" onClick={() => zoomOut()}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </Box>
                  <Box
                    className="gmnoprint-map"
                    onClick={() => {
                      this.zoomToElementCallback(300);
                    }}
                  >
                    <button className="btn btn-map">
                      <i className="fa-solid fa-map-marker-alt"></i>
                    </button>
                  </Box>
                </Box>
                <TransformComponent
                  wrapperStyle={{
                    width: `100%`,
                    height: "100%",
                  }}
                  contentStyle={{
                    width: "1000px",
                    minWidth: `464px`,
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
                    key={v4()}
                  >
                    <Box
                      className="services-text-box active"
                      id={`${data.label}`}
                    >
                      <Box className="d-flex align-items-center">
                        <Box className="account-image">
                          <img src={data.image} alt={cloudName} />
                        </Box>
                        <Box className="account-id">
                          <span className="d-block">{data.label}</span>
                          <HtmlTooltip
                            className="table-tooltip"
                            title={data.landingZone}
                          >
                            <span id="custom_location_1" className="d-block">
                              {data.landingZone}
                            </span>
                          </HtmlTooltip>
                        </Box>
                      </Box>
                    </Box>
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
      nodes.forEach((item, sublevelIndex) => {
        // item = [item];

        if (item?.length > 0) {
          retData.push(
            <ul key={v4()}>
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
                            ? this.getTargetId(currentLevel + 1, nodeIndex)
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
                      id={item.instanceId ? item.instanceId : "Global Services"}
                      onClick={() => {
                        let currentActiveNode = item.instanceId
                          ? item.instanceId
                          : "Global Services";
                        this.setState(
                          {
                            currentActiveNode,
                          },
                          () => {
                            this.zoomToElementCallback();
                          }
                        );
                        this.props.setCurrentActiveNode(
                          item.instanceId ? item.instanceId : "Global Services",
                          this.state.activeView,
                          item.id
                        );
                        this.handleNodeClick(
                          currentLevel,
                          sublevelIndex,
                          nodeIndex
                        );
                        setSelectedInfraTopologyView({
                          currentActiveNode,
                          activeView: this.state.activeView,
                          id: item.id,
                          currentLevel,
                          sublevelIndex,
                          nodeIndex,
                        });
                      }}
                      key={v4()}
                    >
                      <span>
                        <img
                          src={item.image ? item.image : vpcServicesIcon}
                          alt={item.instanceId}
                        />
                      </span>
                      <HtmlTooltip
                        className="table-tooltip"
                        title={item.instanceId}
                      >
                        <p>
                          {this.getServiceName(
                            item.instanceId
                              ? item.instanceId
                              : "Global Services"
                          )}
                        </p>
                      </HtmlTooltip>
                    </li>
                  </ArcherElement>
                );
              })}
            </ul>
          );
        }
      });
      retData = [
        <Box
          className="global-servies"
          style={{ marginLeft: "50px" }}
          key={v4()}
        >
          {retData}
        </Box>,
      ];
      if (childJSX.length > 0) {
        retData.push(childJSX);
      }
    }
    return retData;
  };

  getTargetId = (currentLevel, nodeIndex) => {
    let { activeView } = this.state;

    const activeNode = this.getChild(currentLevel);
    
    if (activeView.length > 3 && currentLevel > 1) {
      let activeSubNode = this.getSubChild(activeNode, currentLevel, nodeIndex);
      return activeSubNode?.id || "";
    } else {
      if (activeNode) {
        return activeNode.id;
      }
      return "";
    }
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

          if (retData[activeSublevel] && retData[activeSublevel][activeNode]) {
            retData = retData[activeSublevel][activeNode];
          }
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
    return name ? name?.toUpperCase() : "";
  }
  getLandingZoneOrCloudName = () => {
    const queryPrm = new URLSearchParams(document.location.search);
    const landingZone = queryPrm.get("landingZone");
    const cloudName = queryPrm.get("cloudName")?.toUpperCase();
    return { cloudName, landingZone };
  };

  getSubChild = (activeNode, currentLevel, nodeIndex) => {
    let retData = "";
    let { activeView } = this.state;
    if (activeView.length > 3) {
      retData = this.props.data;

      for (let level = 1; level <= currentLevel; level++) {
        if (activeView[level] !== 0 && activeView[level] !== -1) {
          let verticalIndex = parseInt(activeView[level].split(".")[0]);
          let currentIndex = parseInt(activeView[level].split(".")[1]);
          let keyName =
            verticalIndex === 0 ? "productEnclaveList" : "globalServiceList";

          if (retData?.[keyName]) {
            retData = retData[keyName][currentIndex];
          }
          if (level === currentLevel) {
            return retData;
          }
        }
      }
    }
  };

  previousCurrentNode = () => {
    let viewDetails = getSelectedInfraTopologyView();

    if (viewDetails) {
      let {
        currentActiveNode,
        activeView,
        id,
        currentLevel,
        sublevelIndex,
        nodeIndex,
      } = viewDetails;

      this.setState(
        {
          currentActiveNode,
        },
        () => {
          this.zoomToElementCallback();
        }
      );
      this.props.setCurrentActiveNode(currentActiveNode, activeView, id);
      this.handleNodeClick(currentLevel, sublevelIndex, nodeIndex);
    }
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
