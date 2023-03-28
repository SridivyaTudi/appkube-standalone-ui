import React, { Component } from "react";

class ScriptEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeEditorValue: "",
    };
  }

  render() {
    return (
      <div className="monitor-alerts-container">
        <div className="alert-page-container">
          <div className="common-container script-editor">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className="alert-heading">Script Editor</div>
              </div>
              <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="float-right script-editor-btn">
                  <button className="asset-white-button">Editor</button>
                  <button className="asset-white-button">Editor+ Logs</button>
                  <button className="asset-white-button">
                    Save New Script
                  </button>
                  <button className="asset-white-button">Exit</button>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 p-t-20 script-editor">
            <div className="script-editor-new">
              <div className="script-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID your Script"
                />
              </div>
              <button className="asset-white-button">Stream</button>
                <button className="asset-white-button">Batch</button>
              <div className="script-select">
                <select className="form-control">
                  <option>greater than</option>
                  <option>greater than</option>
                  <option>greater than</option>
                </select>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 p-t-20 script-editor">
            <div className="validate-bottom-text">
              {" "}
              &gt; You have unsaved changes, save to validate TICKscript
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ScriptEditor;
