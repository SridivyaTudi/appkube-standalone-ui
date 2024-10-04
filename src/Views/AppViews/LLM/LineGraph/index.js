import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ datapoints }) => {
  console.log("hello")
  console.log(datapoints)
  const data = {
    labels: datapoints.map(point => new Date(point.Timestamp).toLocaleString()),
    datasets: [
      {
        label: 'CPU Utilization',
        data: datapoints.map(point => point.Average),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Allows full control over the height
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Utilization (%)',
        },
        min: 0,
        max: 60, // Adjust the Y-axis limits as needed
      },
    },
  };

  return (
    <Box sx={{ width: '1000px', height: '300px' }}> {/* Adjust width/height as needed */}
      <Line data={data} options={options} />
    </Box>
  );
};

export default LineGraph;