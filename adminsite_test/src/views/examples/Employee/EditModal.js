import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from "@material-ui/core/Snackbar";

class EditModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            Snackbaropen :false,
            Snackbarmsg:'',
            newJobOfferName:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    SnackbarClose =(e) =>{
        this.setState({
          Snackbaropen:false
        });
      }

      handleSubmit(event){
        event.preventDefault();
        fetch('http://127.0.0.1:5000/update_job_level/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                old_name_job_level:event.target.oldJobLevelName.value,
                new_name_job_level:event.target.newJobLevelName.value,
            })
        })
        .then(res =>res.json())
        .then((result) => {
            this.setState({
                Snackbaropen:true,
                Snackbarmsg:'Updated successfully'
            });
        },
        (error)=>{
            this.setState({
                Snackbaropen:true,
                Snackbarmsg:'Failed'
            });
        })
    }
    render(){
        return(
        <>
            <Snackbar
                anchorOrigin={{vertical:'bottom',horizontal:'center'}}
                open={this.state.Snackbaropen}
                autoHideDuration={3000}
                onClose={this.SnackbarClose}
                message ={<span id="massage-id">{this.state.Snackbarmsg}</span>}
                action={[
                    <IconButton 
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.SnackbarClose}
                    >
                    x
                    </IconButton>
                ]}
            /> 
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Job Level
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId = "oldJobLevelName">
                                    <Form.Label>Old job Level name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="oldJobLevelName"
                                        required
                                        defaultValue = {this.props.oldJobTimeName}
                                        placeholder="Old job level name"
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId = "newJobLevelName">
                                    <Form.Label>New job time name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="newJobLevelName"
                                        required
                                        placeholder="New job level name"
                                        onChange={(e) => this.setState({ newJobLevelName: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Edit Job level
                                    </Button>
                                </Form.Group>
                            </Form>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
        )
    }
}

export default EditModal;