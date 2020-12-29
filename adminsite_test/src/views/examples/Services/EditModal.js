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
        fetch('http://127.0.0.1:5000/update_service/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                old_name_service:event.target.oldServiceName.value,
                new_name_service:event.target.newServiceName.value,
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
                        Services
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId = "oldServiceName">
                                    <Form.Label>Old Service name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="oldServiceName"
                                        required
                                        defaultValue = {this.props.oldServiceName}
                                        placeholder="Old job time name"
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group controlId = "newServiceName">
                                    <Form.Label>New Service name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="newServiceName"
                                        required
                                        placeholder="New Service name"
                                        onChange={(e) => this.setState({ newServiceName: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Edit Job offer
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