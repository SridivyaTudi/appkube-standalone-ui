import React, { Component } from 'react';
import  DevCatalogue  from './devCatalog';
import  SecCatalogue  from './secCatalog';
import  OpsCatalogue  from './opsCatalog';

class Catalog extends Component {
  tabMapping = [{
    name: "DEV",
    dataKey: 'dev',
    component: DevCatalogue
  }, {
    name: "SEC",
    dataKey: 'sec',
    component: SecCatalogue
  }, {
    name: "OPS",
    dataKey: 'ops',
    component: OpsCatalogue
  }];

  constructor(props) {
    super(props)
    this.state = {
      catalogueData: {},
      activeTab: 0,
      filterData: [
        { 'name': 'Filter 1', 'id': 1, 'isHide': 'true' },
        { 'name': 'Filter 2', 'id': 2, 'isHide': 'true' },
        { 'name': 'Filter 3', 'id': 3, 'isHide': 'true' },
        { 'name': 'Filter 4', 'id': 4, 'isHide': 'true' },
        { 'name': 'Filter 5', 'id': 5, 'isHide': 'true' },
        { 'name': 'Filter 6', 'id': 6, 'isHide': 'true' },
        { 'name': 'Filter 7', 'id': 7, 'isHide': 'true' },
      ],
      searchString: '',
      showPreview: false,
      searchKey: '',
    }
    
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab })
  }

  render() {
    const { catalogueData, activeTab } = this.state;
    return (
      <div className="perfmanager-dashboard-container">
        {/* <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="CATALOGUE MANAGEMENT" /> */}
        <div className="catalogue-management-container">
          <div className="common-container">
            <div className="catalogue-tabs">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <ul>
                    {
                      this.tabMapping.map((tabData, index) => {
                        return (
                          <li key={`ops-tab-${index}`}
                            className={index === activeTab ? 'active' : ''}
                            onClick={(e) => this.setActiveTab(index)}>
                            {tabData.name}
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className="catalogue-tabs-container">
              {
                this.tabMapping.map((tabData, index) => {
                  if (activeTab === index) {
                    return <tabData.component data={catalogueData[tabData.dataKey]} />;
                  } else {
                    return <></>;
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Catalog;