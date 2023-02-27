import React, { Component } from 'react';
import Applications from './applications';
import SlaCentral from './slaCentral';
import DevSecOpsCentral from './devSecOpsCentral';

class Dashboard extends Component {
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

export default Dashboard;
