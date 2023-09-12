import React, { Component } from "react";
import { v4 } from "uuid";
import { Box } from "@mui/material/";
const BACKGROUND_COLOR = {
  1: "red",
  2: "rgb(250, 162, 75)",
  3: "yellowgreen",
  4: "rgb(0, 85, 0)",
};
class PasswordStrength extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwdStrength: 0,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.password !== this.props.password) {
      this.checkPasswordStrength();
    }
  };

  /** Checkes entered password strength */
  checkPasswordStrength = () => {
    let { password } = this.props;
    let strength = 0;

    if (password.length > 1) {
      strength += 1;
    }
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;
    }
    if (password.match(/([0-9])/)) {
      strength += 1;
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;
    }

    this.setState({ pwdStrength: strength }, () => {
      this.renderPasswordStrength();
    });
  };

  /** Renders bars according to password strength */
  renderPasswordStrength = () => {
    const { pwdStrength } = this.state;
    const JSX = [];
    for (let i = 0; i < 4; i++) {
      if (i <= pwdStrength - 1) {
        JSX.push(
          <span
            key={v4()}
            style={{ backgroundColor: BACKGROUND_COLOR[pwdStrength] }}
          ></span>
        );
      } else {
        JSX.push(<span key={v4()}></span>);
      }
    }
    return JSX;
  };
  render() {
    return (
      <>
        <Box className="password-strength-group m-b-10">
          {this.renderPasswordStrength()}
        </Box>
        <p className="strength-text">
          We Strongly suggest that you create strong password
        </p>
      </>
    );
  }
}

export default PasswordStrength;
