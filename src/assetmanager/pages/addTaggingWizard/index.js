import React, { Component } from "react";
import { Collapse } from "reactstrap";
//import { config } from "../../config";

export class AddTaggingWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionArray: [
        {
          name: "Synectiks",
          type: "Installed",
          messages: "71",
          openCollectionStatus: false,
          subCollectionData: [
            {
              subCollectionName: "Human Resource",
            },
            {
              subCollectionName: "IT Networking",
            },
            {
              subCollectionName: "Monitoring",
            },
            {
              subCollectionName: "Monitoring",
            },
            {
              subCollectionName: "Monitoring",
            },
            {
              subCollectionName: "Monitoring",
            },
          ],
        },
      ],
    };
  }
  createCollectionTable = () => {
    const retData = [];
    const { collectionArray } = this.state;
    const length = collectionArray.length;
    for (let i = 0; i < length; i++) {
      const collection = collectionArray[i];
      const subCollections = collection.subCollectionData;
      const subCollectionJSX = [];
      for (let j = 0; j < subCollections.length; j++) {
        const collectionsubData = subCollections[j];
        subCollectionJSX.push(
          <div className="tbody">
            <div className="tbody-td first">
              <div
                onClick={() => this.opensubCollection(i)}
                className="caret-right"
              ></div>
              
              {collectionsubData.subCollectionName}
            </div>
            {/* <div className="tbody-td">
              {collectionsubData.subCollectionType}
            </div> */}
          </div>
        );
      }
      retData.push(
        <div className="tbody">
          <div className="tbody-inner">
            <div className="tbody-td">
              {collection.openCollectionStatus == false && (
                <div
                  onClick={() => this.opensubCollection(i)}
                  className="caret-right"
                ></div>
              )}
              {collection.openCollectionStatus == true && (
                <div
                  onClick={() => this.opensubCollection(i)}
                  className="caret-down"
                ></div>
              )}
              {collection.name}
              {/* <b>({subCollections.length})</b> */}
            </div>
          </div>
          <Collapse isOpen={collection.openCollectionStatus}>
            {subCollectionJSX}
          </Collapse>
        </div>
      );
    }
    return retData;
  };
  opensubCollection(index) {
    const { collectionArray } = this.state;
    for (let i = 0; i < collectionArray.length; i++) {
      if (i == index) {
        collectionArray[i].openCollectionStatus =
          !collectionArray[i].openCollectionStatus;
      }
    }
    this.setState({
      collectionArray: collectionArray,
    });
  }
  render() {
    return (
      <div className="asset-container">
        <div className="tagging-wizard-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Discovered Assets</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <a
                    className="white-button m-r-0"
                    href="/assetmanager/pages/taggingWizard"
                  >
                    <i className="fa fa-arrow-circle-left"></i>
                    &nbsp;&nbsp; Back
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className=" common-container border-bottom-0">
            <div className="urganisational-unit-container add-tagging-contant">
              <div className="associate-head p-b-1">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <strong>Associate Elements</strong>
                  </div>
                </div>
              </div>
              <div className="select-resources">
                <p className="m-t-1">
                  Please select below the resources you want to tag with element
                </p>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Resources</h4>
                      </div>
                      <div className="resources-contant">
                        <div className="collection-details">
                          <div className="container-inner">
                            <div className="collection-data-table">
                              {this.createCollectionTable()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Existing tags of element</h4>
                      </div>
                      <div className="existing-tags-contant">
                        <div className="existing-tags-text">
                          <p>
                            HRMS &#8250; Development &#8250; Payroll Management
                            &#8250; App Service &#8250; JavavSpringboot API
                            Services
                          </p>
                        </div>
                      </div>
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

export default AddTaggingWizard;
