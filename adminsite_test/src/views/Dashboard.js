import React,{Component} from "react";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import Header from "../components/Headers/Header.js";

class Index extends Component {
  constructor(props){
    super(props);
    this.state = {
      dashbordsData: [],
    };
  }

  componentDidMount(){
    this.getData();
  }

  getData() {
    fetch('http://127.0.0.1:5000/search_dashbord/')
    .then(response => response.json())
    .then(data => {
      this.setState({
        dashbordsData :data,
      });
    });
  }
  render() {
    const {dashbordsData} = this.state;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-defaultshadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Category</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Jobs</th>
                      <th scope="col">Number</th>
                    </tr>
                  </thead>
                  <tbody>
                  {dashbordsData.map(tdata =>
                    <tr>
                      <th scope="row">{tdata.catagory.job_name}</th>
                      <td>{tdata.catagory.job_number}</td>
                    </tr>
                  )} 
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Service</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Number</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                  {dashbordsData.map(tdata =>
                    <tr>
                      <th scope="row">{tdata.service.service_name}</th>
                      <td>{tdata.service.service_number}</td>
                    </tr>
                  )} 
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
