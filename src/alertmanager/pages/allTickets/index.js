import React, { Component } from 'react';
import { config } from '../../config';
import { StartECPopup } from './StartECPopup';
import { InstancePopup } from './InstancePopup';
//import { OpenNewTicketPopup } from '../../../../xformation-servicedesk-ui-plugin/src/components/OpenNewTicketPopup';
import { RestService } from '../_service/RestService';
import Table from '../../components/table';
import Rbac from '../../components/Rbac';
import UnimplementedFeaturePopup from '../../components/UnimplementedFeaturePopup';

class AllTickets extends Component {
  unimplementedFeatureModalRef;
  startECRef;
  instanceRef;
  openNewTicketRef;
  constructor(props) {
    super(props);
    this.openNewTicketRef = React.createRef();
    this.unimplementedFeatureModalRef = React.createRef();
    this.state = {
      guid: '',
      alertName: '',
      columns: [
        {
          label: 'ID',
          key: 'id',
        },
        {
          label: 'Priority',
          key: 'priority',
          renderCallback: (value) => {
            let strClass = '';
            if (value) {
              value = value.toLowerCase();
            }
            if (value === 'high') {
              strClass = 'severity-high';
            } else if (value === 'Low') {
              strClass = 'severity-low';
            } else if (value === 'Urgent') {
              strClass = 'severity-urgent';
            } else if (value === 'Critical') {
              strClass = 'severity-critical';
            } else if (value === 'Medium') {
              strClass = 'severity-medium';
            }
            return (
              <td>
                <span className={strClass}>{value}</span>
              </td>
            );
          },
        },
        {
          label: 'Subject',
          key: 'subject',
        },
        {
          label: 'Assigned To',
          key: 'assignedToName',
        },
        {
          label: 'Created At',
          key: 'createdAt',
        },
        {
          label: 'Action',
          key: 'action',
          renderCallback: (value, alert) => {
            return (
              <td>
                <div className="d-inline-block">
                  <Rbac parentName={config.PARENT_NAME} childName="alltickets-index-tickettbl-editbtn">
                    <button className="btn btn-link" onClick={() => this.onClickUnImplementedFeature('')}>
                      <i className="fa fa-edit"></i>
                    </button>
                  </Rbac>
                  <Rbac parentName={config.PARENT_NAME} childName="alltickets-index-tickettbl-deletebtn">
                    <button className="btn btn-link" onClick={() => this.onClickUnImplementedFeature('')}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </Rbac>
                  {/* <button className="btn btn-link" id={`PopoverFocus-${alert.id}`} onClick={() => this.onClickUnImplementedFeature("")}> */}
                  <button className="btn btn-link" onClick={() => this.onClickUnImplementedFeature('')}>
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                  {/* <UncontrolledPopover trigger="legacy" placement="bottom" target={`PopoverFocus-${alert.id}`}>
                                    <PopoverBody>
                                        <Rbac parentName={config.PARENT_NAME} childName="alltickets-index-tickettbl-startec2btn">
                                            <span className="bold-label colored-label pointer-label" onClick={this.onClickStartEC2}>Start EC2</span>
                                        </Rbac>
                                        <br />
                                        <Rbac parentName={config.PARENT_NAME} childName="alltickets-index-tickettbl-startec2withpromptbtn">
                                            <span className="bold-label colored-label pointer-label">Start EC2 with prompt</span>
                                        </Rbac>
                                    </PopoverBody>
                                </UncontrolledPopover> */}
                </div>
              </td>
            );
          },
        },
      ],
      ticketDataList: [],
    };

    this.startECRef = React.createRef();
    this.instanceRef = React.createRef();
  }
  onClickUnImplementedFeature = (link) => {
    this.unimplementedFeatureModalRef.current.setLink(link);
    this.unimplementedFeatureModalRef.current.toggle();
  };

  async componentDidMount() {
    this.fetchTicketOnAlert();
  }
  onRefreshClick = () => {
    console.log('refresh method called');
    this.fetchTicketOnAlert();
  };
  fetchTicketOnAlert = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const guid = urlParams.get('guid');
    const alertName = urlParams.get('alertName');

    this.setState({
      guid: guid,
      alertName: alertName,
    });
    try {
      await RestService.getData(config.GET_TICKETS_BY_GUID_URL + '/' + guid, null, null).then((response) => {
        this.setState({
          ticketDataList: response,
        });
      });
    } catch (err) {
      console.log('Loading ticket data failed. Error: ', err);
    }
  };

  onClickStartEC2 = (e) => {
    e.preventDefault();
    this.startECRef.current.toggle();
  };

  onClickInstance = (e) => {
    e.preventDefault();
    this.instanceRef.current.toggle();
  };
  onClickOpenNewTicket = (e) => {
    console.log('on click event fired');
    this.openNewTicketRef.current.toggle();
  };

  render() {
    const state = this.state;
    return (
      <div className="all-alerts-container">
        <div className="alert-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className="alert-heading">All Tickets</div>
              </div>
              <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="float-right script-editor-btn">
                  <Rbac parentName={config.PARENT_NAME} childName="alltickets-index-createticketbtn">
                    <button className="alert-white-button" onClick={this.onClickOpenNewTicket}>
                      <i className="fa fa-plus"></i>&nbsp;&nbsp; Create Ticket
                    </button>
                  </Rbac>
                  <button className="alert-white-button" onClick={this.onRefreshClick}>
                    <i className="fa fa-refresh"></i>&nbsp;&nbsp; Refresh
                  </button>
                  <button className="alert-white-button">
                    <i class="far fa-save"></i>&nbsp;&nbsp; Save Search
                  </button>
                  <div
                    className="form-group filter-control-group"
                    style={{ display: 'inline-block', marginRight: '0px', marginBottom: '0px' }}
                  >
                    <select className="form-control">
                      <option>Export</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="alert-data-table-container allalert-data-table-container common-container border-bottom-0">
            <Table
              valueFromData={{ columns: state.columns, data: state.ticketDataList }}
              perPageLimit={5}
              visiblecheckboxStatus={false}
              tableClasses={{
                table: 'alert-data-tabel',
                tableParent: 'alerts-data-tabel',
                parentClass: 'all-alert-data-table',
              }}
              searchKey="name"
              showingLine="Showing %start% to %end% of %total%"
            />
          </div>
          <StartECPopup ref={this.startECRef} />
          <InstancePopup ref={this.instanceRef} />
          {/* <OpenNewTicketPopup guid={state.guid} alertName={state.alertName} ref={this.openNewTicketRef} refreshParm={this.onRefreshClick} /> */}
        </div>
        <UnimplementedFeaturePopup ref={this.unimplementedFeatureModalRef} />
      </div>
    );
  }
}

export default AllTickets;
