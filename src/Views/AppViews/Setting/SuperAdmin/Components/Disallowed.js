import { Box } from "@mui/material";
import React, { Component } from "react";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import AccordionView from "../../Components/AccordionView";
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
            Not Permitted
          </HtmlTooltip>
        </Box>
    ),
    chlidren: [
      {
        name: "Create Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Edit Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Clone Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Migrate Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Delete Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Replicate Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Add service in Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Add service in Product Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Delete service Product in Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        ),
      },
      {
        name: "Replicate service Product in Environment",
        subName: (
          <button type="button" className="close" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
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
          headers={[{name: "Permission set" , styled:{width:80}} , {name: "Status" , styled:{width:105}} ]}
        />
      </Box>
    );
  }
}

export default Disallowed;
