import React, { PureComponent } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import Overview from "../../pages/overview";

export class CustomSideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return (
      <div className="sidemenu">
        <div className="menu-item-container">
          <Scrollbars style={{ width: "100%", height: "100%" }}>
            <div className="main-menu">
              <ul>
                {this.mainMenu.map((item) => {
                  console.log(item);
                  return (
                    <li className="item" title={item.text}>
                      <Link className="menu-item" to={item.link}>
                        <div
                          className={`menu-item-image ${item.cssClass}`}
                        ></div>
                        <div className="menu-item-text">{item.text}</div>
                        {item.subMenu &&
                          item.subMenu.map((item) => {
                            return (
                              <Link className="menu-item" to={item.link}>
                                <div
                                  className={`menu-item-image ${item.cssClass}`}
                                ></div>
                                <div className="menu-item-text">
                                  {item.text}
                                </div>
                              </Link>
                            );
                          })}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul>
                {this.extra.map((item) => {
                  console.log(item);
                  return (
                    <li className="item" title={item.text}>
                      <Link className="menu-item" to={item.link}>
                        <div
                          className={`menu-item-image ${item.cssClass}`}
                        ></div>
                        <div className="menu-item-text">{item.text}</div>
                        {item.subMenu
                          ? item.subMenu.map((item) => {
                              <Link className="menu-item" to={item.link}>
                                <div
                                  className={`menu-item-image ${item.cssClass}`}
                                ></div>
                                <div className="menu-item-text">
                                  {item.text}
                                </div>
                              </Link>;
                            })
                          : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
