import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import CustomTextbox from './CustomTextbox';
// import axios from 'axios';
// import { config } from '../config';
import AlertMessage from './AlertMessage';

class OpenNewCompanyPopup extends Component {
  steps;
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      companyLogo: null,
      companyName: '',
      description: '',
      notes: '',
      domain: '',
      healthScore: '',
      accountTier: '',
      renewalDate: '',
      industry: '',
      isSubmitted: false,
      isAlertOpen: false,
      message: null,
      severity: null,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    if (
      errorData.companyName.isValid &&
      errorData.description.isValid &&
      errorData.notes.isValid &&
      errorData.healthScore.isValid &&
      errorData.domain.isValid &&
      errorData.accountTier.isValid &&
      errorData.renewalDate.isValid &&
      errorData.industry.isValid
    ) {
      const {
        companyLogo,
        companyName,
        description,
        notes,
        domain,
        healthScore,
        accountTier,
        renewalDate,
        industry,
      } = this.state;
      const sendData = {
        companyName,
        description,
        notes,
        domain,
        healthScore,
        accountTier,
        renewalDate,
        industry,
      };
      console.log(sendData);

      let formData = new FormData();
      formData.append('logo', companyLogo);
      formData.append('companyName', companyName);
      formData.append('description', description);
      formData.append('notes', notes);
      formData.append('domain', domain);
      formData.append('healthScore', healthScore);
      formData.append('accountTier', accountTier);
      formData.append('renewalDate', renewalDate);
      formData.append('industry', industry);
      // const data = {
      //     "logo": companyLogo,
      //     "companyName": companyName,
      //     "description": description,
      //     "notes": notes,
      //     "domain": domain,
      //     "healthScore": healthScore,
      //     "accountTier": accountTier,
      //     "renewalDate": renewalDate,
      //     "industry": industry,
      // }
      // axios
      //   .post(config.ADD_COMPANY_URL, formData, {
      //     headers: {
      //       'content-type': 'multipart/form-data',
      //     },
      //   })
      //   .then((response) => {
      //     if (response.data != null) {
      //       this.setState({
      //         severity: config.SEVERITY_SUCCESS,
      //         message: config.COMPANY_ADDED_SUCCESS,
      //         isAlertOpen: true,
      //       });
      //     } else {
      //       this.setState({
      //         severity: config.SEVERITY_ERROR,
      //         message: config.COMPANY_ADDED_ERROR,
      //         isAlertOpen: true,
      //       });
      //     }
      //     console.log('response data', response.data);
      //   })
      //   .catch((err) => console.log(err));
    }
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: '',
    };
    const retData = {
      companyName: validObj,
      description: validObj,
      notes: validObj,
      domain: validObj,
      healthScore: validObj,
      accountTier: validObj,
      renewalDate: validObj,
      industry: validObj,
      companyLogo: validObj,
    };
    if (isSubmitted) {
      const { companyName, description, notes, domain, healthScore, accountTier, renewalDate, industry } = this.state;
      // if (!companyLogo) {
      //     retData.companyLogo = {
      //         isValid: false,
      //         message: "Company Logo is required"
      //     };
      // }
      if (!companyName) {
        retData.companyName = {
          isValid: false,
          message: 'Company Name is required',
        };
      }
      if (!description) {
        retData.description = {
          isValid: false,
          message: 'Description is required',
        };
      }
      if (!notes) {
        retData.notes = {
          isValid: false,
          message: 'Notes is required',
        };
      }
      if (!domain) {
        retData.domain = {
          isValid: false,
          message: 'domain is required',
        };
      }
      if (!healthScore) {
        retData.healthScore = {
          isValid: false,
          message: 'Health Care is required',
        };
      }
      if (!accountTier) {
        retData.accountTier = {
          isValid: false,
          message: 'Account Tier Name is required',
        };
      }
      if (!renewalDate) {
        retData.renewalDate = {
          isValid: false,
          message: 'Renewal Date is required',
        };
      }
      if (!industry) {
        retData.industry = {
          isValid: false,
          message: 'Industry Name is required',
        };
      }
    }
    return retData;
  };

  handleStateChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleImageChange = (e) => {
    console.log('file=', e.target.files[0]);
    this.setState({
      companyLogo: URL.createObjectURL(e.target.files[0]),
    });
  };
  handleCloseAlert = (e) => {
    this.setState({
      isAlertOpen: false,
    });
  };

  render() {
    const {
      modal,
      companyLogo,
      companyName,
      description,
      notes,
      domain,
      healthScore,
      accountTier,
      renewalDate,
      industry,
      isSubmitted,
    } = this.state;
    const errorData = this.validate(isSubmitted);
    const state = this.state;
    return (
      <Modal isOpen={modal} toggle={this.toggle} className="modal-container servicdesk-modal-container">
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={state.isAlertOpen}
          severity={state.severity}
          msg={state.message}
        ></AlertMessage>
        <button className="close-btn" onClick={this.handleClose}>
          X
        </button>
        <ModalBody style={{ height: 'calc(75vh - 50px)', overflowY: 'auto', overflowX: 'hidden' }}>
          <div className="d-block width-100 contact-popup-container">
            <div className="d-block p-b-20 heading">
              <div className="d-block width-100">
                <h4 className="d-block">
                  <i className="fa fa-building"></i> New Company
                </h4>
                <span className="d-block">
                  When someone reaches out to you, they become a contact in your account. You can create companies and
                  associate contacts with them. <a href="#">Learn more.</a>
                </span>
              </div>
            </div>
            <div className="d-block width-100 upload-photo">
              <div className="d-inline-block upload-icon">
                <i className="fa fa-building"></i>
              </div>
              <div className="d-inline-block v-a-top">
                <strong className="d-block">Upload Logo</strong>
                <input
                  type="file"
                  id="companyLogo"
                  name="companyLogo"
                  className="companyLogo"
                  onChange={this.handleImageChange}
                />
                <p className="d-block">An image of the person, it's best if it has the same length and height</p>
                <span style={{ color: 'red' }}>{errorData.companyLogo.message}</span>
                <img src={companyLogo} />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name*</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="companyName"
                    id="companyName"
                    placeholder=""
                    name="companyName"
                    value={companyName}
                    onChange={this.handleStateChange}
                    isValid={errorData.companyName.isValid}
                    message={errorData.companyName.message}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="description"
                    id="description"
                    placeholder="Write something that describe this company"
                    name="description"
                    value={description}
                    onChange={this.handleStateChange}
                    isValid={errorData.description.isValid}
                    message={errorData.description.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="notes">Notes</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="notes"
                    id="notes"
                    placeholder="Add notes about this company - make something about a recent deal, etc."
                    name="notes"
                    value={notes}
                    onChange={this.handleStateChange}
                    isValid={errorData.notes.isValid}
                    message={errorData.notes.message}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="company">Domains of Company</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="domain"
                    id="domain"
                    placeholder="eg: My company1.com, mycompany2.com"
                    name="domain"
                    value={domain}
                    onChange={this.handleStateChange}
                    isValid={errorData.domain.isValid}
                    message={errorData.domain.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="healthCare">Health Score</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="healthCare"
                    id="healthCare"
                    placeholder="Any"
                    name="healthScore"
                    value={healthScore}
                    onChange={this.handleStateChange}
                    isValid={errorData.healthScore.isValid}
                    message={errorData.healthScore.message}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="accountTier">Account tier</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="accountTier"
                    id="accountTier"
                    placeholder="Any"
                    name="accountTier"
                    value={accountTier}
                    onChange={this.handleStateChange}
                    isValid={errorData.accountTier.isValid}
                    message={errorData.accountTier.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="renewalDate">Renewal Date</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    type="date"
                    inputClass="form-control"
                    htmlFor="renewalDate"
                    id="renewalDate"
                    placeholder="Any"
                    name="renewalDate"
                    value={renewalDate}
                    onChange={this.handleStateChange}
                    isValid={errorData.renewalDate.isValid}
                    message={errorData.renewalDate.message}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="industry">Industry</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="industry"
                    id="industry"
                    placeholder="Any"
                    name="industry"
                    value={industry}
                    onChange={this.handleStateChange}
                    isValid={errorData.industry.isValid}
                    message={errorData.industry.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="d-block text-center p-t-20 contact-popup-buttons">
                  <button className="cancel" onClick={this.handleClose}>
                    Cancel
                  </button>
                  <button className="save" onClick={this.handleSubmit}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
export default OpenNewCompanyPopup;