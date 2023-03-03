import React, { Component } from "react";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: this.props.filterJsonData,
      duplicateFilterData: this.props.filterJsonData,
      filterJsonData: {},
      duplicatefilterJsonData: {},
      searchString: "",
      showPreview: false,
      searchKey: "",
      showTagFilter: false,
    };
  }
  clearAllTagFilter = (index) => {
    const { filterData } = this.state;
    for (let k = 0; k < filterData[index].filter.length; k++) {
      filterData[index].filter[k].isHide = false;
    }
    this.setState({
      filterData,
      searchKey: "",
    });
  };

  handleClearFilter = () => {
    const { duplicateFilterData } = this.state;
    const filterData = JSON.parse(JSON.stringify(duplicateFilterData));
    filterData.forEach((data) => {
      data.filter.forEach((checkbox) => {
        checkbox.isHide = false;
      });
    });
    this.setState({ filterData, searchString: "" });
  };

  handleChangeSearch = (e) => {
    let { value } = e.target;
    const { duplicateFilterData } = this.state;
    value = value.toLowerCase();
    const filterData = JSON.parse(JSON.stringify(duplicateFilterData));
    filterData.forEach((data) => {
      data.filter.forEach((checkbox) => {
        const label = checkbox.label.toLowerCase();
        if (label.indexOf(value) === -1) {
          checkbox.isHide = true;
        }
      });
    });
    this.setState({
      searchString: value,
      filterData,
    });
  };
  handleCheckboxChange = (filterIndex, index) => {
    let { filterData } = this.state;
    filterData[filterIndex].filter[index].isChecked =
      !filterData[filterIndex].filter[index].isChecked;
    this.setState({ filterData });
    this.onChangeFilters(filterData);
  };
  onChangeFilters = (filterData) => {
    const retData = {};
    if (filterData && filterData.length > 0) {
      for (let i = 0; i < filterData.length; i++) {
        let filter = filterData[i].filter;
        for (let j = 0; j < filter.length; j++) {
          const label = filterData[i].filter[j];
          if (label.isChecked) {
            retData[filterData[i].key] = retData[filterData[i].key] || [];
            retData[filterData[i].key].push(label.value);
          }
        }
      }
    }
    if (this.props.onChangeFilter) {
      this.props.onChangeFilter(retData);
    }
  };
  renderFilters = () => {
    const { filterData } = this.state;
    if (filterData && filterData.length > 0) {
      const retData = [];
      filterData.forEach((data, index) => {
        const checkboxJSX = [];
        data.filter.forEach((checkbox, checkboxIndex) => {
          if (!checkbox.isHide) {
            checkboxJSX.push(
              <li>
                <input
                  id={checkbox.value}
                  type="checkbox"
                  checked={checkbox.isChecked}
                  onChange={() =>
                    this.handleCheckboxChange(index, checkboxIndex)
                  }
                />
                <label htmlFor={checkbox.value}>{checkbox.label}</label>
              </li>
            );
          }
        });
        retData.push(
          <div className="catalogue-category">
            <strong>{data.name}</strong>
            <ul>{checkboxJSX}</ul>
          </div>
        );
      });
      return retData;
    }
    return <>No filter data available</>;
  };
  render() {
    const { searchString } = this.state;
    return (
      <div className="catalogue-filters">
        <div className="filter-search">
          <strong>Filters</strong>
          <div className="filter-input">
            <button className="search-icon">
              <i className="fa fa-search"></i>
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={this.handleChangeSearch}
            />
            <button className="close-icon" onClick={this.handleClearFilter}>
              <i className="fa fa-close"></i>
            </button>
          </div>
        </div>
        {this.renderFilters()}
      </div>
    );
  }
}

export default Filter;
