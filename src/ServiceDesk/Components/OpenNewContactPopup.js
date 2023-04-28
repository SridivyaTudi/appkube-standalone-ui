import React from "react";
import { Modal, ModalBody } from "reactstrap";
import CustomTextbox from "./CustomTextbox";
import Customselectbox from "./Customselectbox";
import config from "../../config";
import { RestService } from "../../Services/RestService";
import AlertMessage from "./AlertMessage";
import axios from "axios";

class MySelectObj {
  id;
  name;
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class OpenNewContactPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      fullName: "",
      title: "",
      email: "",
      alternateEmail: "",
      workPhone: "",
      mobilePhone: "",
      twitter: "",
      uniqueExternalId: "",
      companyId: null,
      isSubmitted: false,
      companyList: [],
      companyLogo: null,
      companyLogoUrl: null,
      companyName: "",
      description: "",
      notes: "",
      domain: "",
      healthScore: "",
      accountTier: "",
      renewalDate: "",
      industry: "",
      orgCompanyList: [],
      oldCompanyFlag: true,
      newCompanyFlag: false,
      contactPhoto: null,
      contactPhotoUrl: null,
      isAlertOpen: false,
      message: null,
      severity: null,
    };
  }

  async componentDidMount() {
    try {
      await RestService.getData(config.GET_ALL_COMPANIES_URL, null, null).then(
        (response) => {
          let ary = [];
          let obj = new MySelectObj("", "Select Company");
          ary.push(obj);
          for (let i = 0; i < response.length; i++) {
            obj = new MySelectObj(response[i].id, response[i].companyName);
            ary.push(obj);
          }
          this.setState({
            companyList: ary,
            orgCompanyList: response,
          });
        }
      );
    } catch (err) {
      console.log("Loading company data failed. Error: ", err);
    }
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    console.log("Error Data : ", errorData);
    if (
      errorData.companyLogo.isValid &&
      errorData.contactPhoto.isValid &&
      errorData.fullName.isValid &&
      errorData.title.isValid &&
      errorData.companyId.isValid &&
      errorData.companyLogo.isValid &&
      errorData.companyName.isValid &&
      errorData.description.isValid &&
      errorData.notes.isValid &&
      errorData.healthScore.isValid &&
      errorData.domain.isValid &&
      errorData.accountTier.isValid &&
      errorData.renewalDate.isValid &&
      errorData.industry.isValid &&
      errorData.email.isValid
    ) {
      const {
        newCompanyFlag,
        oldCompanyFlag,
        contactPhoto,
        fullName,
        title,
        email,
        alternateEmail,
        workPhone,
        mobilePhone,
        twitter,
        uniqueExternalId,
        companyId,
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
        contactPhoto,
        fullName,
        title,
        email,
        alternateEmail,
        workPhone,
        mobilePhone,
        twitter,
        uniqueExternalId,
        companyId,
        companyLogo,
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
      formData.append("contactPhoto", contactPhoto);
      formData.append("fullName", fullName);
      formData.append("title", title);
      formData.append("primaryEmail", email);
      formData.append("alternateEmail", alternateEmail);
      formData.append("workPhone", workPhone);
      formData.append("healthScore", healthScore);
      formData.append("mobilePhone", mobilePhone);
      formData.append("twitterHandle", twitter);
      formData.append("uniqueExternalId", uniqueExternalId);
      if (oldCompanyFlag) {
        formData.append("companyId", companyId);
      }
      if (newCompanyFlag) {
        formData.append("companyId", "-1");
      }
      formData.append("logo", companyLogo);
      formData.append("companyName", companyName);
      formData.append("description", description);
      formData.append("notes", notes);
      formData.append("domain", domain);
      formData.append("healthScore", healthScore);
      formData.append("accountTier", accountTier);
      formData.append("renewalDate", renewalDate);
      formData.append("industry", industry);
      axios
        .post(config.ADD_CONTACT_URL, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data != null) {
            this.setState({
              severity: config.SEVERITY_SUCCESS,
              message: config.CONTACT_ADDED_SUCCESS,
              isAlertOpen: true,
            });
          } else {
            this.setState({
              severity: config.SEVERITY_ERROR,
              message: config.CONTACT_ADDED_ERROR,
              isAlertOpen: true,
            });
          }
          console.log("response data", response.data);
        })
        .catch((err) => console.log(err));
    }
  };

  validate = (isSubmitted) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const retData = {
      fullName: validObj,
      title: validObj,
      email: validObj,
      alternateEmail: validObj,
      workPhone: validObj,
      mobilePhone: validObj,
      twitter: validObj,
      uniqueExternalId: validObj,
      companyId: validObj,
      companyName: validObj,
      description: validObj,
      notes: validObj,
      domain: validObj,
      healthScore: validObj,
      accountTier: validObj,
      renewalDate: validObj,
      industry: validObj,
      companyLogo: validObj,
      contactPhoto: validObj,
    };
    if (isSubmitted) {
      const {
        newCompanyFlag,
        oldCompanyFlag,
        contactPhoto,
        fullName,
        title,
        email,
        companyId,
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
      if (!contactPhoto) {
        retData.contactPhoto = {
          isValid: false,
          message: "Photo is required",
        };
      }
      if (!fullName) {
        retData.fullName = {
          isValid: false,
          message: "full Name is required",
        };
      }
      if (!title) {
        retData.title = {
          isValid: false,
          message: "Title is required",
        };
      }
      if (!email) {
        retData.email = {
          isValid: false,
          message: "Email is mandatory*",
        };
      }
      if (oldCompanyFlag) {
        if (!companyId) {
          retData.companyId = {
            isValid: false,
            message: "companyId name is required",
          };
        }
      }

      if (newCompanyFlag) {
        if (!companyLogo) {
          retData.companyLogo = {
            isValid: false,
            message: "Company Logo is required",
          };
        }
      }

      if (!companyName) {
        retData.companyName = {
          isValid: false,
          message: "Company Name is required",
        };
      }
      if (!description) {
        retData.description = {
          isValid: false,
          message: "Description is required",
        };
      }
      if (!notes) {
        retData.notes = {
          isValid: false,
          message: "Notes is required",
        };
      }
      if (!domain) {
        retData.domain = {
          isValid: false,
          message: "Domain is required",
        };
      }
      if (!healthScore) {
        retData.healthScore = {
          isValid: false,
          message: "Health Care is required",
        };
      }
      if (!accountTier) {
        retData.accountTier = {
          isValid: false,
          message: "Account Tier Name is required",
        };
      }
      if (!renewalDate) {
        retData.renewalDate = {
          isValid: false,
          message: "Renewal Date is required",
        };
      }
      if (!industry) {
        retData.industry = {
          isValid: false,
          message: "Industry Name is required",
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

  handleSelectBox = (e) => {
    const { orgCompanyList } = this.state;
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    console.log("company org list : ", orgCompanyList);
    for (let i = 0; i < orgCompanyList.length; i++) {
      let obj = orgCompanyList[i];
      if (parseInt(value) === obj.id) {
        this.setState({
          companyName: obj.companyName,
          description: obj.description,
          notes: obj.notes,
          healthScore: obj.healthScore,
          accountTier: obj.accountTier,
          renewalDate: obj.renewalDate,
          industry: obj.industry,
          domain: obj.domain,
        });
        break;
      }
    }
  };

  addNewCompany = () => {
    this.setState({
      oldCompanyFlag: false,
      newCompanyFlag: true,
    });
  };

  handleImageChange = (e) => {
    this.setState({
      [e.target.name + "Url"]: URL.createObjectURL(e.target.files[0]),
    });
    this.setState({
      [e.target.name]: e.target.files[0],
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
      isSubmitted,
      companyList,
      contactPhotoUrl,
      fullName,
      title,
      email,
      alternateEmail,
      workPhone,
      mobilePhone,
      twitter,
      uniqueExternalId,
      companyId,
      companyName,
      description,
      notes,
      domain,
      healthScore,
      accountTier,
      renewalDate,
      industry,
      oldCompanyFlag,
      newCompanyFlag,
    } = this.state;
    const state = this.state;
    const errorData = this.validate(isSubmitted);
    return (
      <Modal
        isOpen={modal}
        toggle={this.toggle}
        className="modal-container servicdesk-modal-container"
      >
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={state.isAlertOpen}
          severity={state.severity}
          msg={state.message}
        ></AlertMessage>
        <button className="close-btn" onClick={this.handleClose}>
          <i class="fal fa-times"></i>
        </button>
        <ModalBody
          style={{
            height: "calc(75vh - 50px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="d-block width-100 contact-popup-container">
            <div className="d-block p-b-20 heading">
              <div className="d-block width-100">
                <h4 className="d-block">
                  <i className="fa fa-user"></i> New Contact
                </h4>
                <span className="d-block">
                  When someone reaches out to you, they become a contact in your
                  account. You can create companies and associate contacts with
                  them. <a href="#">Learn more.</a>
                </span>
              </div>
            </div>
            <div className="d-block width-100 upload-photo">
              <div className="d-inline-block upload-icon">
                <i className="fa fa-user"></i>
              </div>
              <div className="d-inline-block v-a-top">
                <strong className="d-block">Upload Photo</strong>
                <input
                  type="file"
                  id="contactPhoto"
                  className="contactPhoto"
                  name="contactPhoto"
                  onChange={this.handleImageChange}
                />
                <p className="d-block">
                  An image of the person, it's best if it has the same length
                  and height
                </p>
                <span style={{ color: "red" }}>
                  {errorData.contactPhoto.message}
                </span>
                <img src={contactPhotoUrl} alt="" width="100" height="100" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name*</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="fullName"
                    id="fullName"
                    placeholder="Enter the name of this person"
                    name="fullName"
                    value={fullName}
                    onChange={this.handleStateChange}
                    isValid={errorData.fullName.isValid}
                    message={errorData.fullName.message}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    htmlFor="title"
                    id="title"
                    placeholder="Enter a title"
                    name="title"
                    value={title}
                    onChange={this.handleStateChange}
                    isValid={errorData.title.isValid}
                    message={errorData.title.message}
                  />
                </div>
              </div>
            </div>
            <div className="atleast-fields-box">
              <h3>Atleast one of these fields is mandatory*</h3>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <CustomTextbox
                      containerClass="form-group-inner"
                      inputClass="form-control"
                      htmlFor="email"
                      id="email"
                      placeholder="Enter a phone email address"
                      name="email"
                      value={email}
                      onChange={this.handleStateChange}
                    />
                    <span style={{ color: "red" }}>
                      {errorData.email.message}
                    </span>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="alternateEmail">Alternate Email</label>
                    <CustomTextbox
                      containerClass="form-group-inner"
                      inputClass="form-control"
                      htmlFor="alternateEmail"
                      id="alternateEmail"
                      placeholder="Enter a email address"
                      name="alternateEmail"
                      value={alternateEmail}
                      onChange={this.handleStateChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="workPhone">Work Phone</label>
                    <CustomTextbox
                      containerClass="form-group-inner"
                      inputClass="form-control"
                      htmlFor="workPhone"
                      id="workPhone"
                      placeholder="Enter a phone number"
                      name="workPhone"
                      value={workPhone}
                      onChange={this.handleStateChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="mobilePhone">Mobile Phone</label>
                    <CustomTextbox
                      containerClass="form-group-inner"
                      inputClass="form-control"
                      htmlFor="mobilePhone"
                      id="mobilePhone"
                      placeholder="Enter a phone number"
                      name="mobilePhone"
                      value={mobilePhone}
                      onChange={this.handleStateChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="twitter">Twitter</label>
                    <CustomTextbox
                      containerClass="form-group-inner"
                      inputClass="form-control"
                      htmlFor="twitter"
                      id="twitter"
                      placeholder="Enter a Twitter ID"
                      name="twitter"
                      value={twitter}
                      onChange={this.handleStateChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="uniqueExternalId">Unique external Id</label>
                    <CustomTextbox
                      containerClass="form-group-inner"
                      inputClass="form-control"
                      htmlFor="uniqueExternalId"
                      id="uniqueExternalId"
                      placeholder="Enter the contact’s unique ID"
                      name="uniqueExternalId"
                      value={uniqueExternalId}
                      onChange={this.handleStateChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {oldCompanyFlag == true && (
              <div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <Customselectbox
                        containerClass="form-group-inner"
                        inputClass="form-control"
                        htmlFor="company"
                        id="companyId"
                        name="companyId"
                        value={companyId}
                        arrayData={companyList}
                        onChange={this.handleSelectBox}
                        isValid={errorData.companyId.isValid}
                        message={errorData.companyId.message}
                      />
                      <div className="d-block text-right p-t-5">
                        <button
                          className="add-conatct"
                          onClick={this.addNewCompany}
                        >
                          Add a Company
                        </button>
                      </div>
                    </div>
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
                        name="company2"
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
              </div>
            )}
            {newCompanyFlag == true && (
              <div className="d-block width-100 contact-popup-container">
                <div className="d-block width-100 p-b-20 heading">
                  <h4 className="d-block">
                    <i className="fa fa-building"></i> New Company
                  </h4>
                  <span className="d-block">
                    When someone reaches out to you, they become a contact in
                    your account. You can create companies and associate
                    contacts with them. <a href="#">Learn more.</a>
                  </span>
                </div>
                <div className="d-block width-100 p-t-10 p-b-10 upload-photo">
                  <div className="d-inline-block upload-icon">
                    <i className="fa fa-building"></i>
                  </div>
                  <div className="d-inline-block v-a-top">
                    <strong className="d-block">Upload Logo</strong>
                    <input
                      type="file"
                      id="companyLogo"
                      name="companyLogo"
                      className="contactPhoto"
                      onChange={this.handleImageChange}
                    />
                    <p className="d-block">
                      An image of the person, it's best if it has the same
                      length and height
                    </p>
                    <span style={{ color: "red" }}>
                      {errorData.companyLogo.message}
                    </span>
                    <img
                      src={this.state.companyLogoUrl}
                      alt=""
                      width="100"
                      height="100"
                    />
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
                        id="domian"
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
              </div>
            )}
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

export default OpenNewContactPopup;
