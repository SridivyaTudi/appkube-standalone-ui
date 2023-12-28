import React, { useEffect, useState } from "react";
import logo from "assets/img/logo.png";
import notification from "assets/img/notification.png";
import avatar from "assets/img/avatar.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { organizationsAsyncThunk } from "Redux/Organization/OrganizationThunk";
import {
  getCurrentOrgId,
  setCurrentOrgId,
  getCurrentUser,
  localStorageClear,
} from "Utils";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
let user = { username: "", email: "", profileImage: "" };
function TopBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orgs = useSelector((state) => state.organization);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const onClickNotification = () => {
    setShowNotification(!showNotification);
    setShowProfile(false);
  };

  const onClickProfile = () => {
    setShowProfile(!showProfile);
    setShowNotification(false);
  };

  useEffect(() => {
    if (!getCurrentOrgId()) {
      dispatch(organizationsAsyncThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let userDetails = getCurrentUser()?.info?.user;
    if (userDetails) {
      user = userDetails;
    }
  }, []);

  useEffect(() => {
    if (orgs?.length) {
      setCurrentOrgId(orgs[0]?.id);
    }
  }, [orgs]);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#ffffffff",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#ffffffff",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <Box className="top-bar">
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            <Box className="logo">
              <img src={logo} alt="" />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="top-search">
              <input type="text" className="input" />
              <button className="button">
                <SearchOutlinedIcon />
              </button>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className="top-right-bar">
              <Box className="notification-box">
                <Box className="notification" onClick={onClickNotification}>
                  <span></span>
                  <img src={notification} alt="" />
                </Box>
                <Box
                  className={
                    showNotification
                      ? "notification-dropdown active"
                      : "notification-dropdown"
                  }
                >
                  <Box className="d-flex align-items-center header">
                    4 New Notifications
                  </Box>
                  <List>
                    <ListItem>
                      <i className="fa-regular fa-comment"></i>
                      <Box className="details">
                        <div className="name">New device detected</div>
                        <div className="content">
                          Login from a new device has been detected.
                        </div>
                        <div className="time">2 hours ago</div>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <i className="fa-regular fa-comment"></i>
                      <Box className="details">
                        <div className="name">New device detected</div>
                        <div className="content">
                          Login from a new device has been detected.
                        </div>
                        <div className="time">2 hours ago</div>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <i className="fa-regular fa-comment"></i>
                      <Box className="details">
                        <div className="name">New device detected</div>
                        <div className="content">
                          Login from a new device has been detected.
                        </div>
                        <div className="time">2 hours ago</div>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <i className="fa-regular fa-comment"></i>
                      <Box className="details">
                        <div className="name">New device detected</div>
                        <div className="content">
                          Login from a new device has been detected.
                        </div>
                        <div className="time">2 hours ago</div>
                      </Box>
                    </ListItem>
                  </List>
                  <Box className="d-flex align-items-center show-notifications">
                    <span>Show all notifications</span>
                  </Box>
                </Box>
                {showNotification ? (
                  <div
                    className="notification-bg"
                    onClick={onClickNotification}
                  ></div>
                ) : (
                  <></>
                )}
              </Box>
              <Box className="profile-box">
                <Box className="profile" onClick={onClickProfile}>
                  <img
                    src={
                      user.profileImage
                        ? `data:image/png;base64,${user.profileImage}`
                        : avatar
                    }
                    alt=""
                  />
                </Box>
                <Box
                  className={
                    showProfile ? "profile-dropdown active" : "profile-dropdown"
                  }
                >
                  <Box className="d-flex align-items-center header">
                    <Box className="user-img">
                      <img
                        src={
                          user.profileImage
                            ? `data:image/png;base64,${user.profileImage}`
                            : avatar
                        }
                        alt=""
                      />
                    </Box>
                    <Box className="details">
                      <HtmlTooltip
                        className="table-tooltip"
                        title={
                          <React.Fragment>
                            <Box className="details">
                              <div className="name">{user.username}</div>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <div className="name">{user.username}</div>
                      </HtmlTooltip>
                      <HtmlTooltip
                        className="table-tooltip"
                        title={
                          <React.Fragment>
                            <Box className="details">
                              <div className="email">{user.email}</div>
                            </Box>
                          </React.Fragment>
                        }
                      >
                        <div className="email">{user.email}</div>
                      </HtmlTooltip>
                    </Box>
                  </Box>
                  <List>
                    <ListItem className="item">
                      <i className="fa-solid fa-file-invoice m-r-2"></i>
                      Account
                    </ListItem>
                    {getCurrentUser() ? (
                      <ListItem
                        className="item"
                        onClick={() => {
                          localStorageClear();
                          navigate("/auth");
                        }}
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket m-r-2"></i>
                        Logout
                      </ListItem>
                    ) : (
                      <></>
                    )}
                  </List>
                </Box>
                {showProfile ? (
                  <div className="profile-bg" onClick={onClickProfile}></div>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default TopBar;
