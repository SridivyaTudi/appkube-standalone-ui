import React from "react";

class QueryOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relativeTime: "",
      timeShift: "",
    };
  }

  handleInputChange = (e) => {
    if (e.target.value) {
      this.setState({ [e.target.name]: [e.target.value] });
    } else {
      this.setState({ [e.target.name]: "" });
    }
  };

  render() {
    const { relativeTime, timeShift } = this.state;
    return (
      <>
        <div className="query-options">
          <div className="d-block query-options-inner">
            <div className="d-inline-block">
              <button className=" data-point-btn">
                Max data points<i className="far fa-question-circle"></i>
              </button>
            </div>
            <div className="d-inline-block">
              <input type="number" className="form-control" placeholder="0" />
            </div>
            <div className="d-inline-block data-point-equal ">&#x3d;</div>
            <div className="d-inline-block data-panel">Width of panel</div>
          </div>
          <div className="d-block query-options-inner">
            <div className="d-inline-block">
              <button className="data-point-btn">
                Min interval<i className="far fa-question-circle"></i>
              </button>
            </div>
            <div className="d-inline-block">
              <input
                type="text"
                id="Text"
                class="form-control"
                placeholder="No Limit"
              />
            </div>
          </div>
          <div className="d-block query-options-inner">
            <div className="d-inline-block">
              <button className="data-point-btn">
                Interval<i className="far fa-question-circle"></i>
              </button>
            </div>
            <div className="d-inline-block data-panel">30s</div>
            <div className="d-inline-block data-point-equal ">&#x3d;</div>
            <div className="d-inline-block data-panel">
              Time range / max data points
            </div>
          </div>
          <div className="d-block query-options-inner">
            <div className="d-inline-block">
              <button className="data-point-btn">Relative time</button>
            </div>
            <div className="d-inline-block">
              <input
                type="text"
                id="text"
                class="form-control"
                placeholder="1h"
                name="relativeTime"
                value={relativeTime}
                onChange={(e) => this.handleInputChange(e)}
              />
            </div>
          </div>
          <div className="d-block query-options-inner">
            <div className="d-inline-block">
              <button className="data-point-btn">Time shift</button>
            </div>
            <div className="d-inline-block">
              <input
                type="text"
                id="text"
                class="form-control"
                placeholder="1h"
                name="timeShift"
                value={timeShift}
                onChange={(e) => this.handleInputChange(e)}
              />
            </div>
          </div>
          {relativeTime || timeShift ? (
            <div className="d-block query-options-inner">
              <div className="d-inline-block">
                <button className="data-point-btn">Hide time info</button>
              </div>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default QueryOptions;
