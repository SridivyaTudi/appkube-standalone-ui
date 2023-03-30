import React, {Component} from 'react';
import Metrics from "../analytics/img/metrics.svg";
// Libraries
//import { updateLocation } from 'app/core/actions';
import Table from '../analytics/components/table';
import CreateNewViewPopup from './CreateNewViewPopup';
// import { config } from '../config';
//import { locationService } from '@grafana/runtime';
import  DeleteTabPopup  from './DeleteTabPopup';
//import { Link } from 'react-router-dom';

// Services & Utils
// export interface Props {
//   $scope;
//   $injector;
//   updateLocation: typeof updateLocation;
//   location;
// }

class Analytics extends Component {
  opencreateNewViewRef;
  openDeleteTabRef;
  breadCrumbs = [
    {
      label: 'Home',
      route: `/`,
    },
    {
      label: 'Analytics',
      isCurrentPage: true,
    },
  ];
  perPageLimit;
  checkboxValue;
  constructor(props) {
    super(props);
    this.perPageLimit = 6;
    this.checkboxValue = false;
    this.state = {
      viewList: [],
      columns: [
        {
          label: 'Name',
          key: 'viewName',
          renderCallback: (value, view) => {
            return (
              <td>
                <div style={{ color: '#0099ff', cursor: 'pointer' }} onClick={() => this.editDashbord(view)}>
                  {value}
                </div>
              </td>
            );
          },
        },
        // {
        // 	label: 'Description',
        // 	key: 'description'
        // },
        // {
        // 	label: 'Created By',
        // 	key: 'createdBy'
        // },
        // {
        // 	label: 'Last Modified',
        // 	key: 'updatedOn'
        // },
        {
          label: 'Action',
          key: 'action',
          renderCallback: (value, viewObj) => {
            return (
              <td>
                <div className="d-inline-block">
                  {/* <button className="btn btn-link" onClick={() => this.editDashbord(viewObj)}>
                    <i className="fa fa-edit" />
                  </button> */}
                  <button className="btn btn-link" onClick={() => this.onClickDelete(viewObj)}>
                    <i className="fa fa-trash" />
                  </button>
                </div>
              </td>
            );
          },
        },
      ],
      viewToDelete: null,
      isDeleting: false,
    };
    this.opencreateNewViewRef = React.createRef();
    this.openDeleteTabRef = React.createRef();
  }

  onClickDelete = (viewObj) => {
    console.log(viewObj);
    this.setState({
      viewToDelete: viewObj,
    });
    this.openDeleteTabRef.current.toggle();
  };

  // editDashbord = (viewObj) => {
  //   locationService.push(
  //     `/a/xformation-assetmanager-ui-plugin/view-storage-details?accountId=${viewObj.accountId}&&viewId=${viewObj.id}`
  //   );
  // };

  deleteView = () => {
    const { viewToDelete } = this.state;
    console.log(viewToDelete);
    if (viewToDelete) {
      this.setState({
        isDeleting: true,
      });

      let data = localStorage.getItem('viewData');
      let index = -1;
      if (data) {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === viewToDelete.id) {
            index = i;
            break;
          }
        }
        if (index !== -1) {
          data.splice(index, 1);
          localStorage.setItem('viewData', JSON.stringify(data));
          this.setState({
            viewList: data,
          });
        }
      }
    }
  };

  removeViewFromTable = () => {
    const { viewToDelete, viewList } = this.state;
    if (viewToDelete) {
      let index = -1;
      for (let i = 0; i < viewList.length; i++) {
        if (viewList[i].id === viewToDelete.id) {
          index = i;
          break;
        }
      }
      if (index !== -1) {
        viewList.splice(index, 1);
        this.setState({
          viewList,
        });
      }
    }
  };

  componentDidMount() {
    this.getTableData();
  }

  getTableData = () => {
    // let requestOptionsGet = {
    //   method: `GET`,
    // };
    // fetch(`${config.ANALYTICS_LIST_VIEW}`, requestOptionsGet)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     if (response) {
    //       this.setState({
    //         viewList: response,
    //       });
    //     }
    //   });

    // Delete after api works
    let data = localStorage.getItem('viewData');
    data = JSON.parse(data);
    console.log(data);
    if (data && data.length > 0) {
      this.setState({ viewList: data });
    }
  };

  onClickCreateNewView = (e) => {
    this.opencreateNewViewRef.current.toggle();
  };

  // onClickView = (view) => {
  //   locationService.push(`/analytics/view?id=${view.id}`);
  // };

  render() {
    const breadCrumbs = this.breadCrumbs;
    //const pageTitle = 'ANALYTICS';
    const { viewList, columns, isDeleting } = this.state;
    return (
      <React.Fragment>
        {/* <div className="breadcrumbs-container">
          {pageTitle && <div className="page-title">{pageTitle}</div>}
          <div className="breadcrumbs">
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
                      <i className="fa fa-chevron-right" />
                    </span>
                  </React.Fragment>
                );
              }
            })}
          </div>
        </div> */}
        <div className="analytics-container">
          <div className="analytics-heading-container">
            <span>
              <img src={Metrics} alt="" />
            </span>
            <h4>
              Analytics <p>Manage Views</p>
            </h4>
          </div>
          <div className="analytics-table-container">
            <div className="new-view-btn">
              <button className="asset-blue-button m-r-0" onClick={this.onClickCreateNewView}>
                New View
              </button>
            </div>
            <Table
              valueFromData={{
                columns: columns,
                data: viewList,
              }}
              perPageLimit={this.perPageLimit}
              visiblecheckboxStatus={this.checkboxValue}
              tableClasses={{
                table: 'tabel',
                tableParent: 'analytics-tabel',
                parentClass: 'analytics-tabels',
              }}
              showingLine="Showing %start% to %end% of %total% Views"
            />
          </div>
        </div>
        <CreateNewViewPopup ref={this.opencreateNewViewRef} />
        <DeleteTabPopup
          ref={this.openDeleteTabRef}
          deleteContent="Do you want to delete the view?"
          deleteDataFromSidebar={this.deleteView}
          isLoading={isDeleting}
        />
      </React.Fragment>
    );
  }
}

export default Analytics;
