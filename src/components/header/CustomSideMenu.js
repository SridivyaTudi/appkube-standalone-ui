import React, { PureComponent } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink } from "react-router-dom";

export class CustomSideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subMenuHTML: "",
      sideMenuPinned: false,
      sideMenuPinnedText: "",
    };
  }

  mainMenu = [
    {
      link: "/",
      text: "Overview",
      cssClass: "overview",
      isImplemented: true,
      childName: "overview",
    },
    {
      link: "/a/xformation-assetmanager-ui-plugin/environments",
      text: "Assets",
      cssClass: "assets",
      childName: "assets",
      isImplemented: true,
      subMenu: [
        {
          link: "/a/xformation-assetmanager-ui-plugin/environments",
          text: "Environments",
          childName: "assets",
          isImplemented: true,
          subMenu: [
            {
              link: "/a/xformation-assetmanager-ui-plugin/amazon-services",
              text: "Amazon Services",
              childName: "assets",
              isImplemented: true,
              subMenu: [
                {
                  link: "/a/xformation-assetmanager-ui-plugin/storage-details",
                  text: "Storage Details",
                  childName: "assets",
                  isImplemented: true,
                },
              ],
            },
          ],
        },
        {
          link: "/a/xformation-assetmanager-ui-plugin/department-wise-products",
          text: "Department Wise Products",
          childName: "assets",
          isImplemented: true,
          subMenu: [
            {
              link: "/a/xformation-assetmanager-ui-plugin/department-wise-charts",
              text: "Department Wise Charts",
              childName: "assets",
              isImplemented: true,
            },
          ],
        },
        {
          link: "/a/xformation-assetmanager-ui-plugin/product-wise-services-sla",
          text: "Product Wise Services SLA",
          childName: "assets",
          isImplemented: true,
        },
        {
          link: "/a/xformation-assetmanager-ui-plugin/add-data-source-product",
          text: "All Inputs",
          childName: "assets",
          isImplemented: true,
          subMenu: [
            {
              link: "/a/xformation-assetmanager-ui-plugin/add-data-source",
              text: "All Inputs",
              childName: "assets",
              isImplemented: true,
            },
            {
              link: "/a/xformation-assetmanager-ui-plugin/add-datasource-credential",
              text: "All Inputs",
              childName: "assets",
              isImplemented: true,
            },
          ],
        },
        {
          link: "/assets/discovered-assets",
          text: "Discovered Assets",
          childName: "assets",
        },
        {
          link: "/assets/monitored-assets",
          text: "Monitored Assets",
          childName: "assets",
        },
        {
          link: "/assets/org-unit",
          text: "Org Unit",
          childName: "assets",
        },
        {
          link: "/assets/custom-resources",
          text: "Custom-Resources",
          childName: "custom-resources",
        },
      ],
    },
    {
      link: "/a/xformation-perfmanager-ui-plugin/catalog",
      text: "App Catalogue",
      cssClass: "app-catalogue",
      childName: "app-catalogue",
      isImplemented: true,
      subMenu: [
        {
          link: "/a/xformation-perfmanager-ui-plugin/catalog",
          text: "View And Search Catalogue",
          childName: "app-catalogue",
          isImplemented: true,
        },
        {
          link: "/a/xformation-perfmanager-ui-plugin/library",
          text: "Library",
          isImplemented: true,
          childName: "metrics-library",
        },
        {
          link: "/import-module-pack",
          text: "Import Assets From Module Pack ",
          childName: "app-catalogue",
        },
        {
          link: "/create-module",
          text: "Create Or Import Module Packs",
          childName: "create-module",
        },
      ],
    },
    {
      link: "/a/xformation-alertmanager-ui-plugin/monitor-alerts",
      text: "Alerts",
      cssClass: "alerts",
      isImplemented: true,
      childName: "alerts",
      subMenu: [
        {
          link: "/a/xformation-alertmanager-ui-plugin/monitor-alerts",
          text: "Dashboard",
          isImplemented: true,
          childName: "alert-manager-dashboard",
        },
        {
          link: "/a/xformation-alertmanager-ui-plugin/alert-rule-builder",
          text: "New Alert Rule",
          isImplemented: true,
          childName: "new-alert-rule",
        },
        {
          link: "/alerting/list",
          text: "All Alert Rules",
          isImplemented: true,
          childName: "all-alert-rule",
        },
        {
          link: "/a/xformation-alertmanager-ui-plugin/manage-alert-rule",
          text: "Manage Alert Rule",
          isImplemented: true,
          childName: "new-alert-rule",
        },
        {
          link: "/a/xformation-alertmanager-ui-plugin/manageworkflow",
          text: "Manage Workflows",
          childName: "new-alert-rule",
        },
      ],
    },
    {
      link: "/managedashboards",
      text: "Analytics",
      cssClass: "analytics",
      childName: "analytics",
      isImplemented: true,
      subMenu: [
        {
          link: "/managedashboards",
          text: "Manage Dashboards",
          childName: "manage-dashboards",
          isImplemented: true,
        },
        {
          link: "/analytics",
          text: "Manage Views",
          childName: "analytics",
          isImplemented: true,
          subMenu: [
            {
              link: "/analytics/new/dashboard",
              text: "New Dashboards",
              childName: "analytics",
              isImplemented: true,
            },
            {
              link: "/analytics/edit/dashboard",
              text: "Edit Dashboards",
              childName: "analytics",
              isImplemented: true,
            },
            {
              link: "/analytics/view",
              text: "View Dashboards",
              childName: "analytics",
              isImplemented: true,
            },
          ],
        },
        {
          link: "/taskmanager",
          text: "Task Manager",
          childName: "taskmanager",
          isImplemented: true,
        },
        {
          link: "/drilldownanalytics",
          text: "Drilldown Analytics",
          childName: "analytics",
        },
      ],
    },
    {
      link: "/ops-central",
      text: "Ops central",
      cssClass: "ops-central",
      isImplemented: true,
      childName: "ops-central",
    },
    {
      link: "/dev-central",
      text: "Dev Central",
      cssClass: "dev-central",
      isImplemented: true,
      childName: "dev-central",
    },
    {
      link: "/sec-central",
      text: "Sec Central",
      cssClass: "sec-central",
      isImplemented: true,
      childName: "sec-central",
    },
    {
      link: "/tools-and-diagnostics",
      text: "Tools & Diagnostics",
      cssClass: "tools-and-diagnostics",
      isImplemented: true,
      childName: "tools-and-diagnostics",
    },
    {
      link: "/team",
      text: "Preference",
      cssClass: "preferences",
      childName: "preferences",
      isImplemented: true,
      subMenu: [
        {
          link: "/team",
          text: "Team",
          cssClass: "metrics",
          childName: "team",
          isImplemented: true,
        },
      ],
    },
  ];

  extra = [
    {
      link: "/plugins/xformation-rbac-ui-plugin/page/home",
      text: "RBAC Settings",
      cssClass: "rbac-settings",
      childName: "rbac-settings",
      isImplemented: true,
    },
    {
      link: "/resource",
      text: "Resource",
      cssClass: "resources",
      childName: "resources",
    },
  ];

  getPinnedMenuText = (isActive, index, text) => {
    if (index < 1 && isActive) {
      this.setState({ sideMenuPinnedText: text });
    } else if (index < 1) {
      this.setState({ sideMenuPinnedText: "" });
    } else {
      this.setState({ sideMenuPinnedText: text });
    }
  };

  createSubmenu = (index) => {
    let HTML = (
      <div className="open-menu">
        <div
          className="side-menu-toggle text-right"
          onClick={() => {
            this.setState({ sideMenuPinned: !this.state.sideMenuPinned });
          }}
        >
          <i
            className="fa fa-thumb-tack"
            style={{ transform: "rotate(0deg)" }}
          ></i>
        </div>
        <ul>
          {this.mainMenu[index].subMenu.map((item, index) => {
            if (index < 1) {
              this.setState({ sideMenuPinnedText: item.text });
            }
            return (
              <li>
                <NavLink
                  onClick={(isActive) => {
                    this.getPinnedMenuText(isActive, index, item.text);
                  }}
                  className="menu-item"
                  to={item.link}
                >
                  <div className="menu-item-text">{item.text}</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
    this.setState({ subMenuHTML: HTML });
  };

  render() {
    return (
      <div className="sidemenu">
        <div className="menu-item-container">
          <Scrollbars style={{ width: "100%", height: "100%" }}>
            <div className="main-menu">
              <ul>
                {this.mainMenu.map((item, index) => {
                  return (
                    <li className="item" title={item.text}>
                      <NavLink
                        onClick={(isActive) => {
                          if (isActive && item.subMenu) {
                            this.createSubmenu(index);
                          } else {
                            this.setState({ subMenuHTML: "" });
                          }
                        }}
                        className="menu-item"
                        to={item.link}
                      >
                        <div
                          className={`menu-item-image ${item.cssClass}`}
                        ></div>
                        <div className="menu-item-text">{item.text}</div>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <ul>
                {this.extra.map((item, index) => {
                  return (
                    <li className="item" title={item.text}>
                      <NavLink
                        onClick={(isActive) => {
                          if (isActive && item.subMenu) {
                            this.createSubmenu(index);
                          } else {
                            this.setState({ subMenuHTML: "" });
                          }
                        }}
                        className="menu-item"
                        to={item.link}
                      >
                        <div
                          className={`menu-item-image ${item.cssClass}`}
                        ></div>
                        <div className="menu-item-text">{item.text}</div>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Scrollbars>
          <div
            className={`menu_state_${this.state.sideMenuPinned ? "8" : "4"}`}
          >
            <div className="sub-menu active-sub-menu">
              {this.state.subMenuHTML}
              {this.state.subMenuHTML ? (
                <div
                  class="close-menu"
                  onClick={() => {
                    this.setState({
                      sideMenuPinned: !this.state.sideMenuPinned,
                    });
                  }}
                >
                  <div class="side-menu-toggle">
                    <i
                      class="fa fa-thumb-tack"
                      style={{ transform: "rotate(-90deg)" }}
                    ></i>
                  </div>
                  <ul>
                    <li>
                      <div class="menu-item-text">
                        {this.state.sideMenuPinnedText}
                      </div>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
