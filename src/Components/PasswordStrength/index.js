import React, { Component } from "react";
import { Box } from "@mui/material/";
import Grid from "@mui/material/Grid";
import { upperCaseLengthInStr, lowerCaseLengthInStr } from "Utils";
import { REGEX_TYPE } from "CommonData";

const steps = {
  STEP_1: 1,
  STEP_2: 2,
  STEP_3: 3,
  STEP_4: 4,
};
class PasswordStrength extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwdStrength: [],
    };
  }

  componentDidMount = () => {
    this.checkPasswordStrength();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.password !== this.props.password) {
      this.checkPasswordStrength();
    }
  };

  /** Checkes entered password strength */
  checkPasswordStrength = () => {
    let { password } = this.props;
    let { pwdStrength } = this.state;

    if (password.length >= 8 && password.length <= 20) {
      if (pwdStrength.indexOf(steps.STEP_1) === -1) {
        pwdStrength.push(steps.STEP_1);
      }
    } else {
      pwdStrength = this.removePasswordStrength(steps.STEP_1, pwdStrength);
    }

    if (lowerCaseLengthInStr(password) >= 1) {
      if (pwdStrength.indexOf(steps.STEP_2) === -1) {
        pwdStrength.push(steps.STEP_2);
      }
    } else {
      pwdStrength = this.removePasswordStrength(steps.STEP_2, pwdStrength);
    }

    if (upperCaseLengthInStr(password) >= 1) {
      if (pwdStrength.indexOf(steps.STEP_3) === -1) {
        pwdStrength.push(steps.STEP_3);
      }
    } else {
      pwdStrength = this.removePasswordStrength(steps.STEP_3, pwdStrength);
    }

    if (password.match(REGEX_TYPE.PASSWORD)) {
      if (pwdStrength.indexOf(steps.STEP_4) === -1) {
        pwdStrength.push(steps.STEP_4);
      }
    } else {
      pwdStrength = this.removePasswordStrength(steps.STEP_4, pwdStrength);
    }

    try {
      this.props.checkIsValidPassword(pwdStrength.length === 4);
    } catch (error) {
      console.log(error);
    }

    this.setState({ pwdStrength });
  };

  // remove password strength
  removePasswordStrength = (currentStep, pwdStrength) => {
    return pwdStrength.includes(currentStep)
      ? pwdStrength.filter((step) => step !== currentStep)
      : pwdStrength;
  };

  render() {
    let { STEP_1, STEP_2, STEP_3, STEP_4 } = steps;
    let { pwdStrength } = this.state;

    return (
      <>
        <Grid item xs={12}>
          <Box className="password-must-include-contents">
            <label className="d-block"> Password Must Include:</label>
            <ul>
              <li className={`${pwdStrength.includes(STEP_1) ? "green" : ""} `}>
                <span>
                  <i className="fa-solid fa-check"></i>
                </span>{" "}
                {"between 8 and 20 charaters"}
              </li>
              <li className={`${pwdStrength.includes(STEP_2) ? "green" : ""} `}>
                <span>
                  <i className="fa-solid fa-check"></i>
                </span>{" "}
                {"1 lowercase letter(s)"}
              </li>
              <li className={`${pwdStrength.includes(STEP_3) ? "green" : ""} `}>
                <span>
                  <i className="fa-solid fa-check"></i>
                </span>{" "}
                {"1 uppercase letter(s)"}
              </li>
              <li className={`${pwdStrength.includes(STEP_4) ? "green" : ""} `}>
                <span>
                  <i className="fa-solid fa-check"></i>
                </span>{" "}
                {"1 special charaters"}
              </li>
              <li style={{ display: "none" }}>
                <span>
                  <i className="fa-solid fa-check"></i>
                </span>{" "}
                {"differences from your previous passwords"}
              </li>
            </ul>
          </Box>
        </Grid>
      </>
    );
  }
}

export default PasswordStrength;
