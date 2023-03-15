import React from "react";

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      AccountsData: [
        {
          title: "Accounts",
          checkValueStatus: false,
          subData: [
            {
              title: "AWS (67121322432)",
              checkStatus: true,
            },
            {
              title: "AWS (2324354555)",
              checkStatus: false,
            },
          ],
        },
      ],
      duplicateAccountData: [
        {
          title: "Accounts",
          checkValueStatus: false,
          subData: [
            {
              title: "AWS (67121322432)",
              checkValueStatus: "false",
            },
            {
              title: "AWS (2324354555)",
              checkValueStatus: "false",
            },
          ],
        },
      ],
    };
  }

  displaAaccountsData = () => {
    let retData = [];
    for (let i = 0; i < this.state.AccountsData.length; i++) {
      let responseData = this.state.AccountsData[i];
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
                onClick={() => this.onClickChildCheckbox(i, j)}
                className="checkbox"
              />{" "}
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
              />{" "}
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
    const { AccountsData } = this.state;
    const parentCheckbox = AccountsData[index];
    const checked = e.target.checked;
    for (let j = 0; j < parentCheckbox.subData.length; j++) {
      parentCheckbox.subData[j].checkStatus = checked;
      parentCheckbox.checkValueStatus = checked;
    }
    this.setState({
      AccountsData,
    });
  };

  onClickChildCheckbox = (parentIndex, childIndex) => {
    let countCheckedCheckbox = 0;
    const { AccountsData } = this.state;
    const parentCheckbox = AccountsData[parentIndex];
    parentCheckbox.subData[childIndex].checkStatus =
      !parentCheckbox.subData[childIndex].checkStatus;
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
      AccountsData,
    });
  };

  onSearchChange = (e) => {
    const { value } = e.target;
    this.setState({
      searchKey: value,
    });
    const { duplicateAccountData } = this.state;
    var searchResult = [];
    var Result = [];
    for (let i = 0; i < duplicateAccountData.length; i++) {
      let data = duplicateAccountData[i];
      for (let j = 0; j < data.subData.length; j++) {
        let subData = data.subData[j];
        if (subData.title.indexOf(value) !== -1 || value === "") {
          Result.push({
            title: subData.title,
            checkStatus: subData.checkStatus,
          });
        } else if (
          subData.title.toLowerCase().indexOf(value) !== -1 ||
          value === ""
        ) {
          Result.push({
            title: subData.title,
            checkStatus: subData.checkStatus,
          });
        }
      }
      searchResult.push({
        title: data.title,
        checkValueStatus: data.checkValueStatus,
        subData: Result,
      });
    }
    this.setState({
      AccountsData: searchResult,
    });
  };

  render() {
    return (
      <div className="d-inline-block width-100 compliance-account">
        <div className="compliance-account-heading">
          <div className="d-inline-block width-50">
            <strong>Select Accounts</strong>
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
        <div className="compliance-account-box">
          {this.displaAaccountsData()}
        </div>
      </div>
    );
  }
}

export default Accounts;
