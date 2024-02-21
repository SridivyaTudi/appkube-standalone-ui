import React, { Component } from "react";
import * as d3 from "d3";

class GaugeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    this.renderChart();
  };

  renderChart = async () => {
    let { data } = this.props;
    let width = 284;
    let height = 298;
    var svg = d3
      .select(this.ref.current)
      .attr("width", width)
      .attr("height", height);

    var arcs = data.map((v, i) => {
      return d3
        .arc()
        .innerRadius(i * 20 + 40)
        .outerRadius(i * 20 - 5 + 40);
    });

    var pieData = data.map((v, i) => {
      return [
        {
          percentage: v.percentage * 0.75,
          arc: arcs[i],
          name: v.name,
          color: v.color,
          value: v.value,
        },
        { percentage: (100 - v.percentage) * 0.75, arc: arcs[i] },
        { percentage: 0.25, arc: arcs[i] },
      ];
    });
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "15px")
      .attr("fill", "black")
      .text("64.3%")
      .attr("transform", `translate(${width / 2.4},${height / 2.4})`);
    var pie = d3
      .pie()
      .sort(null)
      .value((d) => d.percentage);

    var g = svg
      .selectAll("g")
      .data(pieData)
      .enter()
      .append("g")
      .attr("transform", "translate(120,120) rotate(180)")
      .attr("fill-opacity", (d, i) => 2 / (i + 1));

    g.selectAll("path")
      .data((d) => pie(d))
      .enter()
      .append("path")
      .attr("d", (d) => d.data.arc(d))
      .attr("fill", (d, i) => {
        return i == 0 ? d.data.color : "#DBDFF1";
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
        if (i === 0) {
          var centroidText = r.data.arc.centroid({
            startAngle: r.startAngle,
            endAngle: r.startAngle,
          });
          var lableObj = r.data;
          gText
            .append("text")
            .attr("font-size", 12)
            .text(`${lableObj.name} $${lableObj.value}`)
            .attr(
              "transform",
              "translate(" +
                (centroidText[0] - (1 * width) / 100) +
                "," +
                (centroidText[1] + 30 + ") rotate(" + 180 + ")")
            )
            .attr("dominant-baseline", "central");
        }
      });
    });
    d3.select(this.ref.current);
  };
  render() {
    return <svg ref={this.ref}></svg>;
  }
}

export default GaugeChart;
