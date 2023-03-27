import React from "react";
import Api from "./Api";
import Log from "./Log";
import Metric from "./Metric";
import QueryOptions from "./QueryOptions";
import Trace from "./Trace";
import QueryInspector from "./QueryInspector";
import QueryInspectorModal from "./QueryInspector/index";

class QueryTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryType: "metric",
      metricQueryTypeBuilder: false,
      queryOptionsShow: false,
      queryInspectorModalVisible: false,
      QueryInspectorData: ["adipiscing", "maximus", "Integer"],
    };
  }

  toggleQueryInspectorModal = () => {
    this.setState({ queryInspectorModalVisible: false });
  };

  handleQueryInspectorSort = (currentIndex, direction) => {
    const { QueryInspectorData } = this.state;

    const position = QueryInspectorData.findIndex(
      (i, index) => index === currentIndex
    );

    if (position < 0) {
      throw new Error("Given item not found.");
    } else if (
      (direction === "up" && position === 0) ||
      (direction === "down" && position === QueryInspectorData.length - 1)
    ) {
      return;
    }

    const item = QueryInspectorData[position];
    const newQueryInspectorData = QueryInspectorData.filter(
      (i, index) => index !== currentIndex
    );
    if (direction === "up") {
      newQueryInspectorData.splice(position - 1, 0, item);
    } else {
      newQueryInspectorData.splice(position + 1, 0, item);
    }
    this.setState({ QueryInspectorData: newQueryInspectorData });
  };

  handleQueryInspectorCopy = (itemIndex) => {
    let { QueryInspectorData } = this.state;
    const copiedItem = QueryInspectorData[itemIndex];
    this.setState((prevState) => ({
      QueryInspectorData: [...prevState.QueryInspectorData, copiedItem],
    }));
  };

  handleQueryInspectorDelete = (itemIndex) => {
    let { QueryInspectorData } = this.state;
    QueryInspectorData.splice(itemIndex, 1);
    this.setState({ QueryInspectorData });
  };

  handleQueryInspectorNameChange = (value, index) => {
    const { QueryInspectorData } = this.state;
    QueryInspectorData[index] = value;
    this.setState({ QueryInspectorData });
  };

  render() {
    const {
      queryType,
      metricQueryTypeBuilder,
      queryOptionsShow,
      queryInspectorModalVisible,
      QueryInspectorData,
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
          <div
            className="query-options-container "
            style={{ height: queryOptionsShow ? "280px" : "0px" }}
          >
            <div className="d-inline-block query-options-box">
              <div
                style={{ cursor: "pointer" }}
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
            </div>
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
        {QueryInspectorData.map((item, index) => {
          return (
            <QueryInspector
              key={index}
              currentIndex={index}
              name={item}
              handleSort={this.handleQueryInspectorSort}
              handleCopy={this.handleQueryInspectorCopy}
              handleDelete={this.handleQueryInspectorDelete}
              handleNameChange={this.handleQueryInspectorNameChange}
            />
          );
        })}
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
          <QueryInspectorModal visible={this.toggleQueryInspectorModal} />
        )}
      </>
    );
  }
}

export default QueryTab;
