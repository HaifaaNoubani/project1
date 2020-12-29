import React from "react";
import EditModal from './EditModal';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  ButtonToolbar
} from "reactstrap";
import UserHeader from "../../../components/Headers/UserHeader.js";

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        orgtableData: [],
        isLoading:false,
        editModalShow:false,
        old_employee_email:'Lucio_Hettinger@annie.ca',
    }
  }

  componentWillMount(event){
    this.getData();
  }

  getData() {
    fetch('http://127.0.0.1:5000/search_employee/?email='+this.state.old_employee_email)
    .then(response => response.json())
    .then(data => {
      this.setState({
        orgtableData :data,
        isLoading:true,
      });
    });
  }

  deleteJobOffer(name_job_offer){
    if(window.confirm('Are you sure you want to delete it?')){
      fetch('http://127.0.0.1:5000/delete_job_offer/', {
        method:'POST',
        mode: 'cors',
        headers:new Headers({
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*'
        }),
        body:JSON.stringify({
          name_job_offer:name_job_offer,
        })
      })
      .then(function(response) {
        return response.json()
    })
    .then((result) => {
        this.setState({
            Snackbaropen:true,
            Snackbarmsg:'deleted successfully'
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
  
  render() {
    const { orgtableData,
            old_employee_email,
            name,
            email,
            level,
            phone_number,
            nationality,
            job_name,
            company_work,
            address,
            linkedin} = this.state;

    let editModalClose=()=> this.setState({editModalShow:false});
    const isLoading = this.state.isLoading;

    return (
      <>
        <UserHeader />
        {/* Page content */}
        {isLoading
        ?
        <Container className="mt--7" fluid>        
            <Col className="order-xl-1" xl="10">
              {orgtableData.map((tdata,index) => (
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <ButtonToolbar>
                        <Button
                          onClick={() => this.setState({
                          editModalShow:true,
                          old_employee_email : tdata.email,
                          name:tdata.name,
                          email:tdata.email,
                          level:tdata.level,
                          phone_number:tdata.phone_number,
                          nationality:tdata.nationality,
                          job_name:tdata.job_name,
                          company_work:tdata.company_work,
                          address:tdata.address,
                          linkedin:tdata.linkedin,
                         })}
                          color="primary"
                          size="sm"
                        >
                          Edit Profile
                        </Button>
                        <IconButton aria-label="show">
                          <VisibilityIcon  onClick={() => this.deleteJobOffer(tdata.name_job_offer)}/>
                        </IconButton>

                        <EditModal 
                          show = {this.state.editModalShow}
                          onHide={editModalClose}
                          old_employee_email = {old_employee_email}
                          name = {name}
                          email = {email}
                          level = {level}
                          phone_number = {phone_number}
                          nationality = {nationality}
                          job_name = {job_name}
                          company_work = {company_work}
                          address = {address}
                          linkedin = {linkedin}
                        />
                      </ButtonToolbar>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onLoad={this.handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <Form.Group controlId = "Username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              defaultValue={tdata.name}
                              placeholder="Username"
                              type="text"
                              disabled
                              name="Username"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="6">
                          <Form.Group controlId = "Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              className="form-control-alternative"
                              defaultValue={tdata.email}
                              placeholder="Email"
                              type="email"
                              disabled
                              name="Email"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group controlId = "Linkedin">
                            <Form.Label>Linkedin</Form.Label>
                            <Form.Control
                              className="form-control-alternative"
                              defaultValue={tdata.linkedin}
                              placeholder="Linkedin"
                              type="text"
                              disabled
                              name="Linkedin"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="4">
                          <Form.Group controlId = "Nationality">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control
                              className="form-control-alternative"
                              defaultValue={tdata.nationality}
                              placeholder="Nationality"
                              type="text"
                              disabled
                              name="Nationality"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="4">
                          <Form.Group controlId = "Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              className="form-control-alternative"
                              defaultValue={tdata.address}
                              placeholder="Address"
                              type="text"
                              disabled
                              name="Address"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="4">
                          <Form.Group controlId = "PhoneNumber">
                            <Form.Label>PhoneNumber</Form.Label>
                            <Form.Control
                              className="form-control-alternative"
                              defaultValue={tdata.phone_number}
                              placeholder="PhoneNumber"
                              type="number"
                              disabled
                              name="PhoneNumber"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">My job information</h6>
                    <div className="pl-lg-4">
                    <Row>
                        <Col lg="4">
                          <Form.Group controlId = "JobName">
                            <Form.Label>JobName</Form.Label>
                            <Form.Control
                              className="form-control-alternative"
                              defaultValue={tdata.job_name}
                              placeholder="JobName"
                              type="text"
                              disabled
                              name="JobName"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="4">
                          <Form.Group controlId = "CompanyWork">
                            <Form.Label>CompanyWork</Form.Label>
                            <Form.Control
                              className="form-control-alternative"
                              defaultValue={tdata.company_work}
                              placeholder="CompanyWork"
                              type="text"
                              disabled
                              name="CompanyWork"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col lg="4">
                          <Form.Group controlId = "level">
                            <Form.Label>Level</Form.Label>
                            <Form.Control
                              className="form-control-alternative"
                              defaultValue={tdata.level}
                              placeholder="level"
                              type="number"
                              disabled
                              name="level"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
                
              </Card>))}
            </Col>
        </Container>
        :
        <Container className="mt--7" fluid>        
        <Col className="order-xl-1" xl="10">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">My account</h3>
                </Col>
                <Col className="text-right" xs="4">
                  <ButtonToolbar>
                    <Button
                      onClick={() => this.setState({
                      editModalShow:true,
                     })}
                      color="primary"
                      size="sm"
                    >
                      Edit Profile
                    </Button>
                    <IconButton aria-label="show">
                      <VisibilityIcon  />
                    </IconButton>

                    <EditModal 
                      show = {this.state.editModalShow}
                      onHide={editModalClose}
                    />
                  </ButtonToolbar>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onLoad={this.handleSubmit}>
                <h6 className="heading-small text-muted mb-4">
                  User information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <Form.Group controlId = "Username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          defaultValue="none"
                          placeholder="Username"
                          type="text"
                          disabled
                          name="Username"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg="6">
                      <Form.Group controlId = "Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          className="form-control-alternative"
                          defaultValue="none"
                          placeholder="Email"
                          type="email"
                          disabled
                          name="Email"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group controlId = "Linkedin">
                        <Form.Label>Linkedin</Form.Label>
                        <Form.Control
                          className="form-control-alternative"
                          defaultValue="none"
                          placeholder="Linkedin"
                          type="text"
                          disabled
                          name="Linkedin"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4">
                  Contact information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="4">
                      <Form.Group controlId = "Nationality">
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control
                          className="form-control-alternative"
                          defaultValue="none"
                          placeholder="Nationality"
                          type="text"
                          disabled
                          name="Nationality"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg="4">
                      <Form.Group controlId = "Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          className="form-control-alternative"
                          defaultValue="none"
                          placeholder="Address"
                          type="text"
                          disabled
                          name="Address"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg="4">
                      <Form.Group controlId = "PhoneNumber">
                        <Form.Label>PhoneNumber</Form.Label>
                        <Form.Control
                          className="form-control-alternative"
                          defaultValue={-1}
                          placeholder="PhoneNumber"
                          type="number"
                          disabled
                          name="PhoneNumber"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                {/* Description */}
                <h6 className="heading-small text-muted mb-4">My job information</h6>
                <div className="pl-lg-4">
                <Row>
                    <Col lg="4">
                      <Form.Group controlId = "JobName">
                        <Form.Label>JobName</Form.Label>
                        <Form.Control
                          className="form-control-alternative"
                          defaultValue="0"
                          placeholder="JobName"
                          type="text"
                          disabled
                          name="JobName"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg="4">
                      <Form.Group controlId = "CompanyWork">
                        <Form.Label>CompanyWork</Form.Label>
                        <Form.Control
                          className="form-control-alternative"
                          defaultValue="none"
                          placeholder="CompanyWork"
                          type="text"
                          disabled
                          name="CompanyWork"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg="4">
                      <Form.Group controlId = "level">
                        <Form.Label>Level</Form.Label>
                        <Form.Control
                          className="form-control-alternative"
                          defaultValue={-1}
                          placeholder="level"
                          type="number"
                          disabled
                          name="level"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>                
        }
      </>
    );
  }
}

export default Profile;

/*
{tableData.map((tdata,index) => (
*/