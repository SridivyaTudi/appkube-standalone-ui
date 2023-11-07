import React, { useEffect, useRef } from "react";
import { Box, Grid, List, ListItem } from "@mui/material";
import * as d3 from "d3";

var data = [
  { name: "AWS167264", value: 1200, color: "#B399FF" },
  { name: "AWS167265", value: 1200, color: "#F08397" },
  { name: "AWS167266", value: 1200, color: "#F2BB23" },
];
var width = 200;
var height = 200;

const CostDepartmentProductsChart = () => {
  const refDepartment = useRef(null);
  const refProduct = useRef(null);
  const refEnvironment = useRef(null);
  const refService = useRef(null);
  function departmentDonutChart() {
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

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );

    const svg = d3.select(refDepartment.current);

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

    d3.select(refDepartment.current);
  }
  function productDonutChart() {
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

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );

    const svg = d3.select(refProduct.current);

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

    d3.select(refProduct.current);
  }
  function environmentDonutChart() {
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

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );

    const svg = d3.select(refEnvironment.current);

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

    d3.select(refEnvironment.current);
  }
  function serviceDonutChart() {
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

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );

    const svg = d3.select(refService.current);

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

    d3.select(refService.current);
  }
  useEffect(() => {
    departmentDonutChart();
    productDonutChart();
    environmentDonutChart();
    serviceDonutChart();
  }, []);

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
                  ref={refDepartment}
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
                  ref={refProduct}
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
                  ref={refEnvironment}
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
                  ref={refService}
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
};

export default CostDepartmentProductsChart;
