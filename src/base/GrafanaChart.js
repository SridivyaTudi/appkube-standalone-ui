import React, { Component } from "react";
import {
  NoSsr,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Tooltip,
  LinearProgress,
  Box,
} from "@mui/material";
import moment from "moment";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import CachedIcon from "@mui/icons-material/Cached";
import dataFetch from "../lib/data-fetch";
import { CommonData } from "../lib/commonDS";
// import GrafanaCustomGaugeChart from "../components/Grafana/GrafanaCustomGaugeChart";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
} from "chart.js";

const grafanaDateRangeToDate = (dt, startDate) => {
  const dto = new Date();
  switch (dt) {
    case "now-2d":
      dto.setDate(dto.getDate() - 2);
      break;
    case "now-7d":
      dto.setDate(dto.getDate() - 7);
      break;
    case "now-30d":
      dto.setDate(dto.getDate() - 30);
      break;
    case "now-90d":
      dto.setDate(dto.getDate() - 90);
      break;
    case "now-6M":
      dto.setMonth(dto.getMonth() - 6);
      break;
    case "now-1y":
      dto.setFullYear(dto.getFullYear() - 1);
      break;
    case "now-2y":
      dto.setFullYear(dto.getFullYear() - 2);
      break;
    case "now-5y":
      dto.setFullYear(dto.getFullYear() - 5);
      break;
    case "now-1d/d":
      dto.setDate(dto.getDate() - 1);
      if (startDate) {
        dto.setHours(0);
        dto.setMinutes(0);
        dto.setSeconds(0);
        dto.setMilliseconds(0);
      } else {
        dto.setHours(23);
        dto.setMinutes(59);
        dto.setSeconds(59);
        dto.setMilliseconds(999);
      }
      break;
    case "now-2d/d":
      dto.setDate(dto.getDate() - 2);
      if (startDate) {
        dto.setHours(0);
        dto.setMinutes(0);
        dto.setSeconds(0);
        dto.setMilliseconds(0);
      } else {
        dto.setHours(23);
        dto.setMinutes(59);
        dto.setSeconds(59);
        dto.setMilliseconds(999);
      }
      break;
    case "now-7d/d":
      dto.setDate(dto.getDate() - 7);
      if (startDate) {
        dto.setHours(0);
        dto.setMinutes(0);
        dto.setSeconds(0);
        dto.setMilliseconds(0);
      } else {
        dto.setHours(23);
        dto.setMinutes(59);
        dto.setSeconds(59);
        dto.setMilliseconds(999);
      }
      break;
    case "now-1w/w":
      dto.setDate(dto.getDate() - 6 - ((dto.getDay() + 8) % 7));
      if (startDate) {
        dto.setHours(0);
        dto.setMinutes(0);
        dto.setSeconds(0);
        dto.setMilliseconds(0);
      } else {
        dto.setDate(dto.getDate() + 6);
        dto.setHours(23);
        dto.setMinutes(59);
        dto.setSeconds(59);
        dto.setMilliseconds(999);
      }
      break;
    case "now-1M/M":
      dto.setMonth(dto.getMonth() - 1);
      if (startDate) {
        dto.setDate(1);
        dto.setHours(0);
        dto.setMinutes(0);
        dto.setSeconds(0);
        dto.setMilliseconds(0);
      } else {
        dto.setMonth(dto.getMonth());
        dto.setDate(0);
        dto.setHours(23);
        dto.setMinutes(59);
        dto.setSeconds(59);
        dto.setMilliseconds(999);
      }
      break;
    case "now-1y/y":
      dto.setFullYear(dto.getFullYear() - 1);
      if (startDate) {
        dto.setMonth(0);
        dto.setDate(1);
        dto.setHours(0);
        dto.setMinutes(0);
        dto.setSeconds(0);
        dto.setMilliseconds(0);
      } else {
        dto.setMonth(12);
        dto.setDate(0);
        dto.setHours(23);
        dto.setMinutes(59);
        dto.setSeconds(59);
        dto.setMilliseconds(999);
      }
      break;
    case "now/d":
      dto.setDate(dto.getDate() - 6 - ((dto.getDay() + 8) % 7));
      if (startDate) {
        dto.setHours(0);
        dto.setMinutes(0);
        dto.setSeconds(0);
        dto.setMilliseconds(0);
      } else {
        dto.setHours(23);
        dto.setMinutes(59);
        dto.setSeconds(59);
        dto.setMilliseconds(999);
      }
      break;
    case "now":
      break;
    case "now/w":
      dto.setDate(dto.getDate() - ((dto.getDay() + 7) % 7));
      if (startDate) {
        dto.setHours(0);
        dto.setMinutes(0);
        dto.setSeconds(0);
        dto.setMilliseconds(0);
      } else {
        dto.setDate(dto.getDate() + 6);
        dto.setHours(23);
        dto.setMinutes(59);
        dto.setSeconds(59);
        dto.setMilliseconds(999);
      }
      break;
    case "now/M":
      if (startDate) {
        dto.setDate(1);
        dto.setHours(0);
        dto.setMinutes(0);
        dto.setSeconds(0);
        dto.setMilliseconds(0);
      } else {
        dto.setMonth(dto.getMonth() + 1);
        dto.setDate(0);
        dto.setHours(23);
        dto.setMinutes(59);
        dto.setSeconds(59);
        dto.setMilliseconds(999);
      }
      break;
    case "now/y":
      if (startDate) {
        dto.setMonth(0);
        dto.setDate(1);
        dto.setHours(0);
        dto.setMinutes(0);
        dto.setSeconds(0);
        dto.setMilliseconds(0);
      } else {
        dto.setMonth(12);
        dto.setDate(0);
        dto.setHours(23);
        dto.setMinutes(59);
        dto.setSeconds(59);
        dto.setMilliseconds(999);
      }
      break;
    case "now-5m":
      dto.setMinutes(dto.getMinutes() - 5);
      break;
    case "now-15m":
      dto.setMinutes(dto.getMinutes() - 15);
      break;
    case "now-30m":
      dto.setMinutes(dto.getMinutes() - 30);
      break;
    case "now-1h":
      dto.setHours(dto.getHours() - 1);
      break;
    case "now-3h":
      dto.setHours(dto.getHours() - 3);
      break;
    case "now-6h":
      dto.setHours(dto.getHours() - 6);
      break;
    case "now-12h":
      dto.setHours(dto.getHours() - 12);
      break;
    case "now-24h":
      dto.setHours(dto.getHours() - 24);
      break;
    default:
      return new Date(parseFloat(dt));
  }
  return dto;
};

class GrafanaCustomChart extends Component {
  constructor(props) {
    super(props);
    this.timeFormat = "MM/DD/YYYY HH:mm:ss";
    this.state = {
      error: "",
      errorCount: 0,
      chartContent: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.configChartData();
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Legend,
      zoomPlugin
    );
  }

  configChartData = () => {
    const { refresh, liveTail } = this.props;
    const self = this;
    if (typeof self.interval !== "undefined") {
      clearInterval(self.interval);
    }
    if (liveTail) {
      self.interval = setInterval(() => {
        self.collectChartData();
      }, self.computeRefreshInterval(refresh) * 1000);
    }
    self.collectChartData();
  };

  collectChartData = (chartInst) => {
    const { panel } = this.props;
    const self = this;
    if (panel.targets) {
      panel.targets.forEach((target, ind) => {
        self.getData(ind, target, chartInst);
      });
    }
  };

  computeStep = (start, end) => {
    let step = 10;
    const diff = end - start;
    const min = 60;
    const hrs = 60 * min;
    const days = 24 * hrs;
    const month = 30 * days; // approx.
    const year = 12 * month; // approx.

    if (diff <= 10 * min) {
      // 10 mins
      step = 5;
    } else if (diff <= 30 * min) {
      // 30 mins
      step = 10;
    } else if (diff > 30 * min && diff <= 1 * hrs) {
      // 60 mins/1hr
      step = 20;
    } else if (diff > 1 * hrs && diff <= 3 * hrs) {
      // 3 hrs
      step = 1 * min;
    } else if (diff > 3 * hrs && diff <= 6 * hrs) {
      // 6 hrs
      step = 2 * min;
    } else if (diff > 6 * hrs && diff <= 1 * days) {
      // 24 hrs/1 day
      step = 8 * min;
    } else if (diff > 1 * days && diff <= 2 * days) {
      // 2 days
      step = 16 * min;
    } else if (diff > 2 * days && diff <= 4 * days) {
      // 4 days
      step = 32 * min;
    } else if (diff > 4 * days && diff <= 7 * days) {
      // 7 days
      step = 56 * min;
    } else if (diff > 7 * days && diff <= 15 * days) {
      // 15 days
      step = 2 * hrs;
    } else if (diff > 15 * days && diff <= 1 * month) {
      // 30 days/1 month
      step = 4 * hrs;
    } else if (diff > 1 * month && diff <= 3 * month) {
      // 3 months
      step = 12 * hrs;
    } else if (diff > 3 * month && diff <= 6 * month) {
      // 6 months
      step = 1 * days;
    } else if (diff > 6 * month && diff <= 1 * year) {
      // 1 year/12 months
      step = 2 * days;
    } else if (diff > 1 * year && diff <= 2 * year) {
      // 2 years
      step = 4 * days;
    } else if (diff > 2 * year && diff <= 5 * year) {
      // 5 years
      step = 10 * days;
    } else {
      step = 30 * days;
    }
    return step;
  };

  getData = async (ind, target) => {
    const {
      prometheusURL,
      grafanaURL,
      grafanaAPIKey,
      panel,
      from,
      to,
      templateVars,
      testUUID,
      panelData,
    } = this.props;

    let queryRangeURL = "";
    let endpointURL = "";
    let endpointAPIKey = "";
    if (prometheusURL && prometheusURL !== "") {
      endpointURL = prometheusURL;
      queryRangeURL = "/grafana-ds/query-range";
    } else if (grafanaURL && grafanaURL !== "") {
      endpointURL = grafanaURL;
      endpointAPIKey = grafanaAPIKey;
      queryRangeURL = "/grafana-ds/query-range";
    }
    const self = this;
    let { expr } = target;
    if (templateVars && templateVars !== null && templateVars.length > 0) {
      templateVars.forEach((tv) => {
        const tvrs = tv.split("=");
        if (tvrs.length == 2) {
          expr = expr.replace(
            new RegExp(
              `$${tvrs[0]}`.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            tvrs[1]
          ); //eslint-disable-line
        }
      });
    }
    const start = Math.round(grafanaDateRangeToDate(from).getTime() / 1000);
    const end = Math.round(grafanaDateRangeToDate(to).getTime() / 1000);
    let queryParams = `ds=${panel.datasource}&query=${encodeURIComponent(
      expr
    )}&start=${start}&end=${end}&step=${self.computeStep(start, end)}`;
    if (testUUID && testUUID.trim() !== "") {
      queryParams += `&uuid=${encodeURIComponent(testUUID)}`; // static_chart=true ?
    }

    const processReceivedData = (result) => {
      //   self.props.updateProgress({ showProgress : false });

      if (typeof result == "undefined" || result?.status != "success") {
        return;
      }

      if (typeof result !== "undefined") {
        const fullData = self.transformDataForChart(result);
        if (fullData.length === 0) {
          return;
        }

        self.createOptions(fullData);

        self.state.error &&
          self.setState({
            error: "",
            errorCount: 0,
          });
      }
    };

    if (panelData && panelData[expr]) {
      processReceivedData(panelData[expr]);
    } else {
      queryParams += `&url=${encodeURIComponent(
        endpointURL
      )}&api-key=${encodeURIComponent(endpointAPIKey)}`;
      dataFetch(
        `${CommonData.apiEndPoint}${queryRangeURL}?${queryParams}`,
        {
          method: "GET",
          credentials: "include",
        },
        processReceivedData,
        self.handleError
      );
      // processReceivedData(queryRangeData);
    }
  };

  transformDataForChart(data) {
    if (
      data &&
      data.status === "success" &&
      data.data &&
      data.data.resultType &&
      data.data.resultType === "matrix" &&
      data.data.result &&
      data.data.result.length > 0
    ) {
      const fullData = [];
      data.data.result.forEach((r) => {
        const localData = r.values.map((arr) => {
          const x = moment(arr[0] * 1000).format(this.timeFormat);
          const y = parseFloat(parseFloat(arr[1]).toFixed(2));
          return {
            x,
            y,
          };
        });
        fullData.push({
          data: localData,
          metric: r.metric,
        });
      });
      return fullData;
    }
    return [];
  }

  updateDateRange() {
    const self = this;
    return function (domain) {
      if (domain.length === 2) {
        const min = domain[0];
        const max = domain[1];
        self.props.updateDateRange(
          `${min.getTime().toString()}`,
          min,
          `${max.getTime().toString()}`,
          max,
          false,
          self.props.refresh
        );
      }
    };
  }

  createOptions(fullData = [{ data: [] }]) {
    if (fullData[0]?.data.length > 0) {
      this.setState({
        chartContent: {
          datasets: [
            {
              data: fullData[0].data.map((e) => {
                return {
                  ...e,
                  x: e.x.split(" ")[1],
                };
              }),
              borderColor: "rgb(75, 192, 192)",
            },
          ],
        },
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "y",
              },
            },
          },
        },
      });
    }
  }

  componentWillUnmount() {
    if (typeof this.interval !== "undefined") {
      clearInterval(this.interval);
    }
  }

  computeRefreshInterval = (refresh) => {
    refresh = refresh.toLowerCase();
    const l = refresh.length;
    const dur = refresh.substring(l - 1, l);
    refresh = refresh.substring(0, l - 1);
    let val = parseInt(refresh);
    if (dur === "d") {
      val *= 24;
    }
    if (dur === "h") {
      val *= 60;
    }
    if (dur === "m") {
      val *= 60;
    }
    if (dur === "s") {
      return val;
    }
    return 30; //fallback
  };

  handleError = (error) => {
    const self = this;
    // this.props.updateProgress({ showProgress : false });
    if (error) {
      this.setState({
        error:
          error.message && error.message !== ""
            ? error.message
            : error !== ""
            ? error
            : "",
        errorCount: self.state.errorCount + 1,
      });
    }
  };

  render() {
    const { board, panel, inDialog, handleChartDialogOpen, panelData } =
      this.props;
    const { error, errorCount, chartContent, chartOptions } = this.state;
    const self = this;

    let loadingBar;
    let reloadButton;

    if (error) {
      self.createOptions([], [], []); // add empty data to charts
      loadingBar = (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      );
    }

    if (
      errorCount > 3 * panel.targets.length &&
      typeof self.interval !== "undefined"
    ) {
      clearInterval(self.interval); // clearing the interval to prevent further calls to get chart data
      loadingBar = null;
      reloadButton = (
        <IconButton
          key="Relaod"
          aria-label="reloadButton the Chart"
          color="inherit"
          onClick={() => self.configChartData()}
        >
          <CachedIcon />
        </IconButton>
      );
    }

    const iconComponent = (
      <div>
        {reloadButton}
        <IconButton
          key="chartDialog"
          aria-label="Open chart in a dialog"
          color="inherit"
          onClick={() => handleChartDialogOpen(board, panel, panelData)}
        >
          <OpenInNewOutlinedIcon />
        </IconButton>
      </div>
    );

    return (
      <NoSsr style={{ height: "inherit" }}>
        {loadingBar}
        <Card style={{ height: "inherit" }}>
          {!inDialog && (
            <CardHeader
              disableTypography
              avatar={
                error && (
                  <Tooltip
                    title="There was an error communicating with the server"
                    placement="top"
                  >
                    <WarningIcon />
                  </Tooltip>
                )
              }
              title={panel.title}
              action={iconComponent}
            />
          )}
          <CardContent style={{ height: "100%" }}>
            <div style={{ height: "100%", widht: "100%" }}>
              {chartContent.datasets && chartContent.datasets.length > 0 ? (
                <Line options={chartOptions} data={chartContent} />
              ) : null}
            </div>
          </CardContent>
        </Card>
      </NoSsr>
    );
  }
}

export default GrafanaCustomChart;
