import React, {Component} from "react";
import CategoryImage1 from '../../assets/img/category-image1.png';
import './lib/styles.css';
// const responsive = {
//   desktop: {
//     breakpoint: {
//       max: 3000,
//       min: 1024,
//     },
//     items: 1,
//     slidesToSlide: 1,
//     partialVisibilityGutter: 40,
//   },
//   tablet: {
//     breakpoint: {
//       max: 1024,
//       min: 768,
//     },
//     items: 1,
//     slidesToSlide: 1,
//     partialVisibilityGutter: 30,
//   },
//   mobile: {
//     breakpoint: {
//       max: 767,
//       min: 0,
//     },
//     items: 1,
//     slidesToSlide: 1,
//     partialVisibilityGutter: 30,
//   },
// };

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogs: this.props.catalogsData,
    };
  }

  render() {
    const { catalogs } = this.state;
    return (
      <div className="select-dashboard">
        <div className="select-dashboard-heading">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-12">
              <div className="heading-image">
                <img src={CategoryImage1} alt="" />
              </div>
            </div>
            <div className="col-lg-10 col-md-9 col-sm-12">
              <div className="heading-text">
                <h3>{catalogs.catalogName}</h3>
                <p>{catalogs.catalogDescription}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-frame">
          {/* <Carousel
            responsive={responsive}
            showDots={true}
            infinite={true}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-0"
          >
            <div>
              <iframe width="100%" height="370" src="http://localhost:8888/catalogue/this-is-catalogue-1/"></iframe>
            </div>
            <div>
              <iframe width="100%" height="370" src="/a/xformation-perfmanager-ui-plugin/managedashboard"></iframe>
            </div>
            <div>
              <iframe width="100%" height="370" src="/analytics"></iframe>
            </div>
            <div>
              <iframe width="100%" height="370" src="/a/xformation-servicedesk-ui-plugin/dashboard"></iframe>
            </div>
          </Carousel> */}
          <div style={{ height: '100%' }}>
            <iframe width="100%" height="600" src="/a/xformation-perfmanager-ui-plugin/managedashboard"></iframe>
          </div>
        </div>
      </div>
    );
  }
}
export default Preview;
