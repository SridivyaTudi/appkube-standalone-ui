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
            name: "Create Prodect Environment",
          },
          {
            name: "Create Prodect Environment",
          },
          {
            name: "Create Prodect Environment",
          },
          { name: "Create Prodect Environment",
         },
          { name: "Create Prodect Environment",
         },
        ],
      },
      {
        name: "Prodect",
        chlidren: [
          {
            name: "Create Prodect Environment",
          },
          {
            name: "Create Prodect Environment",
          },
          {
            name: "Create Prodect Environment",
          },
          { name: "Create Prodect Environment",
         },
          { name: "Create Prodect Environment",
         },
        ],
      },
      {
        name: "SHR",
        chlidren: [
          {
            name: "Create Prodect Environment",
          },
          {
            name: "Create Prodect Environment",
          },
          {
            name: "Create Prodect Environment",
          },
          { name: "Create Prodect Environment",
         },
          { name: "Create Prodect Environment",
         },
        ],
      },
      {
        name: "DevSecOps",
        chlidren: [
          {
            name: "Create Prodect Environment",
          },
          {
            name: "Create Prodect Environment",
          },
          {
            name: "Create Prodect Environment",
          },
          { name: "Create Prodect Environment",
         },
          { name: "Create Prodect Environment",
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
