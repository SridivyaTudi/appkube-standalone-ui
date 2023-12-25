import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import sideBarMenu from "Components/SideBar/SideMenu.json";
import Parser from "html-react-parser";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { deleteSelectedInfraTopologyView, deleteActiveTab, deleteUrlDetailsOfPage } from "Utils";
import { v4 } from "uuid";
function SideBar() {
  let location = useLocation();
  let currentLocation = location.pathname;

  const [isActive, setActive] = useState(false);
  const [isActiveSubMenu, setActiveSubMenu] = useState(true);

  const toggleOpenclose = () => {
    setActive(!isActive);
  };

  const toggleSubMenuOpenClose = () => {
    setActiveSubMenu(!isActiveSubMenu);
  };

  return (
    <Box className={`sidebar ${isActive ? "open" : "close"}`}>
      <IconButton
        aria-label={
          !isActive ? "KeyboardArrowRightIcon" : "KeyboardArrowLeftIcon"
        }
        size="small"
        className="open-close"
        onClick={toggleOpenclose}
      >
        {!isActive ? (
          <KeyboardArrowRightIcon fontSize="inherit" />
        ) : (
          <KeyboardArrowLeftIcon fontSize="inherit" />
        )}
      </IconButton>
      <Box className="sidebar-inner">
        <List>
          {sideBarMenu.menu.map((item) => {
            return (
              <ListItem
                className={currentLocation.includes(item.link) ? "active" : ""}
                key={v4()}
              >
                <Link
                  to={`${APP_PREFIX_PATH + item.link}`}
                  onClick={() => {
                    deleteSelectedInfraTopologyView();
                    deleteActiveTab();
                    deleteUrlDetailsOfPage()
                  }}
                >
                  <span className={`icon ${Parser(item.icon)}`}></span>
                  <span className="name">{Parser(item.name)}</span>
                  {item.subMenu && (
                    <IconButton
                      aria-label={
                        !isActiveSubMenu
                          ? "KeyboardArrowRightIcon"
                          : "KeyboardArrowUpIcon"
                      }
                      size="small"
                      className=""
                      onClick={toggleSubMenuOpenClose}
                    >
                      {!isActiveSubMenu ? (
                        <KeyboardArrowDownIcon fontSize="inherit" />
                      ) : (
                        <KeyboardArrowUpIcon fontSize="inherit" />
                      )}
                    </IconButton>
                  )}
                </Link>
                {item.subMenu && (
                  <List
                    className={`${
                      isActiveSubMenu ? "submenuopen" : "submenuclose"
                    }`}
                  >
                    {item.subMenu &&
                      item.subMenu.map((subItem) => {
                        return (
                          <ListItem
                            key={v4()}
                            className={`${
                              currentLocation.includes(subItem.link)
                                ? "active"
                                : ""
                            }`}
                          >
                            <Link to={`${APP_PREFIX_PATH + subItem.link}`}>
                              {Parser(subItem.name)}
                              <span>
                                <KeyboardArrowRightIcon fontSize="inherit" />
                              </span>
                            </Link>
                          </ListItem>
                        );
                      })}
                  </List>
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

export default SideBar;
