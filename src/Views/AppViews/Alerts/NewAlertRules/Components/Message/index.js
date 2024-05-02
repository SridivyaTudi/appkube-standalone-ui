import React, { Component } from "react";
import { Box, Button } from "@mui/material";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageData: "",
    };
    this.templateList = [
      "{{.ID}}",
      "{{.Name}}",
      "{{.TaskName}}",
      "{{.Group}}",
      "{{.Tags}}",
      '{{index .Tags "value"}}',
      "{{.Level}}",
      "{{.Fields}}",
      '{{index .Fields "value"}}',
      "{{.Time}}",
      "{{else}}",
      "{{end}}",
    ];
  }
  addMessages = (val) => {
    let { messageData } = this.state;
    messageData += '  ' + val;
    this.setState({
        messageData
    });
};

combineMessages = (event) => {
    this.setState({
        messageData: event.target.value
    });
}

createTemplateList = (templateList) => {
    const length = templateList.length;
    const retData = [];
    for (let i = 0; i < length; i++) {
        const template = templateList[i];
        retData.push(
            <li onClick={() => { this.addMessages(template) }}>
                <pre>
                    <code>{template}</code>
                </pre>
            </li>
        );
    }
    return retData;
};
  render() {
    const { messageData } = this.state;
    return (
      <Box className="alert-details">
         <Box className="alert-detail-head">
          <label>Massage</label>
          <Button className="primary-btn min-width" variant="contained">
            Save Rule
          </Button>
        </Box>
        <Box className="alert-details-description">
          <Box className="condition-box">
            <Box className="condition-header">
              <Box className="send-alert-text">Message</Box>
            </Box>
            <Box className="condition-message-box">
              <Box className="condition-message-examplex">
                <textarea
                  placeholder='Example: {{ .ID }} is {{ .Level }} value: {{ index .Fields "value" }}'
                  onChange={(e) => {
                    this.combineMessages(e);
                  }}
                  value={messageData}
                ></textarea>
              </Box>
              <Box className="templates-text">
                <ul>
                  <li>
                    <span>Templates : </span>
                  </li>
                  {this.createTemplateList(this.templateList)}
                </ul>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Message;
