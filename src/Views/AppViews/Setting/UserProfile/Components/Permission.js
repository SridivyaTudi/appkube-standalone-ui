import { Box } from "@mui/material";
import { Component } from "react";
import AccordionView from "../../Components/AccordionView";
let accessPolicyData = [
  {
    name: "Permission Set",
    chlidren: [
      {
        name: "Environment",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment",
         },
          { name: "Create Product Environment",
         },
        ],
      },
      {
        name: "Product",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment",
         },
          { name: "Create Product Environment",
         },
        ],
      },
      {
        name: "SHR",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment",
         },
          { name: "Create Product Environment",
         },
        ],
      },
      {
        name: "DevSecOps",
        chlidren: [
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          {
            name: "Create Product Environment",
          },
          { name: "Create Product Environment",
         },
          { name: "Create Product Environment",
         },
        ],
      },
    ],
  },
];

class Permission extends Component {
  render() {
    return (
      <Box className="setting-table">
        <AccordionView data={accessPolicyData} />
      </Box>
    );
  }
}

export default Permission;
