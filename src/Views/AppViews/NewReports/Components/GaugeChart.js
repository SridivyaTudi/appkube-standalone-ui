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

    var svg = d3
      .select(this.ref.current)
      .attr("width", 284)
      .attr("height", 300);

    var arcs = data.map((v, i) => {
      return d3
        .arc()
        .innerRadius(i * 20 + 60)
        .outerRadius((i + 1) * 20 - 5 + 60);
    });

    var pieData = data.map((v, i) => {
      return [
        { value: v * 0.75, arc: arcs[i] },
        { value: (100 - v) * 0.75, arc: arcs[i] },
        { value: 100 * 0.25, arc: arcs[i] },
      ];
    });

    var pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    var g = svg
      .selectAll("g")
      .data(pieData)
      .enter()
      .append("g")
      .attr("transform", "translate(142,250) rotate(180)")
      .attr("fill-opacity", (d, i) => 2 / (i + 1));

    g.selectAll("path")
      .data((d) => pie(d))
      .enter()
      .append("path")
      .attr("d", (d) => d.data.arc(d))
      .attr("fill", (d, i) => (i == 0 ? "blue" : "none"));

    svg.selectAll("g").each(function (d) {
      var el = d3.select(this);
      el.selectAll("path").each((r, i) => {
        if (i == 1) {
          var centroid = r.data.arc.centroid({
            startAngle: r.startAngle + 0.05,
            endAngle: r.startAngle + 0.001 + 0.05,
          });
          g.append("text")
            .text(100 - Math.floor(r.value) + "%")
            .attr(
              "transform",
              `translate(${centroid[0]},${centroid[1]}) rotate(${
                (180 / Math.PI) * r.startAngle + 7
              })`
            )
            .attr("alignment-baseline", "middle");
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
