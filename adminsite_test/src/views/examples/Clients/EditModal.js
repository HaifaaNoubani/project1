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
        fetch('http://localost:3000/..',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ClientID:event.target.ClientID.value,
                UserName:event.target.UserName.value,
                Email:event.target.Email.value,
                Number:event.target.Number.value,
                CompaneEmail:event.target.CompaneEmail.value,
                Country:event.target.Country.value,
                Note:event.target.Note.value,
                ServiceName:event.target.ServiceName.value,
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
                        Clients
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId = "UserID">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="UserID"
                                        required
                                        disabled
                                        defaultValue = {this.props.id}
                                        placeholder="UserID"
                                    />
                                </Form.Group>
                                <Form.Group controlId = "UserName">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="UserName"
                                        required
                                        defaultValue = {this.props.UserName}
                                        placeholder="UserName"
                                    />
                                </Form.Group>
                                <Form.Group controlId = "Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="Email"
                                        required
                                        defaultValue = {this.props.Email}
                                        placeholder="Email"
                                    />
                                </Form.Group>
                                <Form.Group controlId = "Number">
                                    <Form.Label>Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Number"
                                        required
                                        defaultValue = {this.props.Number}
                                        placeholder="Number"
                                    />
                                </Form.Group>
                                <Form.Group controlId = "CompaneEmail">
                                    <Form.Label>Compane Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="CompaneEmail"
                                        required
                                        defaultValue = {this.props.CompaneEmail}
                                        placeholder="CompaneEmail"
                                    />
                                </Form.Group>
                                <Form.Group controlId = "Country">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Country"
                                        required
                                        defaultValue = {this.props.Country}
                                        placeholder="Country"
                                    />
                                </Form.Group>
                                <Form.Group controlId = "Note">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control
                                        as="textarea" rows={3}
                                        name="Note"
                                        required
                                        defaultValue = {this.props.Note}
                                        placeholder="Note"
                                    />
                                </Form.Group>
                                <Form.Group controlId = "ServiceName">
                                    <Form.Label>Service Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="ServiceName"
                                        required
                                        defaultValue = {this.props.ServiceName}
                                        placeholder="ServiceName"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Edit Client
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