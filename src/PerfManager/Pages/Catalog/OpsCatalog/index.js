import React from "react";
import CloudDashboards from "./CloudDashboards";
import DataSources from "./DataSources";
import ProvisioningTemplates from "./ProvisionTemplate";
import Collectors from "./Collectors";
import Diagonostics from "./Diagonostics";
import KubeOperators from "./KubeOperators";
import Workflows from "./Workflows";

class OpsCatalogue extends React.Component {
  tabMapping = [
    {
      name: "Cloud Dashboards",
      dataKey: "cloudDashBoards",
      component: CloudDashboards,
    },
    {
      name: "Datasources",
      dataKey: "dataSources",
      component: DataSources,
    },
    {
      name: "Provisioning Templates",
      dataKey: "provisioningTemplates",
      component: ProvisioningTemplates,
    },
    {
      name: "Collectors",
      dataKey: "collectors",
      component: Collectors,
    },
    {
      name: "Diagonostics",
      dataKey: "diagonostics",
      component: Diagonostics,
    },
    {
      name: "Kube Operators",
      dataKey: "kubeOperators",
      component: KubeOperators,
    },
    {
      name: "Workflows",
      dataKey: "workflows",
      component: Workflows,
    },
  ];

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

export default OpsCatalogue;
