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
let blueOrOrangeBoxElement = {
  Payroll: { label: "3 TIER", className: "blue" },
  HRMS: { label: "3 TIER", className: "blue" },
  Procurement: { label: "3 TIER", className: "blue" },
  "Postgres SQL": { label: "Data", className: "blue" },
  Redis: { label: "Data", className: "blue" },
  "Dynamo DB": { label: "Data", className: "blue" },
  "Java Spring boot": { label: "APP", className: "orange" },
  Accounts: { label: "SOA", className: "orange" },
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
            className={"chart-box active"}
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
        let currentLevel = `selectedLevel_${selectedLevel}`;
        let isActive =
          selectedActiveBAMLevels[currentLevel]?.id === currentLevelIndex;
        let elementId = `${currentLevel}_${currentLevelIndex}`;
        let relationsData = isActive
          ? this.onClickLevelsThenDrawLine(selectedLevel)
          : [];
        let blueOrOrangeBoxEle = blueOrOrangeBoxElement[level.label];
        return (
          <ArcherElement id={elementId} relations={relationsData} key={v4()}>
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
              <span>
                <img src={level.image} alt={level.label} />
              </span>
              <div className="content">
                <p>{level.label}</p>
                {blueOrOrangeBoxEle ? (
                  <div className={`box ${blueOrOrangeBoxEle?.className}`}>
                    {blueOrOrangeBoxEle?.label}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {isActive &&
              level.children.length === 0 &&
              BAMData.length === selectedLevel + 1 ? (
                <i className="fa-solid fa-circle-plus"></i>
              ) : (
                <></>
              )}
            </li>
          </ArcherElement>
        );
      });
    }
  };

  /** Render All BAM Levels
   * BAM = Business Association Mapping
   */
  renderAllBAMLevel = () => {
    const { BAMData } = this.state;
    if (BAMData.length) {
      return BAMData.map((levelData, selectedLevel) => {
        if (levelData.length) {
          return (
            <div
              className={` global-servies`}
              style={{ width: "160px" }}
              key={v4()}
            >
              <ul>{this.renderBAMLevel(levelData, selectedLevel)}</ul>
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

      this.props.setBreadCrumbs(selectedActiveBAMLevels, BAMData);
      this.setState({ selectedActiveBAMLevels, BAMData });
    } else {
      let activeBAMLevel = selectedActiveBAMLevels[currentSelectedLevelIndex];

      if (activeBAMLevel) {
        if (activeBAMLevel?.id === currentLevelIndex) {
          // Remove all selected level greater than current selected level
          Object.keys(selectedActiveBAMLevels).forEach((item, inIndex) => {
            let level = item.split("_")[1];
            if (level && selectedLevel <= level) {
              delete selectedActiveBAMLevels[item];
            }
          });
          BAMData.length = selectedLevel + 1;
          this.props.setBreadCrumbs(selectedActiveBAMLevels, BAMData);
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
  replaceDataOnSpecificIndex(selectedLevel, label, currentLevelIndex) {
    let { selectedActiveBAMLevels, BAMData } = this.state;
    let dataGet = this.props.data.children[0];
    let currentSelectedLevelIndex = `selectedLevel_${selectedLevel}`;

    selectedActiveBAMLevels[currentSelectedLevelIndex] = {
      id: currentLevelIndex,
      label,
    };
    BAMData.length = selectedLevel + 1;

    Object.keys(selectedActiveBAMLevels).forEach((item, inIndex) => {
      let level = item.split("_")[1];

      // If - Remove all selected level greater than current selected level
      // else - Get selected level data

      if (selectedLevel < level) {
        delete selectedActiveBAMLevels[item];
      } else {
        if (dataGet[selectedActiveBAMLevels[item].id]?.children) {
          dataGet = dataGet[selectedActiveBAMLevels[item].id]["children"];
        } else {
          dataGet = [];
        }
      }
    });

    // Replace data on specific index
    if (dataGet.length) {
      BAMData[selectedLevel + 1] = dataGet;
    }

    this.props.setBreadCrumbs(selectedActiveBAMLevels, BAMData);
    this.setState({ selectedActiveBAMLevels, BAMData });
  }

  /** Fire click event then draw
   * BAM = Business Association Mapping
   *  @param {Number} selectedLevel- The selectedLevel of BAM,
   */
  onClickLevelsThenDrawLine = (selectedLevel) => {
    let { BAMData, selectedActiveBAMLevels } = this.state;
    let selectedLevelIndex = selectedLevel >= 0 ? selectedLevel + 1 : 0;
    let activeBAMKeys = Object.keys(selectedActiveBAMLevels);

    if (BAMData.length && BAMData[selectedLevelIndex]) {
      return BAMData[selectedLevelIndex].map((item, index) => {
        let tempDrawArrow = JSON.parse(JSON.stringify(drawArrow));
        let currentId = `selectedLevel_${selectedLevelIndex}`;

        tempDrawArrow["targetId"] = `${currentId}_${index}`;

        let activeIndex = activeBAMKeys.indexOf(currentId);

        if (activeIndex >= 0) {
          let currentLevelIndex =
            selectedActiveBAMLevels[activeBAMKeys[activeIndex]]?.id;
          if (currentLevelIndex === index) {
            tempDrawArrow["style"]["strokeColor"] = "#53ca43";
            tempDrawArrow["style"]["endShape"]["circle"]["strokeColor"] =
              "#53ca43";
            tempDrawArrow["style"]["endShape"]["circle"]["fillColor"] =
              "#53ca43";
            tempDrawArrow["order"] = 1;
          }
        }
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
