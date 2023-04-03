import React from "react";
import { config } from "../../config";
import QueryPanel from "./query/QueryPanel";
import Utils from "../../utils";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const entBaseClsPkg = "com.synectiks.cms.entities.";

class NewRulSetPopup extends React.Component {
  constructor(props) {
    super(props);
    console.log("props: ", props);
    this.state = {
      modal: false,
      entities: props.entities,
      reqObj: {
        searchable: false,
        checks: [],
      },
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
    // Utils.getReq(config.GET_ENTITIES_LIST)
    // 	.then((response) => {
    // 		this.setState({
    // 			entities: response.data
    // 		});
    // 	});
    // console.log("entities: ", this.state.entities);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevProps.entities) !== JSON.stringify(this.props.entities)
    ) {
      this.setState({
        entities: this.props.entities,
      });
    }
  }

  onChange = (e) => {
    const data = this.state.reqObj;
    const val = e.target.value;
    const id = e.target.id;
    if (val) {
      data[id] = val;
    } else {
      data[id] = "";
    }
    this.setState({
      reqObj: data,
    });
  };

  onChkChange = () => {
    const data = this.state.reqObj;
    data.searchable = !data.searchable;
    this.setState({
      reqObj: data,
    });
  };

  submit = () => {
    console.log("state: " + JSON.stringify(this.state.reqObj));
    const data = this.state.reqObj;
    if (Utils.isNullEmpty(data.name)) {
      alert("Name is mandatory.");
      return;
    }
    if (Utils.isNullEmpty(data.entity)) {
      alert("Entity is mandatory.");
      return;
    }
    if (Utils.isNullEmpty(data.checks)) {
      alert("Checks is mandatory.");
      return;
    } else {
      data.checks = [data.checks];
    }
    alert("Payload: " + JSON.stringify(data));
    Utils.postReq(config.POST_RULE, data, this.responseHandler);
  };

  responseHandler = (res, err) => {
    if (res) {
      alert("Rule saved successfully by id: " + res.data.id);
    } else {
      alert(err);
    }
  };

  render() {
    const state = this.state;
    return (
      <Modal
        isOpen={state.modal}
        toggle={this.toggle}
        className="modal-container assessments-modal-container"
      >
        <ModalHeader className="d-flex justify-content-space-between align-items-center ">
          Create New Ruleset
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={this.toggle}
          >
            <i class="fal fa-times"></i>
          </button>
        </ModalHeader>
        <ModalBody
          style={{
            height: "calc(75vh - 110px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="form-group">
            <label htmlFor="name" className="d-block">
              Name*
            </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.onChange}
              className="input-group-text d-block"
              placeholder="Rule name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="d-block">
              Description
            </label>
            <textarea
              id="description"
              value={this.state.description}
              onChange={this.onChange}
              className="input-group-text d-block"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="searchable" className="d-block">
              Searchable
            </label>
            <input
              type="checkbox"
              id="searchable"
              defaultChecked={this.state.searchable}
              onChange={this.onChkChange}
              className="input-group-text d-block"
              style={{ width: "auto" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="entity" className="d-block">
              Entity*&nbsp;&nbsp;&nbsp;
              <i className="fa fa-info-circle"></i>
            </label>
            <select
              className="form-control d-block"
              id="entity"
              onChange={this.onChange}
              value={this.state.entity}
            >
              <option value="" selected>
                Select Entity
              </option>
              {this.state.entities.map((item) => (
                <option key={item} value={item}>
                  {item.replace(entBaseClsPkg, "")}
                </option>
              ))}
            </select>
            <div className="form-group">
              <label htmlFor="checks" className="d-block">
                Check*
              </label>
              <input
                id="checks"
                type="test"
                value={this.state.checks}
                readOnly
                className="input-group-text d-block"
                placeholder="Fill query and click on 'Done'"
              />
              <QueryPanel
                id="inputChecks"
                isTranslate="false"
                resHandler={this.autofillSelection}
                entity={this.state.entity}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="footer-top-br">
          <div className="d-block text-center">
            <button onClick={this.submit} className="blue-button m-r-0 m-b-0">
              SAVE
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }

  autofillSelection = (sel) => {
    console.log("Set");
    this.setState({
      checks: sel,
    });
  };
}

export default NewRulSetPopup;
