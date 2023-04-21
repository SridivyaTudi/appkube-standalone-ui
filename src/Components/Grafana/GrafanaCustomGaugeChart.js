import React, { useEffect } from 'react';
import { NoSsr } from '@mui/material';

import bb, { gauge } from 'billboard.js'


export default function GrafanaCustomGaugeChart(props) {
  let chartRef = null;
  const configChartData = () => {
    const { panel, data } = props;
    const self = this;
    let units = '';
    if (panel.format) {
      if (panel.format.startsWith('percent')) {
        units = '%';
      } else {
        units = ` ${panel.format}`;
      }
    }
    let min = 0; let max = 100;
    if (panel.gauge) {
      if (panel.gauge.minValue) min = panel.gauge.minValue;
      if (panel.gauge.maxValue) max = panel.gauge.maxValue;
    }
    let colors = [];
    if (panel.colors) {
      colors = panel.colors;
    }
    let thresholds = [];
    if (panel.thresholds) {
      thresholds = panel.thresholds.split(',').map((t) => parseFloat(t.trim()));
    }

    let gdata = 0; let glabel = '';
    if (data && data.length > 0) {
      const dlind = data[0].length - 1;
      gdata = data[0][dlind]
        ? data[0][dlind]
        : 0;
      glabel = data[0][0];
    }

    if (chartRef && chartRef !== null) {
      self.chart = bb.generate({
        // oninit: function(args){
        //   console.log(JSON.stringify(args));
        // },
        bindto : chartRef,
        data : { columns : [
          [
            glabel,
            gdata,
          ],
        ],
        type : gauge(), },
        gauge : { min,
          max,
          // units,
          label : {
            // show: glabel && glabel !== '',
            format(value) {
              return value + units;
            },
            extents() {
              // return (isMax ? "Max:" : "Min:") + value;
              return '';
            }, },
          //    width: 39 // for adjusting arc thickness
        },
        color : { pattern : colors, // the three color levels for the percentage values.
          threshold : {
            //            unit: 'value', // percentage is default
            //            max: 200, // 100 is default
            values : thresholds, }, },
        legend : { show : false, },
        tooltip : { show : false, },
        // size: {
        //   height: '100%',
        // }
      });
    }
  };

  useEffect(() => {
    configChartData();
  });
  const { error } = props;

  // const {chartData, options} = this.state;
  return (
    <NoSsr>
      {/* <div className={classes.title}>{panel.title}</div> */}
      <div>{error && 'There was an error communicating with the server'}</div>
      <div ref={(ch) => chartRef = ch} />
    </NoSsr>
  );
}
