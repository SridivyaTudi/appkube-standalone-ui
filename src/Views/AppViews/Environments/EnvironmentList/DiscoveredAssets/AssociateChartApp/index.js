import React, { Component } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { v4 } from "uuid";

export class AssociateChartApp extends Component {
  constructor(props) {
    super(props);
    const queryPrm = new URLSearchParams(document.location.search);
    const cloudName = queryPrm.get("cloudName");
    this.state = {
      breadcrumbs: {
        breadcrumbId: v4(),
        cloudName: cloudName?.toUpperCase(),
        selectedLevel1: "",
        selectedLevel2: "",
      },
    };
  }

  /** Render the BreadCrumbs of Topologyview. */
  renderBreadCrumbs() {
    let { breadcrumbs } = this.state;
    let { selectedLevel1, selectedLevel2, cloudName } = breadcrumbs;
    let activeClassKey =
      cloudName && selectedLevel1 && !selectedLevel2
        ? "selectedLevel1"
        : selectedLevel1 && selectedLevel2
        ? "selectedLevel2"
        : "cloudName";
    let breadCrumbsData = Object.keys(breadcrumbs);

    return breadCrumbsData.map((breadCrumb, index) => {
      if (breadcrumbs[breadCrumb] && breadCrumb !== "breadcrumbId") {
        return (
          <>
            {breadCrumb !== "cloudName" ? (
              <li key={v4()}>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
            ) : (
              <></>
            )}
            <li
              onClick={() => {
                this.onClickBreadCrumbOfTopology(breadCrumb);
              }}
              className={`${activeClassKey === breadCrumb ? "active" : ""}`}
              key={v4()}
            >
              <a>
                {breadCrumb === "cloudName" || breadCrumb === "selectedLevel1"
                  ? breadcrumbs[breadCrumb]?.toUpperCase()
                  : breadCrumb === "selectedLevel2"
                  ? `${breadcrumbs[breadCrumb][0]?.toUpperCase()}${breadcrumbs[
                      breadCrumb
                    ].slice(1)}`
                  : breadcrumbs[breadCrumb]}
              </a>
            </li>
          </>
        );
      }
    });
  }

  render() {
    const {} = this.state;
    return (
      <Box className="environment-container associate-container">
        <Box className="breadcrumbs">
          <ul>{this.renderBreadCrumbs()}</ul>
        </Box>
        <Box className="associate-chart-container"></Box>
      </Box>
    );
  }
}
export default AssociateChartApp;
