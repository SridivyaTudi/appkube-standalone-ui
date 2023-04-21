import React from "react";

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="d-block menus">
        <ul>
          <li>
            <i class="fas fa-chevron-right"></i>
            Setting
          </li>
          <li>
            <i class="fas fa-chevron-right"></i>
            Visualisation
          </li>
          <li>
            <i class="fas fa-chevron-right"></i>
            Display
          </li>
          <li>
            <i class="fas fa-chevron-right"></i>
            Series overrides
          </li>
          <li>
            <i class="fas fa-chevron-right"></i>
            Axes
          </li>
          <li>
            <i class="fas fa-chevron-right"></i>
            Legend
          </li>
          <li>
            <i class="fas fa-chevron-right"></i>
            Treshholds
          </li>
          <li>
            <i class="fas fa-chevron-right"></i>
            Time region
          </li>
          <li>
            <i class="fas fa-chevron-right"></i>
            Links
          </li>
          <li>
            <i class="fas fa-chevron-right"></i>
            Repeat options
          </li>
        </ul>
      </div>
    );
  }
}

export default Panel;
