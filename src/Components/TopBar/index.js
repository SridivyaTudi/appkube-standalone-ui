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
import { getCurrentOrgId, setCurrentOrgId,getCurrentUser } from "Utils";

function TopBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orgs = useSelector((state) => state.organization);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const onClickNotification = () => {
    setShowNotification(!showNotification)
    setShowProfile(false)
  }

  const onClickProfile = () => {
    setShowProfile(!showProfile)
    setShowNotification(false)
  }

  useEffect(() => {
    if (!getCurrentOrgId()) {
      dispatch(organizationsAsyncThunk());
    }
  }, []);

  useEffect(() => {
    if (orgs?.length) {
      setCurrentOrgId(orgs[0]?.id);
    }
  }, [orgs]);

  const getCurrentUserInfo = ()=>{
    return getCurrentUser() ? getCurrentUser()?.info?.user ? getCurrentUser().info.user : { username:'',email:'',profileImage:''} : {username:'',email:'',profileImage:''}
  }
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
                <Box
                  className="notification"
                  onClick={() => onClickNotification()}
                >
                  <span></span>
                  <img src={notification} alt="" />
                </Box>
                <Box className={showNotification === true ? "notification-dropdown active" : "notification-dropdown"}>
                  <Box className="d-flex align-items-center header">
                    4 New Notifications
                  </Box>
                  <List>
                    <ListItem>
                      <i className="fa-regular fa-comment"></i>
                      <Box className="details">
                        <div className="name">New device detected</div>
                        <div className="content">Login from a new device has been detected.</div>
                        <div className="time">2 hours ago</div>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <i className="fa-regular fa-comment"></i>
                      <Box className="details">
                        <div className="name">New device detected</div>
                        <div className="content">Login from a new device has been detected.</div>
                        <div className="time">2 hours ago</div>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <i className="fa-regular fa-comment"></i>
                      <Box className="details">
                        <div className="name">New device detected</div>
                        <div className="content">Login from a new device has been detected.</div>
                        <div className="time">2 hours ago</div>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <i className="fa-regular fa-comment"></i>
                      <Box className="details">
                        <div className="name">New device detected</div>
                        <div className="content">Login from a new device has been detected.</div>
                        <div className="time">2 hours ago</div>
                      </Box>
                    </ListItem>
                  </List>
                  <Box className="d-flex align-items-center show-notifications"><a href="#">Show all notifications</a></Box>
                </Box>
                {showNotification === true ? (
                  <div className="notification-bg" onClick={() => onClickNotification()}></div>
                ) : (
                  <></>
                )}
              </Box>
              <Box className="profile-box">
                <Box
                  className="profile"
                  onClick={() => onClickProfile()}
                >
                  <img src={getCurrentUserInfo().profileImage ? `data:image/png;base64,${getCurrentUserInfo().profileImage}` : avatar} alt="" />
                </Box>
                <Box className={showProfile === true ? "profile-dropdown active" : "profile-dropdown"}>
                  <Box className="d-flex align-items-center header">
                    <Box className="user-img">
                      <img src={getCurrentUserInfo().profileImage ? `data:image/png;base64,${getCurrentUserInfo().profileImage}` : avatar} alt="" />
                    </Box>
                    <Box className="details">
                      <div className="name">{getCurrentUserInfo().username}</div>
                      <div className="email">{getCurrentUserInfo().email}</div>
                    </Box>
                  </Box>
                  <List>
                    <ListItem>
                      <a className="item" href="#!">
                        <i className="fa-solid fa-file-invoice m-r-2"></i>
                        Account
                      </a>
                    </ListItem>
                    {localStorage.getItem("currentUser") ? (
                      <ListItem>
                        <a
                          className="item"
                          onClick={() => {
                            localStorage.clear();
                            navigate("/auth");
                          }}
                        >
                          <i className="fa-solid fa-arrow-right-from-bracket m-r-2"></i>
                          Logout
                        </a>
                      </ListItem>
                    ) : (
                      <></>
                    )}
                  </List>
                </Box>
                {showProfile === true ? (
                  <div className="profile-bg" onClick={() => onClickProfile()}></div>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
}

export default TopBar;
