import React from "react";

class QueryOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12"></div>
          <div className="col-lg-6 col-md-6 col-sm-12 panel-data-source">
            <div className="d-inline-block data-source-box">
              Max data points
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-12"></div>
        </div>
      </>
    );
  }
}

export default QueryOptions;
