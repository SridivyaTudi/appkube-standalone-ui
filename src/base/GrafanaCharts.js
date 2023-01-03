import { props } from "./data";
import React, { Component } from "react";
import GrafanaCustomChart from "./GrafanaChart";
import dataFetch from "../lib/data-fetch";
import { CommonData } from "../lib/commonDS";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";

const GridLayout = WidthProvider(RGL);

class GrafanaCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grafanaUrl: "http://grafana.synectiks.net",
      creds: "admin:password",
      dashboards: [],
      selectedDashboard: "",
      selectedPanels: [],
      showGraph: false,
      propsData: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedPanels } = this.state;
    if (prevState.selectedPanels.length > 0) {
      if (
        prevState.selectedPanels.length !== selectedPanels.length ||
        !_.isEqual(prevState.selectedPanels, selectedPanels)
      ) {
        this.setState({ showGraph: false });
      }
    }
  }

  processReceivedData = (data) => {
    this.setState({
      dashboards: data,
    });
  };

  handleError = () => {
    alert("There is some error getting the data");
  };

  getData = () => {
    const { grafanaUrl, creds } = this.state;
    dataFetch(
      `${CommonData.apiEndPoint}/grafana-ds?grafanaUrl=${grafanaUrl}&apiKey=${creds}`,
      {},
      this.processReceivedData,
      this.handleError
    );
  };

  onStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onClickGetData = () => {
    const { grafanaUrl, creds } = this.state;
    if (grafanaUrl && creds) {
      this.getData();
    } else {
      alert("Please enter grafana url and Creds");
    }
  };

  renderDashboardsSelectbox = () => {
    const { dashboards } = this.state;
    return dashboards.map((dashboard, index) => {
      return (
        <option key={index} value={index}>
          {dashboard.title}
        </option>
      );
    });
  };

  onChangeDashboardSelection = (e) => {
    const { value } = e.target;
    this.setState({
      selectedDashboard: value,
      selectedPanels: [],
    });
  };

  onChangePanelSelection = (e) => {
    const options = e.target.options;
    let value = [];
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.selected) {
        value.push(option.value);
      }
    }
    this.setState({
      selectedPanels: value,
    });
  };

  renderPanleSelectbox = () => {
    const { dashboards, selectedDashboard } = this.state;
    if (selectedDashboard && dashboards[selectedDashboard]) {
      const { panels } = dashboards[selectedDashboard];
      return panels.map((panel, index) => {
        return (
          <option key={index} value={index}>
            {panel.title}
          </option>
        );
      });
    }
  };

  onClickShowGraph = () => {
    const { selectedPanels } = this.state;
    if (selectedPanels.length > 0) {
      this.setState({
        showGraph: true,
      });
      this.createBoardData();
    } else {
      alert("Please select a panel to show");
    }
  };

  createBoardData = () => {
    const { dashboards, selectedDashboard, selectedPanels, creds, grafanaUrl } =
      this.state;
    const newStartDate = new Date();
    newStartDate.setMinutes(newStartDate.getMinutes() - 5);
    if (selectedDashboard && selectedPanels.length > 0) {
      const selectedDashboardData = dashboards[selectedDashboard];
      const panels = selectedPanels.map((panelIndex) => {
        return selectedDashboardData.panels[panelIndex];
      });
      const board = {
        board: dashboards[selectedDashboard],
        panels,
        templateVars: [""],
      };
      const newStartDate = new Date();
      newStartDate.setMinutes(newStartDate.getMinutes() - 5);
      const propsData = {
        board,
        endDate: new Date(),
        from: "now-5m",
        grafanaAPIKey: creds,
        grafanaURL: grafanaUrl,
        inDialog: false,
        liveTail: true,
        panelData: {},
        prometheusURL: undefined,
        refresh: "10s",
        sparkline: false,
        startDate: newStartDate,
        templateVars: [""],
        testUUID: "",
        to: "now",
      };
      this.setState({
        propsData,
      });
    }
  };

  renderGraphs = () => {
    const { propsData, selectedPanels, selectedDashboard } = this.state;
    const retData = [];
    if (selectedDashboard && selectedPanels.length > 0) {
      const panels = propsData.board.panels;
      panels.map((panel, index) => {
        const data = {
          ...propsData,
          panel,
        };
        retData.push(
          <GridLayout className="layout" cols={12} width={1368}>
            <div key="a" data-grid={{ x: 0, y: 0, w: 4, h: 4 }}>
              <GrafanaCustomChart {...data} />
            </div>
            <div key="b" data-grid={{ x: 4, y: 0, w: 4, h: 4 }}>
              <GrafanaCustomChart {...data} />
            </div>
            <div key="c" data-grid={{ x: 8, y: 0, w: 4, h: 4 }}>
              <GrafanaCustomChart {...data} />
            </div>
          </GridLayout>
          // <div
          //   key={index}
          //   style={{
          //     display: "flex",
          //     flexWrap: "wrap",
          //     justifyContent: "center",
          //     gap: "20px",
          //   }}
          // >
          //   <Resizable
          //     //   defaultSize={{
          //     //     width: "49.5%",
          //     //   }}
          //     style={{ flexBasis: "400px", margin: "10px 0px" }}
          //     minWidth={"600px"}
          //   >
          //     <GrafanaCustomChart {...data} />
          //   </Resizable>
          // </div>
        );
        return null;
      });
    }
    return retData;
  };

  render() {
    const {
      grafanaUrl,
      creds,
      selectedDashboard,
      selectedPanels,
      dashboards,
      showGraph,
    } = this.state;
    console.log(showGraph);
    return (
      <>
        <label>Grafana URL</label>
        <input
          type="text"
          value={grafanaUrl}
          onChange={this.onStateChange}
          name="grafanaUrl"
        />
        <br />
        <label>Creds</label>
        <input
          type="text"
          value={creds}
          onChange={this.onStateChange}
          name="creds"
        />
        <br />
        <button onClick={this.onClickGetData}>Get Data</button>
        <br />
        {dashboards.length > 0 ? (
          <>
            <label>Dashboards</label>
            <select
              onChange={this.onChangeDashboardSelection}
              value={selectedDashboard}
            >
              <option value="">Select dashboard</option>
              {this.renderDashboardsSelectbox()}
            </select>
            <br />
            <label>Panels</label>
            <select
              multiple
              onChange={this.onChangePanelSelection}
              value={selectedPanels}
            >
              <option value="">Select panels</option>
              {this.renderPanleSelectbox()}
            </select>
            <br />
            <button onClick={this.onClickShowGraph}>Show Panels</button>
          </>
        ) : (
          <></>
        )}
        {showGraph ? this.renderGraphs() : <></>}
        {/* <GrafanaCustomChart
                    {...props}
                /> */}
      </>
    );
  }
}

export default GrafanaCharts;
