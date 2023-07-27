import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { Box, Grid } from "@mui/material";
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
        strokeWidth: -1.8,
      },
    },
  },
};
class BusinessAssociationMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedActiveBAMLevels: {},
      BAMData: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.clickBreadCrumbDetails?.breadcrumbId !==
      this.props.clickBreadCrumbDetails?.breadcrumbId
    ) {
      let { selectedLevel, currentLevelIndex, label, isIntialClick } =
        this.props.clickBreadCrumbDetails;
      if (isIntialClick) {
        this.onClickLevels({}, 1);
      } else {
        this.onClickLevels({ selectedLevel, currentLevelIndex, label });
      }
    }
  }

  /**
   * BAM = Business Association Mapping
   * Render the main body including all levels data.
   */
  renderBAMMainBody = () => {
    let { data } = this.props;
    let { selectedActiveBAMLevels } = this.state;
    return Object.keys(data).length &&
      (data?.children[0].length || data?.children[1].length) ? (
      <ArcherContainer className="chart-container" startMarker>
        <ArcherElement
          id="root"
          relations={this.onClickLevelsThenDrawLine()}
          // className="chart-container"
        >
          <div
            className="chart-box active"
            onClick={() => {
              this.onClickLevels({}, 1);
            }}
          >
            <img src={data.image} alt="Logo" />
          </div>
        </ArcherElement>
        {this.renderAllBAMLevel()}
      </ArcherContainer>
    ) : (
      ""
    );
  };

  /**
   * BAM = Business Association Mapping
   * Render specific level
   *  @param {Array} data - The data of the selected level.
   * @param {Number} selectedLevel - SelectedLevel.
   *
   */
  renderBAMLevel = (data, selectedLevel) => {
    let { selectedActiveBAMLevels, BAMData } = this.state;
    if (data.length) {
      return data.map((level, currentLevelIndex) => {
        let isActive =
          selectedActiveBAMLevels[`selectedLevel_${selectedLevel}`]?.id ===
          currentLevelIndex;
        let elementId = `selectedLevel_${selectedLevel}_${currentLevelIndex}`;
        return (
          <ArcherElement
            id={elementId}
            relations={
              isActive ? this.onClickLevelsThenDrawLine(selectedLevel) : []
            }
            key={v4()}
          >
            <li
              className={`${isActive ? "active" : ""}`}
              onClick={() => {
                this.onClickLevels({
                  selectedLevel,
                  currentLevelIndex,
                  label: level.label,
                });
              }}
              key={v4()}
            >
              <i className="fa-solid fa-circle-plus"></i>
              <span>
                <img src={level.image} alt={level.label} />
              </span>
              <div className="content">
                <p>{level.label}</p>
                <div className="box blue orange">SOA</div>
              </div>
            </li>
          </ArcherElement>
        );
      });
    }
  };

  /** Render All BAM Levels
   * BAM = Business Association Mapping
   *  @param {Array} data - The data of the selected level.
   * @param {Number} selectedLevel - SelectedLevel.
   *
   */
  renderAllBAMLevel = () => {
    const { BAMData } = this.state;
    if (BAMData.length) {
      return BAMData.map((html, selectedLevel) => {
        if (html.length) {
          return (
            <div
              className={` global-servies`}
              style={{ width: "160px" }}
              key={v4()}
            >
              <ul>{this.renderBAMLevel(html, selectedLevel)}</ul>
            </div>
          );
        }
      });
    }
  };

  /** Fire click event BAM Level
   * BAM = Business Association Mapping
   *  @param {Object} - Get selectedLevel, current click index and label,
   * @param {Number} isIntialClick - Check If it is click from root level (first) ,then return 1 or default value 0
   */
  onClickLevels(
    { selectedLevel, currentLevelIndex, label },
    isIntialClick = 0
  ) {
    let { selectedActiveBAMLevels, BAMData } = this.state;
    let currentSelectedLevelIndex = `selectedLevel_${selectedLevel}`;

    if (isIntialClick) {
      let { children } = this.props.data;
      BAMData = BAMData.length ? [] : [children[0]];
      selectedActiveBAMLevels = {};
      this.props.setBreadCrumbs(selectedActiveBAMLevels);
      this.setState({ selectedActiveBAMLevels, BAMData });
    } else {
      if (selectedActiveBAMLevels[currentSelectedLevelIndex]) {
        if (
          selectedActiveBAMLevels[currentSelectedLevelIndex]?.id ===
          currentLevelIndex
        ) {
          // Remove all selected level greater than current selected level
          Object.keys(selectedActiveBAMLevels).forEach((item, inIndex) => {
            let level = item.split("_")[1];
            if (level && selectedLevel <= level) {
              delete selectedActiveBAMLevels[item];
            }
          });
          BAMData.length = selectedLevel + 1;
          this.props.setBreadCrumbs(selectedActiveBAMLevels);
          this.setState({
            BAMData,
            selectedActiveBAMLevels,
          });
        } else {
          this.replaceDataOnSpecificIndex(
            selectedLevel,
            label,
            currentLevelIndex
          );
        }
      } else {
        this.replaceDataOnSpecificIndex(
          selectedLevel,
          label,
          currentLevelIndex
        );
      }
    }
  }

  /** Replace data on specific index in selectedBAMHtml state
   * BAM = Business Association Mapping
   *  @param {Number} selectedLevel- The selectedLevel of BAM,
   * @param {String} label - Current click label of BAM
   * @param {Number} currentLevelIndex - Current click level index of BAM
   */
  replaceDataOnSpecificIndex(
    selectedLevel,
    label,
    currentLevelIndex,
    isReplaceData = 0
  ) {
    let { selectedActiveBAMLevels, BAMData } = this.state;
    let dataGet = this.props.data.children[0];
    let currentSelectedLevelIndex = `selectedLevel_${selectedLevel}`;
    selectedActiveBAMLevels[currentSelectedLevelIndex] = {
      id: currentLevelIndex,
      label,
    };
    // Remove all selected level greater than current selected level
    Object.keys(selectedActiveBAMLevels).forEach((item, inIndex) => {
      let level = item.split("_")[1];
      if (selectedLevel < level) {
        delete selectedActiveBAMLevels[item];
      }
    });
    BAMData.length = selectedLevel + 1;

    // Get selected level data
    Object.keys(selectedActiveBAMLevels).forEach((item, inIndex) => {
      if (dataGet[selectedActiveBAMLevels[item].id]?.children) {
        dataGet = dataGet[selectedActiveBAMLevels[item].id]["children"];
      } else {
        dataGet = [];
      }
    });

    // Replace data on specific index
    if (dataGet.length) {
      BAMData[selectedLevel + 1] = dataGet;
    }
    this.props.setBreadCrumbs(selectedActiveBAMLevels);
    this.setState({ selectedActiveBAMLevels, BAMData });
  }

  /** Fire click event then draw
   * BAM = Business Association Mapping
   *  @param {Number} selectedLevel- The selectedLevel of BAM,
   * @param {String} label - Current click label of BAM
   * @param {Number} currentLevelIndex - Current click level index of BAM
   */
  onClickLevelsThenDrawLine = (selectedLevel) => {
    let { BAMData } = this.state;
    let selectedLevelIndex = selectedLevel >= 0 ? selectedLevel + 1 : 0;

    if (BAMData.length && BAMData[selectedLevelIndex]) {
      return BAMData[selectedLevelIndex].map((item, index) => {
        let tempDrawArrow = Object.assign({}, drawArrow);
        tempDrawArrow[
          "targetId"
        ] = `selectedLevel_${selectedLevelIndex}_${index}`;
        return tempDrawArrow;
      });
    } else {
      return [];
    }
  };

  render() {
    return this.renderBAMMainBody();
  }
}

export default BusinessAssociationMapping;
