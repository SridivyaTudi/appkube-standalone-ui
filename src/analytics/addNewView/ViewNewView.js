// Libraries
import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { updateLocation } from 'app/core/actions';
// import { CustomNavigationBar } from 'app/core/components/CustomNav';
// import { DeleteTabPopup } from '../DeleteTabPopup';
// import { UncontrolledPopover, PopoverBody } from 'reactstrap';
//import CustomDashboardLoader from '../../custom-dashboard-loader';
//import { config } from '../../config';
//import { locationService } from '@grafana/runtime';

// interface Props {
//   $scope;
//   $injector;
//   ref;
//   hidedashboardView;
// }

class ViewNewView extends Component{
  // openDeleteTabRef;
  // breadCrumbs = [
  //   {
  //     label: 'Home',
  //     route: `/`,
  //   },
  //   {
  //     label: 'Analytics',
  //     route: `/analytics`,
  //   },
  //   {
  //     label: 'New View',
  //     isCurrentPage: true,
  //   },
  // ];
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      activeTab: 0,
      activeSideTab: 0,
      loading: false,
      viewName: '',
      description: '',
      id: '',
    };
  }

  setData = (tabs, viewData) => {
    const data = [];
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      const dashboardList = tab.dashboardList;
      const selectedDashboards = [];
      for (let j = 0; j < dashboardList.length; j++) {
        let subData = dashboardList[j].subData;
        for (let k = 0; k < subData.length; k++) {
          if (subData[k].checkValue) {
            selectedDashboards.push(subData[k]);
          }
        }
      }
      data.push({
        label: tab.label,
        dashboards: selectedDashboards,
      });
    }
    this.setState({
      tabs: data,
      viewName: viewData.viewName,
      description: viewData.description,
      id: viewData.id,
    });
  };

  displayTabs = () => {
    const { tabs, activeTab } = this.state;
    const retData = [];
    for (let i = 0; i < tabs.length; i++) {
      let tab = tabs[i];
      retData.push(
        <li key={`tab-${i}`} className={`nav-item `}>
          <a className={i === activeTab ? 'nav-link active' : 'nav-link'} onClick={(e) => this.setActiveTab(i)}>
            <span>{tab.label}</span>
          </a>
        </li>
      );
    }
    return retData;
  };

  setActiveTab(index) {
    this.setState({
      activeTab: index,
      activeSideTab: 0,
    });
  }

  setActiveSideTab = (index) => {
    this.setState({
      activeSideTab: index,
    });
  };

  renderSideBar = () => {
    const { activeTab, tabs, activeSideTab } = this.state;
    let retData = [];
    const sidebarData = tabs[activeTab];
    if (sidebarData) {
      const dashboards = sidebarData.dashboards;
      for (let i = 0; i < dashboards.length; i++) {
        let sideData = dashboards[i];
        retData.push(
          <li>
            <a>
              <span className={i === activeSideTab ? 'active' : ''} onClick={() => this.setActiveSideTab(i)}>
                {sideData.title}
              </span>
            </a>
          </li>
        );
      }
    }
    return retData;
  };

  // createDashboard = () => {
  //   const { activeTab, activeSideTab, tabs } = this.state;
  //   let retData = [];
  //   if (tabs[activeTab] && tabs[activeTab].dashboards && tabs[activeTab].dashboards.length > 0) {
  //     const dashboards = tabs[activeTab].dashboards;
  //     for (let j = 0; j < dashboards.length; j++) {
  //       const dashboard = dashboards[j];
  //       retData.push(
  //         <div key={dashboard.uid}>
  //           {activeSideTab === j && (
  //             <CustomDashboardLoader
  //               $scope={this.props.$scope}
  //               $injector={this.props.$injector}
  //               urlUid={dashboard.uid}
  //               urlSlug={dashboard.slug}
  //             />
  //           )}
  //         </div>
  //       );
  //     }
  //   }
  //   return retData;
  // };

  saveDashboard = () => {
    //TO DO: if id is available, call edit api
    const { tabs, viewName, description, id } = this.state;
    const formData = new FormData();
    formData.append('viewName', viewName);
    formData.append('description', description);
    formData.append('viewJson', JSON.stringify(tabs));
    let requestOptions = {
      method: `POST`,
      body: formData,
    };
    this.setState({
      loading: true,
    });
    // fetch(`${config.ADD_ANALYTICS_VIEW}`, requestOptions).then((response) => {
    //   this.setState({
    //     loading: false,
    //   });
    //   locationService.push('/analytics');
    // });

    //Delete it after api works properly
    const data = localStorage.getItem('dashboardList');
    let sendData = [];
    if (data) {
      sendData = JSON.parse(data);
    }
    if (id) {
      let index = -1;
      for (let i = 0; i < sendData.length; i++) {
        if (sendData[i].id === id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        sendData[index] = {
          name: viewName,
          viewJson: tabs,
          description: description,
          id: id,
        };
      }
    } else {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      sendData.push({ name: viewName, viewJson: tabs, description: description, id: result });
    }
    localStorage.setItem('dashboardList', JSON.stringify(sendData));
    // setTimeout(() => {
    //   locationService.push('/analytics');
    // }, 5000);
  };

  render() {
    const breadCrumbs = this.breadCrumbs;
    const pageTitle = 'ANALYTICS';
    const { loading } = this.state;
    return (
      <React.Fragment>
        <div className="breadcrumbs-container">
          {pageTitle && <div className="page-title">{pageTitle}</div>}
          {/* <div className="breadcrumbs">
            {breadCrumbs.map((breadcrumb, index) => {
              if (breadcrumb.isCurrentPage) {
                return (
                  <span key={index} className="current-page">
                    {breadcrumb.label}
                  </span>
                );
              } else {
                return (
                  <React.Fragment key={index}>
                    <a href={`${breadcrumb.route}`} className="breadcrumbs-link">
                      {breadcrumb.label}
                    </a>
                    <span className="separator">
                      <i className="fa fa-chevron-right"></i>
                    </span>
                  </React.Fragment>
                );
              }
            })}
          </div> */}
        </div>
        <div className="analytics-container">
          <div className="analytics-heading-container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <h4 style={{ lineHeight: '36px' }}>NGINX</h4>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="d-block text-right">
                  <a>
                    <button
                      className="analytics-white-button min-width-auto m-r-1"
                      onClick={() => this.props.hidedashboardView()}
                    >
                      <i className="fa fa-arrow-circle-left"></i>
                      &nbsp;&nbsp;Back
                    </button>
                    <button
                      disabled={loading}
                      className={`analytics-blue-button ${loading ? 'disabled' : ''}`}
                      onClick={this.saveDashboard}
                    >
                      Save and add to View list
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="analytics-tabs-container">
            <ul className="nav nav-tabs">{this.displayTabs()}</ul>
            <div className="analytics-tabs-section-container">
              <div className="tabs-left-section">
                <ul>{this.renderSideBar()}</ul>
              </div>
              <div className="tabs-right-section">
                {/* <div>{this.createDashboard()}</div> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ViewNewView;
