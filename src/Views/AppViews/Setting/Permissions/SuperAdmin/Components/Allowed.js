
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React, { Component } from "react";
import AccordionView from "../../../Components/AccordionView";


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#16161E",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#16161E",
    color: "#ffffff",
    maxWidth: 250,

    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    padding: "8px 10px",
  },
}));



let accessPolicyData = [
  {
    name: "Product",
    subName: (
      <Box className="status-btn">
        <Box className="d-flex status green">
          <HtmlTooltip
            className="table-tooltip d-flex"
            title={
              <React.Fragment>
                <span>This role created by default by the system</span>
              </React.Fragment>
            }
          >
            <span>Permitted</span>
          </HtmlTooltip>
        </Box>
      </Box>
    ),
    chlidren: [
      {
        name: "Create Product Environment",
        subName: (
          <Box className="status-btn">
            <IconButton aria-label="delete" size="small" className="check-icon">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
      {
        name: "Edit Product Environment",
        subName: (
         <Box className="status-btn">
            <IconButton aria-label="delete" size="small" className="check-icon">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
      {
        name: "Clone Product Environment",
        subName: (
         <Box className="status-btn">
            <IconButton aria-label="delete" size="small" className="check-icon">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
      {
        name: "Migrate Product Environment",
        subName: (
         <Box className="status-btn">
            <IconButton aria-label="delete" size="small" className="check-icon">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
      {
        name: "Delete Product Environment",
        subName: (
         <Box className="status-btn">
            <IconButton aria-label="delete" size="small" className="check-icon">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
      {
        name: "Replicate Product Environment",
        subName: (
         <Box className="status-btn">
            <IconButton aria-label="delete" size="small" className="check-icon">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
      {
        name: "Add service in Product Environment",
        subName: (
         <Box className="status-btn">
            <IconButton aria-label="delete" size="small" className="check-icon">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
      {
        name: "Add service in Product Environment",
        subName: (
         <Box className="status-btn">
            <IconButton aria-label="delete" size="small" className="check-icon">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
      {
        name: "Delete service Product in Environment",
        subName: (
         <Box className="status-btn">
            <IconButton aria-label="delete" size="small" className="check-icon">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
      {
        name: "Replicate service Product in Environment",
        subName: (
         <Box className="status-btn">
            <IconButton aria-label="delete" size="small" className="check-icon">
              <CheckIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ),
      },
    ],
  },
];
class Allowed extends Component {
  render() {
    return (
      <>
        <Box className="setting-table permission-table">
          <AccordionView
            data={accessPolicyData}
            headers={[
              { name: "Permission set", styled: { width: 105 } },
              { name: "Status", styled: { width: 105 } },
            ]}
          />
        </Box>
      </>
    );
  }
}
export default Allowed;
