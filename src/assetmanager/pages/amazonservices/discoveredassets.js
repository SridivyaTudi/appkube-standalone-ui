import React, { Component } from 'react';
import Microsoftazure from '../../../assets/img/assetmanager/microsoftazure.png';
import { v4 } from 'uuid';
import { Collapse } from 'reactstrap';
//import SelectCloudFilter from './selectcloudfilter';
import AWS from '../../../assets/img/assetmanager/aws.png';
import Azure from '../../../assets/img/assetmanager/microsoftazure.png';
import GCP from '../../../assets/img/assetmanager/google-cloud.png';
import Kubernetes from '../../../assets/img/assetmanager/kubernetes.png';

const LOGOS = {
  aws: AWS,
  azure: Azure,
  gcp: GCP,
  kubernetes: Kubernetes
};

class DiscoveredAssetsold extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: [{
        name: 'Product Enclave',
        key: 'nodes',
        filter: []
      }, {
        name: 'Clusters',
        key: 'clusters',
        filter: []
      }, {
        name: 'Products',
        key: 'products',
        filter: []
      }, {
        name: 'Environments',
        key: 'environments',
        filter: []
      }],
    }
  }

  handleMenuToggle = (key) => {
    const { tableData } = this.state;
    tableData[key].showMenu = !tableData[key].showMenu;
    this.setState({
      tableData
    });
  };

  renderNodes = (nodes) => {
    const { totalData, activeNode, filters } = this.state;
    const retData = [];
    if (nodes) {
      const filteredNodes = filters['Product Enclave'];
      const totalNodes = nodes.length;
      for (let i = 0; i < totalNodes; i++) {
        const node = nodes[i];
        // const node = nodes[key];
        if ((filteredNodes && filteredNodes.indexOf(node.name) !== -1) || !filteredNodes) {
          retData.push(
            <div className="tbody" key={v4()}>
              <div className="tbody-inner">
                <div className={`tbody-td first ${activeNode === node.name ? 'active' : ''}`} onClick={() => this.toggleNode(i, node.name)} title={node.name}>
                  <div className={node.isOpened ? "caret-down" : "caret-right"}></div>
                  {node.name}
                </div>
                <div className="tbody-td">{totalData[i] ? totalData[i]['products'].length : 0}</div>
                <div className="tbody-td">{totalData[i] ? (totalData[i]['app'] || 0) : 0}</div>
                <div className="tbody-td">{totalData[i] ? (totalData[i]['data'] || 0) : 0}</div>
                <div className="tbody-td">
                  <div className="d-block text-center action-edit">
                    {node.showMenu &&
                      <>
                        <div className="open-create-menu-close" onClick={(e) => { this.handleMenuToggle(i) }}></div>
                        <div className="text-center open-create-menu">
                          <a>Add New Product</a>
                          <a>Add Cluster</a>
                          <a>Add Cloud Managed Services</a>
                          <a>Add Gateway Services</a>
                        </div>
                      </>
                    }
                    <button className="asset-white-button min-width-inherit m-r-0" onClick={(e) => { this.handleMenuToggle(i) }}>
                      <a className="fa fa-ellipsis-h"></a>
                    </button>
                  </div>
                </div>
              </div>
              {
                node.isOpened ?
                  <Collapse className="collapse-content" isOpen={node.isOpened}>
                    {this.renderClusters(i, node.clusters)}
                  </Collapse> : <></>
              }
            </div>
          );
        }
      }
    }
    return retData;
  };


  render() {
    const { labelText, treeData, servicesData, filterData, cloudName } = this.state;
    return (
      <div className='department-wise-container'>
        <div className='common-container'>
          <div style={{ marginBottom: '20px' }}>
            {/* <SelectCloudFilter filterJsonData={filterData} onChangeFilter={this.onChangeFilter} /> */}
            <div className='fliters-container'>
              <div className='select-fliters'>
                <div className="add-fliters">
                  <i className="fa fa-plus"></i>
                </div>
                <div className="fliter-toggel" ></div>
                <i className="fa fa-angle-down" ></i>
              </div>
            </div>
          </div>
          <div className="organisational-details">
            <div className="container-inner">
              <div className="organisational-data-table">
                <div className={servicesData ? "organisational-data-table-left" : ""}>
                  <div className="thead">
                    <div className="thead-th organisational-heading"><span><img src={Microsoftazure} alt="" /></span>AZURE</div>
                    <div className="thead-th">Products</div>
                    <div className="thead-th">App Services</div>
                    <div className="thead-th">Data Services</div>
                    <div className="thead-th">Action</div>
                  </div>
                  <div className="tbody">
                     <div className="tbody-inner">
                     <div className="tbody-td first active"><div className="caret-right"></div>VPC1</div>
                     <div className="tbody-td">2</div>
                     <div className="tbody-td">264</div>
                     <div className="tbody-td">440</div>
                     <div className="tbody-td">
                        <div className="d-block text-center action-edit">
                          <button className="asset-white-button min-width-inherit m-r-0" >
                            <a className="fa fa-ellipsis-h"></a>
                          </button>
                        </div>
                      </div>
                  </div>
                </div>
                  {/* {this.renderNodes(treeData)} */}
                </div>
                <div className={servicesData ? "organisational-data-table-right" : ""}>
                  <div className="right-part-filters">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="filters-breadcrumbs">
                          <ul>
                            <li>{labelText}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12" style={{ display: 'none' }}>
                        <div className="filters-buttons">
                          <button className="asset-white-button min-width-inherit">
                            <i className="fa fa-plus"></i> Add
                          </button>
                          <button className="asset-white-button min-width-inherit">
                            <i className="fa fa-refresh"></i> Refresh
                          </button>
                          <button className="asset-white-button min-width-inherit m-r-0">
                            <i className="fa fa-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ display: 'none' }}>
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="filters-search">
                          <label>Filter by deployment name</label>
                          <div className="form-group">
                            <input type="text" className="control-form" placeholder="Enter the full deployment name" value="" />
                            <button><i className="fa fa-search"></i></button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="filters-search">
                          <label>Filter by App</label>
                          <div className="form-group">
                            <input type="text" className="control-form" placeholder="foo-bar,key!=value" value="" />
                            <button><i className="fa fa-search"></i></button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="filters-search">
                          <label>Filter by SLA</label>
                          <div className="form-group">
                            <input type="text" className="control-form" placeholder="All SLA" value="" />
                            <button><i className="fa fa-search"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {this.renderEnvironments()} */}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
export default DiscoveredAssetsold;
