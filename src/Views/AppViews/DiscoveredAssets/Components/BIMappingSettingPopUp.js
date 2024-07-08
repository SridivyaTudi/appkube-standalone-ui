import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Grid,
  List,
  ListItem,
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material/";
import { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import {
  PRODUCT_CATEGORY_ENUM,
  DEPLOYMENT_ENVS,
  SERVICES_CATEGORY_OF_THREE_TIER_ENUM,
  SERVICES_CATEGORY_OF_SOA_ENUM,
} from "Utils";
import { v4 } from "uuid";
import { SERVICE_TYPE } from "CommonData";

const PRODUCT_TYPES_DATA = [
  {
    label: PRODUCT_CATEGORY_ENUM.THREE_TIER,
    value: PRODUCT_CATEGORY_ENUM.THREE_TIER,
  },
  {
    label: PRODUCT_CATEGORY_ENUM.SOA,
    value: PRODUCT_CATEGORY_ENUM.SOA,
  },
  {
    label: PRODUCT_CATEGORY_ENUM.LAMBDA,
    value: PRODUCT_CATEGORY_ENUM.LAMBDA,
  },
];

const DEPLOYMENT_ENVS_DATA = [
  {
    label: DEPLOYMENT_ENVS.DEVELOPMENT,
    value: DEPLOYMENT_ENVS.DEVELOPMENT,
  },
  {
    label: DEPLOYMENT_ENVS.TEST,
    value: DEPLOYMENT_ENVS.TEST,
  },
  {
    label: DEPLOYMENT_ENVS.STAGE,
    value: DEPLOYMENT_ENVS.STAGE,
  },
  {
    label: DEPLOYMENT_ENVS.PRODUCTION,
    value: DEPLOYMENT_ENVS.PRODUCTION,
  },
];

const THREE_TIER_SERVICE_CATEGORIES = [
  {
    label: SERVICES_CATEGORY_OF_THREE_TIER_ENUM.WEB,
    value: SERVICES_CATEGORY_OF_THREE_TIER_ENUM.THREE_TIER,
  },
  {
    label: SERVICES_CATEGORY_OF_THREE_TIER_ENUM.APP,
    value: SERVICES_CATEGORY_OF_THREE_TIER_ENUM.APP,
  },
  {
    label: SERVICES_CATEGORY_OF_THREE_TIER_ENUM.DATA,
    value: SERVICES_CATEGORY_OF_THREE_TIER_ENUM.DATA,
  },
  {
    label: SERVICES_CATEGORY_OF_THREE_TIER_ENUM.AUX,
    value: SERVICES_CATEGORY_OF_THREE_TIER_ENUM.AUX,
  },
];

const SOA_SERVICE_CATEGORIES = [
  {
    label: SERVICES_CATEGORY_OF_SOA_ENUM.APP,
    value: SERVICES_CATEGORY_OF_SOA_ENUM.APP,
  },
  {
    label: SERVICES_CATEGORY_OF_SOA_ENUM.DATA,
    value: SERVICES_CATEGORY_OF_SOA_ENUM.DATA,
  },
  {
    label: SERVICES_CATEGORY_OF_SOA_ENUM.OTHER,
    value: SERVICES_CATEGORY_OF_SOA_ENUM.OTHER,
  },
];
const SERVICE_NATURES = [
  {
    label: SERVICE_TYPE.BUSINESS,
    value: SERVICE_TYPE.BUSINESS,
  },
  {
    label: SERVICE_TYPE.COMMON,
    value: SERVICE_TYPE.COMMON,
  },
];
class BIMappingSettingPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        template: "",
        productType: "",
        productName: "",
        moduleName: "",
        serviceNature: "",
        deploymentEnv: "",
        serviceType: "",
        serviceName: "",
      },
    };
  }

  handleInputChange = (e) => {
    let { formData } = this.state;
    const { name, value } = e.target;
    formData[name] = value;
    this.setState({ formData });
  };

  renderData = (data) => {
    if (data.length) {
      return data.map((item) => (
        <MenuItem value={item.value} key={v4()} className="select-menu">
          {item.label}
        </MenuItem>
      ));
    }
  };
  render() {
    const { formData } = this.state;
    let errors = {};
    return (
      <Modal
        isOpen={this.props.showModal}
        toggle={this.props.togglePopup}
        className="bimapping-setting-modal-container"
      >
        <ModalHeader tag="div">
          <h5>
            BI-Mapping Setting{" "}
            <IconButton
              onClick={this.props.togglePopup}
              variant="outlined"
              aria-label="delete"
              size="small"
              className="close-btn"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </h5>
        </ModalHeader>
        <ModalBody>
          <Box className="form-inner-content">
            <form onSubmit={this.handleRoleSubmit} >
              <Box className="form-group">
                <label htmlFor="template" className="form-label">
                  Template
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="template"
                  name="template"
                  placeholder="Director"
                  value={formData.template}
                  onChange={this.handleInputChange}
                  autoFocus={"autoFocus"}
                />
                {errors.name ? (
                  <span className="red">{errors.name}</span>
                ) : (
                  <></>
                )}
              </Box>
              <Box className=" form-group ">
                <label htmlFor="roleDescription" className="form-label">
                  Product Type
                </label>
                <FormControl className="select-policy">
                  <Select
                    value={formData.productType}
                    displayEmpty
                    name="productType"
                    onChange={(e) => this.handleInputChange(e)}
                  >
                    <MenuItem
                      value=""
                      style={{ fontSize: 14, color: "383874" }}
                      disabled
                    >
                      Select product type
                    </MenuItem>

                    {this.renderData(PRODUCT_TYPES_DATA)}
                  </Select>
                </FormControl>
                {errors.productType ? (
                  <span className="red">{errors.productType}</span>
                ) : (
                  <></>
                )}
              </Box>
              <Box className="form-group">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  name="productName"
                  placeholder="Director"
                  value={formData.productName}
                  onChange={this.handleInputChange}
                  autoFocus={"autoFocus"}
                />
                {errors.productName ? (
                  <span className="red">{errors.productName}</span>
                ) : (
                  <></>
                )}
              </Box>
              <Box className=" form-group ">
                <label htmlFor="roleDescription" className="form-label">
                  Deployment env
                </label>
                <FormControl className="select-policy">
                  <Select
                    value={formData.deploymentEnv}
                    displayEmpty
                    name="deploymentEnv"
                    onChange={(e) => this.handleInputChange(e)}
                  >
                    <MenuItem
                      value=""
                      style={{ fontSize: 14, color: "383874" }}
                      disabled
                    >
                      Select deployment env
                    </MenuItem>

                    {this.renderData(DEPLOYMENT_ENVS_DATA)}
                  </Select>
                </FormControl>
                {errors.deplomentEnv ? (
                  <span className="red">{errors.deplomentEnv}</span>
                ) : (
                  <></>
                )}
              </Box>

              {[
                PRODUCT_CATEGORY_ENUM.THREE_TIER,
                PRODUCT_CATEGORY_ENUM.SOA,
              ].includes(formData.productType) ? (
                <>
                  {formData.productType === PRODUCT_CATEGORY_ENUM.SOA ? (
                    <>
                      <Box className="form-group">
                        <label htmlFor="moduleName" className="form-label">
                          Module Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="moduleName"
                          name="moduleName"
                          placeholder="service Name"
                          value={formData.moduleName}
                          onChange={this.handleInputChange}
                          autoFocus={"autoFocus"}
                        />
                        {errors.moduleName ? (
                          <span className="red">{errors.moduleName}</span>
                        ) : (
                          <></>
                        )}
                      </Box>
                      <Box className="form-group">
                        <label htmlFor="serviceNature" className="form-label">
                          Service Nature
                        </label>
                        <FormControl className="select-policy">
                          <Select
                            value={formData.serviceNature}
                            displayEmpty
                            name="serviceNature"
                            onChange={(e) => this.handleInputChange(e)}
                          >
                            <MenuItem
                              value=""
                              style={{ fontSize: 14, color: "383874" }}
                              disabled
                            >
                              Select Service Nature
                            </MenuItem>

                            {this.renderData(SERVICE_NATURES)}
                          </Select>
                        </FormControl>
                        {errors.serviceNature ? (
                          <span className="red">{errors.serviceNature}</span>
                        ) : (
                          <></>
                        )}
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}

                  <Box className=" form-group ">
                    <label htmlFor="serviceType" className="form-label">
                      Service Type
                    </label>
                    <FormControl className="select-policy">
                      <Select
                        value={formData.serviceType}
                        displayEmpty
                        name="serviceType"
                        onChange={(e) => this.handleInputChange(e)}
                      >
                        <MenuItem
                          value=""
                          style={{ fontSize: 14, color: "383874" }}
                          disabled
                        >
                          Select Service Type
                        </MenuItem>

                        {this.renderData(
                          formData.productType ===
                            PRODUCT_CATEGORY_ENUM.THREE_TIER
                            ? THREE_TIER_SERVICE_CATEGORIES
                            : SOA_SERVICE_CATEGORIES
                        )}
                      </Select>
                    </FormControl>
                    {errors.serviceType ? (
                      <span className="red">{errors.serviceType}</span>
                    ) : (
                      <></>
                    )}
                  </Box>
                  <Box className="form-group">
                    <label htmlFor="serviceName" className="form-label">
                      Service Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="serviceName"
                      name="serviceName"
                      placeholder="service Name"
                      value={formData.serviceName}
                      onChange={this.handleInputChange}
                      autoFocus={"autoFocus"}
                    />
                    {errors.serviceName ? (
                      <span className="red">{errors.serviceName}</span>
                    ) : (
                      <></>
                    )}
                  </Box>
                </>
              ) : (
                <></>
              )}
            </form>
          </Box>

          <ModalFooter className="footer-top-br">
            <Box className="d-block text-right">
              <LoadingButton
                className="danger-btn min-width-inherit m-r-2"
                variant="outlined"
                onClick={this.props.togglePopup}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                className="primary-btn min-width"
                variant="contained"
                //   disabled={createOrUpdateStatus}
                //   loading={createOrUpdateStatus}
                onClick={this.props.togglePopup}
              >
                Submit
              </LoadingButton>
            </Box>
          </ModalFooter>
        </ModalBody>
      </Modal>
    );
  }
}

export default BIMappingSettingPopUp;
