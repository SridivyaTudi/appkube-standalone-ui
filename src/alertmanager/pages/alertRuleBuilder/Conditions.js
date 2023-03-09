import React, { Component } from 'react';
import { ConditionsChart } from './ConditionsChart';

export class Conditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayThresoldData: true,
      displayRelativeData: false,
      displayDadmanData: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataFromAlertType !== this.props.dataFromAlertType) {
      console.log(this.props.dataFromAlertType);
    }
  }

  onChangeAlertType = (alertType) => {
    if (alertType === 'Threshold') {
      this.setState({
        displayThresoldData: true,
        displayRelativeData: true,
        displayDadmanData: false,
      });
    } else if (alertType === 'Relative') {
      this.setState({
        displayThresoldData: false,
        displayRelativeData: true,
        displayDadmanData: false,
      });
    } else if (alertType === 'Availability') {
      this.setState({
        displayThresoldData: false,
        displayRelativeData: false,
        displayDadmanData: true,
      });
    }
  };

  thresoldCondition() {
    let thresoldData = (
      <div className="condition-header">
        <div className="send-alert-text">
          Send Alert where <span className="time-series-text">Select a Time-Series</span> is
        </div>
        <div className="greater-select">
          <select>
            <option>Greater than</option>
            <option>equal to or greater</option>
            <option>equal to or less than</option>
            <option>less than</option>
            <option>equal to</option>
            <option>not equal to</option>
            <option>inside range</option>
            <option>outside range</option>
          </select>
        </div>
        <div className="greater-search">
          <input type="text" />
        </div>
      </div>
    );
    return thresoldData;
  }

  relativeCondition() {
    let relativeData = (
      <div className="condition-header">
        <div className="send-alert-text">Send Alert when</div>
        <div className="greater-select">
          <select>
            <option>Change</option>
            <option>% Change</option>
          </select>
          <div className="send-alert-text">Compare to previous</div>
          <select>
            <option>1m</option>
            <option>5m</option>
            <option>10m</option>
            <option>30m</option>
            <option>1h</option>
            <option>2h</option>
            <option>24h</option>
          </select>
          <div>is</div>
          <select>
            <option>Greater than</option>
            <option>equal to or greater</option>
            <option>equal to or less than</option>
            <option>less than</option>
            <option>equal to</option>
            <option>not equal to</option>
            <option>inside range</option>
            <option>outside range</option>
          </select>
        </div>

        <div className="greater-search">
          <input type="text" />
        </div>
      </div>
    );
    return relativeData;
  }

  dadmanCondition() {
    let dadmanData = (
      <div className="condition-header">
        <div className="send-alert-text">Send Alert if Data is missing for</div>
        <div className="greater-select">
          <select>
            <option>1m</option>
            <option>5m</option>
            <option>10m</option>
            <option>30m</option>
            <option>1h</option>
            <option>2h</option>
            <option>24h</option>
          </select>
        </div>
      </div>
    );
    return dadmanData;
  }

  render() {
    const { displayThresoldData, displayRelativeData, displayDadmanData } = this.state;
    return (
      <div className="alert-details">
        <div className="alert-details-name">
          <label>Condition</label>
          <div className="condition-box">
            {displayThresoldData ? this.thresoldCondition() : null}
            {displayRelativeData ? this.relativeCondition() : null}
            {displayDadmanData ? this.dadmanCondition() : null}
            <div className="time-series-preview-box">
              <ConditionsChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
