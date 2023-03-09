import React, { Component } from 'react';
import { config } from '../../config';
import { RestService } from '../_service/RestService';
import { Link } from 'react-router-dom';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import { EditAlertPopup } from '../allAlerts/EditAlertPopup';
import ConfirmDialog from '../../components/ConfirmDialog';
import AlertMessage from '../../components/AlertMessage';
import Table from '../../components/table';
import Rbac from '../../components/Rbac';

class SearchAlert extends Component {
  editAlertRef;
  resourceGroup;
  resources;
  monitoringServices;
  alertTypes;
  severity;
  alertStates;
  tableValue;
  perPageLimit;
  checkboxValue;
  constructor(props) {
    super(props);
    this.perPageLimit = 2;
    this.checkboxValue = true;
    this.state = {
      isConfirmDialogOpen: false,
      confirmTitleMessage: null,
      objectType: null,
      objectId: null,
      object: null,
      message: null,
      severity: '',
      isAlertOpen: false,
      alertData: [],
      modal: false,
      resourceGroup: '',
      resource: '',
      monitorService: '',
      alertType: '',
      alertState: '',
      filterCheckbox: false,
      isApiCalled: false,
      columns: [
        {
          label: 'Name',
          key: 'name',
          renderCallback: (value) => {
            return (
              <td>
                <div className="pointer-label">{value}</div>
              </td>
            );
          },
          isCaseInsensitive: true,
        },
        {
          label: 'Severity',
          key: 'severity',
          renderCallback: (value) => {
            let strClass = '';
            if (value) {
              value = value.toLowerCase();
            }
            if (value === 'high') {
              strClass = 'severity-high';
            } else if (value === 'low') {
              strClass = 'severity-low';
            } else if (value === 'urgent') {
              strClass = 'severity-urgent';
            } else if (value === 'critical') {
              strClass = 'severity-critical';
            } else if (value === 'medium') {
              strClass = 'severity-medium';
            }
            return (
              <td>
                <span className={strClass}>{value}</span>
              </td>
            );
          },
          isCaseInsensitive: true,
        },
        {
          label: 'Monitor Condition',
          key: 'monitorcondition',
          isCaseInsensitive: true,
        },
        {
          label: 'Alert State',
          key: 'alertState',
          isCaseInsensitive: true,
        },
        {
          label: 'Affected Resource',
          key: 'affectedresource',
          isCaseInsensitive: true,
        },
        {
          label: 'Monitor Service',
          key: 'monitorservice',
          isCaseInsensitive: true,
        },
        {
          label: 'Signal Type',
          key: 'signaltype',
          isCaseInsensitive: true,
        },
        {
          label: 'Fired Time',
          key: 'firedtime',
          isCaseInsensitive: true,
        },
        {
          label: 'Subscription',
          key: 'brcsubscription',
          isCaseInsensitive: true,
        },
        {
          label: 'Suppression State',
          key: 'suppressionstate',
          isCaseInsensitive: true,
        },
        {
          label: 'Resources',
          key: 'resources',
          isCaseInsensitive: true,
        },
        {
          label: 'Action',
          key: 'action',
          renderCallback: (value, alert) => {
            return (
              <td>
                <div className="d-inline-block">
                  <Rbac parentName={config.PARENT_NAME} childName="searchalert-index-alertstbl-editbtn">
                    <button className="btn btn-link">
                      <i onClick={(e) => this.onClickEditAlert(e, alert)} className="fa fa-edit"></i>
                    </button>
                  </Rbac>
                  <Rbac parentName={config.PARENT_NAME} childName="searchalert-index-alertstbl-deletebtn">
                    <button className="btn btn-link">
                      <i onClick={(e) => this.onClickDeleteAlert(e, alert)} className="fa fa-trash"></i>
                    </button>
                  </Rbac>
                  <button className="btn btn-link" id={`PopoverFocus-${alert.guid}`}>
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                  <UncontrolledPopover trigger="legacy" placement="bottom" target={`PopoverFocus-${alert.guid}`}>
                    <PopoverBody>
                      <Rbac parentName={config.PARENT_NAME} childName="searchalert-index-alertstbl-startec2btn">
                        <Link className=" " to={`/alertmanager/pages/all-tickets`}>
                          Create Ticket
                        </Link>
                      </Rbac>
                      <Rbac
                        parentName={config.PARENT_NAME}
                        childName="searchalert-index-alertstbl-startec2withpromptbtn"
                      >
                        <Link className=" " to="">
                          Silence
                        </Link>
                      </Rbac>
                    </PopoverBody>
                  </UncontrolledPopover>
                </div>
              </td>
            );
          },
          isCaseInsensitive: true,
        },
      ],
    };
    this.resourceGroup = [
      {
        label: 'Compute',
        value: 'compute',
      },
      {
        label: 'Jobs',
        value: 'jobs',
      },
      {
        label: 'Network',
        value: 'network',
      },
    ];
    this.resources = {
      Compute: [
        {
          label: 'Node',
          value: 'node',
        },
        {
          label: 'Database',
          value: 'database',
        },
        {
          label: 'Storage',
          value: 'storage',
        },
        {
          label: 'App',
          value: 'app',
        },
      ],
      Jobs: [
        {
          label: 'SHELL JOBS',
          value: 'shell jobs',
        },
        {
          label: 'ETL JOBS',
          value: 'etl jobs',
        },
      ],
      Network: [
        {
          label: 'VPC',
          value: 'vpc',
        },
        {
          label: 'VPN',
          value: 'vpn',
        },
      ],
    };
    this.monitoringServices = [
      {
        label: 'Native AWS',
        value: 'native aws',
      },
      {
        label: 'Native AZURE',
        value: 'native azure',
      },
    ];
    this.alertTypes = [
      {
        label: 'Metrics',
        value: 'metrics',
      },
      {
        label: 'Logs',
        value: 'logs',
      },
    ];
    this.severity = [
      {
        label: 'Urgent',
        value: 'urgent',
      },
      {
        label: 'Critical',
        value: 'critical',
      },
      {
        label: 'High',
        value: 'high',
      },
      {
        label: 'Medium',
        value: 'medium',
      },
      {
        label: 'Low',
        value: 'low',
      },
    ];
    this.alertStates = [
      {
        label: 'New',
        value: 'new',
      },
      {
        label: 'InProgress',
        value: 'inprogress',
      },
      {
        label: 'Closed',
        value: 'closed',
      },
    ];
    this.editAlertRef = React.createRef();
    this.clearAllFilters = this.clearAllFilters.bind(this);
    this.createSelectbox = this.createSelectbox.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  async componentDidMount() {
    this.setState({
      isApiCalled: true,
    });
    try {
      this.fetchData();
    } catch (err) {
      this.setState({
        isApiCalled: false,
      });
      console.log('SearchAlert page. Loading alert data from elastic failed. Error: ', err);
    }
  }

  fetchData = () => {
    RestService.getData(config.GET_ALL_ALERT_FROM_ELASTIC, null, null).then((response) => {
      //     let ary = [];
      //     for (let i = 0; i < response.length; i++) {
      //         let j = JSON.parse(response[i]);
      //         ary.push(j);
      //     }
      this.setState({
        alertData: response,
      });
      this.setState({
        isApiCalled: false,
      });
      console.log('Alerts: ', response);
    });
  };

  clearAllFilters = () => {
    this.setState({
      resourceGroup: '',
      resource: '',
      monitorService: '',
      alertType: '',
      severity: '',
      alertState: '',
      filterCheckbox: true,
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onClickEditAlert = (e, selectedAlert) => {
    this.editAlertRef.current.toggle(selectedAlert);
  };

  handleCloseAlert = (e) => {
    this.setState({
      isAlertOpen: false,
    });
  };

  onClickDeleteAlert = (e, alert) => {
    console.log('Alert : ' + alert);
    this.setState({
      confirmTitleMessage: 'Delete Alert',
      message: 'Are you sure, you want to delete the alert?',
      isConfirmDialogOpen: true,
      objectType: 'alert',
      object: alert,
    });
  };
  handleCloseConfirmDialog = () => {
    this.setState({
      isConfirmDialogOpen: false,
    });
  };
  handleConfirmDelete = (objectType, object) => {
    console.log('Deleting alert. Alert object : ', object);
    let url = config.DELETE_ALERT + `/` + object.guid;
    this.callDeleteApi(url);
    console.log('Alert data is ', this.state.alertData);
    this.setState({
      isConfirmDialogOpen: false,
    });
  };
  // async callDeleteApi(url) {
  //     await RestService.deleteObject(url).then((response) => {
  //         console.log("Delete Response : ", response);
  //         response=eval(response);
  //        let ary = [];
  //         for (let i = 0; i < response.length; i++) {
  //             let j = JSON.parse(response[i]);
  //             ary.push(j);
  //         }
  //         console.log("Array is=",ary)
  //         this.setState({
  //              alertData: ary,
  //             severity: config.SEVERITY_SUCCESS,
  //             message: 'Alert deleted successfully',
  //             isAlertOpen: true,
  //         });

  //     }).catch(error => {
  //         console.log('Deletion error', error);
  //         this.setState({
  //             severity: config.SEVERITY_ERROR,
  //             message: 'Alert could not be deleted. Please check the service logs for details',
  //             isAlertOpen: true,
  //         });
  //     });
  // }

  async callDeleteApi(url) {
    await RestService.deleteObject(url).then((response) => {
      console.log('Delete alert response: ', response);
    });
    this.setState({
      severity: config.SEVERITY_SUCCESS,
      message: 'Alert deleted successfully',
      isAlertOpen: true,
    });

    // await RestService.deleteObject(url).then((response) => {
    //     console.log("AllAlert : Delete Response : ", response);
    // response=eval(response);
    /*  let ary = [];
           for (let i = 0; i < response.length; i++) {
               let j = JSON.parse(response[i]);
               ary.push(j);
           }
           console.log("Array is=",ary)
            */
    //alertData: ary,
    // this.setState({
    //     severity: config.SEVERITY_SUCCESS,
    //     message: 'Alert deleted successfully',
    //     isAlertOpen: true,
    // });

    //this.refreshData();

    // }).catch(error => {
    //     console.log('Deletion error', error);
    //     this.setState({
    //         severity: config.SEVERITY_ERROR,
    //         message: 'Alert could not be deleted. Please check the service logs for details',
    //         isAlertOpen: true,
    //     });
    // });
  }

  createSelectbox = (data) => {
    const retData = [];
    if (data) {
      const length = data.length;
      for (let i = 0; i < length; i++) {
        retData.push(<option value={data[i].value}>{data[i].label}</option>);
      }
    }
    return retData;
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      filterCheckbox: false,
    });
    if (name === 'resourceGroup') {
      this.setState({
        resource: '',
      });
    }
  };

  refreshData() {
    console.log('Refreshed.....');
    try {
      this.fetchData();
    } catch (err) {
      console.log('Alert data refresh failed. Error: ', err);
    }
  }

  applyFilters = () => {
    const retData = [];
    const { alertData, resourceGroup, resource, monitorService, alertType, severity, alertState } = this.state;
    if (alertData && alertData.length > 0) {
      const length = alertData.length;
      for (let i = 0; i < length; i++) {
        const alert = alertData[i];
        const alertKeys = Object.keys(alert);
        const lowerCaseKeys = alertKeys.map((key) => key.toLocaleLowerCase());
        let isMatched = true;
        if (resourceGroup) {
          let index = lowerCaseKeys.indexOf('resourcegroup');
          if (index !== -1) {
            let key = alertKeys[index];
            let data = alert[key];
            if (data) {
              isMatched = resourceGroup === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && resource) {
          let index = lowerCaseKeys.indexOf('resources');
          if (index !== -1) {
            let key = alertKeys[index];
            let data = alert[key];
            if (data) {
              isMatched = resource === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && monitorService) {
          let index = lowerCaseKeys.indexOf('monitorservice');
          if (index !== -1) {
            let key = alertKeys[index];
            let data = alert[key];
            if (data) {
              isMatched = monitorService === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && alertType) {
          let index = lowerCaseKeys.indexOf('signaltype');
          if (index !== -1) {
            let key = alertKeys[index];
            let data = alert[key];
            if (data) {
              isMatched = alertType === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && severity) {
          let index = lowerCaseKeys.indexOf('severity');
          if (index !== -1) {
            let key = alertKeys[index];
            let data = alert[key];
            if (data) {
              isMatched = severity === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched && alertState) {
          let index = lowerCaseKeys.indexOf('alertstate');
          if (index !== -1) {
            let key = alertKeys[index];
            let data = alert[key];
            if (data) {
              isMatched = alertState === data.toLowerCase();
            } else {
              isMatched = false;
            }
          } else {
            isMatched = false;
          }
        }
        if (isMatched) {
          retData.push(alert);
        }
      }
    }
    return retData;
  };

  render() {
    const {
      isConfirmDialogOpen,
      objectType,
      isAlertOpen,
      message,
      object,
      confirmTitleMessage,
      resourceGroup,
      resource,
      monitorService,
      alertType,
      severity,
      alertState,
      columns,
    } = this.state;
    const tableData = this.applyFilters();
    return (
      <div className="all-alerts-container">
        <ConfirmDialog
          objectType={objectType}
          objectId={object}
          handleCloseConfirmDialog={this.handleCloseConfirmDialog}
          handleConfirmDelete={this.handleConfirmDelete}
          open={isConfirmDialogOpen}
          titleMsg={confirmTitleMessage}
          msg={message}
        ></ConfirmDialog>
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={isAlertOpen}
          severity={severity}
          msg={message}
        ></AlertMessage>
        <div className="alert-page-container searchalert-container">
          <div className="common-container border-bottom-0">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12">
                <div className="bg-white filters-box">
                  <div className="heading">
                    <label>Filters</label>
                  </div>
                  <div className="filters-btn">
                    <button className="btn btn-secondary" onClick={this.clearAllFilters}>
                      Clear All Filters
                    </button>
                    {/* <button className="btn btn-secondary apply-btn" onClick={this.onClickApply} disabled={state.isApiCalled}>Apply</button> */}
                  </div>
                  <div className="filterbox">
                    <div className="box">
                      <label>Resource Group</label>
                      <div className="rainge">
                        <div className="min-box">
                          <select
                            className="form-control"
                            name="resourceGroup"
                            value={resourceGroup}
                            onChange={this.handleStateChange}
                          >
                            <option value="">Select Resource Group</option>
                            {this.createSelectbox(this.resourceGroup)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <label>Resources</label>
                      <div className="rainge">
                        <div className="min-box">
                          <select
                            className="form-control"
                            name="resource"
                            value={resource}
                            onChange={this.handleStateChange}
                          >
                            <option value="">Select Resources</option>
                            {this.createSelectbox(this.resources[resourceGroup])}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <label>Monitor services</label>
                      <div className="rainge">
                        <div className="min-box">
                          <select
                            className="form-control"
                            name="monitorService"
                            value={monitorService}
                            onChange={this.handleStateChange}
                          >
                            <option value="">Select Monitor Services</option>
                            {this.createSelectbox(this.monitoringServices)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <label>Alert Type</label>
                      <div className="rainge">
                        <div className="min-box">
                          <select
                            className="form-control"
                            name="alertType"
                            value={alertType}
                            onChange={this.handleStateChange}
                          >
                            <option value="">Select Alert Type</option>
                            {this.createSelectbox(this.alertTypes)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <label>Serverity</label>
                      <div className="rainge">
                        <div className="min-box">
                          <select
                            className="form-control"
                            name="severity"
                            value={severity}
                            onChange={this.handleStateChange}
                          >
                            <option value="">Select Severity</option>
                            {this.createSelectbox(this.severity)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="box">
                      <label>Alert state</label>
                      <div className="rainge">
                        <div className="min-box">
                          <select
                            className="form-control"
                            name="alertState"
                            value={alertState}
                            onChange={this.handleStateChange}
                          >
                            <option value="Select Alert State">Select Alert State</option>
                            {this.createSelectbox(this.alertStates)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12">
                <div className="alert-data-table-container searchalert-data-table-container border-bottom-0">
                  <div className="heading">
                    <h2>Alerts</h2>
                  </div>

                  <Table
                    valueFromData={{ columns: columns, data: tableData }}
                    perPageLimit={this.perPageLimit}
                    visiblecheckboxStatus={this.checkboxValue}
                    tableClasses={{
                      table: 'alert-data-tabel',
                      tableParent: 'alerts-data-tabel',
                      parentClass: 'all-alert-data-table',
                    }}
                    searchKey="name"
                    showingLine="Showing %start% to %end% of %total%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <EditAlertPopup ref={this.editAlertRef} />
      </div>
    );
  }
}
export default SearchAlert;
