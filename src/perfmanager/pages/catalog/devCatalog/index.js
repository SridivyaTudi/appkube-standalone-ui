import React from "react";
import AppBlocks from "./appBlocks";
import LibrarySdk from "./libraryAndSDKs";
import DeploymentTemplate from "./buildDeployTemp";
import ISVSolutions from "./iSVsolutions";
import DataFlow from "./dataflows";

class DevCatalogue extends React.Component {
  tabMapping = [
    {
      name: "App Block",
      dataKey: "appblock",
      component: AppBlocks,
    },
    {
      name: "Library/ SDKs",
      dataKey: "library",
      component: LibrarySdk,
    },
    {
      name: "Build/Deployment Template",
      dataKey: "deploymentTemplate",
      component: DeploymentTemplate,
    },
    {
      name: "ISV Solutions",
      dataKey: "isvSolutions",
      component: ISVSolutions,
    },
    {
      name: "Data Flow",
      dataKey: "dataflow",
      component: DataFlow,
    },
  ];
  previewDashboardPopupRef;
  constructor(props) {
    super(props);
    this.state = {
      catalogData: this.props.data || {},
      activeTab: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({
        catalogData: this.props.data,
      });
    }
  }

  setActiveTab = (activeTab) => {
    this.setState({
      activeTab,
    });
  };

  render() {
    const { catalogData, activeTab } = this.state;
    return (
      <>
        <div className="catalogue-inner-tabs">
          <ul>
            {this.tabMapping.map((tabData, index) => {
              return (
                <li
                  key={`ops-tab-${index}`}
                  className={index === activeTab ? "active" : ""}
                  onClick={(e) => this.setActiveTab(index)}
                >
                  {tabData.name}
                </li>
              );
            })}
          </ul>
        </div>

        {this.tabMapping.map((tabData, index) => {
          if (index === activeTab) {
            return <tabData.component data={catalogData[tabData.dataKey]} />;
          } else {
            return <></>;
          }
        })}
      </>
    );
  }
}

export default DevCatalogue;
