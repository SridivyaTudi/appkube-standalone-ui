import React, { Component } from 'react';
class AppBlocks extends Component {
    previewDashboardPopupRef;
  constructor(props) {
    super(props)
    this.state = {
      dashboards: this.props.data || [],
    }
  }
  onClickPreviewDashboard = () => {
    this.previewDashboardPopupRef.current.setLink('');
    this.previewDashboardPopupRef.current.toggle();
  };

//   renderDashboards = (dashboards) => {
//     let retData = []
//     if (dashboards && dashboards.length > 0) {
//       retData = [];
//       for (let i = 0; i < dashboards.length; i++) {
//         const { id, name, description } = dashboards[i]
//         retData.push(
//           <>
//             <div className={`blog-list-item box`} key={id}>
//               <div className="module-card-content">
//                 <div className="row">
//                   <div className="col-md-1 col-sm-12 p-r-0">
//                     <img src={previewDashboard} alt={name} />
//                   </div>
//                   <div className="col-md-11 col-sm-12">
//                     <h3 className="title is-block">{name}</h3>
//                     <p className="subtitle is-block">{description}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="module-card-footer">
//                 <div className="module-card-footer-details">
//                   <a>
//                     <img src={libraryIcon} alt="" />
//                     {`Add Catalog To library`}
//                   </a>
//                 </div>
//                 <div className="module-card-footer-provider">
//                   <a onClick={this.onClickPreviewDashboard}>
//                     <img src={previewDashboardIcon} alt="" />
//                     {`Preview Dashboard`}
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </>
//         )
//       }
//     }
//     else {
//       retData = [];
//       retData.push(<div>No Data Found</div>)
//     }
//     return retData
//   }

  render() {
    const { dashboards } = this.state;
    return (
        <div>AppBlocks</div>
    )
  }
}

export default AppBlocks;