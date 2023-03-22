import React, { Component } from 'react';
class CustomTextbox extends Component {
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
      label,
      htmlFor,
      isRequired,
      id,
      name,
      placeHolder,
      value,
      isValid,
      message,
      type,
      notice,
    } = this.props;
    return (
      <div className={containerClass}>
        <label className={labelClass} htmlFor={htmlFor}>
          {label}
          {isRequired === true && <span className="required"> * </span>}
        </label>
        <input
          type={type}
          className={`${inputClass} ${isValid ? '' : 'is-invalid error'}`}
          id={id}
          name={name}
          value={value}
          placeholder={placeHolder}
          onChange={this.onChange}
        />
        {!isValid && <div className="invalid-feedback">{message}</div>}
        <span>{notice}</span>
      </div>
    );
  }
}

export default CustomTextbox;
