//import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
//import Collapse from "@mui/material/Collapse";
//import IconButton from "@mui/material/IconButton";
//import Paper from "@mui/material/Paper";
//import Table from "@mui/material/Table";
//import TableBody from "@mui/material/TableBody";
//import TableCell from "@mui/material/TableCell";
//import TableContainer from "@mui/material/TableContainer";
//import TableHead from "@mui/material/TableHead";
//import TableRow from "@mui/material/TableRow";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import React, { Component } from "react";
import AccordionView from "../../../Components/AccordionView";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
//import status from "Redux/Constants/CommonDS";

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

// function createData(name) {
//   return {
//     name,

//     history: [
//       {
//         customerId: "Create Landing Zone",
//       },
//       {
//         customerId: "Edit Landing Zone",
//       },
//       {
//         customerId: "Clone Landing Zone",
//       },
//       {
//         customerId: "Migrate Landing Zone",
//       },
//       {
//         customerId: "Delete Landing Zone",
//       },
//       {
//         customerId: "Replicate Landing Zone",
//       },
//       {
//         customerId: "Create Product Enclave",
//       },
//       {
//         customerId: "Clone Product Enclave",
//       },
//       {
//         customerId: "Migrate Product Enclave",
//       },
//       {
//         customerId: "Delete Product Enclave",
//       },
//     ],
//   };
// }

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ "& > *": { borderBottom: "unset" } }}  className={open?"active":"non-active"}>
//         <TableCell>
//           <IconButton
//             className="m-r-2 "
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon /> }
//           </IconButton>
//           {row.name}
//         </TableCell>
//         <TableCell>
//           <Box className="d-flex roles-box">
//             <HtmlTooltip
//               className="table-tooltip d-flex"
//               title={
//                 <React.Fragment>
//                   <span>This role created by default by the system</span>
//                 </React.Fragment>
//               }
//             >
//               Permitted
//             </HtmlTooltip>
//           </Box>
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell className="inner-table-section" style={{ paddingBottom: 0, paddingTop: 0,  }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Table size="small" aria-label="purchases">
//                 <TableBody className="inner-body">
//                   {row.history.map((historyRow) => (
//                     <TableRow>
//                       <TableCell>
//                         <IconButton
//                           className="m-r-2"
//                           aria-label="expand row"
//                           size="small"
//                           onClick={() => setOpen(!open)}
//                         >
//                           {open ? (
//                             <KeyboardArrowRightIcon />
//                           ) : (
//                             <KeyboardArrowDownIcon />
//                           )}
//                         </IconButton>
//                         {historyRow.customerId}
//                       </TableCell>
//                       <TableCell>
//                         <Box className="check-icon">
//                           <i className="fas fa-check"></i>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

//const rows = [createData("Envierment")];

let accessPolicyData = [
  {
    name: "Product",
    subName: (
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
    ),
    chlidren: [
      {
        name: "Create Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="check-icon">
            <CheckIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Edit Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="check-icon">
            <CheckIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Clone Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="check-icon">
            <CheckIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Migrate Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="check-icon">
            <CheckIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Delete Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="check-icon">
            <CheckIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Replicate Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="check-icon">
            <CheckIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Add service in Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="check-icon">
            <CheckIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Add service in Product Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="check-icon">
            <CheckIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Delete service Product in Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="check-icon">
            <CheckIcon fontSize="inherit" />
          </IconButton>
        ),
      },
      {
        name: "Replicate service Product in Environment",
        subName: (
          <IconButton aria-label="delete" size="small" className="check-icon">
            <CheckIcon fontSize="inherit" />
          </IconButton>
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
        {/* <Box className="allowed-permission-table">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Premission set</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box> */}
      </>
    );
  }
}
export default Allowed;
