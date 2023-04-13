import React, { Component } from "react";

class Finish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      accessKey: "",
      secretKey: "",
      accountId: "",
      orgId: "",
      ouId: "",
      selectedData: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedData !== prevProps.selectedData) {
      const a = this.props.selectedData;
      this.setState({
        name: a.displayName,
        accessKey: a.accessKey,
        secretKey: a.secretKey,
        accountId: a.accountId,
      });
    }
  }

  render() {
    return (
      <div className="d-inline-block width-100 account-setup-tab-contents">
        <div className="contents">
          <div className="finish-contant">
            <h2>Your AWS Account will be added to Appkube and will assocate with the OU's</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Finish;
