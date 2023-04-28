import React from "react";
import config from "../../../config";
import companyIcon from "../../img/company-icon.png";
import Table from "./../../Components/Table";
import { RestService } from "../../../Services/RestService";
import CreateButtonComponent from "../CommanComponents/CreateButtonComponent";

class AllCompanies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateMenu: false,
      columns: [
        {
          label: "Company",
          key: "company",
          renderCallback: (value) => {
            let strClass = "image";
            return (
              <td>
                <span className={strClass}>
                  <img src={companyIcon} alt="" />
                </span>
                {value}
              </td>
            );
          },
        },
        {
          label: "Contacts",
          key: "contacts",
          renderCallback: (value) => {
            let strClass1 = "float-right";
            let strClass2 = "fa fa-ellipsis-v";
            return (
              <td>
                {value}{" "}
                <a href="#" className={strClass1}>
                  <i className={strClass2}></i>
                </a>
              </td>
            );
          },
        },
      ],
      companyData: [],
    };
  }
  onClickOpenSubLink = () => {
    let menu = !this.state.openCreateMenu;
    this.setState({
      openCreateMenu: menu,
    });
  };

  async componentDidMount() {
    try {
      await RestService.getData(
        config.GET_COMPANIES_CONTACT_LIST_URL,
        null,
        null
      ).then((response) => {
        this.setState({
          companyData: response,
        });
        console.log("company Data : ", response);
      });
    } catch (err) {
      console.log("Loading company data failed. Error: ", err);
    }
    // console.log("companyNameList  : ", this.state.companyContactList);
  }

  isLightTheme() {
    const w = window;
    if (w.grafanaBootData && w.grafanaBootData.user) {
      return w.grafanaBootData.user.lightTheme;
    }
    return false;
  }

  render() {
    const { companyData, columns } = this.state;
    return (
      <div className="servicedesk-dashboard-container">
        <div className="servicedesk-page-container all-contacts-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                <div className="page-heading">
                  <h1>All Companies</h1>
                </div>
              </div>
              {/* create component */}
              <CreateButtonComponent />
              {/* create component */}
            </div>
          </div>
          <div className="common-container border-bottom-0 p-t-0">
            <div className="d-block p-t-20 all-companies-tabel">
              <Table
                valueFromData={{ columns: columns, data: companyData }}
                perPageLimit={10}
                visiblecheckboxStatus={true}
                tableClasses={{
                  table: "companies-tabel",
                  tableParent: "d-block  p-t-5 companies-main-tabel",
                  parentClass: "d-block p-t-20 all-companies-tabel",
                }}
                searchKey="company"
                showingLine="Showing %start% to %end% of %total% Companies"
                dark={!this.isLightTheme()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllCompanies;
