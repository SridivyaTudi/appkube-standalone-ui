import React, { Component } from "react";
import GlobalIcon4 from "assets/img/assetmanager/global-icon4.png";
import GlobalIcon5 from "assets/img/assetmanager/global-icon5.png";
import GlobalIcon8 from "assets/img/assetmanager/global-icon8.png";
import CacheIcon from "assets/img/assetmanager/cache-icon.png";
import SqlIcon from "assets/img/assetmanager/sql-icon.png";
import NoSqlIcon from "assets/img/assetmanager/no-sql-icon.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

let firstPointerPosition;
let firstPointerInitWidth = 21.6797;
let firstPointerCurrentWidth = 21.6797;

let secondPointerPosition;
let secondPointerInitWidth = 77.5391;
let secondPointerCurrentwidth = 77.5391;

class ConfigureVartical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [50, 250],
      pointStaticValueFirst: 109,
      pointStaticValueSecond: 77,
      firstPointerPosition: "",
      secondPointerPosition: "",
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue }, () => {
      this.calculateLineMovement();
    });
  };

  valuetext(value) {
    return `${value}`;
  }

  componentDidMount = () => {
    this.calculateLineMovement();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.firstPointerPosition !== this.state.firstPointerPosition) {
      this.calculateLineMovement();
    }
  };

  calculateLineMovement = () => {
    /*GET BOTH HANDLE ELEMENTS */
    const elements = document.getElementsByClassName("MuiSlider-thumb");

    /* ASSIGN BOTH HANDLES TO SEPRATE VARIABLES */
    const firstLine = elements[0];
    const secondLine = elements[1];

    let allFirstLineStyles = [];
    /* EXTRACT INLINE CSS FROM HANDLE TO CALCULATE THE CURRENT POSITION ON THE LINE (STYLE GIVEN BY LIBRARY BY DEFAULT ) */

    allFirstLineStyles.push(firstLine?.getAttribute("style").split(";"));
    if (allFirstLineStyles[0]) {
      /* GET FIRST HANDLE'S POISITION IN % AND CALCULATE WIDTH AS INLINE STYLE FOR FIRST CARD */
      this.setState({
        firstPointerPosition: Number(
          allFirstLineStyles[0][0].split(":")[1].replace("%", "")
        ),
      });
      firstPointerPosition = Number(
        allFirstLineStyles[0][0].split(":")[1].replace("%", "")
      );
      if (firstPointerPosition <= firstPointerInitWidth) {
        firstPointerCurrentWidth = firstPointerInitWidth - firstPointerPosition;
      }
      if (firstPointerPosition > firstPointerInitWidth) {
        firstPointerCurrentWidth = firstPointerPosition;
      }
    }

    /* SAME AS FIRST HANDLER AND LINE CALCULATE WIDTH AND POSITIONS OF SECOND CARD'S LINE */

    let allSecondLineStyles = [];
    allSecondLineStyles.push(secondLine?.getAttribute("style").split(";"));
    if (allSecondLineStyles[0]) {
      this.setState({
        secondPointerPosition: Number(
          allFirstLineStyles[0][0].split(":")[1].replace("%", "")
        ),
      });
      secondPointerPosition = Number(
        allSecondLineStyles[0][0].split(":")[1].replace("%", "")
      );
      if (secondPointerPosition <= secondPointerInitWidth) {
        secondPointerCurrentwidth =
          secondPointerInitWidth - secondPointerPosition;
      }
      if (secondPointerPosition > secondPointerInitWidth) {
        secondPointerCurrentwidth = secondPointerPosition;
      }
    }
  };

  handleReservedChange = (card, sign) => {
    const { value } = this.state;
    if (card === "reserve") {
      if (sign === "incr") {
        if (value[0] < value[1]) {
          value[0]++;
        }
      } else {
        if (value[0] > 0) {
          value[0]--;
        }
      }
    } else {
      if (sign === "incr") {
        value[1]++;
      } else {
        if (value[1] < 512 && value[0] < value[1]) {
          value[1]--;
        }
      }
    }

    this.calculateLineMovement();
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Box className="configur-content">
        <Box className="api-server">
          <Box className="d-block width-100 text-center">
            <Box className="d-block width-100">
              <Button
                className="primary-btn min-width-inherit"
                variant="contained"
              >
                API Gateway Server
              </Button>
            </Box>
            <Box className="d-block width-100">
              <Box className="plus-icon">
                <i className="fas fa-plus"></i>
              </Box>
            </Box>
            <Box className="d-block width-100">
              <Button
                className="primary-btn min-width-inherit"
                variant="contained"
              >
                App Layer Server
              </Button>
            </Box>
            <Box className="d-block width-100 down-arrow">
              <i className="fa-solid fa-arrow-down-long"></i>
            </Box>
            <Box className="d-block width-100">
              <Button
                className="primary-btn min-width-inherit"
                variant="contained"
              >
                Cluster <i className="fas fa-chevron-down p-l-10"></i>
              </Button>
            </Box>
            <Box className="width-100 eks-logo-boxs border-bottom">
              <Box className="d-inline-block">
                <Box className="box-arrow">
                  <i className="fa-solid fa-arrow-down-long"></i>
                </Box>
                <Box className="eks-logo">
                  <img src={GlobalIcon5} alt="" />
                </Box>
                <div className="title">EKS</div>
              </Box>
              <Box className="d-inline-block">
                <Box className="box-arrow">
                  <i className="fa-solid fa-arrow-down-long"></i>
                </Box>
                <Box className="eks-logo">
                  <img src={GlobalIcon4} alt="" />
                </Box>
              </Box>
              <Box className="d-inline-block">
                <Box className="box-arrow">
                  <i className="fa-solid fa-arrow-down-long"></i>
                </Box>
                <Box className="eks-logo">
                  <img src={GlobalIcon8} alt="" />
                </Box>
              </Box>
            </Box>
            <Box className="d-block width-100 m-t-1">
              <Button
                className="primary-btn min-width-inherit"
                variant="contained"
              >
                DB Layer
              </Button>
            </Box>
            <Box className="width-100 eks-logo-boxs">
              <Box className="d-inline-block">
                <Box className="box-arrow">
                  <i className="fa-solid fa-arrow-down-long"></i>
                </Box>
                <Box className="eks-logo">
                  <img src={CacheIcon} alt="" />
                </Box>
                <div className="title">Cache</div>
              </Box>
              <Box className="d-inline-block">
                <Box className="box-arrow">
                  <i className="fa-solid fa-arrow-down-long"></i>
                </Box>
                <Box className="eks-logo">
                  <img src={SqlIcon} alt="" />
                </Box>
                <div className="title">SQL</div>
              </Box>
              <Box className="d-inline-block">
                <Box className="box-arrow">
                  <i className="fa-solid fa-arrow-down-long"></i>
                </Box>
                <Box className="eks-logo">
                  <img src={NoSqlIcon} alt="" />
                </Box>
                <div className="title">No SQL</div>
              </Box>
            </Box>
            <Box className="d-block width-100">
              <Box className="plus-icon">
                <i className="far fa-plus"></i>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="api-server min-width">
          <Box className="d-block width-100 text-center">
            <h2>Application Servers</h2>
            <p>Vartical Scaling Per Node</p>
            <Box className="application-cards-slider">
              <Box className="application-cards">
                <Box className="reserved-card">
                  <Box className="title">
                    <h4>RESERVED</h4>
                    <i className="fa-solid fa-circle-question"></i>
                  </Box>
                  <Box className="reseved-content">
                    <Box className="d-flex align-items-center justify-content-center">
                      <input
                        id="number"
                        type="text"
                        placeholder="02"
                        value={value[0] ? value[0] : 1}
                        onChange={(e) => {
                          if (e.target.value <= value[1]) {
                            value[0] = e.target.value;
                          } else {
                            value[0] = value[1] - 5;
                          }
                          this.setState({ value }, () => {
                            this.calculateLineMovement();
                          });
                        }}
                      />
                      <Box className="dropdown-arrow">
                        <Box
                          className="d-block"
                          onClick={() =>
                            this.handleReservedChange("reserve", "incr")
                          }
                        >
                          <i className="fas fa-angle-up"></i>
                        </Box>
                        <Box
                          className="d-block"
                          onClick={() =>
                            this.handleReservedChange("reserve", "decr")
                          }
                        >
                          <i className="fas fa-angle-down"></i>
                        </Box>
                      </Box>
                      <span className="p-l-5">Cloudlet(s)</span>
                    </Box>
                    <p className="text-left">1.75 GIB, 5.6 GHz</p>
                  </Box>
                </Box>
                <Box className="reserved-card">
                  <Box className="title">
                    <h4>SCALING LIMIT</h4>
                    <i className="fa-solid fa-circle-question"></i>
                  </Box>
                  <Box className="reseved-content">
                    <Box className="d-flex align-items-center justify-content-center">
                      <span className="p-r-5">Up to</span>
                      <input
                        id="number"
                        type="text"
                        placeholder="25"
                        value={value[1]}
                        onChange={(e) => {
                          if (e.target.value > value[0]) {
                            value[1] = e.target.value;
                          } else {
                            value[1] = value[0] + 5;
                          }
                          this.setState({ value }, () => {
                            this.calculateLineMovement();
                          });
                        }}
                      />
                      <Box className="dropdown-arrow">
                        <Box
                          className="d-block"
                          onClick={() =>
                            this.handleReservedChange("limit", "incr")
                          }
                        >
                          <i className="fas fa-angle-up"></i>
                        </Box>
                        <Box
                          className="d-block"
                          onClick={() =>
                            this.handleReservedChange("limit", "decr")
                          }
                        >
                          <i className="fas fa-angle-down"></i>
                        </Box>
                      </Box>
                      <span className="p-l-5">Cloudlet(s)</span>
                    </Box>
                    <p className="text-left">up to 44 GIB, 140.8 GHz</p>
                  </Box>
                </Box>
              </Box>
              <Box className="d-block m-t-3">
                <Box className="slider-main">
                  <div
                    className="slider-line"
                    style={{
                      left: `${
                        firstPointerPosition <= firstPointerInitWidth
                          ? firstPointerPosition
                          : firstPointerInitWidth
                      }%`,
                      width: `${
                        firstPointerPosition <= firstPointerInitWidth
                          ? firstPointerInitWidth - firstPointerPosition
                          : firstPointerPosition - firstPointerInitWidth + 0.5
                      }%`,
                    }}
                  ></div>
                  <div
                    className="slider-line"
                    style={{
                      left: `${
                        secondPointerPosition <= secondPointerInitWidth
                          ? secondPointerPosition
                          : secondPointerInitWidth
                      }%`,
                      width: `${
                        secondPointerPosition <= secondPointerInitWidth
                          ? secondPointerInitWidth - secondPointerPosition
                          : secondPointerPosition - secondPointerInitWidth + 0.5
                      }%`,
                    }}
                  ></div>
                  <Slider
                    value={value}
                    onChange={this.handleChange}
                    valueLabelDisplay="on"
                    getAriaValueText={this.valuetext}
                    className="slider"
                    defaultValue={25}
                    min={0}
                    max={512}
                    disableSwap
                  />
                </Box>

                <p className="m-t-4">Horizontal Scaling Per Node</p>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="api-server">
          <Box className="d-block width-100 text-center">
            <Box className="address-content">
              <span>
                <i className="fa-sharp fa-solid fa-location-dot"></i>
              </span>
              <p>Region: Newyork</p>
              <i className="fa-solid fa-angle-down"></i>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ConfigureVartical;
