import React, { Component } from "react";
import { Box, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import ProgressChart from "./ProgressChart";
// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor:
//       theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: theme.palette.mode === "light" ? "#FF2D2E" : "#FF2D2E",
//   },
// }));

class ProgressBarChart extends Component {
  render() {
    return (
      <Box className="progress-cards">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <Box className="progress-card">
              <Box className="card-head">
                <Box className="d-inline-block">
                  <label className="d-block">R&D</label>
                  <span className="d-block">R&D Department</span>
                </Box>
                <Box className="d-flex align-items-center timing-content">
                  <i class="far fa-clock m-r-1"></i>
                  <p>20 days left </p>
                </Box>
              </Box>
              <Box className="card-content">
                <Box className="remaining-budget">
                  <Box className="d-flex">
                    <label>Remaining Budget &#58; </label> <span>$0</span>
                  </Box>
                  <Box className="d-flex">
                    <label>Period &#58; </label> <span>Quarterly</span>
                  </Box>
                </Box>
                <Box className="progress-top-content">
                    <label>Spendings $2500</label>
                    <label>Spendings $2500</label>
                </Box>
                <ProgressChart color={"#FF708B"} />
                {/* <BorderLinearProgress variant="determinate" value={50} /> */}
                <Box className="progress-bottom-content">
                   <span> <i class="fas fa-exclamation-triangle m-r-1"></i> $500 Unbudgeted spend detected</span>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className="progress-card green-card">
              <Box className="card-head">
                <Box className="d-inline-block">
                  <label className="d-block">Cluster Budget</label>
                  <span className="d-block">Development Department</span>
                </Box>
                <Box className="d-flex align-items-center timing-content">
                  <i class="far fa-clock m-r-1"></i>
                  <p>20 days left </p>
                </Box>
              </Box>
              <Box className="card-content">
                <Box className="remaining-budget">
                  <Box className="d-flex">
                    <label>Remaining Budget &#58; </label> <span>$0</span>
                  </Box>
                  <Box className="d-flex">
                    <label>Period &#58; </label> <span>Quarterly</span>
                  </Box>
                </Box>
                <Box className="progress-top-content">
                    <label>Spendings $2500</label>
                    <label>Spendings $2500</label>
                </Box>
                <ProgressChart color={"#53CA43"} />
                {/* <BorderLinearProgress variant="determinate" value={50} /> */}
                <Box className="progress-bottom-content">
                   <span> <i class="fas fa-exclamation-triangle m-r-1"></i> $500 Unbudgeted spend detected</span>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className="progress-card">
              <Box className="card-head">
                <Box className="d-inline-block">
                  <label className="d-block">Production Budget</label>
                  <span className="d-block">Operations Budget</span>
                </Box>
                <Box className="d-flex align-items-center timing-content">
                  <i class="far fa-clock m-r-1"></i>
                  <p>20 days left </p>
                </Box>
              </Box>
              <Box className="card-content">
                <Box className="remaining-budget">
                  <Box className="d-flex">
                    <label>Remaining Budget &#58; </label> <span>$0</span>
                  </Box>
                  <Box className="d-flex">
                    <label>Period &#58; </label> <span>Quarterly</span>
                  </Box>
                </Box>
                <Box className="progress-top-content">
                    <label>Spendings $2500</label>
                    <label>Spendings $2500</label>
                </Box>
                <ProgressChart color={"#FF708B"}  />
                {/* <BorderLinearProgress variant="determinate" value={50} /> */}
                <Box className="progress-bottom-content">
                   <span> <i class="fas fa-exclamation-triangle m-r-1"></i> $500 Unbudgeted spend detected</span>
                </Box>
              </Box>
            </Box>
          </Grid>
         
        </Grid>
      </Box>
    );
  }
}

export default ProgressBarChart;
