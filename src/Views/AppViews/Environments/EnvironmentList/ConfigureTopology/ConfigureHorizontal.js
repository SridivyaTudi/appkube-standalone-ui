import React, { Component } from "react";
import BalancingImg from "assets/img/assetmanager/balancing-img.png";
import NodeImg from "assets/img/assetmanager/node-img.png";
import NewSqlIcon from "assets/img/assetmanager/new-sql-icon.png";
import StorageIcon from "assets/img/assetmanager/storage-icon.png";
import VpsIcon from "assets/img/assetmanager/vps-icon.png";
import BuildIcon from "assets/img/assetmanager/build-icon.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

let firstPointerPosition;
let firstPointerInitWidth = 23.4444;
// let firstPointerCurrentWidth = 23.4444

let secondPointerPosition;
let secondPointerInitWidth = 77.1111;
// let secondPointerCurrentwidth = 77.1111;

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 18,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 16,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#384CFF",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 8,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 18 / 2,
    opacity: 1,
    backgroundColor: "#B7B7B7",
    boxSizing: "border-box",
  },
}));

class ConfigureHorizontal extends Component {
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
        // firstPointerCurrentWidth = firstPointerInitWidth - firstPointerPosition;
      }
      if (firstPointerPosition > firstPointerInitWidth) {
        // firstPointerCurrentWidth = firstPointerPosition;
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
        // secondPointerCurrentwidth =
        //   secondPointerInitWidth - secondPointerPosition;
      }
      if (secondPointerPosition > secondPointerInitWidth) {
        // secondPointerCurrentwidth = secondPointerPosition;
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={12} lg={8}>
            <Box className="balancing-container">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                alignItems="center"
              >
                <Grid item xs={12} md={5} lg={5}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignItems="center"
                  >
                    <Grid item xs={12} md={6} lg={6}>
                      <Box className="d-block widht-100 text-center balancing-content">
                        <Box className="image">
                          <img src={BalancingImg} alt="" />
                        </Box>
                        <Box className="name">Balancing</Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Box className="d-block widht-100 text-center balancing-content">
                        <Box className="image">
                          <img src={NodeImg} alt="" />
                        </Box>
                        <Box className="name">Node</Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={5} lg={5}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignItems="center"
                  >
                    <Grid item xs={12} md={4} lg={4}>
                      <Box className="d-block widht-100 text-center storage-content">
                        <Box className="image">
                          <img src={NewSqlIcon} alt="" />
                        </Box>
                        <Box className="name">SQL</Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <Box className="d-block widht-100 text-center storage-content">
                        <Box className="image">
                          <img src={NewSqlIcon} alt="" />
                        </Box>
                        <Box className="name">NOSQL</Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <Box className="d-block widht-100 text-center storage-content">
                        <Box className="image">
                          <img src={NewSqlIcon} alt="" />
                        </Box>
                        <Box className="name">Cache</Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignItems="center"
                  >
                    <Grid item xs={12} md={4} lg={4}>
                      <Box className="d-block widht-100 text-center storage-content p-b-0">
                        <Box className="image">
                          <img src={StorageIcon} alt="" />
                        </Box>
                        <Box className="name">Storage</Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <Box className="d-block widht-100 text-center storage-content p-b-0">
                        <Box className="image">
                          <img src={VpsIcon} alt="" />
                        </Box>
                        <Box className="name">VPS</Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
                      <Box className="d-block widht-100 text-center storage-content p-b-0">
                        <Box className="image">
                          <img src={BuildIcon} alt="" />
                        </Box>
                        <Box className="name">Build</Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={2} lg={2}>
                  <Box className="add-extra-btn">
                    <Button className="extra-btn">
                      <i className="fa-solid fa-plus"></i>
                    </Button>
                    <strong>Extra</strong>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box className="application-servers-container">
              <Box className="d-flex width-100 heading">
                <Box className="d-inline-flex">
                  Application Servers
                  <i className="fa-solid fa-circle-question"></i>
                </Box>
                <Box className="d-inline-flex"></Box>
              </Box>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 1, md: 2 }}
              >
                <Grid item xs={12} md={5} lg={5}>
                  <Box className="d-block width-100 text-center application-vertical-slider">
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
                                  : firstPointerPosition -
                                    firstPointerInitWidth +
                                    0.5
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
                                  ? secondPointerInitWidth -
                                    secondPointerPosition
                                  : secondPointerPosition -
                                    secondPointerInitWidth +
                                    0.5
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
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={7} lg={7}>
                  <Box className="d-block width-100 application-horizontal-slider">
                    <p className="text-center p-b-10">Horizontal Scaling </p>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                    >
                      <Grid item xs={12} md={5} lg={5}>
                        <Box className="horizontal-add-node">
                          <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Grid item xs={12} md={3} lg={3}>
                              <Button className="primary-outline-btn min-width-inherit p-0 float-right">
                                <i className="fa-solid fa-circle-minus"></i>
                              </Button>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                              <Box className="node-box">
                                <Box className="image">
                                  <img src={NodeImg} alt="" />
                                </Box>
                                <Box className="name">1 node(s)</Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3}>
                              <Button className="primary-outline-btn min-width-inherit p-0">
                                <i className="fa-solid fa-circle-plus"></i>
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={7} lg={7}>
                        <Box className="scaling-contents">
                          <Box className="heading">
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 0, sm: 0, md: 0 }}
                              justifyContent="center"
                            >
                              <Grid
                                item
                                xs={12}
                                md={6}
                                lg={6}
                                className="p-t-0"
                              >
                                <div className="d-block text-left">
                                  <strong>Nginx 1.10.1</strong>
                                  <i className="fa-solid fa-angle-down"></i>
                                </div>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={6}
                                lg={6}
                                className="p-t-0"
                              >
                                <div className="d-block text-right">
                                  <strong>PHP 7.1.0</strong>
                                  <i className="fa-solid fa-angle-down"></i>
                                </div>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box className="contents">
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 0, sm: 0, md: 0 }}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid item xs={12} md={6} lg={8}>
                                <div className="d-block text-left text">
                                  Disk Limit
                                </div>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <div className="d-block text-right form-control">
                                  <input
                                    id="number"
                                    type="text"
                                    placeholder="2500 GB"
                                  />
                                  <Box className="dropdown-arrow">
                                    <Box className="d-block">
                                      <i className="fas fa-angle-up"></i>
                                    </Box>
                                    <Box className="d-block">
                                      <i className="fas fa-angle-down"></i>
                                    </Box>
                                  </Box>
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 0, sm: 0, md: 0 }}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid item xs={12} md={6} lg={8}>
                                <div className="d-block text-left text">
                                  Sequential restart delay
                                  <i className="fa-solid fa-circle-question"></i>
                                </div>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <div className="d-block text-right form-control">
                                  <input
                                    id="number"
                                    type="text"
                                    placeholder="30 sec"
                                  />
                                  <Box className="dropdown-arrow">
                                    <Box className="d-block">
                                      <i className="fas fa-angle-up"></i>
                                    </Box>
                                    <Box className="d-block">
                                      <i className="fas fa-angle-down"></i>
                                    </Box>
                                  </Box>
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 0, sm: 0, md: 0 }}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid item xs={12} md={6} lg={8}>
                                <div className="d-block text-left text">
                                  Public IPv4
                                </div>
                              </Grid>
                              <Grid item xs={12} md={6} lg={4}>
                                <div className="d-block text-right form-control">
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                  >
                                    <AntSwitch
                                      inputProps={{
                                        "aria-label": "ant design",
                                      }}
                                    />
                                  </Stack>
                                </div>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <p>Configuration</p>
                    <Box className="buttons">
                      <Button
                        className="primary-btn min-width-inherit m-r-3"
                        variant="contained"
                      >
                        Variables
                      </Button>
                      <Button
                        className="primary-btn min-width-inherit m-r-3"
                        variant="contained"
                      >
                        Volumes
                      </Button>
                      <Button
                        className="primary-btn min-width-inherit m-r-3"
                        variant="contained"
                      >
                        Links
                      </Button>
                      <Button
                        className="primary-btn min-width-inherit m-r-3"
                        variant="contained"
                      >
                        More
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Box
              className="api-server width-100"
              style={{ minHeight: "718px" }}
            >
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
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default ConfigureHorizontal;
