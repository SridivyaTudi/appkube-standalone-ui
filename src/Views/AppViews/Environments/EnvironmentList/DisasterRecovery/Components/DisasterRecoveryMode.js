import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { Button, List, ListItem } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import StepsStartedPopup from "./StepsStartedPopup";
import { v4 } from "uuid";

let drawArrow = {
  targetId: "",
  targetAnchor: "left",
  sourceAnchor: "right",
  style: {
    strokeColor: "#d8d8ed",
    strokeWidth: 2,
    endShape: {
      circle: {
        radius: 1.3,
        fillColor: "#00B929",
        strokeColor: "#00B929",
        strokeWidth: -1.2,
      },
    },
  },
};

class DisasterRecoveryMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStepsStartedPopup: false,
    };
  }

  /**
   * Render the main body for DisasterRecovery
   */
  renderDisasterRecoveryMainBody = () => {
    let { data } = this.props;

    return Object.keys(data).length ? (
      <ArcherContainer className="chart-container" startMarker>
        <ArcherElement
          id="root"
          relations={this.drawLineLevel1DisasterRecovery()}
        >
          <div className="chart-left">
            {this.renderLevel1DisasterRecovery()}
          </div>
        </ArcherElement>
        <div className="chart-right">{this.renderLevel2DisasterRecovery()}</div>
      </ArcherContainer>
    ) : (
      ""
    );
  };

  /** Render Level-1 DisasterRecovery
   */
  renderLevel1DisasterRecovery = () => {
    let { subData } = this.props.data;
    if (subData.length) {
      return subData.map((level1) => {
        return (
          <div className={"chart-box"} key={v4()}>
            <div className="icon">
              <img src={level1.image} alt="Logo" />
            </div>
            <div className="contents">
              <span>{level1.label}</span>
              <strong>{level1.subLabel}</strong>
            </div>
          </div>
        );
      });
    }
  };

  toggleStepsStartedPopup = () => {
    this.setState({
      showStepsStartedPopup: !this.state.showStepsStartedPopup,
    });
  };

  /** Render Level-2 DisasterRecovery
   */
  renderLevel2DisasterRecovery = () => {
    let { children } = this.props.data;
    if (children.length) {
      return children.map((level, index) => {
        let elementId = `selectedLevel_${index}`;
        const HtmlTooltip = styled(({ className, ...props }) => (
          <Tooltip {...props} arrow classes={{ popper: className }} />
        ))(({ theme }) => ({
          [`& .${tooltipClasses.arrow}`]: {
            color: "#16161E",
          },
          [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "#16161E",
            color: "#FFFFFF",
            maxWidth: 250,
            fontSize: theme.typography.pxToRem(12),
            border: "1px solid #16161E",
          },
        }));

        let {
          steps: { stepData, children },
        } = level;
        return (
          <ArcherElement id={elementId} key={v4()}>
            <div className="primary-box" key={v4()}>
              <HtmlTooltip
                className="primary-tooltip"
                title={
                  <React.Fragment>
                    <List>
                      <ListItem>Hosted : EC2</ListItem>
                      <ListItem>EC2 ID : 1513646</ListItem>
                      <ListItem>RPO Status : 1.5 hr</ListItem>
                      <ListItem>RTO Status : 2.5 min</ListItem>
                    </List>
                  </React.Fragment>
                }
              >
                <div className="button-box">
                  <span>
                    <img src={level.image} alt={level.label} />
                  </span>
                  <div className="content">
                    <p>{level.label}</p>
                  </div>
                </div>
              </HtmlTooltip>
              <div className="provision">
                <ul>{this.renderEventTypeLines(stepData)}</ul>
              </div>
              <div
                className={`button-box ${
                  children.className ? children.className : "green"
                }`}
              >
                <span>
                  <img src={children.image} alt={children.label} />
                </span>
                <p>{children.label}</p>
              </div>
              <div className="buttons-box">
                <ul>
                  <li>
                    <Button
                      className="primary-outline-btn min-width"
                      variant="outlined"
                      onClick={this.toggleStepsStartedPopup}
                    >
                      <i className="fa-solid fa-play"></i>
                    </Button>
                    <span>Start</span>
                  </li>
                  <li>
                    <Button
                      className="primary-outline-btn min-width"
                      variant="outlined"
                    >
                      <i className="fa-solid fa-bore-hole"></i>
                    </Button>
                    <span>Drill</span>
                  </li>
                  <li>
                    <Button
                      className="primary-outline-btn min-width"
                      variant="outlined"
                    >
                      <i className="fa-solid fa-repeat"></i>
                    </Button>
                    <span>Provision</span>
                  </li>
                </ul>
              </div>
            </div>
          </ArcherElement>
        );
      });
    }
  };

  /** Draw Lines for Level-1 DisasterRecovery
   */
  drawLineLevel1DisasterRecovery = () => {
    let { children } = this.props.data;
    if (children.length) {
      return children.map((item, index) => {
        let tempDrawArrow = JSON.parse(JSON.stringify(drawArrow));
        tempDrawArrow["targetId"] = `selectedLevel_${index}`;
        return tempDrawArrow;
      });
    } else {
      return [];
    }
  };

  /** Event types render
   * * @param {array} EventTypes - data of Event types.
   */
  renderEventTypeLines = (EventTypes) => {
    if (EventTypes.length) {
      return EventTypes.map(({ label }) => <li key={v4()}>{label}</li>);
    }
  };
  render() {
    const { showStepsStartedPopup } = this.state;
    return (
      <>
        {this.renderDisasterRecoveryMainBody()}
        {showStepsStartedPopup ? (
          <StepsStartedPopup
            showModal={showStepsStartedPopup}
            toggleStepsStartedPopup={this.toggleStepsStartedPopup}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default DisasterRecoveryMode;
