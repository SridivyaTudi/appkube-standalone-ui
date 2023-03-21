import React from "react";
import Data from "./Data";
import Query from "./Query";
import Json from "./Json";
import Stats from "./Stats";

class QueryInspector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryModalFullWidth: false,
      currentActiveTab: "data",
    };
  }

  setCurrentActiveTab = (tabName) => {
    this.setState({ currentActiveTab: tabName });
  };

  render() {
    const { queryModalFullWidth, currentActiveTab } = this.state;
    return (
      <div className="query-inspector">
        {!queryModalFullWidth && (
          <div className="mask" onClick={() => this.props.visible()}></div>
        )}
        <div className="query-modal">
          <div className="head-div d-block">
            <div className="buttons-div">
              <button
                onClick={() =>
                  this.setState({
                    queryModalFullWidth: !this.state.queryModalFullWidth,
                  })
                }
              >
                <i
                  class={`fas fa-chevron-${
                    !queryModalFullWidth ? "left" : "right"
                  }`}
                ></i>
              </button>
              <button onClick={() => this.props.visible()}>
                <i class="fas fa-times"></i>
              </button>
            </div>
            <h3>Inspect: Panel Title</h3>
            <p>1 queries with total query time of 3.10 s</p>
            <div className="d-inline-flex buttons">
              <a
                className={currentActiveTab === "data" ? "active" : ""}
                onClick={() => this.setCurrentActiveTab("data")}
              >
                Data
              </a>
              <a
                className={currentActiveTab === "stats" ? "active" : ""}
                onClick={() => this.setCurrentActiveTab("stats")}
              >
                Stats
              </a>
              <a
                className={currentActiveTab === "json" ? "active" : ""}
                onClick={() => this.setCurrentActiveTab("json")}
              >
                JSON
              </a>
              <a
                className={currentActiveTab === "query" ? "active" : ""}
                onClick={() => this.setCurrentActiveTab("query")}
              >
                Query
              </a>
            </div>
          </div>
          <div className="body-div">
            {currentActiveTab === "data" ? (
              <Data />
            ) : currentActiveTab === "json" ? (
              <Json />
            ) : currentActiveTab === "query" ? (
              <Query />
            ) : (
              currentActiveTab === "stats" && <Stats />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default QueryInspector;
