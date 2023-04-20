import React, { Component } from 'react';
import Applications from './Applications';
import SlaCentral from './SlaCentral';
import DevSecOpsCentral from './DevSecOpsCentral';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.props;
    const {} = this.state;

    return (
      <>
        <Applications />
        <SlaCentral />
        <DevSecOpsCentral />
      </>
    );
  }
}

export default Overview;
