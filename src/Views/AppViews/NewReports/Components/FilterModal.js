import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from '@mui/material/Checkbox';
import Search from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
class FilterModal extends Component {

    toggle = () => {
        this.props.togglePopup();
    };


    render() {

        return (
            <>
                <Modal
                    isOpen={this.props.showModal}
                    toggle={this.toggle}
                    className="setting-modal-container delete-policy-modal"
                >
                    <ModalBody>
                        <Box className="delete-policy-content">
                            {/* <Box className="delete-icon">{icon}</Box> */}
                            <h5>Filter</h5>
                            {/* <p> {labels?.description}</p> */}
                        </Box>
                        <>
                            <Button variant="outlined" fullWidth startIcon={<Search />}>
                                Select Regions
                            </Button>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                                <FormControlLabel required control={<Checkbox />} label="Required" />
                            </FormGroup>
                        </>


                    </ModalBody>
                    <ModalFooter className="footer-top-br m-t-3">
                        <Box className="d-block text-center">
                            <LoadingButton
                                className="danger-btn   m-r-2"
                                variant="contained"
                                // disabled={showLoader}
                                // loading={showLoader}
                                onClick={this.onClickYes}
                            >
                                {/* {labels?.btnYes} */}
                            </LoadingButton>
                            <LoadingButton
                                className="secondary-btn "
                                variant="contained"
                                onClick={this.onClickNo}
                            // disabled={showLoader}
                            >
                                {/* {labels?.btnNo} */}
                            </LoadingButton>
                        </Box>
                    </ModalFooter>
                </Modal>


            </>
        )
    }
}

export default FilterModal