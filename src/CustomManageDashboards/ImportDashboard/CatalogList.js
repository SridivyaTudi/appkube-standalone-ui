import React, {Component} from "react";
//import * as React from 'react';
import CategoryImage1 from'../img/category-image1.png';

class CatalogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogs: this.props.catalogsData,
    };
  }

  _displayCatalogBox() {
    const catalogBox = this.state.catalogs.map((val, key) => {
      return (
        <div className="catalog-list-box" onClick={() => this.openCatalogDetail(val)} key={key}>
          <div className="row">
            <div className="col-lg-5 col-md-4 col-sm-12 p-r-0">
              <div className="catalog-list-image confit-image">
                {/* <img src="public/img/category-image1.png" alt="" /> */}
                <img src={CategoryImage1} alt="" />
              </div>
            </div>
            <div className="col-lg-7 col-md-8 col-sm-12">
              <div className="catalog-list-name">{val.catalogName}</div>
            </div>
          </div>
        </div>
      );
    });
    return catalogBox;
  }

  openCatalogDetail = (arryData) => {
    this.props.setCatalogDetail(arryData);
  };

  render() {
    return <div className="select-catalog-lists">{this._displayCatalogBox()}</div>;
  }
}
export default CatalogList;
