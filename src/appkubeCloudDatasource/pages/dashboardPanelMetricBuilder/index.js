import * as React from 'react';
import queryIcon from '../../../assets/img/appkubeCloudDatasource/img/query-icon.png';
import transformatioIcon from '../../../assets/img/appkubeCloudDatasource/img/transformatio-icon.png';
import alertIcon from '../../../assets/img/appkubeCloudDatasource/img/alert-icon.png';

class DashboardPanelMetricBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {} = this.state;
    return (
      <div className="asset-container">
        <div className="dashboard-panel-container">
          <div className="common-container">
            <div className="d-block page-heading">
              <div className="row">
                <div className="col-lg-9 col-md-9 col-sm-12">
                  <div className="asset-heading">New Dashboard / Add Panel</div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                  <div className="float-right">
                    <button className="panel-gray-button min-width-inherit">Save</button>
                    <button className="panel-gray-button min-width-inherit">Discard</button>
                    <button className="panel-white-button min-width-inherit close-button">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block add-panel-container">
              <div className="row">
                <div className="col-lg-9 col-md-9 col-sm-12">
                  <div className="d-block panel-left">
                    <div className="d-block graph-panel">
                      <div className="d-flex graph-top-panel">
                        <div className="d-inline-flex buttons">
                          <button className="panel-gray-button min-width-inherit">Fill</button>
                          <button className="panel-gray-button min-width-inherit">Fit</button>
                          <button className="panel-gray-button min-width-inherit">Exact</button>
                        </div>
                        <div className="d-inline-flex hours-dropdown">
                          <input type="radio" />
                          <strong>Last 6 hours</strong>
                          <i class="fa fa-chevron-down"></i>
                        </div>
                        <div className="d-inline-flex arrows-buttons">
                          <button className="panel-gray-button min-width-inherit">
                            <i class="fa fa-search"></i>
                          </button>
                          <button className="panel-gray-button min-width-inherit">
                            <i class="fa fa-sync-alt"></i>
                          </button>
                          <button className="panel-gray-button min-width-inherit">
                            <i class="fa fa-chevron-down"></i>
                          </button>
                        </div>
                      </div>
                      <div className="d-block graph-panel"></div>
                    </div>
                    <div className="d-block panel-buttons">
                      <button className="panel-gray-button">
                        <img src={queryIcon} alt="" />
                        Query
                        <span>1</span>
                      </button>
                      <button className="panel-gray-button">
                        <img src={transformatioIcon} alt="" />
                        Transformatio
                        <span>0</span>
                      </button>
                      <button className="panel-gray-button">
                        <img src={alertIcon} alt="" />
                        Alert
                        <span>0</span>
                      </button>
                    </div>
                    <div className="d-block panel-data-source">
                      <div className="d-inline-block data-source-box">Data Source</div>
                      <div className="d-inline-block data-source-select">
                        <select>
                          <option>Default </option>
                          <option>Default 1</option>
                          <option>Default 2</option>
                          <option>Default 3</option>
                        </select>
                      </div>
                      <div className="d-inline-block question-button">
                        <button className="panel-gray-button min-width-inherit">
                          <i class="far fa-question-circle"></i>
                        </button>
                      </div>
                      <div className="d-inline-block query-options-box">
                        <i class="fa fa-chevron-right"></i>
                        <strong>Query options</strong>
                        <span>MD = auto =1257</span>
                        <span>interval = 15s</span>
                      </div>
                      <div className="d-inline-block query-inspector-box">Query inspector</div>
                    </div>
                    <div className="d-block panel-query-inspector">
                      <i class="fas fa-chevron-down"></i>
                      <strong>A</strong>
                      <p>
                        {
                          '{"namespace":"","metricName":"","expression":"","dimensions":{},"region":"default","id":"","alias":"","statistics":["Average"],"period":"","refId":"A","matchExact":true}'
                        }
                      </p>
                      <div className="float-right">
                        <button className="btn">
                          <i class="fas fa-caret-down"></i>
                        </button>
                        <button className="btn">
                          <i class="fas fa-caret-up"></i>
                        </button>
                        <button className="btn">
                          <i class="far fa-copy"></i>
                        </button>
                        <button className="btn">
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div className="d-block panel-builder-code">
                      <div className="d-inline-block select-menu">
                        <select>
                          <option>Metric</option>
                          <option>LOC</option>
                          <option>Trace</option>
                          <option>API</option>
                        </select>
                      </div>
                      <div className="d-inline-block select-menu">
                        <select>
                          <option>Metric Search</option>
                          <option>Metric Query</option>
                        </select>
                      </div>
                      <div className="float-right builder-code-button">
                        <button className="btn active">Builder</button>
                        <button className="btn">Code</button>
                      </div>
                    </div>
                    <div className="d-block panel-builder-code-menus">
                      <div className="d-inline-block select-menu">
                        <label>Product</label>
                        <select>
                          <option>Select</option>
                          <option>HRMS</option>
                          <option>Procurement</option>
                          <option>Supply chain</option>
                          <option>CMS</option>
                        </select>
                      </div>
                      <div className="d-inline-block select-menu">
                        <label>Environment</label>
                        <select>
                          <option>Select</option>
                          <option>Prod</option>
                          <option>Stage</option>
                          <option>Dev</option>
                          <option>Test</option>
                        </select>
                      </div>
                      <div className="d-inline-block select-menu">
                        <label>Modulds</label>
                        <select>
                          <option>Select</option>
                          <option>Recruitment</option>
                          <option>Attendance</option>
                          <option>Appraisals</option>
                          <option>Salary</option>
                          <option>Engagement</option>
                          <option>Documentation</option>
                        </select>
                      </div>
                      <div className="d-inline-block select-menu">
                        <label>App / Data Service</label>
                        <select>
                          <option>Select</option>
                          <option>Java app</option>
                          <option>RDS Postgres DB </option>
                          <option>Open Search DB</option>
                          <option>S3</option>
                          <option>GitHub</option>
                        </select>
                      </div>
                    </div>
                    <div className="d-block panel-builder-code-form">
                      <div className="d-block w-100">
                        <div className="d-inline-block input-box">
                          <label>Element Type</label>
                          <input type="text" placeholder="EC2" />
                        </div>
                        <div className="d-inline-block input-box">
                          <label>Instance ID</label>
                          <input type="text" placeholder="6821ghhe" />
                        </div>
                      </div>
                      <div className="d-block w-100">
                        <div className="d-inline-block input-box m-b-0">
                          <label>Metric Name</label>
                          <select>
                            <option>Select</option>
                            <option>HRMS</option>
                            <option>Procurement</option>
                            <option>Supply chain</option>
                            <option>CMS</option>
                          </select>
                        </div>
                        <div className="d-inline-block input-box m-b-0">
                          <label>Statistic</label>
                          <select>
                            <option>Select</option>
                            <option>HRMS</option>
                            <option>Procurement</option>
                            <option>Supply chain</option>
                            <option>CMS</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="d-block panel-builder-code-form">
                      <div className="d-block w-100">
                        <div className="d-inline-block input-box">
                          <label>Element Type</label>
                          <input type="text" placeholder="EC2" />
                        </div>
                        <div className="d-inline-block input-box">
                          <label>Instance ID</label>
                          <input type="text" placeholder="6821ghhe" />
                        </div>
                        <div className="d-inline-block input-box">
                          <label>Log Group</label>
                          <input type="text" placeholder="/EC2/6821ghhe/logs" />
                        </div>
                      </div>
                      <div className="d-block w-100">
                        <div className="d-inline-block input-box w-100 m-b-0">
                          <input type="text" placeholder="" className="w-100" />
                        </div>
                      </div>
                    </div>
                    <div className="d-block panel-builder-code-form">
                      <div className="d-block w-100">
                        <div className="d-inline-block input-box">
                          <label>Element Type</label>
                          <input type="text" placeholder="EC2" />
                        </div>
                        <div className="d-inline-block input-box">
                          <label>Instance ID</label>
                          <input type="text" placeholder="6821ghhe" />
                        </div>
                        <div className="d-inline-block input-box">
                          <label>Trace Group</label>
                          <input type="text" placeholder="/EC2/6821ghhe/Trace" />
                        </div>
                      </div>
                      <div className="d-block w-100">
                        <div className="d-inline-block input-box w-100 m-b-0">
                          <input type="text" placeholder="" className="w-100" />
                        </div>
                      </div>
                    </div>
                    <div className="d-block panel-builder-code-form">
                      <div className="d-block w-100">
                        <div className="d-inline-block input-box">
                          <label>Element Type</label>
                          <input type="text" placeholder="EC2" />
                        </div>
                        <div className="d-inline-block input-box">
                          <label>Instance ID</label>
                          <input type="text" placeholder="6821ghhe" />
                        </div>
                        <div className="d-inline-block input-box">
                          <label>Method</label>
                          <select>
                            <option>getConfigData</option>
                            <option>getTopopogyData</option>
                            <option>getCostData</option>
                            <option>getLAData</option>
                            <option>getLAStats</option>
                          </select>
                        </div>
                      </div>
                      <div className="d-block w-100">
                        <div className="d-block heading-text">Parsing Option and Result Field</div>
                      </div>
                      <div className="d-block w-100">
                        <div className="d-inline-block input-box textarea-box">
                          <label>
                            Rows/Root - <em>Optional</em>
                          </label>
                          <textarea>Rows/Root Selector</textarea>
                          <label>
                            Advance Options - <em>Optional</em>
                          </label>
                          <div className="d-block options-check">
                            <span>Root returns object instead of array?</span>
                            <input type={'checkbox'} className="checkbox" />
                          </div>
                          <div className="d-block options-check">
                            <span>Is data in columnar format ?</span>
                            <input type={'checkbox'} className="checkbox" />
                          </div>
                        </div>
                        <div className="d-inline-block input-box add-column">
                          <label>
                            Column - <em>Optional</em>
                          </label>
                          <div className="d-block w-100 add-column-selector">
                            <span>Selector</span>
                            <input type={'text'} />
                            <span>as</span>
                            <input type={'text'} className="selector-input" />
                            <span>Fromat as</span>
                            <input type={'text'} className="selector-input" />
                          </div>
                          <div className="d-block w-100">
                            <button className="btn add-column-btn">
                              <i class="fas fa-plus"></i> Column
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12">
                  <div className="d-block panel-right">
                    <div className="d-inline-flex buttons">
                      <button className="panel-gray-button min-width-inherit">Panel</button>
                      <button className="panel-gray-button min-width-inherit">Field</button>
                      <button className="panel-gray-button min-width-inherit">Overrides</button>
                    </div>
                    <div className="d-block menus">
                      <ul>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Setting
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Visualisation
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Display
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Series overrides
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Axes
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Legend
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Treshholds
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Time region
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Links
                        </li>
                        <li>
                          <i class="fas fa-chevron-right"></i>
                          Repeat options
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DashboardPanelMetricBuilder;
