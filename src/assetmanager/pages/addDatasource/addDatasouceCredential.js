import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Microsoftazure from "../../../assets/img/assetmanager/microsoftazure.png";

class AddDatasouceCredential extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCredForm: false,
      credentialData: {},
    };
  }
  addDataSourceCred = () => {
    this.setState({
      addCredForm: true,
      addcredpopup: false,
    });
  };
  toggle = () => {
    const { addcredpopup } = this.state;
    this.setState({
      addcredpopup: !addcredpopup,
    });
  };
  render() {
    const { addcredpopup, addCredForm, credentialData } = this.state;
    return (
      <div className="add-data-source-container">
        <div className="add-data-source-page-container">
          <div className="data-source-section">
            <div className="source-head">
              <h3>inputs</h3>
              <div className="right-search-bar">
                <div className="back-btn">
                  <Link
                    to={`/assetmanager/pages/add-data-source`}
                    type="button"
                    className="btn btn-link"
                  >
                    <i className="far fa-arrow-alt-circle-left" />
                    Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="source-content">
              <div className="heading">
                <h4>Add inputs</h4>
                <div className="add-inputs-content">
                  <div className="form-group description-content">
                    <label htmlFor="Name">Name</label>
                    <input
                      className="input-group-text"
                      name="name"
                      //value={addedDatasourceResponse.name}
                      onChange={this.handleStateChange}
                    />
                  </div>
                </div>
              </div>
              <div className="account-details-heading">
                <h5>Account Details</h5>
              </div>
              <div className="environgment-details">
                <div className="form-group description-content">
                  <label htmlFor="description">Select Environment</label>
                  <input
                    className="input-group-text"
                    readOnly
                    //value={environment}
                  />
                </div>
                <div className="form-group description-content">
                  <label htmlFor="description">Select Account</label>
                  <input
                    className="input-group-text"
                    readOnly
                    //value={account}
                  />
                </div>
              </div>
              <div className="source-details">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="source-box">
                      <div className="source-detail-content">
                        <div className="images">
                          <img
                            src={Microsoftazure}
                            height="50px"
                            width="50px"
                            alt=""
                          />
                        </div>
                        <div className="source-content">
                          <label>Azure-PullMetric-Api</label>
                          <span>datasource</span>
                          <p>Pull Azure metrics with Cloud API</p>
                        </div>
                      </div>
                      <div className="source-massage-content">
                        {!addCredForm && (
                          <span>
                            Please click on the button to add credential using
                            vault
                          </span>
                        )}
                        {!addCredForm && (
                          <button
                            className="asset-blue-button"
                            onClick={this.toggle}
                          >
                            Add Credential
                          </button>
                        )}
                        {addCredForm && (
                          <div className="environgment-details">
                            <h5>Connection Detail</h5>
                            <div className="form-group description-content">
                              <label htmlFor="description">vault Key Id</label>
                              <input
                                type="text"
                                className="input-group-text"
                                name="accesskey"
                                value={credentialData.vaultId}
                                readOnly
                                onChange={this.onChangeDataSource}
                              />
                            </div>
                            {/* <div className="form-group description-content">
                                    <label htmlFor="description">Secret Key Id</label>
                                    <input
                                        type="password"
                                        className="input-group-text"
                                        name="secretkey"
                                        value={credentialData.secretKey}
                                        readOnly
                                        placeholder="configured"
                                        onChange={this.onChangeDataSource}
                                    />
                                </div> */}
                          </div>
                        )}
                        {addCredForm && (
                          <React.Fragment>
                            <button
                              className="asset-blue-button"
                              onClick={this.toggle}
                            >
                              Back
                            </button>
                            <Link to={`/assetmanager/pages/add-data-source/exploreDataSourceDetail`}>
                              <button className="asset-blue-button">
                                Explore
                              </button>
                            </Link>
                            <button
                              className="asset-blue-button"
                              onClick={this.editDataSource}
                            >
                              Save &#38; Test
                            </button>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={addcredpopup}
          toggle={this.toggle}
          className="modal-container assetmanager-modal-container"
        >
          <ModalHeader toggle={this.toggle}>Synectiks Vault</ModalHeader>
          <ModalBody
            style={{
              height: "calc(60vh - 50px)",
              overflowY: "auto",
              display: "grid",
              overflowX: "hidden",
            }}
          >
            <div className="syneckit-content">
              <div className="heading">
                <p>
                  Showing Credentials for Account &#8758;
                  <span>AZURE (null)</span>
                </p>
              </div>
            </div>
            <div className="modal-submit-button">
              <button
                className="asset-blue-button"
                onClick={this.addDataSourceCred}
              >
                Proceed
              </button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddDatasouceCredential;
