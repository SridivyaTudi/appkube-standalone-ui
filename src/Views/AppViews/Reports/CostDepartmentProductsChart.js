import React, { Component } from "react";
import { Box, Grid, List, ListItem } from "@mui/material";
import * as d3 from "d3";

var data = [
  { name: "AWS167264", value: 1200, color: "#B399FF" },
  { name: "AWS167265", value: 1200, color: "#F08397" },
  { name: "AWS167266", value: 1200, color: "#F2BB23" },
];

var width = 200;
var height = 200;
class CostDepartmentProductsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refDepartment = React.createRef();
    this.refProduct = React.createRef();
    this.refEnvironment = React.createRef();
    this.refService = React.createRef();
  }

  componentDidMount = () => {
    this.departmentDonutChart();
    this.environmentDonutChart();
    this.productDonutChart();
    this.serviceDonutChart();
  };

  departmentDonutChart = () => {
    const height = Math.min(width, 250);
    const radius = Math.min(width, height) / 2;

    const arc = d3
      .arc()
      .innerRadius(radius * 0.57)
      .outerRadius(radius - 1);

    const pie = d3
      .pie()
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d.value);

    const svg = d3.select(this.refDepartment.current);

    svg
      .append("g")
      .selectAll()
      .data(pie(data))
      .join("path")
      .attr("fill", (d) => {
        return d.data.color;
      })
      .attr("d", arc)
      .append("title")
      .text((d) => ` ${d.data.value.toLocaleString()}`);

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`);

    d3.select(this.refDepartment.current);
  };

  productDonutChart = () => {
    const height = Math.min(width, 250);
    const radius = Math.min(width, height) / 2;

    const arc = d3
      .arc()
      .innerRadius(radius * 0.57)
      .outerRadius(radius - 1);

    const pie = d3
      .pie()
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d.value);

    const svg = d3.select(this.refProduct.current);

    svg
      .append("g")
      .selectAll()
      .data(pie(data))
      .join("path")
      .attr("fill", (d) => {
        return d.data.color;
      })
      .attr("d", arc)
      .append("title")
      .text((d) => ` ${d.data.value.toLocaleString()}`);

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`);

    d3.select(this.refProduct.current);
  };

  environmentDonutChart = () => {
    const height = Math.min(width, 250);
    const radius = Math.min(width, height) / 2;

    const arc = d3
      .arc()
      .innerRadius(radius * 0.57)
      .outerRadius(radius - 1);

    const pie = d3
      .pie()
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d.value);

    const svg = d3.select(this.refEnvironment.current);

    svg
      .append("g")
      .selectAll()
      .data(pie(data))
      .join("path")
      .attr("fill", (d) => {
        return d.data.color;
      })
      .attr("d", arc)
      .append("title")
      .text((d) => ` ${d.data.value.toLocaleString()}`);

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`);

    d3.select(this.refEnvironment.current);
  };

  serviceDonutChart = () => {
    const height = Math.min(width, 250);
    const radius = Math.min(width, height) / 2;

    const arc = d3
      .arc()
      .innerRadius(radius * 0.57)
      .outerRadius(radius - 1);

    const pie = d3
      .pie()
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d.value);

    const svg = d3.select(this.refService.current);

    svg
      .append("g")
      .selectAll()
      .data(pie(data))
      .join("path")
      .attr("fill", (d) => {
        return d.data.color;
      })
      .attr("d", arc)
      .append("title")
      .text((d) => ` ${d.data.value.toLocaleString()}`);

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`);

    d3.select(this.refService.current);
  };
  render() {
    return (
      <>
        <Box className="heading">
          <span>Cost by Department and Products</span>
          <Box className="chart-fliter">
            <Box className="fliter-toggel">
              <i className="fa-solid fa-filter fillter-icon"></i>
              Fillter
            </Box>
          </Box>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Box id="chart" className="collapse-expand">
              <Box className="heading">
                <h3>Department Wise Cost</h3>
                <Box className="product-cost">
                  <label>$6,71,246</label>
                  <span>10%</span>
                </Box>
              </Box>
              <Box className="chart-contant">
                <Box className="d-flex chart">
                  <svg
                    ref={this.refDepartment}
                    width={width}
                    height={height}
                    viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  ></svg>
                </Box>
                <Box className="d-block chart-details">
                  <List>
                    <ListItem>
                      <p>Production</p>
                      <Box className="d-block right-contant">
                        <label>$7,860</label>
                        <span>
                          <span
                            style={{
                              width: `25%`,
                              background: `#8676FF`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <p>HR</p>
                      <Box className="d-block right-contant">
                        <label>$3,390</label>
                        <span>
                          <span
                            style={{
                              width: `30%`,
                              background: `#FF9066`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <p>Supply Chain</p>
                      <Box className="d-block right-contant">
                        <label>$5,132</label>
                        <span>
                          <span
                            style={{
                              width: `25%`,
                              background: `#FFCC41`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box id="chart" className="collapse-expand">
              <Box className="heading">
                <h3>Product Wise Cost</h3>
                <Box className="product-cost">
                  <label>$6,71,246</label>
                  <span>10%</span>
                </Box>
              </Box>
              <Box className="chart-contant">
                <Box className="d-flex chart">
                  <svg
                    ref={this.refProduct}
                    width={width}
                    height={height}
                    viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  ></svg>
                </Box>
                <Box className="d-block chart-details">
                  <List>
                    <ListItem>
                      <p>HR</p>
                      <Box className="d-block right-contant">
                        <label>$7,860</label>
                        <span>
                          <span
                            style={{
                              width: `25%`,
                              background: `#8676FF`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <p>Payroll</p>
                      <Box className="d-block right-contant">
                        <label>$3,390</label>
                        <span>
                          <span
                            style={{
                              width: `30%`,
                              background: `#FF9066`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <p>Accounts</p>
                      <Box className="d-block right-contant">
                        <label>$5,132</label>
                        <span>
                          <span
                            style={{
                              width: `25%`,
                              background: `#FFCC41`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box id="chart" className="collapse-expand">
              <Box className="heading">
                <h3>Environment Wise Cost</h3>
                <Box className="product-cost">
                  <label>$6,71,246</label>
                  <span>10%</span>
                </Box>
              </Box>
              <Box className="chart-contant">
                <Box className="d-flex chart">
                  <svg
                    ref={this.refEnvironment}
                    width={width}
                    height={height}
                    viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  ></svg>
                </Box>
                <Box className="d-block chart-details">
                  <List>
                    <ListItem>
                      <p>Development</p>
                      <Box className="d-block right-contant">
                        <label>$7,860</label>
                        <span>
                          <span
                            style={{
                              width: `25%`,
                              background: `#8676FF`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <p>Test</p>
                      <Box className="d-block right-contant">
                        <label>$3,390</label>
                        <span>
                          <span
                            style={{
                              width: `30%`,
                              background: `#FF9066`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <p>Stage</p>
                      <Box className="d-block right-contant">
                        <label>$5,132</label>
                        <span>
                          <span
                            style={{
                              width: `25%`,
                              background: `#FFCC41`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <p>Production</p>
                      <Box className="d-block right-contant">
                        <label>$0</label>
                        <span>
                          <span
                            style={{
                              width: `0%`,
                              background: `#FFCC41`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box id="chart" className="collapse-expand last">
              <Box className="heading">
                <h3>Service Wise Cost</h3>
                <Box className="product-cost">
                  <label>$6,71,246</label>
                  <span>10%</span>
                </Box>
              </Box>
              <Box className="chart-contant">
                <Box className="d-flex chart">
                  <svg
                    ref={this.refService}
                    width={width}
                    height={height}
                    viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  ></svg>
                </Box>
                <Box className="d-block chart-details">
                  <List>
                    <ListItem>
                      <p>Service 1</p>
                      <Box className="d-block right-contant">
                        <label>$7,860</label>
                        <span>
                          <span
                            style={{
                              width: `25%`,
                              background: `#8676FF`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <p>Service 2</p>
                      <Box className="d-block right-contant">
                        <label>$3,390</label>
                        <span>
                          <span
                            style={{
                              width: `30%`,
                              background: `#FF9066`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <p>Other services</p>
                      <Box className="d-block right-contant">
                        <label>$5,132</label>
                        <span>
                          <span
                            style={{
                              width: `25%`,
                              background: `#FFCC41`,
                            }}
                          ></span>
                        </span>
                      </Box>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default CostDepartmentProductsChart;
