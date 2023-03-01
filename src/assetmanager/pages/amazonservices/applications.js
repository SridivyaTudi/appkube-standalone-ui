import React, {Component} from "react";
import ProductWiseServices from '../../components/ProductWiseServices';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {

      product: [],
      
      
      
      
      
    };
  }
    render() {
      return (
        <div className="department-wise-container">
              <ProductWiseServices  type="department" />
        </div>
      )
    }
  }
  export default  Applications;
 