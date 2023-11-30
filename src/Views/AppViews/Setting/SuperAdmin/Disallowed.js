import { Box } from "@mui/material";
import { Component } from "react";
import AccordionView from "../Components/AccordionView";
let accessPolicyData = [
  {
    name: "Permission Set",
    chlidren: [
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
    ],
  },
];

class Disallowed extends Component {
  render() {
    return (
      <Box className="environment-table">
        <AccordionView data={accessPolicyData} />
      </Box>
    );
  }
}

export default Disallowed;
