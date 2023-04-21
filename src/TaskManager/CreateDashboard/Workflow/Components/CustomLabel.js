import React, { Component } from 'react';

class CustomLabel extends Component {
  constructor(props) {
    super(props);
  }
  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };
  render() {
    const { containerClass, labelClass, label, htmlFor, value } = this.props;
    return (
      <div className={containerClass}>
        <label className={labelClass} htmlFor={htmlFor}>
          {label}:&nbsp;
        </label>
        <span>{value}</span>
      </div>
    );
  }
}

export default CustomLabel;
