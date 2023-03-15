import React, {Component} from "react";
class FormkiqHelper {
  formkiqClient;
  constructor(formkiqUrl, formkiqUserName, formkiqPassword, cb) {
    this.formkiqClient = new window.exports.FormkiqClient(formkiqUrl, '', '', {
      onFormSubmitted: (formName) => {},
      onFormCompleted: (formName, response) => {
        cb(response);
      },
    });
    this.formkiqClient.login(formkiqUserName, formkiqPassword);
  }

  handleUploadForm(formData) {
    this.formkiqClient.webFormsHandler.submitFormkiqForm(formData);
  }

  getUploadedDocument(docId, cb) {
    this.formkiqClient.documentsApi.getDocumentUrl(docId).then((response) => {
      cb(response);
    });
  }
}
export default FormkiqHelper;
