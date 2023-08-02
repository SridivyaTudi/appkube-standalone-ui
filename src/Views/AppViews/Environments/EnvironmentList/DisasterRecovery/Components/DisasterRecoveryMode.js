import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
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
        fillColor: "#6a6a9f",
        strokeColor: "#6a6a9f",
        strokeWidth: -1.2,
      },
    },
  },
};

class DisasterRecoveryMode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          // className="chart-container"
        >
          <>{this.renderLevel1DisasterRecovery()}</>
        </ArcherElement>
        {this.renderLevel2DisasterRecovery()}
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
          <div className={"chart-box active"} key={v4()}>
            <img src={level1.image} alt="Logo" />
            <span>{level1.label}</span>
            <span>{level1.subLabel}</span>
          </div>
        );
      });
    }
  };

  /** Render Level-2 DisasterRecovery
   */
  renderLevel2DisasterRecovery = () => {
    let { children } = this.props.data;
    if (children.length) {
      return children.map((level, index) => {
        let elementId = `selectedLevel_${index}`;
        return (
          <ArcherElement id={elementId} key={v4()}>
            <li key={v4()}>
              <span>
                <img src={level.image} alt={level.label} />
              </span>
              <div className="content">
                <p>{level.label}</p>
              </div>
            </li>
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
  render() {
    return this.renderDisasterRecoveryMainBody();
  }
}

export default DisasterRecoveryMode;
