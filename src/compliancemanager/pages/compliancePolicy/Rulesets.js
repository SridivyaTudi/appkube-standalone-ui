import React, {Component} from "react";
//import * as React from 'react';

export class Rulesets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      ruleSetData: [
        {
          title: 'Ruleset',
          checkValueStatus: false,
          subData: [
            {
              title: 'AWS CCPA Framework',
              checkStatus: false,
            },
            {
              title: 'AWS CIS Foundation',
              checkStatus: false,
            },
            {
              title: 'AWS CloudGuard Best Practice',
              checkStatus: false,
            },
            {
              title: 'AWS CloudGuard ChecklUp',
              checkStatus: false,
            },
          ],
        },
      ],
      duplicateruleSetData: [
        {
          title: 'Ruleset',
          checkValueStatus: false,
          subData: [
            {
              title: 'AWS CCPA Framework',
              checkStatus: false,
            },
            {
              title: 'AWS CIS Foundation',
              checkStatus: false,
            },
            {
              title: 'AWS CloudGuard Best Practice',
              checkStatus: false,
            },
            {
              title: 'AWS CloudGuard ChecklUp',
              checkStatus: false,
            },
          ],
        },
      ],
    };
  }

  displaRulesetData = () => {
    let retData = [];
    for (let i = 0; i < this.state.ruleSetData.length; i++) {
      let responseData = this.state.ruleSetData[i];
      const subFolders = responseData.subData;
      const subJSX = [];
      for (let j = 0; j < subFolders.length; j++) {
        const data = subFolders[j];
        subJSX.push(
          <li>
            <div className="pointer-label">
              <input
                type="checkbox"
                checked={data.checkStatus}
                className="checkbox"
                onClick={() => this.onClickChildCheckbox(i, j)}
              />
              {data.title}
            </div>
          </li>
        );
      }
      retData.push(
        <div>
          <h5>
            <div className="pointer-label">
              <input
                type="checkbox"
                checked={responseData.checkValueStatus}
                className="checkbox"
                onChange={(e) => {
                  this.onChangeParentCheckbox(e, i);
                }}
              />{' '}
              {responseData.title}
            </div>
          </h5>
          <ul>{subJSX}</ul>
        </div>
      );
    }
    return retData;
  };

  onChangeParentCheckbox = (e, index) => {
    const { ruleSetData } = this.state;
    const parentCheckbox = ruleSetData[index];
    const checked = e.target.checked;
    for (let j = 0; j < parentCheckbox.subData.length; j++) {
      parentCheckbox.subData[j].checkStatus = checked;
      parentCheckbox.checkValueStatus = checked;
    }
    this.setState({
      ruleSetData,
    });
  };

  onClickChildCheckbox = (parentIndex, childIndex) => {
    let countCheckedCheckbox = 0;
    const { ruleSetData } = this.state;
    const parentCheckbox = ruleSetData[parentIndex];
    parentCheckbox.subData[childIndex].checkStatus = !parentCheckbox.subData[childIndex].checkStatus;
    for (let j = 0; j < parentCheckbox.subData.length; j++) {
      if (parentCheckbox.subData[j].checkStatus == true) {
        countCheckedCheckbox++;
      } else {
        countCheckedCheckbox--;
      }
    }
    if (countCheckedCheckbox == parentCheckbox.subData.length) {
      parentCheckbox.checkValueStatus = true;
    } else {
      parentCheckbox.checkValueStatus = false;
    }
    this.setState({
      ruleSetData,
    });
  };

  onSearchChange = (e) => {
    const { value } = e.target;
    this.setState({
      searchKey: value,
    });
    const { duplicateruleSetData } = this.state;
    var searchResult = [];
    var Result = [];
    for (let i = 0; i < duplicateruleSetData.length; i++) {
      let data = duplicateruleSetData[i];
      for (let j = 0; j < data.subData.length; j++) {
        let subData = data.subData[j];
        if (subData.title.indexOf(value) !== -1 || value === '') {
          Result.push({ title: subData.title, checkStatus: subData.checkStatus });
        } else if (subData.title.toLowerCase().indexOf(value) !== -1 || value === '') {
          Result.push({ title: subData.title, checkStatus: subData.checkStatus });
        }
      }
      searchResult.push({ title: data.title, checkValueStatus: data.checkValueStatus, subData: Result });
    }
    this.setState({
      ruleSetData: searchResult,
    });
  };

  render() {
    return (
      <div className="d-inline-block width-100 compliance-account">
        <div className="compliance-account-heading">
          <div className="d-inline-block width-50">
            <strong>Select Ruleset</strong>
          </div>
          <div className="d-inline-block width-50 text-right">
            <div className="d-inline-block form-group search-control-group">
              <input
                type="text"
                onChange={this.onSearchChange}
                value={this.state.searchKey}
                className="input-group-text"
                placeholder="Search"
              />
              <button>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="compliance-account-box">{this.displaRulesetData()}</div>
        {/* <div className="d-block text-center next">
                    <button className="blue-button m-r-0 m-b-0">Next</button>
                </div> */}
      </div>
    );
  }
}
export default Rulesets;
