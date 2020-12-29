import React from "react";
import ReactPaginate from 'react-paginate';
import '../style.css';
import AddModal from './AddModal';
import EditModal from './EditModal';

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
  ButtonToolbar
} from "reactstrap";

class Clients extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        offset: 0,
        tableData: [],
        orgtableData: [],
        perPage: 5,
        currentPage: 0,
        addModalShow:false,
        editModalShow:false,
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
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      var data1 = data;
      console.log(data1)
      var slice = data1.slice(this.state.offset, this.state.offset + this.state.perPage)
      console.log(slice)
      this.setState({
        pageCount: Math.ceil(data1.length / this.state.perPage),
        orgtableData :data,
        tableData:slice
      });
    });
  }

  componentDidUpdate(){
    this.getData();
  }

  deleteClient(id){
    if(window.confirm('Are you sure you want to delete the customer whose ID = '+id+'?')){
      fetch('http://localost:3000/../'+ id, {
        method:'DELETE',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      })
    }
  }

  render() {
    const {tableData,id,UserName, Email, Number,CompaneEmail,Country,Note, ServiceName } = this.state;
    let addModalClose=()=> this.setState({addModalShow:false});
    let editModalClose=()=> this.setState({editModalShow:false});
    return (
      <>
        <div className="header bg-gradient-cyan pb-8 pt-5 pt-md-8">
        <Container fluid>
            <div className="header-body">
              <ButtonToolbar>
                <Button variant="primary" style = {{color:"blue"}} onClick={()=> this.setState({addModalShow:true})}>Add</Button>
                <AddModal 
                  show = {this.state.addModalShow}
                  onHide={addModalClose}
                />
              </ButtonToolbar>
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
                      <th scope="col">User Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Number</th>
                      <th scope="col">Compane Email</th>
                      <th scope="col">Country</th>
                      <th scope="col">Note</th>
                      <th scope="col">Service Name</th>
                      <th scope="col">Actions</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                  {tableData.map(tdata =>
                    <tr key = {tdata.id}>
                      <td>{tdata.id}</td>
                      <td>{tdata.name}</td>
                      <td>{tdata.email}</td>
                      <td>{tdata.phone}</td>
                      <td>{tdata.email}</td>
                      <td>{tdata.address.city}</td>
                      <td>{tdata.website}</td>
                      <td>{tdata.company.name}</td>
                      <td>
                        <ButtonToolbar>
                          <Button 
                            variant="info"
                            style = {{color:"green"}}
                            onClick={() => this.setState({
                              editModalShow:true,
                              id : tdata.id,
                              UserName : tdata.name,
                              Email : tdata.email,
                              Number : tdata.phone,
                              CompaneEmail : tdata.email,
                              Country : tdata.address.city,
                              Note : tdata.website,
                              ServiceName : tdata.company.name
                            })}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="danger"
                            style = {{color:"red"}}
                            onClick={() => this.deleteClient(tdata.id)}
                          >
                            Delete
                          </Button>

                          <EditModal 
                            show = {this.state.editModalShow}
                            onHide={editModalClose}
                            id = {id}
                            UserName = {UserName}
                            Email = {Email}
                            Number = {Number}
                            CompaneEmail = {CompaneEmail}
                            Country = {Country}
                            Note = {Note}
                            ServiceName = {ServiceName}
                          />
                        </ButtonToolbar>
                      </td>
                    </tr>
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

export default Clients;
