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
import {
  deleteSelectedInfraTopologyView,
  deleteActiveTab,
  deleteUrlDetailsOfPage,
} from "Utils";
import { v4 } from "uuid";
import { CleaningServices, Margin } from "@mui/icons-material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#384cff",
    display: "none",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#384cff",
    color: "#ffffffff",
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(12),
  },
}));

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

  const isSubMenuActive = (link) => {
    if (location) {
      let pageName = "/" + location.pathname.split("/").pop();
      return pageName === link;
    }
    return false;
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
      <Box style={{ height: "100%", width: "100%", overflow: "auto" }}>
        <Box className="sidebar-inner" id="side-manu-parent">
          <List>
            {sideBarMenu.menu.map((item) => {
              return (
                <ListItem
                  className={
                    currentLocation.includes(item.link) ? "active" : ""
                  }
                  key={v4()}
                >
                  <Link
                    to={`${APP_PREFIX_PATH}${
                      item?.subMenu?.[0]?.link
                        ? item?.subMenu[0]?.link
                        : item.link
                    } `}
                    onClick={() => {
                      deleteSelectedInfraTopologyView();
                      deleteActiveTab();
                      deleteUrlDetailsOfPage();
                    }}
                  >
                    <HtmlTooltip
                      className="sidebar-tooltip"
                      placement="right"
                      title={item.subMenu || isActive ? "" : Parser(item.name)}
                    >
                      <span className={`icon ${Parser(item.icon)}`}></span>
                    </HtmlTooltip>

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
                      style={{
                        transform: `translate(
                        ${
                          document.getElementById("side-manu-parent")
                            ? document.getElementById("side-manu-parent")
                                .scrollTop
                            : 0
                        } px,
                        ${
                          document.getElementById("side-manu-parent")
                            ? document.getElementById("side-manu-parent")
                                .scrollLeft
                            : 0
                        } px
                      )`,
                      }}
                    >
                      {isActive ? '': <Box className="submenu-title">{Parser(item.name)}</Box> }
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
                              <Link to={`${APP_PREFIX_PATH}${subItem.link}`}>
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
    </Box>
  );
}

export default SideBar;
