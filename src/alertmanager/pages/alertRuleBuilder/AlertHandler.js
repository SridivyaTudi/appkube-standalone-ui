import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import {
  Tcp,
  Exec,
  Post,
  Log,
  StackDefault,
  Alerta,
  Email,
  Hipchat,
  Kafka,
} from "./AlertHandleComponents";

class AlertHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabData: [],
      tabComponents: [],
    };
    this.tabComponentsList = {
      tcp: <Tcp />,
      exec: <Exec />,
      post: <Post />,
      log: <Log />,
      "stack(default)": <StackDefault />,
      alerta: <Alerta />,
      email: <Email />,
      hipChat: <Hipchat />,
      "Kafka(localhost)": <Kafka />,
    };
  }

  handleAlertSelection = (event) => {
    const { tabData, tabComponents } = this.state;
    const { value } = event.target;
    tabData.push(value);
    tabComponents.push(this.tabComponentsList[value]);
    this.setState({
      tabData,
      tabComponents,
    });
  };

  toggleTab = (activeTab) => {
    this.setState({
      activeTab,
    });
  };

  deleteTabData = (index) => {
    const { tabData } = this.state;
    tabData.splice(index, 1);
    this.setState({
      tabData,
    });
  };

  createTabs = (tabData) => {
    const retData = [];
    const { activeTab } = this.state;
    for (let i = 0; i < tabData.length; i++) {
      retData.push(
        <NavItem>
          <NavLink
            className={`${activeTab == i ? "side-active" : ""}`}
            onClick={() => {
              this.toggleTab(i);
            }}
          >
            {tabData[i]}
            <i
              className="fa fa-close"
              onClick={() => {
                this.deleteTabData(i);
              }}
            ></i>
          </NavLink>
        </NavItem>
      );
    }
    return retData;
  };

  createTabPanes = (tabComponents) => {
    const retData = [];
    for (let i = 0; i < tabComponents.length; i++) {
      retData.push(<TabPane tabId={i}>{tabComponents[i]}</TabPane>);
    }
    return retData;
  };

  render() {
    const { activeTab, tabData, tabComponents } = this.state;
    return (
      <div className="alert-details">
        <div className="alert-details-name">
          <label>Condition</label>
          <div className="condition-box">
            <div className="condition-header">
              <div className="send-alert-text">Send this alert to:</div>
              <div className="greater-select">
                <select
                  className="form-control"
                  id="rousourceGroup"
                  onChange={this.handleAlertSelection}
                >
                  <option value="Add another Handler">
                    Add another Handler
                  </option>
                  <option value="post">post</option>
                  <option value="tcp">tcp</option>
                  <option value="exec">exec</option>
                  <option value="log">log</option>
                  <option value="stack(default)">stack(default)</option>
                  <option value="email">email</option>
                  <option value="alerta">alerta</option>
                  <option value="hipChat">hipChat</option>
                  <option value="Kafka(localhost)">Kafka (localhost)</option>
                </select>
              </div>
            </div>
            <div className="alert-handler-box">
              <section className="tab-container row vertical-tab-container">
                <div className="col-lg-2 col-md-3 col-sm-6">
                  <div className="alert-left-box">
                    <Nav tabs>{this.createTabs(tabData)}</Nav>
                  </div>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-6 alert-description">
                  <TabContent activeTab={activeTab}>
                    {this.createTabPanes(tabComponents)}
                  </TabContent>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlertHandler;
