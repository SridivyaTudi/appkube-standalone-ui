import React from "react";
import { config } from "../../config";
import OpenNewContactPopup from "../../Components/OpenNewContactPopup";
import OpenNewCompanyPopup from "../../Components/OpenNewCompanyPopup";
import OpenNewEmailPopup from "../../Components/OpenNewEmailPopup";
import OpenNewTicketPopup from "../../Components/OpenNewTicketPopup";
import OpenNewAgentPopup from "../../Components/OpenNewAgentPopup";
import Rbac from "../Rbac/Rbac";

class CreateButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateMenu: false,
    };
    this.openNewContactRef = React.createRef();
    this.openNewCompanyRef = React.createRef();
    this.openNewEmailRef = React.createRef();
    this.openNewTicketRef = React.createRef();
    this.openNewAgentRef = React.createRef();
  }

  onClickOpenSubLink = () => {
    let menu = !this.state.openCreateMenu;
    this.setState({
      openCreateMenu: menu,
    });
  };

  onClickOpenNewContact = (e) => {
    this.openNewContactRef.current.toggle();
  };

  onClickOpenNewCompany = (e) => {
    this.openNewCompanyRef.current.toggle();
  };
  onClickOpenNewAgent = (e) => {
    this.openNewAgentRef.current.toggle();
  };

  onClickOpenNewEmail = (e) => {
    this.openNewEmailRef.current.toggle();
  };

  onClickOpenNewTicket = (e) => {
    this.openNewTicketRef.current.toggle();
  };

  render() {
    const { openCreateMenu } = this.state;
    return (
      <div className="col-lg-4 col-md-4 col-sm-12 text-right">
        <Rbac
          parentName={config.PARENT_NAME}
          childName="commancomponent-createbuttoncomponent-createbtn"
        >
          <a
            onClick={this.onClickOpenSubLink}
            className="blue-button m-b-0 m-r-0 min-width-inherit width-auto create-btn"
          >
            Create
          </a>
        </Rbac>
        {openCreateMenu == true && (
          <div className="text-center open-create-menu">
            <Rbac
              parentName={config.PARENT_NAME}
              childName="commancomponent-createbuttoncomponent-ticketbtn"
            >
              <a onClick={this.onClickOpenNewTicket}>Ticket</a>
            </Rbac>
            <Rbac
              parentName={config.PARENT_NAME}
              childName="commancomponent-createbuttoncomponent-emailbtn"
            >
              <a onClick={this.onClickOpenNewEmail}>Email</a>
            </Rbac>
            <Rbac
              parentName={config.PARENT_NAME}
              childName="commancomponent-createbuttoncomponent-contactbtn"
            >
              <a onClick={this.onClickOpenNewContact}>Contact</a>
            </Rbac>
            <Rbac
              parentName={config.PARENT_NAME}
              childName="commancomponent-createbuttoncomponent-companytbtn"
            >
              <a onClick={this.onClickOpenNewCompany}>Company</a>
            </Rbac>
            <Rbac
              parentName={config.PARENT_NAME}
              childName="commancomponent-createbuttoncomponent-agentbtn"
            >
              <a onClick={this.onClickOpenNewAgent}>Agent</a>
            </Rbac>
          </div>
        )}
        <OpenNewContactPopup ref={this.openNewContactRef} />
        <OpenNewCompanyPopup ref={this.openNewCompanyRef} />
        <OpenNewEmailPopup ref={this.openNewEmailRef} />
        <OpenNewTicketPopup ref={this.openNewTicketRef} />
        <OpenNewAgentPopup ref={this.openNewAgentRef} />
      </div>
    );
  }
}

export default CreateButtonComponent;
