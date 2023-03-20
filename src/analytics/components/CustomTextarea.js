import React, {Component} from "react";

export class CustomTextarea extends Component{
  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };
  render() {
    const { containerClass, inputClass, id, name, placeholder, value, isValid, message } = this.props;
    return (
      <div className={containerClass}>
        <textarea
          className={`${inputClass} ${isValid ? '' : 'is-invalid'}`}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {!isValid && <div className="invalid-feedback"> {message} </div>}
      </div>
    );
  }
}

export default CustomTextarea;
