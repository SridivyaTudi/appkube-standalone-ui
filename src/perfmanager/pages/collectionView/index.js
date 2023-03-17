import React, { Component } from "react";
import { config } from "../../config";
import { Collapse } from "reactstrap";
import TopMenu from "../catalog/topMenu";
import Rbac from "../../components/Rbac";
import UnimplementedFeaturePopup from "../../components/UnimplementedFeaturePopup";

class CollectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionArray: [
        {
          name: "AWS",
          type: "Hosted",
          messages: "1293",
          openCollectionStatus: false,
          subCollectionData: [
            {
              subCollectionName: "AWS Config",
              subCollectionType: "Hosted",
              subCollectionCategory: "aws/cloudconfig",
              subCollectionMessages: "",
            },
            {
              subCollectionName: "Amazon ECS",
              subCollectionType: "Hosted",
              subCollectionCategory: "aws/ecs",
              subCollectionMessages: "",
            },
            {
              subCollectionName: "AWS Cloud Trail",
              subCollectionType: "Hosted",
              subCollectionCategory: "AWS Cloud Trail",
              subCollectionMessages: "",
            },
          ],
        },
        {
          name: "Admin Linux",
          type: "Installed",
          messages: "71",
          openCollectionStatus: false,
          subCollectionData: [
            {
              subCollectionName: "AWS Config",
              subCollectionType: "Hosted",
              subCollectionCategory: "aws/Linux",
              subCollectionMessages: "",
            },
          ],
        },
      ],
    };

    this.unimplementedFeatureModalRef = React.createRef();
  }
  onClickUnImplementedFeature = (link) => {
    this.unimplementedFeatureModalRef.current.setLink(link);
    this.unimplementedFeatureModalRef.current.toggle();
  };
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
              {collectionsubData.subCollectionName}
            </div>
            <div className="tbody-td">
              {collectionsubData.subCollectionType}
            </div>
            <div className="tbody-td">
              <div className="status-icon"></div>
            </div>
            <div className="tbody-td">
              {collectionsubData.subCollectionCategory}
            </div>
            <div className="tbody-td">
              {collectionsubData.subCollectionMessages}
            </div>
            <div className="tbody-td">
              <div className="d-flex">
                <div
                  className="enabled"
                  onClick={() => this.onClickUnImplementedFeature("")}
                ></div>
                <Rbac
                  parentName={config.PARENT_NAME}
                  childName="collectionview-index-collectiontbl-edtbtn"
                >
                  <button
                    className="btn btn-link"
                    onClick={() => this.onClickUnImplementedFeature("")}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </Rbac>
                <Rbac
                  parentName={config.PARENT_NAME}
                  childName="collectionview-index-collectiontbl-deletebtn"
                >
                  <button
                    className="btn btn-link"
                    onClick={() => this.onClickUnImplementedFeature("")}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </Rbac>
                <button
                  className="btn btn-link"
                  id="PopoverFocus"
                  onClick={() => this.onClickUnImplementedFeature("")}
                >
                  <i className="fa fa-ellipsis-h"></i>
                </button>
              </div>
            </div>
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
              {collection.name} <b>({subCollections.length})</b>
            </div>
            <div className="tbody-td">{collection.type}</div>
            <div className="tbody-td">
              <div className="status-icon"></div>
            </div>
            <div className="tbody-td">{collection.category}</div>
            <div className="tbody-td">{collection.messages}</div>
            <div className="tbody-td">
              <div className="d-flex">
                <Rbac
                  parentName={config.PARENT_NAME}
                  childName="collectionview-index-collectiontbl-plusbtn"
                >
                  <button
                    className="btn btn-link"
                    onClick={() => this.onClickUnImplementedFeature("")}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </Rbac>
                <Rbac
                  parentName={config.PARENT_NAME}
                  childName="collectionview-index-collectiontbl-edtbtn"
                >
                  <button
                    className="btn btn-link"
                    onClick={() => this.onClickUnImplementedFeature("")}
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </Rbac>
                <Rbac
                  parentName={config.PARENT_NAME}
                  childName="collectionview-index-collectiontbl-edtbtn"
                >
                  <button
                    className="btn btn-link"
                    onClick={() => this.onClickUnImplementedFeature("")}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </Rbac>
                <Rbac
                  parentName={config.PARENT_NAME}
                  childName="collectionview-index-collectiontbl-ellipsisbtn"
                >
                  <button
                    className="btn btn-link"
                    id="PopoverFocus"
                    onClick={() => this.onClickUnImplementedFeature("")}
                  >
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                </Rbac>
              </div>
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
      <div className="perfmanager-dashboard-container">
        <div className="perfmanager-page-container">
          <div className="common-container">
            <TopMenu />
          </div>
          <div className="common-container collection-search">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className="collection-heading">Collection</div>
              </div>
              <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="float-right">
                  <div className="category-select">
                    <select className="form-control">
                      <option>Category</option>
                      <option>Category</option>
                      <option>Category</option>
                    </select>
                  </div>
                  <div className="form-group search-control-group">
                    <form>
                      <input
                        type="text"
                        className="input-group-text"
                        placeholder="Search"
                      />
                      <button>
                        <i className="fa fa-search"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0">
            <div className="collection-details">
              <div className="container-inner">
                <div className="collection-data-table">
                  <div className="thead">
                    <div className="thead-th">
                      <div className="caret-right"></div>
                      Name
                    </div>
                    <div className="thead-th">Type</div>
                    <div className="thead-th">Status</div>
                    <div className="thead-th">Category</div>
                    <div className="thead-th">Messages</div>
                    <div className="thead-th"></div>
                  </div>
                  {this.createCollectionTable()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <UnimplementedFeaturePopup ref={this.unimplementedFeatureModalRef} />
      </div>
    );
  }
}

export default CollectionView;
