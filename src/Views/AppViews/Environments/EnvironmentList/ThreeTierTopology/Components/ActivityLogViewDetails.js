import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ArcherContainer } from "react-archer";
import longArrow from "assets/img/assetmanager/long-arrow.png";

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
            this.setState({ scale: true });
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {({ zoomIn, zoomOut, instance, zoomToElement, ...rest }) => {
            return (
              <React.Fragment>
                <Box className="gmnoprint">
                  <Box className="gmnoprint-plus-minus">
                    <button className="btn btn-plus" onClick={() => zoomIn()}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="btn btn-minus" onClick={() => zoomOut()}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </Box>
                </Box>
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
      <Box className="activityLogViewDetails-container">
        <Box className="list-heading">
          <h4 className="m-t-0 m-b-0">Failover Graph</h4>
          <Button
            className="primary-btn min-width"
            variant="contained"
            onClick={this.props.backToDRS}
          >
            Back
          </Button>
        </Box>
        <Box className="topology-panel">
          <Box className="topology-panel-body" style={{ height: "auto" }}>
            {this.renderSteps()}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ActivityLogViewDetails;
