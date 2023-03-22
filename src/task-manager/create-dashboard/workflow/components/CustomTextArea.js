import React, { Component } from 'react';
class CustomTextArea extends Component {
  constructor(props) {
    super(props);
  }
  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };
  render() {
    const {
      containerClass,
      labelClass,
      inputClass,
      isRequired,
      label,
      htmlFor,
      id,
      name,
      placeholder,
      value,
      isValid,
      message,
      notice,
    } = this.props;
    return (
      <div className={containerClass}>
        <label className={labelClass} htmlFor={htmlFor}>
          {label}
          {isRequired === true && <span className="required"> * </span>}
        </label>
        <textarea
          className={`${inputClass} ${isValid ? '' : 'is-invalid error'}`}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {!isValid && <div className="invalid-feedback">{message}</div>}
        <span>{notice}</span>
      </div>
    );
  }
}
export default  CustomTextArea;
