import React from "react";
import Tree from "../../components/Tree";
import DiscardPopup from "../../components/DiscardPopup";
import ApiKeySourcePopup from "./../../components/ApiKeySourcePopup";
import { dummyData } from "./dummyData";
import { propertiesDummy } from "./properties";

class EditorGslBuilder extends React.Component {
  discardPopupRef;
  addValuePopupRef;

  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      operators: [],
      functions: [],
      properties: [],
      keywords: [],
      query: [],
      treeData: [
        {
          name: "apiKeySource:",
          type: "string",
        },
        {
          name: "binaryMediaTypes:",
          type: "Array",
          length: "[1]",
          isOpened: false,
          subData: [
            {
              name: "O:",
              type: "object",
              isOpened: false,
              subData: [{ name: "xyz:", type: "string" }],
            },
            { name: "CreatedDate:", type: "int" },
            { name: "description:", type: "string" },
          ],
        },
        {
          name: "endPointConfiguration:",
          type: "object",
          isOpened: false,
          subData: [],
        },
        { name: "MinimumCompretionSize:", type: "string" },
        {
          name: "policy:",
          type: "object",
          subData: [
            { name: "CreatedDate:", type: "int" },
            { name: "description:", type: "string" },
          ],
          isOpened: false,
        },
        { name: "Version:", type: "String" },
        {
          name: "resources:",
          type: "Array",
          length: "[1]",
          isOpened: false,
          subData: [
            {
              name: "O:",
              type: "object",
              isOpened: false,
              subData: [{ name: "abc:", type: "string" }],
            },
            { name: "CreatedDate:", type: "int" },
            { name: "description:", type: "string" },
          ],
        },
        {
          name: "Authorizers:",
          type: "Array",
          length: "[1]",
          subData: [],
          isOpened: false,
        },
        {
          name: "VPC:",
          type: "object",
          subData: [],
          isOpened: false,
        },
        { name: "id:", type: "String" },
        { name: "Types:", type: "String" },
        { name: "Name:", type: "String" },
        { name: "Dome9id:", type: "String" },
        { name: "AccountNumber:", type: "String" },
        { name: "Region:", type: "String" },
      ],
      treeDuplicateData: [
        {
          name: "apiKeySource:",
          type: "string",
        },
        {
          name: "binaryMediaTypes:",
          type: "Array",
          length: "[1]",
          isOpened: false,
          subData: [
            {
              name: "O:",
              type: "object",
              isOpened: false,
              subData: [{ name: "xyz:", type: "string" }],
            },
            { name: "CreatedDate:", type: "int" },
            { name: "description:", type: "string" },
          ],
        },
        {
          name: "endPointConfiguration:",
          type: "object",
          isOpened: false,
          subData: [],
        },
        { name: "MinimumCompretionSize:", type: "string" },
        {
          name: "policy:",
          type: "object",
          subData: [
            { name: "CreatedDate:", type: "int" },
            { name: "description:", type: "string" },
          ],
          isOpened: false,
        },
        { name: "Version:", type: "String" },
        {
          name: "resources:",
          type: "Array",
          length: "[1]",
          isOpened: false,
          subData: [
            {
              name: "O:",
              type: "object",
              isOpened: false,
              subData: [{ name: "abc:", type: "string" }],
            },
            { name: "CreatedDate:", type: "int" },
            { name: "description:", type: "string" },
          ],
        },
        {
          name: "Authorizers:",
          type: "Array",
          length: "[1]",
          subData: [],
          isOpened: false,
        },
        {
          name: "VPC:",
          type: "object",
          subData: [],
          isOpened: false,
        },
        { name: "id:", type: "String" },
        { name: "Types:", type: "String" },
        { name: "Name:", type: "String" },
        { name: "Dome9id:", type: "String" },
        { name: "AccountNumber:", type: "String" },
        { name: "Region:", type: "String" },
      ],
      mouseOverIndex: -1,
    };
    this.discardPopupRef = React.createRef();
    this.addValuePopupRef = React.createRef();
  }

  componentDidMount() {
    // make an api call here
    this.setState({
      operators: dummyData.OPERATOR,
      functions: dummyData.FUNCTION,
      keywords: dummyData.KEYWORD,
      properties: propertiesDummy.properties,
    });
    let getParamByName = this.getParameterByName("cls", window.location.href);
    if (getParamByName) {
      const { query } = this.state;
      query.push({
        type: "root",
        value: getParamByName,
      });
      this.setState({
        query,
      });
    }
  }

  getParameterByName = (name, url) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  onSearchChange = (e) => {
    const { value } = e.target;
    this.setState({
      searchKey: value,
    });
    const { treeDuplicateData } = this.state;
    var searchResult = [];
    for (let i = 0; i < treeDuplicateData.length; i++) {
      if (treeDuplicateData[i].name.indexOf(value) !== -1 || value === "") {
        searchResult.push(treeDuplicateData[i]);
      } else if (
        treeDuplicateData[i].name.toLowerCase().indexOf(value) !== -1 ||
        value === ""
      ) {
        searchResult.push(treeDuplicateData[i]);
      }
    }
    this.setState({
      treeData: searchResult,
    });
  };

  addFunctionToEditor = (item) => {
    const { query } = this.state;
    const data = {
      type: item.type,
      value: item.key,
      item,
    };
    query.push(data);
    this.setState({
      query,
    });
  };

  addKeywordToEditor = (item) => {
    const { query } = this.state;
    const data = {
      type: item.type,
      value: item.key,
      item,
    };
    query.push(data);
    this.setState({
      query,
    });
  };

  addPropertyToEditor = (item, value) => {
    const { query } = this.state;
    const data = {
      type: "PROPERTIES",
      value: value,
      item,
    };
    query.push(data);
    this.setState({
      query,
    });
  };

  onClickConfirmRemoveEntity = (index) => {
    const { query } = this.state;
    let length = index;
    if (index < 0) {
      length = 0;
    }
    query.length = length;
    this.setState({
      query,
    });
  };

  addSourceKey = (operator, value) => {
    const { query } = this.state;
    let lastQueryValue = query[query.length - 1].value;
    query[query.length - 1].value =
      lastQueryValue + " " + operator.value + " " + value;
    this.setState({
      query,
    });
    this.addValuePopupRef.current.toggle({ value: "" }, { value: "" });
  };

  onClickDeleteItem = (item, index) => {
    const { query } = this.state;
    let text = "";
    for (let i = index; i < query.length; i++) {
      text = text + query[i].value + " ";
    }
    this.discardPopupRef.current.toggle(index, text);
  };

  addOperatorToEditor = (item) => {
    const { query } = this.state;
    //console.log(query);
    const data = {
      type: item.type,
      value: item.key,
      item,
    };
    this.addValuePopupRef.current.toggle(query[query.length - 1], data);
  };

  displayOperators = () => {
    const { operators } = this.state;
    let retOperatorData = [];
    for (let i = 0; i < operators.length; i++) {
      let row = operators[i];
      retOperatorData.push(
        <span
          onClick={() => this.addOperatorToEditor(row)}
          dangerouslySetInnerHTML={{ __html: row.key }}
          title={row.hint ? row.hint : ""}
        ></span>
      );
    }
    return retOperatorData;
  };

  displayFunctions = () => {
    const { functions } = this.state;
    let retData = [];
    for (let i = 0; i < functions.length; i++) {
      let row = functions[i];
      retData.push(
        <span
          onClick={() => this.addFunctionToEditor(row)}
          dangerouslySetInnerHTML={{ __html: row.key }}
          title={row.hint ? row.hint : ""}
        ></span>
      );
    }
    return retData;
  };

  displayKeywords = () => {
    const { keywords } = this.state;
    let retData = [];
    for (let i = 0; i < keywords.length; i++) {
      let row = keywords[i];
      retData.push(
        <span
          onClick={() => this.addKeywordToEditor(row)}
          dangerouslySetInnerHTML={{ __html: row.key }}
          title={row.hint ? row.hint : ""}
        ></span>
      );
    }
    return retData;
  };

  displayProperties = () => {
    const { properties } = this.state;
    let retData = [];
    for (let i = 0; i < properties.length; i++) {
      let row = properties[i];
      let key = Object.keys(row);
      retData.push(
        <span
          onClick={() => this.addPropertyToEditor(row, key[0])}
          dangerouslySetInnerHTML={{ __html: key[0] }}
        ></span>
      );
    }
    return retData;
  };

  onMouseEnterEditor = (index) => {
    this.setState({
      mouseOverIndex: index,
    });
  };

  onMouseLeaveEditor = () => {
    this.setState({
      mouseOverIndex: -1,
    });
  };

  displayEditorBox = () => {
    const { query, mouseOverIndex } = this.state;
    let retData = [];
    for (let i = 0; i < query.length; i++) {
      let row = query[i];
      let color = "";
      let textDecoration = "";
      if (mouseOverIndex <= i && mouseOverIndex !== -1) {
        color = "#f93d3d";
        textDecoration = "line-through";
      }
      retData.push(
        <div
          style={{ color: color, textDecoration: textDecoration }}
          className="d-inline-block code"
          onClick={() => this.onClickDeleteItem(row, i)}
          onMouseEnter={() => this.onMouseEnterEditor(i)}
          onMouseLeave={() => this.onMouseLeaveEditor()}
        >
          <button
            style={{ visibility: mouseOverIndex === i ? "visible" : "hidden" }}
          >
            <i className="fa fa-trash"></i>
          </button>
          <p dangerouslySetInnerHTML={{ __html: row.value }}></p>
        </div>
      );
    }
    return retData;
  };

  render() {
    return (
      <div className="compliance-dashboard-container">
        <div className="compliancemanager-page-container editorgslbuilder-page-container">
          <div className="common-container">
            <div className="gsl-editor-logos">
              <h3>GSL Editor</h3>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12">
                <div className="gsl-editor-radio">
                  <ul>
                    <li>
                      <input type="radio" id="Wizard" name="selector" checked />
                      <label htmlFor="Wizard">Wizard</label>
                    </li>
                    <li>
                      <input type="radio" id="Script" name="selector" />
                      <label htmlFor="Script">Script</label>
                    </li>
                  </ul>
                </div>
                <div className="row">
                  <div className="col-md-3 col-sm-3">
                    <div className="form-group filter-control-group">
                      <label htmlFor="Account">Account</label>
                      <select className="form-control" id="Account">
                        <option value="">AWS</option>
                        <option value="">AWS</option>
                        <option value="">AWS</option>
                        <option value="">AWS</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className="form-group filter-control-group">
                      <label htmlFor="Region">Region</label>
                      <select className="form-control" id="Region">
                        <option value="">All</option>
                        <option value="">abc</option>
                        <option value="">abc</option>
                        <option value="">abc</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className="form-group filter-control-group">
                      <label htmlFor="vpc">VPC</label>
                      <select className="form-control" id="vpc">
                        <option value="">All</option>
                        <option value="">abc</option>
                        <option value="">abc</option>
                        <option value="">abc</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3">
                    <div className="p-t-20 form-group">
                      <a className="blue-button m-r-0 m-b-0 runtest-button">
                        <i className="fa fa-play-circle"></i> RUN TEST
                      </a>
                    </div>
                  </div>
                </div>
                <div className="editor-add-code">{this.displayEditorBox()}</div>
                <div className="editor-code">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="editor-code-heading">Operators:</div>
                    </div>
                    <div className="col-md-10">{this.displayOperators()}</div>
                  </div>
                </div>
                <div className="editor-code">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="editor-code-heading">Functions:</div>
                    </div>
                    <div className="col-md-10">{this.displayFunctions()}</div>
                  </div>
                </div>
                <div className="editor-code">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="editor-code-heading">Keywords:</div>
                    </div>
                    <div className="col-md-10">{this.displayKeywords()}</div>
                  </div>
                </div>
                <div className="editor-code">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="editor-code-heading">Properties:</div>
                    </div>
                    <div className="col-md-10">{this.displayProperties()}</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="context-preview-box">
                  <h4>Context Preview</h4>
                  <div className="context-preview">
                    <div className="d-block form-group filter-search-control">
                      <form>
                        <input
                          type="text"
                          className="input-group-text"
                          onChange={this.onSearchChange}
                          value={this.state.searchKey}
                          placeholder="Search"
                        />
                        <button>
                          <i className="fa fa-search"></i>
                        </button>
                      </form>
                    </div>
                    <Tree valueForTree={this.state.treeData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DiscardPopup
          ref={this.discardPopupRef}
          onRemoveEntity={this.onClickConfirmRemoveEntity}
        />
        <ApiKeySourcePopup
          ref={this.addValuePopupRef}
          addApikeySourceFunction={this.addSourceKey}
        />
      </div>
    );
  }
}

export default EditorGslBuilder;
