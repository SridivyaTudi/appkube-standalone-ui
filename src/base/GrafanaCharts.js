import { props } from "./data";
import React, { Component } from "react";
import GrafanaCustomChart from "./GrafanaChart";
import dataFetch from "../lib/data-fetch";
import { CommonData } from "../lib/commonDS";
import RGL, { WidthProvider } from "react-grid-layout";
import _ from "lodash";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import "../base/assets/css/react-grid-layout.css";
import "../base/assets/css/react-resizable.css";

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
      loading: false,
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
      loading: false,
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
    this.setState({ loading: true });
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
        <MenuItem key={dashboard.title} value={index}>
          <ListItemText primary={dashboard.title} />
        </MenuItem>
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
    // const options = e.target.options;
    // let value = [];
    // for (let i = 0; i < options.length; i++) {
    //   const option = options[i];
    //   if (option.selected) {
    //     value.push(option.value);
    //   }
    // }
    // this.setState({
    //   selectedPanels: value,
    // });
    this.setState({
      selectedPanels: e.target.value,
    });
  };

  renderPanleSelectbox = () => {
    const { dashboards, selectedDashboard, selectedPanels } = this.state;
    if (selectedDashboard >= 0 && dashboards[selectedDashboard]) {
      const { panels } = dashboards[selectedDashboard];
      return panels.map((panel, index) => {
        return (
          <MenuItem key={panel.title} value={index}>
            <Checkbox checked={selectedPanels.indexOf(index) > -1} />
            <ListItemText primary={panel.title} />
          </MenuItem>
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
    if (selectedDashboard >= 0 && selectedPanels.length > 0) {
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
    let layout = [];
    if (selectedDashboard >= 0 && selectedPanels.length > 0) {
      const panels = propsData.board.panels;
      panels.map((panel, index) => {
        const data = {
          ...propsData,
          panel,
        };
        var layouti = { x: (index * 4) % 12, y: 0, w: 4, h: 3 };
        layout.push(layouti);
        retData.push(
          <div key={index} data-grid={layout[index]}>
            <GrafanaCustomChart {...data} />
          </div>
        );
        return null;
      });
    }
    return (
      <GridLayout className="layout" cols={12}>
        {retData}
      </GridLayout>
    );
  };

  render() {
    const {
      grafanaUrl,
      creds,
      selectedDashboard,
      selectedPanels,
      dashboards,
      showGraph,
      loading,
    } = this.state;
    return (
      <Container maxWidth="xl">
        <div className="form">
          <div className="form-details">
            <Grid container spacing={2}>
              <Grid item lg={5} md={12} sm={12} xs={12}>
                <TextField
                  type="text"
                  value={grafanaUrl}
                  onChange={this.onStateChange}
                  name="grafanaUrl"
                  label="Grafana URL"
                  style={{ width: "100%" }}
                  className="input-details"
                  size="small"
                />
              </Grid>
              <Grid item lg={5} md={12} sm={12} xs={12}>
                <TextField
                  type="text"
                  value={creds}
                  onChange={this.onStateChange}
                  name="creds"
                  label="Creds"
                  style={{ width: "100%" }}
                  size="small"
                />
              </Grid>
              <Grid item lg={2} md={12} sm={12} xs={12}>
                <div className="data-button">
                  <LoadingButton
                    onClick={this.onClickGetData}
                    variant="contained"
                    size="small"
                    loading={loading}
                    className="loadibg-btn"
                  >
                    Get Data
                  </LoadingButton>
                </div>
              </Grid>
            </Grid>
            {dashboards.length > 0 ? (
              <Grid container spacing={2} style={{ marginTop: "15px" }}>
                <Grid item lg={5} md={12} sm={12} xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="dashboards-checkbox-label">
                      Dashboards
                    </InputLabel>
                    <Select
                      labelId="dashboards-checkbox-label"
                      onChange={this.onChangeDashboardSelection}
                      value={selectedDashboard}
                      MenuProps={selectedDashboard}
                      label="Dashboards"
                      input={<OutlinedInput label="Dashboards" />}
                      size="small"
                      style={{ maxHeight: "40px" }}
                    >
                      {this.renderDashboardsSelectbox()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={5} md={12} sm={12} xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="panels-checkbox-label">Panels</InputLabel>
                    <Select
                      multiple
                      labelId="panels-checkbox-label"
                      onChange={this.onChangePanelSelection}
                      value={selectedPanels}
                      label="Panels"
                      MenuProps={selectedPanels}
                      style={{ maxHeight: "40px" }}
                      renderValue={(selected) => {
                        let selectedData = _.cloneDeep(selected);
                        if (
                          selectedDashboard >= 0 &&
                          dashboards[selectedDashboard]
                        ) {
                          const { panels } = dashboards[selectedDashboard];
                          selectedData = selectedData.map(
                            (item) => panels[item].title
                          );
                        }
                        return selectedData.join(", ");
                      }}
                      input={<OutlinedInput label="Panels" />}
                      size="small"
                    >
                      {this.renderPanleSelectbox()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={2} md={12} sm={12} xs={12}>
                  <div className="data-button">
                    <Button
                      onClick={this.onClickShowGraph}
                      variant="contained"
                      size="small"
                      loading={loading}
                      className="loadibg-btn"
                    >
                      Show Panels
                    </Button>
                  </div>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </div>
          {showGraph ? this.renderGraphs() : <></>}
        </div>
      </Container>
    );
  }
}

export default GrafanaCharts;
