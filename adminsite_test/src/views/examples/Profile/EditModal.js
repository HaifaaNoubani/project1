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
            name:'',
            email:'',
            phone_number:'',
            nationality:'',
            job_name:'',
            company_work:'',
            address:'',
            linkedin:'',
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
        fetch('http://127.0.0.1:5000/update_employee/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                old_employee_email:event.target.old_employee_email.value,
                name:event.target.name.value,
                email:event.target.email.value,
                level:event.target.level.value,
                phone_number:event.target.phone_number.value,
                nationality:event.target.nationality.value,
                job_name:event.target.job_name.value,
                company_work:event.target.company_work.value,
                address:event.target.address.value,
                linkedin:event.target.linkedin.value,
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
                        Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                <Col lg="9">
                                <Form.Group controlId = "old_employee_email">
                                    <Form.Label>The old email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="old_employee_email"
                                        required
                                        defaultValue = {this.props.old_employee_email}
                                        placeholder="The old email"
                                        disabled
                                    />
                                </Form.Group>
                                </Col>
                                <Col lg="3">
                                <Form.Group controlId = "level">
                                    <Form.Label>Level</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="level"
                                        required
                                        defaultValue = {this.props.level}
                                        placeholder="Level"
                                        disabled
                                    />
                                </Form.Group>
                                </Col>
                                </Row>
                                <Form.Group controlId = "email">
                                    <Form.Label>The new email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        required
                                        defaultValue = {this.props.email}
                                        placeholder="The new email"
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId = "linkedin">
                                    <Form.Label>Linkedin</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="linkedin"
                                        required
                                        defaultValue = {this.props.linkedin}
                                        placeholder="linkedin"
                                        onChange={(e) => this.setState({ linkedin: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId = "name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        required
                                        defaultValue = {this.props.name}
                                        placeholder="name"
                                        onChange={(e) => this.setState({ name: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId = "phone_number">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phone_number"
                                        required
                                        defaultValue = {this.props.phone_number}
                                        placeholder="phone number"
                                        onChange={(e) => this.setState({ phone_number: e.target.value })}
                                    />
                                </Form.Group>
                                <Row>
                                <Col lg="6">
                                <Form.Group controlId = "nationality">
                                    <Form.Label>Nationality</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nationality"
                                        required
                                        defaultValue = {this.props.nationality}
                                        placeholder="nationality"
                                        onChange={(e) => this.setState({ nationality: e.target.value })}
                                    />
                                </Form.Group>
                                </Col>
                                <Col lg="6">
                                <Form.Group controlId = "address">
                                    <Form.Label> Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        required
                                        defaultValue = {this.props.address}
                                        placeholder="address"
                                        onChange={(e) => this.setState({ address: e.target.value })}
                                    />
                                </Form.Group>
                                </Col>
                                </Row>
                                <Row>
                                <Col lg="6">
                                <Form.Group controlId = "job_name">
                                    <Form.Label>Job Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="job_name"
                                        required
                                        defaultValue = {this.props.job_name}
                                        placeholder="job name"
                                        onChange={(e) => this.setState({ job_name: e.target.value })}
                                    />
                                </Form.Group>
                                </Col>
                                <Col lg="6">
                                <Form.Group controlId = "company_work">
                                    <Form.Label>Company Work</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="company_work"
                                        required
                                        defaultValue = {this.props.company_work}
                                        placeholder="company work"
                                        onChange={(e) => this.setState({ company_work: e.target.value })}
                                    />
                                </Form.Group>
                                </Col>
                                </Row>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Edit Profile
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