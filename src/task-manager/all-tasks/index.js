import React, {Component} from 'react';
// Libraries
//import { updateLocation } from 'app/core/actions';
// import 'react-circular-progressbar/dist/styles.css';
import Table from '../Table';

// Services & Utils
// export interface Props {
//   $scope;
//   $injector;
//   updateLocation: typeof updateLocation;
//   location;
// }

class AllTasks extends Component {
  // breadCrumbs = [
  //   {
  //     label: 'Home',
  //     route: `/`,
  //   },
  //   {
  //     label: 'Analytics',
  //     route: '/analytics',
  //   },
  //   {
  //     label: 'Task Manager',
  //     isCurrentPage: true,
  //   },
  // ];
  tableValue;
  perPageLimit;
  checkboxValue;
  constructor(props) {
    super(props);
    this.tableValue = {
      columns: [
        {
          label: 'Name',
          key: 'name',
        },
        {
          label: 'Rule Type',
          key: 'ruleType',
        },
        {
          label: 'Message',
          key: 'message',
        },
        {
          label: 'Alert Handlers',
          key: 'alertHandlers',
        },
        {
          label: 'Action',
          key: 'action',
          renderCallback: () => {
            return (
              <td>
                <div className="d-inline-block">
                  <div className="enabled"></div>
                  <button className="btn btn-link">
                  <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button className="btn btn-link">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </td>
            );
          },
        },
      ],
      data: [
        {
          name: 'CPU Percentage',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Read Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'CPU Percentage',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Read Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'CPU Percentage',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Read Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'CPU Percentage',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Read Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'CPU Percentage',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Read Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'CPU Percentage',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'CPU Percentage',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Read Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Read Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Read Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Read Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
        {
          name: 'Disk Write Bytes	',
          ruleType: 'Threshold',
          message: '{{.ID}} {{.Name}} {{.TaskName}} {{….',
          alertHandlers: 'Slack (default)',
        },
      ],
    };
    this.perPageLimit = 9;
    this.checkboxValue = true;
  }

  isLightTheme() {
    const w = window;
    if (w.grafanaBootData && w.grafanaBootData.user) {
      return w.grafanaBootData.user.lightTheme;
    }
    return false;
  }

  render() {
    const breadCrumbs = this.breadCrumbs;
    const pageTitle = 'TASK MANAGER';
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
                      <i className="fa fa-chevron-right"></i>
                    </span>
                  </React.Fragment>
                );
              }
            })}
          </div>
        </div> */}
        <div className="task-dashboard-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-8 col-lg-8">
                <div className="heading">
                  <h3>Task Manager</h3>
                  <span>Provider</span>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4">
                <a href="/task-manager/create-dashboard" className="float-right m-b-0 m-r-0 blue-button">
                  New Task
                </a>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <div className="task-table-container">
              <div className="heading">All Tasks</div>
              <Table
                valueFromData={this.tableValue}
                perPageLimit={this.perPageLimit}
                visiblecheckboxStatus={this.checkboxValue}
                tableClasses={{
                  table: 'task-data-tabel',
                  tableParent: 'tasks-data-table',
                  parentClass: 'all-task-data-table',
                }}
                searchKey="name"
                showingLine="Showing %start% to %end% of %total%"
                dark={!this.isLightTheme()}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AllTasks;
