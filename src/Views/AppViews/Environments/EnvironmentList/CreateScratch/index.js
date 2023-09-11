import { Component } from "react";
import Wizard from "./Wizard";
import ConfigureTopology from "./ConfigureTopology";
import CreateFromScratch from "./CreateFromScratch";
import SelectRegion from "./SelectRegion";
import ConfigureNodes from "./ConfigureNodes";
import ReviewConfigureCreation from "./ReviewConfigureCreation";
import { Box } from "@mui/material";

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
        component: () => <SelectRegion />,
      },
      {
        name: "Configure Topology",
        component: () => <ConfigureTopology />,
      },
      {
        name: "Configure Nodes",
        component: () => <ConfigureNodes />,
      },
      {
        name: "Review & Configure Creation",
        component: () => <ReviewConfigureCreation />,
      },
    ];
  }

  render() {
    const { formData, isSubmit, checkedId, finishPrevious } = this.state;
    return (
      <Box className="create-scratch-container">
        <Box className="new-account-page-container">
          <Wizard
            steps={this.steps}
            formData={formData}
            validateCreateRoleForm={this.validateCreateRoleForm}
            setIsSubmit={this.setIsSubmit}
            isSubmit={isSubmit}
            departmentId={checkedId}
            previousStep={(finishPrevStep) => {
              if (finishPrevStep === "finishPrevStep") {
                this.setState({ finishPrevious: false });
              } else {
                this.props.previousStep();
              }
            }}
            finishPrevious={finishPrevious}
          />
        </Box>
      </Box>
    );
  }
}

export default CreateScratch;
