import React, { Component } from "react";
import * as d3 from "d3";
import { convertDigitToThousand, getFormattedDate } from "Utils";
class MultiLineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  componentDidMount = () => {
    this.renderChart();
  };

  renderChart = () => {
    let { data } = this.props;

    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = 524 - margin.left - margin.right,
      height = 293 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%m-%y");
    data = data.map(function (d) {
      d.date = parseTime(d.date);
      d.last_quarter = +d.last_quarter;
      d.current_quarter = +d.current_quarter;
      d.forecasted_spend = +d.forecasted_spend;
      return d;
    });
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the 1st line
    var valueline = d3
      .line()
      .curve(d3.curveCardinal)
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.last_quarter);
      });

    // define the 2nd line
    var valueline2 = d3
      .line()
      .curve(d3.curveCardinal)
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.current_quarter);
      });

    var valueline3 = d3
      .line()
      .curve(d3.curveCardinal)
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.forecasted_spend);
      });

    var svg = d3
      .select(this.ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return Math.max(d.last_quarter, d.current_quarter, d.forecasted_spend);
      }),
    ]);

    // Add the valueline path.
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("d", valueline);

    // Add the valueline2 path.
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .style("stroke", "orange")
      .attr("d", valueline2);
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke-dasharray", "3, 3")
      .attr("fill", "none")
      .style("stroke", "pink")
      .attr("d", valueline3);

    // Add the X Axis
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ") ")
      .call(
        d3.axisBottom(x).tickFormat((d) => {
          let date = getFormattedDate(d);
          if (date) {
            date = date?.split(" ");
            return date[0];
          }
        })
      )
      .selectAll("text")
      .attr("transform", "translate(0,10)rotate(15)");

    // Add the Y Axis
    svg
      .append("g")
      .call(d3.axisLeft(y).tickFormat((d) => "$" + convertDigitToThousand(d)));
    d3.select(this.ref.current);
  };
  render() {
    return <svg ref={this.ref}></svg>;
  }
}

export default MultiLineChart;
