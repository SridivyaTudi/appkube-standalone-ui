import React from "react";
import Api from "./Api";
import Log from "./Log";
import Metric from "./Metric";
import Trace from "./Trace";

class QueryTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryType: "metric",
      metricQueryTypeBuilder: false,
    };
  }

  render() {
    const { queryType, metricQueryTypeBuilder } = this.state;
    return (
      <>
        <div className="d-block panel-data-source">
          <div className="d-inline-block data-source-box">Data Source</div>
          <div className="d-inline-block data-source-select">
            <select>
              <option>Default </option>
              <option>Default 1</option>
              <option>Default 2</option>
              <option>Default 3</option>
            </select>
          </div>
          <div className="d-inline-block question-button">
            <button className="panel-gray-button min-width-inherit">
              <i class="far fa-question-circle"></i>
            </button>
          </div>
          <div className="d-inline-block query-options-box">
            <i class="fa fa-chevron-right"></i>
            <strong>Query options</strong>
            <span>MD = auto =1257</span>
            <span>interval = 15s</span>
          </div>
          <div className="d-inline-block query-inspector-box">
            Query inspector
          </div>
        </div>
        <div className="d-block panel-query-inspector">
          <i class="fas fa-chevron-down"></i>
          <strong>A</strong>
          <p>
            {
              '{"namespace":"","metricName":"","expression":"","dimensions":{},"region":"default","id":"","alias":"","statistics":["Average"],"period":"","refId":"A","matchExact":true}'
            }
          </p>
          <div className="float-right">
            <button className="btn">
              <i class="fas fa-caret-down"></i>
            </button>
            <button className="btn">
              <i class="fas fa-caret-up"></i>
            </button>
            <button className="btn">
              <i class="far fa-copy"></i>
            </button>
            <button className="btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div className="d-block panel-builder-code">
          <div className="d-inline-block select-menu">
            <select
              value={queryType}
              onChange={(e) => {
                this.setState({ queryType: e.target.value });
              }}
            >
              <option value={"metric"}>Metric</option>
              <option value={"log"}>LOG</option>
              <option value={"trace"}>Trace</option>
              <option value={"api"}>API</option>
            </select>
          </div>
          {queryType === "metric" && (
            <>
              <div className="d-inline-block select-menu">
                <select>
                  <option>Metric Search</option>
                  <option>Metric Query</option>
                </select>
              </div>
              <div className="float-right builder-code-button">
                <button
                  className={metricQueryTypeBuilder ? `btn active` : `btn`}
                  onClick={() => {
                    this.setState({
                      metricQueryTypeBuilder: !metricQueryTypeBuilder,
                    });
                  }}
                >
                  Builder
                </button>
                <button
                  className={!metricQueryTypeBuilder ? `btn active` : `btn`}
                  onClick={() => {
                    this.setState({
                      metricQueryTypeBuilder: !metricQueryTypeBuilder,
                    });
                  }}
                >
                  Code
                </button>
              </div>
            </>
          )}
        </div>
        {queryType === "metric" && (
          <Metric queryType={this.state.metricQueryTypeBuilder} />
        )}
        {queryType === "log" && <Log />}
        {queryType === "trace" && <Trace />}
        {queryType === "api" && <Api />}
      </>
    );
  }
}

export default QueryTab;
