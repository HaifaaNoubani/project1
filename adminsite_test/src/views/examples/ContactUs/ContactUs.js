import React from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../style.css';
import {Alert } from 'react-bootstrap';

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";

class ContactUs extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        offset: 0,
        tableData: [],
        orgtableData: [],
        perPage: 5,
        currentPage: 0
    }
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.loadMoreData()
    });
  };

  loadMoreData() {
  const data = this.state.orgtableData;
  const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData:slice
    })
  }

  getData() {
    axios
    .get(`https://jsonplaceholder.typicode.com/albums`)
    .then(res => {
      var data = res.data;
      var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData :res.data,
        tableData:slice
      })
    });
  }

  render() {
    return (
      <>
        <div className="header bg-gradient-default pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
            </div>
          </Container>
        </div>
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Tables</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Service Type</th>
                      <th scope="col">Employee name(responded)</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Email</th>
                      <th scope="col">Address</th>
                      <th scope="col">Note</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.tableData.map((tdata,i) => (
                    <tr>
                      <td>{tdata.id}</td>
                      <td>{tdata.title}</td>
                      <td>{tdata.title}</td>
                      <td>{tdata.title}</td>
                      <td>{tdata.title}</td>
                      <td>{tdata.title}</td>
                      <td>{tdata.title}</td>
                      <td>{tdata.title}</td>
                      <td>{tdata.title}</td>
                      <td>
                        <Button variant="success" onClick={() => this.props.editProduct(tdata.id)} style={{color:"green"}}>Edit</Button>
                      </td>
                    </tr>
                    )
                  )}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
          <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
        </Container>
      </>
    );
  }
}

export default ContactUs;
