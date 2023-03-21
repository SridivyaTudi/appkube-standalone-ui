import React from "react";
import Api from "./Api";
import Log from "./Log";
import Metric from "./Metric";
import QueryOptions from "./QueryOptions";
import Trace from "./Trace";
import QueryInspector from "./QueryInspector";

class QueryTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryType: "metric",
      metricQueryTypeBuilder: false,
      queryOptionsShow: false,
      queryInspectorModalVisible: false,
    };
  }

  toggleQueryInspectorModal = () => {
    this.setState({ queryInspectorModalVisible: false });
  };

  render() {
    const {
      queryType,
      metricQueryTypeBuilder,
      queryOptionsShow,
      queryInspectorModalVisible,
    } = this.state;

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
            <div
              className="d-inline-block"
              onClick={() => {
                this.setState({
                  queryOptionsShow: !this.state.queryOptionsShow,
                });
              }}
            >
              <i
                class={`fa fa-chevron-${queryOptionsShow ? "down" : "right"}`}
              ></i>
              <strong>Query options</strong>
            </div>

            <span>MD = auto =1257</span>
            <span>interval = 15s</span>
            {queryOptionsShow && <QueryOptions />}
          </div>
          <div className="d-inline-block question-button">
            <button
              type="button"
              class="panel-gray-button inspector-btn"
              onClick={() => {
                this.setState({ queryInspectorModalVisible: true });
              }}
            >
              Query inspector
            </button>
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
        <div className="query-editor">
          <div className="query-type-option">
            <div className="query-type-button">Query type</div>
            <div className="type-option">
              <select className="form-select" aria-label="Default select example">
                <option selected>List public files</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div className="query-type-option">
            <div className="query-type-button">Path</div>
            <div className="type-option">
              <select className="form-select" aria-label="Default select example">
                <option selected>List public files</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <span><i class="far fa-times"></i></span>
            </div>
          </div>
          <div className="query-type-option">
            <div className="query-type-button">Fields</div>
            <div className="type-option">
              <select className="form-select" aria-label="Default select example">
                <option selected>List public files</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <span><i class="far fa-times"></i></span>
            </div>
            <div className="buffer-button">Buffer</div>
            <div className="">
              <input type="text" className="form-control" placeholder="Auto" />
            </div>
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
        {queryInspectorModalVisible && (
          <QueryInspector visible={this.toggleQueryInspectorModal} />
        )}
      </>
    );
  }
}

export default QueryTab;
