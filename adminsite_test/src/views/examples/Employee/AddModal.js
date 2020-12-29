import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from "@material-ui/core/Snackbar";

class AddModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Snackbaropen :false,
            Snackbarmsg:'',
            email:'',
            password: '',
            confirmPassword: '',
            Level:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    SnackbarClose =(e) =>{
        this.setState({
          Snackbaropen:false
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event){
        event.preventDefault();
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            this.setState({
                Snackbaropen:true,
                Snackbarmsg:"Password doesn't match"
            });
        } else {
            fetch('http://localost:3000/add_employee/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email_employee:event.target.Email.value,
                password_employee:event.target.Password.value,
                level_employee:event.target.Level.value,
            })
        })
        .then((result) => {
            this.setState({
                Snackbaropen:true,
                Snackbarmsg:'added successfully'
            });
        },
        (error)=>{
            this.setState({
                Snackbaropen:true,
                Snackbarmsg:'Failed'
            });
        })
    }
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
                    Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId = "Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="Email"
                                        required
                                        placeholder="email"
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId = "Password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="Password"
                                        required
                                        placeholder="password"
                                        onChange={(e) => this.setState({ password: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId = "ConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="ConfirmPassword"
                                        required
                                        placeholder="confirm password"
                                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="Level">
                                    <Form.Label>Level</Form.Label>
                                    <Form.Control as="select" defaultValue="Choose..." value={this.state.Level} onChange={this.handleChange}>
                                        <option value="Manager">Manager</option>
                                        <option value="Employee">Employee</option>
                                    </Form.Control>
                                </Form.Group>                                 
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Employee
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

export default AddModal;