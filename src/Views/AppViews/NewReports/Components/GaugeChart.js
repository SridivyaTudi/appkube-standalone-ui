import React, { Component } from "react";
import { Box, List, ListItem } from "@mui/material";
import * as d3 from "d3";
import { v4 } from "uuid";
const colorPallate = [
  "#FF708B",
  "#FFBA69",
  "#01F1E3",
  "#8676FF",
  "#FF97AA",
  "#34A2C2",
  "#FB4B93",
  "#A04D4D",
  "#608E7D",
];
let width = 245;
let height = 210;
class GaugeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    if (this.props.data?.length) {
      this.renderChart();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.renderChart();
    }
  }

  renderChart = async () => {
    let { data, otherData } = this.props;

    let svg = d3
      .select(this.ref.current)
      .attr("width", width)
      .attr("height", height);
    svg.selectAll("*").remove();
    let tooltip = d3
      .select("#root")
      .data(data)
      .append("div")
      .attr("class", "chart-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
    var arcs = data.map((v, i) => {
      return d3
        .arc()
        .innerRadius(i * 20 + 30)
        .outerRadius(i * 20 - 5 + 30)
        .startAngle(0);
    });

    var pieData = data.map((v, i) => {
      return [
        { percentage: 100, arc: arcs[i], value: v.value },
        {
          percentage: v.percentage,
          arc: arcs[i],
          name: v.name,
          color: colorPallate[i],
          value: v.value,
        },
      ];
    });

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .attr("fill", "#383874")
      .text(otherData?.centerValue)
      .attr("transform", `translate(${width / 2.05},${height / 1.89})`);
    var pie = d3
      .pie()
      .sort(null)
      .value((d) => d.percentage);

    var g = svg
      .selectAll("g")
      .data(pieData)
      .enter()
      .append("g")
      .attr("transform", "translate(120,110) rotate(180)")
      .attr("fill-opacity", (d, i) => 2 / (i + 1));

    g.selectAll("path")
      .data((d) => pie(d))
      .enter()
      .append("path")
      .attr("d", (d) => {
        d.endAngle = (2 * Math.PI) / (100 / parseInt(d.value));
        return d.data.arc(d);
      })
      .attr("fill", (d, i) => {
        return i == 0 ? "#DBDFF1" : d.data.color;
      });

    var gText = svg
      .selectAll("g.textClass")
      .data(data)
      .enter()
      .append("g")
      .classed("textClass", true)
      .attr(
        "transform",
        "translate(" + width / 2 + "," + width / 2 + ") rotate(180)"
      );

    svg.selectAll("g").each(function (d, index) {
      var el = d3.select(this);
      var path = el.selectAll("path").each(function (r, i) {
        if (i === 1) {
          var centroidText = r.data.arc.centroid({
            startAngle: 0,
            endAngle: 0,
          });
          var lableObj = r.data;

          let label = `${lableObj.name} $${lableObj.value}`;
          gText
            .append("text")
            .attr("font-size", 10)
            .attr("fill", "#383874")
            .text(label.length > 17 ? `${label?.slice(0, 14)}...` : label)
            .attr(
              "transform",
              "translate(" +
                (centroidText[0] - (7 * width) / 100) +
                "," +
                (centroidText[1] + 15 + ") rotate(" + 180 + ")")
            )
            .attr("dominant-baseline", "central")
            .on("mouseover", function (d, data) {
              tooltip.html(
                `<div class="chart-tooltip-contents"><div class="value">${label}</div></div>`
              );
              return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function (d) {
              return tooltip
                .style("top", d.pageY - 30 + "px")
                .style("left", d.pageX - 60 + "px");
            })
            .on("mouseout", function () {
              return tooltip.style("visibility", "hidden");
            });
          gText
            .append("circle")
            .attr("fill", (d) => {
              return "none";
            })
            .attr("stroke", (d) => {
              return lableObj.color;
            })
            .attr("cx", -10)
            .attr("cy", 1)
            .attr("r", 4)
            .attr("stroke-width", -12)
            .attr(
              "transform",
              "translate(" +
                (centroidText[0] - (8 * width) / 100) +
                "," +
                (centroidText[1] + 15 + ") rotate(" + 180 + ")")
            );
        }
      });
    });
    d3.select(this.ref.current);
  };

  renderBarsData = (data) => {
    const JSX = [];
    data?.length &&
      data.forEach((item, index) => {
        JSX.push(
          <ListItem key={v4()}>
            <p>{item.name}</p>
            <Box className="d-block right-contant">
              <span>
                <span
                  style={{
                    width: `${item.percentage || 0}%`,
                    background: `${colorPallate[index]}`,
                  }}
                ></span>
              </span>
            </Box>
            <label>${item.value?.toLocaleString() || 0}</label>
          </ListItem>
        );
      });
    return JSX;
  };
  render() {
    return (
      <Box className="gauge-chart">
        <svg ref={this.ref} viewBox={`0 0 ${width} ${height}`}></svg>
        <Box className="d-block chart-details">
          <List>{this.renderBarsData(this.props.data)}</List>
        </Box>
      </Box>
    );
  }
}

export default GaugeChart;
