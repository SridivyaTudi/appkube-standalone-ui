import React, { Component } from 'react';

export class AlertTypes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            retantionPolicy: true,
            messurementTag: true,
            fields: true
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
                        <div className="toggle">=</div>
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
            <div className="alert-details">
                <div className="alert-details-name">
                    <label>Alert Type</label>
                    <div className="choose-one-box">
                        <span>Choose One:</span>
                        <ul>
                            <li onClick={() => { this.changeAlertTypeData('Threshold') }} className="active"><a>Threshold</a></li>
                            <li onClick={() => { this.changeAlertTypeData('Relative') }}><a>Relative</a></li>
                            <li onClick={() => { this.changeAlertTypeData('Availability') }}><a>Availability</a></li>
                        </ul>
                    </div>
                </div>
                <div className="alert-details-description">
                    <label>Time Series</label>
                    <div className="time-series-box">
                        <div className="time-series-inner">
                            <div className="time-series-header">
                                {retantionPolicy ? <div className="heading retention-policy">DB.RetentionPolicy</div> : <div></div>}
                                {messurementTag ? <div className="heading measurements">Measurements & Tags</div> : <div></div>}
                                {fields ? <div className="heading fields">Fields</div> : <div></div>}
                            </div>
                            <div className="time-series-body">
                                {retantionPolicy ? this.DBRetentionPolicy() : null}
                                {messurementTag ? this.messurementTag() : null}
                                {fields ? this.fieldData() : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}