import { Box } from "@mui/material";
import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import AccordionView from "../../../Components/AccordionView";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
      <Box className="d-flex status">
        <HtmlTooltip
          className="table-tooltip d-flex"
          title={
            <React.Fragment>
              <span>This role created by default by the system</span>
            </React.Fragment>
          }
        >
          <span>Not Permitted</span>
        </HtmlTooltip>
      </Box>
    ),
    chlidren: [
      {
        name: "Create Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="close-icon">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Edit Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="close-icon">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Clone Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="close-icon">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Migrate Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="close-icon">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Delete Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="close-icon">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Replicate Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="close-icon">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Add service in Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="close-icon">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Add service in Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="close-icon">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Delete service Product in Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="close-icon">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Replicate service Product in Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="close-icon">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        ),
      },
    ],
  },
];

class Disallowed extends Component {
  render() {
    return (
      <Box className="setting-table permission-table">
        <AccordionView
          data={accessPolicyData}
          headers={[
            { name: "Permission set", styled: { width: 105 } },
            { name: "Status", styled: { width: 105 } },
          ]}
        />
      </Box>
    );
  }
}

export default Disallowed;
