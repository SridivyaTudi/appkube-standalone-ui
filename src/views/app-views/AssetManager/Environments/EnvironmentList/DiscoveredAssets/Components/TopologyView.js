import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Grid } from "@mui/material";
import ServicesNameLogo from "../../ServicesNameLogo";
import { getUUID } from "utils";
let transformScale = 0;

class TopologyView extends Component {
  constructor(props) {
    super(props);
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    this.state = {
      selectedView: {
        level2Show: false,
        selectedLevel1Id: null,
        selectedLevel2Id: null,
      },
      breadcrumbs: [
        {
          id: "service",
          name: cloudName,
          type: "service",
          serviceIndexs: {},
        },
      ],
    };
  }

  getCloudName() {
    const queryPrm = new URLSearchParams(document.location.search);
    return (
      ServicesNameLogo.ServicesName[queryPrm.get("cloudName").toUpperCase()] ||
      ""
    );
  }

  renderMainBody = () => {
    const { data } = this.props;
    let { level2Show, selectedLevel1Id } = this.state.selectedView;
    return Object.keys(data).length &&
      (data?.children[0].length || data?.children[1].length) ? (
      <ArcherContainer noCurves style={{ width: "100%", height: "100%" }}>
        <TransformWrapper
          onTransformed={(instance) => {
            transformScale = instance && instance.state.scale;
            this.setState({ scale: true });
          }}
        >
          {({ zoomIn, zoomOut, instance, zoomToElement, ...rest }) => {
            transformScale = instance.transformState.scale;
            return (
              <React.Fragment>
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
                      zoomToElement("custom_location", transformScale);
                    }}
                  >
                    <button className="btn btn-map">
                      <i className="fa-solid fa-map-marker-alt"></i>
                    </button>
                  </div>
                </div>
                <TransformComponent
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                  contentStyle={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    paddingTop: "120px",
                    transform: "translate(0px, 0px) scale(0)",
                  }}
                >
                  <ArcherElement
                    id="root"
                    relations={
                      selectedLevel1Id !== null && selectedLevel1Id >= 0
                        ? [
                            {
                              targetId:
                                selectedLevel1Id >= 0
                                  ? `level1_${selectedLevel1Id}`
                                  : "",
                              targetAnchor: "left",
                              sourceAnchor: "right",
                              style: {
                                strokeColor: "#a5a5d7",
                                strokeWidth: 2,
                              },
                            },
                          ]
                        : []
                    }
                  >
                    <div
                      className="services-text-box active"
                      onClick={() => {
                        this.onClickAccountId();
                      }}
                    >
                      <div className="d-flex">
                        <div className="account-image">
                          <img src={data.image} alt="aws image" />
                        </div>
                        <div className="account-id">
                          <span id="custom_location_1" className="d-block">
                            {data.label}
                          </span>
                          <span className="d-block">{data.subLabel}</span>
                        </div>
                      </div>
                    </div>
                  </ArcherElement>
                  <div
                    className={` ${
                      data?.children[0].length ? "global-servies" : ""
                    } `}
                  >
                    <ul>{this.renderLevel1()}</ul>
                  </div>
                  <div
                    className={` ${
                      level2Show ? "global-servies cluster-servies" : ""
                    }`}
                    style={{
                      marginTop: "0",
                      marginBottom: "0",
                      transform: "translateY(0%)",
                    }}
                  >
                    <ul>{level2Show && this.renderLevel2(selectedLevel1Id)}</ul>
                  </div>
                </TransformComponent>
              </React.Fragment>
            );
          }}
        </TransformWrapper>
      </ArcherContainer>
    ) : (
      ""
    );
  };

  renderLevel1 = () => {
    const { children } = this.props.data;
    const { selectedLevel1Id, selectedLevel2Id } = this.state.selectedView;
    if (children.length) {
      return children[0].map((level1, level1Index) => {
        return (
          <ArcherElement
            id={`level1_${level1Index}`}
            relations={
              level1Index === selectedLevel1Id && selectedLevel2Id !== null
                ? [
                    {
                      targetId:
                        level1Index === selectedLevel1Id &&
                        selectedLevel2Id >= 0
                          ? `level2_${selectedLevel2Id}`
                          : "",
                      targetAnchor: "left",
                      sourceAnchor: "right",
                      style: {
                        strokeColor: "#a5a5d7",
                        strokeWidth: 2,
                      },
                    },
                  ]
                : []
            }
            key={getUUID()}
          >
            <li
              className={`${level1Index === selectedLevel1Id ? "active " : ""}`}
              id={`${
                level1Index === selectedLevel1Id && selectedLevel2Id == null
                  ? "custom_location"
                  : ""
              }`}
              onClick={() => {
                this.onClickLevel1(level1Index, level1.label);
              }}
            >
              <span>
                <img src={level1.image} alt="" />
              </span>
              {this.getServiceName(level1.label, "vpc")}
            </li>
          </ArcherElement>
        );
      });
    }
  };

  renderLevel2(index) {
    const { children } = this.props.data;
    const { selectedLevel1Id, selectedLevel2Id } = this.state.selectedView;
    let data = children[0][index].children;

    if (data.length) {
      return data.map((level2, level2Index) => {
        return (
          <ArcherElement id={`level2_${level2Index}`} key={getUUID()}>
            <li
              onClick={() => {
                this.onClickLevel2(level2Index, level2.label);
              }}
              className={`${level2Index === selectedLevel2Id ? "active" : ""}`}
              id={`${
                level2Index === selectedLevel2Id && selectedLevel1Id >= 0
                  ? "custom_location"
                  : ""
              }`}
            >
              <span>
                <img src={level2.image} alt="" />
              </span>
              {this.getServiceName(level2.label)}
            </li>
          </ArcherElement>
        );
      });
    }
  }

  getServiceName(name, type) {
    if (type === "vpc") {
      return name ? name.toUpperCase() : "";
    } else {
      let firstChar = name ? name.charAt(0).toUpperCase() : "";
      let otherStr = name ? name.toLowerCase().slice(1) : "";
      let string = firstChar + otherStr;
      return string;
    }
  }

  onClickLevel1 = (id, label) => {
    let { level2Show, selectedLevel1Id, selectedLevel2Id } =
      this.state.selectedView;
    level2Show = true;
    selectedLevel1Id = id;
    selectedLevel2Id = null;
    this.props.setLevel(label);
    this.setState({
      selectedView: { level2Show, selectedLevel1Id, selectedLevel2Id },
    });
  };

  onClickLevel2 = (id, label) => {
    let { level2Show, selectedLevel1Id, selectedLevel2Id } =
      this.state.selectedView;
    selectedLevel2Id = id;
    this.props.setLevel(label);
    this.setState({
      selectedView: { level2Show, selectedLevel1Id, selectedLevel2Id },
    });
  };

  onClickAccountId = () => {
    let { level2Show, selectedLevel1Id, selectedLevel2Id } =
      this.state.selectedView;
    level2Show = false;
    selectedLevel1Id = null;
    selectedLevel2Id = null;
    this.setState({
      selectedView: { level2Show, selectedLevel1Id, selectedLevel2Id },
    });
  };

  render() {
    return (
      <>
        <Grid item xs={7}>
          <Box className="services-panel">
            <Box className="services-panel-title bottom-border">
              <Box className="name">Topology View</Box>
              <Box className="back-btn">
                <i className="fa-solid fa-arrow-left"></i>
              </Box>
            </Box>
            <Box className="services-panel-body">{this.renderMainBody()}</Box>
          </Box>
        </Grid>
      </>
    );
  }
}

export default TopologyView;
