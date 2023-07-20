import React from "react";
import { Link, useLocation } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import sideBarMenu from "components/SideBar/SideMenu.json";
import Parser from "html-react-parser";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function SideBar() {
  let location = useLocation();
  let currentLocation = location.pathname;

  return (
    <Box className="sidebar">
      <List>
        {sideBarMenu.menu.map((item) => {
          return (
            <ListItem className={currentLocation.includes(item.link) ? "active" : ""} key={item.item}>
              <Link to={`${APP_PREFIX_PATH + item.link}`}>
                {Parser(item.item)}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default SideBar;
