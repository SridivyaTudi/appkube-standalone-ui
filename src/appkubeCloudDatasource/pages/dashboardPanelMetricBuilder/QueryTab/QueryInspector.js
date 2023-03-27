import React from "react";
import Multiselect from "multiselect-react-dropdown";

class QueryInspectorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inspectorOpen: false,
      queryType: "",
      path: "",
      fields: "",
      titleHover: false,
      titleEdit: false,
      queryTitle: this.props.name,
    };
  }

  handleSelectChange = (e) => {
    if (e.target.value) {
      this.setState({ [e.target.name]: [e.target.value] });
    } else {
      this.setState({ [e.target.name]: "" });
    }
  };

  handleTitleHover = () => {
    this.setState({ titleHover: !this.state.titleHover });
  };

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
    this.props.handleNameChange(this.state.queryTitle, this.props.currentIndex);
  };

  render() {
    const { inspectorOpen, queryType, path, queryTitle } = this.state;
    const { currentIndex } = this.props;
    return (
      <>
        <div className="d-block panel-query-inspector">
          <i
            class={`fas fa-chevron-${inspectorOpen ? "down" : "right"}`}
            onClick={() => {
              this.setState({ inspectorOpen: !this.state.inspectorOpen });
            }}
            style={{ cursor: "pointer" }}
          ></i>
          {!this.state.titleEdit && (
            <strong
              className="queryTitle"
              onMouseEnter={() => {
                this.setState({ titleHover: !this.state.titleHover });
              }}
              onMouseLeave={() => {
                this.setState({ titleHover: !this.state.titleHover });
              }}
              onClick={() => {
                this.setState({ titleEdit: true });
              }}
            >
              {this.props.name}
              {this.state.titleHover && <i class="fas fa-pencil"></i>}
            </strong>
          )}
          {this.state.titleEdit && (
            <input
              type="text"
              name="queryTitle"
              value={this.state.queryTitle}
              onKeyDown={(e) => {
                this.handleNameChange(e);
                if (e.keyCode === 13) {
                  this.setState({ titleEdit: false, titleHover: false });
                }
              }}
              onChange={(e) => this.handleNameChange(e)}
              onBlur={(e) => {
                this.setState({
                  titleEdit: false,
                  titleHover: false,
                });
                this.handleNameChange(e);
              }}
            />
          )}
          <p>
            {
              '{"namespace":"","metricName":"","expression":"","dimensions":{},"region":"default","id":"","alias":"","statistics":["Average"],"period":"","refId":"A","matchExact":true}'
            }
          </p>
          <div className="float-right">
            <button
              className="btn"
              onClick={() => this.props.handleSort(currentIndex, "down")}
            >
              <i class="fas fa-caret-down"></i>
            </button>
            <button
              className="btn"
              onClick={() => this.props.handleSort(currentIndex, "up")}
            >
              <i class="fas fa-caret-up"></i>
            </button>
            <button
              className="btn"
              onClick={() => this.props.handleCopy(currentIndex)}
            >
              <i class="far fa-copy"></i>
            </button>
            <button
              className="btn"
              onClick={() => this.props.handleDelete(currentIndex)}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        {inspectorOpen && (
          <div className="query-editor">
            <div className="query-type-option">
              <div className="query-type-button">Query type</div>
              <div className="type-option">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={queryType}
                  onChange={this.handleSelectChange}
                  name="queryType"
                >
                  <option selected value="">
                    List public files
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            {queryType && (
              <div className="query-type-option">
                <div className="query-type-button">Path</div>
                <div className="type-option">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={path}
                    name="path"
                    onChange={this.handleSelectChange}
                  >
                    <option selected value="">
                      List public files
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            )}
            {path && queryType && (
              <div className="query-type-option">
                <div className="query-type-button">Fields</div>
                <div className="type-option">
                  <Multiselect className="fields-select"
                    isObject={false}
                    onKeyPressFn={function noRefCheck() {}}
                    onRemove={function noRefCheck() {}}
                    onSearch={function noRefCheck() {}}
                    onSelect={function noRefCheck() {}}
                    options={[
                      "Option 1",
                      "Option 2",
                      "Option 3",
                      "Option 4",
                      "Option 5",
                    ]}
                  />
                </div>
                <div className="buffer-button">Buffer</div>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Auto"
                  />
                </div>
              </div>
            )}
            <div className="data-testid-info">
              <div className="info-icon">
                <i class="far fa-info-circle"></i>
              </div>
              <div className="testid-info-content">
                <label className="d-block">Grafana Live - Measurements</label>
                <span>
                  This supports real-time event streams in Grafana core. This
                  feature is under heavy development. Expect the interfaces and
                  structures to change as this becomes more production ready.
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default QueryInspectorModal;
