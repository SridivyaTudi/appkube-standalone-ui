import { Component } from "react";
import { Box, Button } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
let transformScale = 0;
class ActivityLogViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // Render activity log steps
  renderSteps = () => {
    return (
      <TransformWrapper
        onTransformed={(instance) => {
          transformScale = instance && instance.state.scale;
          this.setState({ scale: true });
        }}
      >
        {({ zoomIn, zoomOut, instance, zoomToElement, ...rest }) => {
          transformScale = instance.transformState.scale;
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
              ></TransformComponent>
            </>
          );
        }}
      </TransformWrapper>
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
            Back to DRS
          </Button>
        </Box>
        <Box className="tabs-content">{this.renderSteps()}</Box>
      </Box>
    );
  }
}

export default ActivityLogViewDetails;
