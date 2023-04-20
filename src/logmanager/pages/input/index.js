import React from "react";
import { config } from "../../config";
import CreateStreamPopup from "./../dashboard/createStreamPopup";
import NewStreamRulePopup from "./../dashboard/newStreamRulePopup";
import SetOutputPopup from "./../dashboard/setOutputParameter";
import AllEventsPopup from "./../dashboard/allEventPopup";
import TopMenu from "./../dashboard/topMenu";

let indexSetMap = new Map();
indexSetMap.set("5fb950ef6439c846ee76f455", "Default index set");
indexSetMap.set("5fb95bb004a35d1e34e9baa6", "GrayLog Events");
indexSetMap.set("5fb95bb004a35d1e34e9baa8", "GrayLog System Event");

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateMenu: false,
      streamTableData: [],
    };
    this.createStreamRef = React.createRef();
    this.newStreamRef = React.createRef();
    this.manageOutputRef = React.createRef();
    this.allEventRef = React.createRef();
  }

  onClickOpenCreateStreamPopup = (e) => {
    this.createStreamRef.current.toggle();
  };

  openNewStreamPopup = (e) => {
    this.newStreamRef.current.toggle();
  };

  OpenManageOutputPopup = (a) => {
    this.manageOutputRef.current.toggle();
  };

  OpenAllEventsPopup = (a) => {
    this.allEventRef.current.toggle();
  };

  onClickOpenSubLink = (index) => {
    const { streamTableData } = this.state;
    for (let i = 0; i < streamTableData.length; i++) {
      let status = streamTableData[i].actionStatus;
      if (i == index) {
        streamTableData[i].actionStatus = !status;
      }
    }
    this.setState({
      streamTableData,
    });
  };

  async componentDidMount() {
    console.log("componentDidMountMethod called");
    var myHeaders = new Headers();
    myHeaders.append("X-Requested-By", "XMLHttpRequest");
    /** for local **/
    // myHeaders.append("Authorization", "Basic YWRtaW46YWRtaW4=");
    /** for local **/

    /** for 25 box **/
    myHeaders.append("Authorization", "Basic YWRtaW46cGFzc3dvcmQ=");
    /** for 25 box **/
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(config.STREAM, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        var streams = JSON.parse(result).streams;
        console.log("sreams : ", streams);
        streams.forEach((item) => {
          item.index_set_id = indexSetMap.get(item.index_set_id);
        });
        console.log("stream after change", streams);
        this.setState({
          streamTableData: streams,
        });
      })
      .catch((error) => console.log("error", error));
  }

  displayTableOfStream = () => {
    const { streamTableData } = this.state;
    let retData = [];
    for (let i = 0; i < streamTableData.length; i++) {
      let rowData = streamTableData[i];
      retData.push(
        <tr>
          <td>
            <h4 onClick={this.OpenAllEventsPopup}>{rowData.title}</h4>
            <span>Index set: &nbsp;&nbsp;{rowData.index_set_id}</span>
          </td>
          <td>
            <table className="inner-table">
              <tr>
                <td>
                  <p>{rowData.description}</p>
                  <p>{rowData.rules}&nbsp;&nbsp;</p>
                </td>
                <td>
                  <div className="d-inline-block">
                    <button
                      className="blue-button m-b-0"
                      onClick={this.openNewStreamPopup}
                    >
                      Manage Rules
                    </button>
                    <button
                      className="blue-button m-b-0"
                      onClick={this.OpenManageOutputPopup}
                    >
                      Manage Output
                    </button>
                    <button className="blue-button m-b-0">Manage Alerts</button>
                  </div>
                  <div className="d-inline-block table-btns">
                    <div className="d-inline-block enabled-disabled-container">
                      <div className="enabled"></div>
                    </div>
                    <button className="btn btn-link">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button className="btn btn-link">
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                    <button
                      className="btn btn-link"
                      onClick={() => this.onClickOpenSubLink(i)}
                    >
                      <i className="fa fa-ellipsis-h"></i>
                    </button>
                    {rowData.actionStatus == true && (
                      <div className="text-center open-create-menu">
                        <a href="#">Manage Rules</a>
                        <a href="#">MAnage Outputs</a>
                        <a href="#">MAnage Alerts</a>
                        <a href="#">Edit Stream</a>
                        <a href="#">Quick Add Rule</a>
                        <a href="#">Clone this Stream</a>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      );
    }
    return retData;
  };

  render() {
    return (
      <div className="logmanager-dashboard-container">
        <div className="logmanager-page-container">
          <TopMenu />
          <div className="common-container">
            <div className="streams-text">
              <h3>STREAMS</h3>
              <p>
                You can route incoming messeges into streams by applying rules
                against them. Messages matching the rules of a stream are routed
                it. A message can also be routed into multiple streams
              </p>
            </div>
          </div>
          <div className="common-container">
            <div className="new-stream-searchbar">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-12">
                  <div className="searchbar-left">
                    <div className="search-box">
                      <form>
                        <div className="search-control-group">
                          <input type="text" className="input-group-text" />
                          <button>
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                    <button className="blue-button m-b-0">Filter</button>
                    <button className="blue-button m-b-0 m-r-0">Reset</button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="searchbar-right">
                    <div className="new-stream-btn">
                      <button
                        className="blue-button m-b-0 m-r-0"
                        onClick={this.onClickOpenCreateStreamPopup}
                      >
                        New Stream
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <div className="table-container">
              <div className="table-container-inner">
                <table className="table">
                  <tbody>{this.displayTableOfStream()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <CreateStreamPopup ref={this.createStreamRef} />
        <NewStreamRulePopup ref={this.newStreamRef} />
        <SetOutputPopup ref={this.manageOutputRef} />
        <AllEventsPopup ref={this.allEventRef} />
      </div>
    );
  }
}

export default Input;
