import React from "react";
import Box from "@mui/material/Box";

function Loader(props) {
  return (
    <Box className={`loader ${props.className}`}>
      <i className="fa-solid fa-spinner fa-spin"></i><span>Loading...</span>
    </Box>
  );
}

export default Loader;
