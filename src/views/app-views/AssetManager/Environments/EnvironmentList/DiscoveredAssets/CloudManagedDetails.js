import React from "react";
import { Box, List, ListItem } from "@mui/material";
import AllTable from "./AllTable";
import AppTable from "./AppTable";
import DataTable from "./DataTable";
import DataLakeTable from "./DataLakeTable";
import ServiceMeshTable from "./ServiceMeshTable";

class CloudManagedDetails extends React.Component {
  tableMapping = [
    {
      name: "All",
      dataKey: "all",
      component: AllTable,
    },
    {
      name: "App",
      dataKey: "app",
      component: AppTable,
    },
    {
      name: "Data",
      dataKey: "data",
      component: DataTable,
    },
    {
      name: "Datalake",
      dataKey: "datalake",
      component: DataLakeTable,
    },
    {
      name: "ServiceMesh",
      dataKey: "servicemesh",
      component: ServiceMeshTable,
    },
  ];
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <Box className="global-service-penal">
        <Box className="services-panel-tabs">
          <Box className="tabs-head">
            <List>
              {this.tableMapping.map((tabData, index) => {
                return (
                  <ListItem
                    key={`ops-tab-${index}`}
                    className={index === activeTab ? "active" : ""}
                    onClick={() => this.setActiveTab(index)}
                  >
                    {tabData.name}
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box className="tabs-content">
            {activeTab === 0 ? (
              <AllTable />
            ) : activeTab === 1 ? (
              <AppTable />
            ) : activeTab === 2 ? (
              <DataTable />
            ) : activeTab === 3 ? (
              <DataLakeTable />
            ) : activeTab === 4 ? (
              <ServiceMeshTable />
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default CloudManagedDetails;
