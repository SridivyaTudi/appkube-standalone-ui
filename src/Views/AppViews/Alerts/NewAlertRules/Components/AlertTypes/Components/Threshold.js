import React, { Component } from "react";
import { Box, Button } from "@mui/material";

class Threshold extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retantionPolicy: true,
      messurementTag: true,
      fields: true,
    };
  }

  sendAlertType = (val) => {
    this.props.parentCallback(val);
}

DBRetentionPolicy() {
    let retantionData = (
        <div className="database">
            <ul>
                <li className="active"><a>Database_1</a></li>
                <li><a>Database_2</a></li>
                <li><a>Database_3</a></li>
            </ul>
        </div>);
    return retantionData;
}

messurementTag() {
    let messurement = (
        <div className="database-selected">
            <ul>
                <li className="selected">
                    <a>Cq</a>
                    <Button className="toggle-btn"><i className="fa-solid fa-bars"></i></Button>
                    <div className="toggle-box">
                        <ul>
                            <li className="selected">
                                <a>hostname-1</a>
                                <div className="hostname">Group By hostname</div>
                                <div className="hostname-search">
                                    <button><i className="fa fa-search"></i></button>
                                    <input type="text" className="input-group-text" placeholder="Filter within hostname" />
                                </div>
                                <div className="hostip">ip-172-16-1-210</div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a>database</a>
                </li>
                <li>
                    <a>httpd</a>
                </li>
                <li>
                    <a>queryExecutor</a>
                </li>
                <li>
                    <a>runtime</a>
                </li>
            </ul>
        </div>
    );
    return messurement;
}

fieldData() {
    let fields = (
        <div className="measurement-selected">
            <ul>
                <li className="selected">
                    <a>queryFail</a>
                    <div className="functions">0 Functions</div>
                    <div className="functions-box">
                        <ul>
                            <li><a>mean</a></li>
                            <li><a>median</a></li>
                            <li><a>count</a></li>
                            <li><a>min</a></li>
                            <li><a>max</a></li>
                            <li><a>sum</a></li>
                            <li><a>first</a></li>
                            <li><a>last</a></li>
                            <li><a>spread</a></li>
                            <li><a>stddev</a></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <a>queryOk</a>
                </li>
            </ul>
        </div>
    );
    return fields;
}

changeAlertTypeData(tabValue) {
    if (tabValue === 'Threshold' || tabValue === 'Relative') {
        this.setState({
            retantionPolicy: true,
            messurementTag: true,
            fields: true
        });
        this.sendAlertType(tabValue);
    } else if (tabValue === 'Availability') {
        this.setState({
            retantionPolicy: true,
            messurementTag: true,
            fields: false
        });
        this.sendAlertType(tabValue);
    }
}

  render() {
    const { retantionPolicy, messurementTag, fields } = this.state;
    return (
      <>
        <Box className="alert-details-description">
          <label>Time Series</label>
          <Box className="time-series-box">
            <Box className="time-series-inner">
              <Box className="time-series-header">
                {retantionPolicy ? (
                  <Box className="heading retention-policy">
                    DB.RetentionPolicy
                  </Box>
                ) : (
                  <Box></Box>
                )}
                {messurementTag ? (
                  <Box className="heading measurements">
                    Measurements & Tags
                  </Box>
                ) : (
                  <Box></Box>
                )}
                {fields ? (
                  <Box className="heading fields">Fields</Box>
                ) : (
                  <Box></Box>
                )}
              </Box>
              <Box className="time-series-body">
                {retantionPolicy ? this.DBRetentionPolicy() : null}
                {messurementTag ? this.messurementTag() : null}
                {fields ? this.fieldData() : null}
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

export default Threshold;
