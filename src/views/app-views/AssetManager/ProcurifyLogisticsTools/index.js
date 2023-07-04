import React, { Component } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import ProcurifyIcon from "assets/img/assetmanager/procurify-icon.png";

export class ProcurifyLogisticsTools extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <Box className="environment-container">
                <Box className="list-heading">
                    <h3 className="m-b-0" style={{ lineHeight: '36px' }}>Procurify-Logistics-Tools</h3>
                    <Button className="primary-btn min-width-inherit float-right" variant="contained" >
                        <Link className="primary-btn min-width-inherit" variant="contained" style={{ color: "#ffffff" }} to={`${APP_PREFIX_PATH}/environments`}>
                            All Application
                        </Link>
                    </Button>
                </Box>
                <Box className="procurify-cards">
                    <Box className="procurify-card">
                        <Box className="image">
                            <img src={ProcurifyIcon} alt="" />
                        </Box>
                        <Box className="content">
                            <label>Client Name</label>
                            <strong>Procurify</strong>
                        </Box>
                    </Box>
                    <Box className="procurify-card">
                        <Box className="image">
                            <img src={ProcurifyIcon} alt="" />
                        </Box>
                        <Box className="content">
                            <label>User Count</label>
                            <strong>257</strong>
                        </Box>
                    </Box>
                    <Box className="procurify-card business-card">
                        <Box className="image">
                            <img src={ProcurifyIcon} alt="" />
                        </Box>
                        <Box className="content ">
                            <label>Line of Business</label>
                            <strong>Logistics</strong>
                        </Box>
                    </Box>
                    <Box className="procurify-card">
                        <Box className="image">
                            <img src={ProcurifyIcon} alt="" />
                        </Box>
                        <Box className="content">
                            <label>Environments</label>
                            <strong>02</strong>
                        </Box>
                    </Box>
                    <Box className="procurify-card">
                        <Box className="image">
                            <img src={ProcurifyIcon} alt="" />
                        </Box>
                        <Box className="content">
                            <label>SSL</label>
                            <strong>In build SSL</strong>
                        </Box>
                    </Box>
                    <Box className="procurify-card-buttons">
                        <Button className="primary-btn min-width-inherit" variant="contained">
                            <i class="fa-solid fa-trash-can"></i>
                        </Button>
                        <Button className="primary-btn min-width-inherit m-r-0" variant="contained">
                            <i class="fa-solid fa-rotate-right"></i>
                        </Button>
                    </Box>
                </Box>
                <Box className="main-information">
                    <Box className="d-flex list-heading">
                        <h3 className="m-b-0" style={{ lineHeight: '36px' }}>Main Information</h3>
                        <Box className="d-inline-block buttons">
                            <Button className="primary-outline-btn min-width-inherit" variant="outlined">
                                <i class="fa-solid fa-code-commit"></i> <span>02</span> Commits
                            </Button>
                            <Button className="primary-outline-btn min-width-inherit" variant="outlined">
                                <i class="fa-solid fa-code-branch"></i> <span>01</span> Branch
                            </Button>
                            <Button className="primary-outline-btn min-width-inherit" variant="outlined">
                                <i class="fa-solid fa-tags"></i> <span>31</span> Tags
                            </Button>
                        </Box>
                    </Box>
                    <Box className="main-information-box">

                    </Box>
                </Box>
            </Box>
        )
    }

}
export default ProcurifyLogisticsTools;