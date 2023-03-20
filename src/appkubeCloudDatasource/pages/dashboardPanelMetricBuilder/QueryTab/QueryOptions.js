import React, { Component } from "react";

class QueryOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="Query-options">
          <div className="d-block Query-options-inner">
            <div className="d-inline-block">
              <button className="btn data-point-btn">
                Max data points<i className="far fa-question-circle"></i>
              </button>
            </div>
            <div className="d-inline-block">
              <input
                type="number"
                class="form-control"
                placeholder="0"
              />
            </div>
            <div className="d-inline-block data-point-equal ">&#x3d;</div>
            <div className="d-inline-block data-panel">Width of panel</div>
          </div>
          <div className="d-block Query-options-inner">
            <div className="d-inline-block">
              <button className="btn data-point-btn">
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
          <div className="d-block Query-options-inner">
            <div className="d-inline-block">
              <button className="btn data-point-btn">
              Interval<i className="far fa-question-circle"></i>
              </button>
            </div>
            <div className="d-inline-block data-panel">30s</div>
            <div className="d-inline-block data-point-equal ">&#x3d;</div>
            <div className="d-inline-block data-panel">Time range / max data points</div>
          </div>
          <div className="d-block Query-options-inner">
            <div className="d-inline-block">
              <button className="btn data-point-btn">
              Relative time<i className="far fa-question-circle"></i>
              </button>
            </div>
            <div className="d-inline-block">
              <input
                type="text"
                id="text"
                class="form-control"
                placeholder="1h"
              />
            </div>
          </div>
          <div className="d-block Query-options-inner">
            <div className="d-inline-block">
              <button className="btn data-point-btn">
              Time shift<i className="far fa-question-circle"></i>
              </button>
            </div>
            <div className="d-inline-block">
              <input
                type="text"
                id="text"
                class="form-control" 
                placeholder="1h"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default QueryOptions;
