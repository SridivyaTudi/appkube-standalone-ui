import React, { Component } from 'react';

export class Message extends Component{
    templateList;
    constructor(props) {
        super(props);
        this.state = {
            messageData: '',
        };
        this.templateList = ['{{.ID}}', '{{.Name}}', '{{.TaskName}}', '{{.Group}}', '{{.Tags}}', '{{index .Tags "value"}}', '{{.Level}}', '{{.Fields}}', '{{index .Fields "value"}}', '{{.Time}}', '{{else}}', '{{end}}'];
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
            <div className="alert-details">
                <div className="alert-details-name">
                    <label>Condition</label>
                    <div className="condition-box">
                        <div className="condition-header">
                            <div className="send-alert-text">Message</div>
                        </div>
                        <div className="condition-message-box">
                            <div className="condition-message-examplex">
                                <textarea placeholder='Example: {{ .ID }} is {{ .Level }} value: {{ index .Fields "value" }}' onChange={e => { this.combineMessages(e) }} value={messageData}></textarea>
                            </div>
                            <div className="templates-text">
                                <ul>
                                    <li>
                                        <span>Templates:</span>
                                    </li>
                                    {this.createTemplateList(this.templateList)}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}