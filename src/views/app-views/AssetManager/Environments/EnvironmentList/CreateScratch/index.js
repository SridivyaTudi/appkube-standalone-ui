import { Component } from "react";
import Wizard from "./Wizard";
import ConfigureTopology from "./ConfigureTopology";
import CreateFromScratch from "./CreateFromScratch";
import SelectRegion from "./SelectRegion";
import ConfigureNodes from "./ConfigureNodes";
import ReviewConfigureCreation from "./ReviewConfigureCreation";
class CreateScratch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        displayName: "",
        roleArn: "",
        externalId: "",
      },
      checkedId: false,
      finishPrevious: false,
      isSubmit: false,
    };
    this.steps = [
      {
        name: "Create From Scratch",
        component: () => <CreateFromScratch />,
      },
      {
        name: "Select Region",
        component: () => (
          <SelectRegion/>
        ),
      },
      {
        name: "Configure Topology",
        component: () => (
          <ConfigureTopology/>
        ),
      },
      {
        name: "Configure Nodes",
        component: () => (
          <ConfigureNodes/>
        ),
      },
      {
        name: "Review & Configure Creation",
        component: () => (
          <ReviewConfigureCreation/>
        ),
      },
    ];
  }

  

  render() {
    const { formData } = this.state;
    return (
      <div className="create-scratch-container">
        <div className="new-account-page-container">
          <Wizard
            steps={this.steps}
            formData={formData}
            validateCreateRoleForm={this.validateCreateRoleForm}
            setIsSubmit={this.setIsSubmit}
            isSubmit={this.state.isSubmit}
            departmentId={this.state.checkedId}
            previousStep={(finishPrevStep) => {
              if (finishPrevStep === "finishPrevStep") {
                this.setState({ finishPrevious: false });
              } else {
                this.props.previousStep();
              }
            }}
            finishPrevious={this.state.finishPrevious}
          />
        </div>
      </div>
    );
  }
}

export default CreateScratch;
