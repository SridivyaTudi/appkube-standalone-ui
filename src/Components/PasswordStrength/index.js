import React, { Component } from "react";
import { v4 } from "uuid";
import { Box } from "@mui/material/";
import Grid from "@mui/material/Grid";
import { upperCaseLengthInStr, lowerCaseLengthInStr } from "Utils";

const BACKGROUND_COLOR = {
  1: "red",
  2: "rgb(250, 162, 75)",
  3: "yellowgreen",
  4: "rgb(0, 85, 0)",
};
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
    this.checkPasswordStrength()
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

    if (password.length >= 12 && password.length <= 22) {
      if (pwdStrength.indexOf(steps.STEP_1) === -1) {
        pwdStrength.push(steps.STEP_1);
      }
    } else {
      pwdStrength = this.removePasswordStrength(steps.STEP_1, pwdStrength);
    }

    if (lowerCaseLengthInStr(password) >= 2) {
      if (pwdStrength.indexOf(steps.STEP_2) === -1) {
        pwdStrength.push(steps.STEP_2);
      }
    } else {
      pwdStrength = this.removePasswordStrength(steps.STEP_2, pwdStrength);
    }

    if (upperCaseLengthInStr(password) >= 2) {
      if (pwdStrength.indexOf(steps.STEP_3) === -1) {
        pwdStrength.push(steps.STEP_3);
      }
    } else {
      pwdStrength = this.removePasswordStrength(steps.STEP_3, pwdStrength);
    }

    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      if (pwdStrength.indexOf(steps.STEP_4) === -1) {
        pwdStrength.push(steps.STEP_4);
      }
    } else {
      pwdStrength = this.removePasswordStrength(steps.STEP_4, pwdStrength);
    }
    this.props.checkIsValidPassword(pwdStrength.length === 4);

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
              <li
                className={`${
                  pwdStrength.includes(steps.STEP_1) ? "green" : ""
                } `}
              >
                <span>
                  <i class="fa-solid fa-check"></i>
                </span>{" "}
                {"between 12 and 22 charaters"}
              </li>
              <li
                className={`${
                  pwdStrength.includes(steps.STEP_2) ? "green" : ""
                } `}
              >
                <span>
                  <i class="fa-solid fa-check"></i>
                </span>{" "}
                {"2 lowercase letter (s)"}
              </li>
              <li
                className={`${
                  pwdStrength.includes(steps.STEP_3) ? "green" : ""
                } `}
              >
                <span>
                  <i class="fa-solid fa-check"></i>
                </span>{" "}
                {"2 uppercase letter (s)"}
              </li>
              <li
                className={`${
                  pwdStrength.includes(steps.STEP_4) ? "green" : ""
                } `}
              >
                <span>
                  <i class="fa-solid fa-check"></i>
                </span>{" "}
                {"1 special charaters"}
              </li>
              <li style={{ display: "none" }}>
                <span>
                  <i class="fa-solid fa-check"></i>
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
