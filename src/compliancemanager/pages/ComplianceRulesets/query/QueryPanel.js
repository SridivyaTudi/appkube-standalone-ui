import * as React from "react";
import QryUtils from "./QryUtils";
import Utils from "../../../utils";
import { config } from "../../../config";
import "./QueryPanel.css";

/**
 * Query panel class to add autocomplete and english translation.
 * If you need translation button and response table visible set
 * isTranslate="true".
 * You can set id="xyz" if you would like to add multiple components in same page.
 */
class QueryPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qry: "",
      resTbl: "",
      elsQry: "",
      selEntity: "",
      suggestns: "",
      styleBg: "whiteBG",
      styleSug: "hideSuggesstionBox",
    };
    this.execute = this.execute.bind(this);
    this.qryChange = this.qryChange.bind(this);
    this.suggestions = this.suggestions.bind(this);
    this.setSuggestions = this.setSuggestions.bind(this);
    this.selectSuggestion = this.selectSuggestion.bind(this);
  }

  qryChange(e) {
    const val = e.target.value;
    this.setState({
      qry: val,
      disableDone: false,
    });
    if (val.length > 2) {
      this.suggestions();
    }
  }

  suggestions() {
    var val = QryUtils.getQuery(this.state.qry);
    if (val.length > 2) {
      return;
    }
    this.setState({
      styleBg: "loadingBG",
      elsQry: "Searching ...",
    });
    console.log(process.env);
    Utils.postReq(
      config.SUGGEST_URL,
      "query=" + val + "&cls=" + this.state.selEntity,
      (response, err) => {
        if (err) {
          this.setState({
            elsQry: "Request Failed with " + err,
          });
          return;
        } else {
          console.log("Res: ", response.data);
          this.setSuggestions(response.data);
        }
      }
    );
  }

  execute(query) {
    const params =
      "query=" +
      JSON.stringify(query) +
      "&cls=" +
      this.state.selEntity +
      "&pageNo=0&pageSize=10&notOnlyIds=true";
    Utils.postReq(config.ELS_QUERY, params, (response, err) => {
      if (err) {
        this.setState({
          elsQry: "Request Failed with " + err,
        });
        return;
      } else {
        if (this.props.resHandler) {
          this.props.resHandler(response);
        } else {
          var pretty = JSON.stringify(response.data, undefined, 4);
          console.log("Res: ", pretty);
          var rec = 0;
          var resTable = "";
          if (response.data && response.data.hits) {
            rec = response.data.hits.total;
          }
          resTable = QryUtils.getResultTable(rec, response.data);
          this.setState({
            elsQry: "Found " + rec + " matches.",
            resTbl: resTable,
          });
        }
      }
    });
  }

  setSuggestions(data) {
    if (data && Array.isArray(data)) {
      var html = QryUtils.getSuggestionList(data);
      this.setState({
        suggestns: html,
        styleBg: "whiteBG",
        styleSug: "showSuggesstionBox",
        elsQry: "Searching has found " + data.length + " records",
      });
    }
  }

  selectSuggestion(e) {
    if (e.target.tagName === "LI") {
      const val = e.target.id;
      var prev = this.state.qry;
      var res = QryUtils.getQuery(prev);
      var sel = prev.replace(new RegExp(res + "$"), val);
      this.setState({
        qry: sel,
        suggestns: "",
        styleBg: "whiteBG",
        styleSug: "hideSuggesstionBox",
        elsQry: "You have selected: " + val,
      });
    }
    e.preventDefault();
  }

  setRes = () => {
    if (this.props.resHandler) {
      this.props.resHandler(this.state.qry);
    }
    this.setState({
      disableDone: true,
    });
  };

  render() {
    const id = this.props.id || "qp";
    return (
      <div>
        <div>
          <label htmlFor={`${id}query`}>Query:</label>
          <input
            type="text"
            id={`${id}query`}
            value={this.state.qry}
            onChange={this.qryChange}
            className={this.state.styleBg}
            style={{ width: "80%" }}
            placeholder="Enter your query string..."
          />
          <div
            onClick={this.selectSuggestion}
            className="suggesstionBox"
            dangerouslySetInnerHTML={{ __html: this.state.suggestns }}
          ></div>
          <input
            type="button"
            value="Done"
            onClick={this.setRes}
            disabled={this.state.disableDone}
          />
        </div>
      </div>
    );
  }
}

export default QueryPanel;
