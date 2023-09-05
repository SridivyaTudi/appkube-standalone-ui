import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ArcherContainer } from "react-archer";
import { BurstMode } from "@mui/icons-material";
import longArrow from "assets/img/assetmanager/long-arrow.png";

let transformScale = 0;

class ActivityLogViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Render activity log steps
  renderSteps = () => {
    return (
      <ArcherContainer noCurves style={{ width: "100%", height: "100%" }}>
        <TransformWrapper
          onTransformed={(instance) => {
            transformScale = instance && instance.state.scale;
            this.setState({ scale: true });
          }}
          style={{ width: "100%", height: "100%" }}
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
                </div>
                <TransformComponent
                  wrapperStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                  contentStyle={{
                    width: "100%",
                    height: "100%",
                    transform: "translate(0px, 0px) scale(0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ul className="failover-graph">
                    <li className="start">
                      <Button
                        className="primary-btn min-width"
                        variant="contained"
                      >
                        Start
                      </Button>
                      <span>
                        <img src={longArrow} alt="" />
                      </span>
                    </li>
                    <li>
                      <Button
                        className="primary-btn min-width"
                        variant="contained"
                      >
                        Failover Data Layer
                      </Button>
                      <span>
                        <img src={longArrow} alt="" />
                      </span>
                    </li>
                    <li>
                      <Button
                        className="primary-btn min-width"
                        variant="contained"
                      >
                        Check Data Layer Failover
                      </Button>
                      <span>
                        <img src={longArrow} alt="" />
                      </span>
                    </li>
                    <li>
                      <Button
                        className="primary-btn min-width"
                        variant="contained"
                      >
                        Data Layer Failed Verification
                      </Button>
                      <span>
                        <img src={longArrow} alt="" />
                      </span>
                    </li>
                    <li>
                      <Button
                        className="primary-btn min-width"
                        variant="contained"
                      >
                        Failover Auxiliary
                      </Button>
                      <span>
                        <img src={longArrow} alt="" />
                      </span>
                    </li>
                    <li>
                      <Button
                        className="primary-btn min-width"
                        variant="contained"
                      >
                        Failover App
                      </Button>
                      <span>
                        <img src={longArrow} alt="" />
                      </span>
                    </li>
                    <li className="red">
                      <Button
                        className="primary-btn min-width"
                        variant="contained"
                      >
                        Failover web
                      </Button>
                      <span>
                        <img src={longArrow} alt="" />
                      </span>
                    </li>
                    <li className="disabled">
                      <Button
                        className="primary-btn min-width"
                        variant="contained"
                      >
                        Switch DNS
                      </Button>
                      <span>
                        <img src={longArrow} alt="" />
                      </span>
                    </li>
                    <li className="end">
                      <Button
                        className="primary-btn min-width"
                        variant="contained"
                      >
                        End
                      </Button>
                    </li>
                  </ul>
                </TransformComponent>
              </React.Fragment>
            );
          }}
        </TransformWrapper>
      </ArcherContainer>
    );
  };
  render() {
    return (
      <Box className="services-panel-tabs">
        <Box className="tabs-head">
          <h3>Failover Graph</h3>
          <Button
            className="primary-btn min-width"
            variant="contained"
            onClick={this.props.backToDRS}
          >
            Back
          </Button>
        </Box>
        <Box className="tabs-content">
          <Box className="topology-panel">
            <Box className="topology-panel-body" style={{ height: "auto" }}>
              {this.renderSteps()}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ActivityLogViewDetails;
