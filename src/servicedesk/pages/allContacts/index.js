import React from "react";
import CreateButtonComponent from "../commanComponents/CreateButtonComponent";
import Table from "./../../components/table";
import { RestService } from "../_service/RestService";
import { config } from "../../config";

class AllContacts extends React.Component {
  perPageLimit;
  checkboxValue;
  constructor(props) {
    super(props);
    this.state = {
      openCreateMenu: false,
      columns: [
        {
          label: "Photo",
          key: "photo",
          renderCallback: (value) => {
            let strClass = "image";
            return (
              <td>
                <span className={strClass}></span>
                {value}
              </td>
            );
          },
        },

        {
          label: "Title",
          key: "title",
        },
        {
          label: "Contact",
          key: "name",
        },
        {
          label: "Company",
          key: "company",
        },
        {
          label: "Email Address",
          key: "primaryEmail",
        },
        {
          label: "Work Phone",
          key: "workPhone",
        },
        {
          label: "External Unique Id",
          key: "uniqueExternalId",
        },
        {
          label: "Twitter",
          key: "twitterHandle",
        },
      ],
      contactData: [],
    };
    this.checkboxValue = false;
    this.perPageLimit = 6;
  }
  async componentDidMount() {
    try {
      await RestService.getData(
        config.GET_CONTACT_WITH_COMPANY_NAME,
        null,
        null
      ).then((response) => {
        this.setState({
          contactData: response,
        });
        console.log("contact Data : ", response);
      });
    } catch (err) {
      console.log("Loading contact data failed. Error: ", err);
    }
  }

  onClickOpenSubLink = () => {
    let menu = !this.state.openCreateMenu;
    this.setState({
      openCreateMenu: menu,
    });
  };
  isLightTheme() {
    const w = window;
    if (w.grafanaBootData && w.grafanaBootData.user) {
      return w.grafanaBootData.user.lightTheme;
    }
    return false;
  }

  render() {
    const { columns, contactData } = this.state;
    return (
      <div className="servicedesk-dashboard-container">
        <div className="servicedesk-page-container all-contacts-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="page-heading">
                  <h1>All Contacts</h1>
                </div>
              </div>
              <CreateButtonComponent />
            </div>
          </div>
          <div className="common-container border-bottom-0 p-t-0">
            <Table
              valueFromData={{ columns: columns, data: contactData }}
              perPageLimit={this.perPageLimit}
              visiblecheckboxStatus={this.checkboxValue}
              tableClasses={{
                table: "contact-tabel",
                tableParent: "d-block p-t-5 contacts-tabel",
                parentClass: "d-block p-t-20 all-contacts-tabel",
              }}
              searchKey="contact"
              showingLine="Showing %start% to %end% of %total% Contacts"
              dark={!this.isLightTheme()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AllContacts;
